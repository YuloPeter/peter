// pages/play/play.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        musicId:'',
        action:{
            "method":"play"
        },
        name:"",
        imgurl:"",
        lrcList:[],
        index:-1,
        top:0,
        mode:'loop',
        idlist:'',
        playtime:"00:00",
        timelength:"03:20",
        max:'',
        move:''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        var mid=options.id
        var idliststr=options.idlist
        var idlist=idliststr.split(",")
        // console.log(idlist)
        this.setData({
            musicId:mid,
            idlist
        })
        this.lrcShow()
        this.musicshow()
    },
    musicshow(){
        var mid=this.data.musicId
        var that=this
        wx.request({
          url: 'https://music.163.com/api/song/detail/?id=363488&ids=['+mid+']',
          success: (e) => {
              var name=e.data.songs[0].name
              var imgurl=e.data.songs[0].album.blurPicUrl
              that.setData({
                  name,
                  imgurl
              })
          },
          
        })
    },
    playdate(){
        console.log(this.data.action.method)
        var data=this.data.action.method
        if(data=="play"){
            this.setData({
                action:{
                    "method":"pause"
                }
            })
        }else{
            this.setData({
                action:{
                    "method":"play"
                }
            })
        }
    },
    lrcShow(){
        var mid=this.data.musicId
        var that=this
        var src='http://music.163.com/api/song/lyric?os=pc&id='+mid+'&lv=-1&tv=-1'
        wx.request({
          url: src,
          success:(e)=>{
            var lrcStr=e.data.lrc.lyric
            var lrcstrList=lrcStr.split("\n")
            var lrctimeList=[]
            var re=/\[\d{2}:\d{2}\.\d{2,3}\]/
            for(var i=0;i<lrcstrList.length;i++){
                var date=lrcstrList[i].match(re)
                if(date!=null){
                    var lrc=lrcstrList[i].replace(re,"")
                    // console.log(lrc+"......"+date[0])
                    var timestr=date[0]
                    if(timestr!=null){
                        var timestr_slice=timestr.slice(1,-1)
                        var splitlist=timestr_slice.split(":")
                        var f=splitlist[0]
                        var m=splitlist[1]
                        var time=parseFloat(f)*60+parseFloat(m)
                        lrctimeList.push([time,lrc])
                    }
                }
            }
            that.setData({
                lrcList:lrctimeList
            })
          }
        })
    },
    timechange(e){
         var playtime=e.detail.currentTime
         var lrcList=this.data.lrcList
         for(var i=0;i<lrcList.length-1;i++){
             if(lrcList[i][0]<playtime&&playtime<lrcList[i+1][0]){
                this.setData({
                    index:i
                })
             }
             var index=this.data.index
             if(index>5){
                 this.setData({
                    top:(index-5)*24
                 })
             }
         }
         var timelength=e.detail.duration
         var sum_m=Math.floor(timelength/60)
         var sum_s=Math.floor(timelength%60)
         if(sum_m<10){
             sum_m="0"+sum_m
         }
         if(sum_s<10){
            sum_s="0"+sum_s
        }
        var play_m=Math.floor(playtime/60)
        var play_s=Math.floor(playtime%60)
        if(play_m<10){
            play_m="0"+play_m
        }
        if(play_s<10){
            play_s="0"+play_s
       }
       this.setData({
           playtime:play_m+":"+play_s,
           timelength:sum_m+":"+sum_s,
           max:timelength,
           move:playtime
       })
    },
    changemode(params){
        if(this.data.mode=='loop'){
            this.setData({
                mode:'single'
            })
        }else{
            this.setData({
                mode:'loop'
            })
        }
    },
    changeMusic(){
        var mode=this.data.mode
        if(mode=='single'){
            this.setData({
                musicId:this.data.musicId
            })
            this.setData({
                action:{
                    method:"play"
                }
            })
        }else{
            this.nextSong()
        }
    },
    nextSong(){
        var id=this.data.musicId
        var idlist=this.data.idlist
        var index=-1
        for(var i=0;i<idlist.length;i++){
            if(id==idlist[i]){
                index=i
                break
            }
        }
        if(index==idlist.length-1){
            this.setData({
                musicId:idlist[0]
            })
        }else{
            this.setData({
                musicId:idlist[index+1]
            })
        }
        this.setData({
            action:{
                method:"play"
            }
        })
        this.musicshow()
        this.lrcShow()
    },
    prevSong(){
        var id=this.data.musicId
        var idlist=this.data.idlist
        var index=-1
        for(var i=0;i<idlist.length;i++){
            if(id==idlist[i]){
                index=i
                break
            }
        }
        if(index==0){
            this.setData({
                musicId:idlist[idlist.length-1]
            })
        }else{
            this.setData({
                musicId:idlist[index-1]
            })
        }
        this.setData({
            action:{
                method:"play"
            }
        })
        this.musicshow()
        this.lrcShow()
    },
    sliderchange(e){
        var v=e.detail.value
        // console.log("v")
        // this.setData({
        //     move:v
        // })
        this.setData({
            action:{
                method:'setCurrentTime',
                data:v
            }
        })
        this.setData({
            action:{
                method:'play'
            }
        })
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