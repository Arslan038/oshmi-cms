import Repository from '@/Repository/Repository'
import { RepositoryFactory } from '@/Repository/RepositoryFactory'
const UserRepository = RepositoryFactory.get('user_repository')
import mixin from '@/mixins/global'

const state = {
    loggedUser: null
}

const getters = {}

const actions = {
    // Login User
    async loginRequest({commit}, payload) {
        try {
            const resp = await UserRepository.loginRequest(payload)
            if(resp.data.success) {
                commit("setToast", {message: resp.data.message, title: "Login", type: "success"})
                commit('setLoggedUser', resp.data)
                return 1
            }
            else {
                mixin.methods.deleteToken
                console.log("ERROR...")
                commit("setToast", {message: resp.data.message, title: "Login", type: "danger"})
                return 0
            }
        }
        catch(err) {
            if(err.response) {
                console.log("ERROR 1...")
                commit("setToast", {message: err.response.data.message, title: "Login", type: "danger"})
                return 0    
            }
            commit("setToast", {message: "Email or Password Incorrect.", title: "Login", type: "danger"})
            return 0
        }
    }
}

const mutations = {
    setLoggedUser: (state, payload) => {
        state.loggedUser = payload.user
        mixin.methods.setUserToken(payload.token)
        localStorage.setItem('oshmiAdmin', JSON.stringify(payload.user))
        Repository.defaults.headers.Authorization = `Bearer ${payload.token}`;
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}