const db = require('../components/db')

module.exports.findOneByIdx = async (idx) => {
    try{
        let sql = 'SELECT * FROM orders WHERE order_idx = ?'
        return await db.query({
            sql,
            values: [idx]
        })
    }catch(e){
        throw new Error(e);
    }
}

module.exports.getMaxOrderNum = async (id) => {
    try{
        let sql = `SELECT MAX(order_num) AS max
                    FROM orders 
                    `
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
        //delete options.order_num
        delete options.orderer_name
        delete options.orderer_mobi
        delete options.orderer_email
        delete options.rcpt_name
        delete options.rcpt_mobi
        delete options.rcpt_phone
        delete options.rcpt_email
        delete options.rcpt_zip_code
        delete options.rcpt_base_addr
        delete options.rcpt_dets_addr
        delete options.deliv_rqmt_select_msg
        delete options.deliv_rqmt_drt_msg

        console.log('ordersInsert:', options)
        let sql = `INSERT INTO orders SET ?`
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

        console.log('ordersInsert:', options)
        let sql = `INSERT INTO orders
                (order_num,
                    order_classif_code,
                    order_state_code, 
                    deliv_classif_code, 
                    deal_id,
                    deal_opt_id,
                    pur_cnt, 
                    pur_amt, 
                    deliv_amt, 
                    disc_amt,
                    suppl_code,
                    deliv_company_code,
                    inv_num,
                    cust_id,
                    order_dt,
                    sabang_order_id,
                    sabang_cxn_ecomm_order_id,
                    sabang_cxn_ecomm_user_id,
                    sabang_cxn_ecomm_name,
                    sabang_order_coll_ts,
                    sabang_order_conf_ts,
                    sabang_etc_msg,
                    non_mbr_indv_info_coll_agrmt_or_not,
                    pur_cond_agrmt_or_not,
                    first_create_dt_time) 
                VALUES ?`
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
            sql: `UPDATE orders SET ? WHERE order_idx = ?`,
            values: [options, options.order_idx]
          })
          console.log('result:', result)
          return result        
    }catch(e){
        throw new Error(e);
    }
}
module.exports.insert = async (options, connection) => {
    try{
        //delete options.order_num
        delete options.orderer_name
        delete options.orderer_mobi
        delete options.orderer_email
        delete options.rcpt_name
        delete options.rcpt_mobi
        delete options.rcpt_phone
        delete options.rcpt_email
        delete options.rcpt_zip_code
        delete options.rcpt_base_addr
        delete options.rcpt_dets_addr
        delete options.deliv_rqmt_select_msg
        delete options.deliv_rqmt_drt_msg

        console.log('ordersInsert:', options)
        let sql = `INSERT INTO orders SET ?`
        return await db.query({
            connection: connection,
            sql,
            values: [options]
          })
    }catch(e){
        throw new Error(e);
    }
}
module.exports.delete = async (id, connection) => {
    try{
        const result = await db.query({
            connection,
            sql: `DELETE FROM orders WHERE order_id = ?`,
            values: [id]
        })
        return result;
    }catch(e){
        throw new Error(e);
    }
}

module.exports.multipleGet = async (options) => {
    try{
        let { srch_cnt, page, term_start_dt, term_end_dt, cust_idx, order_id } = options.params

        let whereClause = ``
        let limitClause = ``
        let values = []

        if(order_id){
            whereClause += ` AND order_id = ?`
            values.push(order_id)
        }

        if(cust_idx){
            whereClause += ` AND cust_idx = ?`
            values.push(cust_idx)
        }
        
        if(options){
            if(options.orderIdArray){
                whereClause += ` AND order_id IN (${options.orderIdArray})`
            }
        }

        if(term_start_dt){
            whereClause += ` AND DATE(first_create_dt_time) >= ?`
            values.push(term_start_dt)
        }
        if(term_end_dt){
            whereClause += ` AND DATE(first_create_dt_time) <= ?`
            values.push(term_end_dt)
        }

        if (!page || page < 0) {
            page = 1
        }
        let offset = (page - 1) * srch_cnt

        if (srch_cnt) {
            limitClause = ` LIMIT ${offset}, ${srch_cnt}`
        } else {
            limitClause = ``
        }

        let sql =  `SELECT * 
                    FROM orders
                    WHERE 1=1
                    ${whereClause}
                    ${limitClause}`

        return await db.query({
            sql,
            values
        })
    }catch(e){
        throw new Error(e)
    }
}

module.exports.multipleGetTotal = async (options) => {
    try{
        let { srch_cnt, page, term_start_dt, term_end_dt, cust_idx, order_id } = options.params

        let whereClause = ``
        let limitClause = ``
        let values = []

        if(order_id){
            whereClause += ` AND order_id = ?`
            values.push(order_id)
        }

        if(cust_idx){
            whereClause += ` AND cust_idx = ?`
            values.push(cust_idx)
        }
        
        if(options){
            if(options.orderIdArray){
                whereClause += ` AND order_id IN (${options.orderIdArray})`
            }
        }

        if(term_start_dt){
            whereClause += ` AND DATE(first_create_dt_time) >= ?`
            values.push(term_start_dt)
        }
        if(term_end_dt){
            whereClause += ` AND DATE(first_create_dt_time) <= ?`
            values.push(term_end_dt)
        }

        if (!page || page < 0) {
            page = 1
        }
        let offset = (page - 1) * srch_cnt

        if (srch_cnt) {
            limitClause = ` LIMIT ${offset}, ${srch_cnt}`
        } else {
            limitClause = ``
        }

        let sql =  `SELECT * 
                    FROM orders
                    WHERE 1=1
                    ${whereClause}
                    `

        return await db.query({
            sql,
            values
        })
    }catch(e){
        throw new Error(e)
    }
}

module.exports.getList = async (options) => {
    try{
        let { srch_cnt, page, term_start_dt, term_end_dt, cust_id, order_idx, order_num } = options

        let whereClause = ``
        let limitClause = ``
        let values = []

        if(order_idx){
            whereClause += ` AND order_idx = ?`
            values.push(order_idx)
        }

        if(order_num){
            whereClause += ` AND order_num = ?`
            values.push(order_num)
        }

        if(cust_id){
            whereClause += ` AND cust_id = ?`
            values.push(cust_id)
        }
        
        if(term_start_dt){
            whereClause += ` AND DATE(first_create_dt_time) >= ?`
            values.push(term_start_dt)
        }
        if(term_end_dt){
            whereClause += ` AND DATE(first_create_dt_time) <= ?`
            values.push(term_end_dt)
        }

        if (!page || page < 0) {
            page = 1
        }
        let offset = (page - 1) * srch_cnt

        if (srch_cnt) {
            limitClause = ` LIMIT ${offset}, ${srch_cnt}`
        } else {
            limitClause = ``
        }

        let sql = `SELECT * 
                FROM (
                    SELECT order_idx, 
                            order_num, 
                            order_dt, 
                            order_classif_code, 
                            order_state_code, 
                            deliv_classif_code, deal_id,
                            pur_amt,
                            pur_cnt
                    FROM orders
                    WHERE 1=1
                    ${whereClause}
                )orders
                JOIN deal
                ON orders.deal_id = deal.deal_id
                ORDER BY orders.order_idx
                ${limitClause}`
        
        return await db.query({
            sql,
            values
        })
    }catch(e){
        throw new Error(e);
    }
}

module.exports.getListTotal = async (options) => {
    try{
        let { srch_cnt, page, term_start_dt, term_end_dt, cust_id, order_idx, order_num } = options

        let whereClause = ``
        let limitClause = ``
        let values = []

        if(order_idx){
            whereClause += ` AND order_idx = ?`
            values.push(order_idx)
        }

        if(order_num){
            whereClause += ` AND order_num = ?`
            values.push(order_num)
        }

        if(cust_id){
            whereClause += ` AND cust_id = ?`
            values.push(cust_id)
        }
        
        if(term_start_dt){
            whereClause += ` AND DATE(first_create_dt_time) >= ?`
            values.push(term_start_dt)
        }
        if(term_end_dt){
            whereClause += ` AND DATE(first_create_dt_time) <= ?`
            values.push(term_end_dt)
        }

        if (!page || page < 0) {
            page = 1
        }
        let offset = (page - 1) * srch_cnt

        if (srch_cnt) {
            limitClause = ` LIMIT ${offset}, ${srch_cnt}`
        } else {
            limitClause = ``
        }

        let sql = `SELECT * 
                FROM (
                    SELECT order_idx, 
                            order_num, 
                            order_dt, 
                            order_classif_code, 
                            order_state_code, 
                            deliv_classif_code, deal_id,
                            pur_amt,
                            pur_cnt
                    FROM orders
                    WHERE 1=1
                    ${whereClause}
                )orders
                JOIN deal
                ON orders.deal_id = deal.deal_id
                ORDER BY orders.order_idx
                `
        
        return await db.query({
            sql,
            values
        })
    }catch(e){
        throw new Error(e);
    }
}

module.exports.joinGetForOrderDeliv = async(options) => {
    try{
        let { srch_cnt, page, term_start_dt, term_end_dt } = options
        let whereClause = ``
        let limitClause = ``
        let values = []

        if(options){
            if(options.cust_idx){
                whereClause += ` AND cust_idx = ?`
                values.push(options.cust_idx)
            }
        }

        if(term_start_dt){
            whereClause += ` AND DATE(first_create_dt_time) >= ?`
            values.push(term_start_dt)
        }
        if(term_end_dt){
            whereClause += ` AND DATE(first_create_dt_time) <= ?`
            values.push(term_end_dt)
        }

        if (!page || page < 0) {
            page = 1
        }
        let offset = (page - 1) * srch_cnt

        if (srch_cnt) {
            limitClause = ` LIMIT ${offset}, ${srch_cnt}`
        } else {
            limitClause = ``
        }
        let sql = `SELECT *
                    FROM orders
                    JOIN order_delivery
                    ON orders.order_num = order_delivery.order_num
                    WHERE 1+1
                    ${whereClause}
                    ${limitClause}
                    `
        return await db.query({
            sql,
            values
        })
    }catch(e){
        throw new Error(e)
    }
}

module.exports.joinGetForOrderDelivTotal = async(options) => {
    try{
        let { srch_cnt, page, term_start_dt, term_end_dt } = options
        let whereClause = ``
        let limitClause = ``
        let values = []

        if(options){
            if(options.cust_idx){
                whereClause += ` AND cust_idx = ?`
                values.push(options.cust_idx)
            }
        }

        if(term_start_dt){
            whereClause += ` AND DATE(first_create_dt_time) >= ?`
            values.push(term_start_dt)
        }
        if(term_end_dt){
            whereClause += ` AND DATE(first_create_dt_time) <= ?`
            values.push(term_end_dt)
        }

        if (!page || page < 0) {
            page = 1
        }
        let offset = (page - 1) * srch_cnt

        if (srch_cnt) {
            limitClause = ` LIMIT ${offset}, ${srch_cnt}`
        } else {
            limitClause = ``
        }
        //orders.order_num = order_delivery.order_num
        let sql = `SELECT COUNT(*)
                    FROM orders
                    LEFT JOIN order_delivery
                    ON orders.order_num = order_delivery.order_num
                    WHERE 1+1
                    ${whereClause}
                    `
        return await db.query({
            sql,
            values
        })
    }catch(e){
        throw new Error(e)
    }
}