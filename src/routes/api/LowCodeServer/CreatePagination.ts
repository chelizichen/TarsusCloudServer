import {FastifyReply, FastifyRequest, RouteShorthandOptions} from "fastify";
import {ElementUIComponents, FileConfig, PrimaryRepoInst} from '../../../main_control/define'

const opts: RouteShorthandOptions = {
    schema: {
    }
}

type PaginationConfig = {
    NameOfOffset:string; // will create vmodel
    NameOfSize:string; // will create vmodel
    QueryApi:string;
    uid:string;
    targetTableUid:string;
    type:ElementUIComponents.PAGINATION
} & FileConfig

type CustomRequest = FastifyRequest<{
    Body: PaginationConfig;
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
export default [opts, handleFunc]

