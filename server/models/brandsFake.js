const db = require('../components/db')

module.exports.findOneByName = async (name) => {
    try{
        let sql = 'SELECT * FROM Brand WHERE brand_name = ?'
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
        let sql = `INSERT INTO Brand SET ?`
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
            sql: `UPDATE Brand SET ? WHERE brand_id = ?`,
            values: [options, options.brand_id]
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
            sql: `DELETE FROM Brand WHERE brand_id = ?`,
            values: [id]
        })
        return result;
    }catch(e){
        throw new Error(e);
    }
}

module.exports.getList = async (id) => {
    try{
        return await db.query({
            sql: 'SELECT * FROM brands_fake'
        })
    }catch(e){
        throw new Error(e);
    }
}