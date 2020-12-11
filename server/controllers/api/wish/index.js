'use strict'

const ApiRouter = require('../../default').ApiRouter
const ctrl = require('./wish-ctrl')

module.exports.register = new ApiRouter({
  name: 'add',
  method: 'post',
  summary: '없으면 추가, 있으면 삭제',
  schema: 'PostWish',
  tags: ['Wish'],
  description: '',
  isPublic: true,
  responses: {
    200: {description: 'Post Wish success'},
    400: {description: 'Invalid data'},
    409: {description: 'Duplicate Wish'}
  },
  handler: ctrl.register
})

module.exports.update = new ApiRouter({
  name: '',
  method: 'put',
  summary: 'update Wish',
  schema: 'UpdateWish',
  tags: ['Wish'],
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
  summary: 'Delete Wish',
  schema: 'DeleteWish',
  tags: ['Wish'],
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
  summary: 'GetWish',
  schema: 'GetWish',
  description: '',
  tags: ['Wish'],
  isPublic: true,
  responses: {
    200: {description: 'Success'},
    400: {description: 'Invalid data'}
  },
  handler: ctrl.getList
})
