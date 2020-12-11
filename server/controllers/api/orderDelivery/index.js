'use strict'

const ApiRouter = require('../../default').ApiRouter
const ctrl = require('./orderDelivery-ctrl')

module.exports.update = new ApiRouter({
  name: '',
  method: 'put',
  summary: 'update Order',
  schema: 'UpdateOrderDelivery',
  tags: ['OrderDelivery'],
  description:'',
  isPublic: true,
  responses: {
    200: {description: 'Success'},
    400: {description: 'Invalid data'}
  },
  handler: ctrl.update
})

