const db = require('../components/db')



module.exports.findOneById = async (id) => {
    try{
        let sql = 'SELECT * FROM deal_composite_details WHERE deal_id = ?'
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
        let sql = `INSERT INTO deal_composite_details SET ?`
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
            sql: `UPDATE deal_composite_details SET ? WHERE deal_id = ?`,
            values: [options, options.deal_id]
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
            sql: `DELETE FROM deal_composite_details WHERE deal_id = ?`,
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
            sql: 'SELECT * FROM deal_composite_details WHERE deal_id = ?',
            values: [id]
        })
    }catch(e){
        throw new Error(e);
    }
}
module.exports.getListWithGoodId = async (id) => {
    try{
        return await db.query({
            sql: 'SELECT * FROM deal_composite_details WHERE goods_id = ?',
            values: [id]
        })
    }catch(e){
        throw new Error(e);
    }
}

module.exports.multipleGetAll = async(options) => {
    try{
        let sql = `SELECT * FROM deal_composite_details WHERE deal_id IN (${options})`
        return await db.query({
            sql
        })
    }catch(e){
        throw new Error(e);
    }
}