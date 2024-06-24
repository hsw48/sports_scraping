const ObjectId = require("mongodb").ObjectId;
const mongo_cluster = require("../../utils/mongo_cluster.js")

export async function main(event, context) {
    context.callbackWaitsForEmptyEventLoop = false;
    //const cluster = await mongo_cluster.connect(process.env.stage);
    //const database = cluster.db("application");

    if ("warmer" in event) { return }


    if (("body" in event) === false) {
        return { statusCode: 400, body: JSON.stringify({ message: "Bad request" }) };
    }

    let body = null;

    try {
        body = JSON.parse(event.body);
    } catch {
        return { statusCode: 400, body: JSON.stringify({ message: "Bad request" }) };
    }

    let selfUserInfo = event.requestContext.authorizer.lambda;

    let event_id = body.event_id


    return example_event

}

const example_event = {
    "event_id": "001",
    "event_name": "Super Bowl LVII",
    "event_league": "NFL",
    "articles": [
        {
            "article_id": "001",
            "image": "https://pikkit-ios-cdn.s3.amazonaws.com/super_bowl_example.png",
            "link": "https://pikkit.com",
            "date_published": "June 9th, 2024",
            "title": "The best bets so far...",
            "author": "The Athletic",
            "estimated_reading_time": "5 min"
        },
        {
            "article_id": "002",
            "image": "https://pikkit-ios-cdn.s3.amazonaws.com/super_bowl_example.png",
            "link": "https://pikkit.com",
            "date_published": "June 7th, 2024",
            "title": "The best bets so far...",
            "author": "NFL Network",
            "estimated_reading_time": "15 min"
        },
        {
            "article_id": "003",
            "image": "https://pikkit-ios-cdn.s3.amazonaws.com/super_bowl_example.png",
            "link": "https://pikkit.com",
            "date_published": "June 98th, 2024",
            "title": "The best bets so far...",
            "author": "Google Sports",
            "estimated_reading_time": "30 sec"
        }
    ]
}