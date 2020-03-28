const fetch = require('node-fetch')
/**
 *
 * @param {Array} urls 需要请求的url地址
 * @param {number} limit 最大并发请求书
 * @param {Function} callback 全部请求完成后的回调函数
 */
const maxLimitRequest = (urls, limit, callback) => {
  let temUrls = urls.slice()

  const len = urls.length
  let count = 0
  const result = []
  const request = url => {
    console.log(temUrls)
    fetch(url)
      .then(res => {
        count++
        result.push(res)
        const nextUrl = temUrls.shift()
        if (typeof nextUrl !== 'undefined') {
          request(nextUrl)
        }
        if (count === len) {
          callback(result)
        }
      })
      .catch(e => {
        console.log(e)
      })
  }

  for (let i = 0; i < limit; i++) {
    const url = temUrls.shift()
    request(url)
  }
}

const urls = new Array(10)
  .join(',')
  .split(',')
  .map(
    (e, i) => `http://gank.io/api/xiandu/data/id/appinn/count/1/page/${i + 1}`
  )

const callback = result => {
  console.log(result.length)
}

const limit = 5

maxLimitRequest(urls, limit, callback)
