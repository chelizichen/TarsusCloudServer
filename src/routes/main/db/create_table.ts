import { FastifyReply, FastifyRequest, RouteShorthandOptions } from "fastify";
import { Reply, ReplyBody, centerControl } from "../../../main_control/define";

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
    Body: {
        createSql:string;
    }
}>;


const handleFunc = async (request: CustomRequest, reply: FastifyReply) => {
    const {createSql} = request.body
    try{
        console.log('createSql',createSql)
        const data = await centerControl.query(createSql)
        return Reply(ReplyBody.success, ReplyBody.success_message, data);
    }catch(e){
        return Reply(ReplyBody.error,'执行SQL失败',e)
    }
};

export default async function () {
    return [opts, handleFunc];
}
