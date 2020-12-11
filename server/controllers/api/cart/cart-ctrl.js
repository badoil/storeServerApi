'use strict'

const handler = require('./cart-handler')
const dealHandler = require('../deal/deal-handler');
const db = require('../../../components/db')
const crypto = require('../../../components/crypto')
const util = require('../../../components/util')
const fake = require('../../../models/fake')


module.exports.register = async (req, res, next) => {
  const connection = await db.beginTransaction();
  try{
    const newCart = req.options;
    console.log('newCart: ', newCart);

    const cart = await handler.getList({cust_idx: newCart});
    // console.log('cart:', cart)
    // if (cart.length > 0) {
    //   throw { status: 409, errorMessage: 'Duplicate Cart' }
    // }
    
    let result
    if(cart.length !== 0){
      if(cart[0].deal_qty === null){
        newCart.deal_qty = 1
      }else{
        newCart.deal_qty = Number(cart[0].deal_qty) + Number(newCart.deal_qty)
      }
      // console.log('newCart1: ', newCart);
      result = await handler.update(newCart, connection)
    }else{
      newCart.first_create_dt_time = util.getCurrentTime();
      // console.log('newCart2: ', newCart);
      result = await handler.insert(newCart, connection);
    }
    
    await db.commit(connection);
    res.status(200).json(result);

  }catch(e){
    await db.rollback(connection);
    next(e);
  }
}

module.exports.multipleInsert = async (req, res, next) => {
  const connection = await db.beginTransaction();
  try{
    const newCart = req.options;
    let carts = newCart.carts
    console.log('carts1:', carts)


    await handler.delete({cust_idx:carts[0].cust_idx}, connection);

    let result
    let dealId = []
    for(let i=0; i<carts.length; i++){
      // console.log('carts[i]:', carts[i])
      // let cart = await handler.findOneByIdx(carts[i]);
      // console.log('cart:', cart)
      // if(cart.length !== 0){
      //   if(cart[0].deal_qty === null){
      //     cart[0].deal_qty = 1
      //   }else{
      //     cart[0].deal_qty = Number(cart[0].deal_qty) + 1
      //   }
      //   result = await handler.update(cart[0], connection)
      //   dealId.push(cart[0].deal_id)
      // }else{
        carts[i].first_create_dt_time = util.getCurrentTime(); 
        console.log('carts2: ', carts[i]);
        result = await handler.insert(carts[i], connection);
        dealId.push(carts[i].deal_id)
      // }
    }
    // console.log('dealId:', dealId)
    
    await db.commit(connection);
    res.status(200).json({result: result});

  }catch(e){
    await db.rollback(connection);
    next(e);
  }
}

module.exports.update = async (req, res, next) => {
  const connection = await db.beginTransaction();
  try{
    let newCart = req.body
    // const cart = await handler.findOneByIdx(newCart);
    // console.log('newCart:', newCart)
    // console.log('cart:', cart);
    // if(cart.length === 0){
    //   throw{ status: 404, errorMessage: 'Cart not found'};
    // }
    newCart.last_mod_dt_time = util.getCurrentTime();
    //newDeliveryDestination.deliv_dest_idx = deliveryDestination[0].deliv_dest_idx;
    //delete newBrand.brand_idx;

    const result = await handler.update(newCart, connection);
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
    const params = req.options
    const result = await handler.delete(params, connection);
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

module.exports.getList = async (req, res, next) => {
  try {
    const params = req.options
    
    let cartJoinDealResult = await handler.joinGet(params)
    console.log("cartJoinDealResult:", cartJoinDealResult)
    const dealIds = cartJoinDealResult.map(item => item.deal_id);
    
    const brandNames = cartJoinDealResult.map(item => item.brand_name);
    const uniquebrandNames =  Array.from(new Set(brandNames));
    let tempCartArray = []
    for(let k=0; k<uniquebrandNames.length; k++){
      let tempCart = {}
      tempCart.brand_name = uniquebrandNames[k]
      tempCart.deals = []
      // tempOrder[k].deals = []
      for(let i=0; i<cartJoinDealResult.length; i++){
        if(cartJoinDealResult[i].brand_name === uniquebrandNames[k]){
          //delete cartJoinDealResult[i].brand_name
          let dealResult = await dealHandler.getList({deal_id: dealIds[i]})
          cartJoinDealResult = dealResult
          tempCart.deals.push(cartJoinDealResult[i])
        }
      }
      tempCartArray.push(tempCart)
    }
    
    res.status(200).json({result: tempCartArray})
  }
  catch (err) {
    next(err)
  }
}

module.exports.getListByIdx = async (req, res, next) => {
  try{
    const params = req.options
    console.log('params:', params)
    const result = await handler.getListByIdx(params)

    res.status(200).json({list: result})

  }catch(err){
    console.error(err)
    next(err)
  }
}