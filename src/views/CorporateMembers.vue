<template>
  <div class="home">
    <Header msg="Welcome to Your Vue.js App" />
    <SecondaryHeader msg="Welcome to Your Vue.js App" />
    <b-container class="card bg-white mt-2 pb-5 pt-2">
      <MembersHeader
        :create="true"
        addtext="Add"
        reroute="/add-corporate"
      />
      <div class="mt-4 text-left text-primary">
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

      <div class="mt-3">
         <b-table :responsive="true" :fields="fields" :items="members_data">
           
            <template v-slot:head(company_name)="data">
                <span class="smalls">{{ data.label }}</span>
            </template>
            <template v-slot:head(contact_email)="data">
                <span class="smalls">{{ data.label }}</span>
            </template>
            <template v-slot:head(contact_number)="data">
                <span class="smalls">{{ data.label }}</span>
            </template>
            <template v-slot:head(discount_rate)="data">
                <span class="smalls">{{ data.label }}</span>
            </template>

            <template v-slot:head(end_date_of_discount)="data">
                <span class="smalls">{{ data.label }}</span>
            </template>

            <template v-slot:head(action)="data">
                <span class="smalls">{{ data.label }}</span>
            </template>

            <!-- Cells -->
           
            <template v-slot:cell(company_name)="data">
                <span class="smalls">{{data.item.company_name}} </span>
            </template>
            <template v-slot:cell(contact_email)="data">
                <span class="smalls">{{data.item.contact_email}}</span>
            </template>
            <template v-slot:cell(contact_number)="data">
                <span class="smalls">{{data.item.contact_number}}</span>
            </template>
            <template v-slot:cell(discount_rate)="data">
                <span class="smalls">{{data.item.discount_rate}}</span>
            </template>
            <template v-slot:cell(group_specific_discount)="data">
                <span class="smalls">{{data.item.group_specific_discount}} </span>
            </template>
            <template v-slot:cell(end_date_of_discount)="data">
                <span class="smalls">{{data.item.end_date_of_discount}} </span>
            </template>
            
            <template v-slot:cell(action)="data">
               <router-link to="/member-info"><i class="ml-2 mr-2 text-info fas fa-pencil-alt"></i></router-link> 
              <span class="smalls" v-b-modal.del-modal><i class="fas fa-trash text-danger"></i></span>

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
    <b-modal id="del-modal" hide-footer centered>
            <b-container class="text-center">
                <p> <b>Are you sure to delete the following member ?</b> </p>
                <h5 class="text-purple">Gammon Ltd</h5>
                <div>
                <b-button size="lg" variant="danger" pill>
                    Yes
                </b-button>
                <b-button class="ml-3" size="lg" variant="danger" pill>
                    Cancel
                </b-button>
                </div>
            </b-container>
        </b-modal>

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
            company_name:'Gammon Ltd',
            contact_email:'demo@gmail.com',
            contact_number:'852741852',
            discount_rate:'-3000HKD',
            group_specific_discount:'Group',
            end_date_of_discount:'31-12-2020',
            action:''
 

        },
        {
         
            company_name:'Gammon Ltd',
            contact_email:'demo@gmail.com',
            contact_number:'852741852',
            discount_rate:'-3000HKD',
            group_specific_discount:'Group',
            end_date_of_discount:'31-12-2020',
            action:''

        },
      ],

     
      fields: [
        // A regular column
        "company_name",
        "contact_email",
        "contact_number",
        "discount_rate",
        "group_specific_discount",
        "end_date_of_discount",
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
