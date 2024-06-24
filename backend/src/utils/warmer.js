import { LambdaClient, InvokeCommand } from "@aws-sdk/client-lambda";

export async function handler() {

    const lambda = new LambdaClient();
    let function_arns = JSON.parse(process.env.function_arns);
    
    
    for (let i = 0; i < function_arns.length; i++){
        
        await lambda.send(
            new InvokeCommand({
                FunctionName: function_arns[i],
                InvocationType: "Event",
                Payload: Buffer.from(JSON.stringify({
                    "warmer": true
                }))
            })
        );
    }

    return {
        statusCode: 200
    }

}
