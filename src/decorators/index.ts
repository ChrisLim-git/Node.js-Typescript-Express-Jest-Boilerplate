import 'reflect-metadata'

export enum HttpMethod {
    GET = 'get',
    POST = 'post',
    PUT = 'put',
    DELETE = 'delete'
}

export interface RouteDefinition {
    path: string
    method: HttpMethod
    methodName: string
}

export function Route(method: HttpMethod, path: string) {
    return function (target: any, propertyKey: string): void {
        try {
            if (!Reflect.hasMetadata('routes', target.constructor)) {
                Reflect.defineMetadata('routes', [], target.constructor)
            }
            const routes = Reflect.getMetadata('routes', target.constructor) as RouteDefinition[]
            routes.push({
                method,
                path,
                methodName: propertyKey
            })
            Reflect.defineMetadata('routes', routes, target.constructor)
        } catch (error) {
            console.error(error)
        }
    }
}

export function Controller(controller: string): ClassDecorator {
    return function (target: any): void {
        try {
            Reflect.defineMetadata('controller', controller, target)
        } catch (error) {
            console.error(error)
        }
    }
}