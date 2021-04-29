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
        <h4 class="text-green">Corporate Members</h4>
      </div>

      <b-row v-if="loading">
        <b-col cols="12" class="text-center">
            <b-spinner variant="purple"></b-spinner>
            <p>Loading Corporate Members...</p>
        </b-col>
      </b-row>

      <b-row v-if="!loading && !members.length">
        <b-col cols="12" class="text-center">
            <h5 class="text-green">No Corporate Member Found</h5>
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
         <b-table :responsive="true" :fields="fields" bordered :items="members" :current-page="currentPage" :per-page="rowsPerPage" :filter="filter">
           
            <!-- Cells -->
          
            <template v-slot:cell(discountValue)="data">
                <span class="smalls">-{{data.item.discountValue}} HKD</span>
            </template>
            <template v-slot:cell(discountEndDate)="data">
                <span class="smalls" v-if="data.item.discountEndDate">{{getDate(data.item.discountEndDate)}}</span>
            </template>
            <template v-slot:cell(balance)="data">
                <strong v-if="data.item.bookings && data.item.bookings.length > 0" @click="openSettleModal(data.item)" class="link text-green">{{calculateBalance(data.item.bookings)}}</strong>
                <span v-else>0 HKD</span>
            </template>
            
            <template v-slot:cell(action)="data">
              <i @click="$router.push('/edit-corporate/'+data.item.id)" class="ml-2 mr-2 text-info fas fa-pencil-alt link"></i>
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
    <b-modal title="Settle Payment" v-model="settleModal" hide-footer>
      <b-table-simple v-if="settleData">
        <b-thead>
          <b-th class="select-width">Select</b-th>
          <b-th>Month</b-th>
          <b-th>Amount</b-th>
        </b-thead>
        <b-tbody>
          <b-tr v-for="(payment, index) in settleData.bookings" :key="index">
            <b-td class="select-width">
              <b-form-checkbox @change="setItemsToSettle(payment, $event)" :checked="getItemToSettle(payment)"></b-form-checkbox>
            </b-td>
            <b-td>
              <span>{{payment.month}} - {{payment.year}}</span>
            </b-td>
            <b-td>
              <span>{{payment.price}} HKD</span>
            </b-td>
          </b-tr>
        </b-tbody>
      </b-table-simple>
      <b-row>
        <b-col cols="12" class="text-center">
          <p><strong>Total Sum: <span class="text-green">{{totalPrice}} HKD</span></strong></p>
          <b-button variant="danger mt-3" v-if="itemsToSettle.data.length" @click="settlePaymentNow" :disabled="settleLoading">{{settleLoading ? 'Please wait...' : 'Settle Payment'}}</b-button>
        </b-col>
      </b-row>
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
  },
  async created() {
    await this.init()
  },
  watch: {
    getCorporateMembers(val) {
      if(val && val.length) {
        this.setMembersData()
        // this.members = this.getCorporateMembers
      }
    }
  },
  methods: {
    ...mapActions(["fetchCorporateMembers", "settleCorporatePayment"]),
    async setMembersData() {
      if(this.getCorporateMembers.length) {
        this.members = []
        
        await this.getCorporateMembers.forEach(member => {
          if(member.bookings && member.bookings.length > 0) {
            let combinedBookings = []
            member.bookings.forEach(item => {
              let booking = combinedBookings.find(b => b.month == item.month && b.year == item.year)
              if(booking) {
                booking.price = Number(booking.price) + Number(item.price)
              }
              else {
                combinedBookings.push(item)
              }
              member.bookings = combinedBookings
            })
          }
          this.members.push(member)
        })
      }
    },
    openSettleModal(data) {
      this.itemsToSettle.corporateId = data.id
      this.itemsToSettle.data = []
      this.settleData = Object.assign({}, data)
      this.settleModal = true
    },
    async setItemsToSettle(item, e) {
      if(e) {
        this.itemsToSettle.data.push(item)
      }
      else {
        this.itemsToSettle.data = await this.itemsToSettle.data.filter(data => data.month != item.month && data.year != item.year)
      }
      this.totalPrice = 0
      await this.itemsToSettle.data.forEach(data => {
        this.totalPrice = Number(this.totalPrice) + Number(data.price)
      })
      console.log(this.totalPrice)
    },
    getItemToSettle(item) {
      const isItemExists = this.itemsToSettle.data.find(data => data.month == item.month && data.year == item.year)
      if(isItemExists) {
        return true
      }
      return false
    },
    calculateBalance(bookings) {
      let balance = 0;
      if(bookings.length) {
        bookings.forEach(item => {
          balance = balance + item.price
        })
      }
      return balance + " HKD"
    },

    async settlePaymentNow() {
      let payload = Object.assign({}, this.itemsToSettle)
      payload.dates = payload.data
      delete payload.data

      this.settleLoading = true
      const resp = await this.settleCorporatePayment(payload)
      this.settleLoading = false
      if(resp == 1) {
        this.settleModal = false
        this.init()
      }
    },

    async init() {
      this.loading = true
      await this.fetchCorporateMembers()
      this.loading = false
    }
  },
  data() {
    return {
      settleLoading: false,
      members: [],
      loading: false,
      settleModal: false,
      totalPrice: 0,
      itemsToSettle: {
        corporateId: null,
        data: []
      },
      filter: null,
      settleData: null,
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
          key: 'balance',
          label: 'Outstanding Balance',
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
.select-width {
  width: 70px !important;
  max-width: 70px !important;
}
</style>
