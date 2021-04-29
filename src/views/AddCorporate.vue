<template>
    <div class="home">
        <Header msg="Welcome to Your Vue.js App" />
        <SecondaryHeader title="Add Corporate" :breadcrumb="breadcrumb"/>
        <b-container class="card bg-white mt-2 pb-5 pt-2">
            <b-row>
                <b-col class="mt-2 text-left text-primary">
                    <h4 class="text-green">Add Corporate</h4>
                </b-col>
            </b-row>

            <b-form @submit.prevent="submitCorporate">
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
                <b-row class="mt-2">
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
                </b-row>
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
                        <multiselect v-model="corporate.courses" :options="getCourses" :tagabled="true" :multiple="true" :close-on-select="true" :clear-on-select="false" :preserve-search="true" placeholder="Select Courses" tag-placeholder="Select Courses" label="name" track-by="name" :preselect-first="false"></multiselect>
                    </b-col>
                </b-row>

                <b-row class="mt-3">
                    <b-col md="2" cols="12" class="text-left">
                        <b>Start Date of Discount</b>
                    </b-col>
                    <b-col md="10" cols="12" class="text-left">
                        <b-form-datepicker :min="today" v-model="corporate.discountStartDate" required placeholder="Discount Start Date" class="rounded"></b-form-datepicker>
                    </b-col>
                </b-row>
                
                <b-row class="mt-3" v-if="corporate.discountStartDate">
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
                    <div class="d-flex justify-content-between mt-2" v-for="(file, index) in corporate.files" :key="index">
                            <strong class="text-green">{{file.name}}</strong>
                            <i @click="removeFile(index)" class="fa fa-times-circle link"></i>
                        </div>
                    </b-col>
                </b-row>
                <div>
                    <b-row class="mt-3">
                        <b-col class="text-md-left">
                            <div>
                                <b-button variant="danger" class="pr62" type="submit" pill :disabled="loading">{{loading ? 'Adding Corporate...'  :'Add'}}</b-button>
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
    name: 'AddCorporate',
    components: {
        Header,
        SecondaryHeader,
        Multiselect
    },
    computed: {
        ...mapGetters(['getCourses'])
    },
    async created() {
        if(!this.getCourses.length) {
            await this.fetchCourses()
        }
    },
    methods: {
        ...mapActions(["fetchCourses", "createCorporateMember"]),
        pickFile() {
            this.$refs.fileUpload.click();
        },
        onUploadFile(e) {
            let all_files = e.target.files
            let uploadedFiles = this.corporate.files

            for(let file = 0; file < all_files.length; file++) {
                this.corporate.files.push(all_files[file])
            }
        },
        removeFile(index) {
            this.corporate.files.splice(index, 1);
        },
        async submitCorporate() {
            let corporateData = Object.assign({}, this.corporate)
            if(corporateData.password.length < 8) {
                this.toast({title: "Add Corporate", message: "Password should contain atleast 8 characters.", type: "warning"})
                return
            }
            if(!corporateData.discountStartDate) {
                this.toast({title: "Add Corporate", message: "Please Enter Start Date of Discount", type: "warning"})
                return
            }
            if(!corporateData.discountEndDate) {
                this.toast({title: "Add Corporate", message: "Please Enter End Date of Discount", type: "warning"})
                return
            }
            if(corporateData.discountType == 'per course' && !corporateData.courses.length) {
                this.toast({title: "Add Corporate", message: "Please Select atleast 1 Course.", type: "warning"})
                return
            }

            if(corporateData.courses.length) {
                let courses = []
                corporateData.courses.forEach(c => {
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
            if(corporateData.files && corporateData.files.length) {
                for( var i = 0; i < corporateData.files.length; i++ ){
                    let file = corporateData.files[i];
                    form_data.append('files', file);
                }
            }

            this.loading = true
            const resp = await this.createCorporateMember(form_data)
            this.loading = false
            if(resp == 1) {
                this.$router.push('/corporate-members')
            }
        }
    },
    data() {
        return {
            today: new Date(),
            loading: false,
            corporate: {
                corporateName: null,
                personContact: null,
                phone: null,
                email: null,
                address: null,
                name: null,
                password: null,
                discountType: "per enrollment",
                discountValue: null,
                courses: [],
                discountEndDate: null,
                discountStartDate: null,
                files: []
            },
            breadcrumb: [
                {
                    text: 'Corporate Members',
                    path: '/corporate-members',
                    active: false
                },
                {
                    text: 'Add Corporate',
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
