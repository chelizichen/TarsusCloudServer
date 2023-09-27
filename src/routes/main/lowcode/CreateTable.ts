import {FastifyReply, FastifyRequest, RouteShorthandOptions} from "fastify";
import {ElementUIComponents, FileConfig, PrimaryRepoInst} from '../../../main_control/define'

const opts: RouteShorthandOptions = {
    schema: {
    }
}

type TableConfig = {
    data:Array<{
        columnName:string;
        filedName:string;
        isAlignCenter:boolean;
        isBorder:boolean;
        uid:string;
        type:ElementUIComponents.TABLE;
    }>;
    uid:string;
    modelData:string;//will create vmodel
} & FileConfig;

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
