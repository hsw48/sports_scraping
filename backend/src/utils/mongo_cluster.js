/*
    This will allow mongo to authenticate a client
*/

const MongoClient = require("mongodb").MongoClient;
let cluster_instance = null;

export const connect = async (stage) => {
  if (cluster_instance) { 
    return cluster_instance;
  }
  let MONGODB_URI = `mongodb+srv://${process.env.DATABASE_USERNAME}:${process.env.DATABASE_PASSWORD}@{insert_connection_string_here}`
  cluster_instance = await MongoClient.connect(MONGODB_URI, { useUnifiedTopology: true, useNewUrlParser: true, maxPoolSize: 10 });
  return cluster_instance;
};
