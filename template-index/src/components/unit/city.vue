<template>
    <div class='city_container' @click.stop=''>
        <div class='city_background' @click='closeCity'></div>
        <div class='date_cont'>
            <div class='date_title'>{{`${pov} ${city}`}}</div>
            <div class='date_mainGroup'>
                <scroll type='pov' @getVal='getVal' :item='{value:pov}' :data='provinces'></scroll>
                <scroll type='city' @getVal='getVal' :item='{value:city}' :data='citys[provinces.indexOf(pov)]' ref='city'></scroll>
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
    name:'city',
    props:{
        list:{
            type:Array,
            default:()=>{
                return [[],[]]
            }
        },
        value:{
            type:String,
            default:' '
        },
        separate:{
            type:String,
            default:' '
        }
    },
    data(){
        return {
            provinces:[],
            citys:[],
            city:'',
            pov:''
        }
    },
    created(){
        this.initData();
    },
    methods:{
        initData(){
            this.provinces = this.list[0];
            let names = this.list[1].map(x=>x.name);
            let citys = [];
            for(let i in this.provinces){
                let index = names.indexOf(this.provinces[i])
                if(index > -1){
                    citys.push(this.list[1][index].sub.map(x=>x.name))
                }
            }
            this.citys = citys;
            if(!this.value){
                this.pov = this.provinces[0];
                this.city = this.citys[0][0];
            }else{
                this.pov = this.value.split(' ')[0];
                this.city = this.value.split(' ')[1];
            }
        },
        getVal({index,value,type}){
            if(this[type] == value) return;
            this[type] = value;
            let group = ['pov'];
            if(group.indexOf(type) > -1){
                let citys = this.citys[this.provinces.indexOf(value)];
                this.city = citys[0]
                this.$refs.city.resetVal(citys)
            }
        },
        closeCity(){
            this.$emit('closeCity');
        },
        sendVal(){
            let str = `${this.pov} ${this.city}`
            this.$emit('sendVal',str)
        }
    },
    components:{
        scroll
    }
}
</script>
<style scoped>
@import url('../../assets/css/date/date.css');
.city_container,.city_background{
    height:100%;
    position: absolute;
    left:0;
    top:0;
    width:100%;
    
}
.city_background{
    width:100%;
    background:#000;
    opacity: .2;
}
</style>