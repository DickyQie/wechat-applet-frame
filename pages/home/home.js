const app = getApp()
var util = require('../../utils/md5.js')
var zhmd5 = require('../../utils/zhmd5.js')

var timestamp = new Date().getTime().toString()

var appid = app.globalData.appid
var appkey = app.globalData.appkey

Page({

 

  /**
   * 页面的初始数据
   */
  data: {
   
    time: timestamp,
    //token: util.hexMD5(appid + appkey + timestamp.slice(0, 6)),
    token: zhmd5.md5(appid + appkey + timestamp.slice(0, 6)),

    imageUrl: [
      { 
        id: '103244',
        image: "https://cugeng.cn/data/attachment/image/photo/2017/10/20171026151921284286.jpg"
      },
      {
        id: '103263',
        image: "https://cugeng.cn/data/attachment/image/photo/2017/10/20171030090448480168.jpg"
      },
      {
        id: '235',
        image: "https://cugeng.cn/data/attachment/image/photo/2017/10/20171030090458534821.jpg"
      }
    ],
   
    menu: [
      {
        id: 1,
        url: "../image/cg_supermarket.png",
        name: "美丽超市",
      },
      {
        id: 2,
        url: "../image/cg_preferred.png",
        name: "真心想要",

      },
      {
        id: 3,
        url: "../image/office_supplies.png",
        name: "显示秒杀",

      },
      {
        id: 4,
        url: "../image/business_shop.png",
        name: "商品店铺",
      }
    ],
  },

  requestData: function (appid, token, itype, callback, offset, count){
    wx.request({
      url: "https://cg.liaidi.com/?",
      method: "POST",//GET
      data: {
        m: 'api',
        appid: appid,
        token: token,
        c: itype,
        a: 'batchget',
        offset: offset,
        count: count
      },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded', //POST
        //'content-type': 'application/json' //GET
      },
      success: function (res) {
        console.log(res.data.data)
        callback(res.data.data)
      }
    })
  },


  goodList: function (data){
    this.setData({
      dataList: data,

    })
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
 
    this.requestData(appid, this.data.token, "item", this.goodList,'','')

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