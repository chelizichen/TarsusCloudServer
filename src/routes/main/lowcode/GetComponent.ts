import {FastifyReply, FastifyRequest, RouteShorthandOptions} from "fastify";
import {PrimaryRepoInst} from '../../../main_control/define'

const opts: RouteShorthandOptions = {
    schema: {
    }
}


type CustomRequest = FastifyRequest<{
    Body: {
        uid:string;
        fileUid:string;
    };
}>

const handleFunc = async (request: CustomRequest, reply: FastifyReply) => {
    const {uid,fileUid} = request.body
    const rds = PrimaryRepoInst.getRds()
    const data = await rds.hGet(fileUid,uid);
    const ret = JSON.parse(data)
    reply.code(200).send({
        code:0,
        message:'ok',
        data:ret
    })
}
export default async function () {
    return [opts, handleFunc];
}