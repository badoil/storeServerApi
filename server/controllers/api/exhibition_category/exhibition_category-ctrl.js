'use strict'

const handler = require('./exhibition_category-handler')
const dealHandler = require('../deal/deal-handler');
const exhibitCategoryDealHandler = require('../exhibition_category_deal/exhibition_category_deal-handler')
const exhibitionCategoryDealModel = require('../../../models/exhibition-category-deal');
const dealModelV2 = require('../../../models/v2/deal');
const db = require('../../../components/db')
const crypto = require('../../../components/crypto')
const util = require('../../../components/util')
const fake = require('../../../models/fake')


module.exports.register = async (req, res, next) => {
  const connection = await db.beginTransaction();
  try{
    const mainExhib = req.options;
    let dealIdArray = mainExhib.deal_id_array
    let dealIds = dealIdArray.map(deal => deal.deal_id)
    console.log("dealIds:", dealIds)
    // let exhibCatDealIdxArray = mainExhib.exhib_cat_deal_idx_array
    // let exhibCatDealIdxs = exhibCatDealIdxArray.map(deal => deal.exhib_cat_deal_idx)
    // console.log("exhibCatDealIdxs:", exhibCatDealIdxs)

    mainExhib.first_create_dt_time = util.getCurrentTime()
    delete mainExhib.deal_id_array
    //delete mainExhib.exhib_cat_deal_idx_array
    console.log("mainExhib:", mainExhib)
    const result = await handler.insert(mainExhib, connection)
    console.log("result:", result)

    let exhibitCatDeal = []
    for(let i=0; i<dealIdArray.length; i++){
      let tempExhibitCatDeal = []

      //let exhibCatDealIdx = exhibCatDealIdxs[i]
      let exhibId = result.insertId
      let dealId = dealIds[i]
      let createTime = util.getCurrentTime()

      //tempExhibitCatDeal.push(exhibCatDealIdx)
      tempExhibitCatDeal.push(exhibId)
      tempExhibitCatDeal.push(dealId)
      tempExhibitCatDeal.push(createTime)

      exhibitCatDeal.push(tempExhibitCatDeal)
      
    }
    console.log('exhibitCatDeal:', exhibitCatDeal)
    const exhibitCatDealResult = await exhibitCategoryDealHandler.multipleInsert(exhibitCatDeal, connection)
    
    await db.commit(connection);
    res.status(200).json({result: true});

  }catch(e){
    await db.rollback(connection);
    next(e);
  }
}


module.exports.update = async (req, res, next) => {
    const connection = await db.beginTransaction();
    try{
      let mainExhibition = req.options;
      console.log('hotDeal:', mainExhibition);
      const mainExhibitionResult = await handler.findOneByIdx(mainExhibition.exhib_idx);
      if(mainExhibitionResult.length === 0){
        throw{ status: 404, errorMessage: 'hotDeal not found'};
      }
      mainExhibition.last_mod_dt_time = util.getCurrentTime();
      mainExhibition.exhib_id = mainExhibitionResult[0].exhib_id;
      delete mainExhibition.exhib_idx

      const result = await handler.update(mainExhibition, connection);
      console.log('updateResult: ', result.affectedRows);
      if(result.affectedRows === 0){
        throw{ status: 404, errorMessage: "updating failed"};
      }
      await db.commit(connection);
      res.status(200).json({ result: true });
  
    }catch(e){
      await db.rollback(connection);
      next(e);
    }
  }
  
module.exports.delete = async (req, res, next) => {
  const connection = await db.beginTransaction();
  try{
    console.log('deleteId:', req.options)
    const result = await handler.delete({ idx: req.options.exhib_idx }, connection);
    console.log('deleteResult:', result);
    let returnValue = false;
    if(result.affectedRows === 1){
      returnValue = true
    }
    await db.commit(connection);
    res.status(200).json({ result: returnValue });
  }catch(e){
    await db.rollback(connection);
    next(e);
  }
}

module.exports.getList = async(req, res, next) => {
  try{
    const params = req.options
    console.log('params:', params)
    params.expire_dt_time = util.getCurrentTime()
    const result = await handler.getList(params);
    //const updateResult = await handler.update()
    
    return res.status(200).json({lists: result});
    
  }catch(e){
    console.error(e)
    next(e);
  }
}

module.exports.event = async(req, res, next ) => {
  try{
    const params = req.options;

    let result = await handler.getList({exhib_classif_code:2});
    console.log("result:", result)

    for(let i=0;i<result.length;i++){
      const getDealIds = await exhibitionCategoryDealModel.getList({exhib_id:result[i].exhib_id})
      console.log('getDealIds : ',getDealIds)
      const dealIdArray = getDealIds.map(item => item.deal_id)
      console.log('dealIdArray : ',dealIdArray)
      const deals = await dealModelV2.multipleGetDeal(dealIdArray)
      console.log('deals : ',deals)
      result[i].deals = deals
    }

    res.status(200).json(result);

  }catch(err){
    console.error(err);
    next(err);
  }
}

module.exports.eventDetail = async(req, res, next ) => {
  try{
    const params = req.options;

    const result = await handler.findOneById(params.exhib_id)
    
    const exhibDealResult = await exhibitCategoryDealHandler.getList({exhib_id: params.exhib_id})
    const deal_id = exhibDealResult.map(item => item.deal_id);
    const dealResult = await dealHandler.multipleGetDeal(deal_id);

    result[0].deals = dealResult
    res.status(200).json({result});

  }catch(err){
    console.error(err);
    next(err);
  }
}



module.exports.insertFakeData = async (req, res, next) => {
  const connection = await db.beginTransaction();
  try{
//         exhib_name,
//     exhib_overview,
//   exhib_banner_img,
//     exhib_horiz_img,
//     exhib_vert_img,
//       exhib_sq_img,
// exhib_dets_info_img,
//   exhib_thema_color,
//           exhib_tag,
//   banner_exp_or_not,
// main_page_exp_or_not,
//     valid_start_dt,
//       valid_end_dt,
// repr_goods_compo_list,
// exhib_compo_goods_list,                                    
// first_create_dt_time
    let fakeData = [
      ['어헤즈 스파클링샴푸 화이트 출시기념 할인', '3만원 이상 구매시 증정','','',
      'https://onnuristorage.s3.ap-northeast-2.amazonaws.com/images/kihwek/ad-1.png','','','#ecad57','인기템|한예슬잇템|인기템|다이어트',
      'N','Y','','','5980|7540|5900|17988|3123|18181','',util.getCurrentTime()],
      ['어헤즈 스파클링샴푸 화이트 출시기념 할인', '3만원 이상 구매시 증정','','',
      'https://onnuristorage.s3.ap-northeast-2.amazonaws.com/images/kihwek/ad-2.png','','','#9c74be','인기템|한예슬잇템|인기템|다이어트',
      'N','Y','','','7571|835|12125|4356|11606|9815','',util.getCurrentTime()],
      ['어헤즈 스파클링샴푸 화이트 출시기념 할인', '3만원 이상 구매시 증정','','',
      'https://onnuristorage.s3.ap-northeast-2.amazonaws.com/images/kihwek/ad-3.png','','','#a35d39','인기템|한예슬잇템|인기템|다이어트',
      'N','Y','','','17763|17882|7309|10108|4223|4243','',util.getCurrentTime()],
      ['어헤즈 스파클링샴푸 화이트 출시기념 할인', '3만원 이상 구매시 증정','','',
      'https://onnuristorage.s3.ap-northeast-2.amazonaws.com/images/kihwek/ad-4.png','','','#0060a4','인기템|한예슬잇템|인기템|다이어트',
      'N','Y','','','12394|1935|8035|3394|7925|18513','',util.getCurrentTime()],
      ['어헤즈 스파클링샴푸 화이트 출시기념 할인', '3만원 이상 구매시 증정','','',
      'https://onnuristorage.s3.ap-northeast-2.amazonaws.com/images/kihwek/ad-5.png','','','#277e6f','인기템|한예슬잇템|인기템|다이어트',
      'N','Y','','','15462|12550|3328|11949|16411|7986','',util.getCurrentTime()]

    ]

    const result = await handler.multiInsert(fakeData, connection);
    await db.commit(connection);
    res.status(200).json(result);

  }catch(e){
    await db.rollback(connection);
    next(e);
  }
}
