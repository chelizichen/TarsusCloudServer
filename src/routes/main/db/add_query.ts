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
    Body:{
        sql:string;
        fileName:string;
        source:string;
        database:string;
    }
}>;


const handleFunc = async (request: CustomRequest, reply: FastifyReply) => {
    const {sql} = request.body
    try{
        if(!request.body.fileName) return Reply(ReplyBody.error, "请输入目录",null)
        const data = await centerControl.query(sql)
        await TarsusDBInst.setDBQueryFileRecord(request.body);
        return Reply(ReplyBody.success, ReplyBody.success_message, data);
    }catch(e){
        return Reply(ReplyBody.error,"请求失败",null)
    }
};

export default async function () {
    return [opts, handleFunc];
}
