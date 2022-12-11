import { Router , Response, Request} from "express";
import { Role, RoleSmtp } from "../../../../../enums/role_enum";
import { sqlite_database } from "../../../../../database/async/async_sqlite";
import { Tables } from "../../../../../enums/tables_enum";
import { ajv, DefinedError} from "../../../../../modules/ajv";
import { ajv_schema_delete_get_data_smtp } from "../../../../../ajv_schemas/smtp_system";
import { Smtp_interface } from "../../../../../interface/system_smtp";
const post_get_smtp_data:Router = Router()
const validate_ajv = ajv.compile(ajv_schema_delete_get_data_smtp)
interface Body{
    type:RoleSmtp
}
post_get_smtp_data.post('/api/v1/get/smtp',async(req:Request,res:Response)=>{
    try {
        const body:Body = req.body
        console.log(body)
        const validate_request = validate_ajv(body)
        //Body ma błędny format
        if(!validate_request)
            return res.status(400).json({ message: (validate_ajv.errors as DefinedError[])[0].message, error: true })

        const sql_query_get_data = `SELECT * FROM ${Tables.Smtp} WHERE role = ? or role = ?`
        const sql_values_get_data = [body.type, RoleSmtp.newsletter]
        try {
            const smtp =  await sqlite_database?.run_promisify(sql_query_get_data,sql_values_get_data)
            console.log(smtp,'to jest to')
            return res.status(200).json({message:'Dane zostały pobrane',error:false,data:smtp == undefined?null:smtp})
        } catch (error) {
            console.log(error)
            return res.status(400).json({message:'Wystąpił błąd podczas pobierania danych',error:true})
        }
    } catch (error) {
        return res.status(500).json({message:'Wystąpił błąd',error:true})
    }
})
export{
    post_get_smtp_data
}