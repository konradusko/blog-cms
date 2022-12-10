import { app } from "../../../init_server/init_application";
import {Request,Response} from 'express'
import {post_req_login} from '../../modules/post_req_login'
import {create_rate_limit} from '../../../modules/create_rate_limit'
import {config} from '../../../modules/read_config'
import {post_req_forget_password} from '../../modules/post_req_forget_password'
import { session_not_required_post_request, session_not_required_get_request,required_session_get_request } from "../../../middlewares/check_session";
import path from 'path'
app.get('/admin/login',session_not_required_get_request,(req:Request,res:Response)=>{
    try {
        res.sendFile(path.join( path.resolve(),"front-end",'login.html'))
    } catch (error) {
        //Wyswietlic 500 internal server error html
        return res.status(404).send(':(')
    }
})
app.get('/home',required_session_get_request,(req,res)=>{
    res.send('xd')
})
app.post('/admin/login',session_not_required_post_request, create_rate_limit(config.login_rate_limit),post_req_login)
app.post('/forget/password',session_not_required_post_request,create_rate_limit(config.forget_password_rate_limit),post_req_forget_password)