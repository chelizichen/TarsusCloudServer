import {FastifyReply, FastifyRequest, RouteShorthandOptions} from "fastify";
import {PrimaryRepoInst} from '../../../main_control/define'

const opts: RouteShorthandOptions = {
    schema: {
    }
}


type CustomRequest = FastifyRequest<{
}>

const handleFunc = async (request: CustomRequest, reply: FastifyReply) => {
    const rds = PrimaryRepoInst.getRds()
    const data = await rds.lRange('FileUids',0,-1)
    const ret = data.map(item=>JSON.parse(item))
    reply.code(200).send({
        code:0,
        message:'ok',
        data:ret
    })
}
export default async function () {
    return [opts, handleFunc];
}