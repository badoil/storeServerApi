'use strict'

const categoryModel = require('../../../models/category')


module.exports.findOneByIdx = async (idx) => {
  try{
    return await categoryModel.findOneByIdx(idx);
  }catch(e){
    throw new Error(e);
  }
}

module.exports.insert = async (options, connection) => {
  try {
    return await categoryModel.insert(options, connection)
  }
  catch (e) {
    throw new Error(e)
  }
}

module.exports.update = async (options, connection) => {
    try {
      return await categoryModel.update(options, connection)
    }
    catch (e) {
      throw new Error(e)
      console.log(e)
    }
  }
  
  module.exports.delete = async (options, connection) => {
    try {
      return await categoryModel.delete(options.idx, connection)
    }
    catch (e) {
      throw new Error(e)
    }
  }

  module.exports.getList = async (options) => {
    try {
      // console.log("getList")
      const results = await categoryModel.getList(options)
      return results
    }
    catch (e) {
      throw new Error(e)
    }
  }