'use strict'

const ApiRouter = require('../../default').ApiRouter
const ctrl = require('./customer-ctrl')


module.exports.register = new ApiRouter({
  name: '',
  method: 'post',
  summary: 'Register',
  schema: 'PostCustomer',
  tags: ['customer'],
  description: '',
  isPublic: true,
  responses: {
    200: {description: 'Sign up success'},
    400: {description: 'Invalid data'},
    409: {description: 'Duplicate email'}
  },
  handler: ctrl.register
})

module.exports.signIn = new ApiRouter({
  name: 'signIn',
  method: 'post',
  summary: 'Register',
  schema: 'SignInCustomer',
  tags: ['customer'],
  description: '',
  isPublic: true,
  responses: {
    200: {description: 'Sign In success'},
    400: {description: 'Invalid data'},
    409: {description: 'Duplicate email'}
  },
  handler: ctrl.signIn
})

module.exports.update = new ApiRouter({
  name: '',
  method: 'put',
  summary: 'update User',
  schema: 'UpdateCustomer',
  tags: ['customer'],
  description:'',
  isPublic: true,
  responses: {
    200: {description: 'Success'},
    400: {description: 'Invalid data'}
  },
  handler: ctrl.update
})

module.exports.delete = new ApiRouter({
  name: ':idx',
  method: 'delete',
  summary: 'Delete User',
  schema: 'DeleteCustomer',
  tags: ['customer'],
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
  summary: 'GetUser',
  schema: 'GetCustomer',
  description: '',
  tags: ['customer'],
  isPublic: true,
  responses: {
    200: {description: 'Success'},
    400: {description: 'Invalid data'}
  },
  handler: ctrl.getList
})
