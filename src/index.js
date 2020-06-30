import {dec, enc, getHotList, coin, logEveryDay, like} from "./util";


async function main() {
  const bvList = await getHotList(10)
  const avList = bvList.map(dec)
  console.log('bvList', bvList)
  console.log('avList', avList)
  let count = 0
  for (let i of avList) {
    let resp = await coin(i)
    if (!resp.code) {
      console.log('coin', i, enc(i))
      count++
    }

    if (count >= 5)
      return
  }
  let logResp = await logEveryDay()
  console.log('logResp', logResp)

  // const promiseList = hotList.map(
  //   aid => like(dec(aid))
  // )
  //
  // let resp = await Promise.all(promiseList);
  // console.log('resp', resp)
  // for(let )
}

main()
