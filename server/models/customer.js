const db = require('../components/db')

module.exports.findOneById = async (cust_id) => {
    try {
        let query = `SELECT * 
                       FROM customer 
                      WHERE cust_id = ? 
                      LIMIT 1`
        const result = await db.query({
            sql: query,
            values: [cust_id]
        })
        return result[0]
    } catch (err) {
        throw new Error(err)
    }
}

module.exports.findOneByIdx = async (cust_idx) => {
    try {
        let query = `SELECT * 
                       FROM customer 
                      WHERE cust_idx = ? 
                      LIMIT 1`
        const result = await db.query({
            sql: query,
            values: [cust_idx]
        })
        return result[0]
    } catch (err) {
        throw new Error(err)
    }
}

module.exports.insert = async (options, connection) => {
    try {
        const { insertId } = await db.query({
            connection: connection,
            sql: `INSERT 
                    INTO customer 
                     SET ?`,
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
            sql: `UPDATE customer 
                     SET ? 
                   WHERE cust_idx = ?`,
            values: [options, options.cust_idx]
        })
        return affectedRows
    } catch (err) {
        throw new Error(err)
    }
}

module.exports.delete = async (cust_idx, connection) => {
    try {
        return await db.query({
            connection,
            sql: `DELETE 
                    FROM customer 
                   WHERE cust_idx = ?`,
            values: [cust_idx]
        })
    } catch (err) {
        throw new Error(err)
    }
}


module.exports.getList = async (options) => { // condition filter
    try {
        let whereClause = ``
        let values = []
        if(options){
            if(options.cust_idx){
                whereClause += ` AND customer.cust_idx = ?`
                values.push(options.cust_idx)
            }
        }
        let sql = `SELECT * 
                     FROM customer
                     JOIN delivery_destination
                     ON customer.cust_idx = delivery_destination.cust_idx
                     WHERE 1=1
                     ${whereClause}` 
        console.log('sql:', sql)
        // return await db.query(sql)
        return await db.query({
            sql: sql,
            values
        })
    } catch (err) {
        throw new Error(err)
    }
}