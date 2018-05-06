import { stepSchema } from '../schema/stepSchema'
import { stepHandler } from '../handler/stepHandler'

export const stepRoute = server => {
    server.route({
        method: 'GET',
        path: '/step',
        config: {
            handler: stepHandler.get,
            description: 'Get steps',
            notes: 'Returns all steps stored in database',
            tags: ['api']
        }
    })
    server.route({
        method: 'POST',
        path: '/step',
        config: {
            handler: stepHandler.add,
            description: 'Add a step',
            notes: 'Add a step in database',
            tags: ['api'],
            validate: { payload: stepSchema }
        }
    })
    server.route({
        method: 'PUT',
        path: '/step/{step_id}',
        config: {
            handler: stepHandler.set,
            description: 'Update a step',
            notes: 'Update a step corresponding to {step_id} in database',
            tags: ['api'],
            validate: { payload: stepSchema }
        }
    })
    server.route({
        method: 'DELETE',
        path: '/step/{step_id}',
        config: {
            handler: stepHandler.remove,
            description: 'Delete a step',
            notes: 'Delete a step corresponding to {step_id} in database',
            tags: ['api']
        }
    })
}
