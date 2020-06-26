import {env} from "process";
const BILIBILI_COOKIE = env.BILIBILI_COOKIE
const headers = {
  "origin": "https://www.bilibili.com",
  "referer": "https://www.bilibili.com/video/BV1HK411575w?spm_id_from=333.851.b_62696c695f7265706f72745f646f756761.2",
  "accept-encoding": "gzip, deflate, br",
  "accept-language": "zh-CN,zh;q=0.9,en;q=0.8",
  "content-length": "94",
  "accept": "*/*",
  "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
  "sec-fetch-dest": "empty",
  "sec-fetch-mode": "cors",
  "sec-fetch-site": "same-site",
  'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.106 Safari/537.36',
  'cookie': BILIBILI_COOKIE
}
const s = headers['cookie']

let re = /bili_jct=(.*?);/;
let list = re.exec(s);
const csrf = list[1];
// const csrf = '';
export {
  headers,
  csrf
}
