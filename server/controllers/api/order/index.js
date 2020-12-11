'use strict'

const ApiRouter = require('../../default').ApiRouter
const ctrl = require('./order-ctrl')


module.exports.register = new ApiRouter({
  name: '',
  method: 'post',
  summary: 'Register',
  schema: 'PostOrder',
  tags: ['Order'],
  description: '',
  isPublic: true,
  responses: {
    200: {description: 'Order posting success'},
    400: {description: 'Invalid data'},
  },
  handler: ctrl.register
})

module.exports.registerCalculate = new ApiRouter({
  name: 'calculate',
  method: 'post',
  summary: 'RegisterCalculate',
  schema: 'PostOrderCalculate',
  tags: ['Order'],
  description: '',
  isPublic: true,
  responses: {
    200: {description: 'Order posting success'},
    400: {description: 'Invalid data'},
  },
  handler: ctrl.registerCalculate
})

module.exports.update = new ApiRouter({
  name: '',
  method: 'put',
  summary: 'update Order',
  schema: 'UpdateOrder',
  tags: ['Order'],
  description:'',
  isPublic: true,
  responses: {
    200: {description: 'Success'},
    400: {description: 'Invalid data'}
  },
  handler: ctrl.update
})

module.exports.delete = new ApiRouter({
  name: ':id',
  method: 'delete',
  summary: 'Delete Order',
  schema: 'DeleteOrder',
  tags: ['Order'],
  isPublic: true,
  responses: {
    200: {description: 'Success'},
    400: {description: 'Invalid data'},
    409: {description: 'Already removed'}
  },
  handler: ctrl.delete
})

module.exports.getList = new ApiRouter({
  name: '',
  method: 'get',
  summary: 'Get Order List',
  schema: 'GetOrderList',
  description: '',
  tags: ['Order'],
  isPublic: true,
  responses: {
    200: {description: 'Success'},
    400: {description: 'Invalid data'}
  },
  handler: ctrl.getList
})

module.exports.getDetailList = new ApiRouter({
  name: 'detailList',
  method: 'get',
  summary: 'Get Order List',
  schema: 'GetOrderDetailList',
  description: '',
  tags: ['Order'],
  isPublic: true,
  responses: {
    200: {description: 'Success'},
    400: {description: 'Invalid data'}
  },
  handler: ctrl.getDetailList
})