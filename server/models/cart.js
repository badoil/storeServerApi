const db = require('../components/db')


module.exports.findOneByIdx = async (options) => {
    try{
        console.log('options:', options)
        let sql = `SELECT * 
                   FROM cart 
                   WHERE cust_idx = ? AND deal_id =?`
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
        let sql = `INSERT INTO cart SET ?`
        return await db.query({
            connection: connection,
            sql,
            values: [options]
          })
    }catch(e){
        throw new Error(e);
    }
}

module.exports.multipleInsert = async (options, connection) => {
    try{
        let sql = `INSERT INTO cart SET ?`
        let returnValue = []
        for(let i=0; i<options.length; i++){
            let value = options[i]
            const result = await db.query({
                connection,
                sql,
                values: [value]
            })
            returnValue.push(result)
        }
        return returnValue
    }catch(e){
        throw new Error(e);
    }
}

module.exports.update = async (options, connection) => {
    try{
        const result = await db.query({
            connection: connection,
            sql: `UPDATE cart SET ? 
                  WHERE cust_idx = ? AND deal_id =?`,
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
        let whereClause = ``
        if(options){
            if(options.cust_idx){
                whereClause += ` AND cart.cust_idx = ${options.cust_idx}`
            }
            if(options.deal_id){
                whereClause += ` AND cart.deal_id IN (${options.deal_id})`
            }
        }
        const result = await db.query({
            connection,
            sql: `DELETE FROM cart 
                  WHERE 1=1
                ${whereClause}`,
            // values: [options.cust_idx, options.deal_id]
        })
        return result;
    }catch(e){
        throw new Error(e);
    }
}

module.exports.getList = async (options) => { // condition filter
    try{
        console.log('options : ',options)
        let { cust_idx, deal_id} = options;
        let whereClause = ``
        let groupByClause = ``
        let values = []

        // if(options){
        //     if(options.groupBy){
        //         groupByClause = `GROUP BY cust_idx`
        //     }
        // }

        if(cust_idx){
            whereClause += ` AND cust_idx = ?`
            values.push(cust_idx)
        }
        if(deal_id){
            whereClause += ` AND deal_id = ?`
            values.push(deal_id)
        }

        
        let sql = `SELECT * 
                   FROM cart
                   WHERE 1=1
                   ${whereClause}
                   ${groupByClause}`
        console.log('sql : ',sql)
        return await db.query({
            sql: sql, 
            values
        })
    } catch(err){
        throw new Error(err)
    }
}

module.exports.getListByIdx = async (option) => { // condition filter
    try{
        console.log('option:', option)
        let sql = `SELECT * 
                   FROM cart
                   WHERE cust_idx = ${option.cust_idx}` 
        console.log('sql:', sql)
        return await db.query({sql})
    } catch(err){
        throw new Error(err)
    }
}

// module.exports.joinGet = async (options) => {
//     try{
//         let sql = `SELECT * 
//                    FROM cart
//                    JOIN deal
//                    ON cart.deal_id = deal.deal_id`

//         if(options){
//             if(options.cust_idx){
//                 sql += ` WHERE cart.cust_idx = ${options.cust_idx}`
//             }
//         }
        
//         console.log('sql : ',sql)
//         return await db.query({
//             sql: sql
//         })
//     }catch(e){
//         throw new Error(e);
//     }
// }

module.exports.joinGet = async (options) => {
    try{
        let { cust_idx } = options;
        let whereClause = ``
        let values = []

        if(cust_idx){
            whereClause += ` AND cart.cust_idx = ?`
            values.push(cust_idx)
        }
        
        let sql = `SELECT cart.*, goods.goods_id, goods.brand_id, brand.brand_id, brand_name
                   FROM (
                       SELECT *
                       FROM cart
                       WHERE 1 = 1
                       ${whereClause}
                   )cart
                   JOIN goods
                   ON cart.deal_id = goods.goods_id
                   JOIN brand
                   ON goods.brand_id = brand.brand_id`
        console.log('sql : ',sql)
        return await db.query({
            sql: sql,
            values
        })
    }catch(e){
        throw new Error(e);
    }
}
