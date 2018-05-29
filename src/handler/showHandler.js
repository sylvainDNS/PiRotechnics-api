import { database, executeSql } from '../utils/sqlite'
import { recover } from '../utils/recover'
import uuidv4 from 'uuid/v4'
import moment from 'moment'
import sha256 from 'sha256'
import Boom from 'boom'
import { isNull } from 'util';

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
        const params = [uuidv4(), name, moment().format()]
        if (password != '' && !isNull(password))
            params.push(sha256(password))

        const query = password != '' && !isNull(password) ? 'INSERT INTO show (show_id, name, createdAt, password) VALUES (?, ?, ?, ?);' : 'INSERT INTO show (show_id, name, createdAt) VALUES (?, ?, ?);'

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
        const params = [name, moment().format()]

        if (password != '' && !isNull(password))
            params.push(sha256(password))
        params.push(show_id)

        const query = password != '' && !isNull(password) ? 'UPDATE show SET name = ?, updatedAt = ?, password = ? WHERE show_id = ?;' : 'UPDATE show SET name = ?, updatedAt = ? WHERE show_id = ?;'

        const reply = recover(
            executeSql(database, query, params),
            res => res,
            err => {
                return Boom.badRequest(err)
            }
        )

        return reply
    },
    getShowStep: (request, h) => {
        const { show_id } = request.params
        const params = [show_id]

        const query = 'SELECT step_id, cueOrder, name, channel, time, createdAt, updatedAt FROM step WHERE show_id = ? ORDER BY cueOrder;'
        const reply = recover(
            executeSql(database, query, params),
            res => res,
            err => {
                return Boom.badRequest(err)
            }
        )

        return reply
    },
    remove: (request, h) => {
        const { show_id } = request.params
        const query = 'DELETE FROM show WHERE show_id = ?;'

        const reply = recover(
            executeSql(database, query, show_id),
            res => res,
            err => {
                return Boom.badRequest(err)
            }
        )

        return reply
    }
}
