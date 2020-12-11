'use strict'

const handler = require('./brand-handler')
const db = require('../../../components/db')
const crypto = require('../../../components/crypto')
const util = require('../../../components/util')
const fake = require('../../../models/fake')


module.exports.register = async (req, res, next) => {
  const connection = await db.beginTransaction();
  try{
    const newBrand = req.options;
    const brand = await handler.findOneByName(newBrand.brand_name);
    if(brand.length !== 0){
      throw { status: 409, errorMessage: "Duplicate Brand"};
    }
    console.log('newBrand: ', newBrand);

    newBrand.first_create_dt_time = util.getCurrentTime();
    const result = await handler.insert(newBrand, connection);
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
    let newBrand = req.options
    const brand = await handler.findOneByName(newBrand.brand_name);
    console.log('brand:', brand);
    if(brand.length === 0){
      throw{ status: 404, errorMessage: 'Brand not found'};
    }
    newBrand.last_mod_dt_time = util.getCurrentTime();
    newBrand.brand_id = brand[0].brand_id;
    delete newBrand.id;

    const result = await handler.update(newBrand, connection);
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
    // const result = await handler.getList({id: req.options.id});
    const result = await handler.getList();
    return res.status(200).json({list: result});
  }catch(e){
    next(e);
  }
}