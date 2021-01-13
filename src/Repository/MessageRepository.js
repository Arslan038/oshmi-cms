import Repository from './Repository'

const messages = `message`
const create_message = `message/create`

export default {
    // Create Message
    createMessage(payload) {
        return Repository.post(`${create_message}`, payload)
    },

    // Fetch Messages
    fetchMessages() {
        return Repository.get(`${messages}`)
    },

    // Delete Message
    deleteMessage(payload) {
        return Repository.delete(`${messages}/${payload}`)
    }
}