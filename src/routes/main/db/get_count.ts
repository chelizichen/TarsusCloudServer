import {FastifyReply, FastifyRequest, RouteShorthandOptions} from "fastify";
import {centerControl, Reply, ReplyBody} from "../../../main_control/define";
import {TarsusDBInst} from "../../../main_control/dbutils";

const routes = process.env.routes_path;

const opts: RouteShorthandOptions = {
    schema: {
        // response: {
        //     200:load_schema.get("BaseResponse")
        // },
        // body: load_schema.get("CreateProjectReq"),
    },
};

type CustomRequest = FastifyRequest<{
    Querystring:{
        tableName:string;
    }
}>;


const handleFunc = async (request: CustomRequest, reply: FastifyReply) => {
    const {tableName} = request.query;
    try{
        if(!tableName) return Reply(ReplyBody.error, "请输入表名",null)
        const data = await centerControl.queryCount(tableName)
        return Reply(ReplyBody.success, ReplyBody.success_message, data);
    }catch(e){
        return Reply(ReplyBody.error,"请求失败",null)
    }
};

export default async function () {
    return [opts, handleFunc];
}
