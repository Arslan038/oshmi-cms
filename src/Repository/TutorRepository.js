import Repository from './Repository'

const create = 'tutor/create'
const tutor = `tutor`

export default {
    // Create Tutor
    createTutor(payload) {
        return Repository.post(`${create}`, payload)
    },

    // Fetch Tutors
    fetchTutors() {
        return Repository.get(`${tutor}`)
    },

    // Fetch Single Tutor
    fetchTutor(payload) {
        return Repository.get(`${tutor}/${payload}`)
    },

    // Delete Tutor
    deleteTutor(payload) {
        return Repository.delete(`${tutor}/${payload}`)
    },

    // Update Tutor
    updateTutor(payload) {
        return Repository.put(`${tutor}/${payload.id}`, payload.data)
    }
}