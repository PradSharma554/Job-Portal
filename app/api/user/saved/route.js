import { NextResponse } from "next/server";
import connectToMongoDB from "@/lib/mongodb";
import User from "@/models/User";
import { getServerSession } from "next-auth";
import { authOptions } from "@/Auth";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    await connectToMongoDB();
    let user = await User.findOne({ email: session.user.email });

    // Lazy creation if fetching for first time and doesn't exist?
    // Or just return empty. Better to return empty if user not found.
    // Actually, if we want to ensure consistency, we might just query.

    if (!user) {
      return NextResponse.json({ savedJobs: [] }, { status: 200 });
    }

    return NextResponse.json({ savedJobs: user.savedJobs }, { status: 200 });
  } catch (error) {
    console.error("Error fetching saved jobs:", error);
    return NextResponse.json(
      { message: "Error fetching saved jobs", error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { jobId } = await request.json();
    if (!jobId) {
      return NextResponse.json({ message: "Job ID required" }, { status: 400 });
    }

    await connectToMongoDB();

    // Find or create user
    let user = await User.findOne({ email: session.user.email });
    if (!user) {
      user = await User.create({
        name: session.user.name,
        email: session.user.email,
        image: session.user.image,
        savedJobs: [],
      });
    }

    const isSaved = user.savedJobs.includes(jobId);
    let updatedUser;

    if (isSaved) {
      // Unsave
      updatedUser = await User.findByIdAndUpdate(
        user._id,
        { $pull: { savedJobs: jobId } },
        { new: true }
      );
    } else {
      // Save
      updatedUser = await User.findByIdAndUpdate(
        user._id,
        { $addToSet: { savedJobs: jobId } },
        { new: true }
      );
    }

    return NextResponse.json(
      {
        message: isSaved ? "Job removed from saved" : "Job saved",
        savedJobs: updatedUser.savedJobs,
        isSaved: !isSaved,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error saving job:", error);
    return NextResponse.json(
      { message: "Error saving job", error: error.message },
      { status: 500 }
    );
  }
}
