<template>
    <div>
        <b-row>
            <b-col md="6" cols="6">
                <h6 class="text-muted text-left mt-md-0 mt-2"> <b>Ipad status</b> </h6>
                <h6 class="text-left mt-3"> <b>Display Candidate Info</b> </h6>
                <h6 class="text-left mt-3" v-if="selected_booking"> <b>Selected Booking</b> </h6>
                <h6 class="text-left mt-3" v-if="selected_booking"> <b>Booking Status</b> </h6>
                <h6 class="text-left mt-3"> <b>Photo and Signature Status</b> </h6>
            </b-col>
            <b-col class="text-md-right text-left mt-md-0 mt-2" md="6" cols="6">
                <h6 class="text-muted "> <b>Information Page</b> </h6>
                <b-button variant="info" pill @click="bookingsModal = !bookingsModal" v-if="member.Bookings.length && getPendingBookings">Display</b-button>
                <h6 class="text-muted mt-3" v-if="selected_booking">{{selected_booking.Lesson.name}} </h6>
                <h6 class="text-muted mt-3" v-if="selected_booking">{{selected_booking.status}} </h6>
            </b-col>
        </b-row>

        <b-row v-if="attendanceLoading" class="mt-3">
            <b-col cols="12" class="text-center">
                <b-spinner variant="purple"></b-spinner>
                <p>Loading Attendance</p>
            </b-col>
        </b-row>

        <div class="d-flex" v-if="selected_booking && !attendanceLoading">
            <div>
                <img v-if="!photoURL" src="/signature.PNG" alt="">
                <img v-if="signatureURL" class="rounded-image" :src="signatureURL" alt="Signature Image" width="180" height="150">
            </div>
            <div class="ml-3">
                <img v-if="!signatureURL" src="/signature.PNG" alt="">
                <img v-if="signatureURL" class="rounded-image" :src="signatureURL" alt="Signature Image" width="180" height="150">
            </div>
            <div style="align-self: flex-end;margin-bottom: 20px;margin-left: 10px;min-width:100px;">  
                <span class="text-info link" @click="fetchAttendance">Refresh <i class="fas fa-redo-alt"></i></span>
            </div>
        </div>

        <div class="d-flex" v-if="selected_booking && selected_booking.status === 'pending'">
            <b-button  class="pr62" variant="success" pill @click="updateBookingStatus" :disabled="updating">
              {{updating ? 'Updating Status...' : 'Confirm'}}
            </b-button>
            <b-button class="ml-3 pr-5 pl-5" variant="danger" pill>
              Cancel
            </b-button>
        </div>

        <!-- Select Booking For iPad -->

    <b-modal title="Select Booking" v-model="bookingsModal" hide-footer>
        <div v-if="member && member.Bookings">
            <div v-for="(item, index) in member.Bookings" :key="index">
                <b-row no-gutters>
                    <b-col cols="10" class="px-1">
                    <div>
                        <p class="text-left"> <b>{{item.Lesson.Course.name}}</b> </p>
                        <p class="text-left">{{item.Lesson.name}} </p>
                    </div>
                    </b-col>
                    <b-col cols="2" class="text-right align-self-center">
                    <b-button variant="success" size="sm" @click="selectBooking(item)">
                        <span v-if="selected_booking && selected_booking.id === item.id"> Selected</span>
                        <span v-else>Select</span>
                    </b-button>
                    </b-col>
                </b-row>
                <hr>
                </div>

                <b-row class="mt-3">
                    <b-col cols="12">
                        <b-button block variant="danger" class="roundeds" @click="displayInfoToIPad">Display Information</b-button>
                        <b-button block variant="outline-danger" @click="bookingsModal = !bookingsModal" class="roundeds mt-1">Cancel</b-button>
                    </b-col>
                </b-row>
            </div>
        </b-modal>
    </div>
</template>

<script>
    import { mapActions, mapGetters } from "vuex"
    import db from "../../../fb"
    export default {
        props: {
            member: {
                type: Object,
                default: null
            }
        },
        computed: {
            ...mapGetters(['getBookingAttendance']),
            getPendingBookings() {
                if(this.member && this.member.Bookings.length) {
                    const bookings = this.member.Bookings.filter(booking => booking.status === 'pending')
                    if(bookings.length) {
                        return true
                    }
                }
                return false
            },
        },
        data() {
            return {
                bookingsModal: false,
                selected_booking: null,
                updating: false,
                attendanceLoading: false,
                photoURL: null,
                signatureURL: null
            }
        },
        created () {
            this.photoURL = null
        },
        methods: {
            ...mapActions(['updateBooking']),
            selectBooking(item) {
                this.photoURL = null
                this.selected_booking = item
            },
            async updateBookingStatus() {
                if(this.selected_booking) {
                    let booking = Object.assign({}, this.selected_booking)
                    booking.status = 'checked in';
                    this.updating = true
                    const resp = await this.updateBooking(booking)
                    this.updating = false
                    if(resp == 1) {
                        this.selected_booking.status = 'checked in'
                        this.$emit('updateStatus', {
                            id: this.selected_booking.id,
                            status: 'checked in'
                        })
                    }
                }
            },

            displayInfoToIPad() {
                if(this.selected_booking) {
                    let memberData = Object.assign({}, this.member)
                    delete memberData.Bookings
                    const data = {
                        bookingId: this.selected_booking.id,
                        id: memberData.id,
                        name_ch: memberData.chineseLastName + " " + memberData.chineseFirstName,
                        name_en: memberData.lastName + " " + memberData.firstName,
                        mobile: memberData.phone,
                        hkid_number: memberData.idCard,
                        email: memberData.email
                    }

                    db.collection("appData").doc("tab0001").set(data).then(() => {
                        this.toast({message: "Information Sent Successfully.", title: "Display Information", type: "success"})
                    }).catch(err => {
                        this.toast({message: err.message, title: "Display Information", type: "danger"})
                    })
                }
                else {
                    this.toast({message: 'Please Select a Booking', title: "Display Information", type: "warning"})
                }
            },

            async fetchAttendance() {
                const id = this.selected_booking.id
                this.photoURL = null
                this.attendanceLoading = true
                const resp = await this.$store.dispatch('fetchAttendance', id)
                this.attendanceLoading = false

                if(resp === 1) {
                    console.log(this.getBookingAttendance)
                    this.photoURL = this.getBookingAttendance.photo
                    this.signatureURL = this.getBookingAttendance.signature
                }
            }
        },
    } 
</script>

<style scoped>
img {
    border-radius: 10px !important;
}
</style>