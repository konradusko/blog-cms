import { Router,Request,Response } from "express";
import {ajv,DefinedError} from '../../modules/ajv'
import { ajv_schema_login_post } from "../../ajv_schemas/login";
import { sqlite_database } from "../../database/async/async_sqlite";
import { User } from "../../interface/user";
import bcrypt from 'bcrypt'
import { create_token_and_add_session } from "../../modules/createToken_login";
import { config } from "../../modules/read_config";
const post_req_login:Router = Router()

const validate_ajv = ajv.compile(ajv_schema_login_post)
interface Body{
    login:string,
    password:string
}
/**
 * To do zbudowac dziennik zdarzen dla logowania
 */
post_req_login.post('/admin/login',async(req:Request,res:Response)=>{
    try {
        const body:Body = req.body
        const validate_request = validate_ajv(body)
        //Body ma błędny format
        if(!validate_request)
            return res.status(400).json({ message: (validate_ajv.errors as DefinedError[])[0].message, error: true,redirect:false })

        //Po pierwsze sprawdzam czy taki użytkownik jest w systemie
        const sql_find_user = `SELECT * FROM Users WHERE login = ?`
        const sql_values = [body.login]
        const user = await sqlite_database
        ?.get_promisify(sql_find_user ,sql_values)
        if(!user)
            return res.status(401).json({message:'Taki uzytkownik nie istnieje',error:true,redirect:false})
        //Sprawdzam czy hasło jest podane
        if(!(await bcrypt.compare(body.password,(user as User).password)))
            return res.status(401).json({message:'Podane hasło jest błędne',error:true,redirect:false})
        //Sprawdzam czy adres email został potwierdzony
        if((user as User).confirmEmail == false)
            return res.status(200).json({message:'Proszę potwierdzić adres email',error:false,redirect:false})
        //Tworze token i dodaje go do bazy danych
        
        const token = await create_token_and_add_session((user as User).id,(user as User).login)
        return res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            maxAge: (config.system.token_setting_user_session.expiresIn_in_minutes*60000)
        }).status(200).json({ message: 'Logowanie przebiegło pomyślnie', error: false,redirect:true })

    } catch (error) {
        return res.status(400).json({message:'Wystąpił błąd',error:true,redirect:false})
    }
})
export{
    post_req_login
}