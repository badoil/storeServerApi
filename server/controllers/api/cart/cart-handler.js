'use strict'

const cartModel = require('../../../models/cart')


module.exports.findOneByIdx = async (options) => {
  try{
    return await cartModel.findOneByIdx(options);
  }catch(e){
    throw new Error(e);
  }
}

module.exports.insert = async (options, connection) => {
  try {
    return await cartModel.insert(options, connection)
  }
  catch (e) {
      console.error(e);
    throw new Error(e)
  }
}

module.exports.update = async (options, connection) => {
    try {
      return await cartModel.update(options, connection)
    }
    catch (e) {
      throw new Error(e)
      console.log(e)
    }
  }
  
  module.exports.delete = async (options, connection) => {
    try {
      return await cartModel.delete(options, connection)
    }
    catch (e) {
      throw new Error(e)
    }
  }

  module.exports.getList = async (options) => {
    try {
      // console.log("getList")
      const results = await cartModel.getList(options)
      return results
    }
    catch (e) {
      console.error(e)
      throw new Error(e)
    }
  }

  module.exports.getListTotal = async (options) => {
    try {
      // console.log("getList")
      const results = await cartModel.getList(options)
      return results.length
    }
    catch (e) {
      console.error(e)
      throw new Error(e)
    }
  }

  module.exports.getListByIdx = async (options, connection) => {
    try{
      return await cartModel.getListByIdx(options, connection)
    }
    catch (e) {
      throw new Error(e)
    }
  }

  module.exports.joinGet = async (options) => {
    try {
      // console.log("getList")
      const results = await cartModel.joinGet(options)
      return results
    }
    catch (e) {
      console.error(e)
      throw new Error(e)
    }
  }