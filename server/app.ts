
import { app } from "./init_server/init_application"; 
import { database,DataTypes } from "./database/init_database";



database.sync({ alter: true }).then((res)=>{
    const PORT = 3000
   const User =  database.define("users", {
        name: {
          type: DataTypes.STRING
        }
      });
    console.log(User)
    // User.create({name:'tet'})
    app.listen(PORT,()=>{
        console.log(`App listen on port ${PORT}`)
    })
})
.catch((er)=>{
    console.error('Brak połączenia z bazą danych')
})
