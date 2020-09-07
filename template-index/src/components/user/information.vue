<template>
  <div class='information_container' ref='list'>
    <div class='information_main' >
      <div class='information_body'>
        <div class='information_tips'>
          <img class='information_register_tips' src="" align="right">
        </div>
      </div>
      <div class='information_body'>
        <div class='information_title'>
          <span>基本信息</span>
        </div>
        <div class='information_content'>
          <div class='information_block'>
            <div class='information_key'>姓名</div>
            <div class='information_value' :class='{information_value_err:errinpupt.name}'>
              <el-input @input='changeInput' v-model="data.name" placeholder="请输入姓名"></el-input>
            </div>
          </div>
          <div class='information_block'>
            <div class='information_key'>性别</div>
            <div class='information_input_radio' >
              <el-radio v-model="data.sex" :label="0" fill='#fff' text-color='#911C61' size="medium">女</el-radio>
              <el-radio v-model="data.sex" :label="1" fill='#fff' text-color='#911C61' size="medium">男</el-radio>
            </div>
          </div>
          <div class='information_block'>
            <div class='information_key'>手机</div>
            <div class='information_value' :class='{information_value_err:errinpupt.phone}'>
              <el-input  v-model="data.phone" @input='changeNumber("phone")' placeholder="请输入手机号"></el-input>
            </div>
          </div>
          <div class='information_block'>
            <div class='information_key'>验证码</div>
            <div class='information_value' :class='{information_value_err:errinpupt.authCode}'>
              <el-input  v-model="data.authCode" @input='changeAuthCode("authCode")' placeholder="请输入验证码"></el-input>
              <div class='information_value_text' v-if='!time.text' @click='getCode'>
                <span>{{timeText}}</span>
              </div>
              <span class='information_value_text_second' v-if='time.text' >{{time.text}}</span>
            </div>
          </div>
          <div class='information_block'>
            <div class='information_key'>关注领域</div>
            <div class='information_value'>
              <el-select v-model="data.territory" @change='changeInput' placeholder="请选择关注领域">
                <el-option
                  v-for="item in config.territorys"
                  :key="item"
                  :label="item"
                  :value="item">
                </el-option>
              </el-select>
            </div>
          </div>
          <div class='information_block' v-if='data.territory == "其他"'>
            <div class='information_key'></div>
            <div class='information_value'  :class='{information_value_err:errinpupt.territory}'>
              <el-input @input='changeTeeritorys' v-model="other.territory" placeholder="请输入关注领域"></el-input>
            </div>
          </div>
        </div>
      </div>
      <div class='information_body'>
        <div class='information_title'>
          <span>医院</span>
        </div>
        <div class='information_content'>
          <!-- <div class='information_block'>
            <div class='information_key'>大区</div>
            <div class='information_value'>
              <el-select v-model="data.region" @change='initProvince()' placeholder="医院所在大区">
                <el-option
                  v-for="item in config.regions"
                  :key="item"
                  :label="item"
                  :value="item">
                </el-option>
              </el-select>
            </div>
          </div> -->
          <div class='information_block'>
            <div class='information_key'>区域</div>
            <div class='information_value'  :class='{information_value_err:errinpupt.provinces}'>
              <el-select v-model="curcity" placeholder="医院所在省市">
                <!-- <el-option
                  v-for="item in config.regions"
                  :key="item"
                  :label="item"
                  :value="item">
                </el-option> -->
              </el-select>
              <div class='information_top_bg' @click='changeCityStatus'></div>
            </div>
          </div>
          <div class='information_block'>
            <div class='information_key'>医院</div>
            <div class='information_value'  :class='{information_value_err:errinpupt.hospital}'>
              <el-select v-model="data.hospital_id" 
                filterable placeholder="就诊医院" >
                <el-option
                  v-for="item in config.hospitals"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </div>
          </div>
          <div class='information_block' v-if='data.hospital_id == hospital_other'>
            <div class='information_key'>其他医院</div>
            <div class='information_value' :class='{information_value_err:errinpupt.hospital_other}'>
              <el-input  v-model="data.hospital_text" placeholder="请输入医院"></el-input>
            </div>
          </div>
          <div class='information_block'>
            <div class='information_key'>科室</div>
            <div class='information_value'>
              <el-input  v-model="data.department" placeholder="就诊科室（选填）"></el-input>
            </div>
          </div>
          <div class='information_block'>
            <div class='information_key'>医生</div>
            <div class='information_value'>
              <el-input  v-model="data.doctor" placeholder="我的医生（选填）"></el-input>
            </div>
          </div>
          <div class='information_block'>
            <div class='information_key'>药店</div>
            <div class='information_value'  :class='{information_none:data.pharmacy_id === 0}'>
              <el-select v-model="data.pharmacy_id" @change='changePharmacy' 
                filterable placeholder="请选择（选填）" >
                <el-option label="" value="" ></el-option>
                <el-option
                  v-for="item in config.pharmacys"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </div>
          </div>
          
          <div class='information_block' v-if='data.pharmacy_id == pharmacy_other'>
            <div class='information_key'>其他药店</div>
            <div class='information_value' :class='{information_value_err:errinpupt.pharmacy_other}'>
              <el-input  v-model="data.pharmacy_text" placeholder="请输入药店"></el-input>
            </div>
          </div>
          <div class='information_block'>
            <div class='information_key'>药师</div>
            <div class='information_value'>
              <el-input  v-model="data.pharmacists" placeholder="我的药师（选填）"></el-input>
            </div>
          </div>
        </div>
      </div>
      <div class='information_body'>
        <div class='information_title'>
          <span>免疫治疗情况</span>
        </div>
        <div class='information_content information_select_tab'>
          <div class='information_radio'>
            <el-radio v-model="data.immunotherapy" :label="1" fill='#fff' text-color='#911C61' size="medium">在使用</el-radio>
            <el-radio v-model="data.immunotherapy" :label="2" fill='#fff' text-color='#911C61' size="medium">将使用</el-radio>
            <el-radio v-model="data.immunotherapy" :label="3" fill='#fff' text-color='#911C61' size="medium">考虑使用</el-radio>
          </div>
          <div class='information_other_radio' v-if='data.immunotherapy===1'>
            <div class='information_other_key'>在使用替雷利珠单抗：</div>
            <div class='information_other_value'>              
              <el-radio v-model="data.tirelizumab" :label="1" fill='#fff' text-color='#911C61' size="medium">是</el-radio>
              <el-radio v-model="data.tirelizumab" :label="2" fill='#fff' text-color='#911C61' size="medium">否</el-radio>
            </div>
          </div>
        </div>
      </div>
      <div class='information_body information_check_main'>
        <div class='information_title'>
          <span>其他治疗方案</span>
        </div>
        <div class='information_content information_select_tab'>
          <div class='information_checkbox'>
             <el-checkbox-group v-model="scheme"  class='information_checkbox_content'>
              <el-checkbox label="手术"></el-checkbox>
              <el-checkbox label="化疗"></el-checkbox>
              <el-checkbox label="靶向"></el-checkbox>
              <el-checkbox label="移植"></el-checkbox>
            </el-checkbox-group>
            <div class='information_checkbox_content'>
              <el-checkbox label="其他" v-model='scheme'  @change='changeScheme'></el-checkbox>
              <div class='information_checkbox_other' v-if='scheme.indexOf("其他") > -1'  :class='{information_value_err:errinpupt.scheme}'>
                <el-input @input='changeInput' v-model="other.scheme"  placeholder="其他"></el-input>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class='information_body information_agreement_main'>
        <div class='information_content information_select_tab'>
          <div class='information_isjoin information_radio_msg'>参与"为你千方百济"患者救助项目</div>
          <div class='information_radio information_radio_msg'>
            <el-radio v-model="data.isjoin" :label="0" fill='#fff' text-color='#911C61' size="medium">是</el-radio>
            <el-radio v-model="data.isjoin" :label="1" fill='#fff' text-color='#911C61' size="medium">否</el-radio>
          </div>
          <!-- <div class='information_agreement' v-if='isFirst || notCommit'> -->
          <div class='information_agreement'>
              <el-checkbox label="" :value='1' v-model='isAgree' class='information_btn_middle'></el-checkbox>
              <div :style='{color:isAgree.length == 1?"#911C61":"#666"}' @click='openAgreement' class='information_btn_middle'>我已阅读<span class='information_book_name'>《为你千方百济患者关爱项目》知情同意书</span>，并自愿参与该项目</div>
          </div>
        </div>
      </div>
      <div class='information_btngroup'>
        <el-button type="primary" @click.native='doCommit' round>
          <img src='' alt=""><span class='information_button_name'>确认{{isFirst?"提交":'修改'}}</span>
        </el-button>
      </div>
    </div>
    <city :value='curcity' @closeCity='closeCity' @sendVal='getCity' v-if='showCity' :list='cityList'></city>
  </div>
</template>
<script>
import BSscroll from 'better-scroll'
import city from '@/components/unit/city'
import citys from '@/common/citys'
import axios from '@/common/axios'
import tool from '@/common/tool'
import tips from '@/common/tips'
import urls from '@/common/urls'
import $ from 'jquery'
export default {
  name:'information',
  props:{
    status:{
      type:Number,
      default:0
    }
  },
  data:()=>{
    return {
      config:{
        territorys:['淋巴瘤','膀胱癌','肺癌','肝癌','胃癌','鼻咽癌','食管癌','卵巢癌','其他'],
        hospitals:[],
        regions:['东区','南区','西区','北区'],
        citys:citys,
        scheme:['手术','化疗','靶向','移植','其他'],
        pharmacys:[],
      },
      data:{
        name: '',
        phone: '',
        authCode: '',
        territory: '',
        region: '东区',
        province: '',
        sex:0,
        city: '',
        hospital_id: '',
        hospital_text: '',
        department: '',
        doctor: '',
        pharmacy_id:0,
        pharmacy_text:'',
        pharmacists:'',
        immunotherapy: '',
        tirelizumab: 0,
        other: '',
        isjoin: 0,
        scheme:[],
      },
      hospital_other:99999999,
      pharmacy_other:99999,
      other:{
        scheme:'',
        territory:''
      },
      errinpupt:{
        name: false,
        phone: false,
        authCode: false,
        territory: false,
        province: false,
        hospital_other: false,
        pharmacy_other: false,
        scheme:false
      },
      scheme:[],
      timeText:'获取',
      curcity:"",
      showCity:false,
      cityList:[],
      hospital_name:'',
      isUseMonoantigen:'',
      otherscheme:'',
      isAgree:[],
      scroll:null,
      cacheProvince:false,
      time:{
        startTime:0,
        time:null,
        text:''
      },
      isFirst:false,
      loading:false,
      max_time:60000,
      notCommit:false
    }
  },
  components:{
    city
  },
  created(){
    document.getElementsByTagName('title')[0].innerHTML = '个人信息'
    this.notCommit = !!this.status
    // this.getSubInfo((data)=>{
    //   this.initData(data)
    // })
    this.initScroll()
  },
  methods:{
    getCode(){
      if(Date.now() - this.startTime <= this.max_time){
        return;
      }
      if(!(/1\d{10}/g.test(this.data.phone))){
        tips.error({text:'请输入正确得手机号码'})
        return;
      }
      this.startTime = Date.now();
      this.initDate();
      axios.get(`${urls.sendmsg}?phone=${this.data.phone}`,(res)=>{})
    },
    getSubInfo(callback){
      let url = urls.subinfo;
      axios.get(url,(res)=>{
        let data = {...res.data}
        data.hospital = data.name;
        delete data['name']
        callback && callback(data)
      })
    },
    initDate(){
      if(this.time.time){
        clearTimeout(this.time.time);
        this.time.time = null;
      }
      if(Date.now() - this.startTime <= this.max_time){
        this.time.text = `${this.max_time/1000 - Math.floor(((Date.now() - this.startTime))/1000)}s`;
        this.time.time = setTimeout(this.initDate,1000)
      }else{
        this.time.text = ''
        this.time.startTime = 0;
      }
    },
    initQuery(){
      // console.log(this.$route)
      // let hash = this.$route.hash;
      // let text = hash.split('?')[1] || '';
      // let params = text.split('&');
      // let query = {};
      // for(let i=0;i<params.length;i++){
      //   let obj = params[i].split('=');
      //   if(obj[0] == 'openid') continue;
      //   query[obj[0]] = decodeURI(obj[1]);
      // }
      let query = {...this.$route.query};
      return query;
    },
    getInfo(data,info){
      if(!info.update_time || !data.update_time) return {...data,...info,hospital:info.hospital || data.hospital_name ||''};
      let data_time = (new Date(data.update_time.replace(/-/g,'/'))).getTime();
      let info_time = new Date(info.update_time.replace(/-/g,'/')).getTime();
      let item = data_time >= info_time ? {...info,...data,hospital:data.hospital_name||''}:{...data,...info,hospital:info.hospital||''};
      return item;
    },
    initData(info){
      axios.get(urls.userinfo,(res)=>{
        let data = res.data;
        this.isFirst = !!!data.name;
        if(!this.isFirst){
          this.isAgree.push('');
        }
        let storage = tool.getStorage('cacheInfo',sessionStorage)
        // let info = this.initQuery();
        this.data = {...this.data,...storage,...this.getInfo(res.data,info)}
        if(this.data.territory.indexOf('其他') > -1){
          let arr = this.data.territory.split(',')
          this.data.territory = arr[0];
          this.other.territory = arr[1];
        }
        this.data.pharmacy_id = this.data.pharmacy_id || ''
        let tmp = this.data.other.length > 0 ? this.data.other.split(','):[]
        this.scheme = [];
        for(let i in tmp){
          if(this.config.scheme.indexOf(tmp[i]) > -1 ){
            this.scheme.push(tmp[i])
          }else{
            let arr = tmp[i].split('|');
            this.other.scheme = decodeURIComponent(arr[1]||'')
            this.scheme.push('其他')
          }
        }

        this.curcity = $.trim(`${this.data.province} ${this.data.city}`)
        let hospital =  this.data.hospital; 
        this.initProvince(true);
        this.initHospital('',()=>{
          let curHospital = this.config.hospitals.find(item=>item.name==hospital) || {}
          this.data.hospital_id = curHospital.id || '';
        })
        this.initPharmacy();
      })
    },
    initHospital(query='',callback){
      let text = query;
      let url = `${urls.hospitals}?province=${this.data.province}&city=${this.data.city}&name=${text}`
      axios.get(url,(res)=>{
        this.config.hospitals = res.data;
        callback && callback()
      })
    },
    initScroll(){
      if(!this.scroll){
        this.$nextTick(()=>{
          this.scroll = new BSscroll(this.$refs.list,{
            click:true,
            bounce:false
          })
        })
      }else{
        this.scroll.refresh()
      }
    },
    initPharmacy(){
      let url = `${urls.pharmacys}?province=${this.data.province}&city=${this.data.city}`
      axios.get(url,(res)=>{
        this.config.pharmacys = res.data;
      })
    },
    changeScheme(){
      console.log(this.scheme)
    },
    changeTeeritorys(){
      this.other.territory = this.other.territory.replace(/,/g,'')
    },
    changePharmacy(){
      this.data.pharmacists = '';
    },
    initProvince(isIn){
      let url = `${urls.provinces}?pagesize=1000`
      if(!isIn){
        this.data.province = '';
        this.data.city = '';
        this.curcity = '';
        this.data.hospital_id='';
        this.config.hospitals = '';
      }
      axios.get(url,(res)=>{
        let provinces = res.data.map(x=>x.province);
        this.cityList = [provinces,this.config.citys]
        if(this.cacheProvince) {
          this.showCity = true;
          this.cacheProvince = true;
        }
      })
      this.changeInput();
    },
    changeNumber(key){
      console.log(key)
      this.data[key] = this.data[key].replace(/\D/g,'').substr(0,11)
      this.changeInput();
    },
    changeAuthCode(key){
      this.data[key] = this.data[key].replace(/\D/g,'').substr(0,5)
      this.changeInput();
    },
    changeCityStatus(){
      if(this.cityList.length == 0){
        this.cacheProvince = true;
        return;
      }
      this.scroll.disable();
      this.showCity = true;
    },
    changeInput(){
      this.errinpupt = {
        name: false,
        phone: false,
        authCode: false,
        territory: false,
        hospital_other:false,
        pharmacy_other:false,
        province: false,
        scheme:false
      }
    },
    closeCity(){
        this.showCity = false;
        this.scroll.enable();
    },
    getCity(city){
      if(this.curcity != city){
        this.config.hospitals = [];
        this.data.hospital_id = '';
      }
      this.curcity = city;
      let [_pov,_city] = city.split(' ');
      this.data.province = _pov;
      this.data.city  = _city;
      this.showCity = false;
      this.scroll.enable();
      // this.initHostList();
      this.initHospital('');
      this.initPharmacy();
      this.changeInput();
    },
    openAgreement(){
      tool.setStorage('cacheInfo',this.data,sessionStorage)
      this.$router.push({
        path:'/agreement'
      })
    },
    formatData(){
      for(let key in this.data){
          if(typeof this.data[key] == 'string'){
              this.data[key] = $.trim(this.data[key])
          }
      }
      if(this.data.name == ''){
          this.errinpupt.name = true;
          tips.error({text:'请输入姓名'})
          return false;
      }
      if(this.data.phone == ''){
          this.errinpupt.phone = true;
          tips.error({text:'请输入手机号码'})
          return false;
      }
      if(!(/1\d{10}/g.test(this.data.phone))){
          this.errinpupt.phone = true;
          tips.error({text:'请输入正确得手机号码'})
          return;
      }
      if(this.data.authCode == ''){
          this.errinpupt.authCode = true;
          tips.error({text:'请输入验证码'})
          return false;
      }
      if(this.data.territory == ''){
          tips.error({text:'请选择关注领域'})
          return false;
      }
      if(this.data.territory == '其他' && $.trim(this.other.territory) == ''){
          this.errinpupt.territory = true;
          tips.error({text:'请输入关注领域'})
          return false;
      }
      if(this.data.province == ''){
          this.errinpupt.province = true;
          tips.error({text:'请选择所在区域'})
          return false;
      }
      if(this.data.hospital_id == ''){
          this.errinpupt.hospital = true;
          tips.error({text:'请选择医院'})
          return false;
      }
      if(this.hospital_other === this.data.hospital_id && this.data.hospital_text == ''){
          this.errinpupt.hospital_other = true;
          tips.error({text:'请输入医院'})
          return false;
      }
      if(this.pharmacy_other === this.data.pharmacy_id && !this.data.pharmacy_text){
          this.errinpupt.pharmacy_other = true;
          tips.error({text:'请输入药店'})
          return false;
      }
      if(this.data.immunotherapy == ''){
          tips.error({text:'请选择免疫治疗情况'})
          return false;
      }
      if(this.data.immunotherapy == 1 && this.data.tirelizumab == 0){
          tips.error({text:'请选择是否使用替雷利珠单抗'})
          return false;
      }
      if(this.scheme.length == 0){
          tips.error({text:'请选择其他治疗方案'})
          return false;
      }
      if(this.scheme.indexOf('其他') > -1 && $.trim(this.other.scheme) == ''){
          this.errinpupt.scheme = true;
          tips.error({text:'请补充其他治疗方案'})
          return false;
      }
      if(this.data.isjoin === ''){
          tips.error({text:'请选择是否参与"为你千方百济"患者救助项目'})
          return false;
      }
      if(this.isAgree.length == 0){
          tips.error({text:'请勾选知情同意书'})
          return false;
      }
      return true;
    },
    getData(){
      let data = {...this.data}
      if(data.territory == '其他'){
        data.territory = `${data.territory},${this.other.territory}`
      }
      if(data.immunotherapy != 1){
        this.tirelizumab = 0;
      }
      let otherIndex = this.scheme.indexOf('其他');
      if(otherIndex > -1){
        this.scheme[otherIndex] = `其他|${encodeURIComponent(this.other.scheme)}`
        console.log(this.scheme[otherIndex])
        // this.scheme.push(this.other.scheme)
      }
      if(this.hospital_other !== this.data.hospital_id){
        this.data.hospital_text = ''
        data.hospital_text = ''
      }
      data.other = this.scheme.join(',');
      if(!data.pharmacy_id)  {
        data.pharmacy_id = 0;
        data.pharmacy_text = ''
      }
      return data;
    },
    doCommit(){
      if(!this.formatData() ||  this.loading || this.notCommit) return;
      this.loading = true;
      axios.post(urls.userinfo,this.getData(),(res)=>{
        if(!res.errcode){
          this.$router.push({
            path:'/index'
          })
          this.loading = false;
        }
      })
    },
  }

}
</script>
<style>
.information_container{
  height:100%;
  position: relative;
  overflow: hidden;
  padding:0 5.33vw;
}
.information_main{
  padding:4vw 0 8vw;
}
.information_body{
  margin-top:5.6vw;
}
.information_body:first-child{
  margin:0;
}
.information_title{
  margin-bottom:0.93vw;
  font-weight: 600;
}
.information_title>span{
  display: inline-block;
  height:7.2vw;
  /* width:22.4vw; */
  padding:0 6.93vw;
  border-radius:1.06vw;
  background:#9CC586;
  color:#fff;
  text-align: center;
  line-height: 7.2vw;
}
.information_content{
  background:#fff;
  border-radius:1.06vw;
}
.information_block{
  height:12.26vw;
  padding:0 0.93vw 0 2.79vw;
  display: flex;
}
.information_key{
  flex:18.93vw 0 0;
  justify-content: flex-start;
  text-align: right;
  display: flex;
  align-items: center;
  height:100%;
  color:#666;
}
.information_value{
  flex:1 0 0;
  height:100%;
  border-bottom:1px solid #e6e6e6;
  display: flex;
  align-items: center;
  position: relative;
  /* box-sizing:content-box; */
}
.information_top_bg{
  position: absolute;
  top:0;
  left:0;
  width:100%;
  height:100%;
}

.information_value input{
  border:none;
  padding:0;
  height:5.6vw;
  line-height: 5.6vw;
  font-size:4vw;
  position: relative;
  color:#000;
}

.information_value input::placeholder{
  color:#aaa;
}
.information_value_err input,.information_value_err input::placeholder{
  color:#911C61;
}
.information_value i{
  line-height: 0;
}
.information_value .el-select{
  width:100%;
}
.information_check_main .el-checkbox{
  margin-right:7vw;
}
.information_check_main .el-checkbox:nth-child(4){
  margin-right:0;
}
.information_body .information_block:last-child .information_value{
  border-bottom:1px solid #fff;
}
.information_select_tab{
  padding:4.66vw 5.2vw;
}
.information_radio{
  /* margin-bottom:4.66vw; */
}
.information_other_radio{
  margin-top:4.66vw;
  display: flex;
  background:#f0f0f0;
  padding:3.2vw;
}
.information_checkbox_content{
  display: flex;
  align-items: center;;
  height:9.33vw;
}
.information_checkbox_other{
  flex:1 0 0;
  height:9.33vw;
  line-height:9.33vw;
  background:#f2f2f2;
  display: flex;
  align-items: center;
  padding:0 4.53vw;
  margin-left: 4.63vw;
}
.information_checkbox_content input{
  height:6vw;
  line-height: 6vw;
  border:0;
  padding:0;
  margin:0;
  background:#f2f2f2;
}
.information_radio_msg{
  height: 8.93vw;
}
.information_radio_msg:nth-child(2){
  border-bottom:1px solid #E6E6E6;
}
.information_agreement_main{
  font-size:3.73vw;
  color:#666;
  min-height:4.8vw;
  line-height: 4.8vw;
}
.information_agreement{
  display: flex;
  align-items: flex-start;;
  margin-top:4.86vw;
}
.information_agreement .el-checkbox{
  flex:4.8vw 0 0;
}
.information_btngroup .el-button.is-round{
  width:100%;
  font-size:4.4vw;
  padding-top:2vw;
  padding-bottom:2vw;
  letter-spacing: 1px;
}
.information_btngroup button>span{
  display: flex;
  align-items: center;
  justify-content: center;
}
.information_btngroup img{
  width:5.86vw;
  margin-right:0.5vw;
}
.information_button_name{
  display: inline-block;
}
.information_btngroup{
  /* height:11.73vw; */
  margin-top:5vw;
  display: flex;
  align-items: center;;
}
.information_btn_middle{
  vertical-align: middle;;
}
.information_value_text{
  flex:16vw;
  color:#fff;
  font-size:3vw;
  letter-spacing: 0.5vw;
}
.information_value_text>span{
  padding:.5vw 1vw;
  border-radius:1.06vw;
  background:#911C61;
}
.information_value_text_second{
  flex:16vw;
  color:#999;
  font-size:3.2vw;
  letter-spacing: 0.5vw;
}
.information_value_err input{
  color:#911C61
}
.information_input_radio{
  line-height: 100%;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #e6e6e6;
  width: 100%;
}
.information_other_key{
  font-size:3.73vw;
  display: flex;
  align-items: center;
  height:5vw;
}
.information_other_value{
  height:5vw;
  display: flex;
  align-items: center;
}
.information_other_value .el-radio{
  font-weight: 500;
}
.information_book_name{
  /* text-decoration:underline */
  border-bottom-width:1px;
  border-bottom-style:solid;
}
.information_none input{
  color:#aaa;
}
.information_tips{
  background: #fff;
  /* padding: 4vw; */
  line-height: 1.8;
  font-weight: 500;
  border-radius:1.06vw;
  word-break: break-all;
}
.information_tips_sign{
  text-align: right;;
}
.information_register_tips{
  display: inline-block;
  width:100%;
  height:auto;
  margin-bottom:4vw;
}
/* .information_tips img{
  width:20vw;
  height:20vw;
} */
.information_traduce{
  position: relative;
  /* display: flex; */
  
}
</style>