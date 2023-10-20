class TarsusCloudError extends Error {
    public err:string
    constructor(err:any) {
        super(err.message);
        this.err = err;
    }

    static SettedErrors:Record<string,any> = {}

    static GetGlobalError(errorName){
        return new TarsusCloudError(TarsusCloudError.SettedErrors[errorName])
    }
    static RegistryGlobalError(errorName:string,errorConfig:{code:number,message:string}){
        TarsusCloudError.SettedErrors[errorName] = errorConfig;
    }
}

const InterFaceError = () => new TarsusCloudError({ code: -1, message: 'error:接口异常' })
const OutTimeError   = () => new TarsusCloudError({ code: -2, message: 'error:超时异常' })
const TouchError     = () => new TarsusCloudError({ code: -3, message: 'error:创建文件异常' })
const MakeDirError   = () => new TarsusCloudError({ code: -4, message: 'error:创建目录异常' })
const ResetError     = () => new TarsusCloudError({ code: -5, message: 'error:重启服务异常' })
const DBResetError   = () => new TarsusCloudError({ code: -6, message: 'error:重启数据库异常' })
const DBError        = () => new TarsusCloudError({ code: -7, message: 'error:数据库异常' })
const CacheError     = () => new TarsusCloudError({ code: -8, message: 'error:缓存异常' })

export default {
    InterFaceError,
    OutTimeError  ,
    TouchError    ,
    MakeDirError  ,
    ResetError    ,
    DBResetError  ,
    DBError       ,
    CacheError    ,
}