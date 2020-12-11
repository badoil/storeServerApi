'use strict'

const handler = require('./customer-handler')
const delivDestHandler = require('../deliveryDestination/deliveryDestination-handler')
const db = require('../../../components/db')
const crypto = require('../../../components/crypto')
const util = require('../../../components/util')
const JWT = require('../../../libs/jwt/index')

module.exports.register = async (req, res, next) => {
  const connection = await db.beginTransaction()
  try {
    let delivDestination = {}
    const newUser = req.options
    const user = await handler.findOneById(newUser.cust_id)
    if (user) {
      throw { status: 409, errorMessage: 'Duplicate id' }
    }

    // console.log("newAcademy : ",newUser);
    // const {salt, encodedPw} = crypto.createPasswordPbkdf2(newUser.password)
    // console.log('salt length : ',salt.length)
    // console.log('encodedPw length : ',encodedPw.length)
    // newUser.salt = salt
    const hashPw = crypto.createMD5Hash(newUser.password)
    newUser.password = hashPw
    newUser.first_create_dt_time = util.getCurrentTime();
    newUser.join_dt = util.getCurrentTime();
    let delivDestName = newUser.deliv_dest_name
    delete newUser.deliv_dest_name
    const insertId = await handler.insert(newUser, connection)

    // console.log('insertId : ',insertId)
    const tokens = await JWT.createToken({idx: insertId, id: newUser.cust_id})
    // console.log("tokens : ",tokens)
    newUser.token = tokens.accessToken
    console.log('token.length : ', tokens.accessToken.length)
    newUser.cust_idx = insertId
    newUser.first_create_user = insertId
    delivDestination.cust_idx = insertId
    delivDestination.deliv_dest_name = delivDestName
    delivDestination.rcpt_name = newUser.name
    delivDestination.rcpt_mobi = newUser.mobile
    delivDestination.rcpt_phone = newUser.mobile
    delivDestination.rcpt_email = newUser.email
    delivDestination.rcpt_zip_code = newUser.zip_code
    delivDestination.rcpt_base_addr = newUser.base_addr
    delivDestination.rcpt_dets_addr = newUser.dets_addr
    delivDestination.first_create_dt_time = util.getCurrentTime()
    delivDestination.first_create_user = insertId

    console.log("newUser : ",newUser)
    console.log('delivDestination:', delivDestination)
    const updateResult = await handler.update(newUser, connection)
    const insertDelivDestResult = await delivDestHandler.insert(delivDestination, connection)

    await db.commit(connection)
    res.status(200).json({ result:true })
  }
  catch (err) {
    await db.rollback(connection)
    next(err)
  }
}


module.exports.signIn = async (req, res, next) => {
  const connection = await db.beginTransaction()
  try {
    const newUser = req.options
    const user = await handler.findOneById(newUser.cust_id)
    console.log('newUser:', newUser)
    console.log('user:', user)
    if (!user) {
      throw { status: 404, errorMessage: 'User not found' }
    }

    // const encodedPw = crypto.getPasswordPbkdf2(newUser.password, user.salt)
    // console.log('encodedPw : ',encodedPw)
    // console.log('user.password : ',user.password)
    // user.password = encodedPw

    const hashPw = crypto.createMD5Hash(newUser.password)
    if (user.password === hashPw) { 
        console.log('Authentication succeed')           
    } else {
        throw {status: 401, errorMessage: 'Authentication failed'}
    }

    const tokens = await JWT.createToken({idx: user.cust_idx, id: user.id})
    newUser.token = tokens.accessToken
    newUser.cust_idx = user.cust_idx
    newUser.cust_id = user.cust_id
    newUser.password = user.password
    console.log("newUser : ",newUser)
    const updateResult = await handler.update(newUser, connection)
    console.log('updateResult:', updateResult)

    const result2 = await handler.getList(newUser)
    // console.log('result2 : ',result2)
    delete result2.password
    delete result2.salt
    delete result2.token
    await db.commit(connection)
    res.status(200).json({ result:result2 })
  }
  catch (err) {
    await db.rollback(connection)
    next(err)
  }
}


module.exports.update = async (req, res, next) => {
  const connection = await db.beginTransaction()
  try {
    let newUser = req.options
    const user = await handler.findOneById(newUser.cust_id)
    console.log("user : ", user)
    if (!user) {
      throw { status: 404, errorMessage: 'User not found' }
    }

    newUser.last_mod_dt_time = util.getCurrentTime();
    const hashPw = crypto.createMD5Hash(newUser.password)
    newUser.password = hashPw
    newUser.cust_idx = user.cust_idx
    console.log("newUser : ", newUser)

    const result = await handler.update(newUser, connection)
    if (result === 0) throw { status: 404, errorMessage: 'Not found User' }

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
    const result = await handler.delete(req.options.cust_idx, connection)
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
  try {
    const params = req.options

    const result = await handler.getList(params)
    res.status(200).json(result)
  }
  catch (err) {
    next(err)
  }
}

