import { Logs } from "../enums/logs_enum"
import { sqlite_database } from "../database/async/async_sqlite"
import { Tables } from "../enums/tables_enum"
import { createTime } from "./create_time"
export const create_log = async(logType:Logs,userLogin:string,message:string,userId:number)=>{
    try {
        const sql_insert_log = `INSERT INTO ${Tables.Logs} VALUES (?,?,?,?,?,?,?)`
        const sql_values = [
            null,
            logType,
            userLogin,
            message,
            createTime(),
            false,
            userId
        ]
        await sqlite_database
        ?.run_promisify(sql_insert_log, sql_values)
    } catch (error) {
    }
}
