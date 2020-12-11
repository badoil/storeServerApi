'use strict'

const wishModel = require('../../../models/wish')


module.exports.findOneByIdx = async (options) => {
  try{
    return await wishModel.findOneByIdx(options);
  }catch(e){
    throw new Error(e);
  }
}

module.exports.insert = async (options, connection) => {
  try {
    return await wishModel.insert(options, connection)
  }
  catch (e) {
      console.error(e);
    throw new Error(e)
  }
}

module.exports.update = async (options, connection) => {
    try {
      return await wishModel.update(options, connection)
    }
    catch (e) {
      throw new Error(e)
      console.log(e)
    }
  }
  
  module.exports.delete = async (options, connection) => {
    try {
      return await wishModel.delete(options, connection)
    }
    catch (e) {
      throw new Error(e)
    }
  }

  module.exports.getList = async (options) => {
    try {
      // console.log("getList")
      const results = await wishModel.getList(options)
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
      const results = await wishModel.getList(options)
      return results.length
    }
    catch (e) {
      console.error(e)
      throw new Error(e)
    }
  }