//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    blogList: null,
    categories:null,
    currentTab: 0
  },

  //加载小程序时获取博客列表和分类数据
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
    }),
    wx.request({
      url:"http://clownz.xyz:8443/api/categories",
      success:function(res){
        if(res.data.code === 200){
          _this.setData({
            categories: res.data.data
          })
          console.log(_this.data.categories)
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
  },
  //点击导航栏切换页面
  swichNav: function (e) {
    let _this = this
    if (_this.data.currentTab === e.target.dataset.current) {
      return false
    } else {
      _this.setData({
        currentTab: e.target.dataset.current
      })
    }
  },
  //切换页面时更新currentTab
  swiperChange: function (e) {
    this.setData({
      currentTab: e.detail.current
    })
  },
})