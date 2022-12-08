import { config } from "./read_config"
import jwt from 'jsonwebtoken'
import { sqlite_database } from "../database/async/async_sqlite"
import { Tables } from "../enums/tables_enum"
export const create_token_and_add_session = (id:number,login:string)=> new Promise<string>(async(res,rej)=>{
    try {
        const token = jwt.sign({
            id:id,
            login:login
        }, config.system.token_setting_user_session.private_key, {
            expiresIn: (config.system.token_setting_user_session.expiresIn_in_minutes*60000),
            algorithm: config.system.token_setting_user_session.algorithm
        })
        const sql_update_user = `UPDATE ${Tables.Users} SET authToken=? WHERE id=?`
        await sqlite_database?.run_promisify(sql_update_user,[token,id])
        return res(token)
    } catch (error) {
        return rej()
    }
})