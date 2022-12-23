import {Router, Response, Request} from 'express'
import { sqlite_database } from "../../../../../database/async/async_sqlite";
import { Tables } from "../../../../../enums/tables_enum";
import { ajv, DefinedError} from "../../../../../modules/ajv";
import { RoleSystemCofnig } from '../../../../../enums/role_enum';
import { ajv_schema_set_new_domain_name } from '../../../../../ajv_schemas/domain_settings/domain';
import { create_log } from '../../../../../modules/create_log';
import { Logs } from '../../../../../enums/logs_enum';
const validate_ajv = ajv.compile(ajv_schema_set_new_domain_name)
const set_domain_settings:Router = Router()
interface Body{
    domain:string
}
set_domain_settings.post('/api/v1/sethost/domain/settings',async(req:Request,res:Response)=>{
    try {
        const body:Body = req.body
        console.log(body)
        const validate_request = validate_ajv(body)
        //Body ma błędny format
        if(!validate_request)
            return res.status(400).json({ message: (validate_ajv.errors as DefinedError[])[0].message, error: true })
        const sql_query_update_domain_name= `UPDATE ${Tables.SystemConfig} SET domain=? WHERE  type =?`
        const sql_values_get_data = [body.domain,RoleSystemCofnig.systemConf]
        await sqlite_database?.run_promisify(sql_query_update_domain_name,sql_values_get_data)
        const message_log = `Domena została zmieniona na: ${body.domain}`
        create_log(Logs.domain_changes,res.locals.user.login,message_log,res.locals.user.id)
        return res.status(200).json({message:'Domena została zaktualizowana',error:false})
    } catch (error) {
        console.log(error)
        return res.status(400).json({message:'Wystąpił błąd',error:true})
    }
})
export {set_domain_settings}