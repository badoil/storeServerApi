const db = require('../components/db')

module.exports.findOneByGoods = async (name) => {
    try{
        console.log('title:', name);
        let sql = 'SELECT * FROM goods WHERE goods_name = ?'
        const result = await db.query({
            sql,
            values: [name]
        })
        // console.log('findGoodsResult:', result);
        return result
    }catch(e){
        throw new Error(e);
    }
}


module.exports.findOneById = async (id) => {
    try{
        let sql = 'SELECT * FROM goods WHERE goods_id = ?'
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
        let sql = `INSERT INTO goods SET ?`
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
            sql: `UPDATE goods SET ? WHERE goods_id = ?`,
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
            sql: `DELETE FROM goods WHERE goods_id = ?`,
            values: [id]
        })
        return result;
    }catch(e){
        throw new Error(e);
    }
}

module.exports.getList = async (options) => {
    try{
        let { goods_idx, goods_id, suppl_code } = options;

        let whereClause = ``
        let values = [];

        if(goods_idx){
            whereClause += ` AND goods_idx = ?`
            values.push(goods_idx)
        }
        if(goods_id){
            whereClause += ` AND goods_id IN (?)`
            values.push(goods_id)
        } 
        if (suppl_code){
            whereClause += ` AND suppl_code IN (?)`
            values.push(suppl_code)
        }
       
        let sql = `SELECT * FROM goods
                    WHERE 1=1
                    ${whereClause}`

        return await db.query({
            sql: sql,
            values
        })
    }catch(e){
        throw new Error(e);
    }
}

module.exports.multipleGetAll = async(options) => {
    try{
        //let sql = `SELECT * FROM goods WHERE goods_id IN (${options})`
        let goodsId = options.ids? options.ids : options
        let limitClause = ``

        if(options.params){
            let { srch_cnt, page } = options.params

            if (!page || page < 0) {
                page = 1
            }
            let offset = (page - 1) * srch_cnt

            if (srch_cnt) {
                limitClause = ` LIMIT ${offset}, ${srch_cnt}`
            } else {
                limitClause = ``
            }
        }
        return await db.query({
            sql: `SELECT * 
                  FROM goods 
                  WHERE goods_id IN (${goodsId})
                  ${limitClause}`
        })
    }catch(e){
        throw new Error(e);
    }
}

module.exports.multipleGetAllTotal = async(options) => {
    try{
        //let sql = `SELECT * FROM goods WHERE goods_id IN (${options})`
        let { srch_cnt, page } = options.params

        let limitClause = ``

        if (!page || page < 0) {
            page = 1
        }
        let offset = (page - 1) * srch_cnt

        if (srch_cnt) {
            limitClause = ` LIMIT ${offset}, ${srch_cnt}`
        } else {
            limitClause = ``
        }
        return await db.query({
            sql: `SELECT * 
                  FROM goods 
                  WHERE goods_id IN (${options.ids})`
        })
    }catch(e){
        throw new Error(e);
    }
}


module.exports.multipleGetWithSupplCode = async(options) => {
    try{
        let sql = `SELECT * FROM goods WHERE suppl_code IN (${options})`
        return await db.query({
            sql
        })
    }catch(e){
        throw new Error(e);
    }
}

// module.exports.getList = async (option) => { // condition filter
//     try{
//         let sql = `SELECT * FROM GOODS`
//         if(option){
//             if(option.sortTypeIdx){
//                 sql += ` WHERE SORT_TYPE_IDX = ${option.sortTypeIdx}`
//             } else if (option.idx){
//                 sql += ` WHERE IDX = ${option.idx}`
//             }
//         }
//         console.log('sql : ',sql)
//         return await db.query({
//             sql: sql
//         })
//     } catch(err){
//         throw new Error(err)
//     }
// }