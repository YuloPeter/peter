// index.js
Page({
    data: {
        background: ['http://p1.music.126.net/vfpVF5HFeRcZhOMvBga6Sg==/109951168131213180.jpg?imageView&quality=89', 'http://p1.music.126.net/7IWCKUbLM35Um6nS7bUJDg==/109951168131220431.jpg?imageView&quality=89', 'http://p1.music.126.net/wfILF9dbzUbtJvfCz61Kfg==/109951168132163688.jpg?imageView&quality=89','http://p1.music.126.net/J3FqU6Lm1tBVjF-XCb8TCg==/109951168131206664.jpg?imageView&quality=89','http://p1.music.126.net/iujVBL0vXTGdH8sVAX30xw==/109951168131192472.jpg?imageView&quality=89'],
        // musiclist:[
        // {"src":"http://p2.music.126.net/Frbn2mQ18NswoanBk-O1wg==/106652627910743.jpg?param=130y130",
        // "musicName":"爱不爱我",
        // "name":"零点乐队",
        // "id":"363488"},
        // {"src":"http://p2.music.126.net/KTo5oSxH3CPA5PBTeFKDyA==/109951164581432409.jpg?param=130y130",
        // "musicName":"句号",
        // "name":"邓紫棋",
        // "id":"1405283464"},
        // {"src":"http://p2.music.126.net/i1p1CCz6PaDF2Gs0RqKJBQ==/109951165349625690.jpg?param=130y130",
        // "musicName":"夏夜最后的烟火",
        // "name":"颜人中",
        // "id":"1482867143"},
        // {"src":"http://p1.music.126.net/kVwk6b8Qdya8oDyGDcyAVA==/1364493930777368.jpg?param=130y130",
        // "musicName":"于是",
        // "name":"邓紫棋",
        // "id":"36198060"},
        // {"src":"http://p2.music.126.net/fkqFqMaEt0CzxYS-0NpCog==/18587244069235039.jpg?param=130y130",
        // "musicName":"光年之外",
        // "name":"邓紫棋",
        // "id":"449818741"},
        // {"src":"http://p2.music.126.net/y3auIzG3qGh2bvP87LNaZw==/109951165544667992.jpg?param=130y130",
        // "musicName":"关键词",
        // "name":"刘思彤",
        // "id":"1804728691"}
        // ]
        musiclist:[],
        word:'',
        ImgUrl_list:[],
        Idlist:[],
        musicSum:6
      },
      play(e){
        // console.log(e.currentTarget.dataset.id)
        var mid=e.currentTarget.dataset.id
        var idlist=this.data.Idlist
        // console.log(idlist)
        wx.navigateTo({
          url: '/pages/play/play?id='+mid+'&idlist='+idlist,
        })
      },
      keychange(e){
          var w=e.detail.value
          this.setData({
              word:w
          })
      },
      search(){
        console.log(this.data.word)
        var w=this.data.word
        var musicSum=this.data.musicSum
        var url="https://music.163.com/api/search/get?s="+w+"&type=1&limit="+musicSum
        var that=this
        var Idlist=[]
        wx.request({
          url: url,
          success:(e)=>{
            var songs=e.data.result.songs
            that.setData({
                musiclist:songs
            })
            for(var i=0;i<songs.length;i++){
                Idlist.push(songs[i].id)
                that.setData({
                    Idlist:Idlist
                })
            }
            that.setData({
                ImgUrl_list:[]
            })
            that.getMusicImage(Idlist,0,Idlist.length)
          }
        })
      },
      getMusicImage(Idlist,i,length){
          var ImgUrl_list=this.data.ImgUrl_list
          var that=this
          var url='https://music.163.com/api/song/detail/?id=363488&ids=['+Idlist[i]+']'
          wx.request({
            url: url,
            success:(e)=>{
                var img=e.data.songs[0].album.blurPicUrl
                ImgUrl_list.push(img)
                that.setData({
                    ImgUrl_list
                })
                if(++i<length){
                    that.getMusicImage(Idlist,i,length)
                }
            }
          })
      },
      onReachBottom(){
        var musicSum=this.data.musicSum
        var word=this.data.word
        var that=this
        if(word!=""){
            musicSum+=3
            this.setData({
                musicSum:musicSum
            })
            var url="https://music.163.com/api/search/get?s="+word+"&type=1&limit="+musicSum
            var Idlist=[]
            wx.showLoading({
              title: '加载中',
            })
            wx.request({
              url: url,
              success:(e)=>{
                var songs=e.data.result.songs
                that.setData({
                    musiclist:songs
                })
                for(var i=0;i<songs.length;i++){
                    Idlist.push(songs[i].id)
                    that.setData({
                        Idlist:Idlist
                    })
                }
                that.setData({
                    ImgUrl_list:[]
                })
                that.getMusicImage(Idlist,0,Idlist.length)
              }
            })
            setTimeout(() => {
                wx.hideLoading()
            }, 2000);
            
        }else{

        }
      }
})
