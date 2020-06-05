//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    blogList: null,
    categories: null,
    currentTab: 0,
    isLoading: true, // 判断是否尚在加载中
    navScrollLeft: 0
  },

  //加载小程序时获取博客列表和分类数据
  onLoad: function () {
    this.getBolgLIst()
    this.getCategories()
    wx.getSystemInfo({
      success: (res) => {
        this.setData({
          pixelRatio: res.pixelRatio,
          windowHeight: res.windowHeight,
          windowWidth: res.windowWidth
        })
      },
    })
  },
  //点击博客列表跳转到博客详情
  goDetails(e) {
    wx.navigateTo({
      url: '../blogDetails/blogDetails',
      success: function (res) {
        res.eventChannel.emit('acceptDataFromOpenerPage', {
          data: e.currentTarget.dataset.item
        })
      }
    })
  },
  //点击导航栏切换页面
  swichNav: function (e) {
    let _this = this
    let cur = e.target.dataset.current;
    let singleNavWidth = this.data.windowWidth / 5;
    //控制导航栏的滚动条
    this.setData({
      navScrollLeft: (cur - 2) * singleNavWidth
    })
    //如果点击的是当前的tab，返回false,否则就是更新tab和数据
    if (_this.data.currentTab === cur) {
      return false
    } else {
      _this.setData({
        currentTab: cur
      })
      _this.getBolgLIst(e.target.dataset.id)
    }
  },
  //切换页面时更新currentTab
  swiperChange: function (e) {
    let _this = this
    let cur = e.detail.current;
    let singleNavWidth = this.data.windowWidth / 5;
    this.setData({
      currentTab: cur,
      navScrollLeft: (cur - 2) * singleNavWidth
    })
    _this.getBolgLIst(_this.data.categories[e.detail.current].id)
  },
  getBolgLIst(cid) {
    this.data.isLoading = true
    let _this = this
    let api = !cid || cid == 16 ? `${app.globalData.APIURL}articles` : `${app.globalData.APIURL}articles/cid=${cid}`
    wx.request({
      url: api,
      success: function (res) {
        if (res.data.code === 200) {
          _this.setData({
            blogList: res.data.data.content,
            isLoading: false
          })
        }
      },
      fail: function (res) {
        console.log(res)
      }
    })
  },
  getCategories() {
    let _this = this
    wx.request({
      url: `${app.globalData.APIURL}categories`,
      success: function (res) {
        if (res.data.code === 200) {
          _this.setData({
            categories: res.data.data
          })
        }
      },
      fail: function (res) {
        console.log(res)
      }
    })
  }
})