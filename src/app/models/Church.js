import Sequelize,{ Model } from 'sequelize'

class Church extends Model{
  static init(sequelize){
    super.init({
      name: Sequelize.STRING,
      city: Sequelize.STRING,
      uf: Sequelize.STRING,
    },{
      sequelize,
    })
  }
}

export default Church