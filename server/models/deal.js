const db = require('../components/db')

module.exports.findOneByIdx = async (idx) => {
    try{
        let sql = 'SELECT * FROM deal WHERE deal_idx = ?'
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
        let sql = `INSERT INTO deal SET ?`
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
        console.log('options:', options[1].length)
        //let returnValue = []
        // let sql = `INSERT INTO deal (deal_state_code, repr_img, sel_price, add_img_1, add_img_2, add_img_3,
        //             add_img_4, add_img_5, add_img_6, add_img_7, add_img_8, add_img_9, add_timg_1, add_timg_2,
        //             add_timg_3, add_timg_4, add_timg_5, add_timg_6, add_timg_7, add_timg_8, add_timg_9) 
        //             VALUES ?`
        //  for(let i=0; i<options.length; i++){
        //     let value = options[i]
        //     const result = await db.query({
        //         connection: connection,
        //         sql: sql,
        //         values: [value]
        //     })
        //     returnValue.push(result)
        // }
        // return returnValue
        let sql = `INSERT INTO deal (deal_id, deal_state_code, repr_img, sel_price, hot_deal_or_not, hot_deal_expr_ts,
            ac_tgt_goods_or_not, max_acc_amt, deal_name, deal_overview, free_deliv_or_not, deliv_amt, 
            deal_classif, deal_opt_id, repr_timg, repr_cat_id,
            add_img_1, add_img_2, add_img_3,
            add_img_4, add_img_5, add_img_6, add_img_7, add_img_8, add_img_9, add_timg_1, add_timg_2,
            add_timg_3, add_timg_4, add_timg_5, add_timg_6, add_timg_7, add_timg_8, add_timg_9, first_create_dt_time) 
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

module.exports.multipleInsertTest = async (options, connection) => {
    try{
        let sql = `INSERT INTO deal (deal_id, 
                                deal_classif, 
                                 deal_opt_id,
                             hot_deal_or_not, 
                         ac_tgt_goods_or_not, 
                             deal_state_code, 
                                   deal_name,
                               deal_overview,
                                   repr_timg, 
                                    sel_price, 
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

// module.exports.update = async (options, connection) => {
//     try{
//         const result = await db.query({
//             connection: connection,
//             sql: `UPDATE deal SET ? WHERE deal_idx = ?`,
//             values: [options, options.deal_idx]
//           })
//           console.log('result:', result)
//           return result        
//     }catch(e){
//         throw new Error(e);
//     }
// }

module.exports.update = async (options, connection) => {
    try{
        let sql = `UPDATE deal SET hot_deal_or_not = ?, ac_agt_goods_or_not = ? WHERE deal_idx=${options.deal_idx}`
        const result = await db.query({
            connection: connection,
            sql,
            values: [options.hot_deal_or_not, options.ac_agt_goods_or_not]
          })
          //console.log('result:', result)
          return result        
    }catch(e){
        throw new Error(e);
    }
}

module.exports.updateRandomHotDeal = async (options, connection) => {
    try{
        console.log('options:', options.deal_idx)
        let sql = `UPDATE deal SET hot_deal_or_not = ?, hot_deal_expr_ts = ? WHERE deal_idx=${options.deal_idx}`
        const result = await db.query({
            connection: connection,
            sql,
            values: [options.hot_deal_or_not, options.hot_deal_expr_ts]
          })
          //console.log('result:', result)
          return result        
    }catch(e){
        throw new Error(e);
    }
}

module.exports.updateRandomAcDeal = async (options, connection) => {
    try{
        let sql = `UPDATE deal SET ac_tgt_goods_or_not = ? WHERE deal_idx=${options.deal_idx}`
        const result = await db.query({
            connection: connection,
            sql,
            values: [options.ac_tgt_goods_or_not]
          })
          //console.log('result:', result)
          return result        
    }catch(e){
        throw new Error(e);
    }
}

module.exports.delete = async (idx, connection) => {
    try{
        let sql = `DELETE FROM deal 
                    WHERE deal_idx = ?`
        return await db.query({
            connection,
            sql,
            values: [idx]
        })
    }catch(e){
        throw new Error(e)
    }
}

module.exports.multipleDelete = async (options, connection) => {
    try{
        const result = await db.query({
            connection,
            sql: `DELETE FROM deal WHERE deal_idx IN (${options.idx_array})`,
        })
        return result;
    }catch(e){
        throw new Error(e);
    }
}


module.exports.multipleInsertUpdate = async (options, connection) => {
    try{
        let sql = `UPDATE deal SET`
        let deal = options.goods
        let dealIdxs = options.dealIdx
        const dealKeys = Object.keys(deal[0])
        // console.log('dealKeys:', dealKeys)

        for (let i=0;i<deal.length;i++){
            let value = deal[i]
            let dealIdx = dealIdxs[i]
            console.log('valueDeal:', value)
            
            sql += ` deal_id = CASE deal_idx 
                                    WHEN ${dealIdx} 
                                    THEN '${value.deal_id}' 
                                    ELSE deal_id
                                    END, sel_price = CASE deal_idx 
                                    WHEN ${dealIdx} 
                                    THEN '${value.sel_price}' 
                                    ELSE sel_price
                                    END,
                                    deal_state_code = CASE deal_idx
                                    WHEN ${dealIdx}
                                    THEN '${value.deal_state_code}'
                                    ELSE deal_state_code
                                    END,
                                    repr_img = CASE deal_idx
                                    WHEN ${dealIdx}
                                    THEN '${value.repr_img}'
                                    ELSE repr_img
                                    END,
                                    last_mod_dt_time = CASE deal_idx
                                    WHEN ${dealIdx}
                                    THEN '${value.last_mod_dt_time}'
                                    ELSE last_mod_dt_time
                                    END,
                                    free_deliv_or_not = CASE deal_idx
                                    WHEN ${dealIdx}
                                    THEN '${value.free_deliv_or_not}'
                                    ELSE free_deliv_or_not
                                    END,
                                    deliv_amt = CASE deal_idx
                                    WHEN ${dealIdx}
                                    THEN '${value.deliv_amt}'
                                    ELSE deliv_amt
                                    END,`
        }
        for(let i=0; i<deal.length; i++){
            let value = deal[i]
            let dealIdx = dealIdxs[i]
            if(i == deal.length-1){
                for(let k=1; k<10; k++){
                    let imgKeys = dealKeys.find(key => key === `add_img_${k}`)
                    // console.log('imgKeys:', imgKeys)
                    sql += ` ${imgKeys} = CASE deal_idx
                                                WHEN ${dealIdx}
                                                THEN '${value[imgKeys]}'
                                                ELSE ${imgKeys}
                                                END,`
                    
                }
                for(let j=1; j<9; j++){
                    let imgKeys = dealKeys.find(key => key === `add_timg_${j}`)
                    // console.log('imgKeys:', imgKeys)
                    sql += ` ${imgKeys} = CASE deal_idx
                                                WHEN ${dealIdx}
                                                THEN '${value[imgKeys]}'
                                                ELSE ${imgKeys}
                                                END,`
                }
                sql += ` add_timg_9 = CASE deal_idx
                                                WHEN ${dealIdx}
                                                THEN '${value.add_timg_9}'
                                                ELSE add_timg_9
                                                END`
            }else{
                for(let k=1; k<10; k++){
                    let imgKeys = dealKeys.find(key => key === `add_img_${k}`)
                    // console.log('imgKeys:', imgKeys)
                    sql += ` ${imgKeys} = CASE deal_idx
                                                WHEN ${dealIdx}
                                                THEN '${value[imgKeys]}'
                                                ELSE ${imgKeys}
                                                END,`
                    
                }
                for(let j=1; j<10; j++){
                    let imgKeys = dealKeys.find(key => key === `add_timg_${j}`)
                    // console.log('imgKeys:', imgKeys)
                    sql += ` ${imgKeys} = CASE deal_idx
                                                WHEN ${dealIdx}
                                                THEN '${value[imgKeys]}'
                                                ELSE ${imgKeys}
                                                END,`
                    
                }
            }
        }
    
        // console.log('sql : ',sql)
        const { affectedRows } = await db.query({
            connection: connection,
            sql: sql,
            //values: [options]
        })
        return affectedRows
    
    }catch(e){
        throw new Error(e);
    }
}

module.exports.multipleUpdate = async (options, connection) => {
    try{
        let sql = `UPDATE deal SET`
        let deal = options.goods
        let dealIdxs = options.dealIdx
        const dealKeys = Object.keys(deal[0])
        console.log('dealKeys:', dealKeys)

        for (let i=0;i<deal.length;i++){
            let value = deal[i]
            let dealIdx = dealIdxs[i]
            console.log('valueDeal:', value)
            
            sql += ` sel_price = CASE deal_idx 
                                    WHEN ${dealIdx} 
                                    THEN '${value.sel_price}' 
                                    ELSE sel_price
                                    END,
                                    repr_img = CASE deal_idx
                                    WHEN ${dealIdx}
                                    THEN '${value.repr_img}'
                                    ELSE repr_img
                                    END,
                                    last_mod_dt_time = CASE deal_idx
                                    WHEN ${dealIdx}
                                    THEN '${value.last_mod_dt_time}'
                                    ELSE last_mod_dt_time
                                    END,
                                    free_deliv_or_not = CASE deal_idx
                                    WHEN ${dealIdx}
                                    THEN '${value.free_deliv_or_not}'
                                    ELSE free_deliv_or_not
                                    END,
                                    deliv_amt = CASE deal_idx
                                    WHEN ${dealIdx}
                                    THEN '${value.deliv_amt}'
                                    ELSE deliv_amt
                                    END,
                                    deal_classif = CASE deal_idx
                                    WHEN ${dealIdx}
                                    THEN '${value.deal_classif}'
                                    ELSE deal_classif
                                    END,
                                    deal_opt_id = CASE deal_idx
                                    WHEN ${dealIdx}
                                    THEN '${value.deal_opt_id}'
                                    ELSE deal_opt_id
                                    END,
                                    repr_timg = CASE deal_idx
                                    WHEN ${dealIdx}
                                    THEN '${value.repr_timg}'
                                    ELSE repr_timg
                                    END,
                                    repr_cat_id = CASE deal_idx
                                    WHEN ${dealIdx}
                                    THEN '${value.repr_cat_id}'
                                    ELSE repr_cat_id
                                    END,`
        }
        for(let i=0; i<deal.length; i++){
            let value = deal[i]
            let dealIdx = dealIdxs[i]
            if(i == deal.length-1){
                for(let k=1; k<10; k++){
                    let imgKeys = dealKeys.find(key => key === `add_img_${k}`)
                    console.log('imgKeys:', imgKeys)
                    sql += ` ${imgKeys} = CASE deal_idx
                                                WHEN ${dealIdx}
                                                THEN '${value[imgKeys]}'
                                                ELSE ${imgKeys}
                                                END,`
                    
                }
                for(let j=1; j<9; j++){
                    let imgKeys = dealKeys.find(key => key === `add_timg_${j}`)
                    console.log('imgKeys:', imgKeys)
                    sql += ` ${imgKeys} = CASE deal_idx
                                                WHEN ${dealIdx}
                                                THEN '${value[imgKeys]}'
                                                ELSE ${imgKeys}
                                                END,`
                }
                sql += ` add_timg_9 = CASE deal_idx
                                                WHEN ${dealIdx}
                                                THEN '${value.add_timg_9}'
                                                ELSE add_timg_9
                                                END`
            }else{
                for(let k=1; k<10; k++){
                    let imgKeys = dealKeys.find(key => key === `add_img_${k}`)
                    console.log('imgKeys:', imgKeys)
                    sql += ` ${imgKeys} = CASE deal_idx
                                                WHEN ${dealIdx}
                                                THEN '${value[imgKeys]}'
                                                ELSE ${imgKeys}
                                                END,`
                    
                }
                for(let j=1; j<10; j++){
                    let imgKeys = dealKeys.find(key => key === `add_timg_${j}`)
                    console.log('imgKeys:', imgKeys)
                    sql += ` ${imgKeys} = CASE deal_idx
                                                WHEN ${dealIdx}
                                                THEN '${value[imgKeys]}'
                                                ELSE ${imgKeys}
                                                END,`
                    
                }
            }
        }
    
        console.log('sql : ',sql)
        const { affectedRows } = await db.query({
            connection: connection,
            sql: sql,
            //values: [options]
        })
        return affectedRows
    
    }catch(e){
        throw new Error(e);
    }
}



module.exports.multipleCategoryUpdate = async (options, connection) => {
    try{
        let sql = `UPDATE deal SET`
        let categories = options.categories
        let dealIdArray = options.dealIdArray
        
        for (let i=0;i<dealIdArray.length;i++){
            const randomElement = categories[Math.floor(Math.random() * categories.length)];
            let deal_id = dealIdArray[i]
            if(i == dealIdArray.length-1){
                sql += ` repr_cat_id = CASE deal_id 
                WHEN ${deal_id} 
                THEN '${randomElement}'
                ELSE repr_cat_id
                END
                `
            } else {
                sql += ` repr_cat_id = CASE deal_id 
                WHEN ${deal_id} 
                THEN '${randomElement}'
                ELSE repr_cat_id
                END,
                `
            }
            
        }
           
        console.log('sql : ',sql)
        const { affectedRows } = await db.query({
            connection: connection,
            sql: sql,
            //values: [options]
        })
        return affectedRows
    
    }catch(e){
        throw new Error(e);
    }
}

module.exports.getList = async (options) => {
    try{
        let { deal_idx, repr_cat_id, deal_id, srch_cnt, page } = options;
        let whereClause = ``
        let limitClause = ``
        let values = [];

        if(deal_idx) {
            whereClause += ` AND deal_idx = ?`
            values.push(deal_idx)
        } 
        if(repr_cat_id){
            whereClause += ` AND repr_cat_id = ?`
            values.push(repr_cat_id)
        }
        if(deal_id){
            whereClause += ` AND deal_id = ?`
            values.push(deal_id)
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
                   FROM deal
                   WHERE 1=1
                   ${whereClause}
                   ${limitClause}`
        
        console.log('sql: ',sql)

        return await db.query({
            sql: sql,
            values
        })
        
    }catch(e){
        throw new Error(e);
    }
}

module.exports.getListTotal = async (options) => {
    try{
        let { deal_idx, repr_cat_id, deal_id, srch_cnt, page } = options;
        let whereClause = ``
        let limitClause = ``
        let values = [];

        if(deal_idx) {
            whereClause += ` AND deal_idx = ?`
            values.push(deal_idx)
        } 
        if(repr_cat_id){
            whereClause += ` AND repr_cat_id = ?`
            values.push(repr_cat_id)
        }
        if(deal_id){
            whereClause += ` AND deal_id = ?`
            values.push(deal_id)
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
                   FROM deal
                   WHERE 1=1
                   ${whereClause}
                   `
        
        console.log('sql: ',sql)

        return await db.query({
            sql: sql,
            values
        })
        
    }catch(e){
        throw new Error(e);
    }
}

module.exports.multipleGet = async(options) => {
    try{
        let sql = `SELECT deal_idx, sel_price, deal_state_code, deliv_amt FROM deal WHERE deal_id IN (${options})`
        return await db.query({
            sql
        })
    }catch(e){
        throw new Error(e);
    }
}

module.exports.multipleGetDeal = async(options) => {
    try{
        let sql = `SELECT * FROM deal WHERE deal_id IN (${options})`
        return await db.query({
            sql
        })
    }catch(e){
        throw new Error(e)
    }
}

module.exports.multipleGetAll = async(options) => {
    try{
        //let sql = `SELECT * FROM deal WHERE deal_id IN (${options.expCategory1CatIds})`
        let dealId = options.ids? options.ids : options
        // console.log('dealId:', dealId)
        let limitClause = ``
        let groupBy = ``

        if(options.groupBy){
            groupBy += ` GROUP BY ${groupBy}`
        }

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
                  FROM deal 
                  WHERE deal_id IN (${dealId})
                  ${groupBy}
                  ${limitClause}`
        })
    }catch(e){
        throw new Error(e);
    }
}

module.exports.multipleGetAllTotal = async(options) => {
    try{
        // //let { srch_cnt, page } = options.params

        // let limitClause = ``

        // if (!page || page < 0) {
        //     page = 1
        // }
        // let offset = (page - 1) * srch_cnt

        // if (srch_cnt) {
        //     limitClause = ` LIMIT ${offset}, ${srch_cnt}`
        // } else {
        //     limitClause = ``
        // }

        return await db.query({
            sql: `SELECT * 
                  FROM deal 
                  WHERE deal_id IN (${options.ids})`
        })
    }catch(e){
        throw new Error(e);
    }
}

module.exports.subJoinGet = async(options) => {
    try{
        let { srch_orderby, srch_seq, sort_keyword, ac_tgt_goods_or_not,  
            free_deliv_or_not, rating, mark, minPrice, maxPrice } = options.params
        console.log('options:', options)
        let column = options.column
        let params = options.params
        
        let whereClause = ``
        let orderClause = ``
        let limitClause = ``
        let groupBy = ``
        let columnClause = ``
        let values = []

        if(options.column){
            columnClause += ` AND ${column} IN (?)`
            values.push(options.values)
        }
        
        if(options.reprCatId){
            whereClause += ` AND goods.repr_cat_id IN (?)`
            values.push(options.reprCatId)
        }

        if(options.groupBy && !mark){
            groupBy += ` GROUP BY goods${'.'+options.groupBy}`
        }

        if(ac_tgt_goods_or_not && !mark){
            whereClause += ` AND deal.ac_tgt_goods_or_not = ?`
            values.push(ac_tgt_goods_or_not)
        }
        if(ac_tgt_goods_or_not && mark){
            columnClause += ` AND deal.ac_tgt_goods_or_not = ?`
            groupBy += ` GROUP BY suppl_code`
            values.push(ac_tgt_goods_or_not)
        }
        if(free_deliv_or_not && !mark){
            whereClause += ` AND deal.free_deliv_or_not = ?`
            values.push(free_deliv_or_not)
        }
        if(free_deliv_or_not && mark){
            columnClause += ` AND deal.free_deliv_or_not = ?`
            values.push(free_deliv_or_not)
        }
        if(minPrice && mark){
            columnClause += ` AND orig_price >= ?`
            values.push(minPrice)
        }
        if(maxPrice && mark){
            columnClause += ` AND orig_price <= ?`
            values.push(maxPrice)
        }

        if(options.params){
            let { srch_cnt, page } = options.params

            if (!page || page < 0) {
                page = 1
            }
            let offset = (page - 1) * srch_cnt
    
            if (srch_cnt) {
                limitClause = ` LIMIT ${offset}, ${srch_cnt}`
            } else {
                limitClause = ` LIMIT 108`
            }
        }

        if(!srch_orderby && !mark){
            srch_orderby = 'deal.first_create_dt_time'
        }
        if(!srch_orderby && mark){
            srch_orderby = 'deal.first_create_dt_time'
        }
        if(!srch_seq){
            srch_seq = 'asc'
        }

        if(sort_keyword){
            switch(sort_keyword){
                case "랭킹순":
                    srch_orderby = ' ' 
                    srch_seq = ' '
                break;
                case "낮은가격순":
                    srch_orderby = 'deal.orig_price' 
                    srch_seq = 'asc'
                break;
                case "높은가격순":
                    srch_orderby = 'deal.orig_price' 
                    srch_seq = 'desc'
                break
                case "리뷰많은순":
                    srch_orderby = ' ' 
                    srch_seq = ' '
                break
                case "최신순":
                    srch_orderby = 'deal.first_create_dt_time' 
                    srch_seq = 'desc'
                break
                case "많이구매한순":
                    srch_orderby = 'deal.pur_cnt'
                    srch_seq = 'desc'
                break
            }
        }

        orderClause += ` ORDER BY ${srch_orderby} ${srch_seq}`
        
        if(params.srch_category){
            // console.log('params.srch_category : ',params.srch_category)
            switch(params.srch_category){
                case "다른 고객이 함께 본 제품":
                    whereClause += ` AND deal.deal_idx IN (${[1,2,3,4,5,6,7,8,9,10]})`
                break
                case "다른 사람들의 '늘 사던 것'":
                    whereClause += `AND deal.deal_idx IN (${[11, 12, 13, 14, 15, 16, 17, 18, 19, 20]})`
                break
                case "같은 브랜드의 다른 제품":
                    whereClause += `AND deal.deal_idx IN (${[21, 22, 23, 24, 25, 26, 27, 28, 29, 30]})`
                    // whereClause += `AND deal.deal_idx IN (${[31, 32, 33, 34, 35, 36, 37, 38, 39, 40]})`
                    // console.log('같은 브랜드의 다른 제품 whereClause : ',whereClause)
                    break;
                case "다른 고객이 함께 구매한 제품":
                    whereClause += `AND deal.deal_idx IN (${[31, 32, 33, 34, 35, 36, 37, 38, 39, 40]})`
                break
                case "늘 사던 것":
                    whereClause += ` AND goods.repr_cat_id IN (?)`
                    //limitClause += ` LIMIT 10`
                    params.srch_cnt? limitClause: limitClause = ` LIMIT 10`
                    values.push(options.reprCatId)
                break
                case "찜한 상품":
                    whereClause += ` AND goods.repr_cat_id IN (?)`
                    params.srch_cnt? limitClause: limitClause = ` LIMIT 10`
                    values.push(options.reprCatId)
                break
                case "최근 본 상품":
                    whereClause += ` AND goods.repr_cat_id IN (?)`
                    params.srch_cnt? limitClause: limitClause = ` LIMIT 10`
                    values.push(options.reprCatId)
                break
            }
        }
        
        // console.log('final whereClause : ',whereClause)
        let sql = `SELECT goods.*, deal.deal_id  
                    FROM (
                        SELECT goods_id, suppl_code
                        FROM goods
                        WHERE 1=1
                        ${columnClause}
                        ${limitClause}
                    )goods 
                    INNER JOIN deal
                    ON  goods.goods_id = deal.deal_id
                    WHERE 1+1
                    ${whereClause}
                    ${groupBy}
                    `
        let sql2 = `SELECT deal.*, goods.suppl_code, goods.goods_id 
                    FROM (
                        SELECT deal_id
                        FROM deal
                        WHERE 1=1
                        ${columnClause}
                        ${limitClause}
                    )deal
                    INNER JOIN goods
                    ON  deal.deal_id = goods.goods_id
                    WHERE 1+1
                    ${whereClause}
                    ${groupBy}
                    `
        // let sql2 = `SELECT * 
        //             FROM goods 
        //             WHERE 1=1
        //             ${whereClause}
        //             ${groupBy}
        //  : mark? sql2: sql           `
        return await db.query({
            sql: mark? sql2: sql ,
            values
        })
    }catch(e){
        throw new Error(e)
    }
}

module.exports.subJoinDealGet = async(options) => {
    try{
        let { srch_orderby, srch_seq, sort_keyword, ac_tgt_goods_or_not, minPrice, maxPrice,
            free_deliv_or_not, rating, mark } = options.params
        console.log('options:', options)
        let column = options.column
        let params = options.params
        
        let whereClause = ``
        let orderClause = ``
        let limitClause = ``
        let groupBy = ``
        let columnClause = ``
        let values = []

        if(options.column){
            columnClause += ` AND ${column} IN (?)`
            values.push(options.values)
        }
        
        if(options.reprCatId){
            whereClause += ` AND goods.repr_cat_id IN (?)`
            values.push(options.reprCatId)
        }

        if(options.groupBy){
            groupBy += ` GROUP BY c${'.'+options.groupBy}`
        }

        if(ac_tgt_goods_or_not){
            whereClause += ` AND deal.ac_tgt_goods_or_not = ?`
            values.push(ac_tgt_goods_or_not)
        }
        if(ac_tgt_goods_or_not && mark){
            columnClause += ` AND deal.ac_tgt_goods_or_not = ?`
            values.push(ac_tgt_goods_or_not)
        }

        if(free_deliv_or_not && !mark){
            whereClause += ` AND deal.free_deliv_or_not = ?`
            values.push(free_deliv_or_not)
        }
        if(free_deliv_or_not && mark){
            columnClause += ` AND deal.free_deliv_or_not = ?`
            values.push(free_deliv_or_not)
        }
        if(minPrice && mark){
            columnClause += ` AND orig_price >= ?`
            values.push(minPrice)
        }
        if(maxPrice && mark){
            columnClause += ` AND orig_price <= ?`
            values.push(maxPrice)
        }

        if(options.params){
            let { srch_cnt, page } = options.params

            if (!page || page < 0) {
                page = 1
            }
            let offset = (page - 1) * srch_cnt
    
            if (srch_cnt) {
                limitClause = ` LIMIT ${offset}, ${srch_cnt}`
            } else {
                limitClause = ` LIMIT 108`
            }
        }

        if(!srch_orderby){
            srch_orderby = 'deal.first_create_dt_time'
        }
         
        if(!srch_seq){
            srch_seq = 'asc'
        }

        if(sort_keyword){
            switch(sort_keyword){
                case "랭킹순":
                    srch_orderby = ' ' 
                    srch_seq = ' '
                break;
                case "낮은가격순":
                    srch_orderby = 'deal.orig_price' 
                    srch_seq = 'asc'
                break;
                case "높은가격순":
                    srch_orderby = 'deal.orig_price' 
                    srch_seq = 'desc'
                break
                case "리뷰많은순":
                    srch_orderby = ' ' 
                    srch_seq = ' '
                break
                case "최신순":
                    srch_orderby = 'deal.first_create_dt_time' 
                    srch_seq = 'desc'
                break
                case "많이구매한순":
                    srch_orderby = 'deal.pur_cnt'
                    srch_seq = 'desc'
                break
            }
        }

        orderClause += ` ORDER BY ${srch_orderby} ${srch_seq}`
        
        if(params.srch_category){
            // console.log('params.srch_category : ',params.srch_category)
            switch(params.srch_category){
                case "다른 고객이 함께 본 제품":
                    whereClause += ` AND deal.deal_idx IN (${[1,2,3,4,5,6,7,8,9,10]})`
                break
                case "다른 사람들의 '늘 사던 것'":
                    whereClause += `AND deal.deal_idx IN (${[11, 12, 13, 14, 15, 16, 17, 18, 19, 20]})`
                break
                case "같은 브랜드의 다른 제품":
                    whereClause += `AND deal.deal_idx IN (${[21, 22, 23, 24, 25, 26, 27, 28, 29, 30]})`
                    // whereClause += `AND deal.deal_idx IN (${[31, 32, 33, 34, 35, 36, 37, 38, 39, 40]})`
                    // console.log('같은 브랜드의 다른 제품 whereClause : ',whereClause)
                    break;
                case "다른 고객이 함께 구매한 제품":
                    whereClause += `AND deal.deal_idx IN (${[31, 32, 33, 34, 35, 36, 37, 38, 39, 40]})`
                break
                case "늘 사던 것":
                    whereClause += ` AND goods.repr_cat_id IN (?)`
                    //limitClause += ` LIMIT 10`
                    params.srch_cnt? limitClause: limitClause = ` LIMIT 10`
                    values.push(options.reprCatId)
                break
                case "찜한 상품":
                    whereClause += ` AND goods.repr_cat_id IN (?)`
                    params.srch_cnt? limitClause: limitClause = ` LIMIT 10`
                    values.push(options.reprCatId)
                break
                case "최근 본 상품":
                    whereClause += ` AND goods.repr_cat_id IN (?)`
                    params.srch_cnt? limitClause: limitClause = ` LIMIT 10`
                    values.push(options.reprCatId)
                break
            }
        }
        
        // console.log('final whereClause : ',whereClause)
        let sql = `SELECT c.*, deal.*
                    FROM (
                        SELECT goods_id
                        FROM goods
                        WHERE 1=1
                        ${columnClause}
                        ${limitClause}
                    )c 
                    JOIN deal
                    ON  c.goods_id = deal.deal_id
                    WHERE 1+1
                    ${whereClause}
                    ${orderClause}
                    `
        let sql2 = `SELECT deal.*, goods.goods_id
                    FROM (
                        SELECT *
                        FROM deal
                        WHERE 1=1
                        ${columnClause}
                        ${limitClause}
                    )deal 
                    JOIN goods
                    ON  deal.deal_id = goods.goods_id
                    WHERE 1+1
                    ${whereClause}
                    ${orderClause}
                    `
        // let sql2 = `SELECT * 
        //             FROM deal 
        //             WHERE 1=1
        //             ${whereClause}
        //             ${orderClause}
        //             ${limitClause}`
        return await db.query({
            sql: mark? sql2: sql,
            values
        })
    }catch(e){
        throw new Error(e)
    }
}

module.exports.subJoinGetTotal = async(options) => {
    try{
        let { srch_orderby, srch_seq, sort_keyword, ac_tgt_goods_or_not, free_deliv_or_not } = options.params
        console.log('options:', options)
        let column = options.column
        let params = options.params
        let whereClause = ``
        let orderClause = ``
        let limitClause = ``
        let columnClause = ``

        if(options.column){
            columnClause += ` AND ${column} IN (?)`
        }

        if(options.reprCatId){
            whereClause += ` AND goods.repr_cat_id IN (${options.reprCatId})`
        }
        if(ac_tgt_goods_or_not){
            whereClause += ` AND deal.ac_tgt_goods_or_not = '${ac_tgt_goods_or_not}'`
        }

        if(free_deliv_or_not){
            whereClause += ` AND deal.free_deliv_or_not = '${free_deliv_or_not}'`
        }

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

        if(!srch_orderby){
            srch_orderby = 'deal.first_create_dt_time'
        } 
        if(!srch_seq){
            srch_seq = 'asc'
        }

        if(sort_keyword){
            switch(sort_keyword){
                case "랭킹순":
                    srch_orderby = ' ' 
                    srch_seq = ' '
                break;
                case "낮은가격순":
                    srch_orderby = 'deal.orig_price' 
                    srch_seq = 'asc'
                break;
                case "높은가격순":
                    srch_orderby = 'deal.orig_price' 
                    srch_seq = 'desc'
                break
                case "리뷰많은순":
                    srch_orderby = ' ' 
                    srch_seq = ' '
                break
                case "최신순":
                    srch_orderby = 'deal.first_create_dt_time' 
                    srch_seq = 'desc'
                break
            }
        }

        orderClause += ` ORDER BY ${srch_orderby} ${srch_seq}`
        
        if(params.srch_category){
            console.log('params.srch_category2 : ',params.srch_category)
            switch(params.srch_category){
                case "다른 고객이 함께 본 제품":
                    whereClause += ` AND deal.deal_idx IN (${[1,2,3,4,5,6,7,8,9,10]})`
                break
                case "다른 사람들의 '늘 사던 것'":
                    whereClause += `AND deal.deal_idx IN (${[11, 12, 13, 14, 15, 16, 17, 18, 19, 20]})`
                break
                case "같은 브랜드의 다른 제품":
                    whereClause += `AND deal.deal_idx IN (${[21, 22, 23, 24, 25, 26, 27, 28, 29, 30]})`
                    // whereClause += `AND deal.deal_idx IN (${[31, 32, 33, 34, 35, 36, 37, 38, 39, 40]})`
                break
                case "다른 고객이 함께 구매한 제품":
                    whereClause += `AND deal.deal_idx IN (${[31, 32, 33, 34, 35, 36, 37, 38, 39, 40]})`
                break
                case "늘 사던 것":
                    whereClause += ` AND goods.repr_cat_id IN (?)`
                    //limitClause += ` LIMIT 10`
                    params.srch_cnt? limitClause: limitClause = ` LIMIT 10`
                    values.push(options.reprCatId)
                break
                case "찜한 상품":
                    whereClause += ` AND goods.repr_cat_id IN (?)`
                    params.srch_cnt? limitClause: limitClause = ` LIMIT 10`
                    values.push(options.reprCatId)
                break
                case "최근 본 상품":
                    whereClause += ` AND goods.repr_cat_id IN (?)`
                    params.srch_cnt? limitClause: limitClause = ` LIMIT 10`
                    values.push(options.reprCatId)
                break
            }
        }
        
        let sql = `SELECT MIN(deal.orig_price - deal.deal_disc_price) AS minPrice, 
                        MAX(deal.orig_price - deal.deal_disc_price) AS maxPrice,
                        AVG(deal.orig_price - deal.deal_disc_price) AS avrPrice  
                    FROM (
                        SELECT goods_id
                        FROM goods
                        WHERE 1=1
                        ${columnClause}
                    )c 
                    LEFT JOIN deal
                    ON c.goods_id = deal.deal_id
                    WHERE 1+1
                    ${whereClause}
                    `
        return await db.query({
            sql,
            values: [options.values]
        })
    }catch(e){
        throw new Error(e)
    }
}

module.exports.joinGet = async(options) => {
    try{
        let { srch_orderby, srch_seq, sort_keyword, ac_tgt_goods_or_not, 
            free_deliv_or_not, rating } = options.params

        let column = options.column
        let params = options.params
        
        let whereClause = ``
        let orderClause = ``
        let limitClause = ``
        let groupBy = ``
        let values = [];

        
        if(options.reprCatId){
            whereClause += ` AND goods.repr_cat_id IN (?)`
            values.push(options.reprCatId)
        }

        if(options.groupBy){
            groupBy += ` GROUP BY goods${'.'+options.groupBy}`
        }

        if(ac_tgt_goods_or_not){
            whereClause += ` AND deal.ac_tgt_goods_or_not = ?`
            values.push(ac_tgt_goods_or_not)
        }

        if(free_deliv_or_not){
            whereClause += ` AND deal.free_deliv_or_not = ?`
            values.push(free_deliv_or_not)
        }

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

        if(!srch_orderby){
            srch_orderby = 'deal.first_create_dt_time'
        } 
        if(!srch_seq){
            srch_seq = 'asc'
        }

        if(sort_keyword){
            switch(sort_keyword){
                case "랭킹순":
                    srch_orderby = ' ' 
                    srch_seq = ' '
                break;
                case "낮은가격순":
                    srch_orderby = 'deal.orig_price' 
                    srch_seq = 'asc'
                break;
                case "높은가격순":
                    srch_orderby = 'deal.orig_price' 
                    srch_seq = 'desc'
                break
                case "리뷰많은순":
                    srch_orderby = ' ' 
                    srch_seq = ' '
                break
                case "최신순":
                    srch_orderby = 'deal.first_create_dt_time' 
                    srch_seq = 'desc'
                break
                case "많이구매한순":
                    srch_orderby = 'deal.pur_cnt'
                    srch_seq = 'desc'
                break
            }
        }

        orderClause += ` ORDER BY ${srch_orderby} ${srch_seq}`
        
        if(params.srch_category){
            // console.log('params.srch_category : ',params.srch_category)
            switch(params.srch_category){
                case "다른 고객이 함께 본 제품":
                    whereClause += ` AND deal.deal_idx IN (${[1,2,3,4,5,6,7,8,9,10]})`
                break
                case "다른 사람들의 '늘 사던 것'":
                    whereClause += `AND deal.deal_idx IN (${[11, 12, 13, 14, 15, 16, 17, 18, 19, 20]})`
                break
                case "같은 브랜드의 다른 제품":
                    whereClause += `AND deal.deal_idx IN (${[21, 22, 23, 24, 25, 26, 27, 28, 29, 30]})`
                    // whereClause += `AND deal.deal_idx IN (${[31, 32, 33, 34, 35, 36, 37, 38, 39, 40]})`
                    // console.log('같은 브랜드의 다른 제품 whereClause : ',whereClause)
                    break;
                case "다른 고객이 함께 구매한 제품":
                    whereClause += `AND deal.deal_idx IN (${[31, 32, 33, 34, 35, 36, 37, 38, 39, 40]})`
                break
                case "늘 사던 것":
                    whereClause += ` AND goods.repr_cat_id IN (?)`
                    //limitClause += ` LIMIT 10`
                    params.srch_cnt? limitClause: limitClause = ` LIMIT 10`
                    values.push(options.reprCatId)
                break
                case "찜한 상품":
                    whereClause += ` AND goods.repr_cat_id IN (?)`
                    params.srch_cnt? limitClause: limitClause = ` LIMIT 10`
                    values.push(options.reprCatId)
                break
                case "최근 본 상품":
                    whereClause += ` AND goods.repr_cat_id IN (?)`
                    params.srch_cnt? limitClause: limitClause = ` LIMIT 10`
                    values.push(options.reprCatId)
                break
                case "같이 담으면 추가할인":
                    whereClause += ` AND goods.repr_cat_id IN (?)`
                    params.srch_cnt? limitClause: limitClause = ` LIMIT 10`
                    values.push(options.reprCatId)
                break
            }
        }
        
        // console.log('final whereClause : ',whereClause)
        let sql = `SELECT goods.*, deal.deal_opt_id, deal.dets_info, deal.orig_price, deal.deliv_amt, 
                            deal.deal_disc_price, deal.repr_img, deal.repr_timg  
                    FROM deal 
                    JOIN goods
                    ON deal.deal_id = goods.goods_id
                    WHERE 1+1
                    ${whereClause}
                    ${groupBy}
                    ${orderClause}
                    ${limitClause}
                    `
        console.log('sql:', sql)
        return await db.query({
            sql,
            values
        })
    }catch(e){
        throw new Error(e)
    }
}

module.exports.joinGetTotal = async(options) => {
    try{
        let { srch_orderby, srch_seq, sort_keyword, ac_tgt_goods_or_not, free_deliv_or_not } = options.params
        console.log('options:', options)
        let column = options.column
        let params = options.params
        let whereClause = ``
        let orderClause = ``
        let limitClause = ``
        let values = [];

        if(options.column){
            whereClause += ` AND goods${'.'+column} IN (?)`
        }

        if(options.reprCatId){
            whereClause += ` AND goods.repr_cat_id IN (?)`
            values.push(options.reprCatId)
        }
        if(ac_tgt_goods_or_not){
            whereClause += ` AND deal.ac_tgt_goods_or_not = ?`
            values.push(ac_tgt_goods_or_not)
        }

        if(free_deliv_or_not){
            whereClause += ` AND deal.free_deliv_or_not = ?`
            values.push(free_deliv_or_not)
        }

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

        if(!srch_orderby){
            srch_orderby = 'deal.first_create_dt_time'
        } 
        if(!srch_seq){
            srch_seq = 'asc'
        }

        if(sort_keyword){
            switch(sort_keyword){
                case "랭킹순":
                    srch_orderby = ' ' 
                    srch_seq = ' '
                break;
                case "낮은가격순":
                    srch_orderby = 'deal.orig_price' 
                    srch_seq = 'asc'
                break;
                case "높은가격순":
                    srch_orderby = 'deal.orig_price' 
                    srch_seq = 'desc'
                break
                case "리뷰많은순":
                    srch_orderby = ' ' 
                    srch_seq = ' '
                break
                case "최신순":
                    srch_orderby = 'deal.first_create_dt_time' 
                    srch_seq = 'desc'
                break
            }
        }

        orderClause += ` ORDER BY ${srch_orderby} ${srch_seq}`
        
        if(params.srch_category){
            console.log('params.srch_category2 : ',params.srch_category)
            switch(params.srch_category){
                case "다른 고객이 함께 본 제품":
                    whereClause += ` AND deal.deal_idx IN (${[1,2,3,4,5,6,7,8,9,10]})`
                break
                case "다른 사람들의 '늘 사던 것'":
                    whereClause += `AND deal.deal_idx IN (${[11, 12, 13, 14, 15, 16, 17, 18, 19, 20]})`
                break
                case "같은 브랜드의 다른 제품":
                    whereClause += `AND deal.deal_idx IN (${[21, 22, 23, 24, 25, 26, 27, 28, 29, 30]})`
                    // whereClause += `AND deal.deal_idx IN (${[31, 32, 33, 34, 35, 36, 37, 38, 39, 40]})`
                break
                case "다른 고객이 함께 구매한 제품":
                    whereClause += `AND deal.deal_idx IN (${[31, 32, 33, 34, 35, 36, 37, 38, 39, 40]})`
                break
                case "늘 사던 것":
                    whereClause += ` AND goods.repr_cat_id IN (?)`
                    //limitClause += ` LIMIT 10`
                    params.srch_cnt? limitClause: limitClause = ` LIMIT 10`
                    values.push(options.reprCatId)
                break
                case "찜한 상품":
                    whereClause += ` AND goods.repr_cat_id IN (?)`
                    params.srch_cnt? limitClause: limitClause = ` LIMIT 10`
                    values.push(options.reprCatId)
                break
                case "최근 본 상품":
                    whereClause += ` AND goods.repr_cat_id IN (?)`
                    params.srch_cnt? limitClause: limitClause = ` LIMIT 10`
                    values.push(options.reprCatId)
                break
                case "같이 담으면 추가할인":
                    whereClause += ` AND goods.repr_cat_id IN (?)`
                    //limitClause += ` LIMIT 10`
                    params.srch_cnt? limitClause: limitClause = ` LIMIT 10`
                    values.push(options.reprCatId)
                break
            }
        }
        
        let sql = `SELECT *, deal.dets_info, deal.orig_price, deal.deal_disc_price, deal.repr_img, deal.repr_timg  
                    FROM deal 
                    JOIN goods
                    ON deal.deal_id = goods.goods_id
                    WHERE 1+1
                    ${whereClause}
                    `
        console.log('sql:', sql)
        return await db.query({
            sql,
            values
        })
    }catch(e){
        throw new Error(e)
    }
}

module.exports.joinGetList = async(options) => {
    try{
        
        // let sql = `SELECT D.deal_idx, D.deal_id, D.deal_classif, D.deal_opt_id, D.hot_deal_or_not, D.hot_deal_expr_ts,
        //                   D.ac_tgt_goods_or_not, D.sabang_cxn_or_not, D.deal_state_code, D.deal_name, D.deal_overview,
        //                   D.sp_disc_price, D.view_cnt, D.shr_cnt, D.pur_cnt, D.free_deliv_or_not, D.deliv_amt, 
        //                   D.repr_cat_id, D.max_acc_amt, D.repr_img, D.add_img_1, D.add_img_2, D.add_img_3, D.add_img_4,
        //                   D.add_img_5, D.add_img_6, D.add_img_7, D.add_img_8, D.add_img_9, D.repr_timg, D.add_timg_1,
        //                   D.add_timg_2, D.add_timg_3, D.add_timg_4, D.add_timg_5, D.add_timg_6, D.add_timg_7, D.add_timg_8, 
        //                   D.add_timg_9, D.first_create_user, D.first_create_dt_time, D.last_mod_user, D.last_mod_dt_time,
        //                   D.orig_price, G.stock_qty
        //             FROM deal AS D 
        //             LEFT JOIN goods AS G
        //             ON D.deal_id = G.goods_id
        //             WHERE G.goods_id IN (${options}) 
                    // `
        let sql = `SELECT *, D.dets_info, D.orig_price, D.deal_disc_price, D.repr_img, D.repr_timg  
              FROM deal AS D 
              LEFT JOIN goods AS G
              ON D.deal_id = G.goods_id
              WHERE G.goods_id IN (${options}) 
              `
        return await db.query({
            sql
        })
    }catch(e){
        throw new Error(e)
    }
}

module.exports.joinGetForOrder = async(deal_id_array) => {
    try{

        let sql = `SELECT d.*, goods_id, goods.suppl_code
                    FROM(
                        SELECT deal_id, deal_opt_id, orig_price, deliv_amt, deal_disc_price
                        FROM deal
                        WHERE deal_id IN (${deal_id_array})
                    )d 
                    JOIN goods
                    ON d.deal_id = goods.goods_id
                    WHERE 1+1
                    `
        return await db.query({
            sql
        })
    }catch(e){
        throw new Error(e)
    }
}

module.exports.addViewCnt = async (options) => {
    try{
        let sql = `UPDATE deal SET ? WHERE deal_id = ?`
        return await db.query({
            sql,
            values: [options, options.deal_id]
        })
    }catch(e){
        throw new Error(e)
    }
}


module.exports.getPrice = async (options) => {
    try{

        // let {values} = options

        // if(values){
        //     options = values
        // }

        let sql = `SELECT orig_price, deal_disc_price, sp_disc_price, deliv_amt, deal_name
                    FROM deal 
                    WHERE deal_id IN (?)`
        return await db.query({
            sql,
            values: [options]
        })
    }catch(e){
        throw new Error(e)
    }
}

module.exports.getMinMaxPrice = async (options) => {
    try{
        let { values, column, params } = options
        
        let whereClause = ``
        let orderClause = ``
        let limitClause = ``

        if(column){
            whereClause += ` AND ${column} IN (?)`
        }

        if(params){
            let { srch_cnt, page } = params

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
        // let {values} = options

        // if(values){
        //     options = values
        // }

        // let sql = `SELECT MIN(orig_price - deal_disc_price), MAX(orig_price - deal_disc_price)
        //             FROM deal 
        //             WHERE deal_id IN (?)`

        let sql = `SELECT MIN(deal.orig_price - deal.deal_disc_price) AS minPrice, 
                          MAX(deal.orig_price - deal.deal_disc_price) AS maxPrice,
                          AVG(deal.orig_price - deal.deal_disc_price) AS avrPrice
              FROM (
                  SELECT goods_id
                  FROM goods
                  WHERE 1=1
                  ${whereClause} 
              )c 
              LEFT JOIN deal
              ON deal.deal_id = c.goods_id
              WHERE 1=1 
              ${limitClause}`
        return await db.query({
            sql,
            values: [values]
        })
    }catch(e){
        throw new Error(e)
    }
}

module.exports.getSearch = async (options) => {
    try{
        let { minPrice, maxPrice, ac_tgt_goods_or_not, free_deliv_or_not } = options
        let whereClause = ``
        if(minPrice && maxPrice){
            whereClause += ` AND orig_price - deal_disc_price >= ${minPrice} 
                             AND orig_price - deal_disc_price <= ${maxPrice}`
        }
        if(ac_tgt_goods_or_not){
            whereClause += ` AND ac_tgt_goods_or_not = '${ac_tgt_goods_or_not}'`
        }
        if(free_deliv_or_not){
            whereClause += ` AND free_deliv_or_not = '${free_deliv_or_not}'`
        }

        let sql = `SELECT *
                    FROM deal 
                    WHERE 1=1
                    ${whereClause}`
        return await db.query({
            sql
        })
    }catch(e){
        throw new Error(e)
    }
}

// , deal.dets_info, deal.orig_price, deal.deal_disc_price, deal.repr_img, deal.repr_timg,
//                           deal.ac_tgt_goods_or_not, deal.free_deliv_or_not