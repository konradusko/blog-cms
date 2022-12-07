import { app } from "../../../init_server/init_application";
import {Request,Response} from 'express'
import {post_req_login} from '../../modules/post_req_login'
import {create_rate_limit} from '../../../modules/create_rate_limit'
import {config} from '../../../modules/read_config'
app.get('/admin/login',(req:Request,res:Response)=>{
    res.send('xd')
})


app.post('/admin/login',create_rate_limit(config.login_rate_limit),post_req_login)
