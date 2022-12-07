import {sqlite_database} from "../database/async/async_sqlite";
import {Role} from "../enums/role_enum";
import bcrypt from 'bcrypt'
import fs from 'fs'
import crypto from 'crypto'
import {formatDate} from "../modules/create_date";
export const create_admin_user = () => new Promise(async (res, rej) => {
    try {

        const sql = `SELECT * FROM Users WHERE login = '${Role.admin}'`
        const find_admin = await sqlite_database
            ?.get_promisify(sql)
        if (!find_admin) {
            const password = crypto
                .randomBytes(64)
                .toString('hex')
            const sql_insert_admin = `INSERT INTO Users VALUES (?,?,?,?,?,?,?)`
            const values_insert_admin = [
                null,
                'admin',
                await bcrypt.hash(password, 10),
                'admin',
                formatDate(),
                Role.user,
                true
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