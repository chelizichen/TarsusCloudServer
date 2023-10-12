import { FastifyReply, FastifyRequest, RouteShorthandOptions } from "fastify";
import { Reply, ReplyBody, centerControl } from "../../../main_control/define";
import load_schema from "../../../main_control/schema";
import { SelectConfig, TarsusDBInst } from "../../../main_control/dbutils";

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

}>;


const handleFunc = async (request: CustomRequest, reply: FastifyReply) => {
    const generateSql = TarsusDBInst.getAllDBRecords()
    try{
        const data = await centerControl.query(generateSql)
        return Reply(ReplyBody.success, ReplyBody.success_message, data);
    }catch(e){
        return Reply(ReplyBody.error,ReplyBody.mkdir_err,null)
    }
};

export default async function () {
    return [opts, handleFunc];
}
