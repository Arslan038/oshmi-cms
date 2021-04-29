import Repository from './Repository'

const create_individual_member = 'individualmember/create'
const individual_member = 'individualmember'
const search = `members/search/phone`
const generate_receipt = `individualmember/receipt`
const generate_attendance = `individualmember/attendance/generate`

export default {
    // Create Individual Member
    createIndividualMember(payload) {
        return Repository.post(`${create_individual_member}`, payload)
    },
    // Fetch All Individual Members
    fetchIndividualMembers() {
        return Repository.get(`${individual_member}`)
    },

    // Fetch Single Individual Member
    fetchIndividualMember(payload) {
        return Repository.get(`${individual_member}/${payload}`)
    },

    // Update Individual Member
    updateIndividualMember(payload) {
        return Repository.put(`${individual_member}/${payload.id}`, payload)
    },

    // Search By Phone
    searchByPhone(payload) {
        return Repository.get(`${search}/${payload}`)
    },

    // Generate Receipt
    generateReceipt(payload) {
        console.log(payload)
        return Repository.post(`${generate_receipt}`, payload)
    },

    // Generate Attendance
    generateAttendance(payload) {
        console.log(payload)
        return Repository.post(`${generate_attendance}`, payload)
    }
}