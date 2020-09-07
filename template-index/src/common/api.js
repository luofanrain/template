
import config from '@/common/config'
import axios from '@/common/axios'
let dom = null;
const init = (wx,obj) => {
    dom = obj;
    let url = `${config.meethost}/${config.api}/meetings/jsapi/`
    let data = {        
      url:location.href.replace(location.hash, '')
    }
    axios.post(url,data,(res)=>{
      let cfg = {
        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId:res.data.appid, 
        timestamp:res.data.timestamp,
        nonceStr:res.data.noncestr,
        signature: res.data.signature,
        jsApiList: config.wxinterface // 必填，需要使用的JS接口列表
      }
      wx.config(cfg);
    })
    wx.ready(()=>{
      wx.onVoicePlayEnd({
        success: function (res) {
          setTimeout(()=>{
            dom.startVoice()
          },1000)
          dom.stopVoice()
        },
        error: function (res) {
        },
      });
    })
  
  }
export default   {
    init
}