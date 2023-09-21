import {FastifyReply, FastifyRequest, RouteShorthandOptions} from "fastify";
import path from "path";
import { Reply, ReplyBody} from "../../../main_control/define";
import {existsSync, mkdirSync, unlinkSync, writeFileSync} from "fs";
import load_schema from "../../../main_control/schema";


const routes = process.env.routes_path;

const opts: RouteShorthandOptions = {
    schema: {
        response: {
            200: load_schema.get("TouchTaroFileRsp")
        },
        body: load_schema.get("TaroBaseReq")
    }
}
type CustomRequest = FastifyRequest<{
    Body: {
        dir: string;
        content:string;
    };
}>

const handleFunc = async (request: CustomRequest, reply: FastifyReply) => {
    const {dir,content} = request.body
    const userTaroPath = path.resolve(routes,'taro')
    if(!existsSync(userTaroPath)){
        mkdirSync(userTaroPath)
    }
    const filePath = path.resolve(routes,"taro",dir+".taro");
    if(existsSync(filePath)){
        unlinkSync(filePath)
    }
    writeFileSync(filePath,content,{
        'encoding':'utf-8'
    })
    return Reply(ReplyBody.success, ReplyBody.success_message, null);
}

export default function () {
    return [opts, handleFunc]
}


