import { showSchema } from '../schema/showSchema'
import { showHandler } from '../handler/showHandler'

export const showRoute = server => {
    server.route({
        method: 'GET',
        path: '/show',
        config: {
            handler: showHandler.get,
            description: 'Get shows',
            notes: 'Returns all shows stored in database',
            tags: ['api']
        }
    })
    server.route({
        method: 'POST',
        path: '/show',
        config: {
            handler: showHandler.add,
            description: 'Add a show',
            notes: 'Add a show in database',
            tags: ['api'],
            validate: { payload: showSchema }
        }
    })
    server.route({
        method: 'GET',
        path: '/show/{show_id}/step',
        config: {
            handler: showHandler.getShowStep,
            description: 'Get steps from a show',
            notes: 'Get show\'s step corresponding to {show_id}',
            tags: ['api'],
        }
    })
    server.route({
        method: 'PUT',
        path: '/show/{show_id}',
        config: {
            handler: showHandler.set,
            description: 'Update a show',
            notes: 'Update a show corresponding to {show_id} in database',
            tags: ['api'],
            validate: { payload: showSchema }
        }
    })
    server.route({
        method: 'delete',
        path: '/show/{show_id}',
        config: {
            handler: showHandler.remove,
            description: 'Delete a show',
            notes: 'Delete a show corresponding to {show_id} in database',
            tags: ['api']
        }
    })
}
