import { Neo4jGraphQL } from "@neo4j/graphql"
import { ApolloServer, gql } from "apollo-server"
import neo4j from "neo4j-driver"
import {typeDefs} from "./graphql-schema.js"
import dotenv from 'dotenv'
dotenv.config()


// Create Neo4j driver instance
const driver = neo4j.driver(
  process.env.AURA_ENDPOINT,
  neo4j.auth.basic(process.env.AURA_USERNAME, process.env.AURA_PASSWORD)
);

// Create instance that contains executable GraphQL schema from GraphQL type definitions
const neo4jGraphQL = new Neo4jGraphQL({
  typeDefs,
  driver,
  config: {
    queryOptions:{
      mutation: false
    }
  }
});

// Generate schema
neo4jGraphQL.getSchema().then((schema) => {
  // Create ApolloServer instance to serve GraphQL schema
  const server = new ApolloServer({
    schema,
    context: { driverConfig: { database: "neo4j" } },
  });

  // Start ApolloServer
  server.listen().then(({ url }) => {
    console.log(`GraphQL server ready at ${url}`);
  });
});