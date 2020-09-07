import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex)

let state = {
    components:'',
    token:''
}
const store = new Vuex.Store({
    state,
    mutations: {
        setState(item,data){
            for(let key in data){
                state[key] = data[key];
            }
        }
    }
})

export default store