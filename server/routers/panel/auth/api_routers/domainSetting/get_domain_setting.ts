import {Router, Response, Request} from 'express'
import { sqlite_database } from "../../../../../database/async/async_sqlite";
import { Tables } from "../../../../../enums/tables_enum";
import { ajv, DefinedError} from "../../../../../modules/ajv";
import { RoleSystemCofnig } from '../../../../../enums/role_enum';
const get_domain_setting:Router = Router()

get_domain_setting.post('/api/v1/get/domain/settings',async(req:Request,res:Response)=>{
    try {
        const sql_query_get_data = `SELECT domain,requiredHttps,blockIp FROM ${Tables.SystemConfig} WHERE type = ?`
        const sql_values_get_data = [RoleSystemCofnig.systemConf]
        const domainSettings =  await sqlite_database?.get_promisify(sql_query_get_data,sql_values_get_data)
        return res.status(200).json({message:'Dane zostały pobrane',error:false,data:domainSettings})
    } catch (error) {
        return res.status(400).json({message:'Wystąpił błąd',error:true})
    }
})
export {get_domain_setting}