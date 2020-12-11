'use strict'

const ApiRouter = require('../../default').ApiRouter
const ctrl = require('./main-ctrl')

module.exports.getExpBannerList = new ApiRouter({
  name: 'getExpBannerList',
  method: 'get',
  summary: 'GetBannerMain',
  schema: 'GetBannerMain',
  description: '',
  tags: ['Main'],
  isPublic: true,
  responses: {
    200: {description: 'Success'},
    400: {description: 'Invalid data'}
  },
  handler: ctrl.getExpBannerList
})

module.exports.getTodayHotDealList = new ApiRouter({
  name: 'getTodayHotDealList',
  method: 'get',
  summary: 'GetTodayHotDeal',
  schema: 'GetTodayHotDeal',
  description: '',
  tags: ['Main'],
  isPublic: true,
  responses: {
    200: {description: 'Success'},
    400: {description: 'Invalid data'}
  },
  handler: ctrl.getTodayHotDealList
})

module.exports.getAlwaysBuyGoodsList = new ApiRouter({
  name: 'getAlwaysBuyGoodsList',
  method: 'get',
  summary: 'GetAlwaysBuyGoods',
  schema: 'GetAlwaysBuyGoods',
  description: '',
  tags: ['Main'],
  isPublic: true,
  responses: {
    200: {description: 'Success'},
    400: {description: 'Invalid data'}
  },
  handler: ctrl.getAlwaysBuyGoodsList
})

module.exports.getAfterCareGoodsList = new ApiRouter({
  name: 'getAfterCareGoodsList',
  method: 'get',
  summary: 'GetAfterCareGoods',
  schema: 'GetAfterCareGoods',
  description: '',
  tags: ['Main'],
  isPublic: true,
  responses: {
    200: {description: 'Success'},
    400: {description: 'Invalid data'}
  },
  handler: ctrl.getAfterCareGoodsList
})

module.exports.getNowTopGoodsList = new ApiRouter({
  name: 'getNowTopGoodsList',
  method: 'get',
  summary: 'GetNowTopGoods',
  schema: 'GetNowTopGoods',
  description: '',
  tags: ['Main'],
  isPublic: true,
  responses: {
    200: {description: 'Success'},
    400: {description: 'Invalid data'}
  },
  handler: ctrl.getNowTopGoodsList
})

module.exports.getWeeklyGoodsList = new ApiRouter({
  name: 'getWeeklyGoodsList',
  method: 'get',
  summary: 'GetWeeklyGoods',
  schema: 'GetWeeklyGoods',
  description: '',
  tags: ['Main'],
  isPublic: true,
  responses: {
    200: {description: 'Success'},
    400: {description: 'Invalid data'}
  },
  handler: ctrl.getWeeklyGoodsList
})

module.exports.getExposedCategoriesList = new ApiRouter({
  name: 'getExposedCategoriesList',
  method: 'get',
  summary: 'GetExposedCategory',
  schema: 'GetExposedCategory',
  description: '',
  tags: ['Main'],
  isPublic: true,
  responses: {
    200: {description: 'Success'},
    400: {description: 'Invalid data'}
  },
  handler: ctrl.getExposedCategoriesList
})

module.exports.getExhibitionList = new ApiRouter({
  name: 'getExhibitionList',
  method: 'get',
  summary: 'GetExhibitionMain',
  schema: 'GetExhibitionMain',
  description: '',
  tags: ['Main'],
  isPublic: true,
  responses: {
    200: {description: 'Success'},
    400: {description: 'Invalid data'}
  },
  handler: ctrl.getExhibitionList
})

// module.exports.getList = new ApiRouter({
//   name: '',
//   method: 'get',
//   summary: 'Get Main List',
//   schema: 'GetMainList',
//   description: '',
//   tags: ['Main'],
//   isPublic: true,
//   responses: {
//     200: {description: 'Success'},
//     400: {description: 'Invalid data'}
//   },
//   handler: ctrl.getList
// })