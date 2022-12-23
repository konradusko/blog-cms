
import { Database } from 'sqlite3';
import { User } from './user';
export interface Sqlite_database{
    exec_promisify:(query:string)=>Promise<void>,
    raw_database:Database,
    get_promisify:(query:string,values?:Array<string|number|any>)=>Promise<unknown>,
    run_promisify:(query:string,values?:Array<string|number|any>)=>Promise<unknown>
}