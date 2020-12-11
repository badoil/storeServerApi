const db = require('../components/db')

module.exports.multipleGet = async(options) => {
    try{
        let sql = `SELECT * FROM exposed_category_deal WHERE exp_cat_id IN (${options})`
        return await db.query({
            sql
        })
    }catch(e){
        throw new Error(e)
    }
}


module.exports.multipleGetDealId = async(options) => {
    try{
        let sql = `SELECT deal_id FROM exposed_category_deal WHERE exp_cat_id IN (${options})`
        return await db.query({
            sql
        })
    }catch(e){
        throw new Error(e)
    }
}



module.exports.getList = async (options) => {
    try{
        let sql = `SELECT *
                   FROM exposed_category_deal`
        if(options.exp_cat_id) {
            sql += ` WHERE exp_cat_idx = ${options.exp_cat_idx}`        
        }
        // sql += ` ORDER BY cat_depth ASC, exp_cat_id ASC`
        return await db.query({
            sql
        })
        
    }catch(e){
        throw new Error(e);
    }
}


module.exports.getListExpCatIds = async (options) => {
    try{
        let sql = `SELECT exp_cat_id
                   FROM exposed_category_deal`
        if(options.exp_cat_id) {
            sql += ` WHERE exp_cat_id = ${options.exp_cat_id}`        
        }
        // sql += ` ORDER BY cat_depth ASC, exp_cat_id ASC`
        return await db.query({
            sql
        })
        
    }catch(e){
        throw new Error(e);
    }
}