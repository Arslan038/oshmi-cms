import Vue from 'vue'
import Vuex from 'vuex'
import User from './modules/User'
import Course from './modules/Course'
import Categories from './modules/Categories'
import Tutor from './modules/Tutor'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    toast: null
  },
  getters: {
    getToast: state => state.toast
  },
  mutations: {
    setToast: (state, payload) => state.toast = payload
  },
  modules: {
    User,
    Course,
    Categories,
    Tutor
  }
})
