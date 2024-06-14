import Fastify, { FastifyInstance, FastifyRequest, RouteShorthandOptions } from 'fastify'
import { db } from './db/db'
import fastifyPostgres from '@fastify/postgres'
import 'dotenv/config'
import { Http2ServerRequest, Http2ServerResponse } from 'http2'

const app: FastifyInstance = Fastify({})
const dbConnectionString = process.env.DATABASE_URL

app.register(fastifyPostgres, {
  connectionString: dbConnectionString
})

const opts: RouteShorthandOptions = {
  schema: {
    response: {
      200: {
        type: 'object',
        properties: {
          hello: {
            type: 'string'
          }
        }
      }
    }
  }
}

app.get('/', opts, async (req, res) => {
  return { hello: "world" }
})

type userRequest = FastifyRequest<{
  Params: { id: string } 
}>

app.get('/users/:id', opts, async (req: userRequest, res) => {
  const { id } = req.params;
  return app.pg.connect(onConnect);
  async function onConnect(err: any, client: any, release: any) {
    if (err) return res.send(err);

    const data = await client.query(
      'SELECT * FROM accounts',
      (err: any, result: any) => {
        return (err || result)
      })

    console.log(data);

  }
  

  return { hello: `${id}` }
})

const start = async () => {
  try {

    await app.listen({ port: 3000 })

    const address = app.server.address()
    const port = typeof address === 'string' ? address : address?.port

  } catch (err) {
    app.log.error(err)
    process.exit(1)
  }
}

start()