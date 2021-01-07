import { RepositoryFactory } from '@/Repository/RepositoryFactory'
const LessonRepository = RepositoryFactory.get('lesson_repository')

const state = {
    lessons: [],
    lesson: null,
    courseLessons: []
}

const getters = {
    getLessons: state => state.lessons,
    getLesson: state => state.lesson,
    getCourseLessons: state => state.courseLessons
}

const actions = {
    // Create Lesson
    async createLesson({commit}, payload) {
        try {
            const resp = await LessonRepository.createLesson(payload)
            if(resp.data.status) {
                commit('addLesson', resp.data.lesson)
                commit("setToast", {message: resp.data.message, title: "Create Lesson", type: "success"})
                return 1
            }
            if(resp.data.error) {
                return resp.data.error
            }
        } catch(err) {
            console.log(err.response.data)
            commit("setToast", {message: err.message, title: "Create Lesson", type: "danger"})
            return 0
        }
    },

    // Fetch Lessons
    async fetchLessons({commit}) {
        try {
            commit('setLessons', [])
            const resp = await LessonRepository.fetchLessons();
            if(resp.data.success) {
                commit('setLessons', resp.data.lessons)
                return 1
            }
            else {
                commit("setToast", {message: resp.data.message, title: "Lessons List", type: "danger"})
                return 0
            }
        }
        catch(err) {
            commit("setToast", {message: err.message, title: "Lessons List", type: "danger"})
            return 0
        }
    },

    // Fetch Course Lessons
    async fetchCourseLessons({commit}, payload) {
        try {
            commit('setCourseLessons', [])
            const resp = await LessonRepository.fetchCourseLessons(payload);
            if(resp.data.success) {
                commit('setCourseLessons', resp.data.lessons)
                return 1
            }
            else {
                commit("setToast", {message: resp.data.message, title: "Course Lessons", type: "danger"})
                return 0
            }
        }
        catch(err) {
            commit("setToast", {message: err.message, title: "Course Lessons", type: "danger"})
            return 0
        }
    },

    // Delete Lesson
    async deleteLesson({commit}, payload) {
        try {
            const resp = await LessonRepository.deleteLesson(payload);
            if(resp.data.status) {
                commit('deleteLesson', payload)
                commit("setToast", {message: resp.data.message, title: "Delete Lesson", type: "success"})
                return 1
            }
            else {
                commit("setToast", {message: resp.data.message, title: "Delete Lesson", type: "danger"})
                return 0
            }
        }
        catch(err) {
            commit("setToast", {message: err.message, title: "Delete Lesson", type: "danger"})
            return 0
        }
    },

    // Fetch Single Lesson
    async fetchLesson({commit}, payload) {
        try {
            const resp = await LessonRepository.fetchLesson(payload);
            if(resp.data.success) {
                commit('setLesson', resp.data.lesson)
                return 1
            }
            else {
                commit("setToast", {message: resp.data.message, title: "Lesson Details", type: "danger"})
                return 0
            }
        }
        catch(err) {
            commit("setToast", {message: err.message, title: "Lesson Details", type: "danger"})
            return 0
        }
    },

    // Update Lesson
    async updateLesson({commit}, payload) {
        try {
            const resp = await LessonRepository.updateLesson(payload);
            console.log(resp.data)
            if(resp.data.status) {
                commit('updateLesson', resp.data.lesson)
                commit("setToast", {message: resp.data.message, title: "Update Lesson", type: "success"})
                return 1
            }
            else {
                commit("setToast", {message: resp.data.message, title: "Update Lesson", type: "danger"})
                return 0
            }
        }
        catch(err) {
            commit("setToast", {message: err.message, title: "Update Lesson", type: "danger"})
            return 0
        }
    }
}

const mutations = {
    addLesson: (state, payload) => state.lessons.push(payload),
    setLessons: (state, payload) => {
        let all_lessons = []
        payload.forEach(lesson => {
            if(!lesson.isDeleted) {
                all_lessons.push(lesson)    
            }
        })
        state.lessons = all_lessons
    },
    setLesson: (state, payload) => state.lesson = payload,
    setCourseLessons: (state, payload) => {
        let all_lessons = []
        payload.forEach(lesson => {
            if(!lesson.isDeleted) {
                all_lessons.push(lesson)    
            }
        })
        state.courseLessons = all_lessons
    },
    deleteLesson: (state, payload) => {
        state.lessons = state.lessons.filter(c => c.id != payload)
    },
    updateLesson: (state, payload) => {
        console.log(payload)
        state.lessons = state.lessons.map(lesson => {
            if(lesson.id == payload.id) {
                return Object.assign({}, lesson, payload)
            }
            return lesson
        })
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}