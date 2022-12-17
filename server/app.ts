import {app} from "./init_server/init_application";
import {initialize_database} from "./database/init_database";
const PORT = 3000
import {Database} from 'sqlite3';
import {create_table_and_promisify} from "./database/async/async_sqlite";
import { create_tables } from "./database/create_tables";
import { create_admin_user,create_system_user } from "./init_server/init_admin_user";
import { init_system_table_config } from "./init_server/init_system_config";
import { requiredHttps } from "./middlewares/checkHttps";
app.all(`*`,requiredHttps)

import './routers/panel/auth/routers_login'
import './modules/read_config'
import './routers/panel/panel_api/all_api_in_one_place'
import {page_404} from './middlewares/page_404'
app.use('*',page_404)
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
 
    //systemowy uzytkownik
    await create_system_user()
    //inicjowanie użytkownika admin
    await create_admin_user()
 
    //inicjowanie ustawien systemowych
    await init_system_table_config()

    app.listen(PORT, () => {
        console.log(`App listen on port ${PORT}`)
    })
  } catch (error) {
      console.log(error)
  }
    
}
init_server()
