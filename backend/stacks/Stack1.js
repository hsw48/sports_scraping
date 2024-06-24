import { Api } from "sst/constructs";
import { Function } from "sst/constructs";
const iam = require('aws-cdk-lib/aws-iam');

export function Stack1({ stack, app }) {
    let input_stage = app.stage;
    let parsed_stage = input_stage.split("-");
    let INPUT_ENVIRONMENT = parsed_stage[0];
    let ENVIRONMENT = null;
    if (INPUT_ENVIRONMENT === "prod") {
        ENVIRONMENT = "production";
    }
    else {
        throw new Error("INVALID_ENVIRONMENT_CONFIG");
    }



    const config_variables = {
        DATABASE_USERNAME: process.env.DATABASE_USERNAME,
        DATABASE_PASSWORD: process.env.DATABASE_PASSWORD,
    };

    // Create Api
    const api = new Api(stack, "Api", {
        authorizers: {
            myAuthorizer: {
                type: "lambda",
                function: new Function(stack, "Authorizer", {
                    handler: "src/api/authentication/authorizer.main",
                    memorySize: 256,
                    environment: {
                        stage: ENVIRONMENT,
                        ...config_variables
                    },
                }),
                responseTypes: ['simple'],
                resultsCacheTtl: "90 seconds"
            }
        },
        defaults: {
            authorizer: "myAuthorizer",
            function: {
                timeout: 5,
                memorySize: 512,
                tracing: "disabled",
                environment: {
                    stage: ENVIRONMENT,
                    ...config_variables
                },
                bundle: {
                    nodeModules: ["saslprep"],
                }
            }
        },
        routes: {
            "POST /event/all": {
                function: {
                    handler: "src/api/endpoints/getEvents.main",
                }
            },
            "POST /event/id": {
                function: {
                    handler: "src/api/endpoints/getEvent.main",
                }
            }
        },
    });

    stack.addOutputs({
        ApiEndpoint: api.url,
    });

}