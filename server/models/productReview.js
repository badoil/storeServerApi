const db = require('../components/db')


module.exports.findOneById = async (id) => {
    try{
        let sql = `SELECT * 
                   FROM product_review 
                   WHERE goods_review_id = ?`
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
        let sql = `INSERT INTO product_review SET ?`
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
            sql: `UPDATE product_review SET ? 
                  WHERE goods_review_id = ?`,
            values: [options, options.goods_review_id]
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
            sql: `DELETE FROM product_review 
                  WHERE goods_review_id = ?`,
            values: [id]
        })
        return result;
    }catch(e){
        throw new Error(e);
    }
}

module.exports.getList = async (options) => { // condition filter
    try{
        let { goods_review_id, goods_id, best_review_or_not, sort_keyword, srch_cnt, page } = options;
        let srch_orderby;
        let srch_seq;
        let whereClause = ``
        let limitClause = ``
        let orderClause = ``
        let values = [];
        srch_orderby = 'product_review.first_create_dt_time'
        srch_seq = 'asc'

            if(goods_review_id){
                whereClause += ` AND goods_review_id = ?`
                values.push(goods_review_id)
            }
            if(goods_id){
                whereClause += ` AND goods_id = ?`
                values.push(goods_id)
            }
            if(best_review_or_not){
                whereClause += ` AND best_review_or_not = ?`
                values.push(best_review_or_not)
            }
            
            if(sort_keyword){
                switch(sort_keyword){
                    case "베스트순":
                        srch_orderby = 'product_review.first_create_dt_time'
                        srch_seq = 'asc'
                    break;
                    case "평점 높은순":
                        srch_orderby = 'product_review.rating' 
                        srch_seq = 'desc'
                    break;
                    case "평점 낮은순":
                        srch_orderby = 'product_review.rating' 
                        srch_seq = 'asc'
                    break
                    case "최신순":
                        srch_orderby = 'product_review.first_create_dt_time' 
                        srch_seq = 'desc'
                    break
                }   
            }
        
        orderClause += ` ORDER BY ${srch_orderby} ${srch_seq}`

        if (!page || page < 0) {
            page = 1
        }
        let offset = (page - 1) * srch_cnt

        if (srch_cnt) {
            limitClause = ` LIMIT ${offset}, ${srch_cnt}`
        } else {
            limitClause = ``
        }
        console.log('whereClause : ',whereClause)
        return await db.query({
            sql: `SELECT * 
                  FROM product_review
                  WHERE 1=1
                  ${whereClause}
                  ${orderClause}
                  ${limitClause}`,
            values
        })
    } catch(err){
        throw new Error(err)
    }
}

module.exports.getListTotal = async (options) => { // condition filter
    try{
        let { goods_review_id, goods_id, best_review_or_not, sort_keyword, srch_cnt, page } = options;
        let srch_orderby;
        let srch_seq;
        let whereClause = ``
        let limitClause = ``
        let orderClause = ``
        let values = [];
        srch_orderby = 'product_review.first_create_dt_time'
        srch_seq = 'asc'

            if(goods_review_id){
                whereClause += ` AND goods_review_id = ?`
                values.push(goods_review_id)
            }
            if(goods_id){
                whereClause += ` AND goods_id = ?`
                values.push(goods_id)
            }
            if(best_review_or_not){
                whereClause += ` AND best_review_or_not = ?`
                values.push(best_review_or_not)
            }
            
            if(sort_keyword){
                switch(sort_keyword){
                    case "베스트순":
                        srch_orderby = 'product_review.first_create_dt_time'
                        srch_seq = 'asc'
                    break;
                    case "평점 높은순":
                        srch_orderby = 'product_review.rating' 
                        srch_seq = 'desc'
                    break;
                    case "평점 낮은순":
                        srch_orderby = 'product_review.rating' 
                        srch_seq = 'asc'
                    break
                    case "최신순":
                        srch_orderby = 'product_review.first_create_dt_time' 
                        srch_seq = 'desc'
                    break
                }   
            }
        
        orderClause += ` ORDER BY ${srch_orderby} ${srch_seq}`

        if (!page || page < 0) {
            page = 1
        }
        let offset = (page - 1) * srch_cnt

        if (srch_cnt) {
            limitClause = ` LIMIT ${offset}, ${srch_cnt}`
        } else {
            limitClause = ``
        }
        console.log('whereClause : ',whereClause)
        return await db.query({
            sql: `SELECT * 
                  FROM product_review
                  WHERE 1=1
                  ${whereClause}
                  `,
            values
        })
    } catch(err){
        throw new Error(err)
    }
}