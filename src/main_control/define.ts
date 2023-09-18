import {nodeStats} from "./reset";
import {createPool} from 'mysql2'
import {Pool, PoolOptions} from 'mysql2'

export enum ReplyBody {
    success = 0,
    error = -1,
    success_message = "ok",
    mkdir_err="创建目录失败"
}

export const Reply = (code: ReplyBody, message: ReplyBody, data: any) => {
    return {
        code,
        message,
        data
    }
}

export enum PathType {
    work = "api",
    main = "main"
}

export type node_config = {
    id: number,
    port: number,
    is_primary: boolean,
    dir: string,
    user_id: string,
    pid?: string,
    primary_id: string,
}


class PrimaryRepo {

    // private _RedisTemplate: RedisClientType;
    private _DbConnection: Pool

    public getDB(): Pool {
        return this._DbConnection;
    }

    constructor() {
        this.setDB();
    }

    public setDB() {
        const poolConfig: PoolOptions = {
            user: "root",
            password: "123456",
            port: 3306,
            host: "localhost",
            database: "serverless",
            connectionLimit: 10,
        }
        this._DbConnection = createPool(poolConfig);
    }
}

const PrimaryRepoInst = new PrimaryRepo()

class CenterControl {
    public async setPid(port: string, pid: string | number) {
        let setPidSql = `
            update dirs set pid = ${pid} where port = ${port}
        `
        let conn = PrimaryRepoInst.getDB().promise()
        const data = await conn.query(setPidSql)
        console.log(data)

    }

    public async getPrimary() {
        let setPidSql = `
            select * from dirs where is_primary = 1
        `
        let conn = PrimaryRepoInst.getDB().promise()
        const [row, fields] = await conn.query(setPidSql)
        return row[0] || ""
    }

    public async getWorkers(): Promise<node_config[]> {
        let setPidSql = `
            select * from dirs where is_primary = 0 or is_primary IS NULL
        `
        let conn = PrimaryRepoInst.getDB().promise()
        const [row, fields] = await conn.query(setPidSql)
        return row as node_config[]
    }

    public async getByPort(port: number) {
        let portSql = `
            select * from dirs where port = ${port}
        `
        let conn = PrimaryRepoInst.getDB().promise()
        const [row, fields]: any[] = await conn.query(portSql)
        console.log('data', row[0].pid)
        return row[0] || {}
    }

    public async getByPidAndPort(pid: number,port:number) {
        let portSql = `
            select * from dirs where port = ${port} and pid = ${pid}
        `
        let conn = PrimaryRepoInst.getDB().promise()
        const [row, fields]: any[] = await conn.query(portSql)
        console.log('data', row[0].pid)
        return row[0] || {}
    }

    public async getAccount(user_name, password) {
        let portSql = `
            select * from users where user_name =? and password = ?
        `
        let conn = PrimaryRepoInst.getDB().promise()
        const [row, fields]: any[] = await conn.query(portSql, [user_name, password])
        return row[0] || {}
    }

    public async getUserDirs(userId: string) {
        let portSql = `
            select * from dirs where user_id = ?
        `
        let conn = PrimaryRepoInst.getDB().promise()
        const [row, fields]: any[] = await conn.query(portSql, [userId])
        return row || []
    }

    public async saveDirs(dbObj:Record<string,any>) {
        dbObj.is_primary = 0;
        dbObj.update_time = dbObj.create_time
        dbObj.pid = 1;
        const {user_id,port,dir,pid,create_time,is_primary,primary_id,update_time,description,release_version} = dbObj;
        const values = [user_id,port,dir,pid,update_time,create_time,is_primary,primary_id,description,release_version]
        let saveSql = `
            insert into 
            dirs(user_id,port,dir,pid,update_time,create_time,is_primary,primary_id,description,release_version)
            values(${values.map(()=>"?").toString()})
        `

        console.log(saveSql)
        let conn = PrimaryRepoInst.getDB().promise()
        const ret = await conn.query(saveSql,values)
        return ret;
    }
}

export const centerControl = new CenterControl()
