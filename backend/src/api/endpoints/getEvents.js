const ObjectId = require("mongodb").ObjectId;
const mongo_cluster = require("../../utils/mongo_cluster.js")

export async function main(event, context) {
    context.callbackWaitsForEmptyEventLoop = false;
    const cluster = await mongo_cluster.connect();
    const db = cluster.db("harrison-woodward-interview");
    const events_collection = db.collection('events')

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

    let offset = body.offset
    let limit = body.limit

    let list_of_events = await events_collection.find().sort({'num_articles': -1}).toArray()

    if (offset < 0 || limit <= 0 || offset >= list_of_events.length) {
        return {
            "events": [],
            "total_events": list_of_events.length,
            "message": "Invalid index or size"
        };
    }
    else {
        return list_of_events.slice(offset, Math.min(offset + limit, list_of_events.length))
    }    
    
}

const list_of_events_test = [
    {
        "event_id": "001",
        "event_name": "Super Bowl LVII",
        "event_league": "NFL",
        "num_articles": 20
    },
    {
        "event_id": "002",
        "event_name": "NBA Finals Game 1",
        "event_league": "NBA",
        "num_articles": 15
    },
    {
        "event_id": "003",
        "event_name": "World Series Game 3",
        "event_league": "MLB",
        "num_articles": 12
    },
    {
        "event_id": "004",
        "event_name": "Stanley Cup Final Game 2",
        "event_league": "NHL",
        "num_articles": 10
    },
    {
        "event_id": "005",
        "event_name": "Wimbledon Men's Final",
        "event_league": "ATP",
        "num_articles": 8
    },
    {
        "event_id": "006",
        "event_name": "Wimbledon Women's Final",
        "event_league": "WTA",
        "num_articles": 7
    },
    {
        "event_id": "007",
        "event_name": "FIFA World Cup Final",
        "event_league": "FIFA",
        "num_articles": 25
    },
    {
        "event_id": "008",
        "event_name": "Tour de France Stage 15",
        "event_league": "UCI",
        "num_articles": 5
    },
    {
        "event_id": "009",
        "event_name": "Masters Tournament Final Round",
        "event_league": "PGA",
        "num_articles": 9
    },
    {
        "event_id": "010",
        "event_name": "US Open Men's Final",
        "event_league": "ATP",
        "num_articles": 6
    },
    {
        "event_id": "011",
        "event_name": "US Open Women's Final",
        "event_league": "WTA",
        "num_articles": 4
    },
    {
        "event_id": "012",
        "event_name": "Indianapolis 500",
        "event_league": "IndyCar",
        "num_articles": 7
    },
    {
        "event_id": "013",
        "event_name": "Monaco Grand Prix",
        "event_league": "Formula 1",
        "num_articles": 13
    },
    {
        "event_id": "014",
        "event_name": "Rugby World Cup Final",
        "event_league": "World Rugby",
        "num_articles": 11
    },
    {
        "event_id": "015",
        "event_name": "Cricket World Cup Final",
        "event_league": "ICC",
        "num_articles": 14
    },
    {
        "event_id": "016",
        "event_name": "UFC 290 Main Event",
        "event_league": "UFC",
        "num_articles": 8
    }
]
