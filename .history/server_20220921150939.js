const { Neo4jGraphQL } = require("@neo4j/graphql");
const { ApolloServer, gql } = require("apollo-server");
const neo4j = require("neo4j-driver");
require('dotenv').config()


// Create Neo4j driver instance
const driver = neo4j.driver(
    process.env.AURA_ENDPOINT,
  neo4j.auth.basic(
    process.env.AURA_USERNAME,
    process.env.AURA_PASSWORD
  )
);

const typeDefs = gql`
  type Person {
    name: String
    knows: [Person!]! @relationship(type: "KNOWS", direction: OUT)
    friendCount: Int
      @cypher(statement: "RETURN SIZE((this)-[:KNOWS]->(:Person))")
  }
`;

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
    //introspection: true,
    //playground: true,
  });

  // Start ApolloServer
  server.listen().then(({ url }) => {
    console.log(`GraphQL server ready at ${url}`);
  });
});