import start from './server'
import { gpio } from './mock/gpio'
import env from 'common-env'

const config = env().getOrElseAll({
    node: {
        env: 'development'
    }
})

console.log(gpio(config.node.env))

start().start()
