'use strict'

const handler = require('./point-handler')
const db = require('../../../components/db')
const crypto = require('../../../components/crypto')
const util = require('../../../components/util')


module.exports.register = async (req, res, next) => {
  const connection = await db.beginTransaction()
  try {
    const newPoint = req.options
    // const user = await customerHandler.findOneByIdx(newPoint.cust_idx)
    // if (!user) {
    //   throw { status: 404, errorMessage: 'User not found' }
    // }

    newPoint.first_create_dt_time = util.getCurrentTime();
    const result = await handler.insert(newPoint, connection)
  
    await db.commit(connection)
    res.status(200).json({ result:result })
  }
  catch (err) {
    await db.rollback(connection)
    next(err)
  }
}

module.exports.getList = async (req, res, next) => {
  try {
    const params = req.options
    
    const result = await handler.getList(params)
    res.status(200).json({result})
  }
  catch (err) {
    next(err)
  }
}

module.exports.getListByIdx = async (req, res, next) => {
  try{
    const params = req.options
    const result = await handler.getListByIdx(params)
    let totalAmt = 0
    for(let i=0; i<result.length; i++){
      totalAmt = totalAmt + result[i].amt
    }

    res.status(200).json({list: result, totalAmt})

  }catch(err){
    console.error(err)
    next(err)
  }
}

