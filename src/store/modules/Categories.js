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
            commit('setCategories', [])
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
    },

    // Delete Category
    async deleteCategory({commit}, payload) {
        try {
            const resp = await CategoryRepository.deleteCategory(payload);
            if(resp.data.status) {
                commit('deleteCategory', payload)
                commit("setToast", {message: resp.data.message, title: "Delete Category", type: "success"})
                return 1
            }
            else {
                commit("setToast", {message: resp.data.message, title: "Delete Category", type: "danger"})
                return 0
            }
        }
        catch(err) {
            commit("setToast", {message: err.message, title: "Delete Category", type: "danger"})
            return 0
        }
    },

    // Update Category
    async updateCategory({commit}, payload) {
        try {
            const resp = await CategoryRepository.updateCategory(payload);
            if(resp.data.status) {
                commit('updateCategory', payload)
                commit("setToast", {message: resp.data.message, title: "Update Category", type: "success"})
                return 1
            }
            else {
                commit("setToast", {message: resp.data.message, title: "Update Category", type: "danger"})
                return 0
            }
        }
        catch(err) {
            commit("setToast", {message: err.message, title: "Update Category", type: "danger"})
            return 0
        }
    }
}

const mutations = {
    // Add Category
    addCategory: (state, payload) => state.categories.push(payload),
    setCategories: (state, payload) => {
        let categoryArray = []
        payload.forEach(item => {
            if(!item.isDeleted) {
                categoryArray.push(item)
            }
        })
        state.categories = categoryArray
    },
    deleteCategory: (state, payload) => {
        state.categories = state.categories.filter(c => c.id != payload)
    },
    updateCategory: (state, payload) => {
        state.categories = state.categories.map(c => {
            if(c.id == payload.id) {
                return Object.assign({}, c, payload)
            }
            return c
        })
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}