<template>
    <div class="home">
        <Header msg="Welcome to Your Vue.js App" />
        <SecondaryHeader msg="Welcome to Your Vue.js App" />
        <b-container class="card bg-white mt-2 pb-5 pt-2">
            <b-row class="mt-4">
                <b-col md="4" class="text-left">
                    <h6><b>Class</b></h6>
                </b-col>
                <b-col class="text-left">
                    <h6><b>用中文写东西</b></h6>
                </b-col>
            </b-row>
            <b-row class="mt-3">
                <b-col md="4" class="text-left">
                    <h6><b>Course Date</b></h6>
                </b-col>
                <b-col class="text-left">
                    <h6><b>10-10-2020</b></h6>
                </b-col>
            </b-row>
            <b-row class="mt-3">
                <b-col md="4" class="text-left">
                    <h6><b>Start Time</b></h6>
                </b-col>
                <b-col class="text-left">
                    <h6><b>12:00</b></h6>
                </b-col>
            </b-row>
            <b-row class="mt-3">
                <b-col md="4" class="text-left">
                    <h6><b>End Time</b></h6>
                </b-col>
                <b-col class="text-left">
                    <h6><b>14:00-10-2020</b></h6>
                </b-col>
            </b-row>
            <b-row class="mt-3">
                <b-col md="4" class="text-left">
                    <h6><b>Registered Students</b></h6>
                </b-col>
                <b-col class="text-left">
                    <h6><b>20 of 20 </b></h6>
                </b-col>
            </b-row>

            <div>
                <b-table :responsive="true" bordered :fields="fields" :items="view_able_orders">
                    <template v-slot:head(student_name)="data">
                        <span class="smalls">{{data.label}}</span>
                    </template>
                    <template v-slot:head(student_id)="data">
                        <span class="smalls">{{data.label}}</span>
                    </template>
                    <template v-slot:head(arrival_time)="data">
                        <span class="smalls">{{data.label}}</span>
                    </template>
                    <template v-slot:head(signature)="data">
                        <span class="smalls">{{data.label}}</span>
                    </template>

                    <!-- Cells -->

                    <template v-slot:cell(student_name)="data">
                        <span class="smalls">{{data.item.student_name}} </span>
                    </template>
                    <template v-slot:cell(student_id)="data">
                        <span class="smalls">{{data.item.student_id}}</span>
                    </template>

                    <template v-slot:cell(arrival_time)="data">
                        <span class="smalls">{{data.item.arrival_time}}</span>
                    </template>
                    <template v-slot:cell(signature)="data">
                        <span class="smalls">{{data.item.signature}} </span>
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


export default {
    name: 'ExportLesson',
    components: {
        Header,
        SecondaryHeader
    },
    data() {
        return {
            fields: [
            // A regular column
            'student_name',
            'student_id',
            'arrival_time',
            'signature',   

            ],
            view_able_orders:[
            {
              student_name:'Chan',
              student_id:'10',
              arrival_time:'演示位置',
              signature:'5-11-2020',
              
            },
            {
              student_name:'Chan',
              student_id:'10',
              arrival_time:'演示位置',
              signature:'5-11-2020',
            }
          ],
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
