import { RepositoryFactory } from '@/Repository/RepositoryFactory'
const MessageRepository = RepositoryFactory.get('message_repository')

const state = {
    messages: []
}

const getters = {
    getMessages: state => state.messages
}

const actions = {
    // Create Message
    async createMessage({commit}, payload) {
        try {
            const resp = await MessageRepository.createMessage(payload)
            if(resp.data.status) {
                commit('addMessage', resp.data.message)
                commit("setToast", {message: "Message Sent", title: "Create Message", type: "success"})
                return 1
            }
            else {
                commit("setToast", {message: "Something went wrong", title: "Create Message", type: "danger"})
                return 0
            }
        } catch(err) {
            commit("setToast", {message: err.message, title: "Create Message", type: "danger"})
            return 0
        }
    },

    // Delete Message
    async deleteMessage({commit}, payload) {
        try {
            const resp = await MessageRepository.deleteMessage(payload)
            if(resp.data.status) {
                commit('removeMessage', payload)
                commit("setToast", {message: "Message Deleted Successfully.", title: "Delete Message", type: "success"})
                return 1
            }
            else {
                commit("setToast", {message: "Something went wrong", title: "Delete Message", type: "danger"})
                return 0
            }
        } catch(err) {
            commit("setToast", {message: err.message, title: "Delete Message", type: "danger"})
            return 0
        }
    },

    // Fetch Messages
    async fetchMessages({commit}) {
        try {
            const resp = await MessageRepository.fetchMessages();
            if(resp.data.success) {
                commit('setMessages', resp.data.messages)
                return 1
            }
            else {
                commit("setToast", {message: resp.data.message, title: "Messages", type: "danger"})
                return 0
            }
        }
        catch(err) {
            commit("setToast", {message: err.message, title: "Messages", type: "danger"})
            return 0
        }
    }
}

const mutations = {
    addMessage: (state, payload) => state.messages.push(payload),
    setMessages: (state, payload) => state.messages = payload,
    removeMessage: (state, payload) => {
        state.messages = state.messages.filter(msg => msg.id != payload)
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}