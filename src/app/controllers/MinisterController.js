import Minister from "../models/Minister"
import Leader from "../models/Leader"
import Church from "../models/Church"

class MinisterController{
  async index(req, res){
    const ministers = await Minister.findAll({
      attributes: ['id', 'leader_id', 'church_id'],
      include: [{ 
        model: Leader ,
        as: 'leader',
        attributes: ['name', 'email', 'phone']
      }, { 
        model: Church,
        as: 'church',
        attributes: ['name', 'city', 'uf']
      }]
    })
    console.log(ministers)
    return res.json(ministers)
  }

}

export default new MinisterController()