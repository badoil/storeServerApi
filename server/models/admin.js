const db = require('../components/db')

module.exports.findOneByIdx = async (id) => {
    try{
        let query = `SELECT * FROM admin WHERE idx = ? limit 1`
        const result = await db.query({
            sql: query,
            values: [id]
        })
        return result[0]
    } catch(err){
        throw new Error(err)
    }
}

module.exports.getList = async (option) => { // condition filter
    try{
        let sql = `SELECT * FROM admin`
        
        return await db.query({
            sql: sql
        })
    } catch(err){
        throw new Error(err)
    }
}

module.exports.update = async (options, connection) => {
    try{
        const {affectedRows} = await db.query({
            connection: connection,
            sql: `UPDATE admin SET ? WHERE idx = ?`,
            values: [options, options.idx]
        })
        return affectedRows
    } catch(err){
        throw new Error(err)
    }
}

module.exports.insert = async (options, connection) => {
    try{
        const {insertId} = await db.query({
            connection: connection,
            sql: `INSERT INTO admin SET ?`,
            values: [options]
        })
        return insertId
    } catch(err){
        throw new Error(err)
    }
}

module.exports.delete = async (idx, connection) => {
    try{
        return await db.query({
            connection,
            sql: `DELETE FROM admin WHERE idx = ?`,
            values: [idx]
        })
    } catch(err){
        throw new Error(err)
    }
}