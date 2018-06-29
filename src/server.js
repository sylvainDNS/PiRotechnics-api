import { Server } from 'hapi'
import Io from 'socket.io'
import HapiSwagger from 'hapi-swagger'
import Vision from 'vision'
import Inert from 'inert'
import { showRoute } from './route/showRoute'
import { stepRoute } from './route/stepRoute'
import { launcherSocket } from './socket/launcherSocket'
import { monitorSocket } from './socket/monitorSocket'
import { initChannels, launch } from './model/channel'
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
            version: '1.0',
        },
        schemes: [].fill(config.swagger.schemes),
        host: config.swagger.host
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
                    res => console.log('Server listening on', server.info.uri),
                    err => {
                        console.error(err)
                    }
                )
        })

    const socket = Io(server.listener)

    showRoute(server)
    stepRoute(server)

    initChannels()

    launcherSocket(socket)
    monitorSocket(socket)

    return server
}