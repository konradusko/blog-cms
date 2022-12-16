import { Router , Response, Request} from "express";
import { Role, RoleSmtp } from "../../../../../enums/role_enum";
import { sqlite_database } from "../../../../../database/async/async_sqlite";
import { Tables } from "../../../../../enums/tables_enum";
import { ajv, DefinedError} from "../../../../../modules/ajv";
import { ajv_schema_smtp } from "../../../../../ajv_schemas/smtp_system";
import { Smtp_interface } from "../../../../../interface/system_smtp";
import { create_log } from "../../../../../modules/create_log";
import { Logs } from "../../../../../enums/logs_enum";
const post_smtp_add_update:Router = Router()
const validate_ajv = ajv.compile(ajv_schema_smtp)
interface Body{
    host:string,
    password:string,
    user:string,
    type:RoleSmtp
}
//**TO DO Create logs */
post_smtp_add_update.post('/api/v1/add/smtp',async(req:Request,res:Response)=>{
    console.log(req.body)
    try {
        const body:Body = req.body
        const validate_request = validate_ajv(body)
        //Body ma błędny format
        if(!validate_request)
            return res.status(400).json({ message: (validate_ajv.errors as DefinedError[])[0].message, error: true })
        const sql_check_if_smtp_is_added = `SELECT * FROM ${Tables.Smtp} WHERE role = ?`
        const sql_check_if_smtp_is_added_VALUES = [body.type]
        const result = await sqlite_database?.get_promisify(sql_check_if_smtp_is_added,sql_check_if_smtp_is_added_VALUES)
        if(!result){
            //dodajemy rekord ktorego nie mamy
            const sql_query_add_smtp = `INSERT INTO ${Tables.Smtp} VALUES(?,?,?,?,?)`
            const sql_values_add_smtp = [
                null,
                body.host,
                body.user,
                body.password,
                body.type
            ]
            try {
                await sqlite_database?.run_promisify(sql_query_add_smtp,sql_values_add_smtp)
                const message_log = `Konfiguracja Smtp dla maili ${body.type == RoleSmtp.newsletter?`newslettera`:'systemowych'} została dodana`
                create_log(Logs.add_smtp_config,res.locals.user.login,message_log,res.locals.user.id)
                return res.status(200).json({message:'Konfiguracja została zapisana',error:false})
            } catch (error) {
                return res.status(400).json({message:'Wystąpił błąd podczas zapisywania konfiguracji',error:true})
            }
        }else{
            //Tutaj aktualizuje to co 
            console.log('mamy rekord ktorego bedziemy aktualizowac')
            if((result as Smtp_interface).host == body.host && (result as Smtp_interface).user == body.user&& (result as Smtp_interface).password == body.password)
                return res.status(200).json({message:'Dane zostały zaktualizowane',error:false})
            const sql_query_update_smtp = `UPDATE ${Tables.Smtp} SET host = ?, user = ?, password = ? WHERE role=?`
            const sql_query_update_smtp_VALUES = [body.host,body.user,body.password,body.type]
            try {
                await sqlite_database?.run_promisify(sql_query_update_smtp,sql_query_update_smtp_VALUES)
                const message_log = `Konfiguracja Smtp dla maili ${body.type == RoleSmtp.newsletter?`newslettera`:'systemowych'} zostało zaktualizowane`
                create_log(Logs.update_smtp_config,res.locals.user.login,message_log,res.locals.user.id)
                return res.status(200).json({message:'Nowa konfiguracja została zapisana',error:false})
            } catch (error) {
                return res.status(400).json({message:'Wystąpił błąd podczas zapisywania konfiguracji',error:true})
            }
        }
    } catch (error) {
        return res.status(500).json({message:'Wystąpił błąd',error:true})
    }
})
export{
    post_smtp_add_update
}