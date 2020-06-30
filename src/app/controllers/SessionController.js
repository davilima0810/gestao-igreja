import jwt from 'jsonwebtoken'
import authConfig from '../../config/auth'
import Leader from '../models/Leader'
import * as Yup from 'yup'

class SessionController{
  async store(req, res){
    const schema = Yup.object().shape({
      email:    Yup.string().email().required(),
      password: Yup.string().required(),
    })

    if(!(await schema.isValid(req.body))){
      return res.status(400).json({ error: "Falha na validação."})
    }

    const { email , password } = req.body

    const user = await Leader.findOne({ where: { email }})

    if(!user) {
      return res.status(401).json({ error: 'Usuario não existe.' })
    }

    if(!(await user.checkpassword(password))){
      return res.status(401).json({ error: 'Senha não corresponde'})
    }
    console.log('Entrou')
    
    const { id , name } = user

    return res.json({
      user: {
        id,
        name, 
        email
      },
      token: jwt.sign({ id }, authConfig.secret ,{
        expiresIn: authConfig.expiresIn,
      })
    })
  }
}

export default new SessionController()