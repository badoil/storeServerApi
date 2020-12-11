const db = require('../components/db')

module.exports.findOneByIdx = async (idx) => {
    try{
        let sql = 'SELECT * FROM representative_category WHERE cat_idx = ?'
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
        let sql = `INSERT INTO representative_category SET ?`
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
            sql: `UPDATE representative_category SET ? WHERE cat_id = ?`,
            values: [options, options.cat_id]
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
            sql: `DELETE FROM representative_category 
                  WHERE cat_idx = ?`,
            values: [idx]
        })
        return result;
    }catch(e){
        throw new Error(e);
    }
}

module.exports.getList = async (options) => {
    try{
        let sql = `SELECT cat_id, exp_seq, cat_depth, prnt_cat_id, cat_name
                   FROM representative_category`

        if(options){
            sql += ` WHERE prnt_cat_id = ${options}`
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

// module.exports.getList = async (id) => {
//     try{
//         return await db.query({
//             sql: `SELECT cat_id, exp_seq, cat_depth, prnt_cat_id, cat_name
//                   FROM representative_category
//                   WHERE prnt_cat_id = ?`,
//             values: [id]
//         })
//     }catch(e){
//         throw new Error(e);
//     }
// }