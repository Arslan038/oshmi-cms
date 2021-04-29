<template>
    <div class="home">
        <Header msg="Welcome to Your Vue.js App" />
        <SecondaryHeader :breadcrumb="breadcrumb" title="Categories"  />
        <b-container class="card bg-white mt-2 pb-5 pt-2">
            <CoursesHeader :create="false" addtext="Add Booking" reroute="/add-booking" />
            
            <b-row v-if="loading">
                <b-col cols="12" class="text-center mt-3">
                    <b-spinner variant="purple"></b-spinner>
                    <p>Loading Categories</p>
                </b-col>
            </b-row>

            <b-row v-if="!loading && !categories.length">
                <b-col cols="12" class="text-center mt-3">
                    <h5 class="text-green">No Category Found</h5>
                </b-col>
            </b-row>

            <div class="mt-5 text-md-left d-flex" v-if="!loading && categories.length">
                <div class="self-center">
                    Search
                </div>
                <div class="ml-3">
                    <input class="border-hids form-control col-md-12" type="search" v-model="filter" />
                </div>
            </div>

            <b-row class="mt-2" v-if="!loading && categories.length">
                <b-col md="6" cols="12">
                    
                    <b-table bordered :responsive="true" striped hover :fields="fields" :items="categories" :current-page="currentPage" :per-page="rowsPerPage" :filter="filter">
                        <template v-slot:head(name)>
                            <span class="smalls">Name</span>
                        </template>
                        <template v-slot:head(no_course)>
                            <span class="smalls">No. Course</span>
                        </template>
                        <template v-slot:head(action)>
                            <span class="smalls">Action</span>
                        </template>
 
                        <!-- Cells -->
                        <template v-slot:cell(name)="data">
                            <span class="smalls">{{data.item.name}} </span>
                        </template>
                        <template v-slot:cell(no_course)="data">
                            <span class="smalls">{{data.item.categoryCourses ? countCourses(data.item.categoryCourses) : 0}}</span>
                        </template>
                        <template v-slot:cell(action)="data">
                            <span @click="editCategory(data.item)" class="mr-2 text-primary"><i class="fas fa-pencil-alt"></i></span>
                            <span @click="removeCategory(data.item)" class="smalls"><i class="fas fa-trash text-danger"></i></span>
                        </template>
                    </b-table>
                    <div class="float-right">
                        <b-pagination v-model="currentPage" :total-rows="categories.length" :per-page="rowsPerPage" class="my-0" pills></b-pagination>
                    </div>
                </b-col>

                
            </b-row>
            <b-row class="mt-4">
                <b-col class="text-md-left">
                    <b-button variant="outline-danger" @click="addModal = !addModal" pill class="pr-4 pl-4">
                        Add Category
                    </b-button>
                </b-col>
            </b-row>
        </b-container>

        <!-- Add Category Modal -->
        
        <b-modal v-model="addModal" title="Create Category" hide-footer>
            <b-form @submit.prevent="submitNewCategory">
                <b-row>
                    <b-col cols="12">
                        <b-form-group>
                            <label for="category_name">Category Name*</label>
                            <b-form-input v-model="category.name" placeholder="Enter Category Name" required></b-form-input>
                        </b-form-group>
                        <b-button variant="danger" pill type="submit" :disabled="createLoading">{{createLoading ? 'Creating Category...' : 'Create Category'}}</b-button>
                        <b-button variant="outline-danger" class="ml-2" pill @click="addModal = !addModal">Cancel</b-button>
                    </b-col>
                </b-row>
            </b-form>
        </b-modal>

        <!-- Update Modal -->

        <b-modal title="Update Category" v-model="editModal" hide-footer centered>
            <b-form @submit.prevent="editCategoryNow" v-if="categoryToEdit">
                <b-row>
                    <b-col cols="12">
                        <b-form-group>
                            <label for="category_name">Category Name*</label>
                            <b-form-input v-model="categoryToEdit.name" placeholder="Enter Category Name" required></b-form-input>
                        </b-form-group>
                        <b-button variant="danger" pill type="submit" :disabled="editLoading">{{editLoading ? 'Updating Category...' : 'Update Category'}}</b-button>
                        <b-button variant="outline-danger" class="ml-2" pill @click="editModal = !editModal">Cancel</b-button>
                    </b-col>
                </b-row>
            </b-form>
        </b-modal>
        
        <!-- Delete Modal -->

        <b-modal title="Delete Category" v-model="deleteModal" hide-footer centered>
            <b-container class="text-center" v-if="categoryToDelete">
                <p> <b>Are you sure you want to delete category "<strong class="text-green">{{categoryToDelete.name}}</strong>" ?</b> </p>
                <div>
                <b-button variant="danger" pill @click="removeCategoryNow" :disabled="deleteLoading">
                    {{deleteLoading ? 'Deleting Category...' : 'Yes'}}
                </b-button>
                <b-button class="ml-3" variant="outline-danger" @click="deleteModal = !deleteModal" pill>
                    Cancel
                </b-button>
                </div>
            </b-container>
        </b-modal>
    </div>
</template>

<script>
// @ is an alias to /src
import Header from '@/components/Header.vue'
import SecondaryHeader from '@/components/SecondaryHeader.vue'
import CoursesHeader from '../components/CoursesHeader.vue'
import {mapActions, mapGetters} from 'vuex'
export default {
    name: 'Categories',
    computed: {
        ...mapGetters(['getCategories']),
    },
    components: {
        Header,
        SecondaryHeader,
        CoursesHeader
    },
    methods: {
        ...mapActions(["createCategory", "fetchCategories", "deleteCategory", "updateCategory"]),
        async submitNewCategory() {
            this.createLoading = true
            const resp = await this.createCategory(this.category)
            this.createLoading = false
            if(resp == 1) {
                this.category.name = null
                this.addModal = false
            }
        },
        removeCategory(item) {
            this.categoryToDelete = item
            this.deleteModal = true
        },
        async removeCategoryNow() {
            this.deleteLoading = true
            const resp = await this.deleteCategory(this.categoryToDelete.id)
            this.deleteLoading = false
            if(resp == 1) {
                this.deleteModal = false
            }
        },
        editCategory(item) {
            this.categoryToEdit = Object.assign({}, item)
            this.editModal = true
        },
        async editCategoryNow() {
            this.editLoading = true
            const resp = await this.updateCategory(this.categoryToEdit)
            this.editLoading = false
            if(resp == 1) {
                this.editModal = false
            }
        },

        countCourses(courses) {
            if(!courses.length) {
                return 0
            }

            const count = courses.filter(course => !course.isDeleted)
            return count.length
        }
    },
    async created() {
        if(!this.getCategories.length) {
            this.loading = true
            const resp = await this.fetchCategories()
            if(resp) {
                this.loading = false
            }
        }
        else {
            this.categories = this.getCategories
        }
    },
    watch: {
        getCategories(val) {
            if(val && val.length) {
                
                this.categories = this.getCategories
            }
        }
    },
    data() {
        return {
            addModal: false,
            deleteModal: false,
            category: {
                name: null
            },
            categories: [],
            loading: false,
            createLoading: false,
            editModal: false,
            categoryToDelete: null,
            categoryToEdit: null,
            deleteLoading: false,
            editLoading: false,
            fields: [
                'name',
                'no_course',
                'action',
            ],
            filter: null,
            totalRows: 1,
            currentPage: 1,
            perPage: 10,
            breadcrumb: [
                {
                    text: 'Categories',
                    active: true
                }
            ]
        }
    }
}
</script>

<style scoped>
.breadcrumb {
  padding-left:0rem !important;
  padding-top:0rem !important
}
.rounded{
 border-radius: 1.25rem !important
}
</style>
