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
            <b-input class="roundeds" type="number" v-model="phone" required placeholder="Mobile phone no" />
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
            <h6 class="text-muted text-left"> <i class="text-success fa fa-user" aria-hidden="true"></i>
            <b class="pl-2">{{member.firstName}} {{member.lastName}}</b> </h6>
            <div class="d-md-flex d-lg-flex d-block">
              <div >
                <h6 class="text-muted"><i class="text-success fas fa-phone pr-2"></i>{{member.phone}}</h6> 
              </div>
              <div class=" ml-md-auto">
              <h6 class="text-muted">{{member.email}}</h6> 
              </div>

            </div>
            <hr>
            <div class="d-md-flex d-lg-flex d-block">
              <div>
                <h6 class="text-left"> <b>写点东西</b> </h6>
                <h6 class="text-left"> <b>Certified Worker of confined space</b> </h6>
              </div>
              <div class="ml-auto">
                <h6 class="text-left">12/11/2020</h6>
                <h6 class="text-left">120 Days</h6>
              </div>
            </div>

          </b-col>
          <b-col md="6" cols="12">
            <b-row >
              <b-col md="6" cols="12">
                <h6 class="text-muted text-left mt-md-0 mt-2"> <b>Booking Records</b> </h6>
                <h6 class="text-left"> <b>写点东西</b> </h6>
                <h6 class="text-left"> <b>Certified Worker of confined space</b> </h6>

              </b-col>
              <b-col class="text-md-right text-left mt-md-0 mt-2" md="6" cols="12">
                <h6 class="text-muted "> <b>Date</b> </h6>
                <h6>12/11/2020</h6>
                <h6 class="text-primary">Paid</h6>

              </b-col>
            </b-row>

        <hr>

        <b-row >
          <b-col md="6" cols="12">
            <h6 class="text-muted text-left mt-md-0 mt-2"> <b>Ipad status</b> </h6>
            <h6 class="text-left mt-3"> <b>1. Display Candidate Info</b> </h6>
            <h6 class="text-left mt-3"> <b>2. Signature Status</b> </h6>
            <h6 class="text-left mt-3"> <b>3. Photo Status</b> </h6>
            <div class="d-flex">
              <div>
                <img src="/signature.PNG" alt="">
              </div>
              <div style="align-self: flex-end;margin-bottom: 20px;margin-left: 10px;min-width:100px;">  
              <span>Refresh </span><i class="fas fa-redo-alt"></i>
              </div>
            </div>


          </b-col>
          <b-col class="text-md-right text-left mt-md-0 mt-2" md="6" cols="12">
            <h6 class="text-muted "> <b>Information Page</b> </h6>
            <b-button variant="info" pill>Display</b-button>
            <h6 class="text-muted mt-3">Pending </h6>

          </b-col>
        </b-row>

        <div class="d-flex">
            <b-button  class="pr62" variant="success" pill>
              Confirm
            </b-button>
            <b-button class="ml-3 pr-5 pl-5" variant="danger" pill>
              Cancel
            </b-button>
        </div>

        
          </b-col>
        </b-row>
      </div>
    </b-container>

    <b-container class="mt-4" >
      
      <b-row >
        <b-col md="6" class="pl-md-0 mb-5" cols="12">
          <b-card >
          	<FullCalendar :options="calendarOptions" />
          </b-card>
        </b-col>
        <b-col class="pr-0 mb-5" md="6" cols="12">
          <b-card>
            <div v-if="loading && !lessons.length">
              <b-row>
                <b-col cols="12" class="text-center">
                  <b-spinner variant="purple"></b-spinner>
                  <p>Loading Upcoming Lessons</p>
                </b-col>
              </b-row>
            </div>
            <div class="mt-3 lesson-item " v-for="(item, index) in lessons" :key="index">
              <div class="d-flex" :style="'padding-left:20px;border-left:2px solid #'+getColor()">
                <div>
                  <h6 class="mb-0">{{getSeparatedDate(item.startDate).day}}</h6>
                  <p style="font-size:10px;" class="mb-0 mt-0text-muted">{{getSeparatedDate(item.startDate).month}}</p>
                  <p style="font-size:10px;" class="mt-0 text-muted">{{getSeparatedDate(item.startDate).year}}</p>
                </div>
                <div class="ml-3 text-left">
                  <h6 class="mb-0 text-left"><b>{{item.name}}</b></h6>
                  <p style="font-size:12px;" class="mb-0 mt-0 text-left">{{item.course.name}}</p>
                  <p style="font-size:10px;"><i class="fas fa-map-marker"></i> {{item.course.address}}</p>
                </div>
              </div>
            </div>
          </b-card>
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
import FullCalendar from '@fullcalendar/vue'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
export default {
    name: 'Dashboard',    
    components: {
      Header,
      SecondaryHeader,
      FullCalendar 
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
          this.calendarOptions.events = []
          this.getLessons.forEach(item => {
            item.start = item.startDate
            item.end = item.endDate
            item.title = item.name

            this.calendarOptions.events.push(item)
          })
          return this.getLessons.sort((a,b) => new Date(a.startDate) - new Date(b.startDate))
        }
        return []
      }
    },
    watch: {
      getSearchedMember(val) {
        if(val) {
          this.member = val
          console.log(this.member)
        }
      }
    },
    methods: {
      ...mapActions(["fetchLessons", "searchByPhone"]),
      getColor() {
        return Math.floor(Math.random()*16777215).toString(16);
      },
      async searchMember() {
        if(this.phone) {
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
        searching: false,
        loading: false,
        member: null,
        calendarOptions: {
          plugins: [ dayGridPlugin, interactionPlugin ],
          initialView: 'dayGridMonth',
          events: [],
        }
      }
    }
}
</script>

<style>
.fc-time-grid-event{
  background:white !important;
  padding-left: 10px !important;
  border-color:white !important;
  border-left: 2px solid #117a8b !important;
  
}
.fc-day-grid-event{
  background:yellow !important;
  padding-left: 10px !important;
  border-color:white !important;
  border-left: 2px solid #117a8b !important;
  
}
.fc-event{
  background: #A37BE5 !important;
  color:white !important;
}

.lesson-item {
  padding-bottom: 10px;
  border-bottom: 1px solid #ddd;
}

</style>
