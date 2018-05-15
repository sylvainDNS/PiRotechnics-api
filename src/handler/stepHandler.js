import { database, executeSql } from '../utils/sqlite'
import { recover } from '../utils/recover'
import uuidv4 from 'uuid/v4'
import moment from 'moment'
import sha256 from 'sha256'
import Boom from 'boom'

export const stepHandler = {
    get: (request, h) => {
        const query = 'SELECT * FROM step ORDER BY show_id, cueOrder'
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
        const { show_id, cueOrder, name, time, channel } = request.payload
        const params = [uuidv4(), show_id, cueOrder, name, channel, time, moment().format()]
        const query =
            'INSERT INTO step (step_id, show_id, cueOrder, name, channel, time, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?);'

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
        const { show_id, cueOrder, name, time, channel } = request.payload
        const { step_id } = request.params
        const params = [show_id, cueOrder, name, channel, time, moment().format(), step_id]
        const query =
            'UPDATE step SET show_id = ?, cueOrder = ?, name = ?, channel = ?, time = ?, updatedAt = ? WHERE step_id = ?;'

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
        const { step_id } = request.params
        const query = 'DELETE FROM step WHERE step_id = ?;'

        const reply = recover(
            executeSql(database, query, step_id),
            res => res,
            err => {
                return Boom.badRequest(err)
            }
        )

        return reply
    }
}
