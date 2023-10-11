import { FastifyReply, FastifyRequest, RouteShorthandOptions } from "fastify";
import { Reply, ReplyBody, centerControl } from "../../../main_control/define";
import load_schema from "../../../main_control/schema";
const opts: RouteShorthandOptions = {
    schema: {
        // response: {
        //     200:load_schema.get("BaseResponse")
        // },
        // body: load_schema.get("CreateProjectReq"),
    },
};

type CustomRequest = FastifyRequest<{
    Body: { database : string };
}>;


const handleFunc = async (request: CustomRequest, reply: FastifyReply) => {
    try{
        const {database} = request.body;
        const data = await centerControl.resetDb(database)
        return Reply(ReplyBody.success, ReplyBody.success_message, data);
    }catch(e){
        return Reply(ReplyBody.error,'更新数据库',e)
    }
};

export default async function () {
    return [opts, handleFunc];
}
