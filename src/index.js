import start from './server'
import { gpio } from './mock/gpio'
import env from 'common-env/withLogger'
import 'source-map-support'

export const config = env(console).getOrElseAll({
    node: {
        env: 'development'
    },
    hapi: {
        host: 'localhost',
        port: 4444
    },
    sqlite3: {
        path: 'piro.db'
    }
})
console.log(config)
start()
    .start()
    .then(
        res => console.log('Server listening on %s:%s', config.hapi.host, config.hapi.port),
        err => {
            console.error(err)
        }
    )
