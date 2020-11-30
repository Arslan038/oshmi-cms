<template>
    <div class="home">
        <Header msg="Welcome to Your Vue.js App" />
        <SecondaryHeader msg="Welcome to Your Vue.js App" />
        <b-container class="card bg-white mt-2 pb-5 pt-2">
            <div v-if="new_member==false">
                <div class="mt-2 text-left text-primary">
                    <h4 class="text-purple">Add Booking</h4>
                </div>
                <b-row>
                    <b-col md="6" cols="12">
                        <b-button class="roundeds" @click="type='student'" :variant="type=='student' ? 'danger':'outline-danger'" block size="lg">Select Type</b-button>
                    </b-col>
                    <b-col md="6" cols="12" class="mt-md-0 mt-2">
                        <b-button class="roundeds" @click="type='lessons'" :variant="type=='lessons' ? 'danger':'outline-danger'" size="lg" block>Select Lessons</b-button>
                    </b-col>
                </b-row>

                <b-row class="mt-3" v-if="type=='student'">
                    <b-col md="4" cols="12">
                        <h6><b>Select Student type</b></h6>
                    </b-col>
                    <b-col md="6" cols="12">
                        <select v-model="selected" class="roundeds form-control">
                            <option value="new_student">New student member</option>
                            <option value="existing_Student">Exisiting student member</option>
                            <option value="new_corporate">New corporate member</option>
                        </select>
                    </b-col>
                </b-row>
            </div>

            <ExisitingMember v-if="selected=='existing_Student'" />
            <CorporateMember v-if="selected=='new_corporate'" />
            <NewMember @go-back="toggleMember" v-if="selected=='new_student' && new_member==true" />
            <AddLessons @add-lesson="addLesson" v-if="type=='lessons'" class="mt-3" />

            <div v-if="new_member==false && type=='student'">
                <b-row class="mt-3">
                    <b-col class="text-md-left">
                        <div>
                            <b-button variant="outline-danger" pill>Next</b-button>
                        </div>
                        <div class="mt-3">
                            <b-button variant="outline-danger" pill>Cancel</b-button>
                        </div>
                    </b-col>
                </b-row>
            </div>
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
export default {
    name: 'Orders',
    components: {
        Header,
        SecondaryHeader,
        CoursesHeader,
        ExisitingMember,
        CorporateMember,
        NewMember,
        AddLessons
    },
    data(){
        return {
            selected:'',
            new_member:false,
            type:'student',
            lesson_flag:false,
        }
    },
    watch:{
        selected(){
            if(this.selected=='new_student'){
                this.new_member=true
            }
        }
    },
    methods:{
        toggleMember(arg){
            this.new_member=arg
            this.selected=''

        },
        addLesson(arg){
            // this.lesson_flag=arg
            this.$bvModal.show('added')
        }
    }
   
   }
</script>

<style  scoped>

.p20{
    padding-right: 29px;
    padding-left: 29px;
}
</style>
