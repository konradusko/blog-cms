import { app } from "../../../init_server/init_application";
import { required_session_post_request } from "../../../middlewares/check_session";
import {required_root_user} from '../../../middlewares/check_user_permission'
import {post_smtp_add_update} from '../auth/api_routers/smtp/add_update_smtp'
import {post_delete_smtp} from '../auth/api_routers/smtp/delete_smtp'
import {post_get_smtp_data} from '../auth/api_routers/smtp/get_smtp_data'
import {send_test_email_post} from '../auth/api_routers/smtp/send_test_email'
import {get_domain_setting} from '../auth/api_routers/domainSetting/get_domain_setting'
import {set_domain_settings} from '../auth/api_routers/domainSetting/set_new_domain_name'
import { change_domain_http_ip_post } from "../auth/api_routers/domainSetting/change_http_ip";
import {page_404} from '../../../middlewares/page_404' 
app.post(`/api/v1/add/smtp`,required_session_post_request,required_root_user,post_smtp_add_update)
app.post('/api/v1/delete/smtp',required_session_post_request,required_root_user,post_delete_smtp)
app.post('/api/v1/get/smtp',required_session_post_request,required_root_user,post_get_smtp_data)
app.post('/api/v1/send/test/email',required_session_post_request,required_root_user,send_test_email_post)

//domain settings
app.get('/api/v1/get/domain/settings',required_session_post_request,required_root_user,get_domain_setting)
app.post('/api/v1/sethost/domain/settings',required_session_post_request,required_root_user,set_domain_settings)
app.post('/api/v1/change/domain/settings',required_session_post_request,required_root_user,change_domain_http_ip_post)
app.use('*',page_404)