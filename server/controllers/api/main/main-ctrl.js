const exposedHandler = require('../exposed_category/exposed_category-handler');
const exhibitionHandler = require('../exhibition_category/exhibition_category-handler')
const dealHandler = require('../deal/deal-handler')
const exposedCategoryDealHandler = require('../exposed_category_deal/exposed_category_deal-handler')
const exhibitionDealHandler = require('../exhibition_category_deal/exhibition_category_deal-handler')
const dealCompoisteDetailsHanlder = require('../dealCompositionDetail/dealCompositionDetail-handler')
const supplierHandler = require('../supplier/supplier-handler')
const goodHandler = require('../goods/goods-handler')
const db = require('../../../components/db')
const util = require('../../../components/util')

module.exports.getExpBannerList = async (req, res, next) => {
  try{
      let exhibitionResult = await exhibitionHandler.getExpBannerList()
      // console.log('exhibitionResult : ',exhibitionResult.length)
      
      res.status(200).json({result: exhibitionResult})
  }catch(err){
    console.log('err: ',err)
      next(err)
  }
}

module.exports.getTodayHotDealList = async (req, res, next) => {
  try{
      // let todayHotDealIds = [4224, 4225, 4226,
      //   4227, 4229, 4230,
      //   7637, 2569, 2570,
      //   4231]
      let todayHotDealIds = []
      for(let i=1; i<11; i++){
        let hot_deal_or_not = 'Y'
        let hot_deal_expr_ts = util.getCurrentTime()
        
        let dealYResult = await dealHandler.getList({deal_idx: i})
         
        todayHotDealIds.push(dealYResult[0].deal_id)
      }
      // console.log('todayHotDealIds : ',todayHotDealIds)

      let todayHotDeal = await dealHandler.multipleGetAll(todayHotDealIds)
      let goods = await goodHandler.multipleGetAll(todayHotDealIds)
      for(let j=0; j<todayHotDeal.length; j++){
        // todayHotDeal[j].orig_price = goods[j].orig_price
        todayHotDeal[j].stock_qty = goods[j].stock_qty
        // todayHotDeal[j].deal_disc_price = goods[j].deal_disc_price
      }
      res.status(200).json({result: todayHotDeal})
  }catch(err){
    console.log('err: ',err)
      next(err)
  }
}

module.exports.getAlwaysBuyGoodsList = async (req, res, next) => {
  try{
      // let alwaysBuyGoodsIds = [4224, 4225, 4226,
      //   4227, 4229, 4230,
      //   7637, 2569, 2570,
      //   4231]
      let alwaysBuyGoodsIds = []
      for(let i=11; i<21; i++){
          let alwaysBuy = await dealHandler.getList({deal_idx: i})
          
          alwaysBuyGoodsIds.push(alwaysBuy[0].deal_id)
      }

      let alwaysBuyGoods = await dealHandler.multipleGetAll(alwaysBuyGoodsIds)
      goods = await goodHandler.multipleGetAll(alwaysBuyGoodsIds)
      for(let j=0; j<alwaysBuyGoods.length; j++){
          // alwaysBuyGoods[j].orig_price = goods[j].orig_price
          alwaysBuyGoods[j].stock_qty = goods[j].stock_qty
          // alwaysBuyGoods[j].deal_disc_price = goods[j].deal_disc_price
      }
      
      res.status(200).json({result: alwaysBuyGoods})
  }catch(err){
    console.log('err: ',err)
      next(err)
  }
}

module.exports.getAfterCareGoodsList = async (req, res, next) => {
  try{
      // let afterCareGoodsIds = [4224, 4225, 4226,
      //   4227, 4229, 4230,
      //   7637, 2569, 2570,
      //   4231]
      let afterCareGoodsIds = []
    for(let i=21; i<31; i++){
      
      let ac_tgt_goods_or_not = 'Y'

      let dealYResult = await dealHandler.getList({deal_idx: i})
   
      afterCareGoodsIds.push(dealYResult[0].deal_id)
    }

    let afterCareGoods = await dealHandler.multipleGetAll(afterCareGoodsIds)
    goods = await goodHandler.multipleGetAll(afterCareGoodsIds)
    for(let j=0; j<afterCareGoods.length; j++){
      // afterCareGoods[j].orig_price = goods[j].orig_price
      afterCareGoods[j].stock_qty = goods[j].stock_qty
      // afterCareGoods[j].deal_disc_price = goods[j].deal_disc_price
    }
    // console.log('afterCareGoods : ',afterCareGoods)  
    res.status(200).json({result: afterCareGoods})
  }catch(err){
    console.log('err: ',err)
      next(err)
  }
}

module.exports.getNowTopGoodsList = async (req, res, next) => {
  try{
      let nowTopGoodsIds = []
      for(let i=31; i<34; i++){
          let nowTop = await dealHandler.getList({deal_idx: i})
          // let dealCompoisteDetail = await dealCompoisteDetailsHanlder.getList({id:nowTop[0].deal_id})
          // const goodId = dealCompoisteDetail[0].goods_id
          // let good = await goodHandler.getList({goods_id: goodId})
          // nowTop[0].orig_price = good[0].orig_price
          // nowTop[0].stock_qty = good[0].stock_qty
      
          nowTopGoodsIds.push(nowTop[0].deal_id)
      }

      let nowTopGoods = await dealHandler.multipleGetAll(nowTopGoodsIds)
      goods = await goodHandler.multipleGetAll(nowTopGoodsIds)
      for(let j=0; j<nowTopGoods.length; j++){
          // nowTopGoods[j].orig_price = goods[j].orig_price
          nowTopGoods[j].stock_qty = goods[j].stock_qty
          // nowTopGoods[j].deal_disc_price = goods[j].deal_disc_price
      }
      
      res.status(200).json({result: nowTopGoods})
  }catch(err){
    console.log('err: ',err)
      next(err)
  }
}

module.exports.getWeeklyGoodsList = async (req, res, next) => {
  try{
      let weeklyGoodsIds = []
      for(let i=34; i<44; i++){
          let weeklyGoodsResult = await dealHandler.getList({deal_idx: i})
      
          weeklyGoodsIds.push(weeklyGoodsResult[0].deal_id)
      }

      let weeklyGoods = await dealHandler.multipleGetAll(weeklyGoodsIds)
      goods = await goodHandler.multipleGetAll(weeklyGoodsIds)
      for(let j=0; j<weeklyGoods.length; j++){
          // weeklyGoods[j].orig_price = goods[j].orig_price
          weeklyGoods[j].stock_qty = goods[j].stock_qty
          // weeklyGoods[j].deal_disc_price = goods[j].deal_disc_price
      }
      
      res.status(200).json({result: weeklyGoods})
  }catch(err){
    console.log('err: ',err)
      next(err)
  }
}

module.exports.getExposedCategoriesList = async (req, res, next) => {
  try{
    let exposedCategoryList = await exposedHandler.getMainList()
    console.log('exposedCategoryList1:', exposedCategoryList)
    let itemNumber  = []
    let exposedCategories = []
    let exposedCategoryCatIds = exposedCategoryList.map(a => a.exp_cat_id);
    // console.log('exposedCategoryCatIds : ',exposedCategoryCatIds)
    let exposedCategoryDealIds = await exposedCategoryDealHandler.multipleGet(exposedCategoryCatIds)
    // console.log('exposedCategoryDealIds : ',exposedCategoryDealIds)
    for(let j=0;j<exposedCategoryCatIds.length;j++){
      exposedCategoryList[j].dealIds = []
      for(let i=0;i<exposedCategoryDealIds.length;i++){
        if(exposedCategoryCatIds[j] == exposedCategoryDealIds[i].exp_cat_id){
          exposedCategoryList[j].dealIds.push(exposedCategoryDealIds[i].deal_id)
        }
      }
    }
    console.log('exposedCategoryList2:', exposedCategoryList)

    for(let i=0;i<exposedCategoryList.length;i++){
      if(exposedCategoryList[i].dealIds.length !== 0){
        let expCategoryDeal = await dealHandler.joinGet({params: {}, values: exposedCategoryList[i].dealIds, column: 'goods_id'})
        let label = exposedCategoryList[i].cat_name
        let obejct = {
          name : label,
          list : expCategoryDeal
        }
        exposedCategories.push(obejct)
      }
    }

      res.status(200).json({result: exposedCategories})
  }catch(err){
      console.log('err: ',err)
      next(err)
  }
}
//608.455 ms 


// module.exports.getExposedCategoriesList = async (req, res, next) => {
//     const connection = await db.beginTransaction()
//     try{
//         let exhibitionResult = await exhibitionHandler.getList()
//         let exhibitionList = [];
//         let itemNumber = []
//         // console.log('exhibitionResult : ',exhibitionResult.length)
//         for(let i=0;i<exhibitionResult.length;i++){
//             let exhibitionDeal = await exhibitionDealHandler.getList({exhib_id : exhibitionResult[i].exhib_id})
//             // console.log('exhibitionDeal : ',exhibitionDeal)
//             let dealIds = []
//             for (let j=0;j<exhibitionDeal.length;j++){
//                 dealIds.push(exhibitionDeal[j].deal_id)
//             }
//             console.log('dealIds:',dealIds)
//             let list
//             let goods
//             if(dealIds.length !== 0){
//                 list  = await dealHandler.multipleGetAll(dealIds)
//                 goods = await goodHandler.multipleGetAll(dealIds)    
//             }
//             console.log('list:', list)
//             // let list  = await dealHandler.multipleGetAll(dealIds)
//             // let goods = await goodHandler.multipleGetAll(dealIds)
    
//             // let dealCompoisteDetail = await dealCompoisteDetailsHanlder.multipleGetAll(expCategory1CatIds)
    
//             if(list !== undefined){
//                 for(let j=0; j<list.length; j++){
//                     // let dealCompoisteDetail = await dealCompoisteDetailsHanlder.getList({id:list[j].deal_id})
//                     // const goodId = dealCompoisteDetail[0].goods_id
//                     // let good = await goodHandler.getList({goods_id: goodId})
//                     // console.log('exhibitionResult goods : ',exhibitionResult)
//                     list[j].orig_price = goods[j].orig_price
//                     list[j].stock_qty = goods[j].stock_qty
                    
//                 }  
//             }if(list !== undefined){
//                 itemNumber.push(list.length)
//             }
                    
//             exhibitionResult[i].deals = list
//             exhibitionList.push(exhibitionResult[i])
//         }
//         console.log('itemNumber:', itemNumber)
//         res.status(200).json({result: exhibitionList})
//     }catch(err){
//         await db.rollback(connection)
//         next(err)
//     }
// }
// //1027.659 ms


module.exports.getExhibitionList = async (req, res, next) => {
  try{
      //let exhibitionResult = await exhibitionHandler.getList()
      let exhibitionResult = await exhibitionHandler.getExhibList()
      let exhibitionList = [];
      let itemNumber = []
      let exhibitionExhibtIds = exhibitionResult.map(a=>a.exhib_id)
      let exhibitionDeal = await exhibitionDealHandler.multipleGetDealId(exhibitionExhibtIds)
      // console.log('exhibitionResult : ',exhibitionResult)
      // console.log('exhibitionDeal : ',exhibitionDeal)
      let dealIds = {};
      for(let i=1;i<exhibitionResult.length+1;i++){
        dealIds[i] = []
        for(let j=0;j<exhibitionDeal.length;j++){
          if(exhibitionDeal[j].exhib_id == i){
            dealIds[i].push(exhibitionDeal[j].deal_id)
          }
        }
      }
      // console.log('dealIds[1] : ',dealIds[1].length)
      for(let i=0;i<exhibitionResult.length;i++){
        // console.log('dealIds : ',dealIds[i])
        let list  = await dealHandler.joinGetList(dealIds[i+1])
        exhibitionResult[i].deals = list
        // console.log('exhibitionResult[i] : ',exhibitionResult[i])
        exhibitionList.push(exhibitionResult[i])        
      }
      // console.log('dealIds : ',dealIds)
     
      // for(let i=0;i<exhibitionResult.length;i++){
      //     // let exhibitionDeal = await exhibitionDealHandler.getList({exhib_id : exhibitionResult[i].exhib_id})
      //     // console.log('exhibitionDeal : ',exhibitionDeal)
      //     let dealIds = []
      //     for (let j=0;j<exhibitionDeal.length;j++){
      //         dealIds.push(exhibitionDeal[j].deal_id)
      //     }
      //     // console.log('dealIds:',dealIds)
      //     let list
      //     if(dealIds.length !== 0){
      //         list  = await dealHandler.joinGetList(dealIds)
      //     }
      //     // console.log('list:', list)
      //     // if(list !== undefined){
      //     //     itemNumber.push(list.length)
      //     // }
                  
      //     exhibitionResult[i].deals = list
      //     exhibitionList.push(exhibitionResult[i])
      // }
      // console.log('itemNumber: ', itemNumber)
      res.status(200).json({result: exhibitionList})
  }catch(err){
      next(err)
  }
}
//891.123 ms

// module.exports.getExhibitionList = async (req, res, next) => {
//   const connection = await db.beginTransaction()
//   try{
//     let exposedCategoryList = await exposedHandler.getMainList()
//     let exposedCategories = [];

//     let itemNumber  = []

//     for(let i=0;i<exposedCategoryList.length;i++){
//         let expCategory1 = await exposedCategoryDealHandler.getList({exp_cat_id : exposedCategoryList[i].exp_cat_id})
//         let label = exposedCategoryList[i].cat_name
      
//         let expCategory1CatIds = []
//         for (let j=0;j<expCategory1.length;j++){
//           expCategory1CatIds.push(expCategory1[j].deal_id)
//         }

//         let expCategoryDeal = await dealHandler.joinGetList(expCategory1CatIds)
//         itemNumber.push(expCategoryDeal.length)
      

//         let obejct = {
//           name : label,
//           list : expCategoryDeal
//         }
//         exposedCategories.push(obejct)
//     }
//       console.log('itemNumber:',itemNumber)
//       res.status(200).json({result: exposedCategories})
//   }catch(err){
//       await db.rollback(connection)
//       next(err)
//   }
// }
// //633.910 ms

module.exports.getList = async(req, res, next) => {
    try{
      const options = req.options
      let result = {}
      
    //   const  dealIdResult = await dealHandler.getList()
    //   console.log('dealIdResult:', dealIdResult.length)
    //   for(let i=0; i<dealIdResult.length; i++){
    //       const hot_deal_or_not = 'N'
    //       const ac_agt_goods_or_not = 'N'
    //       await dealHandler.update({hot_deal_or_not, ac_agt_goods_or_not, deal_idx: i}, connection)
    //   }

      let todayHotDealIds = []
      for(let i=1; i<11; i++){
        let hot_deal_or_not = 'Y'
        let hot_deal_expr_ts = util.getCurrentTime()
        // let dealResult = await dealHandler.updateRandomHotDeal({deal_idx: i, hot_deal_or_not, hot_deal_expr_ts}, connection)
        let dealYResult = await dealHandler.getList({deal_idx: i, connection})
        // let dealCompoisteDetail = await dealCompoisteDetailsHanlder.getList({id:dealYResult[0].deal_id})
        // const goodId = dealCompoisteDetail[0].goods_id
        // let good = await goodHandler.getList({goods_id: goodId})
        // dealYResult[0].orig_price = good[0].orig_price
        // dealYResult[0].stock_qty = good[0].stock_qty
        todayHotDealIds.push(dealYResult[0].deal_id)
      }
      // console.log('todayHotDealIds : ',todayHotDealIds)

      let todayHotDeal = await dealHandler.multipleGetAll(todayHotDealIds)
      let goods = await goodHandler.multipleGetAll(todayHotDealIds)
      for(let j=0; j<todayHotDeal.length; j++){
        // todayHotDeal[j].orig_price = goods[j].orig_price
        todayHotDeal[j].stock_qty = goods[j].stock_qty
      }
      
      
      let alwaysBuyGoodsIds = []
      for(let i=11; i<21; i++){
        let alwaysBuy = await dealHandler.getList({deal_idx: i}, connection)
        // let dealCompoisteDetail = await dealCompoisteDetailsHanlder.getList({id:alwaysBuy[0].deal_id})
        // const goodId = dealCompoisteDetail[0].goods_id
        // let good = await goodHandler.getList({goods_id: goodId})
        // alwaysBuy[0].orig_price = good[0].orig_price
        // alwaysBuy[0].stock_qty = good[0].stock_qty
        alwaysBuyGoodsIds.push(alwaysBuy[0].deal_id)
      }

      let alwaysBuyGoods = await dealHandler.multipleGetAll(alwaysBuyGoodsIds)
      goods = await goodHandler.multipleGetAll(alwaysBuyGoodsIds)
      for(let j=0; j<alwaysBuyGoods.length; j++){
        alwaysBuyGoods[j].orig_price = goods[j].orig_price
        alwaysBuyGoods[j].stock_qty = goods[j].stock_qty
      }

      let afterCareGoodsIds = []
      for(let i=21; i<31; i++){
        
        let ac_tgt_goods_or_not = 'Y'
        // let dealResult = await dealHandler.updateRandomAcDeal({deal_idx: i, ac_tgt_goods_or_not}, connection)
        let dealYResult = await dealHandler.getList({deal_idx: i, connection})
        // let dealCompoisteDetail = await dealCompoisteDetailsHanlder.getList({id:dealYResult[0].deal_id})
        // const goodId = dealCompoisteDetail[0].goods_id
        // let good = await goodHandler.getList({goods_id: goodId})
        // dealYResult[0].orig_price = good[0].orig_price
        // dealYResult[0].stock_qty = good[0].stock_qty        
        afterCareGoodsIds.push(dealYResult[0].deal_id)
      }

      let afterCareGoods = await dealHandler.multipleGetAll(afterCareGoodsIds)
      goods = await goodHandler.multipleGetAll(afterCareGoodsIds)
      for(let j=0; j<afterCareGoods.length; j++){
        afterCareGoods[j].orig_price = goods[j].orig_price
        afterCareGoods[j].stock_qty = goods[j].stock_qty
      }
      
      let nowTopGoodsIds = []
      for(let i=31; i<34; i++){
        let nowTop = await dealHandler.getList({deal_idx: i}, connection)
        // let dealCompoisteDetail = await dealCompoisteDetailsHanlder.getList({id:nowTop[0].deal_id})
        // const goodId = dealCompoisteDetail[0].goods_id
        // let good = await goodHandler.getList({goods_id: goodId})
        // nowTop[0].orig_price = good[0].orig_price
        // nowTop[0].stock_qty = good[0].stock_qty
       
        nowTopGoodsIds.push(nowTop[0].deal_id)
      }

      let nowTopGoods = await dealHandler.multipleGetAll(nowTopGoodsIds)
      goods = await goodHandler.multipleGetAll(nowTopGoodsIds)
      for(let j=0; j<nowTopGoods.length; j++){
        nowTopGoods[j].orig_price = goods[j].orig_price
        nowTopGoods[j].stock_qty = goods[j].stock_qty
      }

      let weeklyGoodsIds = []
      for(let i=34; i<44; i++){
        let weeklyGoodsResult = await dealHandler.getList({deal_idx: i}, connection)
        // let dealCompoisteDetail = await dealCompoisteDetailsHanlder.getList({id:weeklyGoodsResult[0].deal_id})
        // const goodId = dealCompoisteDetail[0].goods_id
        // let good = await goodHandler.getList({goods_id: goodId})
        // weeklyGoodsResult[0].orig_price = good[0].orig_price
        // weeklyGoodsResult[0].stock_qty = good[0].stock_qty
       
        weeklyGoodsIds.push(weeklyGoodsResult[0].deal_id)
      }

      let weeklyGoods = await dealHandler.multipleGetAll(weeklyGoodsIds)
      goods = await goodHandler.multipleGetAll(weeklyGoodsIds)
      for(let j=0; j<weeklyGoods.length; j++){
        weeklyGoods[j].orig_price = goods[j].orig_price
        weeklyGoods[j].stock_qty = goods[j].stock_qty
      }

      let exposedCategoryList = await exposedHandler.getMainList()
      let exposedCategories = [];
      for(let i=0;i<exposedCategoryList.length;i++){
          let expCategory1 = await exposedCategoryDealHandler.getList({exp_cat_id : exposedCategoryList[i].exp_cat_id})
          let label = exposedCategoryList[i].cat_name
          
          let expCategory1CatIds = []
          for (let j=0;j<expCategory1.length;j++){
            expCategory1CatIds.push(expCategory1[j].deal_id)
          }
          let expCategoryDeal = await dealHandler.multipleGetAll(expCategory1CatIds)
          let goods = await goodHandler.multipleGetAll(expCategory1CatIds)

          // let dealCompoisteDetail = await dealCompoisteDetailsHanlder.multipleGetAll(expCategory1CatIds)

          for(let j=0; j<expCategoryDeal.length; j++){
            // let dealCompoisteDetail = await dealCompoisteDetailsHanlder.getList({id:expCategoryDeal[j].deal_id})
            // const goodId = dealCompoisteDetail[0].goods_id
            // let good = await goodHandler.getList({goods_id: deal_id})
            expCategoryDeal[j].orig_price = goods[j].orig_price
            expCategoryDeal[j].stock_qty = goods[j].stock_qty
          }
    
          let obejct = {
            name : label,
            list : expCategoryDeal
          }
          exposedCategories.push(obejct)
      }
      
      
      // let expCategory2 = await exposedCategoryDealHandler.getList({exp_cat_id : exposedCategoryList[1].exp_cat_id})
      // let expCategory2CatIds = []
      // for (let i=0;i<expCategory2.length;i++){
      //   expCategory2CatIds.push(expCategory2[i].deal_id)
      // }
      // let expCategoryDeal2 = await dealHandler.multipleGetAll(expCategory2CatIds)
      

      // let expCategory3 = await exposedCategoryDealHandler.getList({exp_cat_id : exposedCategoryList[2].exp_cat_id})
      // let expCategory3CatIds = []
      // for (let i=0;i<expCategory3.length;i++){
      //   expCategory3CatIds.push(expCategory3[i].deal_id)
      // }
      // let expCategoryDeal3 = await dealHandler.multipleGetAll(expCategory3CatIds)


      // let kidsHealthGoods = []
      // for(let i=44; i<54; i++){
      //   let kidsHealth = await dealHandler.getList({deal_idx: i}, connection)
      //   kidsHealthGoods.push(kidsHealth)
      // }

      // let lightMeals = []
      // for(let i=54; i<64; i++){
      //   let lightMeal = await dealHandler.getList({deal_idx: i}, connection)
      //   lightMeals.push(lightMeal)
      // }

      let banner = []

      let exhibitionResult = await exhibitionHandler.getList()
      let exhibitionList = [];
      // console.log('exhibitionResult : ',exhibitionResult.length)
      for(let i=0;i<exhibitionResult.length;i++){
          let exhibitionDeal = await exhibitionDealHandler.getList({exhib_id : exhibitionResult[i].exhib_id})
          // console.log('exhibitionDeal : ',exhibitionDeal)
          let dealIds = []
          for (let j=0;j<exhibitionDeal.length;j++){
            dealIds.push(exhibitionDeal[j].deal_id)
          }
          let list  = await dealHandler.multipleGetAll(dealIds)
          let goods = await goodHandler.multipleGetAll(dealIds)

          // let dealCompoisteDetail = await dealCompoisteDetailsHanlder.multipleGetAll(expCategory1CatIds)

    
          for(let j=0; j<list.length; j++){
            // let dealCompoisteDetail = await dealCompoisteDetailsHanlder.getList({id:list[j].deal_id})
            // const goodId = dealCompoisteDetail[0].goods_id
            // let good = await goodHandler.getList({goods_id: goodId})
            // console.log('exhibitionResult goods : ',exhibitionResult)
            list[j].orig_price = goods[j].orig_price
            list[j].stock_qty = goods[j].stock_qty
            
          }          
          exhibitionResult[i].deals = list
          exhibitionList.push(exhibitionResult[i])
      }
      
      let popularBrand = []
      let suppliers = await supplierHandler.multipleGet([80, 84, 99, 113, 1842, 2263, 2521, 2895, 3057])
      console.log('suppliers : ',suppliers.length)

      let suppleCodes = []
      for(let i=0; i<suppliers.length; i++){
        
        // let good = await goodHandler.getList({suppl_code:suppliers[i].suppl_id })              
        
        // let deals = []
        // console.log('supplier good : ',good.length)
        // for (let j=0;j<good.length;j++){
        //   console.log(good[j].goods_id)
        //   let dealCompoisteDetail = await dealCompoisteDetailsHanlder.getListWithGoodId({id:good[j].goods_id})
        //   console.log('dealCompoisteDetail : ',dealCompoisteDetail)
        //   if(dealCompoisteDetail.length>0){
        //     let deal = await dealHandler.getList({deal_id: dealCompoisteDetail[0].deal_id})  
        //     console.log('good[j] :',good[j])
        //     console.log('deal :',deal)
        //     deal[0].orig_price = good[j].orig_price
        //     deal[0].stock_qty = good[j].stock_qty
        //     // console.log('supplier deal : ',deal)
        //     deals.push(deal)
        //   }
        // }
        // suppliers[i].list = deals
        // popularBrand.push(suppliers[i])
      }
    
      result.banner = banner
      result.todayHotDeal = todayHotDeal
      result.alwaysBuyGoods = alwaysBuyGoods
      result.afterCareGoods = afterCareGoods
      result.nowTopGoods = nowTopGoods
      result.weeklyGoods = weeklyGoods
      result.exposedCategories = exposedCategories
      result.exhibitionList = exhibitionList
      result.popularBrand = suppliers
      
      return res.status(200).json({lists: result});
      
    }catch(e){
      console.error(e)
      next(e);
    }
  }