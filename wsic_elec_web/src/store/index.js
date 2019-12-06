import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    menu:[],
    // id: '123456',
    openedTab: ['/home'],
    activeTab: [],
    Organization:[],
  },
  mutations: {
    addTab (state, item) {
      state.openedTab.push(item)
    },
    changeTab (state, componentName) {
      state.activeTab = componentName
    },
    deductTab (state, componentName) {
      let arr = state.openedTab
      for(var i=arr.length-1;i>0;i--){
        if(arr[i].menuurl==componentName){
          arr.splice(i,1)
        }
      }
      state.openedTab = arr
    },
    menus (state, menu){
      state.menu = menu

    },
    Org(state, Org){
      state.Organization = Org
    }
  }
})
