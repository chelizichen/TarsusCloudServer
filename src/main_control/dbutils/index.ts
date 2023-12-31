import {PrimaryRepoInst, rds_key} from "../define";
import moment from "moment";
import {PoolOptions} from "mysql2";

export type SelectConfig = {
    offset: string;
    size: string;
    searchFields: Array<{ keyword: string, value: string }>;
    descConfig: { filed: string; type: "desc" | "asc" };
}


interface DBManager {
    queryStruct(tableName: string): any[];

    queryTables(): any[]

    selectData(tableName: string, selectConfig: SelectConfig): string;

    saveData(tableName: string, record: Record<string, string>): any;

    updateData(tableName: string, record: Record<string, string>, where: Record<string, any>): any;

    deleteData(tableName: string, record: Record<string, string>): any;

    execute(sql: string)
}

class TarsusDBUtils implements DBManager {
    public PrimaryRepo: typeof PrimaryRepoInst;

    constructor() {
        this.PrimaryRepo = PrimaryRepoInst;
    }

    execute(sql: string) {
    }

    queryStruct(tableName: string): any[] {
        return [];
    }

    queryTables(): any[] {
        return [];
    }

    selectData(tableName: string, selectConfig: SelectConfig) {
        // 提供默认值
        const {offset = '0', size = '1000', searchFields, descConfig} = selectConfig;

        // 构建查询语句
        let query = `SELECT * FROM ${tableName}`;

        // 处理搜索条件
        if (searchFields && searchFields.length > 0) {
            const conditions = searchFields.map((field) => {
                return `${field.keyword} = '${field.value}'`;
            });
            query += ` WHERE ${conditions.join(' AND ')}`;
        }

        // 处理排序
        if (descConfig) {
            query += ` ORDER BY ${descConfig.filed} ${descConfig.type}`;
        }

        // 处理分页
        query += ` LIMIT ${size} OFFSET ${offset}`;

        console.log('query sql >> ', query);

        return query;
    }

    deleteData(tableName: string, record: Record<string, string>): any {
        // 构建删除数据的 SQL 语句
        const conditions = Object.entries(record).map(([key, value]) => `${key} = '${value}'`).join(' AND ');
        const sql = `DELETE FROM ${tableName} WHERE ${conditions};`;

        // 返回 SQL 语句
        return sql;
    }

    saveData(tableName: string, record: Record<string, string>): any {
        // 构建插入数据的 SQL 语句
        const columns = Object.keys(record).join(', ');
        const values = Object.values(record).map(value => `'${value}'`).join(', ');
        const sql = `INSERT INTO ${tableName} (${columns}) VALUES (${values});`;

        // 返回 SQL 语句
        return sql;
    }

    updateData(tableName: string, record: Record<string, string>, whereParams: Record<string, any>): any {
        const updates = Object.entries(record).map(([key, value]) => `${key} = '${value}'`).join(', ');
        const whereSql = Object.entries(whereParams).map(([key, value]) => `${key} = '${value}'`).join('and');
        const sql = `UPDATE ${tableName} SET ${updates} WHERE ${whereSql} `;
        // 返回 SQL 语句
        return sql;
    }

    async getAllDBRecords() {
        const rds = this.PrimaryRepo.getRds()
        const data = await rds.zRange(rds_key.GET_ALL_DB, 0, -1);
        return data;
    }

    async setDBRecord(config: PoolOptions) {
        const rds = this.PrimaryRepo.getRds()
        const now = moment().valueOf()
        await rds.zAdd(rds_key.GET_ALL_DB, [{score: now, value: JSON.stringify(config)}]);
    }

    async setDBQueryFileRecord(config) {
        const rds = this.PrimaryRepo.getRds();
        const {fileName, sql, source, database} = config;
        const getKey = `${source}|${database}`
        const now = moment().valueOf()
        const data = {
            fileName, sql
        }
        await rds.zAdd(getKey, [{score: now, value: JSON.stringify(database)}]);
    }

    async getDBQueryFileRecord(config) {
        const rds = this.PrimaryRepo.getRds();
        const {source, database} = config;
        const getKey = `${source}|${database}` as any
        return await rds.zRangeByScore(getKey, 0, -1);
    }
}

export const TarsusDBInst = new TarsusDBUtils()