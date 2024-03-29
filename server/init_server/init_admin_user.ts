import {sqlite_database} from "../database/async/async_sqlite";
import {Role} from "../enums/role_enum";
import bcrypt from 'bcrypt'
import fs from 'fs'
import crypto from 'crypto'
import {createTime} from "../modules/create_time";
import { config } from "../modules/read_config";
import { Tables } from "../enums/tables_enum";
export const create_system_user = ()=>new Promise(async (res, rej) => {
    try {

        const sql = `SELECT * FROM ${Tables.Users} WHERE login = ?`
        const values_sql = ['system']
        const find_system = await sqlite_database
            ?.get_promisify(sql,values_sql)
        if (!find_system) {
            const password = crypto
                .randomBytes(64)
                .toString('hex')
                console.log(password)
            const sql_insert_system = `INSERT INTO ${Tables.Users} VALUES (?,?,?,?,?,?,?,?,?,?)`
            const values_insert_system = [
                null,
                'system',
                await bcrypt.hash(password, 10),
                '',
                createTime(),
                Role.system,
                false,
                "",
                "",
                ""
            ]
            await sqlite_database
                ?.run_promisify(sql_insert_system, values_insert_system)
            return res(true)
        } else {
            return res(true)
        }
    } catch (error) {
        return rej('Error creating system')
    }
})
export const create_admin_user = () => new Promise(async (res, rej) => {
    try {

        const sql = `SELECT * FROM ${Tables.Users} WHERE login = ?`
        const values_sql = ['admin']
        const find_admin = await sqlite_database
            ?.get_promisify(sql,values_sql)
        if (!find_admin) {
            const password = crypto
                .randomBytes(64)
                .toString('hex')
            const sql_insert_admin = `INSERT INTO ${Tables.Users} VALUES (?,?,?,?,?,?,?,?,?,?)`
            const values_insert_admin = [
                null,
                'admin',
                await bcrypt.hash(password, 10),
                config.system.root_user_email,
                createTime(),
                Role.root,
                true,
                "",
                "",
                ""
            ]
            await sqlite_database
                ?.run_promisify(sql_insert_admin, values_insert_admin)
            fs.writeFileSync('./createdPassword.txt', password)
            return res(true)
        } else {
            return res(true)
        }
    } catch (error) {
        return rej('Error creating admin user')
    }
})