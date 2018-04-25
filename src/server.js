import env from 'common-env'
import { Server } from 'hapi'
import uuidv4 from 'uuid/v4'
import sha256 from 'sha256'
import moment from 'moment'
import { Database } from 'sqlite3'
import executeSql from './utils/sqlite'
import { showSchema } from './schema/show'

export default function start() {
    // define env var
    const config = env().getOrElseAll({
        hapi: {
            host: 'localhost',
            port: 4444
        },
        sqlite3: {
            path: 'piro.db'
        }
    })

    // init db
    const db = new Database(config.sqlite3.path, err => {
        if (err) {
            console.error(err.message)
        }
        console.log('Database %s connected !', config.sqlite3.path)
    })
    const initQuery =
        'CREATE TABLE IF NOT EXISTS show (show_id TEXT, name TEXT unique not null, createdAt DATETIME DEFAULT CURRENT_TIMESTAMP, updatedAt DATETIME, password TEXT, CONSTRAINT show_pk PRIMARY KEY (show_id)); CREATE TABLE IF NOT EXISTS showStep (showStep_id TEXT, show_id TEXT, cueOrder INTEGER not null, name TEXT unique not null, canal INT not null, createdAt DATETIME DEFAULT CURRENT_TIMESTAMP, updatedAt DATETIME, CONSTRAINT showStep_pk PRIMARY KEY (showStep_id), CONSTRAINT showStep_show_fk FOREIGN KEY (show_id) REFERENCES show(show_id));'
    executeSql(db, initQuery, [])

    // init api servers
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
            executeSql(db, query, params)
            return 'yep'
        }
    })

    server.route({
        method: 'GET',
        path: '/shows',
        handler: (request, h) => {
            const query = 'SELECT * FROM show'
            const reply = executeSql(db, query, [])

            console.log(reply)
        }
    })

    return server
}
