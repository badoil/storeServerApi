'use strict'

const handler = require('./category-handler')
const goodsSortTypeHandler = require('../goodsSortType/goodsSortType-handler')
const db = require('../../../components/db')
const crypto = require('../../../components/crypto')
const util = require('../../../components/util')
const fake = require('../../../models/fake')


module.exports.register = async (req, res, next) => {
  const connection = await db.beginTransaction();
  try{
    const category = req.options;

    category.first_create_dt_time = util.getCurrentTime();
    const result = await handler.insert(category, connection);
    await db.commit(connection);
    res.status(200).json(result);

  }catch(e){
    await db.rollback(connection);
    next(e);
  }
}


module.exports.update = async (req, res, next) => {
    const connection = await db.beginTransaction();
    try{
      let category = req.options;
      console.log('category:', category);
      const categoryResult = await handler.findOneByIdx(category.cat_idx);
      if(categoryResult.length === 0){
        throw{ status: 404, errorMessage: 'Category not found'};
      }
      category.last_mod_dt_time = util.getCurrentTime();
      category.cat_id = categoryResult[0].cat_id;
      delete category.cat_idx

      const result = await handler.update(category, connection);
      console.log('updateResult: ', result.affectedRows);
      if(result.affectedRows === 0){
        throw{ status: 404, errorMessage: "updating failed"};
      }
      await db.commit(connection);
      res.status(200).json({ result: true });
  
    }catch(e){
      await db.rollback(connection);
      next(e);
    }
  }
  
  module.exports.delete = async (req, res, next) => {
    const connection = await db.beginTransaction();
    try{
      console.log('deleteId:', req.options)
      const result = await handler.delete({ idx: req.options.cat_idx }, connection);
      console.log('deleteResult:', result);
      let returnValue = false;
      if(result.affectedRows === 1){
        returnValue = true
      }
      await db.commit(connection);
      res.status(200).json({ result: returnValue });
    }catch(e){
      await db.rollback(connection);
      next(e);
    }
  }

  module.exports.getList = async(req, res, next) => {
    try{
      const category = req.options
      let result;
      console.log('category.id:', category.prnt_cat_id)
      console.log('typeof:' , typeof(category.prnt_cat_id))
      if(category.prnt_cat_id === undefined){
        console.log("category.id")
        result = await handler.getList();
      }else{
        console.log(2)
        result = await handler.getList(category.prnt_cat_id);
      }
  
      return res.status(200).json({lists: result});
      
    }catch(e){
      console.error(e)
      next(e);
    }
  }

//   module.exports.getList = async(req, res, next) => {
//     try{
//       const category = req.options; 
//       const result = await handler.getList({id: category.id});
//       return res.status(200).json({list: result});
//     }catch(e){
//       next(e);
//     }
//   }