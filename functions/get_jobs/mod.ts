import { SlackFunction } from "deno-slack-sdk/mod.ts";
import { getAllJobDefinitions } from "./definitions.ts";

export default SlackFunction(
  getAllJobDefinitions,
  async ({ inputs, env }) => {
    const headers = {
      Accept:
        "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
      "Content-type": "application/json",
      // Authorization: //todo
    };

    const { email } = inputs;

    try {
      const apiURL = `https://app.clarifi.app/jobs`;

      const jobs = await fetch(apiURL, {
        method: "GET",
        headers,
      }).then((res: Response) => {
        if (res.status === 201) {
          console.log(`This is the result -> ${res}`);
          return res.json();
        } else throw new Error(`${res.status}: ${res.statusText}`);
      });
      return {
        outputs: {
          jobName: jobs[0]?.title,
          jobUrl: jobs[0]?.url,
        },
      };
    } catch (err) {
      console.error(`This is the error we are seeing -> ${err}`);
      return {
        error: `An error during getting all jobs: \`${err.message}\``,
      };
    }
  },
);
