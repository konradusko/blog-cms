import { Request, Response, NextFunction} from "express"
import { sqlite_database } from "../database/async/async_sqlite"
import { Tables } from "../enums/tables_enum"
import { RoleSystemCofnig } from "../enums/role_enum"
import { interface_SystemDomainSettings } from "../interface/system_config_domain"
export const requiredHttps = async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const sql_query_get_data_domain = `SELECT requiredHttps FROM ${Tables.SystemConfig} WHERE type = ?`
        const sql_values_get_data_domain = [RoleSystemCofnig.systemConf]
        const requiredHttps =  await sqlite_database?.get_promisify(sql_query_get_data_domain,sql_values_get_data_domain)
        if((requiredHttps as interface_SystemDomainSettings).requiredHttps == false)
        return next()
        if(req.secure == false){
           return res.redirect('https://' + req.hostname + req.url);
        }
    } catch (error) {
        if(req.method == "GET"){
            return res.status(500).send('tutaj 500 page')
        }else{
            return res.status(500).json({message:'Wystąpił błąd zwiazany z https',error:true})
        }
    }
}