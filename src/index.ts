import 'reflect-metadata';
import express, { Application } from 'express';
import { ApolloServer } from 'apollo-server-express';
import mongoose from 'mongoose';
import { buildSchema } from 'type-graphql';
import resolvers from './resolvers/Index';

async function startServer() {
  const app: Application = express();

  // Connect to MongoDB
  await mongoose.connect('mongodb://localhost:27017/issuesdb', {});

  const schema = await buildSchema({
    resolvers: [resolvers],
  });

  const server = new ApolloServer({
    schema,
    context: (req: any) => {
      // Pass the authenticated user to resolvers
      return { user: req.user };
    },
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
