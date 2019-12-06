module.exports = {
  /* 
    如果是生产环境 publicPath '/未来部署的文件夹名字'
    如果是开发环境 publicPath '/'

    process.env.NODE_ENV

    npm run server  这个值是development
    npm run build 这个值是production
  */
  publicPath: process.env.NODE_ENV === 'development' ? '/' : './',
  devServer: {
    // 设置proxy后为你要代理的地址，然后真正的接口访问当前服务器地址http://localhost:8080
    proxy: {
      '':{
        target: 'http://193.168.1.199:11010',//电力
        // target: 'http://193.168.1.199:11020',//水务
        // target: 'http://193.168.1.114:11030',//消防
        // target: 'http://193.168.1.114:11020',//请求的目标地址的baseUrl
        changeOrigin:true, //是否开启跨域
        pathRewrite: {
          
        }
      }
    }
  }
}















/** demo
 *  '/api':{
        target: 'http://193.168.1.12:8081',//请求的目标地址的baseUrl
        changeOrigin:true, //是否开启跨域
        pathRewrite: {
          '^/api':''//规定请求地址以什么作为开头
        }
      }
 * 如果我们要发送请求的路径为http://193.168.1.12:8081/user/login
 * 配置完成之后的请求方式为
 *  this.$http('user/login',{
      username:'admin',
      password:'123456'
    })
 * 那么控制台发送的请求显示的路径为http://193.168.1.12:8081/api/user/login
 * 实际的请求路径为http:193.168.1.12:8081/user/login
*/