import {app} from "./init_server/init_application";
import {initialize_database} from "./database/init_database";
const PORT = 3000
import {Database} from 'sqlite3';
import {create_table_and_promisify} from "./database/async/async_sqlite";
import { create_tables } from "./database/create_tables";
import { create_admin_user } from "./init_server/init_admin_user";
import './routers/panel/auth/routers_login'
import './routers/client/get_home_route'
import './modules/read_config'
import fs from 'fs'
if(!fs.existsSync('./sqlite')){
  fs.mkdirSync('./sqlite')
}
const init_server = async () => {
  try {
    //inicjowanie bazy danych
    console.log('a tutaj doszlismy')
    const database:Database = await initialize_database()
    //tworzenie promisow dla sql
    const create_promisify = create_table_and_promisify(database as Database)
    if (!create_promisify) 
        throw 'Error while creating promisify sqlite'
    //tworzenie tabel dla sqlite
    await create_tables()
 
    //inicjowanie użytkownika admin
    await create_admin_user()
 
    app.listen(PORT, () => {
        console.log(`App listen on port ${PORT}`)
    })
  } catch (error) {
      console.log(error)
  }
    
}
init_server()
