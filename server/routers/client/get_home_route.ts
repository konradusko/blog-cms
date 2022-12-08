import { app } from "../../init_server/init_application";
import {required_session_get_request} from '../../middlewares/check_session'
app.get('/home',required_session_get_request,(req,res)=>{
    res.send('xd')
})