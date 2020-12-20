import axios from '@/common/axios'
import urls from '@/common/urls'
import tips from '@/common/tips'
import html2canvas from 'html2canvas'

async function uploadFile(file,reg='jpg|jpeg|png|PNG|JPG',key){
  if(!file) return;
  let RegObj = new RegExp(`^(${reg})$`)
  
  let type = file.type.split('\/').slice(-1)
  if(!type) type = file.name.split('\.').slice(-1)
  if(!RegObj.test(type)){
    tips.error({text:`类型必须是${reg.replace(/\|/g,',')}`})
    return '';
  }
  let data = await QuestFile(file,key)
  return data;
}
async function QuestFile(file,key='file',url=''){
  let data = new FormData()
  data.append(key,file)
  url = url || urls.upload.uploadFile;
  return new Promise(resolve=>{
    axios.post(url,data,(res)=>{
      console.log(res)
      resolve(res.url)
    })
  })
}

async function saveImg(dom){
  return new Promise(resolve=>{
    html2canvas(dom).then(canvas => {
      let file = canvas.toDataURL("image/png")
      resolve(file)
    });
  })
}
async function savePage(dom){
  let file = await saveImg(dom);
  let url = await QuestFile(file,'file',urls.upload.uploadBase64);
  return url;
}

async function uploadBase64(file){
  let url = await QuestFile(file,'file',urls.upload.uploadBase64);
  return url;
}

export default {
  uploadFile,
  QuestFile,
  uploadBase64,
  savePage
}