'use strict'

const handler = require('./hotDeal-handler')
const dealHandler = require('../deal/deal-handler')
const goodHandler = require('../goods/goods-handler')
const db = require('../../../components/db')
const crypto = require('../../../components/crypto')
const util = require('../../../components/util')
const fake = require('../../../models/fake')


module.exports.register = async (req, res, next) => {
  const connection = await db.beginTransaction()
  try {
    const newUser = req.options
    const user = await handler.findOneByEmail(newUser.EMAIL)
    console.log("user : ", user)
    if (user) {
      throw { status: 409, errorMessage: 'Duplicate Email' }
    }

    // console.log("newAcademy : ",newUser);
    const result = await handler.insert(newUser, connection)

    await db.commit(connection)
    res.status(200).json({ c: result })
  }
  catch (err) {
    await db.rollback(connection)
    next(err)
  }
}


module.exports.update = async (req, res, next) => {
  const connection = await db.beginTransaction()
  try {
    let newAcademy = req.options
    const academy = await handler.findOneById(newAcademy.id)
    console.log("academy : ", academy)
    if (!academy) {
      throw { status: 404, errorMessage: 'Academy not found' }
    }

    newAcademy.updateDate = util.getCurrentTime();
    newAcademy.idx = academy.idx;
    console.log("newAcademy : ", newAcademy)

    const result = await handler.update(newAcademy, connection)
    if (result === 0) throw { status: 404, errorMessage: 'Not found Academy' }

    await db.commit(connection)
    res.status(200).json({ result: true })
  }
  catch (err) {
    await db.rollback(connection)
    next(err)
  }
}


module.exports.delete = async (req, res, next) => {
  const connection = await db.beginTransaction()
  try {
    const result = await handler.delete({ idx: req.options.idx }, connection)
    await db.commit(connection)
    let returnValue = false;
    if (result.affectedRows === 1) {
      returnValue = true
    }
    res.status(200).json({ result: returnValue })
  }
  catch (err) {
    await db.rollback(connection)
    next(err)
  }
}

module.exports.getList = async (req, res, next) => {
  try{
    let todayHotDealIds = []
    for(let i=1; i<11; i++){
      let hot_deal_or_not = 'Y'
      let hot_deal_expr_ts = util.getCurrentTime()
      
      let dealYResult = await dealHandler.getList({deal_idx: i})
       
      todayHotDealIds.push(dealYResult[0].deal_id)
    }

    let todayHotDeal = await dealHandler.multipleGetAll(todayHotDealIds)
    let goods = await goodHandler.multipleGetAll(todayHotDealIds)
    for(let j=0; j<todayHotDeal.length; j++){
      todayHotDeal[j].stock_qty = goods[j].stock_qty
    }
    res.status(200).json({result: todayHotDeal})
}catch(err){
  console.log('err: ',err)
    next(err)
}
}
