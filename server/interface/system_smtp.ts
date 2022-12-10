import {  RoleSmtp } from "../enums/role_enum"
export interface Smtp_interface{
    id:number,
    host:string,
    user:string,
    password:string,
    role:RoleSmtp
}
