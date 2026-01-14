import { NextResponse } from "next/server";
import connectToMongoDB from "@/lib/mongodb";
import Job from "@/models/Job";

export async function GET(request, { params }) {
  try {
    await connectToMongoDB();
    const { id } = params;
    const job = await Job.findById(id).lean();

    if (!job) {
      return NextResponse.json({ message: "Job not found" }, { status: 404 });
    }

    return NextResponse.json(job, { status: 200 });
  } catch (error) {
    console.error("Error fetching job:", error);
    return NextResponse.json(
      { message: "Error fetching job", error: error.message },
      { status: 500 }
    );
  }
}
