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
    return positionPrefix + fileUid
}
async function findIndexByUid(rds, positionKey, uid) {
    const listLength = await rds.lLen(positionKey);
    for (let index = 0; index < listLength; index++) {
        const elementString = await rds.lIndex(positionKey, index);
        const element = JSON.parse(elementString);
        if (element && element.uid === uid) {
            return index;
        }
    }
    return -1; // 没有找到匹配的元素
}


const handleFunc = async (request: CustomRequest, reply: FastifyReply) => {
    const { fileUid, position, config } = request.body;
    const rds = PrimaryRepoInst.getRds();
    const positionKey = getPositionKey(position, fileUid);

    // 根据你的逻辑找到要更新的元素的索引
    const uidToUpdate = config.uid; // 用于匹配的 uid 值
    const indexToUpdate = await findIndexByUid(rds, positionKey, uidToUpdate);
    if (indexToUpdate === -1) {
        // 没有找到匹配的元素，返回错误响应
        reply.code(404).send({
            code: 1,
            message: '未找到匹配的元素'
        });
    } else {
        // 使用 LSET 命令更新列表中指定位置的元素
        await rds.lSet(positionKey, indexToUpdate, JSON.stringify(config));
        reply.code(200).send({
            code: 0,
            message: '更新成功'
        });
    }

}
export default async function () {
    return [opts, handleFunc];
}