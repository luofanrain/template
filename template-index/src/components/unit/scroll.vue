<template>
    <div class='scroll_cont'>
        <div class='scroll_title'>{{title}}</div>
        <div class='scroll_main' ref='scroll' >
            <ul class='scroll_container'>
                <li class='scroll_li' :class='[`${val == item?"scroll_select":""}`]' v-for='(item,index) in list' :key='index'>{{item}}</li>
            </ul>
            <div class='scroll_line'></div>
        </div>
    </div>
</template>
<script>
import BSscroll from 'better-scroll'
import config  from '@/common/config'
export default {
    name:'scroll',
    props:{
        data:{
            type:Array,
            default:()=>{
                return [[],[]]
            }
        },
        name:{
            type:String,
            default:''
        },
        type:{
            type:String,
            default:''
        },
        item:{
            type:Object,
            default:()=>{
                return {
                    value:0
                }
            }
        },
        condi:{
            type:Array,
            default:()=>{
                return []
            }
        }
    },
    data(){
        return {
            scroll:undefined,
            defaultData:config.date,
            list:[],
            title:'',
            val:'',
            isFirst:true,
            condition:[]
        }
    },
    created(){
        this.condition = this.condi;
        this.initData();
    },
    methods:{
        initData(){
            this.$nextTick(()=>{
            let item = this.defaultData[this.type] || {};
            let list = [];
            this.val = this.item.value;
            this.title = item.title;
            let index=1;
            switch(this.type){
                case 'year':
                    let curYear = new Date().getFullYear();
                    if(!this.item.value) this.val = curYear;
                    else this.val = this.item.value
                    let start_time = this.item.start_time || item.value
                    for(let i=start_time;i<=curYear;i++){
                        if(this.val == i) this.key = index;
                        index++;
                        list.push(i);
                    };
                    break;
                case 'month':
                    let startKey = item.value[0];
                    let endKey = item.value[1]
                    let curMonth = new Date().getMonth() + 1;
                    if(!this.item.value) this.val = curMonth;
                    else this.val = this.item.value
                    this.val = this.condition[1] || this.val;
                    if(this.condition[0] == 2020){
                        startKey = 5;
                        this.val = 5;
                    }
                    for(let i=startKey;i<=endKey;i++){
                        if(this.val == i) this.key = index;
                        index++;
                        list.push(i);
                    };
                    break;
                case 'day':
                    let curDay = new Date().getDate();
                    if(!this.item.value) this.val = curDay;
                    else this.val = this.item.value
                    let countDay = 31;
                    if(this.condition.length > 0){
                        countDay = new Date(this.condition[0], this.condition[1],0).getDate();
                    }else{
                        let year = new Date().getFullYear();
                        let month = new Date().getMonth()
                        countDay =  countDay = new Date(year, month,0).getDate();
                    }
                    for(let i=item.value;i<=countDay;i++){
                        if(this.val == i) this.key = index;
                        index++;
                        list.push(i);
                    };
                    break;
                
                case 'hour':
                    var startKey = item.value[0]
                    var endKey = item.value[1]
                    let curHour = new Date().getHours();
                    if(!this.item.value) this.val = curHour;
                    else this.val = this.item.value
                    for(let i=startKey;i<=endKey;i++){
                        if(this.val == i) this.key = index;
                        index++;
                        list.push(i);
                    };
                    break;
                
                case 'minute':
                    var startKey = item.value[0];
                    var endKey = item.value[1]
                    let curMinute = new Date().getMinutes();
                    if(!this.item.value) this.val = curMinute;
                    else this.val = this.item.value;
                    for(let i=startKey;i<=endKey;i++){
                        if(this.val == i) this.key = index;
                        index++;
                        list.push(i);
                    };
                    break;
                case 'city':
                    list = this.data;
                    if(!this.val){
                        this.key = 1;
                        this.val = list[0];
                    }else{
                        this.key = this.data.indexOf(this.val) + 1;
                    }
                    console.log(this.condition.length )
                    if(this.condition.length > 0){
                        list = this.condition;
                        this.key = 1;
                        this.val =  this.condition[0];
                        this.scroll.scrollTo(0,0)
                    }
                    break;
                default:
                    list = this.data;
                    if(!this.val) {
                        this.key = 1;
                        this.val = list[0];
                    }else{
                        this.key = this.data.indexOf(this.val) + 1;
                    }
                    if(this.condition[0]){
                        this.key = 1;
                        this.val = this.list[1]
                        this.scroll.scrollTo(0,0)
                    }
            }
            this.list = this.alterData(list);
            this.initScroll();
            })
        },
        resetVal(condition){
            this.condition = condition;
            this.initData();
        },
        alterData(data){
            return ['',...data,'','','','']
        },
        initScroll(){
            let that = this;
            this.$nextTick(()=>{
                if(!this.scroll){
                    let li_h = document.getElementsByClassName('scroll_li')[0].clientHeight;
                    this.scroll = new BSscroll(this.$refs.scroll,{
                        click:true,
                        bounce:false,
                    });
                    this.scroll.on('scrollEnd',(pos)=>{
                        let li_h = document.getElementsByClassName('scroll_li')[0].clientHeight;
                        // if(this.isFirst) {
                        //     this.isFirst = false;
                        //     return;
                        // }
                        let top;
                        if(pos.y%li_h > li_h/2){
                            top = pos.y - pos.y % li_h + li_h;
                            this.key = Math.floor(Math.abs(pos.y) / li_h)
                        }else{
                            top = pos.y - pos.y % li_h ;
                            this.key = Math.floor(Math.abs(pos.y) / li_h) + 1;
                        }
                        this.val = this.list[this.key];
                        this.sendVal();
                        this.scroll.scrollTo(0,top,1000);
                        
                    });
                    that.$nextTick(()=>{
                        this.scroll.scrollTo(0,-li_h*(this.key-1));
                    })
                }else{
                    let top = document.getElementsByClassName('scroll_li')[0].clientHeight * (this.key-1);
                    this.scroll.scrollTo(0,-top,1000)
                    this.scroll.refresh();
                }
            })

        },
        sendVal(){
            this.$emit('getVal',{index:this.key,value:this.list[this.key],type:this.type})
        }
    }
}
</script>
<style scoped>
@import url('../../assets/css/date/scroll.css');
</style>