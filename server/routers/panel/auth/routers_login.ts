import { app } from "../../../init_server/init_application";
import {Request,Response} from 'express'
import {post_req_login} from '../../modules/post_req_login'
import {create_rate_limit} from '../../../modules/create_rate_limit'
import {config} from '../../../modules/read_config'
import {post_req_forget_password} from '../../modules/post_req_forget_password'
import path from 'path'
app.get('/admin/login',(req:Request,res:Response)=>{
    try {
        res.sendFile(path.join( path.resolve(),"front-end",'login.html'))
    } catch (error) {
        return res.status(404).send(':(')
    }
})
app.post('/admin/login', create_rate_limit(config.login_rate_limit),post_req_login)
app.post('/forget/password',create_rate_limit(config.forget_password_rate_limit),post_req_forget_password)