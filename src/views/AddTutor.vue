<template>
    <div class="home">
        <Header msg="Welcome to Your Vue.js App" />
        <SecondaryHeader title="Add Tutor" :breadcrumb="breadcrumb" />
        <b-container class="card bg-white mt-2 pb-5 pt-2">
            <b-row>
                <b-col class="mt-2 text-left text-primary">
                    <h4 class="text-green">Add Tutor</h4>
                </b-col>
            </b-row>

            <b-form @submit.prevent="submitTutor">
                <b-row class="mt-3">
                    <b-col md="2" class="text-left">
                        <b>Tutors Full Name</b>
                    </b-col>
                    <b-col md="10" class="text-left">
                        <b-form-input class="rounded" placeholder="Name" v-model="tutor.name" required></b-form-input>
                    </b-col>
                </b-row>
                <b-row class="mt-3">
                    <b-col md="2" class="text-left">
                        <b>Contact Number</b>
                    </b-col>
                    <b-col md="10" class="text-left">
                        <b-form-input placeholder="Contact number" class="rounded" v-model="tutor.phone" required></b-form-input>
                    </b-col>
                </b-row>
                <b-row class="mt-2">
                    <b-col md="2" class="text-left">
                        <b>Contact Email</b>
                    </b-col>
                    <b-col md="10" class="text-left">
                        <b-form-input v-model="tutor.email" class="rounded" type="email" placeholder="Email" required></b-form-input>
                    </b-col>
                </b-row>
                <b-row class="mt-2">
                    <b-col md="2" class="text-left">
                        <b>Payment</b>
                    </b-col>
                    <b-col md="10" class="text-left">
                        <b-form-input v-model="tutor.payment" class="rounded" type="number" min="0" placeholder="Payment" required></b-form-input>
                    </b-col>
                </b-row>
                <b-row class="mt-2">
                    <b-col md="2" class="text-left">
                        <b>Qualification</b>
                    </b-col>
                    <b-col md="10" class="text-left">
                        <b-textarea rows="3" placeholder="Qualification" required  class="rounded" v-model="tutor.qualification" />
                    </b-col>
                </b-row>
                <b-row class="mt-2">
                    <b-col md="2" cols="12" class="text-left">
                        <b>Licenses</b>
                    </b-col>
                    <b-col md="10" cols="12" class="text-left">
                        <b-form-checkbox button-variant="purple" v-model="have_licenses">Do You Have Licenses ?</b-form-checkbox>
                    </b-col>
                    <b-col v-if="have_licenses" md="10" cols="12" class="offset-md-2 mt-3 text-left">
                        <b-row v-for="(license, index) in tutor.licenses" :key="index">
                            <b-col cols="5">
                                <b-form-group>
                                    <label for="license_name" v-if="tutor.licenses.length && index == 0"><strong>Select License</strong></label>
                                    <b-form-select class="rounded" v-model="license.name" required>
                                        <b-form-select-option :value="null">-- Select --</b-form-select-option>
                                        <b-form-select-option v-for="(name, index) in getLicenses()" :key="index" :value="name">{{name}}</b-form-select-option>
                                    </b-form-select>
                                </b-form-group>
                            </b-col>
                            <b-col cols="5">
                                <b-form-group>
                                    <label for="expiry_date" v-if="tutor.licenses.length && index == 0"><strong>Expiry Date</strong></label>
                                    <b-form-datepicker class="rounded" :min="today" v-model="license.expiry_date" required></b-form-datepicker>
                                </b-form-group>
                            </b-col>
                            <b-col cols="2" align-self="center">
                                <b-button variant="danger" size="sm" pill v-if="index == tutor.licenses.length-1" @click="addLicense"><i class="fa fa-plus"></i></b-button>
                                <b-button variant="warning" size="sm" class="ml-1" @click="removeTutor(index)" pill v-if="tutor.licenses.length > 1"><i class="fa fa-minus"></i></b-button>
                            </b-col>
                        </b-row>
                    </b-col>
                </b-row>
                <b-row class="mt-4">
                    <b-col class="text-left" md="2" cols="12">
                        <h6><b>File</b></h6>
                    </b-col>
                    <b-col md="8" cols="12" class="mb-3">
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
                    <div class="d-flex justify-content-between mt-2" v-for="(file, index) in tutor.files" :key="index">
                            <strong class="text-green">{{file.name}}</strong>
                            <i @click="removeFile(index)" class="fa fa-times-circle"></i>
                        </div>
                    </b-col>
                </b-row>
                <div>
                    <b-row class="mt-3">
                        <b-col class="text-md-left">
                            <div>
                                <b-button variant="danger" class="px-5" type="submit" pill :disabled="loading">{{loading ? 'Adding Tutor...' : 'Add Tutor'}}</b-button>
                            </div>
                            <div class="mt-3">
                                <b-button variant="outline-danger" class="px-5" @click="$router.push('/tutors')" pill>Cancel</b-button>
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
import {mapActions} from 'vuex'
export default {
    name: 'Orders',
    components: {
        Header,
        SecondaryHeader,
    },
    watch:{
     
    },
    methods: {
        ...mapActions(["createTutor"]),
        addLicense() {
            const pricing = {
                name: null,
                expiry_date: null
            };
            this.tutor.licenses.push(pricing);
        },
        removeTutor(index) {
            this.tutor.licenses.splice(index, 1);
        },
        removeFile(index) {
            this.tutor.files.splice(index, 1);
        },
        pickFile() {
            this.$refs.fileUpload.click();
        },
        onUploadFile(e) {
            let all_files = e.target.files
            let uploadedFiles = this.tutor.files

            for(let file = 0; file < all_files.length; file++) {
                this.tutor.files.push(all_files[file])
            }
        },
        async submitTutor() {
            //console.log(this.tutor)
            let tutorData = Object.assign({}, this.tutor)
            if(!this.have_licenses && tutorData.licenses.length) {
                delete tutorData.licenses
            }
            if(tutorData.licenses && tutorData.licenses.length) {
                if(tutorData.licenses.length == 1 && (tutorData.licenses[0].name == null || tutorData.licenses[0].name == "")) {
                    delete tutorData.licenses
                }
                else {
                    tutorData.licenses = JSON.stringify(tutorData.licenses)
                }
                
            }
            var form_data = new FormData();
            for ( var key in tutorData ) {
                form_data.append(key, tutorData[key]);
            }
            form_data.delete("files")
            if(tutorData.files && tutorData.files.length) {
                for( var i = 0; i < tutorData.files.length; i++ ){
                    let file = tutorData.files[i];
                    form_data.append('files', file);
                }
            }
            form_data.forEach((value,key) => {
                console.log(key+" "+value)
            });
            this.loading = true
            const resp = await this.createTutor(form_data)
            this.loading = false

            if(resp == 1) {
                this.move('/tutors')
            }
        }
    },
    data() {
        return {
            today: new Date(),
            loading: false,
            have_licenses: true,
            tutor: {
                name: null,
                email: null,
                phone: null,
                qualification: null,
                payment: null,
                licenses: [
                    {
                        name: null,
                        expiry_date: null
                    }
                ],
                files: []
            },
            breadcrumb: [
                {
                    text: 'Tutors',
                    path: '/tutors',
                    active: false
                },
                {
                    text: 'Add Tutor',
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
