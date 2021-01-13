import { RepositoryFactory } from '@/Repository/RepositoryFactory'
const BookingRepository = RepositoryFactory.get('booking_repository')

const state = {
    bookings: [],
    lesson_bookings: []
}

const getters = {
    getBookings: state => state.bookings,
    getLessonBookings: state => state.lesson_bookings
}

const actions = {
    // Fetch All Bookings
    async fetchBookings({commit}) {
        try {
            const resp = await BookingRepository.fetchBookings()
            console.log(resp)
            if(resp.data.success) {
                commit("setToast", {message: resp.data.message, title: "Fetch Bookings", type: "success"})
                commit('setBookings', resp.data.result)
                return 1
            }
            else {
                commit("setToast", {message: resp.data.message, title: "Fetch Bookings", type: "danger"})
                return 0
            }
        }
        catch(err) {
            commit("setToast", {message: err.message, title: "Fetch Bookings", type: "danger"})
            return 0
        }
    },

    // Create Student Booking
    async createStudentBooking({commit}, payload) {
        try {
            const resp = await BookingRepository.createStudentBooking(payload)
            if(resp.data.status) {
                commit("setToast", {message: "Booking Created Successfully", title: "Create Bookings", type: "success"})
                commit('addBooking', resp.data.booking)
                return 1
            }
            else {
                commit("setToast", {message: "Something went wrong.", title: "Create Bookings", type: "danger"})
                return 0
            }
        }
        catch(err) {
            commit("setToast", {message: err.message, title: "Create Bookings", type: "danger"})
            return 0
        }
    },

    // Create Corporate Booking
    async createCorporateBooking({commit}, payload) {
        try {
            const resp = await BookingRepository.createCorporateBooking(payload)
            console.log(resp)
            if(resp.data.status) {
                commit("setToast", {message: "Booking Created Successfully", title: "Create Bookings", type: "success"})
                commit('addBooking', resp.data.booking)
                return 1
            }
            else {
                commit("setToast", {message: "Something went wrong.", title: "Create Bookings", type: "danger"})
                return 0
            }
        }
        catch(err) {
            commit("setToast", {message: err.message, title: "Create Bookings", type: "danger"})
            return 0
        }
    },

    // Update Booking
    async updateBooking({commit}, payload) {
        try {
            const resp = await BookingRepository.updateBooking(payload)
            console.log(resp)
            if(resp.data.status) {
                commit("setToast", {message: "Booking Updated Successfully", title: "Update Booking", type: "success"})
                commit('editBooking', payload)
                return 1
            }
            else {
                commit("setToast", {message: "Something went wrong.", title: "Update Booking", type: "danger"})
                return 0
            }
        }
        catch(err) {
            commit("setToast", {message: err.message, title: "Update Booking", type: "danger"})
            return 0
        }
    }
}

const mutations = {
    setBookings: (state, payload) => {
        let bookings = []
        payload.forEach(item => {
            if(item.corporateId) {
                item.payment_type = "Monthly"
            }
            else {
                item.payment_type = item.IndividualMember.paymentMethod
            }

            bookings.push(item)
        })
        state.bookings = bookings
    },
    setLessonBookings: (state, payload) => state.lesson_bookings = payload,
    addBooking: (state, payload) => state.bookings.push(payload),
    editBooking: (state, payload) => {
        state.bookings = state.bookings.map(t => {
            if(t.id == payload.id) {
                t.status = payload.status
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