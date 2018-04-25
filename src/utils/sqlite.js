const executeSql = (db, query, params) => {
    if (query.toUpperCase().includes('SELECT')) {
        db.all(query, (err, rows) => {
            return rows
        })
    } else {
        return db.run(query, params)
    }
}
export default executeSql
