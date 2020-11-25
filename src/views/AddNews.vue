<template>
 <div class="home">
    <Header msg="Welcome to Your Vue.js App" />
    <SecondaryHeader msg="Welcome to Your Vue.js App" />
    <b-container class="card bg-white mt-2 pb-5 pt-2">
       
       
        <b-row class="mt-2">
            <b-col md="3" class="text-left" cols="12">
                <h6><b>Published Date</b></h6>
            </b-col>
            <b-col md="3" cols="12">
                <b-input placeholder="Type here" class="roundeds"></b-input>
            </b-col>
        </b-row>
        <b-row class="mt-2">
            <b-col md="3" class="text-left" cols="12">
                <h6><b>Title</b></h6>
            </b-col>
            <b-col md="7" cols="12">
                <b-input placeholder="Type here" class="roundeds"></b-input>
            </b-col>
        </b-row>
        <b-row class="mt-3">
            <b-col md="3" class="text-left" cols="12">
                <h6><b>Image.</b></h6>
            </b-col>
            <b-col md="7" cols="12">
                <input type="file" class="form-control roundeds"/>
               
            </b-col>
        </b-row>
        <b-row class="mt-3">
            <b-col md="3" class="text-left" cols="12">
                <h6><b>Full News</b></h6>
            </b-col>
            <b-col md="7" cols="12" class="text-left">
                <b-textarea rows="10" placeholder="Type here">

                </b-textarea>
            </b-col>
        </b-row>

         <b-row class="mt-2">
            <b-col md="3" class="text-left" cols="12">
                <h6><b>Video link</b></h6>
            </b-col>
            <b-col md="7" cols="12">
                <b-input placeholder="http://www.domain.com" class="roundeds"></b-input>
                <div class="d-flex">
                    <b-button pill variant="outline-secondary ml-2" class="d-block mt-md-2 mt-md-2 pr-5 pl-5" >Save</b-button>
                    <b-button pill variant="outline-secondary ml-2" class="d-block mt-md-2 mt-md-2 pr-5 pl-5" >Cancel</b-button>
                </div>
            </b-col>
        </b-row>
      
     

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