'use strict'

const ApiRouter = require('../../default').ApiRouter
const ctrl = require('./auto-ctrl')




module.exports.insert = new ApiRouter({
  name: '',
  method: 'post',
  summary: 'insert keyword',
  schema: 'Search',
  tags: ['AutoComplete'],
  isPublic:'true',
  responses: {
    200: {description: 'Success'},
    400: {description: 'Invalid data'}
  },
  handler: ctrl.insert
})

module.exports.get = new ApiRouter({
  name: '',
  method: 'get',
  summary: 'search list',
  schema: 'Search',
  tags: ['AutoComplete'],
  isPublic:'true',
  responses: {
    200: {description: 'Success'},
    400: {description: 'Invalid data'}
  },
  handler: ctrl.get
})


module.exports.realtime = new ApiRouter({
  name: 'realtime',
  method: 'get',
  summary: 'search list',
  schema: 'Search',
  tags: ['AutoComplete'],
  isPublic:'true',
  responses: {
    200: {description: 'Success'},
    400: {description: 'Invalid data'}
  },
  handler: ctrl.realtime
})


