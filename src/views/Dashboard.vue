<template>
  <div class="home">
    <Header title="Member"/>
    <SecondaryHeader msg="Welcome to Your Vue.js App"/>
    <b-container class="card bg-white mt-2 pb-5 pt-2">
       <div class="mt-2 text-md-left d-md-flex d-block d-lg-flex">
        
        <div class="self-center text-left ml-md-4">
          <h6><b>Phone no:</b> </h6> 
        </div>
        <div class="ml-3">
          <b-input class="roundeds " placeholder="Mobile phone no" />
        </div>
        <div class="ml-md-2">
          <b-button pill variant="danger" class="pr-4 pl-4"><i class="fas fa-search"></i></b-button>
          <b-button variant="outline-danger" pill class="ml-2">Clear</b-button>
        </div>
       
      </div>

      <hr>

      <b-row>
        <b-col md="6" cols="12">
          <h6 class="text-muted text-left"> <i class="text-success fa fa-phone" aria-hidden="true"></i>
 <b>Jennifer Lawrence</b> </h6>
          <div class="d-md-flex d-lg-flex d-block">
            <div >
              <i class="fas fa-phone-alt"></i>
             <h6 class="text-muted"><i class="text-success fas fa-phone-alt"></i>852527</h6> 
            </div>
            <div class=" ml-md-auto">
             <h6 class="text-muted">UBIDSH(2)</h6> 
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
          <h6 class="text-left"> <b>1. Display Candidate Info</b> </h6>
          <h6 class="text-left"> <b>2. Signature Status</b> </h6>
          <h6 class="text-left"> <b>3. Photo Status</b> </h6>
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




  
    </b-container>

    <b-container class="mt-4" >
      
      <b-row >
        <b-col md="6" class="pl-md-0 mb-5" cols="12">
          <b-card >
          	<full-calendar :config="config" :events="events"/>
          </b-card>


        </b-col>
        <b-col class="pr-0 mb-5" md="6" cols="12">
          <b-card>

            <div class="d-flex mt-4 " style="padding-left:20px;border-left:2px solid #117a8b">
            <div>
              <h6 class="mb-0">11</h6>
              <p style="font-size:10px;" class="mb-0 mt-0text-muted">Dec</p>
              <p style="font-size:10px;" class="mt-0 text-muted">2017</p>
            </div>
            <div class="ml-3 text-left">
              <h6 class="mb-0 text-left"><b>Conference</b></h6>
              <p style="font-size:12px;" class="mb-0 mt-0 text-left">Mobile World Convefers</p>
              <p style="font-size:10px;"><i class="fas fa-map-marker"></i> Pilgrim Avenue,North MD 2012828</p>
            </div>

          </div>


           <div class="d-flex mt-2 " style="padding-left:20px;border-left:2px solid #117a8b">
            <div>
              <h6 class="mb-0">11</h6>
              <p style="font-size:10px;" class="mb-0 mt-0text-muted">Dec</p>
              <p style="font-size:10px;" class="mt-0 text-muted">2017</p>
            </div>
            <div class="ml-3 text-left">
              <h6 class="mb-0 text-left"><b>Conference</b></h6>
              <p style="font-size:12px;" class="mb-0 mt-0 text-left">Mobile World Convefers</p>
              <p style="font-size:10px;"><i class="fas fa-map-marker"></i> Pilgrim Avenue,North MD 2012828</p>
            </div>
           </div>

            <hr>

            <div class="d-flex mt-2 " style="padding-left:20px;border-left:2px solid red">
            <div>
              <h6 class="mb-0">09</h6>
              <p style="font-size:10px;" class="mb-0 mt-0text-muted">Dec</p>
              <p style="font-size:10px;" class="mt-0 text-muted">2017</p>
            </div>
            <div class="ml-3 text-left">
              <h6 class="mb-0 text-left"><b>Repeating Event</b></h6>
              <p style="font-size:12px;" class="mb-0 mt-0 text-left">Mobile World Convefers</p>
              <p style="font-size:10px;"><i class="fas fa-map-marker"></i> Pilgrim Avenue,North MD 2012828</p>
            </div>
            </div>

            <hr>
            <div class="d-flex mt-2 " style="padding-left:20px;border-left:2px solid #28a745">
            <div>
              <h6 class="mb-0">11</h6>
              <p style="font-size:10px;" class="mb-0 mt-0text-muted">Dec</p>
              <p style="font-size:10px;" class="mt-0 text-muted">2017</p>
            </div>
            <div class="ml-3 text-left">
              <h6 class="mb-0 text-left"><b>Conference</b></h6>
              <p style="font-size:12px;" class="mb-0 mt-0 text-left">Mobile World Convefers</p>
              <p style="font-size:10px;"><i class="fas fa-map-marker"></i> Pilgrim Avenue,North MD 2012828</p>
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

export default {
    name: 'Dashboard',    
    components: {
        Header,
        SecondaryHeader
    },
    data(){
      return {
        events: [
        
          {
            title: 'test2',
            start  : '2020-11-27T06:30:00',
            end: '2020-11-27T07:30:00',
          },
        ],
        config: {
          eventRender: function(event, element) {
            console.log(event)
          }
        },
      }
    }
}
</script>

<style >
.fc-time-grid-event{
  background:white !important;
  padding-left: 10px !important;
  border-color:white !important;
  border-left: 2px solid #117a8b !important;
  
}
.fc-day-grid-event{
  background:white !important;
  padding-left: 10px !important;
  border-color:white !important;
  border-left: 2px solid #117a8b !important;
  
}
.fc-content{
  color:black !important;
}

</style>
