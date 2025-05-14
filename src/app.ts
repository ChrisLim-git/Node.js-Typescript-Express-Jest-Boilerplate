import 'reflect-metadata'
import express from 'express'
import { controllers } from './controllers'
import { RouteDefinition } from './decorators'

const router = express.Router()

const registerRoutes = (app: express.Application, controllers: any[]) => {
    controllers.forEach(Controller => {
        const instance = new Controller()
        const controller = Reflect.getMetadata('controller', Controller)
        const routes: RouteDefinition[] = Reflect.getMetadata('routes', Controller) || []
        routes.forEach(route => {
            try {
                const handler = instance[route.methodName].bind(instance)
                const path = controller ? `${controller}${route.path}` : route.path
                const method = route.method.toLowerCase()
                let expressRouter: any = router
                expressRouter[method](path, handler)
                console.log(`Register route: ${method.toUpperCase()} ${path}`)
            } catch (error) {
                console.error(error)
            }
        })
    })
}

const app = express()
const port = process.env.PORT || 3000
registerRoutes(app, controllers)

app.use(express.json())
app.use(router)
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`)
})