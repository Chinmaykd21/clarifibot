import { DefineFunction, DefineType, Schema } from "deno-slack-sdk/mod.ts";

export const allJobsOutputTypes = DefineType({
  name: "All Jobs",
  type: Schema.types.object,
  properties: {
    jobName: {
      type: Schema.types.string,
      description: "Job Name",
    },
    jobUrl: {
      type: Schema.types.string,
    },
  },
  required: [],
});

export const getAllJobDefinitions = DefineFunction({
  callback_id: "get_all_jobs",
  title: "Enter your email",
  description: "Get all of your jobs from clarifi app",
  source_file: "functions/get_jobs/mod.ts",
  input_parameters: {
    properties: {
      email: {
        type: Schema.types.string,
        description: "Enter your email",
      },
    },
    required: ["email"],
  },
  output_parameters: {
    properties: {
      jobs: {
        type: Schema.types.array,
        items: {
          type: allJobsOutputTypes,
        },
        description: "Array of jobs that includes job name and email link",
      },
    },
    required: [],
  },
});
