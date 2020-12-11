const db = require('../components/db')

module.exports.findOneById = async (id) => {
    try{
        let sql = `SELECT * 
                   FROM exhibition_category 
                   WHERE exhib_id = ?`
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
        let sql = `INSERT INTO exhibition_category SET ?`
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
            sql: `UPDATE exhibition_category SET ? 
                  WHERE exhib_id = ?`,
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
        console.log('options:', options)
        let { valid_start_dt, valid_end_dt, banner_exp_or_not, main_page_exp_or_not, exhib_classif_code } = options


        let whereClause = ''
        // let orderClause = ''
        // let limitClause = ``
        let values = []

        if(banner_exp_or_not){
            whereClause += ` AND banner_exp_or_not = ?`
            values.push(banner_exp_or_not)
        }
        if(main_page_exp_or_not){
            whereClause += ` AND main_page_exp_or_not = ?`
            values.push(main_page_exp_or_not)
        }
        if(valid_start_dt){
            whereClause += ` AND DATE(valid_start_dt) <= ?`
            values.push(expire_dt_time)
        }
        if(valid_end_dt){
            whereClause += ` AND DATE(valid_end_dt) >= ?`
            values.push(expire_dt_time)
        }
        if(exhib_classif_code){
            whereClause += ` AND exhib_classif_code = ?`
            values.push(exhib_classif_code)
        }

        let sql = `SELECT * 
                   FROM exhibition_category
                   WHERE 1=1
                   ${whereClause}`


        return await db.query({
            sql,
            values
        })
        
    }catch(e){
        throw new Error(e);
    }
}

module.exports.getExhibList = async (options) => {
    try{
        let sql = `SELECT * 
                   FROM exhibition_category WHERE exhib_classif_code = 1 AND main_page_exp_or_not = 'Y'`

        return await db.query({
            sql,
        })
        
    }catch(e){
        throw new Error(e);
    }
}

module.exports.getExpBannerList = async (options) => {
    try{
        let sql = `SELECT * 
                   FROM exhibition_category WHERE banner_exp_or_not = 'Y'`

        return await db.query({
            sql,
        })
        
    }catch(e){
        throw new Error(e);
    }
}


module.exports.multiInsert = async (options, connection) => {
    try{
        
        let sql = `INSERT INTO exhibition_category (exhib_name,
                                  exhib_overview,
                                exhib_banner_img,
                                 exhib_horiz_img,
                                  exhib_vert_img,
                                    exhib_sq_img,
                             exhib_dets_info_img,
                               exhib_thema_color,
                                       exhib_tag,
                               banner_exp_or_not,
                            main_page_exp_or_not,
                                  valid_start_dt,
                                    valid_end_dt,
                            repr_goods_compo_list,
                            exhib_compo_goods_list,                                    
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

module.exports.multipleGet = async (options) => {
    try{
        let sql = `SELECT * 
                   FROM exhibition_category WHERE exhib_id IN (?)`

        return await db.query({
            sql,
            values: [options]
        })
        
    }catch(e){
        throw new Error(e);
    }
}

module.exports.getAll = async (options) => {
    try{
        let sql = `SELECT * 
                   FROM exhibition_category`

        return await db.query({
            sql,
            values: [options]
        })
        
    }catch(e){
        throw new Error(e);
    }
}

module.exports.joinGet = async (options) => {
    try{
        let sql = `SELECT * 
                   FROM exhibition_category_deal
                   JOIN exhibition_category
                   ON exhibition_category.exhib_id = exhibition_category_deal.exhib_id`
                
        return await db.query({
            sql,
            values: [options]
        })
        
    }catch(e){
        throw new Error(e);
    }
}