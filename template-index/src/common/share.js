//  微信
import config from '@/common/config'
import axios from '@/common/axios'
import urls from '@/common/urls'
import tool from '@/common/tool'
import store from '@/vuex/store'
import wx from 'weixin-js-sdk'
const initWx = () =>{
    if(store.state.app_id) return;
    const url = `${urls.jssdk}?url=${encodeURIComponent(window.location.href.split('#')[0])}`;
    axios.get(url,(res)=>{
        const data = res.data;
        store.commit('setState',{app_id:data.app_id})
        wx.config({
          debug:false,
          appId:data.app_id,
          timestamp:data.timestamp,
          nonceStr: data.noncestr,
          signature: data.signature,
          jsApiList:['updateAppMessageShareData','onMenuShareAppMessage','onMenuShareTimeline','updateTimelineShareData']
        })
    })
}
wx.ready(()=>{
    // initShare();
    initMenu();
})
const shareMessage = (info) => {
    let url = window.location.href;
    let img = 'url'
    wx.updateAppMessageShareData({ 
        title: info.title, // 分享标题
        desc: url, // 分享描述
        link: url, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        imgUrl: img, // 分享图标
        success: function () {
            // shareAddscrore()
            // 设置成功
        }
    })
    wx.updateTimelineShareData({ 
        title:  info.title, // 分享标题
        link: url, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        imgUrl: img, // 分享图标
        success: function () {
            // shareAddscrore()
            // 设置成功
        }
    })

}
const initMenu = () => {
    wx.hideAllNonBaseMenuItem();
    wx.showMenuItems({
        menuList: [
            'menuItem:share:appMessage',
            'menuItem:share:timeline',
            'menuItem:favorite',
        ] // 要显示的菜单项，所有menu项见附录3
    });
}
export default {
    initWx,
    shareMessage,
    initMenu,
    wx
}