import Fastify, {FastifyReply, FastifyRequest, RouteShorthandOptions} from "fastify";
import path from "path";
import {centerControl, Reply, ReplyBody} from "../../main_control/define";
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
            port: {
                type: "number"
            }
        }
    }
}
type CustomRequest = FastifyRequest<{
    Body: { port: number };
}>

const handleFunc = async (request: CustomRequest, reply: FastifyReply) => {
    const {port} = request.body
    // 通过用户ID查PID
    const row = await centerControl.getByPort(port)
    for (const id in cluster.workers) {
        if (Number(row.pid) == Number(cluster.workers[id].process.pid)) {
            cluster.workers[id].send("shutdown");
            console.log("已发送关闭请求")
        }
    }
    return Reply(ReplyBody.success, ReplyBody.success_message, null)
}

export default function () {
    return [opts, handleFunc]
}


