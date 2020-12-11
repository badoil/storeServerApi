'use strict'

const dealModel = require('../../../../models/v2/deal')


module.exports.findOneByIdx = async (idx) => {
  try{
    return await dealModel.findOneByIdx(idx);
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

module.exports.multipleInsert = async (options, connection) => {
  try{
    return await dealModel.multipleInsert(options, connection);
  }catch(e){
    throw new Error(e);
  }
}

module.exports.multipleInsertTest = async (options, connection) => {
  try{
    return await dealModel.multipleInsertTest(options, connection);
  }catch(e){
    throw new Error(e);
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

module.exports.updateRandomHotDeal = async (options, connection) => {
  try {
    return await dealModel.updateRandomHotDeal(options, connection)
  }
  catch (e) {
    throw new Error(e)
    console.log(e)
  }
}

module.exports.updateRandomAcDeal = async (options, connection) => {
  try {
    return await dealModel.updateRandomAcDeal(options, connection)
  }
  catch (e) {
    throw new Error(e)
    console.log(e)
  }
}

module.exports.multipleUpdate = async (options, connection) => {
  try {
    return await dealModel.multipleUpdate(options, connection)
  }
  catch (e) {
    throw new Error(e)
    console.log(e)
  }
}

module.exports.multipleInsertUpdate = async (options, connection) => {
  try {
    return await dealModel.multipleInsertUpdate(options, connection)
  }
  catch (e) {
    throw new Error(e)
    console.log(e)
  }
}

module.exports.delete = async (options, connection) => {
  try {
    return await dealModel.delete(options.idx, connection)
  }
  catch (e) {
    throw new Error(e)
  }
}
  
module.exports.multipleDelete = async (options, connection) => {
  try {
    return await dealModel.multipleDelete(options, connection)
  }
  catch (e) {
    throw new Error(e)
  }
}

module.exports.getList = async (options) => {
  try {
    // console.log("getList")
    const results = await dealModel.getList(options)
    return results
  }
  catch (e) {
    throw new Error(e)
  }
}

module.exports.getListTotal = async (options) => {
  try {
    // console.log("getList")
    const results = await dealModel.getList(options)
    return results.length
  }
  catch (e) {
    throw new Error(e)
  }
}

module.exports.multipleGet = async (options) => {
  try{
    return await dealModel.multipleGet(options);
  }catch(e){
    throw new Error(e);
  }
}

module.exports.multipleGetDeal = async (options) => {
  try{
    return await dealModel.multipleGetDeal(options);
  }catch(e){
    throw new Error(e);
  }
}

module.exports.multipleGetAll = async (options) => {
  try{
    return await dealModel.multipleGetAll(options);
  }catch(e){
    throw new Error(e);
  }
}

module.exports.multipleGetAllTotal = async (options) => {
  try{
    const results = await dealModel.multipleGetAllTotal(options);
    return results.length
  }catch(e){
    throw new Error(e);
  }
}

module.exports.multipleCategoryUpdate = async (options) => {
  try{
    return await dealModel.multipleCategoryUpdate(options);
  }catch(e){
    throw new Error(e);
  }
}

module.exports.joinGet = async (options) => {
  try{
    return await dealModel.joinGet(options);
  }catch(e){
    throw new Error(e);
  }
}

module.exports.joinGetTotal = async (options) => {
  try{
    const results = await dealModel.joinGetTotal(options);
    return results
  }catch(e){
    throw new Error(e);
  }
}

module.exports.subJoinGet = async (options) => {
  try{
    return await dealModel.subJoinGet(options);
  }catch(e){
    throw new Error(e);
  }
}

module.exports.subJoinDealGet = async (options) => {
  try{
    return await dealModel.subJoinDealGet(options);
  }catch(e){
    throw new Error(e);
  }
}

module.exports.subJoinGetTotal = async (options) => {
  try{
    const results = await dealModel.subJoinGetTotal(options);
    return results
  }catch(e){
    throw new Error(e);
  }
}

module.exports.expIdJoinGet = async (options) => {
  try{
    return await dealModel.expIdJoinGet(options);
  }catch(e){
    throw new Error(e);
  }
}

module.exports.expIdJoinGetTotal = async (options) => {
  try{
    const results = await dealModel.expIdJoinGetTotal(options);
    return results.length
  }catch(e){
    throw new Error(e);
  }
}

module.exports.joinGetList = async (options) => {
  try{
    return await dealModel.joinGetList(options);
  }catch(e){
    throw new Error(e);
  }
}

module.exports.joinGetForOrder = async (options) => {
  try{
    return await dealModel.joinGetForOrder(options);
  }catch(e){
    throw new Error(e);
  }
}

module.exports.addViewCnt = async (options) => {
  try{
    return await dealModel.addViewCnt(options);
  }catch(e){
    throw new Error(e);
  }
}

module.exports.getPrice = async (options) => {
  try{
    return await dealModel.getPrice(options);
  }catch(e){
    throw new Error(e);
  }
}

module.exports.getMinMaxPrice = async (options) => {
  try{
    return await dealModel.getMinMaxPrice(options);
  }catch(e){
    throw new Error(e);
  }
}

module.exports.getSearch = async (options) => {
  try{
    return await dealModel.getSearch(options);
  }catch(e){
    throw new Error(e);
  }
}
