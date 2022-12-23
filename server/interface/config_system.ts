import {Algorithm} from "jsonwebtoken"
interface Token_setting_user_session{
    expiresIn_in_minutes:number,
    private_key:string,
    algorithm:Algorithm

}
export interface SystemConfig{
    root_user_email:string,
    domainName:string,
    requiredHttps:boolean,
    blockIp:boolean,
    token_setting_user_session:Token_setting_user_session
}