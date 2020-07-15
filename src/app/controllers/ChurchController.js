import Leader from '../models/Leader'
import Church from '../models/Church'
import Minister from '../models/Minister'
import * as Yup from 'yup'

class ChurchController{
  async store(req, res){
    const checkUserMinister = await Leader.findOne({
      where:{
        id: req.userId,
        minister: true
      }
    })
    if (!checkUserMinister){
      return res.status(401).json({ error: 'Ação não autorizada!'})
    }
    
    const schema = Yup.object().shape({
      name:    Yup.string()
              .required(),
      
      city:   Yup.string()
              .required(),
      
      uf:     Yup.string()
              .required()
              .max(2)
    })
    
    if( !( await schema.isValid(req.body))){
      return res.status(400).json({ error: 'Falha na validação.'})
    }

    const { id, name, city, uf } = await Church.create(req.body)
    
    const { leader_id } = await Minister.create({
      leader_id: req.userId,
      church_id: id
    })


    return res.json({
      name, 
      city, 
      uf,
      leader_id
    })
  }
}

export default new ChurchController()