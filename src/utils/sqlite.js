const executeSql = (db, query, params) => {
    return db.run(query, params)
}

export default executeSql
