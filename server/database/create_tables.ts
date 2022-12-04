import { sqlite_database } from './async/async_sqlite'
import fs from 'fs'
import path from 'path'
/**
 * 
 * Moduł do tworzenia tablic w bazie danych z folderu ./database/tables
 */
export const create_tables = ()=> new Promise(async(res,rej)=>{
    try {
        const dirs_table = fs.readdirSync(path.join(__dirname,'tables'))
        if(!sqlite_database)
            return rej("Database is not created")
        for(const sql in dirs_table){
                await sqlite_database.exec_promisify(fs.readFileSync(path.join(__dirname,'tables',dirs_table[sql])).toString())
        }
    
        return res(true)
    } catch (error) {
        console.log(error)
        return rej("Error while creating tables for sqlite")
    }
})