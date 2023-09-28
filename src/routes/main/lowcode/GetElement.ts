import {FastifyReply, FastifyRequest, RouteShorthandOptions} from "fastify";
import {PrimaryRepoInst} from '../../../main_control/define'
import {ElementConfig, ElementPosition} from "./AddElement";

const opts: RouteShorthandOptions = {
    schema: {}
}



type CustomRequest = FastifyRequest<{
    Body: Omit<ElementConfig,"config">;
}>

function getPositionKey(positionPrefix:ElementPosition,fileUid){
    return positionPrefix + fileUid
}

const handleFunc = async (request: CustomRequest, reply: FastifyReply) => {
    const {fileUid, position} = request.body
    const rds = PrimaryRepoInst.getRds()
    const positionKey = getPositionKey(position,fileUid)
    const data = await rds.lRange(positionKey, 0,-1)
    reply.code(200).send({
        code: 0,
        message: 'ok',
        data:data.map(item=>JSON.parse(item))
    })
}
export default async function () {
    return [opts, handleFunc];
}