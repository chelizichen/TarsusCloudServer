import Fastify, {FastifyReply, FastifyRequest, RouteShorthandOptions} from "fastify";
import {centerControl, Reply, ReplyBody} from "../../main_control/define";
import os from "os"
import pidusage from 'pidusage';


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
                        type: "object",
                        properties: {
                            "cpu":{
                                type: "number"
                            },
                            "memory":{
                                type: "number"
                            },
                            "ppid":{
                                type: "number"
                            },
                            "pid":{
                                type: "number"
                            },
                            "ctime":{
                                type: "number"
                            },
                            "elapsed":{
                                type: "number"
                            },
                            "timestamp":{
                                type: "number"
                            } 
                        }
                    }
                }
            }
        },
        body: {
            pid: {
                type: "number"
            }
        }
    }
}
type CustomRequest = FastifyRequest<{
    Body: { pid: number };
}>

const handleFunc = async (request: CustomRequest, reply: FastifyReply) => {
    const {pid} = request.body
    // 判断数据准确性
    const status = await pidusage(pid)
    return Reply(ReplyBody.success, ReplyBody.success_message, status)
}

export default function () {
    return [opts, handleFunc]
}


