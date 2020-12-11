'use strict'

const ApiRouter = require('../../default').ApiRouter
const ctrl = require('./cart-ctrl')

module.exports.register = new ApiRouter({
  name: '',
  method: 'post',
  summary: 'Register',
  schema: 'PostCart',
  tags: ['Cart'],
  description: '',
  isPublic: true,
  responses: {
    200: {description: 'Post Cart success'},
    400: {description: 'Invalid data'},
    409: {description: 'Duplicate Cart'}
  },
  handler: ctrl.register
})

module.exports.multipleInsert = new ApiRouter({
  name: 'multiInsert',
  method: 'post',
  summary: 'MultiInsert',
  schema: 'MultiInsert',
  description: '',
  tags: ['Cart'],
  isPublic: true,
  responses: {
    200: {description: 'Success'},
    400: {description: 'Invalid data'}
  },
  handler: ctrl.multipleInsert
})

module.exports.update = new ApiRouter({
  name: ':cust_idx',
  method: 'put',
  summary: 'update Cart',
  schema: 'UpdateCart',
  tags: ['Cart'],
  description:'',
  isPublic: true,
  responses: {
    200: {description: 'Success'},
    400: {description: 'Invalid data'}
  },
  handler: ctrl.update
})

module.exports.delete = new ApiRouter({
  name: '',
  method: 'delete',
  summary: 'Delete Cart',
  schema: 'DeleteCart',
  tags: ['Cart'],
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
  summary: 'GetCart',
  schema: 'GetCart',
  description: '',
  tags: ['Cart'],
  isPublic: true,
  responses: {
    200: {description: 'Success'},
    400: {description: 'Invalid data'}
  },
  handler: ctrl.getList
})

module.exports.getListByIdx = new ApiRouter({
  name: 'getListByIdx',
  method: 'get',
  summary: 'GetCart',
  schema: 'GetCartList',
  description: '',
  tags: ['Cart'],
  isPublic: true,
  responses: {
    200: {description: 'Success'},
    400: {description: 'Invalid data'}
  },
  handler: ctrl.getListByIdx
})