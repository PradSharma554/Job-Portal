import mongoose, { Schema } from "mongoose";

const JobSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide a job title."],
    },
    image: {
      type: String,
      required: [true, "Please provide an image."],
    },
    salary: {
      type: String,
      required: [true, "Please provide salary details."],
    },
    location: {
      type: String,
      required: [true, "Please provide a location."],
    },
    jobtype: {
      type: String,
      required: [true, "Please provide a job type."],
    },
  },
  {
    timestamps: true,
  }
);

// Prevent overwriting the model if it's already compiled
const Job = mongoose.models.Job || mongoose.model("Job", JobSchema);

export default Job;
