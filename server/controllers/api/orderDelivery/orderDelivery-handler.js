'use strict'

const orderModel = require('../../../models/orderDelivery')


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

module.exports.getList = async (options, connection) => {
  try {
    return await orderModel.getList(options, connection)
  }
  catch (e) {
      console.error(e);
    throw new Error(e)
  }
}

module.exports.joinGet = async (options) => {
  try {
    return await orderModel.joinGet(options)
  }
  catch (e) {
      console.error(e);
    throw new Error(e)
  }
}

module.exports.joinGroupGet = async (options, connection) => {
  try {
    return await orderModel.joinGroupGet(options, connection)
  }
  catch (e) {
      console.error(e);
    throw new Error(e)
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

module.exports.delete = async (options, connection) => {
  try {
    return await orderModel.delete(options, connection)
  }
  catch (e) {
    throw new Error(e)
  }
}

module.exports.update = async (options, connection) => {
  try {
    return await orderModel.update(options, connection)
  }
  catch (e) {
    throw new Error(e)
  }
}