import { Trigger } from "deno-slack-sdk/types.ts";
import getAllJobsWorkflow from "../workflows/get_all_jobs.ts";

const invokeAllJobsShortcut: Trigger<typeof getAllJobsWorkflow.definition> = {
  type: "shortcut",
  name: "Get all jobs",
  description: "Get all jobs associated with email registered in clarifi",
  workflow: "#/workflows/get_all_jobs_workflow",
  inputs: {
    interactivity: {
      value: "{{data.interactivity}}",
    },
    channel: {
      value: "{{data.channel_id}}",
    },
  },
};

export default invokeAllJobsShortcut;
