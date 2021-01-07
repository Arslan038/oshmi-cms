<template>
  <div class="home">
    <Header msg="Welcome to Your Vue.js App" />
    <SecondaryHeader title="Attendance" />
    <b-container class="card bg-white mt-2 pb-5 pt-2">
      <CorporateHeader
        :create="false"
        reroute="/corporate-attendance"
      />


      <b-row class="mt-5">
        <b-col md="2" cols="2" lg="2">
          <h6 class="pt-2"><b>Corporate</b> </h6> 
        </b-col>
        <b-col cols="10" md="8" lg="6">
          <div>
            <select class="form-control rounded" >
              <option value="" selected disabled>--Select Corporate--</option>
            </select>
          </div>
          <!-- <div class="mt-3 d-flex">
            <b-form-radio  name="some-radios" class="al-center" value="A"></b-form-radio>

            <select class="form-control rounded " style="color:black !important" >
              <option value="" selected disabled>Select Month</option>
              <option value="January-2020">January-2020</option>
              <option value="February-2020">February-2020</option>
              <option value="March-2020">March-2020</option>
              <option value="April-2020">April-2020</option>

            </select>
          </div>
          <div class="mt-3 d-flex">
            <b-form-radio v-model="selected" name="some-radios" value="B"></b-form-radio>

            <input type="date" class="form-control rounded">
          </div> -->
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="2" md="2" lg="2">
          <h6 class="pt-3"><b>Filter</b> </h6> 
        </b-col>
        <b-col cols="10" md="8" lg="6">
          <div class="mt-3">
            <select class="form-control rounded" >
              <option value="" selected disabled>--Status-</option>
            </select>
          </div>
        </b-col>
      </b-row>

      <div class="mt-2 text-md-left d-flex">
        <div class="self-center">
          Search
        </div>
        <div class="ml-3">
          <input class="border-hids form-control col-md-12" />
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
            <template v-slot:head(enrolled_course)="data">
                <span class="smalls">{{ data.label }}</span>
            </template>
            <template v-slot:head(month)="data">
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
            <template v-slot:cell(enrolled_course)="data">
                <span class="smalls">{{data.item.enrolled_course}}</span>
            </template>
            <template v-slot:cell(month)="data">
                <span class="smalls">{{data.item.month}}</span>
            </template>
            <template v-slot:cell(status)="data">
               <b-button  variant="success" class="rounds">
              {{data.item.status}}
            </b-button>
                <!-- <b-button  :variant="$route.name=='CorporateAttendance' ? 'danger':'outline-danger'" pill>{{data.item.status}}</b-button> -->

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
            name:'Gammon Ltd',
            enrolled_course:'3',
            month:'June',
            status:'Finished',
            action:''
 

        },
        {
         
         
            name:'Gammon Ltd',
            enrolled_course:'3',
            month:'June',
            status:'Finished',
            action:''

        },
      ],

     
      fields: [
        // A regular column
        "name",
        "enrolled_course",
        "month",
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
