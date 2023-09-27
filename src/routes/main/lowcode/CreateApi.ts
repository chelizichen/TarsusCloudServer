import {FastifyReply, FastifyRequest, RouteShorthandOptions} from "fastify";
import {ApiType, ElementUIComponents, FileConfig, PrimaryRepoInst} from '../../../main_control/define'

const opts: RouteShorthandOptions = {
    schema: {
    }
}

type ApiConfig={
    ApiType:ApiType;
    uid:string;
    targetUid:string;
    type:ElementUIComponents.API
} & FileConfig


type CustomRequest = FastifyRequest<{
    Body: ApiConfig;
}>

const handleFunc = async (request: CustomRequest, reply: FastifyReply) => {
    const {uid,fileUid} = request.body
    const rds = PrimaryRepoInst.getRds()
    const val2stf = JSON.stringify(request.body);
    await rds.hSet(fileUid,uid,val2stf)
    reply.code(200).send({
        code:0,
        message:'ok'
    })
}
export default async function () {
    return [opts, handleFunc];
}