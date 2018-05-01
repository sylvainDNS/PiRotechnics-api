import { launcherHandler } from '../handler/launcherHandler'

export const launcherSocket = socket => {
    const launcher = socket.of('/launcher')

    launcher.on('connection', () => {
        console.log('Launcher connected !')

        launcher.on('fire', launcherHandler.fire)
    })
}
