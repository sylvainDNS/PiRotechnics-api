import env from 'common-env'
import { Server } from 'hapi'
import uuidv4 from 'uuid/v4'
import sha256 from 'sha256'
import moment from 'moment'
import { Database } from 'sqlite3'
import executeSql from './utils/sqlite'
import { showSchema } from './schema/show'

export default function start() {
    const config = env().getOrElseAll({
        hapi: {
            host: 'localhost',
            port: 4444
        },
        sqlite3: {
            path: '../piro.db'
        }
    })

    const db = new Database(config.sqlite3.path, err => {
        if (err) {
            console.error(err.message)
        }
        console.log('Database %s connected !', config.sqlite3.path)
    })

    const server = new Server({
        host: config.hapi.host,
        port: config.hapi.port,
        routes: { cors: { origin: ['*'] } }
    })

    server.route({
        method: 'POST',
        path: '/show',
        options: { validate: { payload: showSchema } },
        handler: (request, h) => {
            const { name, password } = request.payload
            const params = [uuidv4(), name, moment().format(), sha256(password)]
            const query =
                'INSERT INTO show (show_id, name, createdAt, password) VALUES (?, ?, ?, ?);'
            console.log(params)
            console.log(executeSql(db, query, params))

            return 'yep'
        }
    })

    return server
}
