import { FastifyReply, FastifyRequest, RouteShorthandOptions } from "fastify";
import { Reply, ReplyBody, centerControl } from "../../../main_control/define";
import {  TarsusDBInst } from "../../../main_control/dbutils";


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
    try{
        let dbRecords = await TarsusDBInst.getAllDBRecords()
        dbRecords = dbRecords.map(item=>JSON.parse(item))
        return Reply(ReplyBody.success, ReplyBody.success_message, dbRecords);
    }catch(e){
        return Reply(ReplyBody.error,ReplyBody.mkdir_err,null)
    }
};

export default async function () {
    return [opts, handleFunc];
}
