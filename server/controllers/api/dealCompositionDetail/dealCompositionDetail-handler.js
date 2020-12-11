'use strict'

const dealModel = require('../../../models/dealCompositionDetail')


module.exports.findOneById = async (id) => {
  try{
    return await dealModel.findOneById(id);
  }catch(e){
    throw new Error(e);
  }
}

module.exports.insert = async (options, connection) => {
  try {
    return await dealModel.insert(options, connection)
  }
  catch (e) {
    throw new Error(e)
  }
}

module.exports.update = async (options, connection) => {
  try {
    return await dealModel.update(options, connection)
  }
  catch (e) {
    throw new Error(e)
    console.log(e)
  }
}

module.exports.delete = async (options, connection) => {
  try {
    return await dealModel.delete(options.id, connection)
  }
  catch (e) {
    throw new Error(e)
  }
}

module.exports.getList = async (options) => {
  try {
    // console.log("getList")
    const results = await dealModel.getList(options.id)
    return results
  }
  catch (e) {
    throw new Error(e)
  }
}


module.exports.getListWithGoodId = async (options) => {
  try {
    // console.log("getList")
    const results = await dealModel.getListWithGoodId(options.id)
    return results
  }
  catch (e) {
    throw new Error(e)
  }
}


module.exports.multipleGetAll = async (options) => {
  try{
    return await dealModel.multipleGetAll(options);
  }catch(e){
    throw new Error(e);
  }
}