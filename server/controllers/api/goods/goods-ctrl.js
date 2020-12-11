'use strict'

const handler = require('./goods-handler')
const goodsSortTypeHandler = require('../goodsSortType/goodsSortType-handler')
const db = require('../../../components/db')
const crypto = require('../../../components/crypto')
const util = require('../../../components/util')
const fake = require('../../../models/fake')


module.exports.register = async (req, res, next) => {
  const connection = await db.beginTransaction();
  try{
    const newGoods = req.options;
    console.log('newGoods: ', newGoods.goods_name);
    // const goods = await handler.findOneByGoods(newGoods.goods_name);
    // console.log('goods:', goods)
    // if(goods.length !== 0){
    //   throw{ status: 409, errorMessage:"Duplicate Goods" };
    // }
    newGoods.first_create_dt_time = util.getCurrentTime();
    const result = await handler.insert(newGoods, connection);
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
    let newGoods = req.options
    console.log('newGoods.params.id:', newGoods.id);
    const goods = await handler.findOneById(newGoods.id);
    console.log('goods:', goods);
    if(goods.length === 0){
      throw{ status: 404, errorMessage: 'Goods not found'};
    }
    newGoods.last_mod_dt_time = util.getCurrentTime();
    newGoods.goods_id = goods[0].goods_id;
    console.log('newGodds.goods_id:', newGoods.goods_id);
    delete newGoods.id
    
    const result = await handler.update(newGoods, connection);
    console.log('ctrlResult: ', result.affectedRows);
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
    const result = await handler.delete({ id: req.options.id }, connection);
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
    const params = req.options
    const result = await handler.getList(params);
    return res.status(200).json({list: result});
  }catch(e){
    next(e);
  }
}


