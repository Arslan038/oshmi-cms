<template>
 <div class="home">
    <Header msg="Welcome to Your Vue.js App" />
    <SecondaryHeader msg="Welcome to Your Vue.js App" />
    <b-container class="card bg-white mt-2 pb-5 pt-2">
     
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
                <h6><b>Full text</b></h6>
            </b-col>
            <b-col md="7" cols="12" class="text-left">
                <b-textarea rows="10" placeholder="Type here">

                </b-textarea>
            </b-col>
        </b-row>

         <b-row class="mt-2">
            <b-col md="3" class="text-left" cols="12">
                <h6><b>URL link</b></h6>
            </b-col>
            <b-col md="7" cols="12">
                <b-input placeholder="http://www.domain.com" class="roundeds"></b-input>
               
            </b-col>
        </b-row>
        <b-row class="mt-2">
            <b-col md="3" class="text-left" cols="12">
                <h6><b>Schedule</b></h6>
            </b-col>
            <b-col md="4" cols="12">
                <div class="d-flex">
                    <b-input type="date" style="border-bottom-left-radius:1.25rem;border-top-left-radius:1.25rem;border-top-right-radius:0px!important;border-bottom-right-radius:0px!important"></b-input>
                    <b-input type="time" style="border-bottom-right-radius:1.25rem;border-top-right-radius:1.25rem;border-top-left-radius:0px!important;border-bottom-left-radius:0px!important"></b-input>
                </div>
                <div class="d-flex mt-3">
                    <b-button v-b-modal.delact  pill variant="outline-secondary ml-2" class="d-block mt-md-2 mt-md-2 pr-5 pl-5" >Save</b-button>
                    <b-button pill variant="outline-secondary ml-2" class="d-block mt-md-2 mt-md-2 pr-5 pl-5" >Cancel</b-button>
                </div>
            </b-col>
        </b-row>
     <b-modal id="delact" hide-footer centered>
      <b-container class="text-center">
        <p> <b>The message has been sent successfully</b> </p>

        <div class="mt-5">
          <b-button size="lg" class="pr62" variant="danger" pill>
             Yes
          </b-button>
          <b-button class="ml-3 pr-5 pl-5" size="lg"  variant="danger" pill>
             Cancel
          </b-button>
        </div>
      </b-container>

    </b-modal>
  
     

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