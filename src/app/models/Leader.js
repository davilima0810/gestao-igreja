import Sequelize,{ Model } from 'sequelize'
import bcrypt from 'bcryptjs'

class Leader extends Model{
  static init(sequelize){
    super.init({
      name: Sequelize.STRING,
      email: Sequelize.STRING,
      password: Sequelize.VIRTUAL,
      password_hash: Sequelize.STRING,
      minister: Sequelize.BOOLEAN,
      phone: Sequelize.STRING,
    },{
      sequelize,
    })

    this.addHook('beforeSave', async (user) => {
      if(user.password){
        user.password_hash = await bcrypt.hash(user.password, 8)
      }
      return this
    })
  }

  checkpassword(password){
    return bcrypt.compare(password, this.password_hash)
  }
}

export default Leader;