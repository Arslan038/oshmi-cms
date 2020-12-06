import Repository from './Repository'

const create_course = 'admin/signin'

export default {
    // Create Course
    createCourse(payload) {
        return Repository.post(`${create_course}`, payload)
    }
}