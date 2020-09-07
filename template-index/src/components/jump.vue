<template>
  <div></div>
</template>
<script>
import config from '@/common/config'
import urls from '@/common/urls'
export default {
  name:'jump',
  created(){
    let query = {...this.$route.query};
    let path = this.$route.query.path.replace('/','');
    let param = `path||${path == '/' ? '' : path}`;
    for(let i in query){
      if(i=='path') continue;
      param += `||${i}||${query[i]}`
    }
    window.location.href= `${urls.openid}?params=${param}`
  },
}
</script>