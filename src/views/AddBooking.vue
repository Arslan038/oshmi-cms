<template>
    <div class="home">
        <Header msg="Welcome to Your Vue.js App" />
        <SecondaryHeader title="Book Lesson" :breadcrumb="breadcrumb" />
        <b-container class="card bg-white mt-2 pb-5 pt-2">
            <div v-if="new_member==false">
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
                            <option value="new_student">New student member</option>
                            <option value="existing_Student">Exisiting student member</option>
                            <option value="new_corporate">New corporate member</option>
                        </select>
                    </b-col>
                </b-row>
            </div>

            <ExisitingMember v-if="selected=='existing_Student' && type == 'student'" />
            <CorporateMember v-if="selected=='new_corporate' && type == 'student'" />
            <NewMember @go-back="toggleMember" v-if="selected=='new_student' && type == 'student'" @memberAdded="setLessonType" />
            <AddLessons @add-lesson="addLesson" v-if="type=='lessons'" class="mt-3" :booking="bookingData" />

            <!-- <div v-if="type=='student'">
                <b-row class="mt-3">
                    <b-col cols="12" class="text-right">
                        <div class="mt-3 d-flex">
                            <b-button variant="outline-danger" class="mr-2 ml-auto" pill>Next</b-button>
                            <b-button variant="outline-danger" pill>Cancel</b-button>
                        </div>
                    </b-col>
                </b-row>
            </div> -->
            <b-modal centered id="added" hide-footer>
                <h6 class="text-center">The booking(s) has been added successfully</h6>
                <div class="text-center mt-4">
                    <b-button pill class="pr-5 pl-5" variant="danger">
                        Yes
                    </b-button>
                    <b-button pill class="p20 ml-2" variant="danger">
                        Cancel
                    </b-button>
                </div>
            </b-modal>
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
            selected: null,
            new_member:false,
            type:'student',
            lesson_flag:false,
            memberBooking: {
                memberId: null,
                lessonIds: [],
                date: null,
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
    watch:{
        selected(){
            if(this.selected=='new_student'){
                // this.new_member=true
            }
        }
    },
    methods:{
        toggleMember(arg){
            // this.new_member=arg
            this.selected= null

        },
        addLesson(arg){
            // this.lesson_flag=arg
            this.$bvModal.show('added')
        },

        setLessonType() {
            this.type = 'lessons'
            this.bookingData = Object.assign({},this.memberBooking)
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
