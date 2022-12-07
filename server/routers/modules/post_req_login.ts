import { Router,Request,Response } from "express";
import { app } from "../../init_server/init_application";

const post_req_login:Router = Router()

app.post('/admin/login',(req:Request,res:Response)=>{

})
export{
    post_req_login
}