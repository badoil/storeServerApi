const db = require('../components/db')

module.exports.findOneById = async (id) => {
    try{
        let sql = `SELECT * 
                   FROM popup 
                   WHERE popup_id = ?`
        return await db.query({
            sql,
            values: [id]
        })
    }catch(e){
        throw new Error(e);
    }
}

module.exports.insert = async (options, connection) => {
    try{
        let sql = `INSERT INTO popup SET ?`
        return await db.query({
            connection: connection,
            sql,
            values: [options]
          })
    }catch(e){
        throw new Error(e);
    }
}

module.exports.update = async (options, connection) => {
    try{
        const result = await db.query({
            connection: connection,
            sql: `UPDATE popup SET ? 
                  WHERE popup_id = ?`,
            values: [options.newPopup, options.popup_id]
          })
          console.log('result:', result)
          return result        
    }catch(e){
        throw new Error(e);
    }
}

module.exports.delete = async (id, connection) => {
    try{
        const result = await db.query({
            connection,
            sql: `DELETE FROM popup 
                  WHERE popup_id = ?`,
            values: [id]
        })
        return result;
    }catch(e){
        throw new Error(e);
    }
}

module.exports.getList = async (options) => { // condition filter
    try{
        let sql = `SELECT * FROM popup`

        if(options){
            if(options.popup_id){
                sql += ` WHERE popup_id = ${options.popup_id}`
            }
        }
        console.log('sql : ',sql)
        return await db.query({
            sql: sql
        })
    } catch(err){
        throw new Error(err)
    }
}