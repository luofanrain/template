import config from '@/common/config'
const urls = {
    login:'/api/login',
    uploads:{
        uploadFile:'/',
        uploadBase64:'/'
    },
    templateblock:{
        list:'/api/power',
        create:'/api/power',
        update:'/api/power',
        detail:'/api/power',
        delete:'/api/power'
    },
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