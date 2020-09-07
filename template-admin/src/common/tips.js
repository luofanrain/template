
let dom = undefined;
const setDom = (that) => {
  dom = that;
}

const setTips = (data,type,time=3000) => {
  let text =  data.text;
  dom.$message({
    message: text,
    center: true,
    offset:'0',
    duration:time,
    type
  });
}
const warning = (data,time) => {
  setTips(data,'warning',time);
}
const error = (data,time) => {
  setTips(data,'error',time);
}
const info = (data,time) => {
  setTips(data,'info',time);
}
const success = (data,time) => {
  setTips(data,'success',time);
}
const loading = (data) =>{
  return dom.$loading({
    lock: true,
    text: data.text || 'Loading',
    spinner: 'el-icon-loading',
    background: 'rgba(0, 0, 0, 0.7)'
  });
}
export default {
  warning,
  error,
  info,
  success,
  loading,
  setDom
}