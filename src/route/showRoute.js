import { showSchema } from '../schema/showSchema'
import { showHandler } from '../handler/showHandler'

export const showRoute = server => {
    server.route({
        method: 'GET',
        path: '/show',
        handler: showHandler.get
    })
    server.route({
        method: 'POST',
        path: '/show',
        options: { validate: { payload: showSchema } },
        handler: showHandler.add
    })
    server.route({
        method: 'PUT',
        path: '/show/{show_id}',
        handler: showHandler.set
    })
    server.route({
        method: 'delete',
        path: '/show/{show_id}',
        handler: showHandler.remove
    })
}
