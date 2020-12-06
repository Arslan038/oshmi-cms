import Repository from './Repository'

const login_request = 'admin/signin'

export default {
    // Login User
    loginRequest(payload) {
        return Repository.post(`${login_request}`, payload)
    }
}