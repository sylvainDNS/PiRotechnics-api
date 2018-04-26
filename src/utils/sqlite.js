import { Database } from 'sqlite3'
import { config } from '../index'

const db = () => {
    return new Database(config.sqlite3.path, err => {
        if (err) {
            console.error(err.message)
        }
        console.log('Database %s connected !', config.sqlite3.path)
    })
}
export const database = db()

export const executeSql = (db, query, params) => {
    return new Promise((resolve, reject) => {
        if (query.toUpperCase().includes('SELECT')) {
            db.all(query, (err, rows) => {
                if (err) reject(err)
                resolve(rows)
            })
        } else {
            db.run(query, params, function(err) {
                if (err) reject(err)
                resolve(this.lastID)
            })
        }
    })
}
