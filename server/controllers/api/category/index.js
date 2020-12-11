'use strict'

const ApiRouter = require('../../default').ApiRouter
const ctrl = require('./category-ctrl')


module.exports.register = new ApiRouter({
  name: '',
  method: 'post',
  summary: 'Register',
  schema: 'PostCategory',
  tags: ['Category'],
  description: '',
  isPublic: true,
  responses: {
    200: {description: 'Category posting success'},
    400: {description: 'Invalid data'}
  },
  handler: ctrl.register
})

module.exports.update = new ApiRouter({
  name: ':cat_idx',
  method: 'put',
  summary: 'update Category',
  schema: 'UpdateCategory',
  tags: ['Category'],
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
  summary: 'Delete Category',
  schema: 'DeleteCategory',
  tags: ['Category'],
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
  summary: 'Get Category List',
  schema: 'GetCategoryList',
  description: '',
  tags: ['Category'],
  isPublic: true,
  responses: {
    200: {description: 'Success'},
    400: {description: 'Invalid data'}
  },
  handler: ctrl.getList
})
