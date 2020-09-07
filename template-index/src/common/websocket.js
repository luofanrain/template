// websocket 
import config from '@/common/config'
import store from '@/vuex/store'
let wss = null;
let wssTimer = null;
let lockReconect = false;
let conecttime = 10;
let startTime = 0;
const init = (id,receive) => {
    let url = `${config.wsshost}${id}/`;
    wss = new WebSocket(url);
    wss.onopen = function(msg){
        lockReconect = false;
        send({
            type:'login',
            data: {
                openid:store.state.openid
            }
        })
    }
    wss.onmessage = function(res){
        let data = JSON.parse(res.data);
        receive(data)
    }
    wss.onerror = function(err){
        connectWss(id,receive)
        console.log(err)
    }
    wss.onclose = function(err){
        if(err.type == 'login_failed') return;
        console.log(err)
        connectWss(id,receive)
    }
    return wss;
}
const connectWss = (id,receive) => {
    if(lockReconect) return;
    lockReconect = true;
    startTime = Date.now();
    initHeart(id,receive)
}
const initHeart = (id,receive) => {
    wssTimer = setInterval(()=>{
        if(Date.now() > startTime + conecttime * 1000 || !lockReconect){
            clearInterval(wssTimer)
            wssTimer = null;
            lockReconect = false;
            return;
        }
        console.log('正在重连中，请稍后...');
        init(id,receive)
    },1000)
}
const send = (data) => {
    wss.send(JSON.stringify(data));
}
const close = () => {
    wss && wss.close();
    lockReconect = true;
    setTimeout(()=>{
        lockReconect = false;
    })
    wss = null;
}
export default {
    init,
    send,
    close,
}