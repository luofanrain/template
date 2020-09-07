const formatTitle = (title) => {
  let reg = /(\u3010)+[^\u3011\u3010]+(\u3011)?\s*/g
  let text = title || '';
  let arr =  text.toString().match(reg) || [];
  let maxLen = arr.length > 2 ? 2 : arr.length;
  for(let i=0;i<maxLen;i++){
    text = text.replace(arr[i],'')
  }
  text = text.replace(/[\u300a\u300b]/g,'')
  return text;
}
export default {
  formatTitle
}