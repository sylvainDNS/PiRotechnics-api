import { database, executeSql } from '../utils/sqlite'
import { recover } from '../utils/recover'

export const launcherHandler = {
    fire: data => {
        const query = 'SELECT * FROM step WHERE show_id = ? ORDER BY cueOrder'
        const reply = recover(
            executeSql(database, query, data.show_id),
            res => res,
            err => {
                console.error('Something went wrong ! :$\n%s', err)
            }
        )

        console.log(reply)
    }
}
