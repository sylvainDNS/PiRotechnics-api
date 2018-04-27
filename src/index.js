import start from './server'
import { gpio } from './mock/gpio'
import { config } from './utils/config'

start()
    .start()
    .then(
        res => console.log('Server listening on %s:%s', config.hapi.host, config.hapi.port),
        err => {
            console.error(err)
        }
    )
