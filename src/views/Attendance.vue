<template>
  <div class="home">
    <Header msg="Welcome to Your Vue.js App" />
    <SecondaryHeader  title="Attendance" />
    <b-container class="card bg-white mt-2 pb-5 pt-2">
      <CorporateHeader
        :create="false"
        reroute="/create-courses"
      />

      <b-row class="mt-4">
        <b-col md="1" class="text-left al-center">
         <h6><b>Courses</b> </h6> 
        </b-col>
        <b-col md="8">
          <select class="form-control rounded">
            <option value="">Select course and date</option>
          </select>
        </b-col>
      </b-row>

      <div class="mt-2 text-md-left d-md-flex d-block d-lg-flex">
        <div class="self-center text-left">
          Search
        </div>
        <div class="ml-3">
          <input class="border-hids form-control col-md-12" />
        </div>
        <div>
          <select class="form-control rounded">
            <option value="" selected disabled>--Select--</option>
          </select>
        </div>
        <div class="ml-auto">
          <b-button
            variant="info"
            class="pr-3 pl-3"
            pill
            @click="$bvModal.show('actions')"
            >Export</b-button
          >
        </div>
      </div>

      <div class="mt-3">
         <b-table bordered :responsive="true" :fields="fields" :items="members_data">
            <template v-slot:head(name)="data">
                <span class="smalls">{{ data.label }}</span>
            </template>
            <template v-slot:head(member_id)="data">
                <span class="smalls">{{ data.label }}</span>
            </template>
            <template v-slot:head(course_date)="data">
                <span class="smalls">{{ data.label }}</span>
            </template>
            <template v-slot:head(course_time)="data">
                <span class="smalls">{{ data.label }}</span>
            </template>

            <template v-slot:head(payment_type)="data">
                <span class="smalls">{{ data.label }}</span>
            </template>

            <template v-slot:head(status)="data">
                <span class="smalls">{{ data.label }}</span>
            </template>
             <template v-slot:head(action)="data">
                <span class="smalls">{{ data.label }}</span>
            </template>


            <!-- Cells -->
            <template v-slot:cell(name)="data">
                <span class="smalls">{{data.item.name}} </span>
            </template>
            <template v-slot:cell(member_id)="data">
                <span class="smalls">{{data.item.member_id}}</span>
            </template>
            <template v-slot:cell(course_date)="data">
                <span class="smalls">{{data.item.course_date}}</span>
            </template>
            <template v-slot:cell(course_time)="data">
                <span class="smalls">{{data.item.course_time}}</span>
            </template>
            <template v-slot:cell(payment_type)="data">
                <span class="smalls">{{data.item.payment_type}} </span>
            </template>
            <template v-slot:cell(status)="data">
                <b-button v-if="data.item.status=='Finished'" variant="success" class="rounds">
                  {{data.item.status}}
                </b-button>
                <b-button v-else-if="data.item.status=='Absent'" variant="outline-success" class="rounds">
                  {{data.item.status}}
                </b-button>
                <b-button v-else-if="data.item.status=='Failed'" variant="warning" class="rounds">
                  {{data.item.status}}
                </b-button>
            </template>
            <template v-slot:cell(action)="data">
               <router-link to="/member-info"><i class="ml-2 mr-2 text-info fas fa-pencil-alt"></i></router-link> 
            </template>
        </b-table>

        <div class="float-right">
          <b-pagination
            v-model="currentPage"
            :total-rows="totalRows"
            :per-page="perPage"
            class="my-0"
            pills
          ></b-pagination>
        </div>
      </div>
    </b-container>

  </div>
</template>

<script>
// @ is an alias to /src
import Header from "@/components/Header.vue";
import SecondaryHeader from "@/components/SecondaryHeader.vue";

import CorporateHeader from "../components/CorporateHeader.vue";
export default {
  name: "Orders",
  components: {
    Header,
    SecondaryHeader,
    CorporateHeader,
  },
  data() {
    return {
      members_data: [

        {
             name:'Chai Tai',
            member_id:'85274185',
            course_date:'24-6=2020',
            course_time:'12:00',
            payment_type:'Offline',
            status:'Finished',
            action:''

 

        },
        {
          
             name:'Chai Tai',
            member_id:'85274185',
            course_date:'24-6=2020',
            course_time:'12:00',
            payment_type:'Offline',
            status:'Failed',
            action:''
        },
        {
          
             name:'Chai Tai',
            member_id:'85274185',
            course_date:'24-6=2020',
            course_time:'12:00',
            payment_type:'Offline',
            status:'Absent',
            action:''
        },
      ],

     
      fields: [
        // A regular column
        "name",
        "member_id",
        "course_date",
        "course_time",
        "payment_type",
        "status",
        "action",
      ],

      totalRows: 1,
      currentPage: 1,
      perPage: 10,
    };
  },
};
</script>

<style scoped>
.breadcrumb {
  padding-left: 0rem !important;
  padding-top: 0rem !important;
}
.rounded {
  border-radius: 1.25rem !important;
}
</style>
