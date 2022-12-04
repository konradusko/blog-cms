
import { Database } from 'sqlite3';
export interface Sqlite_database{
    exec_promisify:(query:string)=>Promise<void>,
    raw_database:Database
}