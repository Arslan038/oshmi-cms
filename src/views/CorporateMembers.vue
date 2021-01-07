<template>
  <div class="home">
    <Header msg="Welcome to Your Vue.js App" />
    <SecondaryHeader title="Corpotrate Members" :breadcrumb="breadcrumb"/>
    <b-container class="card bg-white mt-2 pb-5 pt-2">
      <MembersHeader
        :create="true"
        addtext="Add"
        reroute="/add-corporate"
      />
      <div class="mt-4 text-left text-primary">
        <h4 class="text-purple">Corporate Members</h4>
      </div>

      <b-row v-if="loading">
        <b-col cols="12" class="text-center">
            <b-spinner variant="purple"></b-spinner>
            <p>Loading Corporate Members...</p>
        </b-col>
      </b-row>

      <b-row v-if="!loading && !members.length">
        <b-col cols="12" class="text-center">
            <h5 class="text-purple">No Corporate Member Found</h5>
        </b-col>
      </b-row>

      <div class="mt-2 text-md-left d-flex" v-if="!loading && members.length">
        <div class="self-center">
          Search
        </div>
        <div class="ml-3">
          <input class="border-hids form-control col-md-12" type="search" v-model="filter" />
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

      <div class="mt-3" v-if="!loading && members.length">
         <b-table :responsive="true" :fields="fields" bordered :items="memberList" :filter="filter">
           
            <!-- Cells -->
           
            <template v-slot:cell(discountValue)="data">
                <span class="smalls">{{data.item.discountValue}} HKD</span>
            </template>
            <template v-slot:cell(discountEndDate)="data">
                <span class="smalls">{{getDate(data.item.discountEndDate)}}</span>
            </template>
            
            
            <template v-slot:cell(action)="data">
              <i @click="$router.push('/edit-corporate/'+data.item.id)" class="ml-2 mr-2 text-info fas fa-pencil-alt link"></i>
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
import {mapActions, mapGetters} from 'vuex'
import MembersHeader from "../components/MembersHeader.vue";
export default {
  name: "CorportaeMembers",
  components: {
    Header,
    SecondaryHeader,
    MembersHeader,
  },
  computed: {
    ...mapGetters(['getCorporateMembers']),
    totalRows() {
      return this.members.length
    },
    memberList() {
      const items = this.members
      if(items) {
          return items.slice(
              (this.currentPage - 1) * this.perPage,
              this.currentPage * this.perPage
          )
      }
      return null
    }
  },
  async created() {
    if(!this.getCorporateMembers.length) {
      this.loading = true
      const resp = await this.fetchCorporateMembers()
      if(resp) {
        this.loading = false
      }
    }
    else {
      this.members = this.getCorporateMembers
    }
  },
  watch: {
    getCorporateMembers(val) {
      if(val && val.length) {
        this.members = this.getCorporateMembers
      }
    }
  },
  methods: {
    ...mapActions(["fetchCorporateMembers"])
  },
  data() {
    return {
      members: [],
      loading: false,
      filter: null,
      fields: [
        {
          key: 'corporateName',
          label: 'Company Name',
          sortable: true,
          sortByFormatted: true
        },
        {
          key: 'email',
          label: 'Contact Email',
          sortable: true,
          sortByFormatted: true
        },
        {
          key: 'phone',
          label: 'Contact Number',
          sortable: true,
          sortByFormatted: true
        },
        {
          key: 'discountValue',
          label: 'Discount Value',
          sortable: true,
          sortByFormatted: true
        },
        {
          key: 'discountType',
          label: 'Discount Type',
          sortable: true,
          sortByFormatted: true
        },
        {
          key: 'discountEndDate',
          label: 'Discount End Date',
          sortable: true,
          sortByFormatted: true
        },
        {
          key: 'action',
          label: 'Action'
        }
      ],
      currentPage: 1,
      perPage: 10,
      breadcrumb: [
          {
              text: 'Corporate Members',
              path: '/corporate-members',
              active: true
          }
      ],
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
