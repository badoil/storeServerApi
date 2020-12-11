'use strict'

const pointModel = require('../../../models/point')


module.exports.insert = async (options, connection) => {
  try{
    return await pointModel.insert(options, connection)
  }
  catch (e) {
    throw new Error(e)
  }
}


module.exports.getList = async (options) => {
    try{
      console.log("getList")
      const results =  await pointModel.getList(options)
      return results.map(result => {
        delete result.password
        return result
      })      
    }
    catch (e) {
      throw new Error(e)
    }
}

module.exports.getListByIdx = async (options, connection) => {
  try{
    return await pointModel.getListByIdx(options, connection)
  }
  catch (e) {
    throw new Error(e)
  }
}

  