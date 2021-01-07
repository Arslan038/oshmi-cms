import { RepositoryFactory } from '@/Repository/RepositoryFactory'
const BookingRepository = RepositoryFactory.get('booking_repository')

const state = {
    bookings: [],
}

const getters = {
    getBookings: state => state.bookings
}

const actions = {
    // Fetch All Bookings
    async fetchBookings({commit}) {
        try {
            const resp = await BookingRepository.fetchBookings()
            if(resp.data.status) {
                commit("setToast", {message: resp.data.message, title: "Fetch Bookings", type: "success"})
                commit('setBookings', resp.data.bookings)
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
    }
}

const mutations = {
    setBookings: (state, payload) => state.bookings = payload
}

export default {
    state,
    getters,
    actions,
    mutations
}