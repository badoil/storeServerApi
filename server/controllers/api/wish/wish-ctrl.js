'use strict'

const handler = require('./wish-handler')
const db = require('../../../components/db')
const crypto = require('../../../components/crypto')
const util = require('../../../components/util')
const fake = require('../../../models/fake')


module.exports.register = async (req, res, next) => {
  const connection = await db.beginTransaction();
  try{
    const newWish = req.options;
    const wish = await handler.findOneByIdx(newWish);
    console.log('wish:', wish)

    let result
    if(wish.length !== 0){
      result = await handler.delete(wish[0], connection)
    }else{
      newWish.first_create_dt_time = util.getCurrentTime();
      result = await handler.insert(newWish, connection)
    }
    console.log('newWish: ', newWish);

    await db.commit(connection);
    res.status(200).json({result});

  }catch(e){
    await db.rollback(connection);
    next(e);
  }
}

module.exports.update = async (req, res, next) => {
  const connection = await db.beginTransaction();
  try{
    let newWish = req.body
    const wish = await handler.findOneByIdx(newWish);
    console.log('newWish:', newWish)
    console.log('wish:', wish);
    if(wish.length === 0){
      throw{ status: 404, errorMessage: 'Wish not found'};
    }
    newWish.last_mod_dt_time = util.getCurrentTime();
    //newDeliveryDestination.deliv_dest_idx = deliveryDestination[0].deliv_dest_idx;
    //delete newBrand.brand_idx;

    const result = await handler.update(newWish, connection);
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
    const params = req.options
    const result = await handler.delete(params, connection);
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
    const list = req.options
    const result = await handler.getList(list)

    return res.status(200).json({result: result});
    
  }catch(e){
    console.error(e)
    next(e);
  }
}
