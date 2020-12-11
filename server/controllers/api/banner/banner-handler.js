'use strict'

const bannerModel = require('../../../models/banners')


module.exports.findOneByIdx = async (idx) => {
  try{
    return await bannerModel.findOneByIdx(idx);
  }catch(e){
    throw new Error(e);
  }
}

module.exports.insert = async (options, connection) => {
  try {
    return await bannerModel.insert(options, connection)
  }
  catch (e) {
    throw new Error(e)
  }
}

module.exports.update = async (options, connection) => {
  try {
    return await bannerModel.update(options, connection)
  }
  catch (e) {
    // throw new Error(e)
    console.log(e)
  }
}

module.exports.delete = async (options, connection) => {
  try {
    return await bannerModel.delete(options.idx, connection)
  }
  catch (e) {
    throw new Error(e)
  }
}

module.exports.getList = async (options) => {
  try {
    // console.log("getList")
    const results = await bannerModel.getList(options)
    return results
  }
  catch (e) {
    throw new Error(e)
  }
}