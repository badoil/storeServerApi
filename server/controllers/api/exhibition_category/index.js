'use strict'

const ApiRouter = require('../../default').ApiRouter
const ctrl = require('./exhibition_category-ctrl')


module.exports.register = new ApiRouter({
  name: '',
  method: 'post',
  summary: 'Register',
  schema: 'PostMainExhibition',
  description: '기획전',
  tags: ['exhibition-category'],
  description: '',
  isPublic: true,
  responses: {
    200: {description: 'Posting MainExhibition success'},
    400: {description: 'Invalid data'},
  },
  handler: ctrl.register
})

module.exports.update = new ApiRouter({
  name: ':exhib_idx',
  method: 'put',
  summary: 'update MainExhibition',
  schema: 'UpdateMainExhibition',
  description: '기획전',
  tags: ['exhibition-category'],
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
  summary: 'Delete MainExhibition',
  schema: 'DeleteMainExhibition',
  description: '기획전',
  tags: ['exhibition-category'],
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
  summary: 'MainExhibition',
  schema: 'GetExhibitionList',
  description: '기획전',
  tags: ['exhibition-category'],
  isPublic: true,
  responses: {
    200: {description: 'Success'},
    400: {description: 'Invalid data'}
  },
  handler: ctrl.getList
})

module.exports.event = new ApiRouter({
  name: 'event',
  method: 'get',
  summary: 'GetEvent',
  schema: 'GetExhibitionEventList',
  description: '기획전',
  tags: ['exhibition-category'],
  isPublic: true,
  responses: {
    200: {description: 'Success'},
    400: {description: 'Invalid data'}
  },
  handler: ctrl.event
})

module.exports.eventDetail = new ApiRouter({
  name: 'eventDetail',
  method: 'get',
  summary: 'GetEvent',
  schema: 'GetExhibitionEventDetailList',
  description: '기획전',
  tags: ['exhibition-category'],
  isPublic: true,
  responses: {
    200: {description: 'Success'},
    400: {description: 'Invalid data'}
  },
  handler: ctrl.eventDetail
})

module.exports.insertFakeData = new ApiRouter({
  name: 'insertFakeData',
  method: 'post',
  summary: 'insertFakeData',
  schema: '',
  description: '기획전',
  tags: ['exhibition-category'],
  description: '',
  isPublic: true,
  responses: {
    200: {description: 'Posting MainExhibition success'},
    400: {description: 'Invalid data'},
  },
  handler: ctrl.insertFakeData
})