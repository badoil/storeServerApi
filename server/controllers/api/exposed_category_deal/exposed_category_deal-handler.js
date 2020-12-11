'use strict'

const model = require('../../../models/exposed-category-deal')


module.exports.multipleGet = async (options) => {
  try{
    return await model.multipleGet(options);
  }catch(e){
    throw new Error(e);
  }
}


module.exports.getList = async (options) => {
  try {
    const results = await model.getList(options)
    return results
  }
  catch (e) {
    throw new Error(e)
  }
}


module.exports.multipleGetDealId = async (options) => {
  try {
    const results = await model.multipleGetDealId(options)
    return results
  }
  catch (e) {
    throw new Error(e)
  }
}



module.exports.getListExpCatIds = async (options) => {
  try {
    const results = await model.getListExpCatIds(options)
    return results
  }
  catch (e) {
    throw new Error(e)
  }
}
