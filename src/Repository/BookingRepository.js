import Repository from './Repository'

const bookings = `booking`
const create_student_booking = `booking/create`
const create_corporate_booking = `booking/import`
const update_payment_method = `booking/paymentmethod`
const get_attendance = `notifications/attendance`

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
    },

    // Update Booking Payment Method
    updateBookingPaymentMethod(payload) {
        return Repository.post(`${update_payment_method}`, payload)
    },

    // Fetch Booking Attendance
    fetchAttendance(payload) {
        return Repository.get(`${get_attendance}/${payload}`)
    },
}