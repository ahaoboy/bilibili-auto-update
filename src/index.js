import {enc, dec} from "./util";
import {env} from "process";

console.log('env', env)
console.log('BILIBILI_COOKIE', env.BILIBILI_COOKIE)

console.log('hello')
console.log(enc(498566183))
console.log(dec('BV1AK411W7wq'))
