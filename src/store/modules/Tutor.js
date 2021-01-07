import { RepositoryFactory } from '@/Repository/RepositoryFactory'
const TutorRepository = RepositoryFactory.get('tutor_repository')

const state = {
    tutors: [],
    tutor: null
}

const getters = {
    getTutors: state => state.tutors,
    getTutor: state => state.tutor
}

const actions = {
    // Create Tutor
    async createTutor({commit}, payload) {
        try {
            const resp = await TutorRepository.createTutor(payload)
            if(resp.data.status) {
                commit("setToast", {message: resp.data.message, title: "Create Tutor", type: "success"})
                commit('addTutor', resp.data.tutor)
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
            commit('setTutors', [])
            const resp = await TutorRepository.fetchTutors();
            if(resp.data.success) {
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
    },

    // Fetch Single Tutor
    async fetchTutor({commit}, payload) {
        try {
            const resp = await TutorRepository.fetchTutor(payload);
            if(resp.data.success) {
                commit('setTutor', resp.data.tutor)
                return 1
            }
            else {
                commit("setToast", {message: resp.data.message, title: "Tutor Information", type: "danger"})
                return 0
            }
        }
        catch(err) {
            commit("setToast", {message: err.message, title: "Tutor Information", type: "danger"})
            return 0
        }
    },

    // Update Tutor
    async updateTutor({commit}, payload) {
        try {
            const resp = await TutorRepository.updateTutor(payload);
            if(resp.data.status) {
                commit('updateTutor', resp.data.tutor)
                commit("setToast", {message: resp.data.message, title: "Update Tutor", type: "success"})
                return 1
            }
            else {
                commit("setToast", {message: resp.data.message, title: "Update Tutor", type: "danger"})
                return 0
            }
        }
        catch(err) {
            commit("setToast", {message: err.message, title: "Update Tutor", type: "danger"})
            return 0
        }
    },

    // Delete Tutor
    async deleteTutor({commit}, payload) {
        try {
            const resp = await TutorRepository.deleteTutor(payload);
            if(resp.data.status) {
                commit('deleteTutor', payload)
                commit("setToast", {message: resp.data.message, title: "Delete Tutor", type: "success"})
                return 1
            }
            else {
                commit("setToast", {message: resp.data.message, title: "Delete Tutor", type: "danger"})
                return 0
            }
        }
        catch(err) {
            commit("setToast", {message: err.message, title: "Delete Tutor", type: "danger"})
            return 0
        }
    }

}

const mutations = {
    // Add Tutor
    addTutor: (state, payload) => state.tutors.push(payload),
    // Set All Tutors
    setTutors: (state, payload) => {
        let tutorArray = []
        payload.forEach(item => {
            if(!item.isDeleted) {
                tutorArray.push(item)
            }
        })
        state.tutors = tutorArray
    },
    // Set Single Tutor
    setTutor: (state, payload) => state.tutor = payload,
    // Delete Tutor
    deleteTutor: (state, payload) => {
        state.tutors = state.tutors.filter(t => t.id != payload)
    },
    updateTutor: (state, payload) => {
        state.tutors = state.tutors.map(t => {
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