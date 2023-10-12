import { FastifyReply, FastifyRequest, RouteShorthandOptions } from "fastify";
import { Reply, ReplyBody, centerControl } from "../../../main_control/define";
import load_schema from "../../../main_control/schema";
import { PoolOptions } from "mysql2";
const opts: RouteShorthandOptions = {
    schema: {
        // response: {
        //     200:load_schema.get("BaseResponse")
        // },
        // body: load_schema.get("CreateProjectReq"),
    },
};

type CustomRequest = FastifyRequest<{
    Body: PoolOptions & { type : 1 | 2};
}>;


const handleFunc = async (request: CustomRequest, reply: FastifyReply) => {
    try{
        const {database,type} = request.body;
        let data;
        if(type == 1){
            data = await centerControl.resetDb(database)
        }else{
            data = await centerControl.resetDb(request.body);
        }
        return Reply(ReplyBody.success, ReplyBody.success_message, data);
    }catch(e){
        return Reply(ReplyBody.error,'更新数据库',e)
    }
};

export default async function () {
    return [opts, handleFunc];
}
