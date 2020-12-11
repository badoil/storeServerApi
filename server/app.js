'use strict'

const express = require('express')
const app = express()
const morgan = require('morgan')
const routes = require('./routes')
const cors = require('cors')
const bodyParser = require('body-parser')
const helmet = require('helmet')
console.log('process.env.NODE_ENV : ',process.env.NODE_ENV)
require('./config')

module.exports = (middlewares) => {
  app.use(cors())
  app.use(bodyParser.json({limit: '10mb'}))
  app.use(bodyParser.urlencoded({extended: true}))
  app.use(morgan('dev'))
  app.use(helmet())

  middlewares.forEach(middleware => {
    app.use(middleware)
  })

  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');

  routes(app, morgan)
  return app
}
