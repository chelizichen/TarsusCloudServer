import { FastifyReply, FastifyRequest, RouteShorthandOptions } from "fastify";
import { Reply, ReplyBody, centerControl } from "../../../main_control/define";
import load_schema from "../../../main_control/schema";

const routes = process.env.routes_path;

const opts: RouteShorthandOptions = {
    schema: {
        // response: {
        //     200:load_schema.get("BaseResponse")
        // },
        body: load_schema.get("CreateProjectReq"),
    },
};

type CustomRequest = FastifyRequest<{
    Body: { dir: string; user_id: string; };
}>;


const handleFunc = async (request: CustomRequest, reply: FastifyReply) => {
    try{
        const data = await centerControl.showTables()
        return Reply(ReplyBody.success, ReplyBody.success_message, data);
    }catch(e){
        return Reply(ReplyBody.error,'查询数据库表错误',e)
    }

};

export default async function () {
    return [opts, handleFunc];
}
