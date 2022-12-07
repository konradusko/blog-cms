import { Router,Request,Response } from "express";
import { app } from "../../init_server/init_application";
import {ajv,DefinedError} from '../../modules/ajv'
import { ajv_schema_login_post } from "../../ajv_schemas/login";
const post_req_login:Router = Router()

const validate_ajv = ajv.compile(ajv_schema_login_post)
interface Body{
    login:string,
    password:string
}
app.post('/admin/login',(req:Request,res:Response)=>{
    try {
        const body:Body = req.body
        const validate_request = validate_ajv(body)
        //Body ma błędny format
        if(!validate_request)
            return res.status(400).json({ message: (validate_ajv.errors as DefinedError[])[0].message, error: true })

        //Po pierwsze sprawdzam czy taki użytkownik jest w systemie
        
        console.log(body)
    } catch (error) {
        return res.status(400).json({message:'Wystąpił błąd',error:true})
    }
})
export{
    post_req_login
}