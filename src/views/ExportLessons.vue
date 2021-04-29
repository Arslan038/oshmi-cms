<template>
    <div class="home">
        <Header msg="Welcome to Your Vue.js App" />
        <SecondaryHeader title="Export Lesson" :breadcrumb="breadcrumb"/>
        <b-container class="card bg-white mt-2 pb-5 pt-2">
            <b-row v-if="loading">
                <b-col cols="12" class="text-center mt-3">
                    <b-spinner variant="purple"></b-spinner>
                    <p>Loading Lesson Bookings...</p>
                </b-col>
            </b-row>

            <b-row v-if="!loading && !bookings.length">
                <b-col cols="12" class="text-center mt-3">
                    <h5 class="text-green">No Booking Found...</h5>
                </b-col>
            </b-row>

            <div v-if="bookings.length && !loading">
                <b-row class="mt-4">
                    <b-col md="4" class="text-left">
                        <h6><strong>Lesson Name</strong></h6>
                    </b-col>
                    <b-col class="text-left">
                        <h6>{{lesson.name}}</h6>
                    </b-col>
                </b-row>
                <b-row class="mt-3">
                    <b-col md="4" class="text-left">
                        <h6><strong>Lesson Code</strong></h6>
                    </b-col>
                    <b-col class="text-left">
                        <h6>{{lesson.lessonCode}}</h6>
                    </b-col>
                </b-row>
                <b-row class="mt-3">
                    <b-col md="4" class="text-left">
                        <h6><b>Lesson Date</b></h6>
                    </b-col>
                    <b-col class="text-left">
                        <h6>{{getDate(lesson.startDate)}}</h6>
                    </b-col>
                </b-row>
                <b-row class="mt-3">
                    <b-col md="4" class="text-left">
                        <h6><b>Start Time</b></h6>
                    </b-col>
                    <b-col class="text-left">
                        <h6>{{lesson.startTime}}</h6>
                    </b-col>
                </b-row>
                <b-row class="mt-3">
                    <b-col md="4" class="text-left">
                        <h6><strong>End Time</strong></h6>
                    </b-col>
                    <b-col class="text-left">
                        <h6>{{lesson.endTime}}</h6>
                    </b-col>
                </b-row>
            </div>

            <div class="mt-3" v-if="!loading && bookings.length">
                <b-table :responsive="true" bordered :fields="fields" :items="bookings">

                    <!-- Cells -->
                    <template v-slot:cell(id)="data">
                        <span class="smalls">{{data.index+1}}</span>
                    </template>
                    <template v-slot:cell(name)="data">
                        <span class="smalls">{{data.item.IndividualMember.firstName}} {{data.item.IndividualMember.lastName}}</span>
                    </template>
                    <template v-slot:cell(email)="data">
                        <span class="smalls">{{data.item.IndividualMember.email}}</span>
                    </template>
                    <template v-slot:cell(company)="data">
                        <span class="smalls">{{data.item.corporateId ? data.item.CorporateMember.corporateName : ''}} </span>
                    </template>
                </b-table>
            </div>
            <div class="text-left">
                <b-button variant="outline-danger" pill>Download</b-button>
                <b-button variant="outline-danger" class="ml-2" pill>Cancel</b-button>
            </div>
        </b-container>
    </div>
</template>

<script>
// @ is an alias to /src
import Header from '@/components/Header.vue'
import SecondaryHeader from '@/components/SecondaryHeader.vue'
import {mapActions, mapGetters} from 'vuex'
export default {
    name: 'ExportLesson',
    computed: {
        ...mapGetters(['getBookings'])
    },
    components: {
        Header,
        SecondaryHeader
    },

    async created() {
        this.loading = true
        await this.fetchBookings()
        this.loading = false
    },
    watch: {
        async getBookings(val) {
            if(val) {
                this.bookings = await val.filter(booking => booking.lessonId == this.$route.params.id)
                this.lesson = this.bookings[0].Lesson
            }
        }
    },
    methods: {
        ...mapActions(["fetchBookings"])
    },
    data() {
        return {
            bookings: [],
            loading: false,
            lesson: null,
            fields: [
                {
                    key: 'id',
                    label: 'No'
                },
                {
                    key: "company",
                    label: "Company",
                },
                {
                    key: "name",
                    label: "Name"
                },
                {
                    key: "email",
                    label: "Email"
                },
                {
                    key: 'position',
                    label: "Position"
                },
                {
                    label: "Signature"
                },
            ],
          breadcrumb: [
                {
                    text: 'Lessons',
                    active: false,
                    path: '/lessons'
                },
                {
                    text: 'Export Lesson',
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
