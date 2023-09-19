import { FastifyReply, FastifyRequest, RouteShorthandOptions } from "fastify";
import { RouteHandlerMethod } from "fastify/types/route";
import path from "path";
import fs from "fs";
import { Reply, ReplyBody, centerControl } from "../../../main_control/define";
import moment from "moment";
import load_schema from "../../../main_control/schema";

const routes = process.env.routes_path;

const opts: RouteShorthandOptions = {
    schema: {
        response: {
            200:load_schema.get("BaseResponse")
        },
        body: load_schema.get("CreateProjectReq"),
    },
};

type CustomRequest = FastifyRequest<{
    Body: { dir: string; user_id: string; description: string; port: string; };
}>;

function getDirObj(body) {
    const { dir, user_id, port,description,release_version } = body;
    const dbRows: Record<string, any> = {}
    dbRows.user_id = user_id
    dbRows.dir = dir
    dbRows.primary_id = 1
    dbRows.port = port
    dbRows.release_version = release_version
    dbRows.description = description
    dbRows.create_time = moment().format("YYYY-MM-DD HH:mm:ss")
    return dbRows;
}

const handleFunc = async (request: CustomRequest, reply: FastifyReply) => {
    debugger
    const { dir } = request.body;
    const dbRows = getDirObj(request.body);
    const dirPath = path.resolve(routes, "api", dir);
    const taroPath = path.resolve(routes, "taro", dir+".taro");
    const taroTsPath = path.resolve(routes, "taro", dir+".ts");
    try{
        await centerControl.saveDirs(dbRows)
        fs.mkdirSync(dirPath);
        // todo 写结构体文件和TS
    
        return Reply(ReplyBody.success, ReplyBody.success_message, {
            dirPath: dirPath,
        });
    }catch(e){
        return Reply(ReplyBody.error,ReplyBody.mkdir_err,null)
    }

};

export default async function () {
    return [opts, handleFunc];
}
