import { Model } from 'sequelize'

class Minister extends Model{
  static init(sequelize){
    super.init({
    },{
      sequelize
    })
  }

  static associate(models) {
    this.belongsTo(models.Leader, { foreignKey: 'leader_id', as: 'leader'})
    this.belongsTo(models.Church, { foreignKey: 'church_id', as: 'church'})
  }
}

export default Minister