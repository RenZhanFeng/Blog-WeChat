//app.js
App({
  //创建towxml对象，供小程序页面使用
  towxml:require('/towxml/index'),
  onLaunch: function () {},
  globalData: {
    userInfo: null,
    APIURL:"http://clownz.xyz:8443/api/"
  }
})