import {dec, getHotList, like} from "./util";

async function main() {
  const hotList = await getHotList()
  console.log('hotList', hotList)
  const promiseList = hotList.map(
    aid => like(dec(aid))
  )

  let resp = await Promise.all(promiseList);
  console.log('resp', resp)
}

main()
