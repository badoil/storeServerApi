'use strict'

const ApiRouter = require('../../default').ApiRouter
const ctrl = require('./goods-ctrl')


module.exports.register = new ApiRouter({
  name: '',
  method: 'post',
  summary: 'Register',
  schema: 'PostGoods',
  tags: ['Goods'],
  description: '',
  isPublic: true,
  responses: {
    200: {description: 'Goods posting success'},
    400: {description: 'Invalid data'},
    409: {description: 'Duplicate goods'}
  },
  handler: ctrl.register
})

module.exports.update = new ApiRouter({
  name: ':id',
  method: 'put',
  summary: 'update Goods',
  schema: 'UpdateGoods',
  tags: ['Goods'],
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
  summary: 'Delete Goods',
  schema: 'DeleteGoods',
  tags: ['Goods'],
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
  summary: 'Get Goods List',
  schema: 'GetGoodsList',
  description: '',
  tags: ['Goods'],
  isPublic: true,
  responses: {
    200: {description: 'Success'},
    400: {description: 'Invalid data'}
  },
  handler: ctrl.getList
})
