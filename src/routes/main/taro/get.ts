import {FastifyReply, FastifyRequest, RouteShorthandOptions} from "fastify";
import path from "path";
import { Reply, ReplyBody} from "../../../main_control/define";
import { readFileSync } from "fs";


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
                    data: {}
                }
            }
        },
        body: {
            dir: {type: "string"},
        }
    }
}
type CustomRequest = FastifyRequest<{
    Body: {
        dir: string;
    };
}>

const handleFunc = async (request: CustomRequest, reply: FastifyReply) => {
    const {dir} = request.body
    const filePath = path.resolve(routes,"taro",dir+".taro");
    const fileContent = readFileSync(filePath,"utf-8")
    return Reply(ReplyBody.success, ReplyBody.success_message, fileContent);
}

export default function () {
    return [opts, handleFunc]
}


