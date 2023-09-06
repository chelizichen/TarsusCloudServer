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