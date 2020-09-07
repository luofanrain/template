<template>
    <div class='city_container'>
        <div class='city_bg' @click='closeDate'></div>
        <div class='date_cont'>
            <div class='date_title'>{{`${year}-${maxNum>month?'0'+month:month}-${maxNum>day?'0'+day:day}`}}</div>
            <div class='date_mainGroup'>
                <scroll type='year' @getVal='getVal' :item='{value:year,start_time:start_time}' v-if='show.indexOf("Y") > -1' ></scroll>
                <scroll type='month' @getVal='getVal' :item='{value:month}' :condi='[year]' ref='month' v-if='show.indexOf("M") > -1'></scroll>
                <scroll type='day' @getVal='getVal' :item='{value:day}' :condition='condition' ref='day' v-if='show.indexOf("D") > -1'></scroll>
                <scroll type='hour' @getVal='getVal' :item='{value:hour}'  ref='hour' v-if='show.indexOf("h") > -1'></scroll>
                <scroll type='minute' @getVal='getVal' :item='{value:minute}'  ref='minute' v-if='show.indexOf("m") > -1'></scroll>
            </div>
            <div class='date_buttonGroup'>
                <!-- <div class='date_button_main' @click='closeDate'>
                    <span class='date_button '>取消</span>
                </div> -->
                <div class='date_button_main' @click='sendVal'>
                    <span class='date_button date_sure'>完成</span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import scroll from '@/components/unit/scroll'
export default {
    name:'date',
    props:{
        time:{
            type:String,
            default:''
        },
        start_time:{
            type:Number,
            default:0
        },
        separate:{
            type:String,
            default:'-'
        },
        format:{
            type:String,
            default:'Y-M-D h:m'
        },
    },
    data(){
        return {
            year:'',
            month:'',
            day:'',
            hour:'',
            minute:'',
            maxNum:10,
            condition:[],
            show:[]
        }
    },
    created(){
        this.show = this.format.split('')
        this.initData();
    },
    methods:{
        initData(){
            if(this.time){
                let [year,month,day,hour,minute] = this.time.split(/[\/-\s:]/g);
                let date = new Date();
                this.year = Number(year) || date.getFullYear();
                this.month = Number(month) || date.getMonth() + 1;
                this.day = Number(day) || date.getDate();
                this.hour = Number(hour) || date.getHours();
                this.minute = Number(minute) || date.getMinutes();
                if(year && month){
                    this.condition = [year,month];
                }
            }else{
                let date = new Date();
                this.year = date.getFullYear();
                this.month = date.getMonth() + 1;
                this.day = date.getDate();
                this.hour = date.getHours();
                this.minute = date.getMinutes();
                this.condition = [this.year,this.month];
            }
        },
        getVal({index,value,type}){
            this[type] = value;
            let group = ['year','month'];
            if(type == 'year'){
                this.$refs.month.resetVal([this.year,1])
            }
            if(group.indexOf(type) > -1 && this.show.indexOf("D")>-1){
                this.$refs.day.resetVal([this.year,this.month])
            }
        },
        closeDate(){
            this.$emit('closeDate');
        },
        sendVal(){
            let yearStr = this.year;
            let monthStr = this.month >= 10 ? this.month : `0${this.month}`;
            let dayStr = this.day >= 10 ? this.day : `0${this.day}`;
            let hourStr = this.hour >= 10 ? this.hour : `0${this.hour}`;
            let minuteStr = this.minute >= 10 ? this.minute : `0${this.minute}`;
            // let date = `${yearStr}${this.separate}${monthStr}${this.separate}${dayStr} ${hourStr}:${minuteStr}`;
            // let date = this.format.replace(reg,`$1${yearStr}$2${monthStr}$3${dayStr}$4${hourStr}$5${minuteStr}`)
            let date = this.format;
            date = date.replace(/Y/,yearStr).replace(/M/,monthStr).replace(/D/,dayStr).replace(/h/,hourStr).replace(/m/,minuteStr);
            this.$emit('sendVal',date)
        }
    },
    components:{
        scroll
    }
}
</script>
<style scoped>
@import url('../../assets/css/date/date.css');
</style>