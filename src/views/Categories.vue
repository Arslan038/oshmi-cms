<template>
    <div class="home">
        <Header msg="Welcome to Your Vue.js App" />
        <SecondaryHeader msg="Welcome to Your Vue.js App" />
        <b-container class="card bg-white mt-2 pb-5 pt-2">
            <CoursesHeader :create="false" addtext="Add Booking" reroute="/add-booking" />


            <div class="mt-5 text-md-left d-flex">
                <div class="self-center">
                    Search
                </div>
                <div class="ml-3">
                    <input class="border-hids form-control col-md-12" />
                </div>
            </div>

            <b-row class="mt-2">
                <b-col md="6" cols="12">
                    
                    <b-table bordered :responsive="true" striped hover :fields="fields" :items="view_able_orders">
                        <template v-slot:head(categories)="data">
                            <span class="smalls">{{data.label}}</span>
                        </template>
                        <template v-slot:head(course_title)="data">
                            <span class="smalls">{{data.label}}</span>
                        </template>
                        <template v-slot:head(candidate_type)="data">
                            <span class="smalls">{{data.label}}</span>
                        </template>

                        <template v-slot:head(booking_date)="data">
                            <span class="smalls">{{data.label}}</span>
                        </template>

                        <template v-slot:head(no_course)="data">
                            <span class="smalls">No. Course</span>
                        </template>
                        <template v-slot:head(action)="data">
                            <span class="smalls">{{ data.label }}</span>
                        </template>
 
                        <!-- Cells -->
                        <template v-slot:cell(categories)="data">
                            <span class="smalls">{{data.item.categories}} </span>
                        </template>
                        <template v-slot:cell(no_course)="data">
                            <span class="smalls">{{data.item.no_course}}</span>
                        </template>
                        <template v-slot:cell(action)="data">
                            <span class="smalls"><i class="fas fa-trash text-danger"></i></span>

                        </template>
                    </b-table>
                    <div class="float-right">
                    <b-pagination v-model="currentPage" :total-rows="totalRows" :per-page="perPage" class="my-0" pills></b-pagination>
                    </div>
                </b-col>

                
            </b-row>
            <b-row class="mt-4">
                <b-col class="text-md-left">
                    <b-button variant="outline-danger" pill class="pr-4 pl-4">
                        Add Category
                    </b-button>
                </b-col>
            </b-row>
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
              categories:'Environment',
              no_course:'2',
              action:'',
             
            },
            {
                categories:'Safety',
                no_course:'2',
                action:'',
             
            }
          ],
        
         fields: [
          // A regular column
          'categories',
          'no_course',
          'action',
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
