<template>
    <div class="home">
        <Header msg="Welcome to Your Vue.js App" />
        <SecondaryHeader :breadcrumb="breadcrumb" title="Lessons" />
        <b-container class="card bg-white mt-2 pb-5 pt-2">
            <CoursesHeader :create="false" />

            <div class="mt-4 text-left text-primary">
                <h4 class="text-green">Upcoming Lessons</h4>
            </div>

            <b-row v-if="loading">
                <b-col cols="12" class="text-center">
                    <b-spinner variant="purple"></b-spinner>
                    <p>Loading Lessons...</p>
                </b-col>
            </b-row>

            <b-row v-if="!loading && !lessons.length">
                <b-col cols="12" class="text-center">
                    <h5 class="text-green">No Lesson Found</h5>
                </b-col>
            </b-row>

            <div class="mt-2 text-md-left d-flex" v-if="!loading && lessons.length">
                <div class="self-center">
                    Search
                </div>
                <div class="ml-3">
                    <input class="border-hids form-control col-md-12" type="search" v-model="filter" />
                </div>
                <!-- <div class="ml-auto">
                    <b-button variant="info" @click="$router.push('/export-lesson/'+$route.params.id)" class="pr-3 pl-3" pill>Export</b-button>
                </div> -->
            </div>

            <div class="mt-3" v-if="!loading && lessons.length">
                <b-table bordered :responsive="true" :current-page="currentPage" :per-page="rowsPerPage" striped hover :fields="fields" :items="lessons" :filter="filter">

                    <!-- Cells -->
                    <template v-slot:cell(courseTitle)="data">
                        <span class="smalls">{{data.item.course.name}}</span>
                    </template>
                    <template v-slot:cell(classSize)="data">
                        <span class="smalls">{{data.item.availableSeats}}</span>
                    </template>
                    <template v-slot:cell(location)="data">
                        <span class="smalls">{{data.item.address}}</span>
                    </template>
                    <template v-slot:cell(startDate)="data">
                        <span class="smalls">{{getDate(data.item.startDate)}}</span>
                    </template>
                    <template v-slot:cell(endDate)="data">
                        <span class="smalls">{{getDate(data.item.endDate)}}</span>
                    </template>
                    <template v-slot:cell(export)="data">
                        <b-button variant="info" size="sm" @click="$router.push('/export-lesson/'+data.item.id)" class="pr-3 pl-3" pill>Export</b-button>
                    </template>
                    <template v-slot:cell(action)="data">
                        <i @click="editLesson(data.item)" class="ml-2 mr-2 text-info fas fa-pencil-alt link"></i>
                    </template>
                </b-table>

                <div class="float-right">
                    <b-pagination v-model="currentPage" :total-rows="lessons.length" :per-page="rowsPerPage" class="my-0" pills></b-pagination>
                </div>
            </div>
        </b-container>

        <b-modal v-model="editModal" title="Edit Lesson" hide-footer>
            <b-container v-if="lessonToEdit">
                <b-form @submit.prevent="submitLesson">
                    <b-row>
                        <b-col cols="12">
                            <b-form-group>
                                <label for="lesson_name">Name*</label>
                                <b-form-input placeholder="Lesson Name" class="rounded" v-model="lessonToEdit.name" required></b-form-input>
                            </b-form-group>
                        </b-col>
                        <b-col cols="12">
                            <b-form-group>
                                <label for="lesson_tutors">Select Tutors*</label>
                                <multiselect v-model="tutorList" :options="getTutors" :tagabled="true" :multiple="true" :close-on-select="true" :clear-on-select="false" :preserve-search="true" placeholder="Select Tutors" tag-placeholder="Select Tutors" label="name" track-by="name" :preselect-first="false"></multiselect>
                            </b-form-group>
                        </b-col>
                        <b-col cols="12" lg="12">
                            <b-form-group>
                                <label for="lesson_seats">Available Seats*</label>
                                <b-form-input placeholder="Available Seats" type="number" class="rounded" v-model="lessonToEdit.availableSeats" :required="true"></b-form-input>
                            </b-form-group>
                        </b-col>
                        <b-col cols="12" lg="12">
                            <b-form-group>
                                <label for="lesson_address">Address*</label>
                                <b-form-input placeholder="Enter Address" type="text" class="rounded" v-model="lessonToEdit.address" :required="true"></b-form-input>
                            </b-form-group>
                        </b-col>
                        <b-col cols="12" lg="6">
                            <b-form-group>
                                <label for="lesson_start_date">Start Date*</label>
                                <b-form-datepicker placeholder="Lesson Start Date" class="rounded" v-model="lessonToEdit.startDate" :required="true"></b-form-datepicker>
                            </b-form-group>
                        </b-col>
                        <b-col cols="12" lg="6">
                            <b-form-group>
                                <label for="lesson_end_date">End Date*</label>
                                <b-form-datepicker placeholder="Lesson End Date" class="rounded" v-model="lessonToEdit.endDate" :required="true"></b-form-datepicker>
                            </b-form-group>
                        </b-col>
                        <b-col cols="12" lg="6">
                            <b-form-group>
                                <label for="lesson_start_time">Start Time*</label>
                                <b-form-timepicker placeholder="Lesson Start Time" class="rounded" v-model="lessonToEdit.startTime" :required="true"></b-form-timepicker>
                            </b-form-group>
                        </b-col>
                        <b-col cols="12" lg="6">
                            <b-form-group>
                                <label for="lesson_end_time">End Time*</label>
                                <b-form-timepicker placeholder="Lesson End Time" class="rounded" v-model="lessonToEdit.endTime" :required="true"></b-form-timepicker>
                            </b-form-group>
                        </b-col>
                    </b-row>
                    <b-row class="mt-3">
                        <b-col cols="12" class="text-center">
                            <b-button type="submit" variant="danger" pill :disabled="editLoading">{{editLoading ? 'Updating Lesson...' : 'Edit Lesson'}}</b-button>
                            <b-button @click="editModal = !editModal" class="ml-3" variant="outline-danger" :disabled="editLoading" pill>Cancel</b-button>
                        </b-col>
                    </b-row>
                </b-form>
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
import Multiselect from 'vue-multiselect';
export default {
    name: 'Lessons',
    components: {
        Header,
        SecondaryHeader,
        CoursesHeader,
        Multiselect
    },
    computed: {
        ...mapGetters(['getLessons', 'getTutors']),
    },
    methods: {
        ...mapActions(["fetchLessons", "fetchTutors", "updateLesson"]),
        async editLesson(item) {
            this.lessonToEdit = Object.assign({}, item)
            console.log(this.lessonToEdit)
            this.tutorList = []
            await this.lessonToEdit.tutors.forEach(async t => {
                let isTutor = await this.getTutors.find(tutor => tutor.id == t.id)
                if(isTutor) {
                    // this.tutorList.push(isTutor.LessonTutor.tutorId)
                    // delete isTutor.LessonTutor
                    this.tutorList.push(isTutor)
                }
            })
            this.editModal = true
        },

        async submitLesson() {
            let lessonData = Object.assign({}, this.lessonToEdit)
            lessonData.courseId = lessonData.course.id
            delete lessonData.course
            if(!this.tutorList.length) {
                this.toast({title: "Update Lesson", message: "Please Select atleast 1 Tutor", type: "warning"})
                return
            }
            
            // Set Array of Tutor ID
            if(this.tutorList.length) {
                let tutorsArray = []
                this.tutorList.forEach(tutor => {
                    tutorsArray.push(tutor.id)
                })
                lessonData.tutors = tutorsArray
            }

            if(!lessonData.startDate || !lessonData.endDate) {
                this.toast({title: "Update Lesson", message:"Start and End Date Required.", type: "warning"})
                return
            }

            if(!lessonData.startTime || !lessonData.endTime) {
                this.toast({title: "Update Lesson", message:"Start and End TIme Required.", type: "warning"})
                return
            }
            console.log(lessonData)
            this.editLoading = true
            const resp = await this.updateLesson(lessonData)
            this.editLoading = false

            if(resp == 1) {
                this.editModal = false
            }
        }
    },
    async created() {
        this.loading = true
        await this.fetchLessons()
        if(!this.getTutors.length) {
            await this.fetchTutors()
        }
        this.loading = false
    },
    watch: {
        getLessons(val) {
            if(val && val.length) {
                let lessonArray = []
                val.forEach(item => {
                    item.startDate = item.startDate.split('T')[0]
                    item.endDate = item.startDate.split('T')[0]

                    lessonArray.push(item)
                })
                lessonArray = lessonArray.sort((a,b) => new Date(a.startDate) - new Date(b.startDate))
                this.lessons = lessonArray
            }
        },
        getTutors(val) {
            if(val) {
                this.tutorList = val
                
            }
        }
    },
    data() {
        return {
            lessons: [],
            tutorList: [],
            loading: false,
            filter: null,
            lessonToEdit: null,
            editLoading: false,
            editModal: false,
            fields: [
                {
                    key: "courseTitle",
                    label: "Course Title",
                    sortable: true,
                    sortByFormatted: true,
                },
                {
                    key: "classSize",
                    label: "Class Size",
                    sortable: true,
                    sortByFormatted: true,
                },
                {
                    key: "location",
                    label: "Location"
                },
                {
                    key: "startDate",
                    label: "Start Date"
                },
                {
                    key: "endDate",
                    label: "End Date"
                },
                {
                    key: "startTime",
                    label: "Start Time"
                },
                {
                    key: "endTime",
                    label: "End Time"
                },
                {
                    key: "export",
                    label: "Export"
                },
                {
                    key: "action",
                    label: "Action"
                },
            ],
            currentPage: 1,
            perPage: 10,
            breadcrumb: [
                {
                    text: 'Lessons',
                    active: true
                },
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
