import { sqlite_database } from './async/async_sqlite'
import fs from 'fs'
import path from 'path'
export const create_tables = ()=> new Promise((res,rej)=>{
    try {
        console.log(__dirname)
    } catch (error) {
        return rej(false)
    }
})