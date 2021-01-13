import Repository from './Repository'

const bookings = `booking`
const create_student_booking = `booking/create`
const create_corporate_booking = `booking/import`

export default {
    // Fetch Bookings
    fetchBookings() {
        return Repository.get(`${bookings}`)
    },

    // Update Booking
    updateBooking(payload) {
        return Repository.put(`${bookings}/${payload.id}`, payload)
    },

    // Create Student Booking
    createStudentBooking(payload) {
        return Repository.post(`${create_student_booking}`, payload)
    },

    // Create Corporate Booking
    createCorporateBooking(payload) {
        return Repository.post(`${create_corporate_booking}`, payload)
    }
}