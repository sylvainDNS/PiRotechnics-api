import { Server } from 'hapi'
import io from 'socket.io'
import { showRoute } from './route/showRoute'
import { stepRoute } from './route/stepRoute'
import { launcherSocket } from './socket/launcherSocket'
import { monitorSocket } from './socket/monitorSocket'
import { config } from './utils/config'

export default function start() {
    const server = new Server({
        host: config.hapi.host,
        port: config.hapi.port,
        routes: { cors: { origin: ['*'] } }
    })

    const socket = io(server.listener)

    showRoute(server)
    stepRoute(server)

    launcherSocket(socket)
    monitorSocket(socket)

    return server
}
