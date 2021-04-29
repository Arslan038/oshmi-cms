<template>
  <div class="home">
    <Header msg="Welcome to Your Vue.js App" />
    <SecondaryHeader  title="Attendance" :breadcrumb="breadcrumb" />
    <b-container class="card bg-white mt-2 pb-5 pt-2">
      <CorporateHeader
        :create="false"
        reroute="/create-courses"
      />

      <b-row class="mt-4">
        <b-col md="3" class="text-left" cols="12">
            <h6><b>Select Lesson</b></h6>
        </b-col>
        <b-col md="7" cols="12">
            <multiselect v-model="lesson" :options="getLessons" :tagabled="true" :multiple="false" :close-on-select="true" :clear-on-select="false" :preserve-search="true" placeholder="Select Lesson" tag-placeholder="Select Lesson" :custom-label="lessonWithCourse" track-by="name" :preselect-first="false">
                <template slot="singleLabel" slot-scope="{ option }"><strong>{{ option.name }}</strong> from Course <strong>  {{ option.course.name }}</strong></template>
            </multiselect>
        </b-col>
      </b-row>

      <b-row v-if="loading">
          <b-col cols="12" class="text-center mt-3">
              <b-spinner variant="purple"></b-spinner>
              <p>Loading Attendance...</p>
          </b-col>
      </b-row>

      <div class="mt-4 text-md-left d-md-flex d-block d-lg-flex" v-if="!loading && lesson">
        <div class="self-center text-left">
          Search
        </div>
        <div class="ml-3">
          <input class="border-hids form-control col-md-12" v-model="filter" />
        </div>
        <div class="ml-2">
          <select class="form-control rounded" @change="filteredBookings">
            <option :value="null" selected disabled>--Select--</option>
            <option value="all">All</option>
            <option value="pending">Pending</option>
            <option value="checked in">Checked In</option>
            <option value="finished">Finished</option>
            <option value="absent">Absent</option>
            <option value="failed">Failed</option>
          </select>
        </div>
        <div class="ml-auto d-flex">
          <download-excel :data="export_attendance" :export-fields="export_fields" :header="export_attendance_header" name="Attendance" worksheet="Attendance">
              <b-button variant="success" class="mr-1" size="sm" pill>Attendance</b-button>    
          </download-excel>
          <download-excel :data="export_attendance" :export-fields="export_fields" :header="export_attendance_header" name="Attendance" worksheet="Attendance">
              <b-button variant="success" class="mr-1" size="sm" pill>Practice Checklist</b-button>    
          </download-excel>
          <download-excel :data="export_attendance" :export-fields="export_fields" :header="export_attendance_header" name="Attendance" worksheet="Attendance">
              <b-button variant="success" class="mr-1" size="sm" pill>Training Record</b-button>    
          </download-excel>
          <!-- <download-excel :data="export_attendance" :export-fields="export_fields" :header="export_attendance_header" name="Attendance" worksheet="Attendance">
                 
          </download-excel> -->
          <b-button variant="success" class="mr-1 py-0" size="sm" pill @click="getReceipts">Receipts</b-button> 
          <download-excel :data="export_attendance" :export-fields="export_fields" :header="export_attendance_header" name="Attendance" worksheet="Attendance">
              <b-button variant="success" class="mr-1" size="sm" pill>Card Data</b-button>    
          </download-excel>
        </div>
      </div>

      <b-row v-if="!loading && lesson && !bookings.length">
          <b-col cols="12" class="text-center mt-3">
              <h5 class="text-green">No Attendance Found</h5>
          </b-col>
      </b-row>

      <b-row v-if="downloading" class="mt-3">
        <b-col cols="12">
          <b-alert show variant="info">Downloading Receipts. Please wait...</b-alert>
        </b-col>
      </b-row>

      <div class="mt-3" v-if="!loading && bookings.length">
         <b-table bordered :responsive="true" :fields="fields" :filter="filter" :items="bookings" :current-page="currentPage" :per-page="rowsPerPage">
            <!-- Cells -->
            <template v-slot:cell(name)="data">
                <span class="smalls">{{data.item.IndividualMember.firstName}} {{data.item.IndividualMember.lastName}} </span>
            </template>
            <template v-slot:cell(phone)="data">
                <span class="smalls">{{data.item.IndividualMember.phone}}</span>
            </template>
            <template v-slot:cell(lesson_date)="data">
                <span class="smalls">{{getDate(data.item.Lesson.startDate)}}</span>
            </template>
            <template v-slot:cell(lesson_time)="data">
                <span class="smalls">{{data.item.Lesson.startTime}}</span>
            </template>
            <template v-slot:cell(payment_type)="data">
                <span class="smalls">{{data.item.bookedAs == 'corporate' ? 'Monthy' : 'Offline'}}</span>
            </template>
            <template v-slot:cell(receipt)="">
                <b-button size="sm" variant="outline-danger" class="rounds">
                  Download Receipt
                </b-button>
            </template>
            <template v-slot:cell(status)="data">
                <b-button @click="update(data.item)" v-if="data.item.status=='pending'" size="sm" variant="outline-info" class="rounds">
                  {{data.item.status}}
                </b-button>
                <b-button @click="update(data.item)" v-if="data.item.status=='checked in'" size="sm" variant="outline-primary" class="rounds">
                  {{data.item.status}}
                </b-button>
                <b-button @click="update(data.item)" v-if="data.item.status=='finished'" size="sm" variant="success" class="rounds">
                  {{data.item.status}}
                </b-button>
                <b-button @click="update(data.item)" v-if="data.item.status=='absent'" size="sm" variant="outline-warning" class="rounds">
                  {{data.item.status}}
                </b-button>
                <b-button @click="update(data.item)" v-if="data.item.status=='failed'" size="sm" variant="warning" class="rounds">
                  {{data.item.status}}
                </b-button>
            </template>
            <template v-slot:cell(action)="">
               <router-link to="/member-info"><i class="ml-2 mr-2 text-info fas fa-pencil-alt"></i></router-link> 
            </template>
        </b-table>

        <div class="float-right">
          <b-pagination
            v-model="currentPage"
            :total-rows="bookings.length"
            :per-page="rowsPerPage"
            class="my-0"
            pills
          ></b-pagination>
        </div>
      </div>
    </b-container>
    
    <!-- Update Booking -->

    <b-modal title="Update Status" v-model="updateModal" hide-footer>
      <b-form @submit.prevent v-if="bookingToEdit">
        <b-row>
          <b-col v-if="updating" cols="12">
            <b-alert variant="info" show>Please wait. We are Updating Status...</b-alert>
          </b-col>
          <b-col cols="12">
              <b-form-group>
                <label for="status"><strong>Select Status</strong></label>
                <b-form-select v-model="bookingToEdit.status" @change="updateStatus" required>
                  <b-form-select-option value="pending">Pending</b-form-select-option>
                  <b-form-select-option value="checked in">Checked In</b-form-select-option>
                  <b-form-select-option value="finished">Finished</b-form-select-option>
                  <b-form-select-option value="failed">Failed</b-form-select-option>
                  <b-form-select-option value="absent">Absent</b-form-select-option>
                </b-form-select>
              </b-form-group>
          </b-col>
        </b-row>
      </b-form>
    </b-modal>
  </div>
</template>

<script>
// @ is an alias to /src
import Header from "@/components/Header.vue";
import SecondaryHeader from "@/components/SecondaryHeader.vue";
import CorporateHeader from "../components/CorporateHeader.vue";
import {mapActions, mapGetters} from 'vuex'
import Multiselect from 'vue-multiselect';
export default {
  name: "Attendance",
  components: {
    Header,
    SecondaryHeader,
    CorporateHeader,
    Multiselect
  },
  computed: {
    ...mapGetters(['getLessons', 'getBookings']),
  },
  methods: {
    ...mapActions(["fetchLessons", "fetchBookings", "updateBooking", "generateReceipt"]),
    filteredBookings(e) {
      const type = e.target.value
      if(type === 'all') {
        this.bookings = this.getBookings.filter(booking => booking.Lesson.id == this.lesson.id)
      }
      if(type === 'pending') {
        this.bookings = this.getBookings.filter(booking => booking.Lesson.id == this.lesson.id && booking.status === 'pending')
      }
      if(type === 'checked in') {
        this.bookings = this.getBookings.filter(booking => booking.Lesson.id == this.lesson.id && booking.status === 'checked in')
      }
      if(type === 'finished') {
        this.bookings = this.getBookings.filter(booking => booking.Lesson.id == this.lesson.id && booking.status === 'finished')
      }
      if(type === 'absent') {
        this.bookings = this.getBookings.filter(booking => booking.Lesson.id == this.lesson.id && booking.status === 'absent')
      }
      if(type === 'failed') {
        this.bookings = this.getBookings.filter(booking => booking.Lesson.id == this.lesson.id && booking.status === 'failed')
      }
    },
    lessonWithCourse({ name, course }) {
      return `${name} — ${course.name}`
    },
    update(item) {
      this.bookingToEdit = Object.assign({}, item)
      this.updateModal = true
    },
    async updateStatus() {
      this.updating = true
      const resp = await this.updateBooking(this.bookingToEdit)
      this.updating = false
      if(resp == 1) {
        this.updateModal = false
      }
    },
    setAttendanceExport() {
      // Export Attendance Header
      this.export_attendance_header = []
      this.export_attendance_header.push(this.lesson.course.name)
      this.export_attendance_header.push("Attendance Sheet")
      this.export_attendance_header.push('Lesson Code: ' + this.lesson.lessonCode + Array(10).fill('\xa0').join('') + ' Date: ' + this.getDate(this.lesson.startDate))
      this.export_attendance_header.push('Lecturer: ' + this.lesson.tutors[0].name + Array(10).fill('\xa0').join('') + ' Time: ' + this.lesson.startTime + ' - ' + this.lesson.endTime)

      this.export_attendance = []
      if(this.bookings && this.bookings.length) {
        this.bookings.forEach((item,index) => {
          const obj = {
            no: index + 1,
            company: item.CorporateMember ? item.CorporateMember.corporateName : "",
            english_name: item.IndividualMember ? item.IndividualMember.lastName.toUpperCase() + ", " + item.IndividualMember.firstName : "",
            chinese_name: item.IndividualMember ? item.IndividualMember.chineseFirstName + " " + item.IndividualMember.chineseLastName : "",
            fee: item.bookingPrice,
            id_card: item.IndividualMember ? item.IndividualMember.idCard : "",
            dob: "",
            position: "",
            sign1: "",
            sign2: ""

          }
          // Export Attendance Data
          this.export_attendance.push(obj)
        })
      }
    },

    // Get All Receipts
    async getReceipts() {
      // console.log(this.bookings)
      const memberIds = Array.from(this.bookings, booking => booking.individualMemberId)
      const bookingIds = Array.from(this.bookings, booking => booking.id)

      const payload = {
        memberIds,
        bookingIds
      }

      this.downloading = true
      const resp = await this.generateReceipt(payload)
      if(resp && resp !== 0) {
        this.downloadFile(resp, "Individual Member Receipts")
      }
    },

    // Download Receipt
    downloadFile(link, name){
      this.downloading = true
      axios({
          method: 'get',
          url: link,
          responseType: 'arraybuffer'
      })
      .then(response => {  
        this.forceFileDownload(response, name)
      })
      .catch(() => console.log('error occured'))
    },
    forceFileDownload(response, name){
      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', name) //or any other extension
      document.body.appendChild(link)
      link.click()
      this.downloading = false
    },
  },
  created() {
    if(!this.getLessons.length) {
      this.fetchLessons()
    }
  },
  watch: {
    getBookings(val) {
      if(val) {
        this.bookings = val.filter(booking => booking.Lesson.id == this.lesson.id)
        this.setAttendanceExport()
      }
    },
    async lesson(val) {
      if(val) {
        this.loading = true
        await this.fetchBookings()
        this.loading = false
      }
    },
  },
  data() {
    return {
      loading: false,
      lesson: null,
      bookingToEdit: null,
      updateModal: false,
      updating: false,
      bookings: [],
      downloading: false,
      fields: [
        {
          key: "name",
          label: "Name",
          sortable: true,
          sortByFormatted: true,
        },
        {
          key: "phone",
          label: "Phone",
        },
        {
          key: "lesson_date",
          label: "Lesson Date",
          sortable: true,
          sortByFormatted: true,
        },
        {
          key: "lesson_time",
          label: "Lesson Time",
          sortable: true,
          sortByFormatted: true,
        },
        {
          key: "payment_type",
          label: "Payment Type",
          sortable: true,
          sortByFormatted: true,
        },
        {
          key: "status",
          label: "Status",
          sortable: true,
          sortByFormatted: true,
        },
        {
          key: "receipt",
          label: "Receipt",
        },
        {
          key: "action",
          label: "Action",
        }
      ],
      filter: null,
      currentPage: 1,
      perPage: 10,
      breadcrumb: [
        {
          text: 'Individual Attendance',
          active: true
        }
      ],
      export_fields: {
        "NO.": "no",
        "Company": "company",
        "Name": "english_name",
        "中文姓名": "chinese_name",
        "Position 職位": "position",
        "Signature 簽署 上午 am": "sign1",
        "Signature 簽署 上午 pm": "sign2",
        "Fee": "fee",
        "HKID Card no": "id_card",
        "Date of Birth": "dob"
      },
      export_attendance: [],
      export_attendance_header: []
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
