import { app } from "../../../init_server/init_application";
import {Request,Response} from 'express'
app.get('/admin/login',(req:Request,res:Response)=>{
    res.send('xd')
})