'use strict'

const ApiRouter = require('../../default').ApiRouter
const ctrl = require('./banner-ctrl')


module.exports.register = new ApiRouter({
  name: '',
  method: 'post',
  summary: 'Register',
  schema: 'PostBanner',
  tags: ['Banner'],
  description: '',
  isPublic: true,
  responses: {
    200: {description: 'Posting Banner success'},
    400: {description: 'Invalid data'},
  },
  handler: ctrl.register
})

module.exports.update = new ApiRouter({
  name: ':exhib_idx',
  method: 'put',
  summary: 'update Banner',
  schema: 'UpdateBanner',
  tags: ['Banner'],
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
  summary: 'Delete Banner',
  schema: 'DeleteBanner',
  tags: ['Banner'],
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
  summary: 'GetBanner',
  schema: 'GetBannerList',
  description: '',
  tags: ['Banner'],
  isPublic: true,
  responses: {
    200: {description: 'Success'},
    400: {description: 'Invalid data'}
  },
  handler: ctrl.getList
})
