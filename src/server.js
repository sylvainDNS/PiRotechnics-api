import { Server } from 'hapi'
import io from 'socket.io'
import HapiSwagger from 'hapi-swagger'
import Vision from 'vision'
import Inert from 'inert'
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

    const swaggerOptions = {
        info: {
            title: 'PiRotechnics API Documentation',
            version: '0.1',
        },
    }

    server.register([
        Inert,
        Vision,
        {
            plugin: HapiSwagger,
            options: swaggerOptions
        }
    ])
        .then(() => {
            server.start()
                .then(
                    res => console.log('Server listening on %s:%s', config.hapi.host, config.hapi.port),
                    err => {
                        console.error(err)
                    }
                )
        })


    const socket = io(server.listener)

    showRoute(server)
    stepRoute(server)

    launcherSocket(socket)
    monitorSocket(socket)

    return server
}