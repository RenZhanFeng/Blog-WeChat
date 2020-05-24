//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    blogList: null
  },

  //事件处理函数
  onLoad: function () {
    let _this = this
    wx.request({
      url: "http://rogerblog.ren:8443/api/articles",
      success: function (res) {
        if (res.data.code === 200) { 
          console.log(res.data.data.content)
          _this.setData({
            blogList: res.data.data.content
          })
        }
      },
      fail: function (res) {
        console.log(res)
      }
    })
  }

})