'use strict'
const s3 = require('../../../components/s3')
const uuid = require('uuid/v4')
const config = require('../../../config')
const db = require('../../../components/db')
const util = require('../../../components/util')
// const axios = require('axios')
var mime = require('mime-types')

const { Client } = require('@elastic/elasticsearch')
const client = new Client({ node: 'https://7ca8bf5396474208ae836fd6d65b9190.ap-northeast-1.aws.found.io:9243' 
                          , auth: {
                                username: 'elastic',
                                password: 'KSAVTnP3hnnHgOT8qU0HcXbB'
                            }
})

module.exports.insert = async(req,res,next) => {
  try{
    const srch_kw = req.options.srch_kw
    // const message = req.options.message
    console.log('srch_kw : ',srch_kw)

    var date = new Date().toLocaleString("en-US", {timeZone: "Asia/Seoul"});
    console.log('date : ',date)
    let editedDate = new Date(date);
    console.log('editedDate : ',editedDate)
    let currentTime = util.getCurrentTimeES()
    console.log('currentTime : ',currentTime)
    var offset = new Date().getTimezoneOffset();
    console.log('offset : ',offset)


    client.index({
      index: 'search_keyword_test'
      ,body: {
            "srch_kw"           : srch_kw
          , "timestamp"         : currentTime
          , "cust_idx"          : ""
          , "sex"               : ""
          , "ovs_resint_or_not" : ""
          , "age"               : ""
          , "zipcode"           : ""
      }
    }, (err, result) => {
        if (err) console.log(err)
        console.log(result)
        res.status(200).json(result)
    })
    
  }
  catch(err){
    next(err)
  }
}

module.exports.get = async(req,res,next) => {
  try{
    console.log('get keyword srch_kw')
    const srch_kw = req.options.srch_kw
    // const message = req.options.message
    console.log('get keyword srch_kw : ',srch_kw)
    client.search({
      index: 'search_keyword_test',
      body: {
          // "query": {
          //     "match": {
          //       "srch_kw" : srch_kw
          //     }
          // }

          "query": {
            "bool": {
              "must": [
                {
                  "match": {
                    "srch_kw" : {
                      "query": srch_kw,
                      "operator": "and"
                    }
                  }
                },
                {
                  "range": {
                    "timestamp":{
                      "gt": "now-1M/M"
                    }
                  }
                }
              ],
              "should": [
                {
                  "match_phrase": {
                    "srch_kw" : {
                      "query": srch_kw,
                      "slop" : 2
                    }
                  }
                }
              ]
            }
          },
          // "size": 0,
          "aggs": {
            "srch_kw": {
              "terms": {
                "field": "srch_kw.keyword"
              }
            }
          }
      }
    }, (err, result) => {
          if (err) console.log(err)
          // console.log("result : ",result.body.hits)
          // console.log(result.body.hits.hits)
          // res.status(200).json(result.body.hits.hits)
          res.status(200).json(result.body.aggregations.srch_kw.buckets)
    })
      
  }
  catch(err){
    next(err)
  }
}


module.exports.realtime = async(req,res,next) => {
  try{
    console.log('get realtime')
    client.search({
      index: 'search_keyword_test',
      body: {
          // "query": {
          //     "match": {
          //       "srch_kw" : srch_kw
          //     }
          // }

          "query": {
            "range": {
              "timestamp":{
                "gt": "now+9h-15m"
              }
            }
          },
          // "size": 0,
          "aggs": {
            "srch_kw": {
              "terms": {
                "field": "srch_kw.keyword"
              }
            }
          }
      }
    }, (err, result) => {
          if (err) {
            console.log(err)
            next(err)
          }
          // console.log("result : ",result)
          // console.log(result.body.hits.hits)
          // console.log(result.body.aggregations.srch_kw)
          // res.status(200).json(result.body.hits.hits)
          res.status(200).json(result.body.aggregations.srch_kw.buckets)
    })
      
  }
  catch(err){
    next(err)
  }
}