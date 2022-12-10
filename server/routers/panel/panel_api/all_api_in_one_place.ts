import { app } from "../../../init_server/init_application";
import { required_session_post_request } from "../../../middlewares/check_session";
import {required_root_user} from '../../../middlewares/check_user_permission'
import {post_smtp_add_update} from '../auth/api_routers/smtp/add_update_smtp'
import {post_delete_smtp} from '../auth/api_routers/smtp/delete_smtp'
import {post_get_smtp_data} from '../auth/api_routers/smtp/get_smtp_data'
app.post(`/api/v1/add/smtp`,required_session_post_request,required_root_user,post_smtp_add_update)
app.post('/api/v1/delete/smtp',required_session_post_request,required_root_user,post_delete_smtp)
app.post('/api/v1/get/smtp',required_session_post_request,required_root_user,post_get_smtp_data)