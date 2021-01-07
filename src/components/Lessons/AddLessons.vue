<template>
    <div>
        <b-row>
            <b-col md="3" class="text-left" cols="12">
                <h6><b>Select Lessons</b></h6>
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
                <b-textarea placeholder="Add remarks" v-model="remarks" rows="4" class="roundeds"></b-textarea>
            </b-col>
        </b-row>
        <div class="text-md-left">
            <b-button pill variant="danger" @click="addBooking" class="d-block pr62" size="lg">Add</b-button>
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
        ...mapActions(["fetchLessons"]),
        lessonWithCourse({ name, course }) {
            return `${name} — ${course.name}`
        },
        async addBooking() {
            console.log(this.lesson)
            if(!this.lesson) {
                this.toast({title: "Create Booking", message: "Please Select Lesson", type: "warning"})
                return
            }
            if(this.remarks) {
                this.bookingData.remarks = this.remarks
            }
            if(this.bookingData) {
                this.bookingData.lessonIds = []
                this.bookingData.lessonIds.push(this.lesson.id)
            }
            console.log(this.bookingData)
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
            bookingData: null,
        }
    },

    watch: {
        'booking': {
            deep: true,
            handler(val) {
                this.bookingData = Object.assign({}, val)
            }
        }
    }
}
</script>

<style>

</style>