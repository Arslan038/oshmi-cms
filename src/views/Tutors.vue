<template>
    <div class="home">
        <Header msg="Welcome to Your Vue.js App" />
        <SecondaryHeader msg="Welcome to Your Vue.js App" />
        <b-container class="card bg-white mt-2 pb-5 pt-2">
            <CoursesHeader :create="true" addtext="Add Tutors" reroute="/add-tutor" />

            <div class="mt-2 text-left text-primary">
                <h4 class="text-purple">My Tutors</h4>
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
                   
                    <template v-slot:head(tutor_name)="data">
                        <span class="smalls">{{data.label}}</span>
                    </template>
                    <template v-slot:head(email)="data">
                        <span class="smalls">{{data.label}}</span>
                    </template>
                    <template v-slot:head(phone_no)="data">
                        <span class="smalls">{{data.label}}</span>
                    </template>
                    <template v-slot:head(classes)="data">
                        <span class="smalls">{{data.label}}</span>
                    </template>
                    <template v-slot:head(qualification)="data">
                        <span class="smalls">{{data.label}}</span>
                    </template>

                    <template v-slot:head(payment_per_lessons)="data">
                        <span class="smalls">{{data.label}}</span>
                    </template>

                    <template v-slot:head(action)="data">
                        <span class="smalls">{{ data.label }}</span>
                    </template>

                    <!-- Cells -->
                    
                    <template v-slot:cell(tutor_name)="data">
                        <span class="smalls">{{data.item.tutor_name}} </span>
                    </template>
                    <template v-slot:cell(email)="data">
                        <span class="smalls">{{data.item.email}}</span>
                    </template>
                    <template v-slot:cell(phone_no)="data">
                        <span class="smalls">{{data.item.phone_no}}</span>
                    </template>
                    <template v-slot:cell(classes)="data">
                        <span class="smalls">{{data.item.classes}}</span>
                    </template>
                    <template v-slot:cell(qualification)="data">
                        <b-badge variant="danger">{{data.item.qualification}}</b-badge>
                    </template>
                    <template v-slot:cell(payment_per_lessons)="data">
                        <span class="smalls">{{data.item.payment_per_lessons}} </span>
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

                        <i class="ml-2 mr-2 text-info fas fa-pencil-alt"></i>
                        <i class="fas fa-trash text-danger"></i>

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
        
              tutor_name:'Chi man',
              email:'demo@gmail.com',
              phone_no:'858585',
              classes:'5',
              qualification:'B.S P.hd',
              payment_per_lessons:'$1000',
              action:'',
             
            },
            {

                tutor_name:'Chi man',
              email:'demo@gmail.com',
              phone_no:'858585',
              classes:'5',
              qualification:'B.S P.hd',
              payment_per_lessons:'$1000',
              action:'',
                
             
            }
          ],
        
         fields: [
          // A regular column
          'tutor_name',
          'email',
          'phone_no',
          'classes',
          'qualification',
          'payment_per_lessons',
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
