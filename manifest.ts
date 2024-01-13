import { Manifest } from "deno-slack-sdk/mod.ts";
import {
  allJobsOutputTypes,
  getAllJobDefinitions,
} from "./functions/get_jobs/definitions.ts";
import getAllJobsWorkflow from "./workflows/get_all_jobs.ts";

/**
 * The app manifest contains the app's configuration. This
 * file defines attributes like app name and description.
 * https://api.slack.com/future/manifest
 */
export default Manifest({
  name: "clarifibot",
  description: "A blank template for building Slack apps with Deno",
  icon: "assets/default_new_app_icon.png",
  functions: [getAllJobDefinitions],
  workflows: [getAllJobsWorkflow],
  outgoingDomains: ["app.clarifi.app"],
  types: [allJobsOutputTypes],
  botScopes: ["commands", "chat:write", "chat:write.public"],
});
