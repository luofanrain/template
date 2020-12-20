import axios from 'axios'
import store from '@/vuex/store'
import tool  from '@/common/tool'
import config  from '@/common/config'
import tips  from '@/common/tips'
const getHeaders = () =>{
  let token = tool.getCookie('token');
  // let token = store.state.token;
  return  {
    token,
    username:tool.getCookie('username') || ''
  };
}
// axios.defaults.withCredentials=true
const tipCode = (err) => {
  try{
    let code = err.response.status;
    let errCode = config.tips.errCode
    if(code == 500){
      tips.error({text:errCode[500]})
    }else{
      tips.error({text:err.response.data.msg || errCode[code] || errCode.default})
    }
  }catch(e){
    console.log(err)
    tips.error({text:errCode.other})
  }
}
const download = (url,name,type) => {
  axios({
    method: 'get',
    headers: {
      'Content-Type': config.axiosType['type'],
      ...getHeaders()
    },
    responseType: 'blob',
    url: url,
  })
  .then( res =>{ 　　　　
    let blob = new Blob([res.data], {type: config.axiosType[type]});      　
    if('msSaveOrOpenBlob' in navigator){
      window.navigator.msSaveOrOpenBlob(blob, `${name}.${type}`);
      return
    }　　　
    let downloadElement = document.createElement('a');                  
    let href = window.URL.createObjectURL(blob);                  
    downloadElement.href = href;      　　　　
    downloadElement.download = `${name}.${type}`;　　　　　　　　　　
    document.body.appendChild(downloadElement);                  
    downloadElement.click();                  
    document.body.removeChild(downloadElement);                  
    window.URL.revokeObjectURL(href);      　　
  }).catch( err => {
　　　　tips.error({text:'暂没有数据阔以导出'});
　　});
}
const getStream = (url,callback) =>{
  axios.get(url).then((res)=>{
    callback(res)
  }).catch((res)=>{
    console.log(res)
    callback({isErrorStatus:true})
  })
}
const AxiosGet = (url,callback,headers) =>{
  AxiosRequest(url,{},'get',headers,callback)
}
const AxiosPost = (url,data,callback,headers) =>{
  AxiosRequest(url,data,'post',headers,callback)
}
const AxiosDelete = (url,callback,headers) =>{
  AxiosRequest(url,{},'delete',headers,callback)
}
const AxiosPatch = (url,data,callback,headers) =>{
  AxiosRequest(url,data,'patch',headers,callback)
}

const AxiosRequest = (url,data={},method,headers={},callback) => {
  axios({
    method,
    url,
    data,
    processData: false,  // 不处理数据
    contentType: false,   // 不设置内容类型
    headers:{
      ...getHeaders(),
      ...headers
    }
  }).then((res)=>{
    callback(res.data)
  }).catch((err)=>{
    try{
      let data = err.response.data;
      if(data.detail) console.log(err.response)
      else tipCode(err);
      callback({errcode:true,data:null,err:err})
    }catch(e){
      callback({errcode:true,data:null,err:err})
    }
  })
}
export default {
  get:AxiosGet,
  post:AxiosPost,
  delete:AxiosDelete,
  patch:AxiosPatch,
  download,
  getHeaders,
  getStream
}