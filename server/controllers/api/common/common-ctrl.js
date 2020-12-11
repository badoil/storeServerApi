'use strict'
const s3 = require('../../../components/s3')
const uuid = require('uuid/v4')
const config = require('../../../config')
const db = require('../../../components/db')
const util = require('../../../components/util')
// const axios = require('axios')
var mime = require('mime-types')

const { Client } = require('@elastic/elasticsearch')
const client = new Client({ node: config.elasticSearch.node 
                           , auth: {
                                username: config.elasticSearch.username,
                                password: config.elasticSearch.password
                            }
})


module.exports.getImageUrl = async (req, res, next) => {
  try {
    console.log('getUserImageUrl : ', req.options)
    const {mimetype, idType, id, extension, filename} = req.options
    console.log('mimetype : ',mimetype)
    let path =`images/cloi.jpg`
    let finalFile = `${filename}.${extension}`;
    // let path = `test.png`
    const url = s3.generatePreSignedUrl({
      key: path,
      mimetype: mimetype
    })
    console.log('cloi.jpg')
    // path = type === 'chat' ? `${config.aws.s3.frontPath}/${path}` : path
    res.status(200).json({url, path})
  }
  catch (err) {
    next(err)
  }
}

module.exports.authNumSend = async(req,res,next) => {
  try{
    const receiver = req.options.receiver
    // const message = req.options.message

    let firstNum = Math.ceil(Math.random(9)*10)
    if(firstNum>9)
      firstNum -= 1 
    
    const min = Math.ceil(100)
    const max = Math.floor(1000)
    const rest = Math.ceil(Math.random() * (max - min) + min)
    
    const authNum = String(firstNum)+String(rest)

    const AuthData = {
      key: config.alligo.key,
    // 이곳에 발급받으신 api key를 입력하세요
      user_id: config.alligo.user_id,
    // 이곳에 userid를 입력하세요
    }
    req.body = {
      sender: config.alligo.sender,  // (최대 16bytes)
      receiver: receiver, // 컴마()분기 입력으로 최대 1천명
      msg: `인증번호는 ${authNum} 입니다`	// (1~2,000Byte)
    }
    
    if(process.env.NODE_ENV === 'development'){
      aligoapi.send(req,AuthData)
      .then((r)=>{
        console.log('alligo',r)
        res.status(200).json({result:authNum})
      })
      .catch((e)=>{
        console.error('err',e)
        res.status(200).send(e)
      })
    }else{
      // console.log(2)
      res.status(200).json({result:authNum})
    }
    
  }
  catch(err){
    next(err)
  }
}



// module.exports.search = async(req,res,next) => {
//   try{
//     const srch_kw = req.options.srch_kw
//     // const message = req.options.message
//     console.log('srch_kw : ',srch_kw)

//     var date = new Date().toLocaleString("en-US", {timeZone: "Asia/Seoul"});
//     console.log('date : ',date)
//     date = new Date(date);
//     console.log('date : ',date)
//     var offset = new Date().getTimezoneOffset();
//     console.log('offset : ',offset)
//     client.index({
//       index: 'search_keyword_test'
//       ,body: {
//             "srch_kw"           : srch_kw
//           , "timestamp"         : date
//           , "cust_idx"          : ""
//           , "sex"               : ""
//           , "ovs_resint_or_not" : ""
//           , "age"               : ""
//           , "zipcode"           : ""
//       }
//     }, (err, result) => {
//         if (err) console.log(err)
//         console.log(result)
//         res.status(200).json(result)
//     })
    
//   }
//   catch(err){
//     next(err)
//   }
// }

module.exports.search = async(req,res,next) => {
  try{
    console.log('get keyword srch_kw')
    const srch_kw = req.options.srch_kw
    const size = req.options.srch_cnt ? req.options.srch_cnt : 36
    let page = req.options.page
    if (!page || page < 0) {
        page = 1
    }
    let offset = (page - 1) * size
    // console.log('offset : ',offset)
    // console.log('get keyword srch_kw : ',srch_kw)
    client.search({
      index: 'deal_test',
      body: {        
        "size" : size,
        "from" : offset,
        "query": {
          "bool": {
            "must": [
              {
                "match": {
                  "deal_name": srch_kw
                }
              }
            ],
            "should": [
              {
                "match_phrase": {
                  "deal_name" : {
                    "query": srch_kw,
                    "slop" : 10
                  }
                }
              },
              {
                "match": {
                  "deal_name" : {
                    "query": srch_kw,
                    "operator": "and"
                  }
                }
              }
            ]
          }
        }
      }  
    }, (err, result) => {
          if (err) console.log(err)
          // console.log("result : ",result)
          // console.log("total : ",result.body.hits.total.value)
          // console.log(result.body.hits.hits)
          const deals = result.body.hits.hits
          const pagenation = util.makePageData(result.body.hits.total.value,req.options.page,req.options.srch_cnt)
          // console.log("pagenation : ",pagenation)
          res.status(200).json({
            deals,
            pagenation,
            srch_kw
          })
          // res.status(200).json(result.body.aggregations.srch_kw.buckets)
    })      
  }
  catch(err){
    next(err)
  }
}

module.exports.relatedKeyword = async(req,res,next) => {
  try{
    console.log('get relatedKeyword srch_kw')
    const srch_kw = req.options.srch_kw
    const size = req.options.srch_cnt ? req.options.srch_cnt : 36
    let page = req.options.page
    if (!page || page < 0) {
        page = 1
    }
    let offset = (page - 1) * size
    // console.log('offset : ',offset)
    // console.log('get keyword srch_kw : ',srch_kw)
    client.search({
      index: 'search_keyword_test',
      body: {        
        "query": {
          "bool": {
            "must": [
              {
                "match": {
                  "srch_kw": "마스크"
                }
              }
            ],
            "should": [
              {
                "match_phrase": {
                  "srch_kw" : {
                    "query": "마스크",
                    "slop" : 10
                  }
                }
              },
              {
                "match": {
                  "srch_kw" : {
                    "query": "마스크",
                    "operator": "and"
                  }
                }
              }
            ]
          }
        },
        "size": 0,
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
          console.log("result : ",result)
          console.log("total : ",result.body.aggregations.srch_kw)
          // console.log(result.body.hits.hits)
          // const deals = result.body.hits.hits
          // const pagenation = util.makePageData(result.body.hits.total.value,req.options.page,req.options.srch_cnt)
          // // console.log("pagenation : ",pagenation)
          // res.status(200).json({
          //   deals,
          //   pagenation,
          //   srch_kw
          // })
          // res.status(200).json(result.body.aggregations.srch_kw.buckets)
    })      
  }
  catch(err){
    next(err)
  }
}