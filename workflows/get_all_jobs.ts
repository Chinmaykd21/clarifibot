import { DefineWorkflow, Schema } from "deno-slack-sdk/mod.ts";
import { getAllJobDefinitions } from "../functions/get_jobs/definitions.ts";

const getAllJobsWorkflow = DefineWorkflow({
  callback_id: "get_all_jobs_workflow",
  title: "AllJobs",
  description: "Get all jobs associated with your account in clarifi",
  input_parameters: {
    properties: {
      interactivity: {
        type: Schema.slack.types.interactivity,
      },
      channel: {
        type: Schema.slack.types.channel_id,
      },
    },
    required: ["interactivity", "channel"],
  },
});

// Step I: Open form
const emailIDInputForm = getAllJobsWorkflow.addStep(
  Schema.slack.functions.OpenForm,
  {
    title: "Enter email",
    interactivity: getAllJobsWorkflow.inputs.interactivity,
    submit_label: "Submit",
    description: "Get all jobs for registered email account",
    fields: {
      elements: [{
        name: "email",
        title: "Registered email",
        type: Schema.types.string,
      }],
      required: ["email"],
    },
  },
);

// Step II: Send a get request to clarifi app
const allJobs = getAllJobsWorkflow.addStep(getAllJobDefinitions, {
  email: emailIDInputForm.outputs.fields.email,
});

// Step III: Post the output to the channel
getAllJobsWorkflow.addStep(Schema.slack.functions.SendMessage, {
  channel_id: getAllJobsWorkflow.inputs.channel,
  message: `${allJobs.outputs.jobs}`,
});

export default getAllJobsWorkflow;
