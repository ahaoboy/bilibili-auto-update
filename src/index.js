import {enc, dec} from "./util";
import {env} from "process";
import {getHotList, like} from "./util";


// console.log('env', env)
// console.log('BILIBILI_COOKIE', env.BILIBILI_COOKIE)
//
// console.log('hello')
// console.log(enc(498566183))
// console.log(dec('BV1AK411W7wq'))
console.log(getHotList())
const hotList = getHotList()

const promiseList = hotList.map(
  aid => like(aid)
)

async function main() {
  let resp = await promiseList
  console.log(resp)
  console.log('hotList', hotList)
}

main()
