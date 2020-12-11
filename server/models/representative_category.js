const db = require('../components/db')

module.exports.findOneByIdx = async (idx) => {
    try{
        let sql = `SELECT * 
                   FROM representative_category 
                   WHERE exhib_idx = ?`
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
        let sql = `INSERT INTO representative_category SET ?`
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
            sql: `UPDATE representative_category SET ? 
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
            sql: `DELETE FROM representative_category 
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
        let { prnt_cat_id, cat_id } = options;
        let whereClause = '';
        let values = [];

        console.log('options : ',options)
        
        if(prnt_cat_id){
            whereClause += ` AND prnt_cat_id = ?`
            values.push(prnt_cat_id)
        }
        if(cat_id){
            whereClause += ` AND cat_id = ?`
            values.push(cat_id)
        }
        
        let sql = `SELECT *
                   FROM representative_category
                   WHERE 1=1
                   ${whereClause}
                   ORDER BY cat_depth ASC, cat_id ASC`
        return await db.query({
            sql,
            values
        })
        
    }catch(e){
        throw new Error(e);
    }
}

module.exports.multipleInsert = async (options, connection) => {
    try{
        let sql = `INSERT INTO representative_category (cat_id, 
                                                       exp_seq, 
                                                     cat_depth, 
                                                   prnt_cat_id, 
                                                      cat_name, 
                                             first_create_user, 
                                          first_create_dt_time,
                                                 last_mod_user,
                                              last_mod_dt_time) 
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
