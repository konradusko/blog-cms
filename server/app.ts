import {app} from "./init_server/init_application";
import {initialize_database} from "./database/init_database";
const PORT = 3000
import {Database} from 'sqlite3';
import {create_table_and_promisify} from "./database/async/async_sqlite";
import { create_tables } from "./database/create_tables";
import { create_admin_user } from "./init_server/init_admin_user";
const init_server = async () => {
  try {
    //inicjowanie bazy danych
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
