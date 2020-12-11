// 'use strict'

// const ApiRouter = require('../../default').ApiRouter
// const ctrl      = require('./delivery_destination-ctrl')

// module.exports.register = new ApiRouter({
//       name        : ''
//     , method      : 'post'
//     , summary     : 'Register a new delivery destination'
//     , schema      : 'PostDeliveryDestination'
//     , tags        : ['delivery_destination']
//     , description : ''
//     , isPublic    : true
//     , handler     : ctrl.register
//     , responses   : {
//           200: {description: 'Post delivery_destination success'}
//         , 400: {description: 'Invalid data-'                     }
//   }
// })

// module.exports.update = new ApiRouter({
//       name        : ':deliv_dest_idx'
//     , method      : 'put'
//     , summary     : 'update delivery destination'
//     , schema      : 'UpdateDeliveryDestination'
//     , tags        : ['delivery_destination']
//     , description : ''
//     , isPublic    : true
//     , handler     : ctrl.update
//     , responses   : {
//           200: {description: 'Success'     }
//         , 400: {description: 'Invalid data'}
//     }
// })

// module.exports.delete = new ApiRouter({
//       name        : ':deliv_dest_idx'
//     , method      : 'delete'
//     , summary     : 'delete delivery destination'
//     , schema      : 'DeleteDeliveryDestination'
//     , tags        : ['delivery_destination']
//     , description : ''
//     , isPublic    : true
//     , handler     : ctrl.delete
//     , responses   : {
//           200: {description: 'Success'        }
//         , 400: {description: 'Invalid data'   }
//         , 409: {description: 'Already removed'}
//     }
// })

// module.exports.getList = new ApiRouter({
//       name        : ':cust_idx'
//     , method      : 'get'
//     , summary     : 'get a list of delivery destination'
//     , schema      : 'GetDeliveryDestination'
//     , tags        : ['delivery_destination']
//     , description : ''
//     , isPublic    : true
//     , handler     : ctrl.getList
//     , responses   : {
//           200: {description: 'Success'     }
//         , 400: {description: 'Invalid data'}
//     }
// })
