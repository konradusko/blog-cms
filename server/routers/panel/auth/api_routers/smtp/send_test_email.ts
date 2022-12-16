import { Router , Response, Request} from "express";
import { ajv_schema_smtp_send_test_email } from "../../../../../ajv_schemas/send_test_email";
import { Role, RoleSmtp ,RoleSystemCofnig} from "../../../../../enums/role_enum";
import { sqlite_database } from "../../../../../database/async/async_sqlite";
import { Tables } from "../../../../../enums/tables_enum";
import { ajv, DefinedError} from "../../../../../modules/ajv";
import { Smtp_interface } from "../../../../../interface/system_smtp";
import { interface_SystemConfigDB} from "../../../../../interface/system_config_table";
import { create_transporter } from "../../../../../modules/node_mailer";
import { User } from "../../../../../interface/user";
const send_test_email_post:Router = Router()
interface Body{
    type:RoleSmtp
}
const validate_ajv = ajv.compile(ajv_schema_smtp_send_test_email)
send_test_email_post.post('/api/v1/send/test/email',async(req:Request,res:Response)=>{
    try {
        const body:Body = req.body
        const validate_request = validate_ajv(body)
        //Body ma błędny format
        if(!validate_request)
            return res.status(400).json({ message: (validate_ajv.errors as DefinedError[])[0].message, error: true })
        //po pierwsze pobieram  konfiguracje domeny
        const sql_query_get_data_domain = `SELECT domain FROM ${Tables.SystemConfig} WHERE type = ?`
        const sql_values_get_data_domain = [RoleSystemCofnig.systemConf]
        const domain =  await sqlite_database?.get_promisify(sql_query_get_data_domain,sql_values_get_data_domain)
        console.log(domain)
        if(!domain)
            return res.status(400).json({message:'Należy dodać domenę aby móc wysyłać maile',error:true})
        //Po drugie pobieram config
        const sql_query_get_data_smtp = `SELECT host,user,password,role FROM ${Tables.Smtp} WHERE role = ?`
        const sql_values_get_data_smtp = [body.type]
        const smtp =  await sqlite_database?.get_promisify(sql_query_get_data_smtp,sql_values_get_data_smtp)

        const transporter = create_transporter((smtp as Smtp_interface).host,(smtp as Smtp_interface).user,(smtp as Smtp_interface).password)
        const emailData = {
            from: '"Fred Foo 👻"',
            subject: `Blog cms ${body.type}`,
           to: (res.locals.user as User).email,
           text: `Testowa wiadomość dla ${body.type== RoleSmtp.newsletter?`maili newsletter`:`maili systemowych`} z przykładowym linkiem do resetowania hasła ${(domain as interface_SystemConfigDB).domain}/reset/password`
        }
        try {
            await transporter.sendMail(emailData)
            return res.status(200).json({message:'Mail został poprawnie wysłany!',error:false})
        } catch (error) {
            return res.status(400).json({message:'Mail nie został wysłany, sprawdź konfiguracje SMTP',error:false})
        }
       
    } catch (error) {
        console.log(error)
        return res.status(400).json({message:'Wystąpił błąd',error:true})
    }
})
export{send_test_email_post}