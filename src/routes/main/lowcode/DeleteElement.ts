import {FastifyReply, FastifyRequest, RouteShorthandOptions} from "fastify";
import {PrimaryRepoInst} from '../../../main_control/define'
import {ElementConfig, ElementPosition} from "./AddElement";

const opts: RouteShorthandOptions = {
    schema: {}
}



type CustomRequest = FastifyRequest<{
    Body: ElementConfig;
}>

function getPositionKey(positionPrefix: ElementPosition, fileUid) {
    const key = positionPrefix + fileUid
    return key
}


const handleFunc = async (request: CustomRequest, reply: FastifyReply) => {
    const {fileUid, position, config,} = request.body
    const rds = PrimaryRepoInst.getRds()
    const positionKey = getPositionKey(position, fileUid)
    const deletedCount = await rds.lRem(positionKey, 0, JSON.stringify(config));
    reply.code(200).send({
        code: 0,
        message: 'ok',
        data:deletedCount
    })
}
export default async function () {
    return [opts, handleFunc];
}