<template>
    <div>
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
                    <b-button size="sm" variant="danger" v-if="!selectedCorporate || selectedCorporate != data.item.id" @click="setCorporate(data.item.id)">Select</b-button>
                    <p class="text-purple" v-if="selectedCorporate && selectedCorporate == data.item.id"><strong><i class="fa fa-check"></i> Selected</strong></p>
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
            <b-row v-if="selectedCorporate" class="mt-3">
                <b-col cols="12" class="text-left">
                    <b-button variant="outline-danger" @click="next">Next</b-button>
                </b-col>
            </b-row>
        </div>

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
import {mapActions, mapGetters} from 'vuex'
export default {
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
    ...mapActions(["fetchCorporateMembers"]),
    setCorporate(id) {
        this.selectedCorporate = id
        // this.$emit('corporateSelected', id)
    },
    next() {
      this.$emit('corporateSelected', this.selectedCorporate)
    }
  },
  data() {
    return {
      members: [],
      selectedCorporate: null,
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
      perPage: 5,
      breadcrumb: [
          {
              text: 'Corporate Members',
              path: '/corporate-members',
              active: true
          }
      ],
    };
  },
}
</script>

<style>

</style>