import Repository from './Repository'

const create = 'category/create'
const update_category = `category`
const fetch_categories = `category`
const delete_category = `category`

export default {
    // Create Category
    createCategory(payload) {
        return Repository.post(`${create}`, payload);
    },

    // Fetch Categories
    fetchCategories() {
        return Repository.get(`${fetch_categories}`);
    },

    // Delete Category
    deleteCategory(id) {
        return Repository.delete(`${delete_category}/${id}`)
    },

    // Update Category
    updateCategory(payload) {
        const data = {
            name: payload.name
        }
        return Repository.patch(`${update_category}/`+payload.id, data);
    }
}