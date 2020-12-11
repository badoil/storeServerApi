'use strict'

const ApiRouter = require('../../default').ApiRouter
const ctrl = require('./common-ctrl')

module.exports.search = new ApiRouter({
  name: 'search',
  method: 'get',
  summary: 'search list',
  description:'free_deliv_or_not : true / today_deliv_dl_time(오늘출발) : true  / rating : 0, 1, 2, 3, 4 / ac_app_or_not(애프터케어) : Y, N ',
  schema: 'Search',
  tags: ['Search'],
  isPublic:'true',
  responses: {
    200: {description: 'Success'},
    400: {description: 'Invalid data'}
  },
  handler: ctrl.search
})

module.exports.relatedKeyword = new ApiRouter({
  name: 'relatedKeyword',
  method: 'get',
  summary: 'search list',
  schema: 'RelatedKeyword',
  tags: ['Search'],
  isPublic:'true',
  responses: {
    200: {description: 'Success'},
    400: {description: 'Invalid data'}
  },
  handler: ctrl.relatedKeyword
})

module.exports.hotKeyword = new ApiRouter({
  name: 'hotKeyword',
  method: 'get',
  summary: 'hoy keyword list',
  schema: 'RelatedKeyword',
  tags: ['Search'],
  isPublic:'true',
  responses: {
    200: {description: 'Success'},
    400: {description: 'Invalid data'}
  },
  handler: ctrl.hotKeyword
})
