<template>
    <div class="home">
        <Header msg="Welcome to Your Vue.js App" />
        <SecondaryHeader title="Bookings" :breadcrumb="breadcrumb"/>
        <b-container class="card bg-white mt-2 pb-5 pt-2">
            <CoursesHeader :create="true" addtext="Add Booking" reroute="/add-booking" />

            <div class="mt-4 text-left text-primary">
                <h4 class="text-purple">Bookings</h4>
            </div>

            <b-row v-if="loading">
                <b-col cols="12" class="text-center">
                    <b-spinner variant="purple"></b-spinner>
                    <p>Loading Bookings...</p>
                </b-col>
            </b-row>

            <b-row v-if="!loading && !bookings.length">
                <b-col cols="12" class="text-center">
                    <h5 class="text-purple">No Booking Found</h5>
                </b-col>
            </b-row>

            <div class="mt-2 text-md-left d-flex" v-if="!loading && bookings.length">
                <div class="self-center">
                    Search
                </div>
                <div class="ml-3">
                    <input class="border-hids form-control col-md-12" />
                </div>
                <div class="ml-auto">
                    <download-excel :data="export_data" :export-fields="export_fields" name="Bookings" worksheet="Bookings">
                        <b-button variant="info" class="pr-3 pl-3" pill>Export</b-button>
                    </download-excel>
                </div>
            </div>

            <div class="mt-3" v-if="!loading && bookings.length">
                <b-table bordered :responsive="true" striped hover :fields="fields" :current-page="currentPage" :per-page="rowsPerPage" :items="bookings">
                    <!-- Cells -->
                    <template v-slot:cell(lesson)="data">
                        <span class="smalls">{{data.item.Lesson.name}}</span>
                    </template>
                    <template v-slot:cell(bookedAs)="data">
                        <span class="smalls">{{data.item.corporateId ? 'Corporate' : 'Student'}}</span>
                    </template>
                    <!-- <template v-slot:cell(payment)="data">
                        <span class="smalls">{{data.item.corporateId ? 'Monthy' : 'Offline'}}</span>
                    </template> -->
                    <template v-slot:cell(bookingPrice)="data">
                        <span>{{data.item.bookingPrice}} HKD</span>
                        <!-- <b-badge variant="danger">Invoice</b-badge> -->
                    </template>

                    <template v-slot:cell(createdAt)="data">
                        <span class="smalls">
                            {{getDate(data.item.createdAt)}}
                        </span>
                    </template>
                    <template v-slot:cell(action)="">
                        <router-link to="/edit-courses"><i class="ml-2 mr-2 text-info fas fa-pencil-alt"></i></router-link>
                    </template>
                </b-table>

                <div class="float-right">
                    <b-pagination v-model="currentPage" :total-rows="bookings.length" :per-page="rowsPerPage" class="my-0" pills></b-pagination>
                </div>
            </div>
        </b-container>
    </div>
</template>

<script>
// @ is an alias to /src
import Header from '@/components/Header.vue'
import SecondaryHeader from '@/components/SecondaryHeader.vue'
import CoursesHeader from '../components/CoursesHeader.vue'
import {mapActions, mapGetters} from 'vuex'
export default {
    name: 'Bookings',
    components: {
        Header,
        SecondaryHeader,
        CoursesHeader
    },
    computed: {
        ...mapGetters(['getBookings'])
    },
    async created() {
        this.loading = true
        const resp = await this.fetchBookings()
        if(resp) {
            this.loading = false
        }
    },
    watch: {
        getBookings(val) {
            if(val && val.length) {
                this.bookings = this.getBookings
                this.setExportData()
            }
        }
    },
  methods: {
      ...mapActions(["fetchBookings"]),
      setExportData() {
          this.export_data = []
          if(this.bookings && this.bookings.length) {
            this.bookings.forEach(item => {
                item.lesson = item.Lesson.name

                if(item.corporateId) {
                    item.candidate_type = "Corporate"
                    item.corporate = item.CorporateMember.corporateName
                }
                else {
                    item.candidate_type = "Student"
                }

                this.export_data.push(item)
            })
          }
      }
  },
    data() {
        return {
        loading: false,
        bookings: [],
        fields: [
        {
          key: "id",
          label: "Booking ID",
        },
        {
          key: "lesson",
          label: "Lesson",
          sortable: true,
          sortByFormatted: true,
        },
        {
          key: "bookedAs",
          label: "Candidate Type",
          sortable: true,
          sortByFormatted: true,
        },
        {
          key: 'payment_type',
          label: "Payment Type",
          sortable: true,
          sortByFormatted: true,
        },
        {
          key: 'bookingPrice',
          label: "Price",
          sortable: true,
          sortByFormatted: true,
        },
        {
          key: "createdAt",
          label: "Booking Date"
        },
        {
          key: "bookedBy",
          label: "Booked By",
          sortable: true,
          sortByFormatted: true,
        },
        {
          key: "action",
          label: "Actions"
        }
      ],

        export_fields: {
            "Booking ID": "id",
            "Lesson": "lesson",
            "Candidate Type": "candidate_type",
            "Corporate": "corporate",
            "Payment": "payment_type",
            "Price": "bookingPrice",
            "Booking Date": "createdAt",
            "Booked By": "bookedBy"
        },
        export_data: [],
        currentPage: 1,
        perPage: 10,

        breadcrumb: [
            {
                text: 'Bookings',
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
