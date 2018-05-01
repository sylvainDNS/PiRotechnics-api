import { monitorHandler } from '../handler/monitorHandler'

export const monitorSocket = socket => {
    const monitor = socket.of('/monitor')

    monitor.on('connection', () => {
        console.log('Monitor connected !')

        monitor.on('fire', monitorHandler.fire)
    })
}
