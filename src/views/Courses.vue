<template>
    <div class="home">
        <Header msg="Welcome to Your Vue.js App"/>
        <SecondaryHeader title="Courses" :breadcrumb="breadcrumb" />
        <b-container class="card bg-white mt-2 pb-5 pt-2">
            <CoursesHeader :create="true" addtext="Create course" reroute="/create-course" />
            <div class="mt-4 text-left text-primary">
                <h4 class="text-green">My Courses</h4>
            </div>

            <b-row v-if="loading">
                <b-col cols="12" class="text-center">
                    <b-spinner variant="purple"></b-spinner>
                    <p>Loading Courses</p>
                </b-col>
            </b-row>

            <b-row v-if="!loading && !courses.length">
                <b-col cols="12" class="text-center">
                    <h5 class="text-green">No Course Found</h5>
                </b-col>
            </b-row>

            <div class="mt-2 text-md-left d-flex" v-if="!loading && courses.length">
                <div class="self-center">
                    Search
                </div>
                <div class="ml-3">
                    <input class="border-hids form-control col-md-12" type="search" v-model="filter" />
                </div>
                <div class="ml-auto">
                    <download-excel :data="export_data" :export-fields="export_fields" name="Courses" worksheet="Courses">
                        <b-button variant="info" class="pr-3 pl-3" pill>Export</b-button>    
                    </download-excel>
                </div>
            </div>

            <div class="mt-3">
                <b-table v-if="!loading && courses.length" bordered :responsive="true" :current-page="currentPage" :per-page="rowsPerPage" striped hover :fields="fields" :filter="filter" :items="courses">
                    <!-- Cells -->
                    <template v-slot:cell(id)="data">
                        <span>{{data.item.id}}</span>
                        <b-badge size="sm"
                            v-clipboard="data.item.id"
                            v-clipboard:success="onCopy"
                            v-clipboard:error="onError"
                            variant="success"
                            class="ml-1 link"
                        >
                            <i class="fa fa-copy"></i> Copy
                        </b-badge>
                    </template>
                    <template v-slot:cell(periods)="data">
                        <span class="text-primary link" @click="viewLessons(data.item)">View Lessons</span>
                    </template>

                    <template v-slot:cell(status)="data">
                        <b-button size="sm" :variant="data.item.active ? 'success' : 'danger'"> {{ data.item.active ? 'Active' : 'Inactive' }}</b-button>
                        <!-- <span class="smalls">
                            <b-button variant="success"> {{ data.item.status }}</b-button>
                        </span> -->
                    </template>
                    <template v-slot:cell(actions)="data">
                        <i class="fas fa-copy text-primary" @click="openExportModal(data.item)"></i>
                        <i @click="$router.push('/edit-course/'+data.item.id)" class="ml-2 mr-2 text-info fas fa-pencil-alt"></i>
                        <i @click="removeCourse(data.item)" class="fas fa-trash text-danger"></i>
                    </template>
                </b-table>

                <div class="float-right">
                    <b-pagination v-model="currentPage" :total-rows="courses.length" :per-page="rowsPerPage" class="my-0" pills></b-pagination>
                </div>
            </div>
        </b-container>
        <b-modal v-model="lessonModal" title="Course Lessons" hide-footer size="xl" scrollable>
            <b-container>
                <b-row v-if="lessonsLoading">
                    <b-col cols="12" class="text-center">
                        <b-spinner variant="purple"></b-spinner>
                        <p>Loading Course Lessons...</p>
                    </b-col>
                </b-row>
                <b-row v-if="!lessonsLoading && !courseLessons.length && course">
                    <b-col cols="12" class="text-center">
                        <p>No Lesson Found for course <strong class="text-green">{{course.name}}</strong></p>
                    </b-col>
                </b-row>
                <b-table-simple v-if="courseLessons.length && !lessonsLoading" striped bordered>
                    <b-thead>
                        <b-th>Name</b-th>
                        <b-th>Start Date</b-th>
                        <b-th>End Date</b-th>
                        <b-th>Start Time</b-th>
                        <b-th>End Time</b-th>
                        <b-th>Action</b-th>
                    </b-thead>
                    <b-tbody>
                        <b-tr v-for="(lesson, index) in sortedLessons" :key="index">
                            <b-td>
                                {{lesson.name}}
                            </b-td>
                            <b-td>
                                {{getDate(lesson.startDate)}}
                                <!-- <b-form-datepicker  v-model="lesson.startDate" locale="en"></b-form-datepicker> -->
                            </b-td>
                            <b-td>
                                {{getDate(lesson.endDate)}}
                                <!-- <b-form-datepicker  v-model="lesson.endDate"></b-form-datepicker> -->
                            </b-td>
                            <b-td>
                                {{lesson.startTime}}
                                <!-- <b-form-timepicker v-model="lesson.startTime" locale="en"></b-form-timepicker> -->
                            </b-td>
                            <b-td>
                                {{lesson.endTime}}
                                <!-- <b-form-timepicker v-model="lesson.endTime" locale="en"></b-form-timepicker> -->
                            </b-td>
                            <b-td>
                                <i @click="removeLesson(lesson)" class="fa fa-trash link text-danger"></i>
                            </b-td>
                        </b-tr>
                    </b-tbody>
                </b-table-simple>
                <!-- <b-table bordered responsive :items="course.Lessons" :fields="lessonFields">

                    <template v-slot:cell(start_date)="data">
                        <div>
                            <b-input-group>
                                <b-form-input v-model="" type="date"></b-form-input>
                            </b-input-group>
                        </div>

                        <div class="mt-2">
                            <b-input-group>
                                <select name="" id="" class="form-control">
                                    <option selected disabled>- Select tutor -</option>
                                </select>
                            </b-input-group>
                        </div>

                        <div class="mt-1">
                            <b-button pill variant="danger">Add tutor</b-button>
                        </div>
                    </template>
                    <template v-slot:cell(end_date)="data">
                        <b-input-group>
                            <b-form-input type="date"></b-form-input>
                        </b-input-group>
                    </template>
                    <template v-slot:cell(start_time)="data">
                        <b-input-group>
                            <b-form-input></b-form-input>
                            <b-input-group-prepend>
                                <b-button variant="light"><i class="far fa-clock"></i></b-button>
                            </b-input-group-prepend>
                        </b-input-group>
                    </template>
                    <template v-slot:cell(end_time)="data">
                        <b-input-group>
                            <b-form-input></b-form-input>
                            <b-input-group-prepend>
                                <b-button variant="light"><i class="far fa-clock"></i></b-button>
                            </b-input-group-prepend>
                        </b-input-group>
                    </template>
                    <template v-slot:cell(action)="data">
                        <i class="text-danger fas fa-trash"></i>
                    </template>
                </b-table> -->

                <b-button variant="outline-secondary" @click="addLesson"><i class="fas fa-plus-circle"></i> Add Lesson</b-button>
            </b-container>
        </b-modal>

        <!-- Lesson Modal -->

        <!-- <b-model title="Course Lessons" v-model="lessonModal" hide-footer>
            <b-table v-if="course.Lessons.length" bordered :responsive="true" :fields="lessonFields" :items="course.Lessons"></b-table>
        </b-model> -->
        
        <!-- Delete Modal -->

        <b-modal title="Delete Course" v-model="deleteModal" hide-footer centered>
            <b-container class="text-center" v-if="courseToDelete">
                <p> <b>Are you sure you want to delete Course "<strong class="text-green">{{courseToDelete.name}}</strong>" ?</b> </p>
                <div>
                <b-button variant="danger" pill @click="removeCourseNow" :disabled="deleteLoading">
                    {{deleteLoading ? 'Deleting Course...' : 'Yes'}}
                </b-button>
                <b-button class="ml-3" variant="outline-danger" @click="deleteModal = !deleteModal" pill>
                    Cancel
                </b-button>
                </div>
            </b-container>
        </b-modal>

        <!-- Delete Lesson Modal -->

        <b-modal title="Delete Lesson" v-model="deleteLessonModal" hide-footer hide-header-close no-close-on-backdrop centered>
            <b-container class="text-center" v-if="lessonToDelete">
                <p> <b>Are you sure you want to delete Lesson <strong class="text-green">{{lessonToDelete.name}}</strong> from "<strong class="text-green">{{lessonToDelete.courseTitle}}</strong>" ?</b> </p>
                <div>
                <b-button variant="danger" pill @click="removeLessonNow" :disabled="deleteLessonLoading">
                    {{deleteLessonLoading ? 'Deleting Lesson...' : 'Yes'}}
                </b-button>
                <b-button class="ml-3" variant="outline-danger" :disabled="deleteLessonLoading" @click="hideDeleteLessonModal" pill>
                    Cancel
                </b-button>
                </div>
            </b-container>
        </b-modal>

        <!-- Export Courses By Month -->

        <b-modal title="Export Course Lessons" v-model="exportModal" hide-footer>
            <b-form @submit.prevent v-if="courseToExport && courseToExport.Lessons.length">
                <b-row>
                    <b-col cols="12" class="text-center">
                        <p><strong class="text-green">Export Lessons of {{ courseToExport.name }}</strong></p>
                    </b-col>
                    <b-col cols="12">
                        <b-form-group>
                            <label><strong>Select Month*</strong></label>
                            <b-form-select @change="setLessonExportData" v-model="month" required>
                                <b-form-select-option :value="null">Select Month</b-form-select-option>
                                <b-form-select-option v-for="(month, index) in getMonths()" :key="index" :value="index+1">{{month}}</b-form-select-option>
                            </b-form-select>
                        </b-form-group>
                    </b-col>
                    <b-col cols="12" class="text-center" v-if="month && export_lessons.length">
                        <download-excel :data="export_lessons" :export-fields="export_lesson_fields" name="Course Lessons" worksheet="Course Lessons">
                            <b-button type="submit" variant="info" class="pr-3 pl-3" pill>Export Lessons</b-button>    
                        </download-excel>
                    </b-col>
                </b-row>
            </b-form>
            <b-row v-if="courseToExport && !courseToExport.Lessons.length">
                <b-col cols="12" class="text-center">
                    <p>
                        <strong>This Course has No Lessons.</strong>
                    </p>
                </b-col>
            </b-row>
        </b-modal>

        <!-- Add New Lesson Modal -->

        <b-modal title="Add Lesson" v-model="addLessonModal" hide-footer hide-header-close no-close-on-backdrop centered>
            <b-form @submit.prevent="submitLesson">
                <b-row>
                    <b-col cols="12">
                        <b-form-group>
                            <label for="lesson_name">Name*</label>
                            <b-form-input placeholder="Lesson Name" class="rounded" v-model="newLesson.name" required></b-form-input>
                        </b-form-group>
                    </b-col>
                    <b-col cols="12">
                        <b-form-group>
                            <label for="lesson_tutors">Select Tutors*</label>
                            <multiselect v-model="newLesson.tutors" :options="getTutors" :tagabled="true" :multiple="true" :close-on-select="true" :clear-on-select="false" :preserve-search="true" placeholder="Select Tutors" tag-placeholder="Select Tutors" label="name" track-by="name" :preselect-first="false"></multiselect>
                        </b-form-group>
                    </b-col>
                    <b-col cols="12" lg="12">
                        <b-form-group>
                            <label for="lesson_seats">Available Seats*</label>
                            <b-form-input placeholder="Available Seats" type="number" class="rounded" v-model="newLesson.availableSeats" :required="true"></b-form-input>
                        </b-form-group>
                    </b-col>
                    <b-col cols="12" lg="12">
                        <b-form-group>
                            <label for="custom_address">Address*</label>
                            <b-form-select class="rounded" @change="setNewLessonAddress" required>
                                <b-form-select-option :value="null">Select Address*</b-form-select-option>
                                <b-form-select-option value="九龍油麻地，彌敦道498-500號，泰盛商業(油麻地)大樓4樓">九龍油麻地，彌敦道498-500號，泰盛商業(油麻地)大樓4樓</b-form-select-option>
                                <b-form-select-option value="Location 2">Location 2</b-form-select-option>
                                <b-form-select-option value="other">Other</b-form-select-option>
                            </b-form-select>
                        </b-form-group>
                    </b-col>
                    <b-col cols="12" lg="12" v-if="newLesson.address_type === 'other'">
                        <b-form-group>
                            <label for="custom_address">Custom Address*</label>
                            <b-form-input placeholder="Enter Address" type="number" class="rounded" v-model="newLesson.address" :required="true"></b-form-input>
                        </b-form-group>
                    </b-col>
                    <b-col cols="12" lg="6">
                        <b-form-group>
                            <label for="lesson_start_date">Start Date*</label>
                            <b-form-datepicker placeholder="Lesson Start Date" class="rounded" v-model="newLesson.startDate" :required="true"></b-form-datepicker>
                        </b-form-group>
                    </b-col>
                    <b-col cols="12" lg="6">
                        <b-form-group>
                            <label for="lesson_end_date">End Date*</label>
                            <b-form-datepicker placeholder="Lesson End Date" class="rounded" v-model="newLesson.endDate" :required="true"></b-form-datepicker>
                        </b-form-group>
                    </b-col>
                    <b-col cols="12" lg="6">
                        <b-form-group>
                            <label for="lesson_start_time">Start Time*</label>
                            <b-form-timepicker placeholder="Lesson Start Time" class="rounded" v-model="newLesson.startTime" :required="true"></b-form-timepicker>
                        </b-form-group>
                    </b-col>
                    <b-col cols="12" lg="6">
                        <b-form-group>
                            <label for="lesson_end_time">End Time*</label>
                            <b-form-timepicker placeholder="Lesson End Time" class="rounded" v-model="newLesson.endTime" :required="true"></b-form-timepicker>
                        </b-form-group>
                    </b-col>
                </b-row>
                <b-row class="mt-3">
                    <b-col cols="12" class="text-center">
                        <b-button type="submit" variant="danger" pill :disabled="addLessonLoading">{{addLessonLoading ? 'Adding Lesson...' : 'Add Lesson'}}</b-button>
                        <b-button @click="hideAddLessonModal" class="ml-3" variant="outline-danger" :disabled="addLessonLoading" pill>Cancel</b-button>
                    </b-col>
                </b-row>
            </b-form>
            
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
    name: 'Courses',
    components: {
        Header,
        SecondaryHeader,
        CoursesHeader,
        Multiselect
    },
    computed: {
        ...mapGetters(['getCourses', 'getCategories', 'getCourseLessons', 'getTutors']),
        sortedLessons() {
            const items = this.courseLessons
            return items.sort((a,b) => a.endDate > b.endDate ? 1 : -1)
        },
    },
    methods: {
        ...mapActions(["fetchCourses", "fetchCategories", "fetchTutors", "deleteCourse", "fetchCourseLessons", "deleteLesson", "createLesson"]),
        onCopy() {
            this.toast({title: "Copy Course ID", message: "Course ID Copied.", type: "success"})
        },
        onError() {
            this.toast({title: "Copy Course ID", message: "Failed to Copy Course ID.", type: "danger"})
        },
        removeCourse(item) {
            this.courseToDelete = Object.assign({}, item)
            this.deleteModal = true
        },
        async removeCourseNow() {
            this.deleteLoading = true
            const resp = await this.deleteCourse(this.courseToDelete.id)
            this.deleteLoading = false
            if(resp == 1) {
                this.deleteModal = false
            }
        },
        async viewLessons(item) {
            this.lessonModal = true
            this.course = Object.assign({},item)
            this.lessonsLoading = true
            const resp = await this.fetchCourseLessons(item.id)
            this.lessonsLoading = false
            if(resp != 1) {
                this.courseLessons = []
            }
        },
        removeLesson(lesson) {
            this.lessonToDelete = Object.assign({}, lesson)
            this.lessonModal = false
            this.deleteLessonModal = true
        },
        hideDeleteLessonModal() {
            this.deleteLessonModal = false
            this.lessonModal = true
        },
        async removeLessonNow() {
            this.deleteLessonLoading = true
            const resp = await this.deleteLesson(this.lessonToDelete.id)
            this.deleteLessonLoading = false
            if(resp == 1) {
                this.deleteLessonModal = false
                this.lessonModal = false
            }
        },
        async addLesson() {
            this.lessonModal = false
            this.addLessonModal = true
            if(!this.getTutors.length) {
                await this.fetchTutors()
            }
        },
        hideAddLessonModal() {
            this.lessonModal = true
            this.addLessonModal = false
        },
        setNewLessonAddress(e) {
            const value = e
            this.newLesson.address_type = value
            if(value && value !== 'other') {
                this.newLesson.address = value
            }
        },
        async submitLesson() {
            this.newLesson.courseId = this.course.id
            const lessonData = Object.assign({}, this.newLesson)
            delete lessonData.address_type

            if(!lessonData.tutors.length) {
                this.toast({title: "Add Lesson", message: "Please Select atleast 1 Tutor", type: "warning"})
                return
            }
            
            // Set Array of Tutor ID
            if(lessonData.tutors.length) {
                let tutorsArray = []
                lessonData.tutors.forEach(tutor => {
                    tutorsArray.push(tutor.id)
                })
                lessonData.tutors = tutorsArray
            }

            if(!lessonData.startDate || !lessonData.endDate) {
                this.toast({title: "Add Lesson", message:"Start and End Date Required.", type: "warning"})
                return
            }

            if(!lessonData.startTime || !lessonData.endTime) {
                this.toast({title: "Add Lesson", message:"Start and End TIme Required.", type: "warning"})
                return
            }
            this.addLessonLoading = true
            const resp = await this.createLesson(lessonData)
            this.addLessonLoading = false

            if(resp == 1) {
                this.addLessonModal = false
                this.lessonModal = false
            }
        },
        openExportModal(course) {
            this.courseToExport = Object.assign({}, course)
            this.month = null
            this.exportModal = true
        },
        async setLessonExportData(value) {
            if(this.courseToExport.Lessons.length) {
                this.export_lessons = []
                await this.courseToExport.Lessons.forEach(async lesson => {
                    if(lesson) {
                        const lessonMonth = lesson.startDate.split('T')[0].split('-')[1]
                        if(lessonMonth == value) {
                            this.export_lessons.push(lesson)
                        }
                    }
                })
                if(this.export_lessons.length < 1) {
                    this.toast({title: "Export Course Lessons", message:"No Lessons Found for selected Month", type: "danger"})
                }
            }
        },
        async setExportData() {
            let categories = []
            let tutors = []
            let files = []

            if(this.courses && this.courses.length) {
                await this.courses.forEach(async course => {
                    if(course.isDeleted) {
                        course.active = "Deleted"
                    }
                    else {
                        course.active = "Active"
                    }
                    if(course && course.CourseFiles.length) {
                        await course.CourseFiles.forEach(item => {
                            files.push(item.path)
                        })
                    }

                    course.course_files = files.toString()

                    if(course && course.courseCategories.length) {
                        await course.courseCategories.forEach(item => {
                            categories.push(item.name)
                        })
                    }
                    course.categories = categories.toString()
                    if(course && course.CourseTutors.length) {
                        await course.CourseTutors.forEach(item => {
                            const tutor = this.getTutors.find(tutor => tutor.id == item.tutorId)
                            if(tutor) {
                                tutors.push(tutor.name)
                            }
                        })
                        course.tutors = tutors.toString()
                    }
                })
            }
            
            this.export_data = this.courses
            console.log(this.export_data)
        },
    },

    async created() {
        this.loading = true
        if(!this.getTutors.length) {
            await this.fetchTutors()
        }
        if(!this.getCourses.length) {
            
            const resp = await this.fetchCourses()
            
        }
        else {
            this.courses = this.getCourses
            await this.setExportData()
        }
        this.loading = false
    },
    watch: {
        getCourses(val) {
            if(val) {
                this.courses = this.getCourses
                this.setExportData()
            }
        },
        getCourseLessons(val) {
            if(val) {
                this.courseLessons = val
            }
        }
    },
    data() {
        return {
            month: null,
            exportModal: false,
            courseToExport: null,
            filter: null,
            totalRows: 1,
            currentPage: 1,
            perPage: 10,
            loading: false,
            lessonsLoading: false,
            addLessonLoading: false,
            deleteModal: false,
            deleteLoading: false,
            courseToDelete: null,
            lessonToDelete: null,
            deleteLessonModal: false,
            deleteLessonLoading: false,
            addLessonModal: false,
            lessonModal: false,
            course: null,
            courseLessons: [],
            courses: [],
            newLesson: {
                courseId: null,
                tutors: [],
                name: null,
                startDate: null,
                endDate: null,
                startTime: null,
                endTime: null,
                availableSeats: null,
                address: null,
                address_type: null,
            },
            
            fields: [
                {
                    key: "id",
                    label: "Course ID",
                    sortable: true,
                    sortByFormatted: true,
                },
                {
                    key: "name",
                    label: "Course Title",
                    sortable: true,
                    sortByFormatted: true,
                },
                // {
                //     key: "availableSeats",
                //     label: "Class Size",
                //     sortable: true,
                //     sortByFormatted: true,
                // },
                {
                    key: "price",
                    label: "price",
                    sortable: true,
                    sortByFormatted: true,
                },
                // {
                //     key: "address",
                //     label: "Location",
                //     sortable: true,
                //     sortByFormatted: true,
                // },
                {
                    key: "periods",
                },
                {
                    key: 'status'
                },
                {
                    key: 'actions'
                }
            ],
            export_lesson_fields: {
                "Lesson ID": "id",
                "Lesson Code": "lessonCode",
                "Lesson Name": "name",
                "Course ID": "courseId",
                "Start Date": "startDate",
                "Start Time": "startTime",
                "End Date": "endDate",
                "End Time": "endTime"

            },
            export_lessons: [],
            export_fields: {
                "Course ID": "id",
                "Course Name": "name",
                "Course Code": "courseCode",
                "Description": "description",
                "Price": "price",
                "Course Nature": "courseNature",
                "Certificate Effective Period": "certEffectivePeriod",
                "Tutor": "tutors",
                "Category": "categories",
                "Image": "picture",
                "Files": "course_files",
                "Status": "active"
            },
            export_data: [],
            lessonFields: [
                {
                    key: "name",
                    label: "Lesson Title",
                    sortable: true,
                    sortByFormatted: true,
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
                    label: "Action"
                },
            ],

            breadcrumb: [
                {
                    text: 'Courses',
                    path: '/courses',
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
