const neo4j = require("neo4j-driver");
const env = require("../config/env");

const driver = neo4j.driver(
  env.cognodbUri,
  neo4j.auth.basic(env.cognodbUsername, env.cognodbPassword),
  {
    maxConnectionPoolSize: 20,
    connectionAcquisitionTimeout: 10000
  }
);

module.exports = driver;
