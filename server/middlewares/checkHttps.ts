import { Request, Response, NextFunction} from "express"
import { sqlite_database } from "../database/async/async_sqlite"
import { Tables } from "../enums/tables_enum"
import { RoleSystemCofnig } from "../enums/role_enum"
import { interface_SystemDomainSettings } from "../interface/system_config_domain"
import { Ip_table_interface } from "../interface/table_ip"
//Wszystkie routy ktore podlegaja pod ip blocka
const Routers_system_to_block:Array<string> = ['/forget/password','/home','/admin/login','/api/v1/send/test/email','/api/v1/get/smtp','/api/v1/delete/smtp','/api/v1/add/smtp']
export const requiredHttps = async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const sql_query_get_data_domain = `SELECT requiredHttps,blockIp FROM ${Tables.SystemConfig} WHERE type = ?`
        const sql_values_get_data_domain = [RoleSystemCofnig.systemConf]
        const requiredHttps_and_block_ip =  await sqlite_database?.get_promisify(sql_query_get_data_domain,sql_values_get_data_domain)
        //sprawdzic czy nie ma zablokowanego ip
        if((requiredHttps_and_block_ip as interface_SystemDomainSettings).blockIp  == true){
  
            const find_if_check_this_route = Routers_system_to_block.find((e:string)=>req.url == e)
            if(find_if_check_this_route){
                        //szukamy czy isnieje na bialej liscie
                        const sql_values_find_ip = [req.ip]
                        const sql_query_find_on_white_list = `SELECT * FROM ${Tables.WhiteList}  WHERE ip = ?`
                        const find_ip_db_white_list  =await sqlite_database?.get_promisify(sql_query_find_on_white_list,sql_values_find_ip)
                        if(find_ip_db_white_list){
                          
                        }else{
                                //teraz szukamy czy takie ip jest w bazie danych i czy jest zablokowan
                                const sql_query_find_ip = `SELECT * FROM ${Tables.Ip} WHERE ip = ?`
                                                    
                                const find_ip_db  =await sqlite_database?.get_promisify(sql_query_find_ip,sql_values_find_ip)
                                if(find_ip_db){
                                    if(req.method == "GET")
                                        return res.send(`Twoje ip zostało zablokowane dnia ${(find_ip_db as Ip_table_interface).createAt}`)
                                        return res.status(401).json({message:`Twoje ip zostało zablokowane dnia ${(find_ip_db as Ip_table_interface).createAt}`,error:true})
                                }
                        }
            }
        }
        if((requiredHttps_and_block_ip as interface_SystemDomainSettings).requiredHttps == false)
        return next()
        if(req.secure == false)
           return res.redirect('https://' + req.hostname + req.url);
        return next()
    } catch (error) {
        if(req.method == "GET"){
            return res.status(500).send('tutaj 500 page')
        }else{
            return res.status(500).json({message:'Wystąpił błąd zwiazany z https',error:true})
        }
    }
}