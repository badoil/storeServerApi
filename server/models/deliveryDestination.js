const db = require('../components/db')


module.exports.findOneByIdx = async (idx) => {
    try{
        let sql = `SELECT * 
                   FROM delivery_destination 
                   WHERE deliv_dest_idx = ?`
        return await db.query({
            sql,
            values: [idx]
        })
    }catch(e){
        throw new Error(e);
    }
}

module.exports.insert = async (options, connection) => {
    try{
        let sql = `INSERT INTO delivery_destination SET ?`
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
            sql: `UPDATE delivery_destination SET ? 
                  WHERE deliv_dest_idx = ?`,
            values: [options.newDeliveryDestination, options.deliv_dest_idx]
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
            sql: `DELETE FROM delivery_destination 
                  WHERE deliv_dest_idx = ?`,
            values: [id]
        })
        return result;
    }catch(e){
        throw new Error(e);
    }
}

module.exports.getList = async (options) => { // condition filter
    try{
        let { deliv_dest_idx, cust_idx } = options;
        let whereClause = ''
        let values = [];

        if(deliv_dest_idx){
            whereClause += ` AND deliv_dest_idx = ?`
            values.push(deliv_dest_idx)
        }else if(cust_idx){
            whereClause += ` AND cust_idx = ?`
            values.push(cust_idx)
        }

        let sql = `SELECT * FROM delivery_destination
                    WHERE 1=1
                    ${whereClause}`
        
        console.log('sql : ',sql)
        return await db.query({
            sql: sql,
            values
        })
    } catch(err){
        throw new Error(err)
    }
}