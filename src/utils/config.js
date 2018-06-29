import env from 'common-env'

export const config = env().getOrElseAll({
    node: {
        env: 'development'
    },
    hapi: {
        host: 'localhost',
        port: 4444
    },
    sqlite: {
        path: 'piro.db'
    },
    swagger: {
        schemes: 'http',
        host: 'localhost'
    }
})
