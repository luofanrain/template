import config from '@/common/config'
const urls = {
    login:'/api/login',
    permissions:{
        list:'/api/permission_type',
        create:'/api/permission_type',
        update:'/api/permission_type',
        delete:'/api/permission_type'
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