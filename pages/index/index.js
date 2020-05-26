//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    blogList: null
  },

  //加载小程序时获取博客数据
  onLoad: function () {
    let _this = this
    wx.request({
      url: "http://rogerblog.ren:8443/api/articles",
      success: function (res) {
        if (res.data.code === 200) {
          _this.setData({
            blogList: res.data.data.content
          })
        }
      },
      fail: function (res) {
        console.log(res)
      }
    })
  },
  //点击博客列表跳转到博客详情
  goDetails(e){
    wx.navigateTo({
      url: '../blogDetails/blogDetails',
      success:function(res){
        res.eventChannel.emit('acceptDataFromOpenerPage', {data:e.currentTarget.dataset.item})
      }
    })
  }
})