import {FastifyReply, FastifyRequest, RouteShorthandOptions} from "fastify";
import {RouteHandlerMethod} from "fastify/types/route";
import path from "path";
import fs from "fs";
import {Reply, ReplyBody} from "../../../main_control/define";

const routes = process.env.routes_path;

const opts: RouteShorthandOptions = {
    schema: {
        response: {
            200: {
                type: 'object',
                properties: {
                    message: {
                        type: 'string'
                    },
                    code: {
                        type: "number"
                    },
                    data: {
                        type: "object"
                    }
                }
            }
        },
        body: {
            userId: {
                type: "string"
            }
        }
    }
}

type CustomRequest = FastifyRequest<{
    Body: { userId: string };
}>

const handleFunc = async (request: CustomRequest, reply: FastifyReply) => {
    const {userId} = request.body

    return Reply(ReplyBody.success, ReplyBody.success_message, {userId})
}
export default [opts, handleFunc]

