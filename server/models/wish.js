const db = require('../components/db')


module.exports.findOneByIdx = async (options) => {
    try{
        let sql = `SELECT * 
                   FROM wish 
                   WHERE cust_idx =? AND deal_id = ?`
        return await db.query({
            sql,
            values: [options.cust_idx, options.deal_id]
        })
    }catch(e){
        throw new Error(e);
    }
}

module.exports.insert = async (options, connection) => {
    try{
        let sql = `INSERT INTO wish SET ?`
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
            sql: `UPDATE wish SET ? 
                  WHERE cust_idx = ? AND deal_id = ?`,
            values: [options, options.cust_idx, options.deal_id]
          })
          console.log('result:', result)
          return result        
    }catch(e){
        throw new Error(e);
    }
}

module.exports.delete = async (options, connection) => {
    try{
        const result = await db.query({
            connection,
            sql: `DELETE FROM wish 
                  WHERE cust_idx = ? AND deal_id = ?`,
            values: [options.cust_idx, options.deal_id]
        })
        return result;
    }catch(e){
        throw new Error(e);
    }
}

module.exports.getList = async (options) => { // condition filter
    try{
        let { cust_idx } = options;
    
        let whereClause = ``
        let values = [];

        if(cust_idx){
            whereClause += ` AND wish.cust_idx = ?`
            values.push(cust_idx)
        }
    
        let sql = `SELECT * 
                   FROM wish
                   JOIN deal
                   ON wish.deal_id = deal.deal_id
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