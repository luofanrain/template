// 工具模块
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
  setStorage(key,val,storage){
    storage = storage || localStorage
    let data = {
      value:val
    }
    storage.setItem(key,JSON.stringify(data));
  },
  getStorage(key,storage){
    storage = storage || localStorage
    let data = storage.getItem(key);
    if(data == null) return data;
    data = JSON.parse(data);
    return data.value
  },
  // 获取当前日期
  getTime(time,separator='-'){
    let date = time ? new Date(time) : new Date();
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day =  date.getDate();
    let monthText = month < 10 ? `0${month}` : month;
    let dayText = day < 10 ? `0${day}` : day;
    return `${year}${separator}${monthText}${separator}${dayText}`
  },
  // 获取上周日期
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
  // 获取上个月日期
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