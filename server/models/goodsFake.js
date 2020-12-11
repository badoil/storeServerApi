const db = require('../components/db')

module.exports.findOneByGoods = async (name) => {
    try{
        console.log('title:', name);
        let sql = 'SELECT * FROM Goods WHERE goods_name = ?'
        const result = await db.query({
            sql,
            values: [name]
        })
        console.log('findGoodsResult:', result);
        return result
    }catch(e){
        throw new Error(e);
    }
}


module.exports.findOneById = async (id) => {
    try{
        let sql = 'SELECT * FROM Goods WHERE goods_id = ?'
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
        let sql = `INSERT INTO Goods SET ?`
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
            sql: `UPDATE Goods SET ? WHERE goods_id = ?`,
            values: [options, options.goods_id]
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
            sql: `DELETE FROM Goods WHERE goods_id = ?`,
            values: [id]
        })
        return result;
    }catch(e){
        throw new Error(e);
    }
}

// module.exports.getList = async (option) => {
//     try{
//         let sql = `SELECT * FROM Goods`
//                 if(option){
//                     if(option.id){
//                         sql += ` WHERE goods_id = ${option.id}`
//                     } 
//                 }
//         return await db.query({
//             sql: sql
//         })
//     }catch(e){
//         throw new Error(e);
//     }
// }

module.exports.getList = async (option) => { // condition filter
    try{
        let sql = `SELECT * FROM Goods_fake`
        if(option){
            if(option.sortTypeIdx){
                sql += ` WHERE SORT_TYPE_IDX = ${option.sortTypeIdx}`
            } else if (option.idx){
                sql += ` WHERE IDX = ${option.idx}`
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