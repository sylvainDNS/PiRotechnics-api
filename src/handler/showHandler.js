import { database, executeSql } from '../utils/sqlite'
import { recover } from '../utils/recover'
import uuidv4 from 'uuid/v4'
import moment from 'moment'
import sha256 from 'sha256'
import Boom from 'boom'

export const showHandler = {
    get: (request, h) => {
        const query = 'SELECT * FROM show'
        const reply = recover(
            executeSql(database, query, []),
            res => res,
            err => {
                return Boom.badRequest(err)
            }
        )
        return reply
    },
    add: (request, h) => {
        const { name, password } = request.payload
        const params = [uuidv4(), name, moment().format(), sha256(password)]
        const query = 'INSERT INTO show (show_id, name, createdAt, password) VALUES (?, ?, ?, ?);'

        const reply = recover(
            executeSql(database, query, params),
            res => res,
            err => {
                return Boom.conflict(err)
            }
        )

        return reply
    },
    set: (request, h) => {
        const { name, password } = request.payload
        const { show_id } = request.params
        const params = [name, moment().format(), sha256(password), show_id]
        const query = 'UPDATE show SET name = ?, updatedAt = ?, password = ? WHERE show_id = ?;'
        const reply = recover(
            executeSql(database, query, params),
            res => res,
            err => {
                return Boom.badRequest(err)
            }
        )

        return reply
    }
}
