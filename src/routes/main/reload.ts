import {FastifyReply, FastifyRequest, RouteShorthandOptions} from "fastify";
import path from "path";
import {centerControl, node_config, Reply, ReplyBody} from "../../main_control/define";
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
            port:{
                type:"number"
            }
        }
    }
}
type CustomRequest = FastifyRequest<{
    Body: { port: number };
}>

const handleFunc = async (request: CustomRequest, reply: FastifyReply) => {
    const {port} = request.body
    const env:node_config = await  centerControl.getByPort(port);
    console.log("env",env)
    cluster.fork({
        fastify_config:JSON.stringify(env)
    })
    // const userRoutePath = path.resolve(process.env.routes_path,userDir)

    return Reply(ReplyBody.success,ReplyBody.success_message,null)
}

export default function () {
    return [opts, handleFunc]
}


