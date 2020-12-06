import { RepositoryFactory } from '@/Repository/RepositoryFactory'
const UserRepository = RepositoryFactory.get('user_repository')

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
                commit("setToast", {message: resp.data.message, title: "Login", type: "danger"})
                return 0
            }
        }
        catch(err) {
            commit("setToast", {message: err.message, title: "Login", type: "danger"})
            return 0
        }
    }
}

const mutations = {
    setLoggedUser: (state, payload) => {
        state.loggedUser = payload.user
        localStorage.setItem('oshmiAdmin', JSON.stringify(payload.user))
        localStorage.setItem('oshmiToken', JSON.stringify(payload.token))
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}