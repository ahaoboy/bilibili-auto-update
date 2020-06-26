import {env} from "process";
const BILIBILI_COOKIE = env.BILIBILI_COOKIE
// console.log('BILIBILI_COOKIE', BILIBILI_COOKIE)
const headers = {
  "accept": "*/*",
  "accept-language": "zh-CN,zh;q=0.9,en;q=0.8",
  "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
  "sec-fetch-dest": "empty",
  "sec-fetch-mode": "cors",
  "sec-fetch-site": "same-site",
  "referrer": "https://www.bilibili.com",
  'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.106 Safari/537.36',
  'cookie': BILIBILI_COOKIE
}
const s = headers['cookie']

let re = /bili_jct=(.*?);/;
let list = re.exec(s);
// console.log('re', re.exec(s))
const csrf = list[1];
// console.log('csrf', csrf)
export {
  headers,
  csrf
}
