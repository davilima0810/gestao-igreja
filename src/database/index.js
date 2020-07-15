import Sequelize  from 'sequelize'
import databaseConfig from '../config/database'
import Leader     from '../app/models/Leader'
import Church     from '../app/models/Church'
import Minister   from '../app/models/Minister'

const models = [Leader, Church, Minister]

class Database {
  constructor(){
    this.init()
  }

  init(){
    this.connection = new Sequelize(databaseConfig)

    models.map(model => {
      model.init(this.connection)

      if (model.associate){
        model.associate(this.connection.models)
      }
    })
  }
}

export default new Database()