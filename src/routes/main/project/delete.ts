import { FastifyReply, FastifyRequest, RouteShorthandOptions } from "fastify";
import path from "path";
import fs, {existsSync, unlinkSync} from "fs";
import { Reply, ReplyBody, centerControl } from "../../../main_control/define";
import load_schema from "../../../main_control/schema";
import fsExtra from 'fs-extra'

const routes = process.env.routes_path;

const opts: RouteShorthandOptions = {
    schema: {
        response: {
            200:load_schema.get("BaseResponse")
        },
        body: load_schema.get("DeleteProjectReq"),
    },
};

type CustomRequest = FastifyRequest<{
    Body: { id:string;dir:string };
}>;


const handleFunc = async (request: CustomRequest, reply: FastifyReply) => {
    const { id,dir } = request.body;
    const dirPath = path.resolve(routes, "api", dir);
    const taroPath = path.resolve(routes, "taro", dir+".taro");
    const taroTsPath = path.resolve(routes, "taro", dir+".js");
    try{
        if(existsSync(dirPath)){
            fsExtra.removeSync(dirPath)
        }
        if(existsSync(taroPath)){
            unlinkSync(taroPath)
        }
        if(existsSync(taroTsPath)){
            unlinkSync(taroTsPath)
        }
        const delRet = await centerControl.delDirs(id,dir)
        console.log(delRet);
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
