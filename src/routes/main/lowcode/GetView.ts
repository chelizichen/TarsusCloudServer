import {FastifyReply, FastifyRequest, RouteShorthandOptions} from "fastify";
import { PrimaryRepoInst} from '../../../main_control/define'
import lodash from 'lodash';

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
    const omitData = lodash.omit(data,'fileName')
    for(let v in omitData){
        omitData[v] = JSON.parse(omitData[v])
    }
    // @ts-ignore
    const groupedData = lodash.groupBy(omitData, item => item.type);
    reply.code(200).send({
        code:0,
        message:'ok',
        data:groupedData
    })
}
export default async function () {
    return [opts, handleFunc];
}