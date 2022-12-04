
import { Database } from 'sqlite3';
import {Sqlite_database} from '../../interface/database'
let sqlite_database:null | Sqlite_database = null
import util from 'util'
export const create_table_and_promisify = (created_database:Database)=> {
    try {
        const exec_promisify_created = util.promisify(created_database.exec)
        sqlite_database = {
            exec_promisify: exec_promisify_created,
            raw_database:created_database
        }
        return true
    } catch (error) {
        return null
    }
} 

export {sqlite_database}
