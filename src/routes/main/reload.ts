import {FastifyReply, FastifyRequest, RouteShorthandOptions} from "fastify";
import path from "path";
import {Reply, ReplyBody} from "../../main_control/define";
import {node_configs} from "../../main_control/reset";
import cluster from "cluster";


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
type CustomRequest = FastifyRequest<{
    Body: { userId: string };
}>

const handleFunc = async (request: CustomRequest, reply: FastifyReply) => {
    console.log(2)
    const {userId} = request.body
    const userDir = userId
    let env = node_configs.find(item=>item.port == Number(userId))
    console.log('env',env)
    await cluster.fork({
        fastify_config:JSON.stringify(env)
    })
    // const userRoutePath = path.resolve(process.env.routes_path,userDir)

    return Reply(ReplyBody.success,ReplyBody.success_message,null)
}

export default function () {
    return [opts, handleFunc]
}


