import { createSchema, createYoga } from 'graphql-yoga';
import { createUser, getUserByCredentials, loginUser } from '../../src/graphql/auth';
import { sign } from "hono/jwt"
import { setSignedCookie } from "hono/cookie"
import { hResponse } from '../utils/types';



const yogaConf = createYoga({
    schema: createSchema({
        typeDefs: /* GraphQL */ `
        type User {
          id: ID!
          username: String!
          password: String! # Password should not be stored in plain text
        }
  
        type Query {
          user(username: String!, password: String!): User
        }
  
        type Mutation {
          signup(username: String!, password: String!): User
          login(username: String!, password: String!): String # Token or similar identifier
        }
      `,
        resolvers: {
            Query: {
                user: async (c, { username, password }) => {
                    const findUser: hResponse = await loginUser(c, { username, password });                    
                    if (findUser.success) {        
                        const jwtData = { id: findUser.data.id }
                        const JWT_SECRET: string = process.env.JWT_SECRET || '';
                        console.log("Jwt", JWT_SECRET);
                        
                        const accessToken = await sign({ jwtData, exp: Date.now() + 60 * 15 }, JWT_SECRET);
                        console.log("accesstoken", accessToken);
                        
                        await setSignedCookie(c, "JWT_TOKEN", accessToken, JWT_SECRET, { httpOnly: false,  secure: false, signingSecret: JWT_SECRET, sameSite: "Lax" })
                        return findUser.data
                    } else {
                        return null
                    }
                }
            },
            Mutation: {
                signup: async (c, { username, password }) => {
                    const newUser = await createUser({ username, password });
                    return newUser;
                },
                login: async (c, { username, password }) => {
                    const user = await getUserByCredentials(c, { username, password });
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
    graphqlEndpoint: "/graphql"
})
export default yogaConf;  