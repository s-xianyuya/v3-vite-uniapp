const fs2 = require('fs')
const path2 = require('path')
const pages = require('../router/index.ts')
const data2 = {
  easycom: {
  },
  pages,
  globalStyle: {
    maxWidth: 1000,
    rpxCalcMaxDeviceWidth: 500,
    // #ifndef APP-PLUS
    navigationStyle: 'custom',
    // #endif
    navigationBarTextStyle: 'black',
    navigationBarBackgroundColor: '#FFFFFF',
    backgroundColor: '#FFFFFF'
  }
}
fs2.writeFile(
  path2.join(__dirname, '../pages.json'),
  JSON.stringify(data2),
  () => (console.log('pages.json 配置文件更新成功'))
)
module.exports = {}
