'use strict'

const orderModel = require('../../../models/order')


module.exports.findOneByIdx = async (idx) => {
  try{
    return await orderModel.findOneByIdx(idx);
  }catch(e){
    throw new Error(e);
  }
}

module.exports.getMaxOrderNum = async (id) => {
  try{
    return await orderModel.getMaxOrderNum(id);
  }catch(e){
    throw new Error(e);
  }
}

module.exports.insert = async (options, connection) => {
  try {
    return await orderModel.insert(options, connection)
  }
  catch (e) {
      console.error(e);
    throw new Error(e)
  }
}

module.exports.multipleInsert = async (options, connection) => {
  try {
    return await orderModel.multipleInsert(options, connection)
  }
  catch (e) {
      console.error(e);
    throw new Error(e)
  }
}

module.exports.update = async (options, connection) => {
    try {
      return await orderModel.update(options, connection)
    }
    catch (e) {
      throw new Error(e)
      console.log(e)
    }
  }
  
module.exports.delete = async (options, connection) => {
  try {
    return await orderModel.delete(options.id, connection)
  }
  catch (e) {
    throw new Error(e)
  }
}

module.exports.multipleGet = async (options) => {
  try {
    // console.log("getList")
    const results = await orderModel.multipleGet(options)
    return results
  }
  catch (e) {
    throw new Error(e)
  }
}

module.exports.multipleGetTotal = async (options) => {
  try {
    // console.log("getList")
    const results = await orderModel.multipleGetTotal(options)
    return results.length
  }
  catch (e) {
    throw new Error(e)
  }
}

module.exports.getList = async (options) => {
  try {
    // console.log("getList")
    const results = await orderModel.getList(options)
    return results
  }
  catch (e) {
    throw new Error(e)
  }
}

module.exports.getListTotal = async (options) => {
  try {
    // console.log("getList")
    const results = await orderModel.getListTotal(options)
    return results.length
  }
  catch (e) {
    throw new Error(e)
  }
}

module.exports.joinGetForOrderDeliv = async (options) => {
  try {
    // console.log("getList")
    const results = await orderModel.joinGetForOrderDeliv(options)
    return results.length
  }
  catch (e) {
    throw new Error(e)
  }
}

module.exports.joinGetForOrderDelivTotal = async (options) => {
  try {
    // console.log("getList")
    const results = await orderModel.joinGetForOrderDelivTotal(options)
    return results.length
  }
  catch (e) {
    throw new Error(e)
  }
}