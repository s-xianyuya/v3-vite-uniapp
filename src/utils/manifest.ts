const execSync = require('child_process')
const fs = require('fs')
const path = require('path')
let versionCode = '0.0.1'
try {
  const execSync = require('child_process').execSync // 同步子进程
  const commit = execSync('git show -s --format=%d').toString().trim()
  versionCode = String(commit.match(/\d+(?:\.\d+)*\b/))
} catch (e) {
  versionCode = '0.0.1'
}
console.log('读取git版本号:' + versionCode)
/**
 * 环境publicPath配置
 * prod----线上
 * qa----测试
 * @type {{qa: string, prod: string}}
 */
const paths = {
  qa: 'https://schbrain-static-dev.schbrain.com/schbrain/frontend/dingtalk/dingtalk-classlog/' + versionCode + '/build/h5',
  prod: 'https://schbrain-static-online.schbrain.com/schbrain/frontend/dingtalk/dingtalk-classlog/' + versionCode + '/build/h5'
}
console.log('当前：' + process.env.VUE_APP_ENV)
const publicPath = process.env.VUE_APP_ENV === 'online' ? paths.prod : paths.qa
const data = {
  name : '',
  appid : '',
  description : '',
  versionName : '1.0.0',
  versionCode : '100',
  transformPx : false,
  /* 5+App特有相关 */
  'app-plus' : {
    usingComponents : true,
    nvueStyleCompiler : 'uni-app',
    compilerVersion : 3,
    splashscreen : {
      alwaysShowBeforeRender : true,
      waiting : true,
      autoclose : true,
      delay : 0
    },
    /* 模块配置 */
    modules : {},
    /* 应用发布信息 */
    distribute : {
      /* android打包配置 */
      android : {
        permissions : [
          "<uses-permission android:name=\"android.permission.CHANGE_NETWORK_STATE\"/>",
          "<uses-permission android:name=\"android.permission.MOUNT_UNMOUNT_FILESYSTEMS\"/>",
          "<uses-permission android:name=\"android.permission.VIBRATE\"/>",
          "<uses-permission android:name=\"android.permission.READ_LOGS\"/>",
          "<uses-permission android:name=\"android.permission.ACCESS_WIFI_STATE\"/>",
          "<uses-feature android:name=\"android.hardware.camera.autofocus\"/>",
          "<uses-permission android:name=\"android.permission.ACCESS_NETWORK_STATE\"/>",
          "<uses-permission android:name=\"android.permission.CAMERA\"/>",
          "<uses-permission android:name=\"android.permission.GET_ACCOUNTS\"/>",
          "<uses-permission android:name=\"android.permission.READ_PHONE_STATE\"/>",
          "<uses-permission android:name=\"android.permission.CHANGE_WIFI_STATE\"/>",
          "<uses-permission android:name=\"android.permission.WAKE_LOCK\"/>",
          "<uses-permission android:name=\"android.permission.FLASHLIGHT\"/>",
          "<uses-feature android:name=\"android.hardware.camera\"/>",
          "<uses-permission android:name=\"android.permission.WRITE_SETTINGS\"/>"
        ]
      },
      /* ios打包配置 */
      ios : {},
      /* SDK配置 */
      sdkConfigs : {}
    }
  },
  /* 快应用特有相关 */
  quickapp : {},
  /* 小程序特有相关 */
  'mp-weixin' : {
    appid : '',
    setting : {
      urlCheck : false
    },
    usingComponents : true
  },
  'mp-alipay' : {
    usingComponents : true
  },
  'mp-baidu' : {
    usingComponents : true
  },
  'mp-toutiao' : {
    usingComponents : true
  },
  h5: {
    /* "publicPath": "https://www.name.com/alioss/0.0.1" */
    devServer: {
      port: 8080,
      disableHostCheck: true,
      proxy: {
        '/api': {
          target: 'http://192.168.5.92:8092/', // 请求的目标域名
          changeOrigin: true,
          secure: false,
          pathRewrite: { // 使用代理； 告诉他你这个连接要用代理
            '^/api': '/'
          }
        }
      }
    },
    publicPath: publicPath,
    title: 'v3-vite-uniapp',
    router: {
      mode: 'history',
      base: '/demo'
    },
    async: {
      loading: '',
      delay: 200,
      timeout: 10000
    },
    optimization: {
      treeShaking: {
        enable: false
      }
    }
  },
  uniStatistics: {
    enable: false
  },
  vueVersion : '3'
}

console.log(`uni-app: publicPath-${
  process.env.VUE_APP_ENV === 'online' ? '正式环境' : '测试环境' 
}:${ publicPath }`)
fs.writeFile(
  path.join(__dirname, '../manifest.json'),
  JSON.stringify(data),
  () => (console.log('manifest.json 配置文件更新成功'))
)
