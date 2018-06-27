import { database, executeSql } from '../utils/sqlite'
import { recover } from '../utils/recover'
import uuidv4 from 'uuid/v4'
import moment from 'moment'
import Boom from 'boom'

export const stepHandler = {
    get: (request, h) => {
        const reply = recover(
            executeSql(database, 'SELECT * FROM step ORDER BY show_id, cueOrder', []),
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

        const reply = recover(
            executeSql(database, 'INSERT INTO step (step_id, show_id, cueOrder, name, channel, time, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?);', params),
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

        const reply = recover(
            executeSql(database, 'UPDATE step SET show_id = ?, cueOrder = ?, name = ?, channel = ?, time = ?, updatedAt = ? WHERE step_id = ?;', params),
            res => res,
            err => {
                return Boom.badRequest(err)
            }
        )

        return reply
    },
    remove: (request, h) => {
        const { step_id } = request.params

        const reply = recover(
            executeSql(database, 'DELETE FROM step WHERE step_id = ?;', step_id),
            res => res,
            err => {
                return Boom.badRequest(err)
            }
        )

        return reply
    }
}
