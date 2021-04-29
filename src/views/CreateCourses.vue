<template>
    <div class="home">
        <Header msg="Welcome to Your Vue.js App" />
        <SecondaryHeader title="Create Course" :breadcrumb="breadcrumb" />
        <b-container class="card bg-white mt-2 pb-5 pt-2">
            <b-form @submit.prevent="submitCourse">
                <b-row>
                    <b-col class="mt-2 text-left text-primary">
                        <h4 class="text-green">Create Course</h4>
                    </b-col>
                    <b-col class="mt-2 text-right">
                        <b-button variant="danger" class="float-right pr-3 pl-3" type="submit" pill :disabled="loading">{{loading ? 'Creating Course' : 'Save'}}</b-button>
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

                <b-row class="mt-3">
                    <b-col md="2" class="text-left">
                        <b>Course Code</b>
                    </b-col>
                    <b-col md="10" class="text-left">
                        <b-form-input placeholder="Course Code" v-model="course.courseCode" class="rounded" required></b-form-input>
                        <i class="fa fa-info-circle text-green"> Course Code cannot be changed after course creation.</i>
                    </b-col>
                </b-row>

                <b-row class="mt-2">
                    <b-col md="2" class="text-left">
                        <b>Tutor</b>
                    </b-col>
                    <b-col md="10" class="text-left">
                        <multiselect v-model="course.tutors" :options="getTutors" :tagabled="true" :multiple="true" :close-on-select="true" :clear-on-select="false" :preserve-search="true" placeholder="Select Tutors" tag-placeholder="Select Tutors" label="name" track-by="name" :preselect-first="false"></multiselect>
                    </b-col>
                </b-row>
                <b-row class="mt-2">
                    <b-col md="2" class="text-left">
                        <b>Categories</b>
                    </b-col>
                    <b-col md="10" class="text-left">
                        <multiselect v-model="course.categories" :options="getCategories" :tagabled="true" :multiple="true" :close-on-select="true" :clear-on-select="false" :preserve-search="true" placeholder="Select Categories" tag-placeholder="Select Categories" label="name" track-by="name" :preselect-first="false"></multiselect>
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

                <b-row class="mt-2">
                    <b-col md="2" class="text-left">
                        <b>Cert Effective Period</b>
                    </b-col>
                    <b-col md="10" class="text-left">
                        <b-form-checkbox button-variant="purple" v-model="is_cert">Does this course has Cert Effective Period ? ?</b-form-checkbox>
                    </b-col>
                </b-row>

                <b-row class="mt-2" v-if="is_cert">
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
                </b-row>

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
                        
                        <img :src="picked_image ? picked_image : image" width="100px" alt="" />
                        
                        <div class="d-flex mt-2">
                            <div style="align-self: center;"><i class="fas fa-file-image"></i> {{course.picture ? course.picture.name : "No File Selected"}}</div>
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
                    <div class="d-flex justify-content-between mt-2" v-for="(file, index) in course.files" :key="index">
                            <strong class="text-green">{{file.name}}</strong>
                            <i @click="removeFile(index)" class="fa fa-times-circle"></i>
                        </div>
                    </b-col>
                </b-row>
                <b-row class="mt-3">
                    <b-col class="text-left">
                        <b-button variant="danger" type="submit" class="pr-5 pl-5" pill :disabled="loading">{{loading ? 'Creating Course' : 'Save'}}</b-button>
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
import moment from 'moment'
export default {
    name: 'CreateCourse',
    computed: {
        ...mapGetters(['getTutors', 'getCategories']),
    },
    components: {
        Header,
        SecondaryHeader,
        VueEditor,
        Multiselect
    },
    async created() {
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
    },
    methods: {
        ...mapActions(["fetchTutors", "fetchCategories", "createCourse"]),
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
            }
        },
        pickFiles() {
            this.$refs.filesUpload.click();
        },
        onUploadFiles(e) {
            let all_files = e.target.files

            for(let file = 0; file < all_files.length; file++) {
                this.course.files.push(all_files[file])
            }
        },
        removeFile(index) {
            this.course.files.splice(index, 1)
        },
        async submitCourse() {
            let courseData = Object.assign({}, this.course)
            
            // Check if Picture Not Uploaded
            if(!courseData.picture) {
                this.toast({title: "Create Course", message: "Please Upload Course Picture.", type: "warning"})
                return
            }
            // Check If No File Uploaded
            if(!courseData.files.length) {
                this.toast({title: "Create Course", message: "Please Upload atleast 1 File for Course.", type: "warning"})
                return
            }
            // Set Category IDs in Array
            if(courseData.categories.length < 1) {
                this.toast({title: "Create Course", message: "Please Select atleast 1 Category", type: "warning"})
                return
            }
            if(courseData.categories.length > 0) {
                let categories = []
                this.course.categories.forEach(c => {
                    categories.push(c.id)
                })
                courseData.categories = categories
                courseData.categories = JSON.stringify(courseData.categories)
            }
            // Set Tutor IDs in Array
            if(courseData.tutors.length < 1) {
                this.toast({title: "Create Course", message: "Please Select atleast 1 Tutor", type: "warning"})
                return
            }
            if(courseData.tutors.length > 0) {
                let tutors = []
                this.course.tutors.forEach(c => {
                    tutors.push(c.id)
                })
                courseData.tutors = tutors
                courseData.tutors = JSON.stringify(courseData.tutors)
            }
    
            // If Cert Not Effective Period than set N/A
            if(!this.is_cert) {
                this.course.certEffectivePeriod = "N/A"
            }
            else {
                // Cert Expiry Date
                const years = courseData.certEffectivePeriod.split(' ')[0]
                courseData.certExpDate = moment().add(years, 'Y').format('YYYY-MM-DD');
            }

            // Convert to Form Data
            var form_data = new FormData();
            for ( var key in courseData ) {
                form_data.append(key, courseData[key]);
            }
            form_data.delete("files")

            if(courseData.files && courseData.files.length) {
                for( var i = 0; i < courseData.files.length; i++ ){
                    let file = courseData.files[i];
                    form_data.append('files', file);
                }
            }
            form_data.forEach((value,key) => {
                console.log(key+" "+value)
            });
            // Submit Course
            this.loading = true
            const resp = await this.createCourse(form_data)
            this.loading = false
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
            image: require('../assets/a.jpg'),
            is_cert: true,
            picked_image: null,
            all_categories: [],
            loading: false,
            errors: [],
            courseNatures: ['License Renewal', 'New Course', "Other"],
            course: {
                courseCode: null,
                name: null,
                description: null,
                address: null,
                price: null,
                availableSeats: null,
                certEffectivePeriod: null,
                certExpDate: null,
                tutors: [],
                categories: [],
                files: [],
                picture: null,
                courseNature: "New Course"
            },
            breadcrumb: [
                {
                    text: 'Courses',
                    path: '/courses',
                    active: false
                },
                {
                    text: 'Create Course',
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
