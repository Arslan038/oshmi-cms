import { RepositoryFactory } from '@/Repository/RepositoryFactory'
const MemberRepository = RepositoryFactory.get('member_repository')

const state = {
    individual_members: [],
    individual_member: null,
    new_member: null,
    searchedMember: null,
}

const getters = {
    getIndividualMembers: state => state.individual_members,
    getIndividualMember: state => state.individual_member,
    getNewMember: state => state.new_member,
    getSearchedMember: state => state.searchedMember
}

const actions = {
    // Create Individual Member
    async createIndividualMember({commit}, payload) {
        try {
            commit('setNewMember', null)
            const resp = await MemberRepository.createIndividualMember(payload)
            if(resp.data.status) {
                commit('addIndividualMember', resp.data.member)
                commit('setNewMember', resp.data.member)
                commit("setToast", {message: resp.data.message, title: "Create Individual Member", type: "success"})
                return 1
            }
            if(resp.data.error) {
                return resp.data.error
            }
        } catch(err) {
            commit("setToast", {message: err.message, title: "Create Individual Member", type: "danger"})
            return 0
        }
    },

    // Fetch Individual Members
    async fetchIndividualMembers({commit}) {
        try {
            commit('setIndividualMembers', [])
            const resp = await MemberRepository.fetchIndividualMembers();
            if(resp.data.success) {
                commit('setIndividualMembers', resp.data.members)
                return 1
            }
            else {
                commit("setToast", {message: resp.data.message, title: "Individual Members", type: "danger"})
                return 0
            }
        }
        catch(err) {
            commit("setToast", {message: err.message, title: "Individual Members", type: "danger"})
            return 0
        }
    },

    // Fetch Individual Member
    async fetchIndividualMember({commit}, payload) {
        try {
            const resp = await MemberRepository.fetchIndividualMember(payload);
            if(resp.data.success) {
                commit('setIndividualMember', resp.data.member)
                return 1
            }
            else {
                commit("setToast", {message: resp.data.message, title: "Individual Member", type: "danger"})
                return 0
            }
        }
        catch(err) {
            commit("setToast", {message: err.message, title: "Individual Member", type: "danger"})
            return 0
        }
    },

    async updateIndividualMember({commit}, payload) {
        try {
            const resp = await MemberRepository.updateIndividualMember(payload);
            console.log(resp.data)
            if(resp.data.status) {
                commit('updateIndividualMember', payload)
                commit("setToast", {message: resp.data.message, title: "Update Individual Member", type: "success"})
                return 1
            }
            else {
                commit("setToast", {message: resp.data.message, title: "Update Individual Member", type: "danger"})
                return 0
            }
        }
        catch(err) {
            commit("setToast", {message: err.message, title: "Update Individual Member", type: "danger"})
            return 0
        }
    },

    // Search Member By Phone
    async searchByPhone({commit}, payload) {
        try {
            commit('setSearchedMember', null)
            const resp = await MemberRepository.searchByPhone(payload);
            if(resp.data.success) {
                if(resp.data.members && resp.data.members.length) {
                    console.log(resp.data.members)
                    commit('setSearchedMember', resp.data.members[0])
                    commit("setToast", {message: resp.data.message, title: "Search Member", type: "success"})
                    return 1
                }
                else {
                    commit("setToast", {message: "Member Not Found.", title: "Search Member", type: "danger"})
                    return 0
                }
            }
            else {
                commit("setToast", {message: resp.data.message, title: "Search Member", type: "danger"})
                return 0
            }
        }
        catch(err) {
            commit("setToast", {message: err.message, title: "Search Member", type: "danger"})
            return 0
        }
    }
}

const mutations = {
    setIndividualMembers: (state, payload) => {
        let memberArray = []
        payload.forEach(item => {
            if(!item.isDeleted) {
                memberArray.push(item)
            }
        })
        state.individual_members = memberArray
    },
    setNewMember: (state, payload) => state.new_member = payload,
    setIndividualMember: (state, payload) => state.individual_member = payload,
    addIndividualMember: (state, payload) => state.individual_members.push(payload),
    updateIndividualMember: (state, payload) => {
        state.individual_members = state.individual_members.map(t => {
            if(t.id == payload.id) {
                return Object.assign({}, t, payload)
            }
            return t
        })
    },
    setSearchedMember: (state, payload) => {
        console.log(payload)
        state.searchedMember = payload
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}