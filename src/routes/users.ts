import { FastifyInstance, FastifyRequest } from "fastify";

type userRequest = FastifyRequest<{
  Params: { id: string }
}>

async function routes (app: FastifyInstance, options: Object) {
  
}