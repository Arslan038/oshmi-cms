import Repository from './Repository'

const bookings = `booking`

export default {
    // Fetch Bookings
    fetchBookings() {
        return Repository.get(`${bookings}`)
    }
}