import "reflect-metadata";
import { createConnection, getConnectionOptions } from "typeorm";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { ExerciseResolver } from "./resolvers/ExerciseResolver";

(async () => {
  const app = express();

  const options = await getConnectionOptions(
    process.env.NODE_ENV || "development"
  );
  await createConnection({ ...options, name: "default" });

  const schema = await buildSchema({
    resolvers: [ExerciseResolver],
    validate: true
  })

  const corsOptions = {
    origin: "http://localhost:3000",
    credentials: true
  };

  const apolloServer = new ApolloServer({
    schema,
    context: ({ req, res }) => ({ req, res }),
  });

  apolloServer.applyMiddleware({ app, cors: corsOptions });
  const port = process.env.PORT || 4000;


  app.listen(port, () => {
    console.log(`server started at http://localhost:${port}/graphql`);
  });
})().catch(err => {
  console.error(err)
});
