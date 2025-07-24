import { Hono } from 'hono'
import { handle } from 'hono/aws-lambda'
import { serve } from '@hono/node-server'
import { cors } from 'hono/cors'
import { usersRoute } from './routes/users.route'
import { communityRoute } from './routes/community.route'
import { localProductionRoute } from './routes/local-production.route'
import { messageRoute } from './routes/message.route'
import { searchRoute } from './routes/search.route'

const app = new Hono()

app.use('*', cors({
  origin: '*', 
  credentials: true,
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowHeaders: ['Content-Type', 'Authorization'],
}))

app.get('/', (c) => {
  return c.json({
    success: true,
    message: 'Hello Hono with Database!',
    timestamp: new Date().toISOString(),
  })
})

app.route('/api/users', usersRoute)
app.route('/api/sites', communityRoute)
app.route('/api/local-products', localProductionRoute)
app.route('/api/messages', messageRoute)
app.route('/api/search', searchRoute)

serve({
  fetch: app.fetch,
  port: 8001,
})

console.log('Server is running on http://localhost:8001')