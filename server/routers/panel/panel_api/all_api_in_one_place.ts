import { app } from "../../../init_server/init_application";
import { required_session_post_request } from "../../../middlewares/check_session";
import {required_root_user} from '../../../middlewares/check_user_permission'
import {post_smtp_add_update} from '../auth/api_routers/smtp/add_update_smtp'
app.post(`/api/v1/add/smtp`,required_session_post_request,required_root_user,post_smtp_add_update)