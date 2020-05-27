// pages/blogDetails/blogDetails.js
const app = getApp();
Page({
  data: {
    article: null,
    isLoading: true, // 判断是否尚在加载中
    articleContents : {} // 内容数据
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this = this
    //获取从博客列表传过来的文章数据
    const eventChannel = this.getOpenerEventChannel()
    eventChannel.on('acceptDataFromOpenerPage', function (data) {
      _this.setData({
        article: data.data
      })
      //使用TOWXML3插件解析markdown文档
      let result = app.towxml(_this.data.article.articleContentMd, 'markdown', {
        theme: 'light', // 主题，默认`light`
      });
      // 更新解析数据
      _this.setData({
        articleContents: result,
        isLoading: false
      });
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})