import { database, executeSql } from '../utils/sqlite'
import { recover } from '../utils/recover'
import { launch } from '../model/channel'

export const WSLauncherHandler = {
  fire: data => {
    const query = 'SELECT * FROM step WHERE show_id = ? ORDER BY cueOrder'
    const params = [data.show_id]
    const reply = recover(
      executeSql(database, query, params),
      show => {
        launch(show)
      },
      err => {
        console.error('Something went wrong during launch ! :$\n%s', err)
      }
    )
  }
}
