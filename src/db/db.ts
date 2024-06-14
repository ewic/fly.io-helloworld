import { FastifyInstance } from "fastify"
import fastifyPostgres from "@fastify/postgres"

const dbConnectionString = process.env.DATABASE_URL

export const db = async (fastify: FastifyInstance, options: Object) => {
  fastify.register(fastifyPostgres, {
    connectionString: dbConnectionString
  })
} 