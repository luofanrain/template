import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)
const state = {
  openid:0,
  app_id:''
};

export default new Vuex.Store({
  state,
  mutations: {
    setState:(that,data) => {
      for(let key in data){
        state[key]  = data[key]; 
      }
    }
  }
});