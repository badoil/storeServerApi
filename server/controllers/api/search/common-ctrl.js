'use strict'
const s3 = require('../../../components/s3')
const uuid = require('uuid/v4')
const config = require('../../../config')
const db = require('../../../components/db')
const util = require('../../../components/util')
// const axios = require('axios')
var mime = require('mime-types')

const { Client } = require('@elastic/elasticsearch')
const { round } = require('lodash')
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
    const { 
      srch_kw
      , brand_name_array
      , free_deliv_or_not
      , minPrice
      , maxPrice
      , rating
      , ac_app_or_not
      , today_deliv_dl_time
     }= req.options
    const size = req.options.srch_cnt ? req.options.srch_cnt : 36
    let page = req.options.page
    if (!page || page < 0) {
        page = 1
    }
    let offset = page * size

    const sort_keyword = req.options.sort_keyword
    let sortObj = {

    };

    var date = new Date().toLocaleString("en-US", {timeZone: "Asia/Seoul"});
    // console.log('date : ',date)
    let editedDate = new Date(date);
    // console.log('editedDate : ',editedDate)
    let currentTime = util.getCurrentTimeES()
    // console.log('currentTime : ',currentTime)
    // var offset = new Date().getTimezoneOffset();
    // console.log('offset : ',offset)


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
        // res.status(200).json(result)
        switch(sort_keyword){
          case "랭킹순":
            sortObj = {
              
            }
            break;
          case "낮은가격순":
            sortObj = {
              "sel_price": {"order" : "asc"}
            }
            break;
    
          case '높은가격순':
            sortObj = {
              "sel_price": {"order" : "desc"}
            }
            break;
    
          case '리뷰많은순':
            sortObj = {
              "review_cnt": {"order" : "desc"}
            }
            break;
    
          case '최신순':
            sortObj = {
              "last_mod_dt_time": {"order" : "desc"}
            }
            break;
        }
        console.log('page : ',page)
        console.log('offset : ',offset)
        console.log('get keyword srch_kw : ',srch_kw)

        let mustArray = []
        let shouldArray = []
        mustArray.push({
          "match": {
            "deal_name": srch_kw
          }
        })

        let freeObj = {}


        
        if(free_deliv_or_not){
          freeObj = {
            "match": {
              "free_deliv_or_not": 1 // 1.무료배송
            }
          }        
          mustArray.push(freeObj)
        }
        let currentTime = util.getCurrentTime()
        let time = currentTime.split(" ")[1].split(":")[1]
        console.log('time : ',time)
        if(today_deliv_dl_time){
          let todayObj = {
            "range": {
              "today_deliv_dl_time": {
                "gte": 0,
                "lte": time
              }
            }
          }
          mustArray.push(todayObj)
        }

        if(ac_app_or_not){
          let acObj = {
            "match": {
              "ac_app_or_not": ac_app_or_not 
            }
          }
          mustArray.push(acObj)
        }


        let priceObj = {}
        if(minPrice && maxPrice){
          priceObj = {
            "range": {
              "sel_price": {
                "gte": minPrice,
                "lte": maxPrice+1
              }
            }
          }
          mustArray.push(priceObj)
        }

        if (rating){
          let ratingObj = {
            "range": {
              "review_rating": {
                "gte": rating,
                "lte": 5
              }
            }
          }
          mustArray.push(ratingObj)
        }
        

        shouldArray.push({
          "match_phrase": {
            "deal_name" : {
              "query": srch_kw,
              "slop" : 10
            }
          }
        })
        shouldArray.push({
          "match": {
            "deal_name" : {
              "query": srch_kw,
              "operator": "and"
            }
          }
        })
        if(brand_name_array){
          for (let i=0;i<brand_name_array.length;i++){
            let brandObj = {
              "match": {
                "brand_name" : {
                  "query": brand_name_array[i],
                  "operator": "or"
                }
              }
            }
            shouldArray.push(brandObj)
          }          
        }
        client.search({
          index: 'deal_test',
          body: {                    
              "size" : size,
              "from" : page,
              "query": {
                "bool": {
                  "must": mustArray,
                  "should": shouldArray
                }
              },
               "sort" : [
                  sortObj
                // {"sel_price": {"order" : "desc"}}   //낮은 가격순
                // {"sel_price.integer": {"order" : "desc"}},  //높은 가격순
                // {"review_cnt.integer": {"order" : "desc"}},  //리뷰많은순
                // {"last_mod_dt_time.date": {"order" : "desc"}}  //최신순
              ],
              "aggs": {
                // "Free_Delivery_Filter": {
                //   "terms": {
                //     "field": "free_deliv_or_not.keyword",
                //     "size": 10
                //   }
                // },
                // "Aftercare_Filter": {
                //   "terms": {
                //     "field": "ac_app_or_not.keyword",
                //     "size": 10
                //   }
                // },
                // "Category_Filter": {
                //   "terms": {
                //     "field": "category.keyword",
                //     "size": 10
                //   }
                // },
                "Brand_Filter": {
                  "terms": {
                    "field": "brand_name.keyword",
                    "size": 10
                  }
                },
                "sellpric_stats": {
                  "stats": {
                    "field": "sel_price"
                  }
                }
                // "Rating_Filter": {
                //   "range": {
                //     "field": "review_rating.float",
                //     "ranges": [
                //       {
                //         "from": 0,
                //         "to": 1
                //       },
                //       {
                //         "from": 1,
                //         "to": 2
                //       },
                //       {
                //         "from": 2,
                //         "to": 3
                //       },
                //       {
                //         "from": 3,
                //         "to": 4
                //       },
                //       {
                //         "from": 4
                //       }
                //     ]
                //   }
                // },
                // "Price_Filter": {
                //   "range": {
                //     "field": "sel_price.integer",
                //     "ranges": [
                //       {
                //         "from": 0,
                //         "to": 24000
                //       },
                //       {
                //         "from": 24000,
                //         "to": 47000
                //       },
                //       {
                //         "from": 47000,
                //         "to": 60000
                //       },
                //       {
                //         "from": 60000
                //       }
                //     ]
                //   }
                // }
              }
          }  
        }, (err, result) => {
              if (err) console.log(err)
              // console.log("result : ",result)
              // console.log("total : ",result.body.hits.total.value)
              // console.log(result.body.hits.hits)
              const deals = result.body.hits.hits
              const aggregations = result.body.aggregations
              const pagenation = util.makePageData(result.body.hits.total.value,req.options.page,req.options.srch_cnt)
              // console.log("pagenation : ",pagenation)

              client.search({
                index: 'deal_test',
                body: {                    
                    "size" : size,
                    "from" : page,
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
                    },
                     "sort" : [
                        sortObj
                      
                    ],
                    "aggs": {                      
                      "Brand_Filter": {
                        "terms": {
                          "field": "brand_name.keyword",
                          "size": 10
                        }
                      },
                      "sellpric_stats": {
                        "stats": {
                          "field": "sel_price"
                        }
                      }
                    }
                }  
              }, (err, result2) => {
                    if (err) console.log(err)
                    // console.log("result : ",result)
                    // console.log("total : ",result.body.hits.total.value)
                    // console.log(result.body.hits.hits)


                      const aggregations = result2.body.aggregations
                      const sellpric_stats = aggregations.sellpric_stats
                      console.log('sellpric_stats : ',sellpric_stats)
                      const avg = round(sellpric_stats.avg/100) * 100
                      const min = round(sellpric_stats.min/100) * 100
                      const max = round(sellpric_stats.max/100) * 100
                      const minSec = round((min+avg)/2) 
                      const maxSec = round((max+avg)/2) 
                      // console.log('min : ',min)
                      // console.log('minSec : ',minSec)
                      // console.log('avg : ',avg)
                      // console.log('maxSec : ',maxSec)
                      // console.log('max : ',max)
                      aggregations.priceRange={
                        1:minSec,
                        2:avg,
                        3:maxSec,
                        4:max
                      }
                    // console.log("pagenation : ",pagenation)
                        res.status(200).json({
                          deals,
                          aggregations,
                          pagenation,
                          srch_kw,
                         
                        })
                        // res.status(200).json(result.body.aggregations.srch_kw.buckets)
                  })      
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
   
    client.search({
      index: 'search_keyword_test',
      body: {        
        "query": {
          "bool": {
            "must": [
              {
                "match": {
                  "srch_kw": srch_kw
                }
              }
            ],
            "should": [
              {
                "match_phrase": {
                  "srch_kw" : {
                    "query": srch_kw,
                    "slop" : 10
                  }
                }
              },
              {
                "match": {
                  "srch_kw" : {
                    "query": srch_kw,
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
          res.status(200).json(
            result.body.aggregations.srch_kw
          )
          // res.status(200).json(result.body.aggregations.srch_kw.buckets)
    })      
  }
  catch(err){
    next(err)
  }
}





module.exports.hotKeyword = async(req,res,next) => {
  try{
    console.log('get hotKeyword srch_kw')
    const srch_kw = req.options.srch_kw
   
    client.search({
      index: 'search_keyword_test',
      body: {        
        "query": {
          "timestamp":{
            "gt": "now+9h-15m"
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
          res.status(200).json(
            result.body.aggregations.srch_kw
          )
          // res.status(200).json(result.body.aggregations.srch_kw.buckets)
    })      
  }
  catch(err){
    next(err)
  }
}








