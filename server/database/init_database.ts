import sqlite3 = require('sqlite3')
import { Database } from 'sqlite3';
const sqlite = sqlite3.verbose()



const initialize_database = ()=> new Promise(async(res,rej)=>{
    const created_database:Database = new sqlite.Database('./sqlite/database.db',(err)=>{
        if(err)
            return rej("Error creating database")
        console.log('Connection with database has been established')
    })
    return res(created_database)

})
export{initialize_database}