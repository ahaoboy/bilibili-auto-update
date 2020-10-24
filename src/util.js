const table = 'fZodR9XQDSUm21yCkr6zBqiveYah8bt4xsWpHnJE7jL5VG3guMTKNPAwcF'
const tr = table.split('').reduce(
  (pre, v, i) => {
    pre[table[i]] = BigInt(i)
    return pre
  }, []
)

const s = [11, 10, 3, 8, 4, 6].map(i => BigInt(i))
const xor = BigInt(177451812);
const add = BigInt(8728348608)
const NUM_58 = BigInt(58)

export function dec(x) {
  let r = BigInt(0);
  for (let i = 0; i < 6; i++) {
    r += tr[x[s[i]]] * NUM_58 ** BigInt(i);
  }
  let res = (r - add) ^ xor
  return res.toString();
}


export function enc(x) {
  x = BigInt(x)
  x = (x ^ xor) + add
  let r = 'BV1  4 1 7  '.split('')
  for (let i = 0; i < 6; i++) {
    r[s[i]] = table [x / NUM_58 ** BigInt(i) % NUM_58]
  }
  return r.join('')
}

const $ = require('cheerio')

import sampleSize from 'lodash-es/sampleSize'

export async function getHotList(size = 5) {
  const html = await getHtml()
  let dom = $.load(html)
  let links = dom('div.info-box>a')
  let hotList = links.map(
    (i, el) => {
      let href = el.attribs.href
      return href.split('/').pop()
    }
  ).toArray()
  return sampleSize(hotList, size)
}

const axios = require('axios')
const qs = require('qs');
axios.interceptors.request.use(function (config) {
  if (config.method === 'post') {
    config.data = qs.stringify(config.data)
  }
  return config;
}, function (error) {
  return Promise.reject(error);
});

const bilibili_url = 'https://www.bilibili.com/'
import {headers, csrf} from "./headers";

export async function getHtml(url = bilibili_url) {
  const headers = {
    "accept": "*/*",
    "accept-language": "zh-CN,zh;q=0.9,en;q=0.8",
    "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-site",
    "referrer": "https://www.bilibili.com",
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.106 Safari/537.36',
  }
  const resp = await axios.get(url, {headers})
  return resp.data
}

// 点赞
export async function like(aid, like = 1) {
  headers['referer'] = `https://www.bilibili.com/video/${enc(aid)}`
  const data = {
    aid, //498566183 497918057
    like, // 1 点赞,2 取消点赞
    csrf
  }

  const url = 'https://api.bilibili.com/x/web-interface/archive/like'
  let resp = await axios.post(
    url, data, {headers},
  )
  return resp.data
}

// 投币
export async function coin(aid, multiply = 1, select_like = 0) {
  const url = "https://api.bilibili.com/x/web-interface/coin/add"
  headers['referer'] = `https://www.bilibili.com/video/${enc(aid)}`
  const data = {
    aid, // av的id号
    multiply,  // 硬币数目
    select_like, // 是否同时喜欢
    cross_domain: true, // 跨域
    csrf
  }
  let resp = await axios.post(
    url, data, {headers},
  )
  return resp.data
}

export async function logEveryDay() {
  const url = 'https://data.bilibili.com/log/web'
  return await axios.post(
    url, {}, {headers},
  )
}
