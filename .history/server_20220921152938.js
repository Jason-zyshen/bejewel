const { Neo4jGraphQL } = require("@neo4j/graphql");
const { ApolloServer, gql } = require("apollo-server");
const { toGraphQLTypeDefs } = require("@neo4j/introspector");
const neo4j = require("neo4j-driver");
// const fs = require("fs");
require("dotenv").config();



// Create Neo4j driver instance
const driver = neo4j.driver(
  process.env.AURA_ENDPOINT,
  neo4j.auth.basic(process.env.AURA_USERNAME, process.env.AURA_PASSWORD)
);

// Load Neo4j typeDefs from files
const typeDefs = fs.readFileSync("schema.graphql");
const sessionFactory = () => driver.session({ defaultAccessMode: neo4j.session.READ })

// Create instance that contains executable GraphQL schema from GraphQL type definitions
const neo4jGraphQL = new Neo4jGraphQL({
  typeDefs,
  driver,
});

// Generate schema
neo4jGraphQL.getSchema().then((schema) => {
  // Create ApolloServer instance to serve GraphQL schema
  const server = new ApolloServer({
    schema,
    context: { driverConfig: { database: "neo4j" } },
    //playground: true,
  });

  // Start ApolloServer
  server.listen().then(({ url }) => {
    console.log(`GraphQL server ready at ${url}`);
  });
});