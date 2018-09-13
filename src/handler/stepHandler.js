import { database, executeSql } from '../utils/sqlite'
import { recover } from '../utils/recover'
import uuidv4 from 'uuid/v4'
import moment from 'moment'
import Boom from 'boom'

export const stepHandler = {
  get: (request, h) => {
    const reply = recover(
      executeSql(
        database,
        'SELECT * FROM step ORDER BY show_id, minutes, seconds',
        []
      ),
      res => res,
      err => {
        return Boom.badRequest(err)
      }
    )
    return reply
  },
  add: (request, h) => {
    const { show_id, minutes, seconds } = request.payload

    const reply = recover(
      executeSql(
        database,
        'INSERT INTO step (step_id, show_id, minutes, seconds, createdAt) VALUES (?, ?, ?, ?, ?);',
        [uuidv4(), show_id, minutes, seconds, moment().format()]
      ),
      res => {
        recover(
          executeSql(
            database,
            'UPDATE show SET updatedAt = ? WHERE show_id = ?;',
            [moment().format(), show_id]
          ),
          res => res,
          err => {
            return Boom.badData(err)
          }
        )
        return res
      },
      err => {
        return Boom.conflict(err)
      }
    )

    return reply
  },
  set: (request, h) => {
    const { show_id, minutes, seconds } = request.payload
    const { step_id } = request.params

    const reply = recover(
      executeSql(
        database,
        'UPDATE step SET show_id = ?, minutes = ?, seconds = ?, updatedAt = ? WHERE step_id = ?;',
        [show_id, minutes, seconds, moment().format(), step_id]
      ),
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
      executeSql(
        database,
        'SELECT show_id FROM step WHERE step_id = ?;',
        step_id
      ),
      res => {
        const show_id = res[0].show_id
        return recover(
          executeSql(database, 'DELETE FROM step WHERE step_id = ?;', step_id),
          res => {
            recover(
              executeSql(
                database,
                'UPDATE show SET updatedAt = ? WHERE show_id = ?;',
                [moment().format(), show_id]
              ),
              res => res,
              err => {
                return Boom.badData(err)
              }
            )
            return res
          },
          err => {
            return Boom.badRequest(err)
          }
        )
      },
      err => {
        return Boom.badRequest(err)
      }
    )

    return reply
  }
}
