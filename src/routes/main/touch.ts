import {FastifyReply, FastifyRequest, RouteShorthandOptions} from "fastify";
import {RouteHandlerMethod} from "fastify/types/route";
import path from "path";
import fs from "fs";
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
    console.log(3)
    return {test: '11it worked!'}
    // const {userId} = await request.body
    // const userDir = userId;
    // const data = await request.file();
    // const fileContent = await data.toBuffer();
    // const originalFilename = data.filename;
    // const file_path = path.resolve(routes,userDir, originalFilename)
    // fs.writeFileSync(file_path, fileContent)
    // return Reply(ReplyBody.success,ReplyBody.success_message,null)
}

export default function () {
    return [opts, handleFunc]
}


