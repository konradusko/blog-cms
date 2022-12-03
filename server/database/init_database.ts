import { Sequelize, DataTypes, Model } from 'sequelize'
const database = new Sequelize('database', 'test', 'test2', {
    dialect: 'sqlite',
    storage: './sqlite/database.sqlite', 
    logging:true
});
export{
    DataTypes,
    database,
    Sequelize,
    Model
}