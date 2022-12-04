
import { Database } from 'sqlite3';
import {Sqlite_database} from '../../interface/database'
let sqlite_database:null | Sqlite_database = null
import util from 'util'
export const create_table_and_promisify = (created_database:Database)=> {
    try {
        const exec_promisify_created = util.promisify(created_database.exec.bind(created_database))
        const get_promisify_created = util.promisify(created_database.get.bind(created_database))
        const run_promisify_created = util.promisify(created_database.run.bind(created_database))
        sqlite_database = {
            exec_promisify: exec_promisify_created,
            raw_database:created_database,
            get_promisify:get_promisify_created,
            run_promisify:run_promisify_created
        }
        return true
    } catch (error) {
        return null
    }
} 

export {sqlite_database}
