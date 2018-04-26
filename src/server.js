import { Server } from 'hapi'
import { showRoute } from './route/showRoute'
import { stepRoute } from './route/stepRoute'
import { config } from './index'

export default function start() {
    const server = new Server({
        host: config.hapi.host,
        port: config.hapi.port,
        routes: { cors: { origin: ['*'] } }
    })

    showRoute(server)
    stepRoute(server)

    return server
}
