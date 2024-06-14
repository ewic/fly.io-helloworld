import Fastify, { FastifyInstance, RouteShorthandOptions } from 'fastify'

const app: FastifyInstance = Fastify({})

const opts: RouteShorthandOptions = {
  schema: {
    response: {
      200: {
        type: 'object',
        properties: {
          pong: {
            type: 'string'
          }
        }
      }
    }
  }
}

app.get('/', opts, async (req, res) => {
  return '<h1>hello world</h1>'
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