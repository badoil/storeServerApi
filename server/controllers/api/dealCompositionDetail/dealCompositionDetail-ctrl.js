'use strict'

const handler = require('./dealCompositionDetail-handler')
const goodsSortTypeHandler = require('../goodsSortType/goodsSortType-handler')
const db = require('../../../components/db')
const crypto = require('../../../components/crypto')
const util = require('../../../components/util')
const fake = require('../../../models/fake')


module.exports.register = async (req, res, next) => {
  const connection = await db.beginTransaction();
  try{
    const newDealComp = req.options;
    console.log('newDealComp: ', newDealComp);
    
    newDealComp.first_create_dt_time = util.getCurrentTime();
    const result = await handler.insert(newDealComp, connection);
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
    let newDealComp = req.options
    console.log('newGoods.params.id:', newDealComp.id);
    const dealComp = await handler.findOneById(newDealComp.id);
    console.log('dealComp:', dealComp);
    if(dealComp.length === 0){
      throw{ status: 404, errorMessage: 'DealCompositionDetail not found'};
    }
    newDealComp.last_mod_dt_time = util.getCurrentTime();
    newDealComp.deal_id = dealComp[0].deal_id;
    delete newDealComp.id
    
    const result = await handler.update(newDealComp, connection);
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
    const result = await handler.getList({id: req.options.id});
    return res.status(200).json({list: result});
  }catch(e){
    next(e);
  }
}