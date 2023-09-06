import {nodeStats} from "./reset";

export enum ReplyBody{
    success=0,
    error=-1,
    success_message="ok"
}
export const Reply = (code:ReplyBody,message:ReplyBody,data:any)=>{
    return{
        code,
        message,
        data
    }
}

export enum PathType{
    work="api",
    main="main"
}
export type node_config = {
    port:number,
    config:{
        isPrimary:boolean,
        stats:nodeStats,
        logger?:boolean,
        userPath?:string
    }
}