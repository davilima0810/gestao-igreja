import { Router } from 'express'
import leaderController from './app/controllers/LeaderController'
import SessionController from './app/controllers/SessionController'
import authMiddleware from './app/middlewares/auth'


const routes = new Router()

routes.post('/session', SessionController.store)
routes.post('/leader', leaderController.store)

routes.use(authMiddleware)

routes.put('/leader', leaderController.update)

export default routes