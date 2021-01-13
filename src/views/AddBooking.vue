<template>
    <div class="home">
        <Header msg="Welcome to Your Vue.js App" />
        <SecondaryHeader title="Book Lesson" :breadcrumb="breadcrumb" />
        <b-container class="card bg-white mt-2 pb-5 pt-2">
            <b-row>
                <b-col cols="12" class="text-left">
                    <h4 class="text-purple mb-5 mt-3">New Booking</h4>
                </b-col>
            </b-row>
            <b-row class="mb-5">
                <b-col md="6" cols="12">
                    <b-button class="roundeds" @click="tab = 1" :variant="tab == 1 ? 'danger':'outline-danger'" block size="lg">Select Student Type</b-button>
                </b-col>
                <b-col md="6" cols="12" class="mt-md-0 mt-2">
                    <b-button class="roundeds" @click="tab = 2" :variant="tab == 2 ? 'danger':'outline-danger'" size="lg" block :disabled="tab == 1">Select Lessons</b-button>
                </b-col>
            </b-row>
            <b-row v-if="tab == 1">
                <b-col md="3" cols="12" class="text-left">
                    <h6 class="pt-2"><b>Select Student type</b></h6>
                </b-col>
                <b-col md="7" cols="12" class="text-left">
                    <b-form-select @change="setType" v-model="selected" class="roundeds">
                        <b-form-select-option :value="null">--Select Student Type--</b-form-select-option>
                        <b-form-select-option value="new_member">New Student</b-form-select-option>
                        <b-form-select-option value="existing_member">Exisiting Student</b-form-select-option>
                        <b-form-select-option value="corporate">Corporate</b-form-select-option>
                    </b-form-select>
                </b-col>
            </b-row>
            
            <!-- <div v-if="new_member==false">
                <div class="mt-2 text-left text-primary">
                    <h4 class="text-purple mb-5">New Booking</h4>
                </div>
                <b-row>
                    <b-col md="6" cols="12">
                        <b-button class="roundeds" @click="type='student'" :variant="type=='student' ? 'danger':'outline-danger'" block size="lg">Select Student Type</b-button>
                    </b-col>
                    <b-col md="6" cols="12" class="mt-md-0 mt-2">
                        <b-button class="roundeds" @click="type='lessons'" :variant="type=='lessons' ? 'danger':'outline-danger'" size="lg" block>Select Lessons</b-button>
                    </b-col>
                </b-row>

                <b-row class="mt-4" v-if="type=='student'">
                    <b-col md="4" cols="12">
                        <h6 class="pt-2"><b>Select Student type</b></h6>
                    </b-col>
                    <b-col md="6" cols="12">
                        <select v-model="selected" class="roundeds form-control">
                            <option :value="null">--Select Student Type--</option>
                            <option value="new_student">New Student</option>
                            <option value="existing_Student">Exisiting Student</option>
                            <option value="new_corporate">Corporate</option>
                        </select>
                    </b-col>
                </b-row>
            </div> -->

            <ExisitingMember v-if="tab == 1 && memberBooking.bookedAs=='individual member' && type == 'existing_member'" class="mt-3" @memberSelected="setExistingMember" />
            <CorporateMember v-if="tab == 1 && memberBooking.bookedAs=='corporate' && type == 'corporate'" class="mt-3" @corporateSelected="setCorporate" />
            <NewMember v-if="memberBooking.bookedAs=='individual member' && type == 'new_member' && tab == 1" @memberAdded="setLessonType" />
            <AddLessons v-if="tab == 2" class="mt-2" :booking="bookingData" />
        </b-container>
    </div>
</template>

<script>
// @ is an alias to /src
import Header from '@/components/Header.vue'
import SecondaryHeader from '@/components/SecondaryHeader.vue'
import ExisitingMember from '@/components/Bookings/ExisitingMember.vue'
import CorporateMember from '@/components/Bookings/CorporateMember.vue'
import NewMember from '@/components/Bookings/NewMember.vue'
import AddLessons from '@/components/Lessons/AddLessons.vue'
import CoursesHeader from '../components/CoursesHeader.vue'
import {mapGetters} from 'vuex'
export default {
    name: 'AddBooking',
    computed: {
        ...mapGetters(['getNewMember'])
    },
    components: {
        Header,
        SecondaryHeader,
        CoursesHeader,
        ExisitingMember,
        CorporateMember,
        NewMember,
        AddLessons
    },
    watch: {
        getNewMember(val) {
            if(val) {
                this.memberBooking.memberId = val.id
            }
        }
    },
    data(){
        return {
            tab: 1,
            selected: null,
            new_member:false,
            type:'student',
            lesson_flag:false,
            memberBooking: {
                memberId: null,
                corporateId: null,
                lessonId: null,
                date: null,
                bookedAs: null,
                bookedBy: 'admin',
                remarks: null
            },
            bookingData: null,
            breadcrumb: [
                {
                    text: 'Bookings',
                    path: '/bookings',
                    active: false
                },
                {
                    text: 'Add Booking',
                    active: true
                }
            ]
        }
    },
    methods:{
        setType(e) {
            const value = e
            if(value) {
                this.type = value
                this.memberBooking.memberId = null
                this.memberBooking.lessonId = null
                if(value == 'new_member' || value == 'existing_member') {
                    this.memberBooking.bookedAs = 'individual member'
                }
                if(value == 'corporate') {
                    this.memberBooking.bookedAs = 'corporate'
                }
            }
            else {
                this.memberBooking.memberId = null
                this.memberBooking.lessonId = null
                this.memberBooking.bookedAs = null
            }
        },
        setCorporate(id) {
            this.memberBooking.memberId = null
            this.memberBooking.corporateId = id
            this.bookingData = Object.assign({},this.memberBooking)
            this.tab = 2
        },
        toggleMember(arg){
            // this.new_member=arg
            this.selected= null

        },

        setExistingMember(id) {
            this.memberBooking.memberId = id
            this.bookingData = Object.assign({},this.memberBooking)
            this.tab = 2
        },

        setLessonType() {
            this.bookingData = Object.assign({},this.memberBooking)
            this.tab = 2
        },
    }
   
   }
</script>

<style  scoped>

.p20{
    padding-right: 29px;
    padding-left: 29px;
}
</style>
