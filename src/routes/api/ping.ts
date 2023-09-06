import {FastifyReply, FastifyRequest, RouteShorthandOptions} from "fastify";
import {RouteHandlerMethod} from "fastify/types/route";

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
        },
        querystring: {}
    }
}

const handleFunc: RouteHandlerMethod = (request: FastifyRequest, reply: FastifyReply) => {
    return {pong: 'it worked!33'}
}

export default function () {
    return [opts, handleFunc]
}

