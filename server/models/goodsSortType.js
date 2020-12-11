const db = require('../components/db')

module.exports.getList = async (option) => { // condition filter
    try{


        let query = `SELECT * FROM GOODS_SORT_TYPE WHERE TYPE = ?`
        return  await db.query({
            sql: query,
            values: [option.type]
        })
    } catch(err){
        throw new Error(err)
    }
}

module.exports.create = async (option) => {
    try{
        let sql = `INSERT INTO GOODS_SORT_TYPE SET ?`
        return await db.query(sql, option)
    } catch(err){
        throw new Error(err)
    }
}