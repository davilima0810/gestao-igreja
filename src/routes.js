import { Router } from 'express'
import LeaderController from './app/controllers/LeaderController'
import ChurchController from './app/controllers/ChurchController'
import SessionController from './app/controllers/SessionController'
import MinisterController from './app/controllers/MinisterController'
import authMiddleware from './app/middlewares/auth'


const routes = new Router()

routes.post('/session', SessionController.store)
routes.post('/leader', LeaderController.store)

routes.use(authMiddleware)

routes.get('/Minister', MinisterController.index)
routes.post('/church', ChurchController.store)
routes.put('/leader', LeaderController.update)

export default routes