import * as Yup from 'yup'
import Leader from '../models/Leader'

class LeaderController{
  async store(req, res){
		const schema = Yup.object().shape({
      name:    Yup.string()
              .required(),
      
      email:   Yup.string()
              .email()
              .required(),
      
      password:Yup.string()
              .required()
              .min(6)
		})
		
		if( !( await schema.isValid(req.body))){
      return res.status(400).json({ error: 'Falha na validação.'})
    }

  	const leaderExist = await Leader.findOne({ where: { email: req.body.email } })

  	if(leaderExist){
  		return res.status(400).json({ error: "Esse email já está cadastrado." })
  	}
  	const { id , name , email, minister } = await Leader.create(req.body); 

    return res.json({ 
    	id, 
    	name, 
    	email, 
    	minister 
    })
  }
  async update(req, res){
		const schema = Yup.object().shape({
      name:    Yup.string(),
      email:   Yup.string().email(),
      oldPassword:Yup.string().min(6),
      password: Yup.string().min(6)
        .when('oldPassword', (oldPassword, field)=>
          oldPassword ? field.required() : field
        ),
      confirmPassword: Yup.string().when('password', (password, field)=>
        password ? field.required().oneOf([Yup.ref('password')]) : field
      )
    })

    if( !( await schema.isValid(req.body))){
      return res.status(400).json({ error: 'Falha na validação.'})
    }
		console.log("--------------------------")

  	const { email, oldPassword } = req.body

  	const leader = await Leader.findByPk(req.userId)

  	if(email && email !== leader.email){
  		const leaderExist = await Leader.findOne({ where: { email } })

	  	if(leaderExist){
	  		return res.status(400).json({ error: "Esse email já está cadastrado." })
	  	}
  	}

  	if(oldPassword && !(await leader.checkpassword(oldPassword))){
  		return res.status(401).json({ error: "Senha não corresponde"})
  	}

  	const { id , name , minister } = await leader.update(req.body)


  	return res.json( { id , name , email, minister } )
  }
}

export default new LeaderController()