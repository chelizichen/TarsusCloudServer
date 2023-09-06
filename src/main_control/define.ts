import {nodeStats} from "./reset";
import {createPool} from 'mysql2'
import {Pool, PoolOptions} from 'mysql2'

export enum ReplyBody {
    success = 0,
    error = -1,
    success_message = "ok"
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
    port: number,
    config: {
        isPrimary: boolean,
        stats: nodeStats,
        logger?: boolean,
        user_dirs?: string,
        user_id?:string,
    }
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
            database:"serverless",
            connectionLimit: 10,
        }
        this._DbConnection = createPool(poolConfig);
    }
}

const PrimaryRepoInst = new PrimaryRepo()

class CenterControl {
    public async setPid(userId: string, pid: string | number) {
        let setPidSql = `
            update dirs set pid = ${pid} where user_id = ${userId}
        `
        let conn = PrimaryRepoInst.getDB().promise()
        const data = await conn.query(setPidSql)
        console.log(data)

    }
    public async getPortByUserId(userId: string) {
        let setPidSql = `
            select * from dirs where user_id = ${userId}
        `
        let conn = PrimaryRepoInst.getDB().promise()
        const [row,fields] = await conn.query(setPidSql)
        return row[0].port || ""
    }

    public async getPidByUserId(userId: string) {
        let setPidSql = `
            select * from dirs where user_id = ${userId}
        `
        let conn = PrimaryRepoInst.getDB().promise()
        const [row,fields]:any[] = await conn.query(setPidSql)
        console.log('data',row[0].pid)
        return row[0].pid || ""
    }
}

export const centerControl = new CenterControl()
