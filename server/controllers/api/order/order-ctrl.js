'use strict'

const handler = require('./order-handler')
const dealHandler = require('../deal/deal-handler')
const goodsHandler = require('../goods/goods-handler')
const supplierHandler = require('../supplier/supplier-handler')
const orderDeliveryHandler = require('../orderDelivery/orderDelivery-handler')
const dealModel = require('../../../models/deal');
const customerHandler = require('../customer/customer-handler');
const deliveryDestinationHandler = require('../deliveryDestination/deliveryDestination-handler')
const orderDetailsHandler = require('../orderDetails/orderDetails-handler')
const goodsSortTypeHandler = require('../goodsSortType/goodsSortType-handler')
const db = require('../../../components/db')
const crypto = require('../../../components/crypto')
const util = require('../../../components/util')
const fake = require('../../../models/fake')


module.exports.register = async (req, res, next) => {
  const connection = await db.beginTransaction()
  try{
    const newOrder = req.options
    newOrder.first_create_dt_time = util.getCurrentTime()

    let dealList = newOrder.deal_list
    let deal_id_array = dealList.map(deal => deal.deal_id)
    let dealQtyArray = dealList.map(deal => deal.deal_qty)
    console.log('deal_id_array: ', deal_id_array)
    console.log('dealQtyArray: ', dealQtyArray)
    const maxOrderNum = await handler.getMaxOrderNum()
    if(maxOrderNum.length !==0){
      newOrder.order_num = maxOrderNum[0].max + 1
    }else{
      newOrder.order_num = 1
    }

    const dealGoodsResults = await dealHandler.joinGetForOrder(deal_id_array)
    console.log("dealGoodsResults:", dealGoodsResults)
    let orderArray = []
    for(let i=0; i<dealGoodsResults.length; i++){
      let tempOrderArray = []
      tempOrderArray.push(newOrder.order_num)
      tempOrderArray.push(newOrder.order_classif_code)
      tempOrderArray.push(newOrder.order_state_code)
      tempOrderArray.push(newOrder.deliv_classif_code)
      tempOrderArray.push(deal_id_array[i])// deal_id
      tempOrderArray.push(dealGoodsResults[i].deal_opt_id)
      tempOrderArray.push(dealQtyArray[i]) //pur_cnt
      tempOrderArray.push(dealGoodsResults[i].orig_price - dealGoodsResults[i].deal_disc_price) //pur_amt
      tempOrderArray.push(dealGoodsResults[i].deliv_amt)
      tempOrderArray.push(dealGoodsResults[i].deal_disc_price)//disc_amt
      tempOrderArray.push(dealGoodsResults[i].suppl_code)
      tempOrderArray.push(newOrder.deliv_company_code)
      tempOrderArray.push(newOrder.inv_num)
      tempOrderArray.push(newOrder.cust_id)
      tempOrderArray.push(util.getCurrentTime()) //order_dt
      tempOrderArray.push(newOrder.sabang_order_id)
      tempOrderArray.push(newOrder.sabang_cxn_ecomm_order_id)
      tempOrderArray.push(newOrder.sabang_cxn_ecomm_user_id)
      tempOrderArray.push(newOrder.sabang_cxn_ecomm_name)
      tempOrderArray.push(newOrder.sabang_order_coll_ts)
      tempOrderArray.push(newOrder.sabang_order_conf_ts)
      tempOrderArray.push(newOrder.sabang_etc_msg)
      tempOrderArray.push(newOrder.non_mbr_indv_info_coll_agrmt_or_not)
      tempOrderArray.push(newOrder.pur_cond_agrmt_or_not)
      tempOrderArray.push(util.getCurrentTime())  // first_create_dt_time

      orderArray.push(tempOrderArray)

    }
    const orderResults = await handler.multipleInsert(orderArray, connection)
    console.log('orderResults:', orderResults)

    const orderDelivResults = await orderDeliveryHandler.insert(newOrder, connection)

    await db.commit(connection);
    res.status(200).json({order_NUM: newOrder.order_num})
    

  }catch(err){
    await db.rollback(connection);
    next(err)
  }
}

const calculateFunc = async (dealIdArray, dealQtyArray) => {
  let result = {}
  let priceResult = await dealHandler.getPrice(dealIdArray)
      console.log('priceResult:', priceResult)

      const getSupplCode = await goodsHandler.multipleGetAll(dealIdArray)
      //console.log('getSupplCode:', getSupplCode)
      const supplId = getSupplCode.map(code => code.suppl_code)
      //console.log("supplId:", supplId)

      let finalOrigPrice = 0
      let finalDiscAmt = 0
      let finalSpDiscAmt = 0
      let number = 1
      let delivAmt = 0
       
      let priceByDealArray = []

      let freeDeliv = []
      
      for(let i=0; i<priceResult.length; i++){
        let priceBydeal = {}

        finalOrigPrice = finalOrigPrice + priceResult[i].orig_price * dealQtyArray[i]
        finalDiscAmt = finalDiscAmt + priceResult[i].deal_disc_price * dealQtyArray[i]
        finalSpDiscAmt = finalSpDiscAmt + priceResult[i].sp_disc_price * dealQtyArray[i]

        let getFreeDelivOrNot = await supplierHandler.getList({suppl_id: supplId[i]})
        freeDeliv.push(getFreeDelivOrNot[0].free_deliv_or_not)
        if(getFreeDelivOrNot.length !== 0){
          if(getFreeDelivOrNot[0].free_deliv_or_not==0){
            number = 0
          } else if (priceResult[i].orig_price >= getFreeDelivOrNot[0].free_deliv_base_amt){
            number = 0
          } else {
            number = 1
          }
        }
        delivAmt = delivAmt + (priceResult[i].deliv_amt * number)
        //console.log('delivAmt:', delivAmt)

        priceBydeal.name = priceResult[i].deal_name  
        priceBydeal.pur_cnt = dealQtyArray[i]
        priceBydeal.orig_price = priceResult[i].orig_price * dealQtyArray[i]  
        priceBydeal.disc_price = priceResult[i].deal_disc_price * dealQtyArray[i]
        priceBydeal.sp_disc_price = priceResult[i].sp_disc_price * dealQtyArray[i]
        priceBydeal.free_deliv_base_amt = getFreeDelivOrNot[0].free_deliv_base_amt
        priceBydeal.deliv_amount = delivAmt

        priceByDealArray.push(priceBydeal)

      }
      //console.log("freeDeliv:", freeDeliv)
      //console.log('price:',finalOrigPrice,finalDiscAmt, finalSpDiscAmt, delivAmt)
      
      let totalPayment = {}
    
      let amt = priceByDealArray.map(deal => deal.deliv_amount)
      const totalDelivAmt = amt.reduce((a,b) => a+b)
      //console.log("totalDelivAmt:", totalDelivAmt)

      const finalAmount = finalOrigPrice + delivAmt - (finalDiscAmt + finalSpDiscAmt)
      totalPayment.orig_price = finalOrigPrice
      totalPayment.disc_price = finalDiscAmt
      totalPayment.sp_disc_price = finalSpDiscAmt
      totalPayment.total_deliv_amount = totalDelivAmt
      totalPayment.total_payment = finalAmount

      result.priceByDeal = priceByDealArray
      result.dealTotal = totalPayment

      return result
}

module.exports.registerCalculate = async (req, res, next) => {
  const connection = await db.beginTransaction();
  try{
    const newOrder = req.options;
    console.log('newOrder: ', newOrder)
    let dealList = newOrder.deal_list
    let dealIdArray = dealList.map(deal => deal.deal_id)
    let dealQtyArray = dealList.map(deal => deal.deal_qty)
    console.log('dealIdArray: ', dealIdArray)
    console.log('dealQtyArray: ', dealQtyArray)

    const result = await calculateFunc(dealIdArray, dealQtyArray)

    await db.commit(connection);
    //res.status(200).json({priceByDeal: priceByDealArray, dealTotal: totalPayment});
    res.status(200).json(result)

  }catch(e){
    await db.rollback(connection);
    next(e);
  }
}

module.exports.update = async (req, res, next) => {
    const connection = await db.beginTransaction();
    try{
      let newOrder = req.options
      const order = await handler.findOneByIdx(newOrder.order_idx);
      console.log('deal:', order);
      if(order.length === 0){
        throw{ status: 404, errorMessage: 'Order not found'};
      }
      newOrder.last_mod_dt_time = util.getCurrentTime();
      newOrder.order_idx = order[0].order_idx;
      //delete newOrder.id;

      const result = await handler.update(newOrder, connection);
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
      const result = await handler.delete({ id: req.options.id }, connection);
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
      const query = req.query
      console.log("params:", params)
      let result = await handler.getList(params)
      //console.log("result: ", result)
      const totalResult = await handler.getListTotal(params)
      //console.log("totalResult:", totalResult)
      const pagenation = util.makePageData(totalResult, params.page, params.srch_cnt)

      const orderNums = result.map(item => item.order_num);
      const uniqueOrderNums =  Array.from(new Set(orderNums));
      let tempOrderArray = []
      for(let k=0; k<uniqueOrderNums.length; k++){
        let tempOrder = {}
        tempOrder.order_num = uniqueOrderNums[k]
        tempOrder.deals = []
        // tempOrder[k].deals = []
        for(let i=0; i<result.length; i++){
          if(result[i].order_num === uniqueOrderNums[k]){
            delete result[i].order_num
            tempOrder.deals.push(result[i])
          }
        }
        tempOrderArray.push(tempOrder)
      }
       
      return res.status(200).json({Orders: tempOrderArray, pagenation, query});
    }catch(err){
      console.error(err)
      next(err);
    }
  }

  module.exports.getDetailList = async(req, res, next) => {
    try{
      let results = {}
      let tempPayment = [{
        payment_method : "신용캬드",
        order_state : "결제완료",
        total_goods_price : "145,000",
        deliv_amount : "0",
        disc_amt : "-4,400",
        sp_disc_price : "-4,000",
        using_point: "0",
        payment_price : "131,600"
      }]
      let point = [{
        expected_point: "3,300",
        basic_point: "300",
        text_review_point: "1000",
        photo_video_review_point: "2000"
      }]

      const params = req.options //order_idx, order_num
      const getOrder = await handler.getList(params)
      console.log("getOrder:", getOrder)
      if(getOrder.length === 0){
        throw { status: 404, errorMessage: "Order not found"}
      }
      const dealId = getOrder.map(item => item.deal_id)
      const orderNum = getOrder[0].order_num
      const purCnt = getOrder.map(item => item.pur_cnt)
      
      console.log("deal_id:", dealId)
      console.log("orderNum:", orderNum)
      console.log("pur_cnt:", purCnt)

      const result = await calculateFunc(dealId, purCnt)
      console.log('result:', result)
      let payment
      tempPayment[0].total_goods_price = result.dealTotal.orig_price
      tempPayment[0].disc_amt = result.dealTotal.disc_price
      tempPayment[0].sp_disc_price = result.dealTotal.sp_disc_price
      tempPayment[0].deliv_amount = result.dealTotal.total_deliv_amount
      tempPayment[0].payment_price = result.dealTotal.total_payment
      payment = tempPayment

      result.priceByDeal.map(good => delete good.disc_price)
      result.priceByDeal.map(good => delete good.sp_disc_price)
      result.priceByDeal.map(good => delete good.free_deliv_base_amt)
      result.priceByDeal.map(good => delete good.deliv_amount)
      const goodsResult = result.priceByDeal

      const deliveryResult = await orderDeliveryHandler.getList({order_num: orderNum})

      results.goodsResult = goodsResult
      results.payment = payment
      results.point = point
      results.deliveryResult = deliveryResult
      return res.status(200).json({ results });
    }catch(err){
      console.error(err)
      next(err);
    }
  }