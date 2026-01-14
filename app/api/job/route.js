import { NextResponse } from "next/server";
import connectToMongoDB from "@/lib/mongodb";
import Job from "@/models/Job";

export async function POST(request) {
  try {
    await connectToMongoDB();
    const { title, company, image, salary, location, jobtype } =
      await request.json();

    if (!title || !company || !image || !salary || !location || !jobtype) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    const newJob = await Job.create({
      title,
      company,
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

export async function GET(request) {
  try {
    await connectToMongoDB();
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search");
    const limit = searchParams.get("limit");

    const query = {};
    if (search) {
      const searchRegex = { $regex: search, $options: "i" };
      query.$or = [{ title: searchRegex }, { company: searchRegex }];
    }

    let jobsQuery = Job.find(query);

    if (limit) {
      jobsQuery = jobsQuery.limit(parseInt(limit));
    }

    const jobs = await jobsQuery.lean();

    return NextResponse.json(jobs, { status: 200 });
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return NextResponse.json(
      { message: "Error fetching jobs", error: error.message },
      { status: 500 }
    );
  }
}
