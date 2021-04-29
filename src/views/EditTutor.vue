<template>
    <div class="home">
        <Header msg="Welcome to Your Vue.js App" />
        <SecondaryHeader title="Edit Tutor" :breadcrumb="breadcrumb" />
        <b-container class="card bg-white mt-2 pb-5 pt-2" >
            <b-row>
                <b-col class="mt-2 text-left text-primary">
                    <h4 class="text-green">Update Tutor</h4>
                </b-col>
            </b-row>

            <b-row v-if="loading">
                <b-col cols="12">
                    <b-spinner variant="purple"></b-spinner>
                    <p>Loading Tutor Information...</p>
                </b-col>
            </b-row>

            <b-form @submit.prevent="submitTutor" v-if="tutor && !loading">
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
                                    <b-form-datepicker class="rounded" v-model="license.expiry_date" required></b-form-datepicker>
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
                                <b-button variant="danger" class="px-5" type="submit" pill :disabled="editLoading">{{editLoading ? 'Updating Tutor...' : 'Update Tutor'}}</b-button>
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
import {mapActions, mapGetters} from 'vuex'
export default {
    name: 'EditTutor',
    components: {
        Header,
        SecondaryHeader,
    },
    computed: {
        ...mapGetters(['getTutors', 'getTutor']),
    },
    async created() {
        if(this.getTutors.length < 1) {
            this.loading = true
            const resp = await this.fetchTutor(this.$route.params.id)
            this.loading = false
            if(resp == 1) {
                this.tutor = this.getTutor
                this.setTutorData()
            }
        }
        else {
            const findTutor = this.getTutors.find(t => t.id == this.$route.params.id)
            if(findTutor) {
                this.tutor = findTutor
                this.setTutorData()
            }
        }
    },
    watch:{
     
    },
    methods: {
        ...mapActions(["updateTutor", 'fetchTutor']),
        setTutorData() {
            if(this.tutor.licenses) {
                if(typeof this.tutor.licenses == "string") {
                    const licenses = JSON.parse(this.tutor.licenses)
                    if(this.tutor.licenses.length) {
                        this.tutor.licenses = licenses
                        this.have_licenses = true
                    }
                }
                if(typeof this.tutor.licenses == "object") {
                    this.have_licenses = true
                }
            }
            // Set Course Files
            this.oldFiles = this.tutor.TutorFiles
            this.tutor.deleteFiles = []
        },
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
        removeFile(file, index) {
            this.oldFiles.splice(index, 1)
            this.tutor.deleteFiles.push(file.id)
        },
        removeUploadedFile(index) {
            this.newUploads.splice(index, 1);
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
        async submitTutor() {
            //console.log(this.tutor)
            let tutorData = Object.assign({}, this.tutor)
            if(this.tutor.licenses && this.tutor.licenses.length) {
                tutorData.licenses = JSON.stringify(tutorData.licenses)
            }

            // Set Delete Files
            if(tutorData.deleteFiles.length > 0) {
                tutorData.deleteFiles = JSON.stringify(tutorData.deleteFiles)
            }
            else {
                delete tutorData.deleteFiles
            }

            var form_data = new FormData();
            for ( var key in tutorData ) {
                form_data.append(key, tutorData[key]);
            }
            form_data.delete("files")
            if(this.newUploads.length) {
                for( var i = 0; i < this.newUploads.length; i++ ){
                    let file = this.newUploads[i];
                    form_data.append('files', file);
                }
            }
            // if(this.newUploads && this.newUploads.length) {
            //     tutorData.files = tutorData.files.concat(this.newUploads)
            // }
            // if(tutorData.files && tutorData.files.length) {
            //     for( var i = 0; i < tutorData.files.length; i++ ){
            //         let file = tutorData.files[i];
            //         form_data.append('files', file);
            //     }
            // }
            // form_data.forEach((value,key) => {
            //     console.log(key+" "+value)
            // });
            const payload = {
                id: this.tutor.id,
                data: form_data
            }
            this.editLoading = true
            const resp = await this.updateTutor(payload)
            this.editLoading = false

            if(resp == 1) {
                this.move('/tutors')
            }
        }
    },
    data() {
        return {
            loading: false,
            editLoading: false,
            have_licenses: false,
            tutor: null,
            oldFiles: [],
            newUploads: [],
            breadcrumb: [
                {
                    text: 'Tutors',
                    path: '/tutors',
                    active: false
                },
                {
                    text: 'Edit Tutor',
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
