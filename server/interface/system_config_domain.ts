import { RoleSystemCofnig } from "../enums/role_enum"
export interface interface_SystemDomainSettings{
    type:RoleSystemCofnig,
    domain:string,
    requiredHttps:boolean,
    blockIp:boolean
}