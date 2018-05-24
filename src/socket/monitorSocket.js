import { monitorHandler } from '../handler/monitorHandler'

export const monitorSocket = socket => {
    const monitor = socket.of('/monitor')

    monitor.on('connection', (client) => {
        console.log('Monitor connected !')

        client.on('fire', monitorHandler.fire)
    })
}
