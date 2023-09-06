import {FastifyReply, FastifyRequest, RouteShorthandOptions} from "fastify";
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
    // 通过用户ID查PID
    const pid: string = await centerControl.getPidByUserId(userId)
    console.log("开始比较PID")
    console.log(pid)
    // const userRoutePath = path.resolve(process.env.routes_path,userDir)
    for (const id in cluster.workers) {
        console.log("WorkerPID")
        console.log(cluster.workers[id].process.pid)
        if (Number(pid) == Number(cluster.workers[id].process.pid)) {
            cluster.workers[id].send("shutdown");
            console.log("已发送关闭请求")
        }
    }
    return Reply(ReplyBody.success, ReplyBody.success_message, null)
}

export default function () {
    return [opts, handleFunc]
}


