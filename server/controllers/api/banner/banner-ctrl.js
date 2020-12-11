'use strict'

const handler = require('./banner-handler')
const db = require('../../../components/db')
const crypto = require('../../../components/crypto')
const util = require('../../../components/util')
const fake = require('../../../models/fake')

module.exports.register = async (req, res, next) => {
  const connection = await db.beginTransaction();
  try{
    const banner = req.options;
    console.log('banner: ', banner);
    banner.first_create_dt_time = util.getCurrentTime();
    const result = await handler.insert(banner, connection);
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
      let banner = req.options;
      console.log('banner:', banner);
      const bannerResult = await handler.findOneByIdx(banner.exhib_idx);
      if(bannerResult.length === 0){
        throw{ status: 404, errorMessage: 'Banner not found'};
      }
      banner.last_mod_dt_time = util.getCurrentTime();
      banner.exhib_id = bannerResult[0].exhib_id;
      delete banner.exhib_idx

      const result = await handler.update(banner, connection);
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
      const result = await handler.delete({ idx: req.options.exhib_idx }, connection);
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
      
      const result = await handler.getList();
      
      return res.status(200).json({lists: result});
      
    }catch(e){
      console.error(e)
      next(e);
    }
  }

