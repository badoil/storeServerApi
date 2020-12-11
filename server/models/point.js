const db = require('../components/db')

module.exports.insert = async (option) => {
    try{
        let sql = `INSERT INTO point SET ?`
        return await db.query({
            sql,
            values: [option]
        })
    } catch(err){
        throw new Error(err)
    }
}

module.exports.list = async (option) => { // condition filter
    try{
        let sql = `SELECT * FROM point`
        
        return await db.query(sql)
    } catch(err){
        throw new Error(err)
    }
}

module.exports.create = async (option) => {
    try{
        let sql = `INSERT INTO point SET ?`
        return await db.query(sql, option)
    } catch(err){
        throw new Error(err)
    }
}

module.exports.getList = async (options) => { // condition filter
    try{
        let { point_idx } = options;
        let whereClause = ''
        let values = []
        
        if(point_idx){
            whereClause += ' AND point_idx = ?'
            values.push(point_idx)
        }
        
        let sql = `SELECT * 
                   FROM point
                   WHERE 1=1
                   ${whereClause}
                   ` 
        return await db.query({
            sql,
            values
        })
    } catch(err){
        throw new Error(err)
    }
}

module.exports.getListByIdx = async (options) => { // condition filter
    try{
        let { cust_idx } = options;
        let whereClause = ''
        let values = []
        
        if(cust_idx){
            whereClause += ' AND cust_idx = ?'
            values.push(cust_idx)
        }
        
        let sql = `SELECT * 
                   FROM point
                   WHERE 1=1
                   ${whereClause}
                   ` 
        return await db.query({
            sql,
            values
        })
    } catch(err){
        throw new Error(err)
    }
}