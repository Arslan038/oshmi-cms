import { RepositoryFactory } from '@/Repository/RepositoryFactory'
const CourseRepository = RepositoryFactory.get('course_repository')

const state = {
    courses: [],
    course: null,
}

const getters = {
    getCourses: state => state.courses,
    getCourse: state => state.course
}

const actions = {
    // Create Course
    async createCourse({commit}, payload) {
        try {
            const resp = await CourseRepository.createCourse(payload)
            if(resp.data.status) {
                commit('addCourse', resp.data.course)
                commit("setToast", {message: resp.data.message, title: "Create Course", type: "success"})
                return 1
            }
            if(resp.data.error) {
                return resp.data.error
            }
        } catch(err) {
            commit("setToast", {message: err.message, title: "Create Course", type: "danger"})
            return 0
        }
    },

    // Fetch Courses
    async fetchCourses({commit}) {
        try {
            commit('setCourses', [])
            const resp = await CourseRepository.fetchCourses();
            if(resp.data.success) {
                commit('setCourses', resp.data.courses)
                return 1
            }
            else {
                commit("setToast", {message: resp.data.message, title: "Courses List", type: "danger"})
                return 0
            }
        }
        catch(err) {
            commit("setToast", {message: err.message, title: "Courses List", type: "danger"})
            return 0
        }
    },

    // Delete Course
    async deleteCourse({commit}, payload) {
        try {
            const resp = await CourseRepository.deleteCourse(payload);
            if(resp.data.status) {
                commit('deleteCourse', payload)
                commit("setToast", {message: resp.data.message, title: "Delete Course", type: "success"})
                return 1
            }
            else {
                commit("setToast", {message: resp.data.message, title: "Delete Course", type: "danger"})
                return 0
            }
        }
        catch(err) {
            commit("setToast", {message: err.message, title: "Delete Course", type: "danger"})
            return 0
        }
    },

    // Fetch Single Course
    async fetchCourse({commit}, payload) {
        try {
            const resp = await CourseRepository.fetchCourse(payload);
            if(resp.data.success) {
                commit('setCourse', resp.data.course)
                return 1
            }
            else {
                commit("setToast", {message: resp.data.message, title: "Course Details", type: "danger"})
                return 0
            }
        }
        catch(err) {
            commit("setToast", {message: err.message, title: "Course Details", type: "danger"})
            return 0
        }
    },

    // Update Course
    async updateCourse({commit}, payload) {
        try {
            const resp = await CourseRepository.updateCourse(payload);
            console.log(resp.data)
            if(resp.data.status) {
                commit('updateCourse', resp.data.course)
                commit("setToast", {message: resp.data.message, title: "Update Course", type: "success"})
                return 1
            }
            else {
                commit("setToast", {message: resp.data.message, title: "Update Course", type: "danger"})
                return 0
            }
        }
        catch(err) {
            console.log(err.response.data)
            commit("setToast", {message: err.message, title: "Update Course", type: "danger"})
            return 0
        }
    }
}

const mutations = {
    addCourse: (state, payload) => state.courses.push(payload),
    setCourses: (state, payload) => {
        let courseArray = []
        payload.forEach(item => {
            if(!item.isDeleted) {
                courseArray.push(item)
            }
        })
        state.courses = courseArray
    },
    setCourse: (state, payload) => state.course = payload,
    deleteCourse: (state, payload) => {
        state.courses = state.courses.filter(c => c.id != payload)
    },
    updateCourse: (state, payload) => {
        state.courses = state.courses.map(c => {
            if(c.id == payload.id) {
                return Object.assign({}, c, payload)
            }
            return c
        })
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}