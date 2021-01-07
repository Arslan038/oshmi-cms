import { RepositoryFactory } from '@/Repository/RepositoryFactory'
const CorporateRepository = RepositoryFactory.get('corporate_repository')

const state = {
    corporate_members: [],
    corporate_member: null,
}

const getters = {
    getCorporateMembers: state => state.corporate_members,
    getCorporateMember: state => state.corporate_member
}

const actions = {
    // Create Corporate Member
    async createCorporateMember({commit}, payload) {
        try {
            const resp = await CorporateRepository.createCorporateMember(payload)
            console.log()
            if(resp.data.status) {
                commit('addCorporateMember', resp.data.member)
                commit("setToast", {message: resp.data.message, title: "Create Corporate Member", type: "success"})
                return 1
            }
            if(!resp.data.status) {
                commit("setToast", {message: resp.data.message, title: "Create Corporate Member", type: "danger"})
                return 0
            }
        } catch(err) {
            if(err.response) {
                commit("setToast", {message: err.response.data.message, title: "Create Corporate Member", type: "danger"})
                return 0
            }
            commit("setToast", {message: err.message, title: "Create Corporate Member", type: "danger"})
            return 0
        }
    },

    // Fetch Corporate Members
    async fetchCorporateMembers({commit}) {
        try {
            commit('setCorporateMembers', [])
            const resp = await CorporateRepository.fetchCorporateMembers();
            if(resp.data.success) {
                commit('setCorporateMembers', resp.data.members)
                return 1
            }
            else {
                commit("setToast", {message: resp.data.message, title: "Corporate Members", type: "danger"})
                return 0
            }
        }
        catch(err) {
            commit("setToast", {message: err.message, title: "Corporate Members", type: "danger"})
            return 0
        }
    },

    // Fetch Corporate Member
    async fetchCorporateMember({commit}, payload) {
        try {
            const resp = await CorporateRepository.fetchCorporateMember(payload);
            if(resp.data.success) {
                commit('setCorporateMember', resp.data.member)
                return 1
            }
            else {
                commit("setToast", {message: resp.data.message, title: "Corporate Member", type: "danger"})
                return 0
            }
        }
        catch(err) {
            commit("setToast", {message: err.message, title: "Corporate Member", type: "danger"})
            return 0
        }
    },

    async updateCorporateMember({commit}, payload) {
        try {
            const resp = await CorporateRepository.updateCorporateMember(payload);
            console.log(resp.data)
            if(resp.data.status) {
                commit('updateCorporateMember', payload)
                commit("setToast", {message: resp.data.message, title: "Update Corporate Member", type: "success"})
                return 1
            }
            else {
                commit("setToast", {message: resp.data.message, title: "Update Corporate Member", type: "danger"})
                return 0
            }
        }
        catch(err) {
            console.log(err.response)
            commit("setToast", {message: err.message, title: "Update Corporate Member", type: "danger"})
            return 0
        }
    }
}

const mutations = {
    setCorporateMembers: (state, payload) => state.corporate_members = payload,
    setCorporateMember: (state, payload) => state.corporate_member = payload,
    addCorporateMember: (state, payload) => state.corporate_members.push(payload),
    updateCorporateMember: (state, payload) => {
        state.corporate_members = state.corporate_members.map(t => {
            if(t.id == payload.id) {
                return Object.assign({}, t, payload)
            }
            return t
        })
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}