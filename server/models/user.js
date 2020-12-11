const db = require('../components/db')

module.exports.findOneById = async (cust_id) => {
    try {
        let query = `SELECT * FROM customer WHERE cust_id = ? limit 1`
        // return await db.query(sql, [id])
        console.log('query : ', query)
        const result = await db.query({
            sql: query,
            values: [cust_id]
        })
        return result[0]
    } catch (err) {
        throw new Error(err)
    }
}



module.exports.getList = async (option) => { // condition filter
    try {
        let sql = `SELECT * FROM customer`

        // return await db.query(sql)
        return await db.query({
            sql: sql
        })
    } catch (err) {
        throw new Error(err)
    }
}

module.exports.insert = async (options, connection) => {
    try {
        const { insertId } = await db.query({
            connection: connection,
            sql: `INSERT INTO customer SET ?`,
            values: [options]
        })
        return insertId
    } catch (err) {
        throw new Error(err)
    }
}

module.exports.update = async (options, connection) => {
    try {
        const { affectedRows } = await db.query({
            connection: connection,
            sql: `UPDATE customer SET ? WHERE cus_id = ?`,
            values: [options, options.cus_id]
        })
        return affectedRows
    } catch (err) {
        throw new Error(err)
    }
}

module.exports.delete = async (cus_id, connection) => {
    try {
        return await db.query({
            connection,
            sql: `DELETE FROM customer WHERE cus_id = ?`,
            values: [cus_id]
        })
    } catch (err) {
        throw new Error(err)
    }
}