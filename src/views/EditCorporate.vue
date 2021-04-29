<template>
    <div class="home">
        <Header msg="Welcome to Your Vue.js App" />
        <SecondaryHeader title="Edit Corporate" :breadcrumb="breadcrumb"/>
        <b-container class="card bg-white mt-2 pb-5 pt-2">
            <b-row>
                <b-col class="mt-2 text-left text-primary">
                    <h4 class="text-green">Edit Corporate</h4>
                </b-col>
            </b-row>

            <b-row v-if="loading">
                <b-col cols="12">
                    <b-spinner variant="purple"></b-spinner>
                    <p>Loading Corporate Details...</p>
                </b-col>
            </b-row>
            <b-row v-if="!loading && !corporate">
                <b-col cols="12">
                    <p>Corporate Not Found</p>
                </b-col>
            </b-row>

            <b-form @submit.prevent="submitCorporate" v-if="corporate && !loading">
                <b-row class="mt-3">
                    <b-col md="2" class="text-left">
                        <b>Corporate Name</b>
                    </b-col>
                    <b-col md="10" class="text-left">
                        <b-form-input placeholder="Name" class="rounded" v-model="corporate.corporateName" required></b-form-input>
                    </b-col>
                </b-row>
                <b-row class="mt-3">
                    <b-col md="2" class="text-left">
                        <b>Contact Person</b>
                    </b-col>
                    <b-col md="10" class="text-left">
                        <b-form-input placeholder="Person Contact" class="rounded" v-model="corporate.personContact" required></b-form-input>
                    </b-col>
                </b-row>

                <b-row class="mt-2">
                    <b-col md="2" class="text-left">
                        <b>Contact Number</b>
                    </b-col>
                    <b-col md="10" class="text-left">
                        <b-form-input placeholder="Phone" class="rounded" v-model="corporate.phone" required></b-form-input>
                    </b-col>
                </b-row>

                <b-row class="mt-2">
                    <b-col md="2" class="text-left">
                        <b>Email</b>
                    </b-col>
                    <b-col md="10" class="text-left">
                        <b-form-input placeholder="Email" class="rounded" v-model="corporate.email" required></b-form-input>
                    </b-col>
                </b-row>

                <b-row class="mt-2">
                    <b-col md="2" class="text-left">
                        <b>Address</b>
                    </b-col>
                    <b-col md="10" class="text-left">
                        <b-form-input placeholder="Address" class="rounded" v-model="corporate.address" required></b-form-input>
                    </b-col>
                </b-row>
                <!-- <b-row class="mt-2">
                    <b-col md="2" class="text-left">
                        <b>Login name</b>
                    </b-col>
                    <b-col md="10" class="text-left">
                        <b-form-input placeholder="Login Name" class="rounded" v-model="corporate.name" required></b-form-input>
                    </b-col>
                </b-row>
                <b-row class="mt-2">
                    <b-col md="2" class="text-left">
                        <b>Login password</b>
                    </b-col>
                    <b-col md="10" class="text-left">
                        <b-form-input placeholder="Password" class="rounded" v-model="corporate.password" required></b-form-input>
                    </b-col>
                </b-row> -->
                <b-row class="mt-2">
                    <b-col md="2" cols="12" class="text-left">
                        <b>Discount Type</b>
                    </b-col>
                    <b-col cols="12" md="10" class="text-left">
                        <b-form-group>
                            <b-form-radio-group v-model="corporate.discountType" stacked required>
                                <b-form-radio name="some-radios" value="per enrollment"><strong>Per Enrollment</strong></b-form-radio>
                                <b-form-radio name="some-radios" value="per course"><strong>Per Course</strong></b-form-radio>
                            </b-form-radio-group>
                        </b-form-group>
                        
                        <b-input-group append="HKD" class="rounded">
                            <b-form-input placeholder="Discount Value" v-model="corporate.discountValue" required></b-form-input>
                        </b-input-group>
                    </b-col>
                </b-row>
                
                <b-row class="mt-3" v-if="corporate.discountType == 'per course'">
                    <b-col md="2" cols="12" class="text-left">
                        <b>Select Courses</b>
                    </b-col>
                    <b-col md="10" cols="12" class="text-left">
                        <multiselect v-model="courseList" :options="getCourses" :tagabled="true" :multiple="true" :close-on-select="true" :clear-on-select="false" :preserve-search="true" placeholder="Select Courses" tag-placeholder="Select Courses" label="name" track-by="name" :preselect-first="false"></multiselect>
                    </b-col>
                </b-row>

                <b-row class="mt-3">
                    <b-col md="2" cols="12" class="text-left">
                        <b>Start Date of Discount</b>
                    </b-col>
                    <b-col md="10" cols="12" class="text-left">
                        <b-form-datepicker v-model="corporate.discountStartDate" required placeholder="Discount Start Date" class="rounded"></b-form-datepicker>
                    </b-col>
                </b-row>
                
                <b-row class="mt-3">
                    <b-col md="2" cols="12" class="text-left">
                        <b>End Date of Discount</b>
                    </b-col>
                    <b-col md="10" cols="12" class="text-left">
                        <b-form-datepicker :min="corporate.discountStartDate" v-model="corporate.discountEndDate" required placeholder="Discount End Date" class="rounded"></b-form-datepicker>
                    </b-col>
                </b-row>

                <b-row class="mt-4">
                    <b-col class="text-left" md="2" cols="12">
                        <h6><b>File</b></h6>
                    </b-col>
                    <b-col md="10" cols="12" class="mb-3">
                        <div @click="pickFile" class="text-center pick-product-image">
                            <p>
                            <i class="fa fa-upload fa-2x"></i>
                            <br />
                            </p>
                            <strong>Click To Upload Files</strong>
                            <input
                                type="file"
                                style="display:none"
                                ref="fileUpload"
                                @change="onUploadFile"
                                multiple
                            />
                        </div>
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
                <div>
                    <b-row class="mt-3">
                        <b-col class="text-md-left">
                            <div>
                                <b-button variant="danger" class="pr62" type="submit" pill :disabled="editLoading">{{editLoading ? 'Updating Corporate...'  :'Edit'}}</b-button>
                            </div>
                            <div class="mt-3">
                                <b-button variant="outline-danger" class="pr-5 pl-5" @click="$router.push('/corporate-members')" pill>Cancel</b-button>
                            </div>
                        </b-col>
                    </b-row>
                </div>
            </b-form>
        </b-container>
    </div>
</template>

<script>
// @ is an alias to /src
import Header from '@/components/Header.vue'
import SecondaryHeader from '@/components/SecondaryHeader.vue'
import {mapActions, mapGetters} from 'vuex'
import Multiselect from 'vue-multiselect';
export default {
    name: 'EditCorporate',
    components: {
        Header,
        SecondaryHeader,
        Multiselect
    },
    computed: {
        ...mapGetters(['getCourses', 'getCorporateMember', 'getCorporateMembers'])
    },
    async created() {
        this.loading = true
        if(!this.getCourses.length) {
            await this.fetchCourses()
        }
        if(!this.getCorporateMembers.length) {
            await this.fetchCorporateMember(this.$route.params.id)
        }
        else {
            const member = await this.getCorporateMembers.find(m => m.id == this.$route.params.id)
            if(member) {
                this.corporate = Object.assign({}, member)
                this.setCorporateData()
            }
        }

        this.loading = false
    },
    watch: {
        getCorporateMember(val) {
            if(val) {
                this.corporate = Object.assign({}, val)
                this.setCorporateData()
            }
        }
    },
    methods: {
        ...mapActions(["fetchCourses", "updateCorporateMember", "fetchCorporateMember"]),
        setCorporateData() {
            this.corporate.discountStartDate = this.corporate.discountStartDate.split('T')[0]
            this.corporate.discountEndDate = this.corporate.discountEndDate.split('T')[0]

            if(this.corporate.corporatecourses && this.corporate.corporatecourses.length) {
                this.courseList = []
                this.corporate.corporatecourses.forEach(c => {
                    delete c.CorporateCourses
                    this.courseList.push(c)
                })
            }

            this.oldFiles = this.corporate.CorporateFiles
            this.corporate.deleteFiles = []

            console.log(this.corporate)
        },
        pickFile() {
            this.$refs.fileUpload.click();
        },
        onUploadFile(e) {
            let all_files = e.target.files
            let uploadedFiles = this.newUploads

            for(let file = 0; file < all_files.length; file++) {
                this.newUploads.push(all_files[file])
            }
        },
        removeFile(file,index) {
            this.oldFiles.splice(index, 1)
            this.corporate.deleteFiles.push(file.id)
        },
        removeUploadedFile(index) {
            this.newUploads.splice(index, 1);
        },
        async submitCorporate() {
            let corporateData = Object.assign({}, this.corporate)
            // console.log(corporateData)
            if(corporateData.password) {
                delete corporateData.password
            }
            if(!corporateData.discountStartDate) {
                this.toast({title: "Edit Corporate", message: "Please Enter Start Date of Discount", type: "warning"})
                return
            }
            if(!corporateData.discountEndDate) {
                this.toast({title: "Edit Corporate", message: "Please Enter End Date of Discount", type: "warning"})
                return
            }
            if(corporateData.discountType == 'per course' && !this.courseList.length) {
                this.toast({title: "Edit Corporate", message: "Please Select atleast 1 Course.", type: "warning"})
                return
            }

            // Set Delete Files
            if(corporateData.deleteFiles.length > 0) {
                corporateData.deleteFiles = JSON.stringify(corporateData.deleteFiles)
            }
            else {
                delete corporateData.deleteFiles
            }

            if(this.courseList.length) {
                let courses = []
                this.courseList.forEach(c => {
                    courses.push(c.id)
                })
                corporateData.courses = courses
                corporateData.courses = JSON.stringify(corporateData.courses)
            }

            var form_data = new FormData();
            for ( var key in corporateData ) {
                form_data.append(key, corporateData[key]);
            }
            form_data.delete("files")
            if(this.newUploads.length) {
                // courseData.files = courseData.files.concat(this.newUploads)
                for( var i = 0; i < this.newUploads.length; i++ ){
                    let file = this.newUploads[i];
                    form_data.append('files', file);
                }
            }

            this.editLoading = true
            const payload = {
                id: this.corporate.id,
                data: form_data
            }
            const resp = await this.updateCorporateMember(payload)
            this.editLoading = false
            if(resp == 1) {
                this.$router.push('/corporate-members')
            }
        }
    },
    data() {
        return {
            loading: false,
            editLoading: false,
            corporate: null,
            newUploads: [],
            oldFiles: [],
            courseList: [],
            breadcrumb: [
                {
                    text: 'Corporate Members',
                    path: '/corporate-members',
                    active: false
                },
                {
                    text: 'Edit Corporate',
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
