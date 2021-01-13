<template>
    <div>
        <b-row>
            <b-col md="3" class="text-left" cols="12">
                <h6><b>Select Lesson</b></h6>
            </b-col>
            <b-col md="7" cols="12">
                <multiselect v-model="lesson" :options="getLessons" :tagabled="true" :multiple="false" :close-on-select="true" :clear-on-select="false" :preserve-search="true" placeholder="Select Lesson" tag-placeholder="Select Lesson" :custom-label="lessonWithCourse" track-by="name" :preselect-first="false">
                    <template slot="singleLabel" slot-scope="{ option }"><strong>{{ option.name }}</strong> from Course <strong>  {{ option.course.name }}</strong></template>
                </multiselect>
            </b-col>
        </b-row>
        <b-row class="mt-2">
            <b-col md="3" class="text-left" cols="12">
                <h6><b>Remarks.</b></h6>
            </b-col>
            <b-col md="7" cols="12">
                <b-textarea placeholder="Add remarks" v-model="remarks" rows="4" class="roundeds" required></b-textarea>
            </b-col>
        </b-row>
        <b-row class="mt-2" v-if="booking && booking.bookedAs == 'corporate'">
            <b-col class="text-left" md="3" cols="12">
                <b>Student File</b>
            </b-col>
            <b-col md="7" cols="12" class="mb-3">
                <div @click="pickFiles" class="text-center pick-product-image">
                    <p>
                        <i class="fa fa-upload fa-2x"></i>
                        <br />
                    </p>
                    <strong>Click To Upload Student File</strong>
                    <input
                        type="file"
                        style="display:none"
                        ref="filesUpload"
                        @change="onUploadFiles"
                        accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                    />
                </div>
                <i class="fa fa-info-circle text-purple"> You can upload only Excel File</i>
                <div v-if="file" class="">
                    <strong>{{file.name}}</strong>
                </div>
            </b-col>
        </b-row>
        <div class="text-md-left mt-4">
            <b-button pill variant="danger" @click="addBooking" class="d-block pr62" size="lg" :disabled="loading">{{loading ? 'Creating Booking...' : 'Create Booking'}}</b-button>
            <b-button pill variant="outline-secondary" class="d-block mt-md-2 mt-2 pr-5 pl-5" size="lg">Cancel</b-button>
        </div>
    </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
import Multiselect from 'vue-multiselect';
export default {
    components: {
        Multiselect
    },
    props: {
        booking: {
            type: Object,
            default: null
        }
    },
    computed: {
        ...mapGetters(['getLessons'])
    },
    methods: {
        ...mapActions(["fetchLessons", "createStudentBooking", "createCorporateBooking"]),
        lessonWithCourse({ name, course }) {
            return `${name} — ${course.name}`
        },
        pickFiles() {
            this.$refs.filesUpload.click();
        },
        onUploadFiles(e) {
            let student_file = e.target.files[0]
            if(student_file) {
                this.file = student_file
            }
        },
        async addBooking() {
            if(!this.lesson) {
                this.toast({title: "Create Booking", message: "Please Select Lesson", type: "warning"})
                return
            }
            if(!this.remarks || this.remarks == '') {
                this.toast({title: "Create Booking", message: "Please Enter Your Remarks", type: "warning"})
                return
            }
            if(this.remarks) {
                this.booking.remarks = this.remarks
            }
            if(this.booking) {
                this.booking.lessonId = this.lesson.id
            }
            this.booking.date = new Date().toISOString()

            if(this.booking.bookedAs && this.booking.bookedAs == "corporate") {
                if(!this.file) {
                    this.toast({title: "Create Booking", message: "Please Pick Students File", type: "warning"})
                    return
                }
                this.booking.file = this.file
                // Make Form Data
                var form_data = new FormData();
                for ( var key in this.booking ) {
                    form_data.append(key, this.booking[key]);
                }

                this.loading = true
                const resp = await this.createCorporateBooking(form_data)
                this.loading = false
                if(resp == 1) {
                    this.$router.push('/bookings')
                }
            }
            else {
                this.loading = true
                const resp = await this.createStudentBooking(this.booking)
                this.loading = false
                if(resp == 1) {
                    this.$router.push('/bookings')
                }
            }
        }
    },
    created() {
        if(!this.getLessons.length) {
            this.fetchLessons()
        }
    },
    data() {
        return {
            loading: false,
            lessons: [],
            lesson: null,
            remarks: null,
            file: null,
        }
    },

    // watch: {
    //     booking: {
    //         deep: true,
    //         handler(val) {
    //             console.log(val)
    //             this.bookingData = Object.assign({}, val)
    //         }
    //     }
    // }
}
</script>

<style>

</style>