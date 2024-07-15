/*
    This will allow mongo to authenticate a client
*/

const MongoClient = require("mongodb").MongoClient;
let cluster_instance = null;

export const connect = async (stage) => {
  if (cluster_instance) { 
    return cluster_instance;
  }
  let MONGODB_URI = `mongodb+srv://admin:adminPassword@cluster0.vrjnhbr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
  cluster_instance = await MongoClient.connect(MONGODB_URI, { useUnifiedTopology: true, useNewUrlParser: true, maxPoolSize: 10 });
  return cluster_instance;
};
