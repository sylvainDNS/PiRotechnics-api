import { WSMonitorHandler } from '../handler/WSMonitorHandler'

export const monitorSocket = socket => {
    const monitor = socket.of('/monitor')

    monitor.on('connection', (client) => {
        console.log('Monitor connected !')

        client.on('fire', WSMonitorHandler.fire)
    })
}
