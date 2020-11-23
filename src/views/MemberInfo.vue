<template>
 <div class="home">
    <Header msg="Welcome to Your Vue.js App" />
    <SecondaryHeader msg="Welcome to Your Vue.js App" />
    <b-container class="card bg-white mt-2 pb-5 pt-2">
        <div class="mt-2 text-left text-primary">
            <h4 class="text-purple">Member Info</h4>
        </div>
        <b-row class="mt-2">
            <b-col md="3" class="text-left" cols="12">
                <h6><b>Member</b></h6>
            </b-col>
            <b-col md="7" cols="12">
                <h6 class="text-muted text-left"> <b>38283232</b> </h6>
            </b-col>
        </b-row>
        <b-row class="mt-2">
            <b-col md="3" class="text-left" cols="12">
                <h6><b>Last Name</b></h6>
            </b-col>
            <b-col md="7" cols="12">
                <b-input placeholder="Tai Man" class="roundeds"></b-input>
            </b-col>
        </b-row>
        <b-row class="mt-2">
            <b-col md="3" class="text-left" cols="12">
                <h6><b>First Name</b></h6>
            </b-col>
            <b-col md="7" cols="12">
                <b-input placeholder="Chan" class="roundeds"></b-input>
            </b-col>
        </b-row>
        <b-row class="mt-2">
            <b-col md="3" class="text-left" cols="12">
                <h6><b>Mobile Phone No..</b></h6>
            </b-col>
            <b-col md="7" cols="12">
                <b-input placeholder="Mobile Phone No." class="roundeds"></b-input>
            </b-col>
        </b-row>
        <b-row class="mt-2">
            <b-col md="3" class="text-left" cols="12">
                <h6><b>Existing License.</b></h6>
            </b-col>
            <b-col md="3" cols="12" class="text-left">
                <select placeholder="e.g Tai Chan Man" class="form-control roundeds">
                    <option value="" selected disabled>-- select --</option>
                </select>
                <b-button size="sm" variant="danger" pill class="mt-1 pr-5 pl-5">Add</b-button>
            </b-col>
             <b-col md="2" class="text-left mt-md-0 mt-2" cols="12">
                <h6><b>License Expiry Date License.</b></h6>
            </b-col>
            <b-col md="2" cols="12">
                <b-input type="date" class="roundeds"></b-input>
            </b-col>
        </b-row>
        <b-row class="mt-2">
           
        </b-row>

         <b-row class="mt-2">
            <b-col md="3" class="text-left" cols="12">
                <h6><b>Email..</b></h6>
            </b-col>
            <b-col md="7" cols="12">
                <b-input placeholder="email address" class="roundeds"></b-input>
            </b-col>
        </b-row>
         <b-row class="mt-2">
            <b-col md="3" class="text-left" cols="12">
                <h6><b>ID Card No.</b></h6>
            </b-col>
            <b-col md="7" cols="12">
                <b-input placeholder="e.g z813xxx(3)" class="roundeds"></b-input>
            </b-col>
        </b-row>
     
        <div class="text-md-left">
            <b-button pill variant="danger" class="d-block pr62" size="lg">Add</b-button>
            <b-button pill variant="outline-secondary" @click="$emit('go-back',false)" class="d-block mt-md-2 mt-2 pr-5 pl-5" size="lg">Cancel</b-button>
        </div>

    </b-container>

        
    </div>
</template>

<script>
import Header from "@/components/Header.vue";
import SecondaryHeader from "@/components/SecondaryHeader.vue";

import MembersHeader from "../components/MembersHeader.vue";
export default {
  name: "Orders",
  components: {
    Header,
    SecondaryHeader,
    MembersHeader,
  },
}
</script>

<style>
.pr62{
    padding-right:62px !important;
    padding-left:62px !important;
}
</style>