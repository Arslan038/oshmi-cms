<template>
  <div class="home">
    <Header title="Member"/>
    <SecondaryHeader msg="Welcome to Your Vue.js App"/>
    <b-container class="card bg-white pb-5 pt-2">
      <div class="search-area">
        <div class="mt-2 text-md-left d-md-flex d-block d-lg-flex">
          <div class="self-center text-left ml-md-4">
            <h6><b>Phone no:</b> </h6>
          </div>
          <div class="ml-3">
            <b-input class="roundeds" type="search" v-model="phone" required placeholder="Mobile phone no" />
          </div>
          <div class="ml-md-2">
            <b-button pill variant="danger" @click="searchMember" class="pr-4 pl-4"><i class="fas fa-search"></i></b-button>
            <b-button variant="outline-danger" @click="phone = null" pill class="ml-2">Clear</b-button>
          </div>
        </div>

        <hr>
      </div>

      <b-row v-if="searching && !member">
        <b-col cols="12" class="my-4">
          <b-spinner variant="purple"></b-spinner>
          <p>Searching Member...</p>
        </b-col>
      </b-row>

      <div class="member-details" v-if="!searching && member">
        <b-row>
          <b-col md="6" cols="12">
            <MemberInfo :member="member" />
            <hr>
            <MemberBookings :member="member" @updateMemberBooking="updatePaymentMethod" />
            
          </b-col>
          <b-col md="6" cols="12">
            <IPadInfo :member="member" @updateStatus="updateBookingStatus" />
          </b-col>
        </b-row>
      </div>
    </b-container>

    <b-container class="mt-4" >
      
      <b-row >
        <b-col md="6" class="pl-md-0 mb-5" cols="12">
          <Calendar />
        </b-col>
        <b-col class="pr-0 mb-5" md="6" cols="12">
          <UpcomingLessons :loading="loading" />
        </b-col>
      </b-row>
    </b-container>
    
  </div>
</template>

<script>
// @ is an alias to /src
import Header from '@/components/Header.vue'
import SecondaryHeader from '@/components/SecondaryHeader.vue'
import moment from 'moment'
import {mapActions, mapGetters} from 'vuex'
import MemberInfo from "@/components/Dashboard/MemberInfo.vue"
import MemberBookings from "@/components/Dashboard/MemberBookings.vue"
import IPadInfo from "@/components/Dashboard/IPadInfo.vue"
import Calendar from "@/components/Dashboard/Calendar.vue"
import UpcomingLessons from "@/components/Dashboard/UpcomingLessons.vue"

export default {
    name: 'Dashboard',
    components: {
      Header,
      SecondaryHeader,
      MemberInfo,
      MemberBookings,
      IPadInfo,
      Calendar,
      UpcomingLessons
    },
    async created() {
        this.loading = true
        await this.fetchLessons()
        this.loading = false
    },
    computed: {
      ...mapGetters(['getLessons', 'getSearchedMember']),
      lessons() {
        if(this.getLessons.length) {
          return this.getLessons.sort((a,b) => new Date(b.startDate) - new Date(a.startDate))
        }
        return []
      }
    },
    watch: {
      async getSearchedMember(val) {
        if(val) {
          if(val.Bookings.length) {
            val.Bookings = val.Bookings.sort((a,b) => new Date(a.createdAt) - new Date(b.createdAt))
          }
          this.member = val
        }
      }
    },
    methods: {
      ...mapActions(["fetchLessons", "searchByPhone"]),
      updatePaymentMethod(booking) {
        this.member.Bookings = this.member.Bookings.map(t => {
            if(t.id == booking.id) {
              t.paymentMethod = booking.paymentMethod
              return Object.assign({}, t, t)
            }
            return t
        })
      },
      updateBookingStatus(booking) {
        this.member.Bookings = this.member.Bookings.map(t => {
            if(t.id == booking.id) {
              t.status = booking.status
              return Object.assign({}, t, t)
            }
            return t
        })
      },
      async searchMember() {
        if(this.phone) {
          this.member = null
          this.selected_booking = null
          this.searching = true
          const resp = await this.searchByPhone(this.phone)
          this.searching = false
        }
        else {
          this.toast({title: "Search Member", message: "Please Enter Phone Number.", type: "warning"})
        }
      }
    },
    data(){
      return {
        phone: null,
        selected_booking: null,
        searching: false,
        loading: false,
        bookingsModal: false,
        member: null,
        showDate: new Date(),
        events: [],
        paymentMethod: false,
        selectedPaymentMethod: null,
        otherPayment: null,
      }
    }
}
</script>

<style>
.lesson-item {
  padding-bottom: 10px;
  border-bottom: 1px solid #ddd;
}
p {
  margin-bottom: 0 !important;
}


</style>
