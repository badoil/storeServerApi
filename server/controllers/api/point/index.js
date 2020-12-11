'use strict'

const ApiRouter = require('../../default').ApiRouter
const ctrl = require('./point-ctrl')


module.exports.register = new ApiRouter({
  name: '',
  method: 'post',
  summary: 'Register',
  schema: 'PostPoint',
  tags: ['Point'],
  description: '',
  isPublic: true,
  responses: {
    200: {description: 'Sign up success'},
    400: {description: 'Invalid data'},
    409: {description: 'Duplicate email'}
  },
  handler: ctrl.register
})

module.exports.getList = new ApiRouter({
  name: '',
  method: 'get',
  summary: 'GetPoint',
  schema: 'GetPoint',
  description: '',
  tags: ['Point'],
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
  summary: 'GetPoint',
  schema: 'GetPointList',
  description: '',
  tags: ['Point'],
  isPublic: true,
  responses: {
    200: {description: 'Success'},
    400: {description: 'Invalid data'}
  },
  handler: ctrl.getListByIdx
})
