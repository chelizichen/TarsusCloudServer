import {nodeStats} from "./reset";
import {createPool} from 'mysql2'
import {Pool, PoolOptions} from 'mysql2'
import moment from "moment";
import { RedisClientType, createClient } from "redis";

export enum ReplyBody {
    success = 0,
    error = -1,
    success_message = "ok",
    mkdir_err = "创建目录失败"
}

export enum ElementUIComponents{
    TABLE,
    SELECT,
    OPTIONS,
    PAGINATION,
    API,
    BUTTON
}

export enum ApiType{
    ADD,
    DELETE,
    UPDATE,
    SEARCH,
}

export type FileConfig = {
    fileName:string;
    fileUid:string
}

export const Reply = (code: ReplyBody, message: ReplyBody | string, data: any) => {
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

export enum rds_key{
    GET_ALL_DB='get_all_db',
}

class PrimaryRepo {

    private _RedisTemplate: RedisClientType;
    private _DbConnection: Pool

    public getDB(): Pool {
        return this._DbConnection;
    }

    constructor() {
        this.setDB();
        this.setRds();
    }

    public setDB(poolConn?) {
        const poolConfig: PoolOptions = JSON.parse(process.env.poolConfig)
        this._DbConnection = poolConn || createPool(poolConfig);
    }

    public getRds(){
        return this._RedisTemplate;
    }
    private setRds(){
        this._RedisTemplate = createClient()
        this._RedisTemplate.connect()
    }
}

export const PrimaryRepoInst = new PrimaryRepo()

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

    public async getByPidAndPort(pid: number, port: number) {
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

    public async saveDirs(dbObj: Record<string, any>) {
        dbObj.is_primary = 0;
        dbObj.update_time = dbObj.create_time
        dbObj.pid = 1;
        const {
            user_id,
            port,
            dir,
            pid,
            create_time,
            is_primary,
            primary_id,
            update_time,
            description,
            release_version
        } = dbObj;
        const values = [user_id, port, dir, pid, update_time, create_time, is_primary, primary_id, description, release_version]
        let saveSql = `
            insert into 
            dirs(user_id,port,dir,pid,update_time,create_time,is_primary,primary_id,description,release_version)
            values(${values.map(()=>"?").toString()})
        `

        console.log(saveSql)
        let conn = PrimaryRepoInst.getDB().promise()
        const ret = await conn.query(saveSql, values)
        return ret;
    }
    public async delDirs(id:string,dir:string){
        const sql = `
            delete from dirs where id = ? and dir = ?
        `
        let conn = PrimaryRepoInst.getDB().promise()
        const ret = await conn.query(sql,[id,dir])
        return ret;
    }
    public async releasePackage(dbObj: Record<string, any>) {
        dbObj.create_time = moment().format("YYYY-MM-DD HH:mm:ss")
        const {dir_id, user_id, package_version, package_info, package_path, create_time} = dbObj
        const values = [dir_id, user_id, package_version, package_info, package_path, create_time]
        let saveSql = `
            insert into 
            release_package
            (dir_id,user_id,package_version,package_info,package_path,create_time)
            values(${values.map(()=>"?").toString()})
        `;
        let conn = PrimaryRepoInst.getDB().promise()
        const ret = await conn.query(saveSql, values)
        return ret;

    }

    public async showTables() {
        let saveSql = `
            show tables;
        `;
        let conn = PrimaryRepoInst.getDB().promise()
        const [ret] = await conn.query(saveSql)
        console.log('ret',ret);
        // @ts-ignore
        const tables = ret.map(item=>{
            return Object.values(item)[0]
        })
        return tables;
    }

    public async showDatabases(){
        let saveSql = `
            show databases;
        `;
        let conn = PrimaryRepoInst.getDB().promise()
        const [ret] = await conn.query(saveSql)
        // @ts-ignore
        const databases = ret.map(item=>{
            return Object.values(item)[0]
        })
        return databases;
    }


    public async showTableDeatil(table:string) {
        let saveSql = `
            DESC  ${table};
        `;
        let conn = PrimaryRepoInst.getDB().promise()
        const [ret] = await conn.query(saveSql)
        return ret;
    }

    public async query(sql,values?) {
        let conn = PrimaryRepoInst.getDB().promise()
        const [ret] = await conn.query(sql,values)
        return ret;
    }

    public resetDb(newDatabase:string | PoolOptions){
        PrimaryRepoInst.getDB().end(); // 关闭旧的连接池
        let newconfig:PoolOptions;
        if(typeof newDatabase == "string"){
            newconfig = {
                ...JSON.parse(process.env.poolConfig), // 保留原始配置，仅修改数据库名称
                database: newDatabase,
            };
        }else{
            newconfig = newDatabase
        }
        const newPool = createPool(newconfig);
        PrimaryRepoInst.setDB(newPool)
    }
}

export const centerControl = new CenterControl()
