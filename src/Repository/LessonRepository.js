import Repository from './Repository'

const create_lesson = 'lesson/create'
const lesson = `lesson`

export default {
    // Create Lesson
    createLesson(payload) {
        return Repository.post(`${create_lesson}`, payload)
    },

    // Fetch Lessons
    fetchLessons() {
        return Repository.get(`${lesson}`)
    },

    // Fetch Course Lessons
    fetchCourseLessons(courseId) {
        return Repository.get(`${lesson}?courseId=${courseId}`)
    },

    // Fetch Single Lesson
    fetchLesson(payload) {
        return Repository.get(`${lesson}/${payload}`)
    },

    // Delete Lesson
    deleteLesson(id) {
        return Repository.delete(`${lesson}/${id}`)
    },

    // Update Lesson
    updateLesson(payload) {
        return Repository.put(`${lesson}/${payload.id}`, payload)
    }
}