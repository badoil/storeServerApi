// 'use strict'

// const delivDestModel = require('../../../models/delivery_destination')
// const db             = require('../../../components/db'              )
// const crypto         = require('../../../components/crypto'          )
// const util           = require('../../../components/util'            )

// // 배송지 신규 등록
// module.exports.register = async (req, res, next) => {
//     const connection = await db.beginTransaction();

//     try{
//         const newDeliveryDestination = req.options;

//         // 유저로그 업데이트
//         newDeliveryDestination.first_create_dt_time = util.getCurrentTime();

//         const result = await delivDestModel.insert(newDeliveryDestination, connection)

//         // 성공
//         await db.commit(connection);
//         res.status(200).json(result);
//     } catch(e) {
//         await db.rollback(connection);
//         next(e);
//     }
// }

// // 배송지 변경 업데이트
// module.exports.update = async (req, res, next) => {
//     const connection = await db.beginTransaction();

//     try {
//         let newDeliveryDestination = req.body

//         newDeliveryDestination.last_mod_dt_time = util.getCurrentTime();

//         // const params = req.params
//         // const deliveryDestination = await handler.findOneByIdx(params.deliv_dest_idx);
//         // console.log('newDeliveryDestination:', newDeliveryDestination)
//         // console.log('deliveryDestination:', deliveryDestination);
//         // if(deliveryDestination.length === 0){
//         //     throw{ status: 404, errorMessage: 'deliveryDestination not found'};
//         // }
        
//         var param = {newDeliveryDestination: newDeliveryDestination, deliv_dest_idx:req.body.deliv_dest_idx}

//         const result = await delivDestModel.update(param, connection)
        
//         console.log('updateResult: ', result.affectedRows);
        
//         if(result.affectedRows === 0){
//             throw{ status: 404, errorMessage: "updating failed"};
//         }
        
//         await db.commit(connection);
//         res.status(200).json({ result: true });
//     }catch(e){
//         await db.rollback(connection);
//         next(e);
//     }
// }

// // 배송지 삭제
// module.exports.delete = async (req, res, next) => {
//     const connection = await db.beginTransaction();

//     try{
//         const params = req.options

//         const result = await delivDestModel.delete(params.deliv_dest_idx, connection)

//         let returnValue = false;

//         if(result.affectedRows === 1){
//             returnValue = true
//         }

//         await db.commit(connection);

//         res.status(200).json({ result: returnValue });
//     } catch(e){
//         await db.rollback(connection);
//         next(e);
//     }
// }

// // 배송지 리스트 조회
// module.exports.getList = async(req, res, next) => {
//     try {
//         const list = req.options

//         const result = await delivDestModel.getList(list)

//         return res.status(200).json({result: result});
//     }catch(e){
//         console.error(e)
//         next(e);
//     }
// }
