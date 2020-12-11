'use strict'

const brandsModel = require('../../../models/brandsFake')


module.exports.findOneByName = async (name) => {
  try{
    return await brandsModel.findOneByName(name);
  }catch(e){
    throw new Error(e);
  }
}

module.exports.insert = async (options, connection) => {
  try {
    return await brandsModel.insert(options, connection)
  }
  catch (e) {
      console.error(e);
    throw new Error(e)
  }
}

module.exports.update = async (options, connection) => {
    try {
      return await brandsModel.update(options, connection)
    }
    catch (e) {
      throw new Error(e)
      console.log(e)
    }
  }
  
  module.exports.delete = async (options, connection) => {
    try {
      return await brandsModel.delete(options.id, connection)
    }
    catch (e) {
      throw new Error(e)
    }
  }

  module.exports.getList = async (options) => {
    try {
      // console.log("getList")
      const results = await brandsModel.getList()
      return results
    }
    catch (e) {
      throw new Error(e)
    }
  }