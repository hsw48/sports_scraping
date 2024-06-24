const mongo_cluster = require("../../utils/mongo_cluster.js");
const ObjectId = require("mongodb").ObjectId;


export async function main(event, context) {
    context.callbackWaitsForEmptyEventLoop = false;
    // const cluster = await mongo_cluster.connect(process.env.stage);
    // const database = cluster.db("application");
    const authHeader = event.headers.authorization;

    return {
        isAuthorized: true,
        context: {
            "example": "example"
        }
    };
}
