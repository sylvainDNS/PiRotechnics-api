import { stepSchema } from '../schema/stepSchema'
import { stepHandler } from '../handler/stepHandler'

export const stepRoute = server => {
    server.route({
        method: 'GET',
        path: '/step',
        handler: stepHandler.get
    })
    server.route({
        method: 'POST',
        path: '/step',
        options: { validate: { payload: stepSchema } },
        handler: stepHandler.add
    })
    server.route({
        method: 'PUT',
        path: '/step/{step_id}',
        options: { validate: { payload: stepSchema } },
        handler: stepHandler.set
    })
    server.route({
        method: 'DELETE',
        path: '/step/{step_id}',
        handler: stepHandler.remove
    })
}
