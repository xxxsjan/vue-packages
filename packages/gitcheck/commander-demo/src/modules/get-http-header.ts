import axios, { AxiosResponse } from 'axios';
import ora from 'ora';
// setTimeout(() => {
//   spinner.color = 'yellow';
//   spinner.text = 'Loading rainbows';
// }, 1000);

function printObj(obj, deep = 0) {
  if (deep == 5) return;
  if (deep == 0) {
    console.log('\n');
  }
  const kong = '  ';
  for (let key in obj) {
    const keyStr = deep == 0 ? kong.repeat(deep) + key : kong.repeat(deep) + '└─' + key;
    console.log(keyStr);
    if (typeof obj[key] === 'object') {
      printObj(obj[key], deep + 1);
    } else if (typeof obj[key] === 'function') {
      continue;
      console.log(obj[key]['name'] + '(Function)');
    } else {
      console.log(kong.repeat(deep + 1) + '└─' + obj[key]);
    }
  }
}
const IPV4: string = 'https://api.ipify.org';
export default async function getHttpHeader(options) {
  // console.log(options);
  const { url = IPV4 } = options;
  const spinner = ora('http 请求中').start();

  const res = await axios.get(url);
  spinner.stop();
  // options.header && console.log(JSON.stringify(res.headers, null, 2));
  res.headers && printObj(res.headers);
}
