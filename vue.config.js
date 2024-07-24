const { defineConfig } = require('@vue/cli-service')

const path = require('path')

module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave : false,  // lint 할지
  chainWebpack: config => {
    config.resolve.alias
      .set('@', path.resolve(__dirname, 'src/'))
  },
  devServer: {  // 개발서버의 설정을 지정
    
    //모바일에서 로컬pc 접속했을때 자꾸 cors떠서 proxy 처리 해놓음 나중에 확인해야할듯
    proxy: { // proxyTable 설정
        '/api': { // api 로 시작하는 소스 는 traget으로 잡아준다. > 사용할때 url 이 api 가 있어야 한다.
            target: process.env.VUE_APP_BACKEND_HOST, // www.xxx.com
            changeOrigin: true
        },
    }
  },
})
