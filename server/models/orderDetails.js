const db = require('../components/db')


module.exports.multipleGet = async (options) => {
    try{
        return await db.query({
            sql: `SELECT deal_id 
                  FROM order_details
                  WHERE order_id IN (${options})`
        })
    }catch(e){
        throw new Error(e)
    }
}

module.exports.getList = async (options) => {
    try{
        return await db.query({
            sql: `SELECT deal_id 
                  FROM order_details
                  WHERE order_id = ${options}`
        })
    }catch(e){
        throw new Error(e)
    }
}

module.exports.joinGet = async (options) => {
    try{
        let { order_id, term_start_dt, term_end_dt, cust_idx, srch_cnt, page } = options
        let whereClause = ``
        let values = []

        if(order_id){
            whereClause += ` AND order_id = ?`
            values.push(order_id)
        }

        let sql = `SELECT O.order_id, D.* 
                    FROM order_details AS O
                    JOIN deal AS D
                    ON O.deal_id = D.deal_id
                    WHERE 1=1
                    ${whereClause}`

        return await db.query({
            sql,
            values
        })
    }catch(e){
        throw new Error(e)
    }
}

module.exports.joinGroupGet = async (options) => {
    try{
        let { order_id, term_start_dt, term_end_dt, cust_idx, srch_cnt, page } = options
        let whereClause = ``
        let values = []

        if(order_id){
            whereClause += ` AND order_id = ?`
            values.push(order_id)
        }

        let sql = `SELECT O.order_id, D.*
                    FROM order_details AS O
                    JOIN deal AS D
                    ON O.deal_id = D.deal_id
                    WHERE 1=1
                    ${whereClause}
                    GROUP BY O.order_id`

        return await db.query({
            sql,
            values
        })
    }catch(e){
        throw new Error(e)
    }
}

module.exports.insert = async (options, connection) => {
    try{
        let sql = `INSERT INTO order_details SET ?`
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
        let sql = `INSERT INTO order_details 
                                (order_id,
                                 deal_id, 
                                 pur_cnt, 
                                 pur_amt,
                                 disc_amt, 
                                 deliv_company_code, 
                                 inv_num, 
                                 first_create_dt_time,
                                 deliv_amt,
                                 first_create_user) 
                    VALUES ?`
        return await db.query({
            connection: connection,
            sql: sql,
            values: [options]
        })
    }catch(e){
        throw new Error(e);
    }
}
