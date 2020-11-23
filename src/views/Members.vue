<template>
  <div class="home">
    <Header msg="Welcome to Your Vue.js App" />
    <SecondaryHeader msg="Welcome to Your Vue.js App" />
    <b-container class="card bg-white mt-2 pb-5 pt-2">
      <MembersHeader
        :create="true"
        addtext="Add"
        reroute="/create-courses"
      />
      <div class="mt-2 text-left text-primary">
        <h4 class="text-purple">Members</h4>
      </div>

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

      <div>
         <b-table :responsive="true" :fields="fields" :items="members_data">
            <template v-slot:head(member_id)="data">
                <span class="smalls">{{ data.label }}</span>
            </template>
            <template v-slot:head(last_name)="data">
                <span class="smalls">{{ data.label }}</span>
            </template>
            <template v-slot:head(first_name)="data">
                <span class="smalls">{{ data.label }}</span>
            </template>
            <template v-slot:head(phone_no)="data">
                <span class="smalls">{{ data.label }}</span>
            </template>

            <template v-slot:head(license_expiry_date)="data">
                <span class="smalls">{{ data.label }}</span>
            </template>

            <template v-slot:head(email)="data">
                <span class="smalls">{{ data.label }}</span>
            </template>

            <!-- Cells -->
            <template v-slot:cell(member_id)="data">
                <span class="smalls">{{data.item.member_id}} </span>
            </template>
            <template v-slot:cell(last_name)="data">
                <span class="smalls">{{data.item.last_name}}</span>
            </template>
            <template v-slot:cell(first_name)="data">
                <span class="smalls">{{data.item.first_name}}</span>
            </template>
            <template v-slot:cell(phone_no)="data">
                <span class="smalls">{{data.item.phone_no}}</span>
            </template>
            <template v-slot:cell(license_expiry_date)="data">
                <span class="smalls">{{data.item.license_expiry_date}} </span>
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

import MembersHeader from "../components/MembersHeader.vue";
export default {
  name: "Orders",
  components: {
    Header,
    SecondaryHeader,
    MembersHeader,
  },
  data() {
    return {
      members_data: [

        {
            member_id:'43214',
            last_name:'Chan',
            first_name:'Jan',
            phone_no:'735465',
            license_expiry_date:'10-6-2021',
            email:'demo@gmail.com',
            action:''
 

        },
        {
            member_id:'43214',
            last_name:'Chan',
            first_name:'Jan',
            phone_no:'735465',
            license_expiry_date:'10-6-2021',
            email:'demo@gmail.com',
            action:''

        },
      ],

     
      fields: [
        // A regular column
        "member_id",
        "last_name",
        "first_name",
        "phone_no",
        "license_expiry_date",
        "email",
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
