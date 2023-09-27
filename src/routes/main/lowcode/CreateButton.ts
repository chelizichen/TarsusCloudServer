import {FastifyReply, FastifyRequest, RouteShorthandOptions} from "fastify";
import {ElementUIComponents, FileConfig, PrimaryRepoInst} from '../../../main_control/define'

const opts: RouteShorthandOptions = {
    schema: {
    }
}
export enum ButtonType{
    Main,
    Common,
    Text
}

export type ButtonConfig = {
    click:string;
    uid:string;
    btnType:ButtonType;
    apiUid:string;
    text:string;
    type:ElementUIComponents.BUTTON
} & Pick<FileConfig,"fileUid">

type CustomRequest = FastifyRequest<{
    Body: ButtonConfig;
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