import { Hono } from 'hono'
import { db } from './src/db/db';
import initRoute from './src/route/route';
import { cors } from "hono/cors"
const app = new Hono()

initRoute(app)

export default {
  // fetch: yogaConf.fetch,
  fetch: app.fetch,
  port: 4001,
}
