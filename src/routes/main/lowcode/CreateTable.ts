import {FastifyReply, FastifyRequest, RouteShorthandOptions} from "fastify";
import {ElementUIComponents, FileConfig, PrimaryRepoInst} from '../../../main_control/define'

const opts: RouteShorthandOptions = {
    schema: {
    }
}

export type TableConfig = {
    data:Array<{
        columnName:string;
        filedName:string;
        columnUid:string;
    }>;
    modelData:string;//will create vmodel
    uid:string;
    text:string;
    isBorder:boolean;
    isAlignCenter:boolean;
    type:ElementUIComponents.TABLE;
} & Pick<FileConfig, 'fileUid'>;

type CustomRequest = FastifyRequest<{
    Body: TableConfig;
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
