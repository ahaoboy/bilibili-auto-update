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
  if (config.method == 'post') {
    config.data = qs.stringify(config.data)
  }
  return config;
}, function (error) {
  return Promise.reject(error);
});

const bilibili_url = 'https://www.bilibili.com/'
import {headers, csrf} from "./headers";

export async function getHtml(url = bilibili_url) {
  const resp = await axios.get(url, {headers})
  return resp.data
}

// 点赞
export async function like(aid, like = 1) {
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
export async function coin() {

}
