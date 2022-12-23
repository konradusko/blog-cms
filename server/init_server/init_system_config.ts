import {sqlite_database} from "../database/async/async_sqlite";
import { config } from "../modules/read_config";
import { Tables } from "../enums/tables_enum";
import { RoleSystemCofnig } from "../enums/role_enum";
export const init_system_table_config = ()=>new Promise(async(res,rej)=>{
    try {
        const sql = `SELECT * FROM ${Tables.SystemConfig} WHERE type = ?`
        const values_sql = [RoleSystemCofnig.systemConf]
        const system_config = await sqlite_database
            ?.get_promisify(sql,values_sql)
        if(!system_config){
            const sql_insert_domainSettings = `INSERT INTO ${Tables.SystemConfig} VALUES (?,?,?,?,?)`
            const sql_insert_domainSettings_values = [
                null,
                config.system.domainName,
                config.system.blockIp,
                config.system.requiredHttps,
                RoleSystemCofnig.systemConf
            ]
            await sqlite_database
            ?.run_promisify(sql_insert_domainSettings, sql_insert_domainSettings_values)
            return res(true)
        }else{
            return res(true)
        }
    } catch (error) {
        return rej('Wystąpił błąd przy inicjalizowaniu systemowych informacji')
    }
})
/**
 *   id INTEGER PRIMARY KEY AUTOINCREMENT,
                    domain TEXT NOT NULL, 
                    blockIp BOOLEAN NOT NULL,
                    requiredHttps BOOLEAN NOT NULL,
                    type TEXT NOT NULL UNIQUE
 */