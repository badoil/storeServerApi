const db = require('../components/db')


module.exports.multipleInsert = async (options, connection) => {
    try{
        let sql = `INSERT INTO order_delivery 
                                (order_num,
                                    orderer_name,
                                    orderer_mobi, 
                                    orderer_email, 
                                    rcpt_name,
                                    rcpt_mobi, 
                                    rcpt_phone, 
                                    rcpt_email, 
                                    rcpt_zip_code,
                                    rcpt_base_addr,
                                    rcpt_dets_addr,
                                    deliv_rqmt_select_msg,
                                    deliv_rqmt_drt_msg,
                                    first_create_dt_time) 
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


module.exports.insert = async (options, connection) => {
    try{
        
        delete options.deal_list
        delete options.order_classif_code
        delete options.order_state_code
        delete options.deliv_classif_code
        delete options.orig_order_num
        delete options.orig_order_idx
        delete options.deal_id
        delete options.deal_opt_id
        delete options.pur_cnt
        delete options.pur_amt
        delete options.deliv_amt
        delete options.disc_amt
        delete options.sp_disc_amt
        delete options.suppl_code
        delete options.deliv_company_code
        delete options.inv_num
        delete options.cust_id
        delete options.order_dt
        delete options.sabang_order_id
        delete options.sabang_cxn_ecomm_order_id
        delete options.sabang_cxn_ecomm_user_id
        delete options.sabang_cxn_ecomm_name
        delete options.sabang_order_coll_ts
        delete options.sabang_order_conf_ts
        delete options.sabang_etc_msg
        delete options.non_mbr_indv_info_coll_agrmt_or_not
        delete options.pur_cond_agrmt_or_not

        console.log("options:", options)

        let sql = `INSERT INTO order_delivery 
                    SET ?`
        return await db.query({
            connection: connection,
            sql: sql,
            values: [options]
        })
    }catch(e){
        throw new Error(e);
    }
}

module.exports.getList = async (options) => { // condition filter
    try{
        let { order_num } = options

        let whereClause = ''
        let values = []
        let sql = `SELECT * FROM order_delivery`

        if(order_num){
            whereClause += ` AND order_num = ?`
            values.push(order_num)
        }

        console.log('sql : ',sql)
        return await db.query({
            sql: sql + ` WHERE 1=1
                        ${whereClause}`,
            values
        })
    } catch(err){
        throw new Error(err)
    }
}

module.exports.update = async (options, connection) => {
    try{
        let sql = `UPDATE order_delivery
                    SET ? 
                    WHERE order_num = ?`
        return await db.query({
            connection,
            sql,
            values: [options, options.order_num]
        })

    }catch(e){
        throw new Error(e);
    }
}