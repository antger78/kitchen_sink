const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const path = require("path");

const { authMiddleware } = require('./utils/auth');
const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');

const PORT = process.env.PORT || 3001;
const app = express();

// const startServer = async () => {
  // create a new Apollo server and pass in schema
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: authMiddleware
  });

  // start server and apply middleware
  // await server.start();
  server.applyMiddleware({ app });
  console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
// };

// startServer();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// if production, serve static assets from client/build
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

db.once("open", () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });
});
