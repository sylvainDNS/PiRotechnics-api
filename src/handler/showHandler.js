import { database, executeSql } from '../utils/sqlite'
import { recover } from '../utils/recover'
import uuidv4 from 'uuid/v4'
import moment from 'moment'
import Boom from 'boom'

export const showHandler = {
  get: (request, h) => {
    const reply = recover(
      executeSql(database, 'SELECT * FROM show', []),
      res => res,
      err => {
        return Boom.badRequest(err)
      }
    )
    return reply
  },
  add: (request, h) => {
    const { name } = request.payload

    const prms = (() => {
      return executeSql(
        database,
        'INSERT INTO show (show_id, name, createdAt) VALUES (?, ?, ?);',
        [uuidv4(), name, moment().format()]
      )
    })()

    const reply = recover(
      prms,
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

    const prms = (() => {
      return executeSql(
        database,
        'UPDATE show SET name = ?, updatedAt = ? WHERE show_id = ?;',
        [name, moment().format(), show_id]
      )
    })()

    const reply = recover(
      prms,
      res => res,
      err => {
        return Boom.badRequest(err)
      }
    )

    return reply
  },
  getShowStep: (request, h) => {
    const { show_id } = request.params

    const reply = recover(
      executeSql(
        database,
        'SELECT step_id, minutes, seconds, createdAt FROM step WHERE show_id = ? ORDER BY minutes, seconds;',
        [show_id]
      ),
      res => res,
      err => {
        return Boom.badRequest(err)
      }
    )

    return reply
  },
  remove: (request, h) => {
    const { show_id } = request.params

    const reply = recover(
      executeSql(database, 'DELETE FROM show WHERE show_id = ?;', show_id),
      res => res,
      err => {
        return Boom.badRequest(err)
      }
    )

    return reply
  }
}
