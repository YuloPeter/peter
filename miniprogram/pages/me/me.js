// pages/me/me.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:{
        avatarUrl:'',
        nickName:'点击登录'
    },
  },
  tapLogin(){
    wx.getUserProfile({
      desc: '获取微信用户信息',
      success:(res)=>{
          console.log('获取成功',res)
        this.setData({
            userInfo:res.userInfo,
            islogin:true
        })
      },
      fail:(err)=>{
          console.log('获取失败',err)
      }
    })
  },
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})