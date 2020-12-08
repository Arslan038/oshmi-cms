import Repository from './Repository'

const create = 'category/create'
const fetch_categories = `category`

export default {
    // Create Category
    createCategory(payload) {
        return Repository.post(`${create}`, payload);
    },

    // Fetch Categories
    fetchCategories() {
        return Repository.get(`${fetch_categories}`);
    }
}