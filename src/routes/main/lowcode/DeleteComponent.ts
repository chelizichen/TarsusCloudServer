import {FastifyReply, FastifyRequest, RouteShorthandOptions} from "fastify";
import {PrimaryRepoInst} from '../../../main_control/define'

const opts: RouteShorthandOptions = {
    schema: {
    }
}

type FileConfig = {
    fileUid:string
    uid:string;
}

type CustomRequest = FastifyRequest<{
    Body: FileConfig;
}>

const handleFunc = async (request: CustomRequest, reply: FastifyReply) => {
    const {fileUid,uid} = request.body
    const rds = PrimaryRepoInst.getRds()
    await rds.hDel(fileUid as any,uid as any)
    reply.code(200).send({
        code:0,
        message:'ok'
    })
}
export default async function () {
    return [opts, handleFunc];
}