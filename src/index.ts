import 'reflect-metadata';
import express, { Application } from 'express';
import { ApolloServer } from 'apollo-server-express';
import mongoose from 'mongoose';
import { buildSchema } from 'type-graphql';
import { IssueResolver } from './resolvers/IssueResolver';

async function startServer() {
  const app: Application = express();

  // Connect to MongoDB
  await mongoose.connect('mongodb://localhost:27017/issuesdb', {});

  const schema = await buildSchema({
    resolvers: [IssueResolver],
  });

  const server = new ApolloServer({
    schema,
  });

  await server.start();
  server.applyMiddleware({ app });

  app.listen(4000, () => {
    console.log('Server running on http://localhost:4000/graphql');
  });
}

startServer().catch((error) => {
  console.error('Server failed to start:', error);
});
