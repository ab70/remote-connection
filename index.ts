import { Hono } from 'hono'
import { db } from './src/db/db';
import initRoute from './src/route/route';

const app = new Hono()

app.get('/', (c) => {
  // return c.text('Hello Hono!')
  console.log("ENV", process.env.HOST);
  
  return c.json({ message: 'Hello Hono!', jj:"kk" })
})
initRoute(app);


export default {
  fetch: app.fetch,
  port: 4001,
}