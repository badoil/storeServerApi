const db = require('../components/db')


module.exports.findOneByIdx = async (idx) => {
    try{
        let sql = `SELECT * 
                   FROM brand 
                   WHERE brand_idx = ?`
        return await db.query({
            sql,
            values: [idx]
        })
    }catch(e){
        throw new Error(e);
    }
}

module.exports.findOneByName = async (name) => {
    try{
        let sql = `SELECT * 
                   FROM brand 
                   WHERE brand_name = ?`
        return await db.query({
            sql,
            values: [name]
        })
    }catch(e){
        throw new Error(e);
    }
}

module.exports.insert = async (options, connection) => {
    try{
        let sql = `INSERT INTO brand SET ?`
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
            sql: `UPDATE brand SET ? 
                  WHERE brand_id = ?`,
            values: [options, options.brand_id]
          })
          console.log('result:', result)
          return result        
    }catch(e){
        throw new Error(e);
    }
}

module.exports.delete = async (idx, connection) => {
    try{
        const result = await db.query({
            connection,
            sql: `DELETE FROM brand 
                  WHERE brand_idx = ?`,
            values: [idx]
        })
        return result;
    }catch(e){
        throw new Error(e);
    }
}

module.exports.getList = async (options) => {
    try{
        let sql = `SELECT * 
                   FROM brand`

        if(options){
            sql += ` WHERE brand_id = ${options}`
        }else{
            sql
        }
        return await db.query({
            sql,
        })
        
    }catch(e){
        throw new Error(e);
    }
}