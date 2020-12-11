'use strict'

const handler = require('./deal-handler')
const dealComDetsHandler = require('../dealCompositionDetail/dealCompositionDetail-handler')
const goodsHandler = require('../goods/goods-handler');
const supplierHandler = require('../supplier/supplier-handler');
const representativeCategoryHandler = require('../representative_category/representative_category-handler')
const cartHandler = require('../cart/cart-handler')
const productReviewHandler = require('../productReview/productReview-handler')
const goodsSortTypeHandler = require('../goodsSortType/goodsSortType-handler')
const exposedHandler = require('../exposed_category/exposed_category-handler');
const exposedCategoryDealHandler = require('../exposed_category_deal/exposed_category_deal-handler')
const db = require('../../../components/db')
const crypto = require('../../../components/crypto')
const util = require('../../../components/util')
const fake = require('../../../models/fake')
const { round } = require('lodash')


module.exports.register = async (req, res, next) => {
  const connection = await db.beginTransaction();
  try{
    const newDeal = req.options;
    console.log('newDeal: ', newDeal)

    newDeal.first_create_dt_time = util.getCurrentTime();
    const result = await handler.insert(newDeal, connection);
    await db.commit(connection);
    res.status(200).json(result);

  }catch(e){
    await db.rollback(connection);
    next(e);
  }
}


module.exports.update = async (req, res, next) => {
    const connection = await db.beginTransaction();
    try{
      let newDeal = req.options
      const deal = await handler.findOneByIdx(newDeal.deal_idx);
      console.log('deal:', deal);
      if(deal.length === 0){
        throw{ status: 404, errorMessage: 'Deal not found'};
      }
      newDeal.last_mod_dt_time = util.getCurrentTime();
      newDeal.deal_id = deal[0].deal_id;
      delete newDeal.deal_idx;

      const result = await handler.update(newDeal, connection);
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
      const result = await handler.delete({ idx: req.options.deal_idx }, connection);
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
      const options = req.options
      
      let aggregations = {}
      let result
      let pagenation
      const query = req.query

      const aggregationsFunc = async(options, values, column) => {
          const getsupplCode = await handler.subJoinGet({params: options, values: values, column: column, groupBy: 'suppl_code'})
          const getDealList = await handler.subJoinDealGet({params: options, values: values, column: column})
          //console.log("getPrices:", getPrices)
          //const resultTotal = await handler.subJoinGetTotal({params: options, values: values, column: column})
          pagenation = util.makePageData(getDealList.length, options.page, options.srch_cnt)
          //console.log("getPrices:",getPrices)
          //console.log("resultTotal:", resultTotal)

          const origPriceArray = getDealList.map(code => code.orig_price)
          const dealDiscPriceArray = getDealList.map(code => code.deal_disc_price)
          console.log("origPriceArray:", origPriceArray)
          console.log("dealDiscPriceArray:", dealDiscPriceArray)

          let price = []
          let k = 0
          for(let i=0; i<origPriceArray.length; i++){
            let tempPrice
            if(origPriceArray[i] !== null && dealDiscPriceArray[i] !== null){
              tempPrice = origPriceArray[i] - dealDiscPriceArray[i]
              k = k + 1
            }else if(origPriceArray[i] !== null && dealDiscPriceArray[i] === null){
              tempPrice = origPriceArray[i]
              k = k + 1
            }else if(origPriceArray[i] === null){
              tempPrice = 0
              k = k + 1
            }
            price.push(tempPrice)
          }
          console.log('price:', price)
          console.log('k:', k)
          let temAvr = (price.reduce((a,b) => a + b)) / k
          let temMax = Math.max.apply(null, price)
          let temMin = Math.min.apply(null, price)
          console.log("temAvr:", temAvr)
          console.log("temMax:", temMax)
          console.log("temMin:", temMin)

          // let temAvr = getDealList[0].avrPrice
          // let temMax = getDealList[0].maxPrice
          // let temMin = getDealList[0].minPrice
          let avr = round(temAvr/100) * 100
          let max = round(temMax/100) * 100
          let min = round(temMin/100) * 100
          let minSec = round((min+avr)/2) 
          let maxSec = round((max+avr)/2) 
          console.log("avr:", avr)
          console.log("max:", max)
          console.log("min:", min)
          console.log("minSec:", minSec)
          console.log("maxSec:", maxSec)
          
          const suppleCodes = getsupplCode.map(code => code.suppl_code)
          console.log('suppleCodes:' ,suppleCodes)
          const getSupplName = await supplierHandler.getList({suppl_id: suppleCodes})
          //console.log("getSupplName:", getSupplName)
          const supplBrandName = getSupplName.map(name => name.name)
          //console.log("supplBrandName:", supplBrandName)
          aggregations.Brand_Name = supplBrandName
          aggregations.priceRange={
            1:minSec,
            2:avr,
            3:maxSec,
            4:max
          }
          aggregations.dealList = getDealList
          //console.log("aggregations:", aggregations)
          //res.status(200).json({lists: aggregations, pagenation, query});
          return aggregations
      }

      if(options.exp_cat_idx){
        let expCategory1 = await exposedCategoryDealHandler.getList({exp_cat_idx : options.exp_cat_idx})
        if(expCategory1.length === 0){
          throw{ status: 404, errorMessage: "No exp_cat_idx found"};
        }
        let expCategory1CatIdxs = []
        for (let j=0;j<expCategory1.length;j++){
          expCategory1CatIdxs.push(expCategory1[j].deal_id)
        }
        result = await aggregationsFunc(options, expCategory1CatIdxs, 'goods_idx')
        
      } else if(options.suppl_code) {
        result = await aggregationsFunc(options, options.suppl_code, 'suppl_code')

      } else if(options.repr_cat_id){
        result = await aggregationsFunc(options, options.repr_cat_id, 'repr_cat_id')

      } else if(options.deal_idx){
        let dealResult = await handler.getList({deal_idx: options.deal_idx})
        if(dealResult.length === 0){
          throw{ status: 404, errorMessage: "No deal_idx found"};
        }
        let dealId = dealResult[0].deal_id

        result = await aggregationsFunc(options, dealId, 'goods_id')

      } else if(options.deal_id){
        let dealResult = await handler.getList({deal_id: options.deal_id})
        if(dealResult.length === 0){
          throw{ status: 404, errorMessage: "No deal_id found"};
        }
        let dealId = dealResult[0].deal_id
        console.log('dealResult : ',dealResult[0].dets_info)
        
        result = await aggregationsFunc(options, dealId, 'goods_id')

        console.log('deal_id:', options.deal_id)
        const getGoodsId = await dealComDetsHandler.getList({id: options.deal_id})
        console.log('getGoodsId:' ,getGoodsId)
        const goodsResult = await goodsHandler.getList({goods_id: getGoodsId[0].goods_id})
        console.log('goodsResult:', goodsResult)
        const supplierResult = await supplierHandler.getList({suppl_id: goodsResult[0].suppl_code})
        console.log('suppl_code:', goodsResult[0].suppl_code)
        result.suppliers = supplierResult

      }else if(options.rating || options.brand_name_array || options.minPrice || options.maxPrice || options.ac_tgt_goods_or_not || options.free_deliv_or_not){
        let ratingGoodsIds = []
        if(options.rating){
          let productReviewResult = await productReviewHandler.getList({rating: options.rating})
          console.log("productReviewResult:", productReviewResult)
          if(productReviewResult.length === 0){
            throw{ status: 404, errorMessage: "No rating result under these conditions"};
          }
          let tempRatingGoodsIds = productReviewResult.map(pro => pro.goods_id)
          ratingGoodsIds.push(tempRatingGoodsIds)
        }

        let brandGoodsIds = []
        if(options.brand_name_array){
          let supplierResult = await supplierHandler.getList({name: options.brand_name_array})
          if(supplierResult.length === 0){
            throw{ status: 404, errorMessage: "No brand name result under these conditions"};
          }
          console.log('supplierResult:', supplierResult)
          let supplIds = supplierResult.map(suppl => suppl.suppl_id)
          let getGoodsIds = await goodsHandler.getList({suppl_code: supplIds})
          //console.log('getGoodsIds:', getGoodsIds)
          let tempBrandGoodsIds = getGoodsIds.map(good => good.goods_id)
          if(getGoodsIds.length === 0){
            throw{ status: 404, errorMessage: "No goods with this suppl_code under these conditions"};
          }
          // console.log("tempBrandGoodsIds:", tempBrandGoodsIds)
          brandGoodsIds.push(tempBrandGoodsIds)
        }
        // console.log("ratingGoodsIds:", ratingGoodsIds)
        // console.log("brandGoodsIds:", brandGoodsIds)
        
        let goodsIdArray = []
        if(ratingGoodsIds.length !== 0 && brandGoodsIds.length !== 0){
          for(let i=0; i<ratingGoodsIds[0].length; i++){
            for(let k=0; k<brandGoodsIds[0].length; k++){
              if(ratingGoodsIds[0][i] === brandGoodsIds[0][k]){
                 goodsIdArray.push(brandGoodsIds[0][k])
              }
            }
          }
        }
        if(ratingGoodsIds.length !==0 && brandGoodsIds.length === 0){
            goodsIdArray.push(ratingGoodsIds[0])
        }
        if(ratingGoodsIds.length === 0 && brandGoodsIds.length !== 0){
            console.log('eeeeeeee')
            goodsIdArray.push(brandGoodsIds[0])
        }
        if(ratingGoodsIds.length === 0 && brandGoodsIds.length === 0){
            goodsIdArray = []
        }
        if(goodsIdArray.length === 0 && !((options.minPrice || options.maxPrice) || options.ac_tgt_goods_or_not || options.free_deliv_or_not)){
          throw{ status: 404, errorMessage: "No result under these conditions"};
        }
        
        let dealIdArray = []
        if(options.minPrice || options.maxPrice || options.ac_tgt_goods_or_not || options.free_deliv_or_not){
          // if(options.minPrice && options.maxPrice){
          //   options.mark = 'aftercare'
          //   result = await aggregationsFunc(options)
          //   dealIdArray.push(result)
          // }

            console.log('aftercare')
            options.mark = 'aftercare'
            result = await aggregationsFunc(options)
            dealIdArray.push(result)

        }
        console.log("goodsIdArray:", goodsIdArray)
        console.log("dealIdArray:", dealIdArray)

        let dealIds = []
        if(goodsIdArray.length !== 0 && dealIdArray.length !== 0){
          for(let i=0; i<goodsIdArray[0].length; i++){
            for(let k=0; k<dealIdArray[0].length; k++){
              if(goodsIdArray[0][i] === dealIdArray[0][k]){
                dealIds.push(dealIdArray[0][k])
              }
            }
          }
        }else{
          if(goodsIdArray.length !==0 && dealIdArray.length === 0){
            dealIds.push(goodsIdArray[0])
          }else if(goodsIdArray.length === 0 && dealIdArray.length !== 0){
            dealIds.push(dealIdArray[0])
          }else if(goodsIdArray.length === 0 && dealIdArray.length === 0){
            dealIds = []
          }
        }
        console.log("dealIds:", dealIds)
        dealIds[0][0]? dealIds = dealIds[0]: dealIds

        if(dealIds.length !== 0 && !dealIds[0].priceRange){
          result = await aggregationsFunc(options, dealIds, 'goods_id')
        }else if(dealIds[0].priceRange){
          return res.status(200).json({lists: result, pagenation, query});
        }
        else{
          throw{ status: 404, errorMessage: "No result under these conditions"};
        }

      }else if(query.srch_category){
        //let reprCatIdResult = await representativeCategoryHandler.getList()
        //let randomReprCatId = Math.floor(Math.random() * reprCatIdResult.length) + 1;
        
        let label = query.srch_category
        let randomResult = []
        let randomReprCatId = [116, 209, 600, 605, 215, 268]
        let totalList = []

        if(label === '늘 사던 것'){
          let catList = []
          for(let i=0; i<1; i++){
            let reprCatId = randomReprCatId[Math.floor(Math.random() * randomReprCatId.length)];
            console.log('reprCatId:', reprCatId)            
            let result = await handler.joinGet({params: options, reprCatId})
            //console.log('result:', result)
            let resultTotal = await handler.joinGetTotal({params: options, reprCatId})
            pagenation = util.makePageData(resultTotal.length, options.page, options.srch_cnt)
            
            totalList.push(result)
          }

          randomResult.push({name: '전체리스트',totalList})
          //randomResult.push(catList)

          console.log('randomResult:', randomResult)

        }else if(label === '모든 사람들의 늘 사던 것'){
          let alwaysBuyGoodsIds = []
          for(let i=11; i<21; i++){
              let alwaysBuy = await handler.getList({deal_idx: i})
              
              alwaysBuyGoodsIds.push(alwaysBuy[0].deal_id)
          }

          let alwaysBuyGoods = await handler.multipleGetAll({ids: alwaysBuyGoodsIds, params: options})
          let alwaysBuyGoodsTotal = await handler.multipleGetAllTotal({ids: alwaysBuyGoodsIds})
          let goods = await goodsHandler.multipleGetAll(alwaysBuyGoodsIds)
          pagenation = util.makePageData(alwaysBuyGoodsTotal, options.page, options.srch_cnt)
          for(let j=0; j<alwaysBuyGoods.length; j++){
              // alwaysBuyGoods[j].orig_price = goods[j].orig_price
              alwaysBuyGoods[j].stock_qty = goods[j].stock_qty
              // alwaysBuyGoods[j].deal_disc_price = goods[j].deal_disc_price
          }
          randomResult.push({name: '전체리스트', alwaysBuyGoods})
        }else{
          let reprCatId = randomReprCatId[Math.floor(Math.random() * randomReprCatId.length)];
          console.log('reprCatId:', reprCatId)            
          let result = await handler.joinGet({params: options, reprCatId})
          //console.log('result:', result)
          let resultTotal = await handler.joinGetTotal({params: options, reprCatId})
          pagenation = util.makePageData(resultTotal.length, options.page, options.srch_cnt)

          totalList.push(result)
          randomResult.push({name: '전체리스트',totalList})
        } 
        let object = {
          name : label,
          list : randomResult
        }
        result = object

      }else {
        let randomReprCatId = [116, 209, 600, 605, 215, 268]
        let reprCatId = randomReprCatId[Math.floor(Math.random() * randomReprCatId.length)];
        console.log('reprCatId11:', reprCatId)         
        result = await handler.joinGet({params: options, reprCatId})
        const resultTotal = await handler.joinGetTotal({params: options, reprCatId})
        pagenation = util.makePageData(resultTotal, options.page, options.srch_cnt)        
      }

      res.status(200).json({lists: result, pagenation, query});
      
    }catch(e){
      console.error(e)
      next(e);
    }
  }

module.exports.getReprCatList = async (req, res, next) => {
  try{
    //let label = query.srch_category
    //let randomResult = []
    let randomReprCatId = [116, 209, 600, 605, 215, 268]
    // let randomExpCatId = [1001, 1002, 1003]
    // let indexOfRandom = Math.floor(Math.random() * randomReprCatId.length)
    // let expCatId = randomReprCatId[indexOfRandom];
    // const getDealId = await exposedCategoryDealHandler.multipleGetDealId(expCatId)
    
    
    let categories = []
    for(let i=0; i<3; i++){
      let indexOfRandom = Math.floor(Math.random() * randomReprCatId.length)
      let reprCatId = randomReprCatId[indexOfRandom];
      randomReprCatId.splice(indexOfRandom, 1)
      console.log('reprCatId:', reprCatId)
      let tempObj = {}            
      
      let reprCatIdResult = await representativeCategoryHandler.getList({cat_id: reprCatId})
      console.log('reprCatIdResult:' , reprCatIdResult)

      tempObj.name = reprCatIdResult[0].cat_name
      tempObj.repr_cat_id = reprCatIdResult[0].cat_id
      categories.push(tempObj)
      //totalList.push(result)
    }
    res.status(200).json({ categories })

  }catch(err){
    console.error(err)
    next(err)
  }
}
  
module.exports.addViewCnt = async (req, res, next) => {
  try{
    const params = req.options
    console.log('params:', params)
    let view_count_number

    let result = await handler.getList(params)
    if(result.length === 0){
      throw new Error("Not found Deal")
    }
    console.log('result:', result)
    if(result[0].view_cnt !== null){
      result[0].view_cnt = result[0].view_cnt + 1
      view_count_number = result[0].view_cnt
      const addViewCountResult = await handler.addViewCnt(result[0])
    }else{
      console.log("ViewCnt is null")
      result[0].view_cnt = 1
      view_count_number = 1
      const addViewCountResult = await handler.addViewCnt(result[0])
    }
    
    res.status(200).json({view_count_number: view_count_number})
  }catch(err){
    console.error(err);
    next(err);
  }
}