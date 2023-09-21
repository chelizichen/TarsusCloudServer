import {FastifyReply, FastifyRequest, RouteShorthandOptions} from "fastify";
import path from "path";
import { Reply, ReplyBody} from "../../../main_control/define";
import { readFileSync } from "fs";
import load_schema from "../../../main_control/schema";


const routes = process.env.routes_path;

const opts: RouteShorthandOptions = {
    schema: {
        response: {
            200: load_schema.get("GetTaroFileRsp")
        },
        body: load_schema.get("TaroBaseReq"),
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


