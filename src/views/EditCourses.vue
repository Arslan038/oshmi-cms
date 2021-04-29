<template>
    <div class="home">
        <Header msg="Welcome to Your Vue.js App" />
        <SecondaryHeader title="Edit Course" :breadcrumb="breadcrumb" />
        <b-container class="card bg-white mt-2 pb-5 pt-2">
            <b-row v-if="loading">
                <b-col cols="12">
                    <b-spinner variant="purple"></b-spinner>
                    <p>Loading Course Details...</p>
                </b-col>
            </b-row>
            <b-form @submit.prevent="submitCourse" v-if="course && !loading">
                <b-row>
                    <b-col class="mt-2 text-left text-primary">
                        <h4 class="text-green">Edit Course</h4>
                    </b-col>
                    <b-col class="mt-2 text-right">
                        <b-button variant="danger" class="float-right pr-3 pl-3" type="submit" pill :disabled="updateLoading">{{updateLoading ? 'Updating Course...' : 'Save'}}</b-button>
                    </b-col>
                </b-row>

                <b-row v-if="errors.length">
                    <b-col cols="12">
                        <b-alert dismissible variant="warning">
                            <ul>
                                <li v-for="(error, index) in errors" :key="index">{{error.msg}}</li>
                            </ul>
                        </b-alert>
                    </b-col>
                </b-row>

                <b-row class="mt-3">
                    <b-col md="2" class="text-left">
                        <b>Course Name</b>
                    </b-col>
                    <b-col md="10" class="text-left">
                        <b-form-input placeholder="Course Name" v-model="course.name" class="rounded" required></b-form-input>
                    </b-col>
                </b-row>

                <b-row class="mt-2">
                    <b-col md="2" class="text-left">
                        <b>Course Code</b>
                    </b-col>
                    <b-col md="10" class="text-left">
                        <b-form-input placeholder="Course Code" v-model="course.courseCode" disabled class="rounded" required></b-form-input>
                    </b-col>
                </b-row>

                <b-row class="mt-2">
                    <b-col md="2" class="text-left">
                        <b>Tutors</b>
                    </b-col>
                    <b-col md="10" class="text-left">
                        
                        <multiselect v-model="courseTutors" :options="tutorList" :tagabled="true" :multiple="true" :close-on-select="true" :clear-on-select="false" :preserve-search="true" placeholder="Select Tutors" tag-placeholder="Select Tutors" label="name" track-by="name" :preselect-first="false"></multiselect>
                    </b-col>
                </b-row>
                <b-row class="mt-2">
                    <b-col md="2" class="text-left">
                        <b>Categories</b>
                    </b-col>
                    <b-col md="10" class="text-left">
                        <multiselect v-model="courseCategories" :options="categoryList" :tagabled="true" :multiple="true" :close-on-select="true" :clear-on-select="false" :preserve-search="true" placeholder="Select Categories" tag-placeholder="Select Categories" label="name" track-by="name" :preselect-first="false"></multiselect>
                    </b-col>
                </b-row>

                <!-- <b-row class="mt-2">
                    <b-col md="2" class="text-left">
                        <b>Address</b>
                    </b-col>
                    <b-col md="10" class="text-left">
                        <b-form-input placeholder="Address" class="rounded" required v-model="course.address"></b-form-input>
                    </b-col>
                </b-row> -->
                <b-row class="mt-2">
                    <b-col md="2" class="text-left">
                        <b>Course Price</b>
                    </b-col>
                    <b-col md="10" class="text-left">
                        <b-form-input placeholder="Price" type="number" class="rounded" required v-model="course.price"></b-form-input>
                    </b-col>
                </b-row>

                <!-- <b-row class="mt-2">
                    <b-col md="2" class="text-left">
                        <b>Available Seats</b>
                    </b-col>
                    <b-col md="10" class="text-left">
                        <b-form-input placeholder="Available Seats" type="number" class="rounded" required v-model="course.availableSeats"></b-form-input>
                    </b-col>
                </b-row> -->

                <b-row class="mt-2">
                    <b-col md="2" class="text-left">
                        <b>Course Nature</b>
                    </b-col>
                    <b-col md="10" class="text-left">
                        <b-form-group>
                            <b-form-radio-group v-model="course.courseNature" :options="courseNatures" required></b-form-radio-group>
                        </b-form-group>
                    </b-col>
                </b-row>

                <!-- <b-row class="mt-2">
                    <b-col md="2" class="text-left">
                        <b>Cert Effective Period</b>
                    </b-col>
                    <b-col md="10" class="text-left">
                        <b-form-checkbox button-variant="purple" v-model="is_cert">Does this course has Cert Effective Period ? ?</b-form-checkbox>
                    </b-col>
                </b-row> -->

                <!-- <b-row class="mt-2" v-if="is_cert">
                    <b-col md="10" class="offset-md-2">
                        <b-form-select class="rounded" v-model="course.certEffectivePeriod" required>
                            <b-form-select-option :value="null">-- Select Cer Effective Period</b-form-select-option>
                            <b-form-select-option value="1 Year">1 Year</b-form-select-option>
                            <b-form-select-option value="2 Year">2 Year</b-form-select-option>
                            <b-form-select-option value="3 Year">3 Year</b-form-select-option>
                            <b-form-select-option value="4 Year">4 Year</b-form-select-option>
                            <b-form-select-option value="5 Year">5 Year</b-form-select-option>
                        </b-form-select>
                    </b-col>
                </b-row> -->

                <b-row class="mt-3">
                    <b-col md="2" class="text-left" cols="12">
                        <b>Course Description</b>
                    </b-col>
                    <b-col md="10" cols="12" class="text-left">
                        <vue-editor v-model="course.description" :editor-toolbar="customToolbar" placeholder="Enter Course Description"></vue-editor>
                    </b-col>
                </b-row>

                <b-row class="mt-3">
                    <b-col md="2" cols="12" class="text-left">
                        <b>Course Picture</b>
                    </b-col>
                    <b-col md="10" cols="12" class="text-left">
                        
                        <img :src="picked_image" width="100px" alt="" />
                        
                        <div class="d-flex mt-2">
                            <div style="align-self: center;"><i class="fas fa-file-image"></i> <span v-if="course.picture"> {{typeof course.picture == 'string' ? course.picture.substr(0,20)+'...' : course.picture.name}} </span></div>
                            <div>
                                <b-button variant="danger" @click="pickFile" class="ml-4">Browse</b-button>
                                <input
                                type="file"
                                style="display:none"
                                ref="fileUpload"
                                accept="image/*"
                                @change="onUploadFile"
                            />
                            </div>
                        </div>
                    </b-col>
                    <b-col class="text-left">
                        
                    </b-col>
                </b-row>
                <b-row class="mt-4">
                    <b-col class="text-left" md="2" cols="12">
                        <b>Course File</b>
                    </b-col>
                    <b-col md="8" cols="12" class="mb-3">
                        <div @click="pickFiles" class="text-center pick-product-image">
                            <p>
                            <i class="fa fa-upload fa-2x"></i>
                            <br />
                            </p>
                            <strong>Click To Upload Files</strong>
                            <input
                                type="file"
                                style="display:none"
                                ref="filesUpload"
                                @change="onUploadFiles"
                                multiple
                            />
                        </div>
                        <!-- <div class="d-flex justify-content-between mt-2" v-for="(file, index) in course.files" :key="index">
                            <strong class="text-green">{{file.name}}</strong>
                            <i @click="removeFile(index)" class="fa fa-times-circle"></i>
                        </div> -->
                        <div class="d-flex justify-content-between mt-2" v-for="(file, index) in oldFiles" :key="file.id">
                            <strong class="text-green">{{file.name}}.{{file.extension}}</strong>
                            <i @click="removeFile(file,index)" class="fa fa-times-circle"></i>
                        </div>
                        <div class="d-flex justify-content-between mt-2" v-for="(file, index) in newUploads" :key="index">
                            <strong class="text-green">{{file.name}}</strong>
                            <i @click="removeUploadedFile(index)" class="fa fa-times-circle"></i>
                        </div>
                    </b-col>
                </b-row>
                <b-row class="mt-3">
                    <b-col class="text-left">
                        <b-button variant="danger" type="submit" class="pr-5 pl-5" pill :disabled="updateLoading">{{updateLoading ? 'Updating Course...' : 'Save'}}</b-button>
                        <b-button variant="outline-secondary" @click="$router.push('/courses')" pill class="ml-3 pr-5 pl-5">Cancel</b-button>
                    </b-col>
                </b-row>
            </b-form>

            <!-- <b-row class="mt-2">
                <b-col md="2" class="text-left">
                    <b>Time</b>
                </b-col>
                <b-col md="5" class="text-left">
                    <span class="text-muted">Start</span>
                    <input type="time" style="width: 50%;" class="ml-2 d-inline-block rounded form-control col-md-12" />
                </b-col>
                <b-col md="5" class="text-left">
                    <span class="text-muted">End</span>

                    <input type="time" style="width: 50%;" class="d-inline-block ml-2 rounded form-control col-md-12" />
                </b-col>
            </b-row> -->

            <!-- <div class="mt-3">
                <b-row>
                    <b-col md="5" cols="12">
                        <h6 class="text-left"><b>Categories</b></h6>
                        <b-list-group>
                            <b-list-group-item class="category-item" @click="selectCategory(category, index)" v-for="(category, index) in getCategories" :key="index">{{category.name}}</b-list-group-item>
                        </b-list-group>
                    </b-col>
                    <b-col md="1" cols="12" class="text-center" align-self="center">
                        <i class="fas fa-arrows-alt-h"></i>
                    </b-col>
                    <b-col md="5" cols="12">
                        <h6 class="text-left"><b>Selected Categories</b></h6>
                        <b-list-group>
                            <b-list-group-item v-if="!course.categories.length"></b-list-group-item>
                            <b-list-group-item class="category-item" @click="removeCategory(category, index)" v-for="(category, index) in course.categories" :key="index">{{category.name}}</b-list-group-item>
                        </b-list-group>
                    </b-col>
                </b-row>
            </div> -->
            
            <!-- <b-row class="mt-4">
                <b-col class="text-left" md="12" cols="12">
                    <h6><b>File</b></h6>
                </b-col>
                <b-col md="6" cols="12">
                    <a-upload-dragger name="file" :multiple="true">
                        <p class="ant-upload-drag-icon">
                            <a-icon type="inbox" />
                        </p>
                        <p class="ant-upload-text">
                            Click or drag file to this area to upload
                        </p>
                        <p class="ant-upload-hint"></p>
                    </a-upload-dragger>
                </b-col>
            </b-row> -->
            
        </b-container>
    </div>
</template>

<script>
// @ is an alias to /src
import Header from '@/components/Header.vue'
import SecondaryHeader from '@/components/SecondaryHeader.vue'
import { VueEditor } from "vue2-editor";
import Multiselect from 'vue-multiselect';
import {mapActions, mapGetters} from 'vuex'
export default {
    name: 'CreateCourse',
    computed: {
        ...mapGetters(['getTutors', 'getCategories', 'getCourse', 'getCourses']),
        tutorList() {
            return this.getTutors
        },
        categoryList() {
            return this.getCategories
        }
    },
    components: {
        Header,
        SecondaryHeader,
        VueEditor,
        Multiselect
    },
    async created() {
        this.loading = true
        const resp = await this.fetchCourse(this.$route.params.id)
        if(resp == 1) {
            this.course = this.getCourse
        }
        
        if(this.getTutors.length < 1) {
            await this.fetchTutors()
        }
        if(this.getCategories.length < 1) {
            const resp = await this.fetchCategories()
            if(resp == 1) {
                this.all_categories = this.getCategories
            }
        }
        else {
            this.all_categories = this.getCategories
        }
        await this.setCourseData()
        this.loading = false
    },
    methods: {
        ...mapActions(["fetchTutors", "fetchCategories", "updateCourse", 'fetchCourse']),
        selectCategory(category, index) {
            this.course.categories.push(category)
            this.all_categories.splice(index, 1)
        },
        removeCategory(category, index) {
            this.course.categories.splice(index, 1);
            this.all_categories.push(category)
        },
        pickFile() {
            this.$refs.fileUpload.click();
        },
        onUploadFile(e) {
            let file = e.target.files[0]
            if(file) {
                this.picked_image = URL.createObjectURL(file)
                this.course.picture = file
                console.log(typeof this.picked_image)
            }
        },
        pickFiles() {
            this.$refs.filesUpload.click();
        },
        onUploadFiles(e) {
            let all_files = e.target.files
            let uploadedFiles = this.newUploads

            for(let file = 0; file < all_files.length; file++) {
                this.newUploads.push(all_files[file])
            }
        },
        removeFile(file, index) {
            //let files = this.course.files
            this.oldFiles.splice(index, 1)
            this.course.deleteFiles.push(file.id)
        },
        removeUploadedFile(index) {
            this.newUploads.splice(index, 1);
        },
        async setCourseData() {
            // Set Course Tutors
            let tutors = []
            const tutorsFound = this.course.CourseTutors
            await tutorsFound.forEach(async t => {
                const isTutor = await this.getTutors.find(tutor => tutor.id == t.tutorId)
                if(isTutor) {
                    tutors.push(isTutor)
                }
            })

            this.courseTutors = tutors
            //this.course.deleteTutors = tutors

            // Set Course Categories
            let categories = []
            const categoriesFound = this.course.courseCategories
            await categoriesFound.forEach(async c => {
                const isCategory = await this.getCategories.find(category => category.id == c.id)
                if(isCategory) {
                    categories.push(isCategory)
                }
            })
            this.courseCategories = categories

            // Set Certification Effective Period
            if(!this.course.certEffectivePeriod || this.course.certEffectivePeriod == "null" || this.course.certEffectivePeriod == "N/A") {
                this.is_cert = false
                this.course.certEffectivePeriod = "N/A"
            }

            // Set Course Picture
            if(this.course.picture) {
                this.picked_image = this.course.picture
            }

            // Set Course Files
            this.oldFiles = this.course.CourseFiles
            this.course.deleteFiles = []
            //this.course.deleteFiles = this.course.files
        },
        async submitCourse() {
            let courseData = Object.assign({}, this.course)
            
            delete courseData.CourseTutors
            delete courseData.CourseFiles
            delete courseData.courseCategories
            delete courseData.Lessons
            console.log(courseData)
            // Check if Picture Not Uploaded
            if(!courseData.picture) {
                this.toast({title: "Create Course", message: "Please Upload Course Picture.", type: "warning"})
                return
            }

            // Set Delete Files
            if(courseData.deleteFiles.length > 0) {
                courseData.deleteFiles = JSON.stringify(courseData.deleteFiles)
            }
            else {
                delete courseData.deleteFiles
            }

            // Check If No File Uploaded
            if(!this.oldFiles.length && !this.newUploads.length) {
                this.toast({title: "Create Course", message: "Please Upload atleast 1 File for Course.", type: "warning"})
                return
            }
            // Set Category IDs in Array
            if(this.courseCategories.length < 1) {
                this.toast({title: "Create Course", message: "Please Select atleast 1 Category", type: "warning"})
                return
            }
            if(this.courseCategories.length > 0) {
                let categories = []
                this.courseCategories.forEach(c => {
                    categories.push(c.id)
                })
                courseData.categories = categories
                courseData.categories = JSON.stringify(courseData.categories)
            }
            // Set Tutor IDs in Array
            if(this.courseTutors.length < 1) {
                this.toast({title: "Create Course", message: "Please Select atleast 1 Tutor", type: "warning"})
                return
            }
            if(this.courseTutors.length > 0) {
                let tutors = []
                this.courseTutors.forEach(c => {
                    tutors.push(c.id)
                })
                courseData.tutors = tutors
                courseData.tutors = JSON.stringify(courseData.tutors)
            }
    
            // If Cert Not Effective Period than set N/A
            if(!this.is_cert) {
                this.course.certEffectivePeriod = "N/A"
            }

            // Convert to Form Data
            var form_data = new FormData();
            for ( var key in courseData ) {
                form_data.append(key, courseData[key]);
            }
            form_data.delete("files")
            if(this.newUploads.length) {
                // courseData.files = courseData.files.concat(this.newUploads)
                for( var i = 0; i < this.newUploads.length; i++ ){
                    let file = this.newUploads[i];
                    form_data.append('files', file);
                }
            }
            
            form_data.forEach((value,key) => {
                console.log(key+" "+value)
            });
            // Submit Course
            const payload = {
                id: this.course.id,
                data: form_data
            }
            this.updateLoading = true
            const resp = await this.updateCourse(payload)
            this.updateLoading = false
            if(resp == 1) {
                this.$router.push('/courses')
            }
            if(resp != 1 && resp != 0 && typeof resp == 'object') {
                this.errors = resp
            }
        }
    },
   
    data() {
        return {
            oldFiles: [],
            newUploads: [],
            courseCategories: [],
            courseTutors: [],
            image: require('../assets/a.jpg'),
            is_cert: true,
            picked_image: null,
            all_categories: [],
            loading: false,
            updateLoading: false,
            errors: [],
            courseNatures: ['License Renewal', 'New Course', "Other"],
            course: null,
            breadcrumb: [
                {
                    text: 'Courses',
                    path: '/courses',
                    active: false
                },
                {
                    text: 'Edit Course',
                    active: true
                }
            ]
        }
    }
}
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style scoped>
.breadcrumb {
  padding-left:0rem !important;
  padding-top:0rem !important
}
.rounded{
 border-radius: 1.25rem !important
}
.category-item:hover {
    cursor: pointer;
    background: #f9f9f9;
}
</style>
