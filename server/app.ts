import {app} from "./init_server/init_application";
import {initialize_database} from "./database/init_database";
const PORT = 3000
import {Database} from 'sqlite3';
import {create_table_and_promisify} from "./database/async/async_sqlite";
import {sqlite_database} from "./database/async/async_sqlite";
import { create_tables } from "./database/create_tables";
const init_server = async () => {
  try {
    const database = await initialize_database()
    const create_promisify = create_table_and_promisify(database as Database)
    if (!create_promisify) 
        throw 'Error while creating promisify sqlite'
      
    await create_tables()

    app.listen(PORT, () => {
        console.log(`App listen on port ${PORT}`)
    })
  } catch (error) {
      console.log(error)
  }
    
}
init_server()
