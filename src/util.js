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
export async function getHotList(html) {
  let dom = $.load(html)
  let links = dom('div.info-box>a')
  return links.map(
    (i, el) => {
      let href = el.attribs.href
      return href.split('/').pop()
    }
  ).toArray()
}

const axios = require('axios')
// const url = 'https://www.bilibili.com/'

export async function getHtml(url, headers) {
  const resp = await axios.get(url, {headers})
  return resp.data
}
