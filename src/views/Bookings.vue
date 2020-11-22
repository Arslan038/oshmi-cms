<template>
    <div class="home">
        <Header msg="Welcome to Your Vue.js App" />
        <SecondaryHeader msg="Welcome to Your Vue.js App" />
        <b-container class="card bg-white mt-2 pb-5 pt-2">
            <CoursesHeader :create="true" addtext="Add Booking" reroute="/add-booking" />

            <div class="mt-2 text-left text-primary">
                <h4 class="text-purple">Bookings</h4>
            </div>

            <div class="mt-2 text-md-left d-flex">
                <div class="self-center">
                    Search
                </div>
                <div class="ml-3">
                    <input class="border-hids form-control col-md-12" />
                </div>
                <div class="ml-auto">
                    <b-button variant="info" @click="$router.push('/export-lessons')" class="pr-3 pl-3" pill>Export</b-button>
                </div>
            </div>

            <div>
                <b-table :responsive="true" striped hover :fields="fields" :items="view_able_orders">
                    <template v-slot:head(booking_id)="data">
                        <span class="smalls">{{data.label}}</span>
                    </template>
                    <template v-slot:head(course_title)="data">
                        <span class="smalls">{{data.label}}</span>
                    </template>
                    <template v-slot:head(candidate_type)="data">
                        <span class="smalls">{{data.label}}</span>
                    </template>
                    <template v-slot:head(invoice)="data">
                        <span class="smalls">{{data.label}}</span>
                    </template>
                    <template v-slot:head(course_date)="data">
                        <span class="smalls">{{data.label}}</span>
                    </template>

                    <template v-slot:head(booking_date)="data">
                        <span class="smalls">{{data.label}}</span>
                    </template>

                    <template v-slot:head(booked_by)="data">
                        <span class="smalls">{{ data.label }}</span>
                    </template>
                    <template v-slot:head(action)="data">
                        <span class="smalls">{{ data.label }}</span>
                    </template>

                    <!-- Cells -->
                    <template v-slot:cell(booking_id)="data">
                        <span class="smalls">{{data.item.booking_id}} </span>
                    </template>
                    <template v-slot:cell(course_title)="data">
                        <span class="smalls">{{data.item.course_title}}</span>
                    </template>
                    <template v-slot:cell(candidate_type)="data">
                        <span class="smalls">{{data.item.candidate_type}}</span>
                    </template>
                    <template v-slot:cell(payment)="data">
                        <span class="smalls">{{data.item.payment}}</span>
                    </template>
                    <template v-slot:cell(invoice)="data">
                        <b-badge variant="danger">{{data.item.invoice}}</b-badge>
                    </template>
                    <template v-slot:cell(course_date)="data">
                        <span class="smalls">{{data.item.course_date}} </span>
                    </template>

                    <template v-slot:cell(booking_date)="data">
                        <span class="smalls">
                            {{data.item.booking_date}}
                        </span>
                    </template>
                    <template v-slot:cell(booked_by)="data">
                        <span class="smalls">
                            {{data.item.booked_by}}
                        </span>
                    </template>
                    <template v-slot:cell(action)="data">
                        <router-link to="/edit-courses"><i class="ml-2 mr-2 text-info fas fa-pencil-alt"></i></router-link>
                    </template>
                </b-table>

                <div class="float-right">
                    <b-pagination v-model="currentPage" :total-rows="totalRows" :per-page="perPage" class="my-0" pills></b-pagination>
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
export default {
    name: 'Orders',
    components: {
        Header,
        SecondaryHeader,
        CoursesHeader
    },
    data() {
        return {
         
          view_able_orders:[
            {
              booking_id:'123456',
              course_title:'某人用中文写的东西作为演示文字',
              candidate_type:'Corporate',
              payment:'Monthly',
              invoice:'View',
              course_date:'5-11-2020',
              booking_date:'20-11-2020',
              booked_by:'Client',
              action:''
            },
            {
              booking_id:'123456',
              course_title:'某人用中文写的东西作为演示文字',
              candidate_type:'Corporate',
              payment:'Monthly',
              invoice:'View',
              course_date:'5-11-2020',
              booking_date:'20-11-2020',
              booked_by:'Client',
              action:''
            }
          ],
        
         fields: [
          // A regular column
          'booking_id',
          'course_title',
          'candidate_type',
          'payment',
          'invoice',
          'course_date',
          'booking_date',
          'booked_by',      
          'action'
        ],

        totalRows: 1,
        currentPage: 1,
        perPage: 10,
            
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
