import { NextResponse } from "next/server";
import connectToMongoDB from "@/lib/mongodb";
import Job from "@/models/Job";

export async function POST(request) {
  try {
    await connectToMongoDB();
    const { title, image, salary, location, jobtype } = await request.json();

    if (!title || !image || !salary || !location || !jobtype) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    const newJob = await Job.create({
      title,
      image,
      salary,
      location,
      jobtype,
    });

    return NextResponse.json(
      { message: "Job posted successfully", job: newJob },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating job:", error);
    return NextResponse.json(
      { message: "Error posting job", error: error.message },
      { status: 500 }
    );
  }
}
