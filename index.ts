import { Hono } from 'hono'
import { db } from './src/db/db';
import initRoute from './src/route/route';

import { createSchema, createYoga } from 'graphql-yoga'; 
import { createUser, getUserByCredentials } from './src/graphql/auth';
const app = new Hono()

// const schema = buildSchema(`
// type Query {
//   hello: String
// }
// `)
const yoga = createYoga({
  schema: createSchema({
    typeDefs: /* GraphQL */ `
      type User {
        id: ID!
        email: String!
        password: String! # Password should not be stored in plain text
      }

      type Query {
        user(email: String!, password: String!): User
      }

      type Mutation {
        signup(email: String!, password: String!): User
        login(email: String!, password: String!): String # Token or similar identifier
      }
    `,
    resolvers: {
      Query: {
        // greetings: () => 'Hello from Yoga in a Bun app!',
        user: async (_, { email, password }) => {
          const user = await getUserByCredentials({email, password});
          return user; // Return user object if found, otherwise null
        }
      },
      Mutation: {
        signup: async (c, { email, password }) => {
          const newUser = await createUser({email, password});
          return newUser;
        },
        login: async (c, { email, password }) => {
          const user = await getUserByCredentials({email, password});
          // if (user) {
          //   // Generate and return JWT token or other authentication identifier
          //   // Replace with your actual token generation logic
          //   const token = 'your_generated_token';
          //   return token;
          // } else {
          //   return null; // Indicate failed login
          // }
        }
      }
    }
  }),
  graphqlEndpoint: "/gql"
})



// app.get('/', (c) => {
//   // return c.text('Hello Hono!')
//   console.log("ENV", process.env.HOST);

//   return c.json({ message: 'Hello Hono!', jj:"kk" })
// })
// initRoute(app);


export default {
  fetch: yoga,
  port: 4001,
}
