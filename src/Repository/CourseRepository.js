import Repository from './Repository'

const create_course = 'course/create'
const course = `course`

export default {
    // Create Course
    createCourse(payload) {
        return Repository.post(`${create_course}`, payload)
    },

    // Fetch Courses
    fetchCourses() {
        return Repository.get(`${course}`)
    },

    // Fetch Single Course
    fetchCourse(payload) {
        return Repository.get(`${course}/${payload}`)
    },

    // Delete Course
    deleteCourse(id) {
        return Repository.delete(`${course}/${id}`)
    },

    // Update Course
    updateCourse(payload) {
        return Repository.put(`${course}/${payload.id}`, payload.data)
    }
}