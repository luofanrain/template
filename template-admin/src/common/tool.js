import config from '@/common/config'
const store = {};
const tool = {
  setCookie(cname,cvalue,time=24){
      var d = new Date();
      d.setTime(d.getTime()+(time*60*60*1000));
      var expires = "expires="+d.toGMTString();
      document.cookie = cname + "=" + cvalue + "; " + expires;
  },
  getCookie(cname){
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) 
    {
      var c = ca[i].trim();
      if (c.indexOf(name)==0) return c.substring(name.length,c.length);
    }
    return "";
  },
  setStorage(key,val){
    let data = {
      value:val
    }
    localStorage.setItem(key,JSON.stringify(data));
  },
  getStorage(key){
    let data = localStorage.getItem(key);
    if(data == null) return data;
    data = JSON.parse(data);
    return data.value
  },
  fotmatData(key,value){
    if(value==='' || value === null) return '暂无';
    let text = '';
    switch(key){
      default:
        text = value;
    }
    return text;
  },
  getURL(url,data={}){
    let index = 0;
    for(let key in data){
      let _symbol = index++ === 0 ? '?' : '&';
      url+=`${_symbol}${key}=${data[key]}`
    }
    return url;
  },
  getTime(time){
    let date = new Date(time);
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day =  date.getDate();
    let monthText = month < 10 ? `0${month}` : month;
    let dayText = day < 10 ? `0${day}` : day;
    return `${year}-${monthText}-${dayText}`
  },
  getPrepWeek(){
    let date = new Date();
    let day = date.getDay();
    let curTime = date.getTime();
    let prepstartDay = curTime - (day + 7 - 1 ) * 24 * 60 * 60 * 1000;
    let prepEndDay = curTime - day * 24 * 60 * 60 * 1000;
    return {
      start_time:tool.getTime(prepstartDay),
      end_time:tool.getTime(prepEndDay)
    }
  },
  getPrepMonth(){
    let date = new Date();
    let day = date.getDate();
    let curTime = date.getTime();
    let prepEndDay = curTime - day * 24 * 60 * 60 * 1000;
    let preDate = new Date(prepEndDay);
    let preTime = preDate.getTime();
    let preYear = preDate.getFullYear();
    let preMonth = preDate.getMonth() + 1;
    let preCountDay = new Date(preYear,preMonth,0).getDate()
    let prepstartDay = preTime - (preCountDay - 1) * 24 * 60 * 60 * 1000;
    return {
      start_time:tool.getTime(prepstartDay),
      end_time:tool.getTime(prepEndDay)
    }

  },
}

export default tool;