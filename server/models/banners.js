const db = require('../components/db')

module.exports.findOneByIdx = async (idx) => {
    try{
        let sql = `SELECT * 
                   FROM exhibition_category 
                   WHERE exhib_idx = ?`
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
        let sql = `INSERT INTO exhibition_category SET ?`
        return await db.query({
            connection: connection,
            sql,
            values: [options]
          })
    } catch(err){
        throw new Error(err)
    }
}

module.exports.update = async (options, connection) => {
    try{
        const result = await db.query({
            connection: connection,
            sql: `UPDATE exhibition_category SET ? WHERE exhib_id = ?`,
            values: [options, options.exhib_id]
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
            sql: `DELETE FROM exhibition_category 
                  WHERE exhib_idx = ?`,
            values: [idx]
        })
        return result;
    }catch(e){
        throw new Error(e);
    }
}

module.exports.getList = async (options) => {
    try{
        let sql = `SELECT exhib_id, exhib_banner_img
                   FROM exhibition_category`
        return await db.query({
            sql,
        })
        
    }catch(e){
        throw new Error(e);
    }
}

// module.exports.getList = async (option) => { // condition filter
//     try{
//         let sql = `SELECT * 
//                    FROM exhibition_category`
//         console.log('sql : ',sql)
//         return await db.query({
//             sql: sql
//         })
//     } catch(err){
//         throw new Error(err)
//     }
// }
// }