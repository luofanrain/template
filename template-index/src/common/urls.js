// api模块
import config from '@/common/config'
const urls ={
    openid:'/api/openid',
    demo:'/api/demo',
    users:{
        list:'/users',
        update:'/users',
        delete:'/users'

    }
}
for(let key in urls){
    if(typeof urls[key] == "object"){
        for(let i in urls[key]){
            urls[key][i] =   `${config.host}${urls[key][i]}`;
        }
        continue
    }
    urls[key] = `${config.host}${urls[key]}`;
}
export default urls;