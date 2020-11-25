<template>
    <div class="home">
        <Header msg="Welcome to Your Vue.js App" />
        <SecondaryHeader msg="Welcome to Your Vue.js App" />
        <b-container class="card bg-white mt-2 pb-5 pt-2">
            <b-row>
                <b-col class="mt-2 text-left text-primary">
                    <h4 class="text-purple">Corporate Info</h4>
                </b-col>
            </b-row>

            <b-row class="mt-3">
                <b-col md="2" class="text-left">
                    <b>Corporate name</b>
                </b-col>
                <b-col md="10" class="text-left">
                    <input placeholder="Name" class="rounded form-control col-md-12" />
                </b-col>
            </b-row>
             <b-row class="mt-3">
                <b-col md="2" class="text-left">
                    <b>Contact Person</b>
                </b-col>
                <b-col md="10" class="text-left">
                    <input placeholder="Contact Person" class="rounded form-control col-md-12" />
                </b-col>
            </b-row>

            <b-row class="mt-2">
                <b-col md="2" class="text-left">
                    <b>Contact Number</b>
                </b-col>
                <b-col md="10" class="text-left">
                    <input placeholder="Contact Number" class="rounded form-control col-md-12" />

                </b-col>
            </b-row>

           

            <b-row class="mt-2">
                <b-col md="2" class="text-left">
                    <b>Email</b>
                </b-col>
                <b-col md="10" class="text-left">
                    <input placeholder="email address" class="rounded form-control col-md-12" />
                </b-col>
            </b-row>

            <b-row class="mt-2">
                <b-col md="2" class="text-left">
                    <b>Address</b>
                </b-col>
                <b-col md="10" class="text-left">
                    <input placeholder="address" class="rounded form-control col-md-12" />
                </b-col>
            </b-row>
              <b-row class="mt-2">
                <b-col md="2" class="text-left">
                    <b>Login name</b>
                </b-col>
                <b-col md="10" class="text-left">
                    <input placeholder="name" class="rounded form-control col-md-12" />
                </b-col>
            </b-row>
            <b-row class="mt-2">
                <b-col md="2" class="text-left">
                    <b>Login password</b>
                </b-col>
                <b-col md="10" class="text-left">
                    <input placeholder="password" type="password" class="rounded form-control col-md-12" />
                </b-col>
            </b-row>
            <b-row class="mt-2">
                <b-col md="2" cols="12" class="text-left">
                    <b>Discount Type</b>
                </b-col>
                <b-col cols="12" md="5" class="text-left">
                    <div class="d-flex">
                        <b-form-radio v-model="selected" name="some-radios" value="A"></b-form-radio>
                        <b>HKD_______Discount per enrollment</b>
                    </div>
                    <div class="d-flex">
                        <b-form-radio v-model="selected" name="some-radios" value="A"></b-form-radio>
                        <b>HKD_______Discount per course</b>
                    </div>
                    <div class="mt-3">
                    <select placeholder="e.g 20" class="rounded form-control col-md-12" >
                        <option value="" selected disabled>-- Select Course--</option>
                    </select>
                    <b-button variant="danger" class="pr-4 pl-4 mt-2" size="sm" pill>Add</b-button>


                    </div>
                </b-col>
            </b-row>

           
            <b-row class="mt-3">
                <b-col md="2" class="text-left">
                    <b>End Date of Discount</b>
                </b-col>
                <b-col  md="1" cols="12" class="text-muted text-left">
                    <b>Start</b>
                </b-col>
                <b-col md="2" cols="12" class="text-left">
                    <input type="time" class="rounded form-control col-md-12" />
                </b-col>
                <b-col md="1" class="text-left text-muted">
                    <b>End</b>
                </b-col>
                <b-col md="2" cols="12" class="text-left">
                    <input type="time" class="rounded form-control col-md-12" />
                </b-col>
            </b-row>

            <b-row class="mt-4">
                <b-col class="text-left" md="2" cols="12">
                    <h6><b>File</b></h6>
                </b-col>
                <b-col md="8" cols="12" class="text-left">
                    <a-upload-dragger name="file" :multiple="true">
                        <p class="ant-upload-drag-icon">
                            <a-icon type="inbox" />
                        </p>
                        <p class="ant-upload-text">
                            Click or drag file to this area to upload
                        </p>
                        <p class="ant-upload-hint"></p>
                    </a-upload-dragger>
                </b-col>
            </b-row>
             <div>
                <b-row class="mt-3">
                    <b-col class="text-md-left">
                        <div>
                            <b-button variant="danger" class="pr62" pill>Add</b-button>
                        </div>
                        <div class="mt-3">
                            <b-button variant="outline-danger" class="pr-5 pl-5" pill>Cancel</b-button>
                        </div>
                    </b-col>
                </b-row>
            </div>
        </b-container>
    </div>
</template>

<script>
// @ is an alias to /src
import Header from '@/components/Header.vue'
import SecondaryHeader from '@/components/SecondaryHeader.vue'
import { VueEditor } from "vue2-editor";
export default {
    name: 'Orders',
    components: {
        Header,
        SecondaryHeader,
        VueEditor
    },
    watch:{
     
    },
   
    data() {
        return {
          new_items:[
            {
            start_date:'',
            end_date:'',
            start_time:'',
            end_time:'',
            action:''
            },
            {
            start_date:'',
            end_date:'',
            start_time:'',
            end_time:'',
            action:''
            }
          ],
          view_able_orders:[
            {
              coursetitle:'某人用中文写的东西作为演示文字',
              classsize:'10',
              price:'HKD$500',
              location:'演示位置',
              periods:'5-11-2020 - 20-11-2020',
              status:'active',
              action:''
            },
            {
              coursetitle:'某人用中文写的东西作为演示文字',
              classsize:'10',
              price:'HKD$500',
              location:'演示位置',
              periods:'5-11-2020 - 20-11-2020',
              status:'active',
              action:''
            }
          ],
        
          create_course_heads: [
          // A regular column
          'start_date',
          'end_Date',
          'start_time',
          'end_time',
          'action'     

        ],
         fields: [
          // A regular column
          'CourseTitle',
          'ClassSize',
          'Price',
          'Location',
          'Periods',
          'Status',
          'Action',      

        ],

        totalRows: 1,
        currentPage: 1,
        perPage: 10,
            
        }
    }
}
</script>

<style scoped>
.breadcrumb {
  padding-left:0rem !important;
  padding-top:0rem !important
}
.rounded{
 border-radius: 1.25rem !important
}
</style>
