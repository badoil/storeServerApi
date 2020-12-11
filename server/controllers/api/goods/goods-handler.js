'use strict'

const goodModel = require('../../../models/goods')


module.exports.findOneByGoods = async (goodsName) => {
  try {
    console.log('goodsTitle:', goodsName);
    return await goodModel.findOneByGoods(goodsName)
  }
  catch (e) {
    throw new Error(e)
  }
}

module.exports.findOneById = async (id) => {
  try{
    return await goodModel.findOneById(id);
  }catch(e){
    throw new Error(e);
  }
}

module.exports.insert = async (options, connection) => {
  try {
    return await goodModel.insert(options, connection)
  }
  catch (e) {
    throw new Error(e)
  }
}

module.exports.update = async (options, connection) => {
  try {
    return await goodModel.update(options, connection)
  }
  catch (e) {
    throw new Error(e)
    console.log(e)
  }
}

module.exports.delete = async (options, connection) => {
  try {
    return await goodModel.delete(options.id, connection)
  }
  catch (e) {
    throw new Error(e)
  }
}

module.exports.getList = async (options) => {
  try {
    // console.log("getList")
    const results = await goodModel.getList(options)
    return results
  }
  catch (e) {
    throw new Error(e)
  }
}

module.exports.getListTotal = async (options) => {
  try {
    // console.log("getList")
    const results = await goodModel.getListTotal(options)
    return results.length
  }
  catch (e) {
    throw new Error(e)
  }
}

module.exports.multipleGetAll = async (options) => {
  try{
    return await goodModel.multipleGetAll(options);
  }catch(e){
    throw new Error(e);
  }
}

module.exports.multipleGetAllTotal = async (options) => {
  try{
    const results = await goodModel.multipleGetAllTotal(options);
    return results.length
  }catch(e){
    throw new Error(e);
  }
}

module.exports.multipleGetWithSupplCode = async (options) => {
  try{
    return await goodModel.multipleGetWithSupplCode(options);
  }catch(e){
    throw new Error(e);
  }
}