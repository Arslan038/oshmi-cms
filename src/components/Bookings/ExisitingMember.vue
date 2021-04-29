<template>
    <div>
        <b-row v-if="loading">
            <b-col cols="12" class="text-center">
                <b-spinner variant="purple"></b-spinner>
                <p>Loading Individual Members...</p>
            </b-col>
      </b-row>

      <b-row v-if="!loading && !members.length">
        <b-col cols="12" class="text-center">
            <h5 class="text-green">No Individual Member Found</h5>
        </b-col>
      </b-row>

      <div class="mt-2 text-md-left d-flex" v-if="!loading && members.length">
        <div class="self-center">
          Search
        </div>
        <div class="ml-3">
          <input class="border-hids form-control col-md-12" type="search" v-model="filter" />
        </div>
      </div>

      <div class="mt-3" v-if="!loading && members.length">
         <b-table bordered :responsive="true" :fields="fields" striped  :items="memberList" :filter="filter">
            <!-- Cells -->
            <template v-slot:cell(licenses)="data">
              <span v-if="data.item.licenses && data.item.licenses.length" @click="openLicenseModal(data.item)" class="text-primary link">View Licenses</span>
              <span v-else>No License</span>
            </template>
            <template v-slot:cell(action)="data">
              <b-button variant="danger" size="sm" v-if="!selectedMember || selectedMember != data.item.id" @click="selectMember(data.item.id)">Select</b-button>
              <p class="text-green" v-if="selectedMember && selectedMember == data.item.id"><strong><i class="fa fa-check"></i> Selected</strong></p>
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

        <b-row v-if="selectedMember" class="mt-3">
          <b-col cols="12" class="text-left">
              <b-button variant="outline-danger" @click="next">Next</b-button>
          </b-col>
      </b-row>
    </div>

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
import {mapActions, mapGetters} from 'vuex'
export default {
    computed: {
    ...mapGetters(['getIndividualMembers']),
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
    },
    selectMember(id) {
        this.selectedMember = id
        // this.$emit('memberSelected', id)
    },
    next() {
      this.$emit('memberSelected', this.selectedMember)
    }
  },
  data() {
    return {
      filter: null,
      loading: false,
      members: [],
      selectedMember: null,
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
      perPage: 5,
    };
  },
}
</script>

<style>

</style>