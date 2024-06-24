import type { SSTConfig } from "sst";
import { Stack1 } from "./stacks/Stack1";

export default {
  config(input) {
    return {
        "name": "interview-backend-api",
        "region": "us-east-1",
    };
  },
  stacks(app) {
    app.setDefaultFunctionProps({
        runtime: "nodejs18.x",
        nodejs: {
            format: "esm"
        }
    });
    app
      .stack(Stack1)
  },
} satisfies SSTConfig;