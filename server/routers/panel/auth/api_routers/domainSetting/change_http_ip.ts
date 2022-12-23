import {Router, Response, Request} from 'express'
import {sqlite_database} from "../../../../../database/async/async_sqlite";
import {Tables} from "../../../../../enums/tables_enum";
import {ajv, DefinedError} from "../../../../../modules/ajv";
import {RoleSystemCofnig} from '../../../../../enums/role_enum';
import {ajv_schema_set_change_domain_settings} from '../../../../../ajv_schemas/domain_settings/domain';
import {create_log} from '../../../../../modules/create_log';
import {Logs} from '../../../../../enums/logs_enum';
import {DomainSettings} from '../../../../../enums/domain_settings_enums';
import {interface_SystemDomainSettings} from '../../../../../interface/system_config_domain';
const validate_ajv = ajv.compile(ajv_schema_set_change_domain_settings)
const change_domain_http_ip_post: Router = Router()
interface Body {
    type: DomainSettings
}
change_domain_http_ip_post.post(
    '/api/v1/change/domain/settings',
    async (req : Request, res : Response) => {
        try {
            const body: Body = req
                .body
            
            const validate_request = validate_ajv(body)
            //Body ma błędny format
            if (!validate_request) 
                return res
                    .status(400)
                    .json({
                        message: (validate_ajv.errors as DefinedError[])[0].message,
                        error: true
                    })

            if (body.type == DomainSettings.https) {
                const get_sql = `SELECT requiredHttps FROM ${Tables.SystemConfig} where type = ?`
                const get_sql_values = [RoleSystemCofnig.systemConf]
                const get_current_settings = await sqlite_database
                    ?.get_promisify(get_sql, get_sql_values)
                if (!get_current_settings) 
                    return res
                        .status(400)
                        .json({message: 'Wystąpił błąd', error: true})
                const new_value = (get_current_settings as interface_SystemDomainSettings).requiredHttps == false
                    ? true
                    : false
                const sql_update = `UPDATE ${Tables.SystemConfig} SET requiredHttps=? WHERE  type =?`
                const sql_update_values = [new_value, RoleSystemCofnig.systemConf]
                await sqlite_database
                    ?.run_promisify(sql_update, sql_update_values)
                const message_log = `Wymagania https zostały zmienione z ${ (
                    get_current_settings as interface_SystemDomainSettings
                ).requiredHttps == false
                    ? 'Nie'
                    : 'TAK'} na ${ (get_current_settings as interface_SystemDomainSettings).requiredHttps == false
                        ? 'TAK'
                        : 'NIE'}`
                create_log(
                    Logs.domain_changes,
                    res.locals.user.login,
                    message_log,
                    res.locals.user.id
                )
                return res
                    .status(200)
                    .json({message: 'Ustawienia https zostały zaktualizowane', error: false})
            } else if (body.type == DomainSettings.ip) {
                const get_sql = `SELECT blockIp FROM ${Tables.SystemConfig} where type = ?`
                const get_sql_values = [RoleSystemCofnig.systemConf]
                const get_current_settings = await sqlite_database
                    ?.get_promisify(get_sql, get_sql_values)
                if (!get_current_settings) 
                    return res
                        .status(400)
                        .json({message: 'Wystąpił błąd', error: true})
                const new_value = (get_current_settings as interface_SystemDomainSettings).blockIp == false
                    ? true
                    : false
                const sql_update = `UPDATE ${Tables.SystemConfig} SET blockIp=? WHERE  type =?`
                const sql_update_values = [new_value, RoleSystemCofnig.systemConf]
                await sqlite_database
                    ?.run_promisify(sql_update, sql_update_values)
                const message_log = `Ustawienia o blokadzie IP zostały zmienione z ${ (
                    get_current_settings as interface_SystemDomainSettings
                ).blockIp == false
                    ? 'Nie'
                    : 'TAK'} na ${ (get_current_settings as interface_SystemDomainSettings).blockIp == false
                        ? 'TAK'
                        : 'NIE'}`
                create_log(
                    Logs.domain_changes,
                    res.locals.user.login,
                    message_log,
                    res.locals.user.id
                )
                return res
                    .status(200)
                    .json({message: 'Ustawienia o blokadzie IP zostały zaktualizowane', error: false})
            } else {
                return res
                    .status(400)
                    .json({message: 'Wystąpił błąd', error: true})
            }

        } catch (error) {
            console.log(error)
            return res
                .status(400)
                .json({message: 'Wystąpił błąd', error: true})
        }
    }
)
export {
    change_domain_http_ip_post
}