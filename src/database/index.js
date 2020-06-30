import Sequelize from 'sequelize'
import Leader from '../app/models/Leader'
import Church from '../app/models/Church'
import databaseConfig from '../config/database'

const models = [Leader, Church]

class Database {
  constructor(){
    this.init()
  }

  init(){
    this.connection = new Sequelize(databaseConfig)//conexao com bd

    models.map(model => model.init(this.connection))
  }
}

export default new Database()