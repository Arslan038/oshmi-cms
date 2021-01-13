<template>
  <div class="home">
    <Header msg="Welcome to Your Vue.js App" />
    <SecondaryHeader title="Members" :breadcrumb="breadcrumb" />
    <b-container class="card bg-white mt-2 pb-5 pt-2">
      <MembersHeader
        :create="true"
        addtext="Add"
        reroute="/add-individual-member"
      />
      <div class="mt-4 text-left text-primary">
        <h4 class="text-purple">Individual Members</h4>
      </div>

      <b-row v-if="loading">
        <b-col cols="12" class="text-center">
            <b-spinner variant="purple"></b-spinner>
            <p>Loading Individual Members...</p>
        </b-col>
      </b-row>

      <b-row v-if="!loading && !members.length">
        <b-col cols="12" class="text-center">
            <h5 class="text-purple">No Individual Member Found</h5>
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
         <b-table bordered :responsive="true" :fields="fields" :items="members" :current-page="currentPage" :per-page="rowsPerPage" :filter="filter">
            <!-- Cells -->
            <template v-slot:cell(licenses)="data">
              <span v-if="data.item.licenses && data.item.licenses.length" @click="openLicenseModal(data.item)" class="text-primary link">View Licenses</span>
              <span v-else>No License</span>
            </template>
            <template v-slot:cell(action)="data">
              <i class="ml-2 mr-2 text-info fas fa-pencil-alt link" @click="$router.push('/edit-individual-member/'+data.item.id)"></i>
            </template>
        </b-table>

        <div class="float-right">
          <b-pagination
            v-model="currentPage"
            :total-rows="totalRows"
            :per-page="rowsPerPage"
            class="my-0"
            pills
          ></b-pagination>
        </div>
      </div>
    </b-container>

    <b-modal title="Member Licenses" v-model="licenseModal" hide-footer>
      <b-row>
        <b-col cols="12" v-if="memberLicenses && memberLicenses.length">
          <b-table-simple responsive bordered dense>
            <b-thead>
              <b-th>Name</b-th>
              <b-th>Expiry Date</b-th>
            </b-thead>
            <b-tbody>
              <b-tr v-for="(license, index) in memberLicenses" :key="index">
                <b-td>{{license.name}}</b-td>
                <td>{{getDate(license.expiry)}}</td>
              </b-tr>
            </b-tbody>
          </b-table-simple>
        </b-col>
      </b-row>
    </b-modal>

  </div>
</template>

<script>
// @ is an alias to /src
import Header from "@/components/Header.vue";
import SecondaryHeader from "@/components/SecondaryHeader.vue";
import MembersHeader from "../components/MembersHeader.vue";
import {mapActions, mapGetters} from 'vuex'
export default {
  name: "Members",
  components: {
    Header,
    SecondaryHeader,
    MembersHeader,
  },
  computed: {
    ...mapGetters(['getIndividualMembers']),
    totalRows() {
      return this.members.length
    },
  },
  async created() {
    if(!this.getIndividualMembers.length) {
      this.loading = true
      const resp = await this.fetchIndividualMembers()
      if(resp) {
        this.loading = false
      }
    }
    else {
      this.members = this.getIndividualMembers
    }
  },
  watch: {
    getIndividualMembers(val) {
      if(val && val.length) {
        this.members = this.getIndividualMembers
      }
    }
  },
  methods: {
    ...mapActions(["fetchIndividualMembers"]),
    openLicenseModal(item) {
      if(typeof item.licenses == 'string') {
        this.memberLicenses = JSON.parse(item.licenses)
      }
      else {
        this.memberLicenses = item.licenses
      }
      this.licenseModal = true
    }
  },
  data() {
    return {
      filter: null,
      loading: false,
      members: [],
      memberLicenses: [],
      licenseModal: false,
      fields: [
        {
          key: "firstName",
          label: "First Name",
          sortable: true,
          sortByFormatted: true,
        },
        {
          key: "lastName",
          label: "Last Name",
          sortable: true,
          sortByFormatted: true,
        },
        {
          key: "phone",
          label: "Phone",
          sortable: true,
          sortByFormatted: true,
        },
        {
          key: "email",
          label: "Email",
          sortable: true,
          sortByFormatted: true,
        },
        {
          key: "licenses",
          label: "Licenses"
        },
        {
          key: "action",
          label: "Actions"
        }
      ],

      breadcrumb: [
          {
              text: 'Individual Members',
              path: '/members',
              active: true
          }
      ],
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
