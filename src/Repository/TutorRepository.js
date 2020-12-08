import Repository from './Repository'

const create = 'tutor/create'

export default {
    // Create Tutor
    createTutor(payload) {
        return Repository.post(`${create}`, payload)
    }
}