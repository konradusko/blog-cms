import { Router , Response, Request} from "express";
import { Role, RoleSmtp } from "../../../../../enums/role_enum";
import { sqlite_database } from "../../../../../database/async/async_sqlite";
import { Tables } from "../../../../../enums/tables_enum";
import { ajv, DefinedError} from "../../../../../modules/ajv";
import { ajv_schema_delete_get_data_smtp } from "../../../../../ajv_schemas/smtp_system";
const post_delete_smtp:Router = Router()
const validate_ajv = ajv.compile(ajv_schema_delete_get_data_smtp)
interface Body{
    type:RoleSmtp
}
post_delete_smtp.post('/api/v1/delete/smtp',async(req:Request,res:Response)=>{
    try {
        const body:Body = req.body
        const validate_request = validate_ajv(body)
        //Body ma błędny format
        if(!validate_request)
            return res.status(400).json({ message: (validate_ajv.errors as DefinedError[])[0].message, error: true })
        const sql_query_delete = `DELETE FROM ${Tables.Smtp} WHERE role = ?`
        const sql_values_delete = [body.type]
        try {
            await sqlite_database?.run_promisify(sql_query_delete,sql_values_delete)
            return res.status(200).json({message:'Konfiguracja została usunięta',error:false})
        } catch (error) {
            return res.status(400).json({message:'Wystąpił błąd podczas usuwania',error:true})
        }
    } catch (error) {
        return res.status(500).json({message:'Wystąpił błąd',error:true})
    }
})
export{
    post_delete_smtp
}