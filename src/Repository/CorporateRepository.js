import Repository from './Repository'

const create_corporate_member = 'corporatemember/create'
const corporate_member = 'corporatemember/balance'
const settle_payment = 'booking/settle'

export default {
    // Create Corporate Member
    createCorporateMember(payload) {
        return Repository.post(`${create_corporate_member}`, payload)
    },
    // Fetch All Corporate Members
    fetchCorporateMembers() {
        return Repository.get(`${corporate_member}`)
    },

    // Fetch Single Corporate Member
    fetchCorporateMember(payload) {
        return Repository.get(`${corporate_member}/${payload}`)
    },

    // Update Corporate Member
    updateCorporateMember(payload) {
        return Repository.put(`${corporate_member}/${payload.id}`, payload.data)
    },

    // Settle Payment
    settlePayment(payload) {
        return Repository.put(`${settle_payment}`, payload)
    }
}