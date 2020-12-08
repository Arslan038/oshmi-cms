import { RepositoryFactory } from '@/Repository/RepositoryFactory'
const TutorRepository = RepositoryFactory.get('tutor_repository')

const state = {
    tutors: []
}

const getters = {
    getTutors: state => state.tutors
}

const actions = {
    // Create Tutor
    async createTutor({commit}, payload) {
        try {
            const resp = await TutorRepository.createTutor(payload)
            if(resp.data.status) {
                commit("setToast", {message: resp.data.message, title: "Create Tutor", type: "success"})
                commit('addTutor', resp.data.Tutor)
                return 1
            }
            else {
                commit("setToast", {message: resp.data.message, title: "Create Tutor", type: "danger"})
                return 0
            }
        }
        catch(err) {
            commit("setToast", {message: err.message, title: "Create Tutor", type: "danger"})
            return 0
        }
    },

    // Fetch Tutors
    async fetchTutors({commit}) {
        try {
            const resp = await TutorRepository.fetchTutors();
            if(resp.data.danger) {
                commit('setTutors', resp.data.tutors)
                return 1
            }
            else {
                commit("setToast", {message: resp.data.message, title: "Tutors List", type: "danger"})
                return 0
            }
        }
        catch(err) {
            commit("setToast", {message: err.message, title: "Tutors List", type: "danger"})
            return 0
        }
    }
}

const mutations = {
    // Add Tutor
    addTutor: (state, payload) => state.tutors.push(payload),
    // Set All Tutors
    setTutors: (state, payload) => state.tutors = payload,
}

export default {
    state,
    getters,
    actions,
    mutations
}