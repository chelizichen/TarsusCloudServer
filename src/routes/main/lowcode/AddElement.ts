import {FastifyReply, FastifyRequest, RouteShorthandOptions} from "fastify";
import {PrimaryRepoInst} from '../../../main_control/define'

const opts: RouteShorthandOptions = {
    schema: {}
}

export enum ElementPosition {
    Top = "TopElement",
    Table = "TableElement"
}

export type ElementConfig = {
    fileUid: string;
    position: ElementPosition;
    config: Record<string, any> & {
        uid:string
    }
}

type CustomRequest = FastifyRequest<{
    Body: ElementConfig;
}>

function getPositionKey(positionPrefix:ElementPosition,fileUid){
    const key = positionPrefix + fileUid
    return key
}

const handleFunc = async (request: CustomRequest, reply: FastifyReply) => {
    const {fileUid, position, config,} = request.body
    const rds = PrimaryRepoInst.getRds()
    const positionKey = getPositionKey(position,fileUid)
    await rds.lPush(positionKey, JSON.stringify(config))
    reply.code(200).send({
        code: 0,
        message: 'ok'
    })
}
export default async function () {
    return [opts, handleFunc];
}