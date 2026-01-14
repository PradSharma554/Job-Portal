import { NextResponse } from "next/server";
import connectToMongoDB from "@/lib/mongodb";
import Job from "@/models/Job";
import JobData from "@/data";

export async function GET() {
  try {
    await connectToMongoDB();

    // Clear existing data
    await Job.deleteMany({});

    // Insert mock data
    // we need to remove 'id' from JobData as Mongo generates _id,
    // or we can just pass it and let Mongoose ignore it if not in schema (unless strict is false)
    // The schema doesn't have 'id', so it should be stripped.

    // Create new array without id
    const seedData = JobData.map(({ id, ...rest }) => rest);

    await Job.insertMany(seedData);

    return NextResponse.json(
      { message: "Database seeded successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Error seeding database", details: error },
      { status: 500 }
    );
  }
}
