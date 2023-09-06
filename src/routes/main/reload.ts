import {FastifyReply, FastifyRequest, RouteShorthandOptions} from "fastify";
import {RouteHandlerMethod} from "fastify/types/route";
import path from "path";
import {Reply, ReplyBody} from "../../main_control/define";


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
                    code:{
                        type:"number"
                    },
                    data:{
                        type:"object"
                    }
                }
            }
        },
        body: {
            userId:{
                type:"string"
            }
        }
    }
}

const handleFunc: RouteHandlerMethod = async (request: FastifyRequest, reply: FastifyReply) => {
    const {userId} = request.body
    const userDir = userId
    const userRoutePath = path.resolve(process.env.routes_path,userDir)
    // await load_routes(server,userRoutePath)
    return Reply(ReplyBody.success,ReplyBody.success_message,null)
}

export default function () {
    return [opts, handleFunc]
}


