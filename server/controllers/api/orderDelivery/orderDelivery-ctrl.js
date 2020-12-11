'use strict'

const handler = require('./orderDelivery-handler')
const db = require('../../../components/db')
const util = require('../../../components/util')


module.exports.update = async (req, res, next) => {
    const connection = await db.beginTransaction();
    try{
      let newOrderDelivery = req.options
      const order = await handler.getList({order_num: newOrderDelivery.order_num});
      console.log('deal:', order);
      if(order.length === 0){
        throw{ status: 404, errorMessage: 'OrderDelivery not found'};
      }
      newOrderDelivery.last_mod_dt_time = util.getCurrentTime();
      //newOrnewOrderDeliveryder.order_idx = order[0].order_idx;
      //delete newOrder.id;

      const result = await handler.update(newOrderDelivery, connection);
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
