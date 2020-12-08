import { RepositoryFactory } from '@/Repository/RepositoryFactory'
const CategoryRepository = RepositoryFactory.get('category_repository')

const state = {
    categories: []
}

const getters = {
    getCategories: state => state.categories
}

const actions = {
    // Create Category
    async createCategory({commit}, payload) {
        try {
            const resp = await CategoryRepository.createCategory(payload)
            if(resp.data.status) {
                commit("setToast", {message: resp.data.message, title: "Create Category", type: "success"})
                commit('addCategory', resp.data.category)
                return 1
            }
            else {
                commit("setToast", {message: resp.data.message, title: "Create Category", type: "danger"})
                return 0
            }
        }
        catch(err) {
            commit("setToast", {message: err.message, title: "Create Category", type: "danger"})
            return 0
        }
    },

    // Fetch Categories
    async fetchCategories({commit}) {
        try {
            const resp = await CategoryRepository.fetchCategories();
            if(resp.data.success) {
                commit('setCategories', resp.data.categories)
                return 1
            }
            else {
                commit("setToast", {message: resp.data.message, title: "Categories List", type: "danger"})
                return 0
            }
        }
        catch(err) {
            commit("setToast", {message: err.message, title: "Categories List", type: "danger"})
            return 0
        }
    }
}

const mutations = {
    // Add Category
    addCategory: (state, payload) => state.categories.push(payload),
    setCategories: (state, payload) => state.categories = payload,
}

export default {
    state,
    getters,
    actions,
    mutations
}