import rateLimit,{Options} from 'express-rate-limit'
import { Request, Response , NextFunction} from 'express'
import { ConfigFile_rate_limit } from '../interface/config_file_login'
import { sqlite_database } from "../database/async/async_sqlite"
import { Tables } from "../enums/tables_enum"
import { RoleSystemCofnig } from "../enums/role_enum"
import { interface_SystemDomainSettings } from "../interface/system_config_domain"
import { createTime } from './create_time'
import { create_log } from './create_log'
import { Logs } from '../enums/logs_enum'
import { User } from '../interface/user'
export const create_rate_limit = (config_router:ConfigFile_rate_limit)=>rateLimit({
    windowMs: config_router.time_in_minutes * 60 * 1000,
	max: config_router.max_request, 
	standardHeaders: config_router.standardHeaders, 
	legacyHeaders: config_router.legacyHeaders, 
    message:config_router.message,
    handler:async(req:Request,res:Response,next:NextFunction,options:Options)=>{
        if(req.url == '/admin/login'){
            //jeśli próbujemy się zalogować i przekroczymy rate limit
            console.log(req.ip)
            //Pobrać z bazy danych informację
            const sql_query_get_data_domain = `SELECT blockIp FROM ${Tables.SystemConfig} WHERE type = ?`
            const sql_values_get_data_domain = [RoleSystemCofnig.systemConf]
            const requiredHttps =  await sqlite_database?.get_promisify(sql_query_get_data_domain,sql_values_get_data_domain)
            if(!requiredHttps)
                return res.status(options.statusCode).json({message:options.message,error:true})
            if((requiredHttps as interface_SystemDomainSettings).blockIp == true){
                try {
                        //dodanie do bazy danych blokowanych ip
                    const sql_insert_ip_block = `INSERT INTO ${Tables.Ip} VALUES (?,?,?)`
                    const sql_insert_ip_block_values = [
                        null,
                        req.ip,
                        createTime()
                    ]
                    await sqlite_database
                    ?.run_promisify(sql_insert_ip_block, sql_insert_ip_block_values)
                    //dodanie logów do systemu
                    const message_log = `Adres ip ${req.ip} został zablokowany `
                    const sql_query_get_data_system_user = `SELECT * FROM ${Tables.Users} WHERE login = ?`
                    const sql_values_get_data_system_user = ['system']
                    const system_user =  await sqlite_database?.get_promisify(sql_query_get_data_system_user,sql_values_get_data_system_user)
                    if(system_user){
                        create_log(Logs.block_ip,(system_user as User).login,message_log,(system_user as User).id)
                    }
                    return   res.status(options.statusCode).json({message:"Twoj adres ip został zablokowany",error:true})
                } catch (error) {
                    return   res.status(options.statusCode).json({message:"Twoj adres ip został zablokowany",error:true})
                }
            }else{
                return   res.status(options.statusCode).json({message:options.message,error:true})
            }
        }
        res.status(options.statusCode).json({message:options.message,error:true})
    }
})