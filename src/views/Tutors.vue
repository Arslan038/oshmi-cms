<template>
    <div class="home">
        <Header msg="Welcome to Your Vue.js App" />
        <SecondaryHeader title="Tutors" :breadcrumb="breadcrumb" />
        <b-container class="card bg-white mt-2 pb-5 pt-2">
            <CoursesHeader :create="true" addtext="Add Tutor" reroute="/add-tutor" />

            <div class="mt-4 text-left text-primary">
                <h4 class="text-green">My Tutors</h4>
            </div>

            <b-row v-if="loading">
                <b-col cols="12" class="text-center">
                    <b-spinner variant="purple"></b-spinner>
                    <p>Loading Tutors</p>
                </b-col>
            </b-row>

            <b-row v-if="!loading && !tutors.length">
                <b-col cols="12" class="text-center">
                    <h5 class="text-green">No Tutor Found</h5>
                </b-col>
            </b-row>

            <div class="mt-2 text-md-left d-flex" v-if="!loading && tutors.length">
                <div class="self-center">
                    Search
                </div>
                <div class="ml-3">
                    <input type="search" v-model="filter" class="border-hids form-control col-md-12" />
                </div>
                <div class="ml-auto">
                    <b-button variant="info" @click="$router.push('/export-lessons')" class="pr-3 pl-3" pill>Export</b-button>
                </div>
            </div>

            <div class="mt-3" v-if="!loading && tutors.length">
                <b-table :responsive="true" striped hover :fields="fields" :items="tutors" :per-page="rowsPerPage" :current-page="currentPage" :filter="filter">
                    <template v-slot:cell(courseCount)="data">
                        {{data.item.courseCount ? data.item.courseCount : 0}}
                    </template>
                    <template v-slot:cell(actions)="data">
                        <i @click="$router.push('/edit-tutor/'+data.item.id)" class="ml-2 mr-2 text-info fas fa-pencil-alt"></i>
                        <i @click="removeTutor(data.item)" class="fas fa-trash text-danger"></i>
                    </template>
                </b-table>

                <div class="float-right">
                    <b-pagination v-model="currentPage" :total-rows="tutors.length" :per-page="rowsPerPage" class="my-0" pills></b-pagination>
                </div>
            </div>
        </b-container>
        <b-modal title="Delete Tutor" v-model="deleteModal" hide-footer centered>
            <b-container class="text-center" v-if="tutorToDelete">
                <p> <b>Are you sure you want to delete tutor "<strong class="text-green">{{tutorToDelete.name}}</strong>" ?</b> </p>
                <div>
                <b-button variant="danger" pill @click="removeTutorNow" :disabled="deleteLoading">
                    {{deleteLoading ? 'Deleting Tutor...' : 'Yes'}}
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
    name: 'Tutors',
    computed: {
        ...mapGetters(['getTutors']),
    },
    components: {
        Header,
        SecondaryHeader,
        CoursesHeader
    },
    watch: {
        getTutors(val) {
            if(val) {
                this.tutors = val
            }
        }
    },
    methods: {
        ...mapActions(["fetchTutors", "deleteTutor"]),
        removeTutor(item) {
            this.tutorToDelete = item
            this.deleteModal = true
        },
        async removeTutorNow() {
            this.deleteLoading = true
            const resp = await this.deleteTutor(this.tutorToDelete.id)
            this.deleteLoading = false
            if(resp == 1) {
                this.deleteModal = false
            } 
        }
    },
    async created() {

        if(this.getTutors.length < 1) {
            this.loading = true
            await this.fetchTutors()
            this.loading = false
        }
        else {
            this.tutors = this.getTutors
        }
    },
    data() {
        return {
            loading: false,
            tutors: [],
            tutorToDelete: null,
            deleteLoading: false,
            deleteModal: false,
            fields: [
                {
                    key: "name",
                    label: "Tutor Name",
                    sortable: true,
                    sortByFormatted: true,
                },
                {
                    key: "email",
                    label: "Email",
                    sortable: true,
                    sortByFormatted: true,
                },
                {
                    key: "phone",
                    label: "Phone No",
                    sortable: true,
                    sortByFormatted: true,
                },
                {
                    key: "courseCount",
                    label: "Classes",
                    sortable: true,
                    sortByFormatted: true,
                },
                {
                    key: "qualification",
                    label: "Qualification",
                    sortable: true,
                    sortByFormatted: true,
                },
                {
                    key: "payment",
                    label: "Payment Per Lesson",
                    sortable: true,
                    sortByFormatted: true,
                },
                {
                    key: 'actions'
                }
            ],

            currentPage: 1,
            perPage: 10,
            filter: null,
            breadcrumb: [
                {
                    text: 'Tutors',
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
