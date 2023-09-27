import {FastifyReply, FastifyRequest, RouteShorthandOptions} from "fastify";
import { PrimaryRepoInst} from '../../../main_control/define'

const opts: RouteShorthandOptions = {
    schema: {
    }
}

type GetView = {
    uid:string;
}

type CustomRequest = FastifyRequest<{
    Body: GetView;
}>

const handleFunc = async (request: CustomRequest, reply: FastifyReply) => {
    const {uid} = request.body
    const rds = PrimaryRepoInst.getRds()
    const data = await rds.hGetAll(uid)
    reply.code(200).send({
        code:0,
        message:'ok',
        data
    })
}
export default async function () {
    return [opts, handleFunc];
}