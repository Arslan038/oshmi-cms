<template>
    <div class="home">
        <Header msg="Welcome to Your Vue.js App" />
        <SecondaryHeader msg="Welcome to Your Vue.js App" />
        <b-container class="card bg-white mt-2 pb-5 pt-2">
            <b-row>
                <b-col class="mt-2 text-left text-primary">
                    <h4 class="text-purple">Create Course</h4>
                </b-col>
                <b-col class="mt-2 text-right">
                    <b-button variant="danger" class="float-right pr-3 pl-3" pill>Save</b-button>
                </b-col>
            </b-row>

            <b-row class="mt-3">
                <b-col md="2" class="text-left">
                    <b>Course Name</b>
                </b-col>
                <b-col md="10" class="text-left">
                    <input placeholder="Course Name" class="rounded form-control col-md-12" />
                </b-col>
            </b-row>

            <b-row class="mt-2">
                <b-col md="2" class="text-left">
                    <b>Tutor</b>
                </b-col>
                <b-col md="10" class="text-left">
                    <input placeholder="Tutor" class="rounded form-control col-md-12" />

                    <b-button variant="danger" class="pr-2 pl-2 mt-2" size="sm" pill>Add</b-button>
                </b-col>
            </b-row>

            <b-row>
                <b-col md="12" class="text-left" cols="12">
                    <b>Course Description</b>
                </b-col>
                <b-col md="12" cols="12">
                    <vue-editor></vue-editor>
                </b-col>
            </b-row>

            <b-row class="mt-4">
                <b-col md="2" class="text-left">
                    <b>Address</b>
                </b-col>
                <b-col md="10" class="text-left">
                    <input placeholder="Address" class="rounded form-control col-md-12" />
                </b-col>
            </b-row>

            <b-row class="mt-2">
                <b-col md="2" class="text-left">
                    <b>Course Price</b>
                </b-col>
                <b-col md="10" class="text-left">
                    <input placeholder="e.g $450" class="rounded form-control col-md-12" />
                </b-col>
            </b-row>

            <b-row class="mt-2">
                <b-col md="2" class="text-left">
                    <b>Available Spots</b>
                </b-col>
                <b-col md="10" class="text-left">
                    <input placeholder="e.g 20" class="rounded form-control col-md-12" />
                </b-col>
            </b-row>

            <b-row class="mt-2">
                <b-col md="2" class="text-left">
                    <b>Cert Effective Period</b>
                </b-col>
                <b-col md="10" class="text-left">
                    <div class="d-flex">
                        <b-form-radio v-model="selected" name="some-radios" value="A"></b-form-radio>
                        <select placeholder="--Select--" class="rounded form-control">
                            <option value="" selected disabled>--Select--</option>
                        </select>
                    </div>
                    <div>
                        <b-form-radio v-model="selected" name="some-radios" value="B">NA</b-form-radio>
                    </div>
                </b-col>
            </b-row>

            <b-row class="mt-2">
                <b-col md="2" class="text-left">
                    <b>Time</b>
                </b-col>
                <b-col md="5" class="text-left">
                    <span class="text-muted">Start</span>
                    <input type="time" style="width: 50%;" class="ml-2 d-inline-block rounded form-control col-md-12" />
                </b-col>
                <b-col md="5" class="text-left">
                    <span class="text-muted">End</span>

                    <input type="time" style="width: 50%;" class="d-inline-block ml-2 rounded form-control col-md-12" />
                </b-col>
            </b-row>

            <b-table responsive class="mt-3" bordered :items="new_items" :fields="create_course_heads">
                <template v-slot:head(start_date)="data">
                    <span class="smalls">Start Date</span>
                </template>
                <template v-slot:head(end_Date)="">
                    <span class="smalls">End Date</span>
                </template>
                <template v-slot:head(start_time)="">
                    <span class="smalls">Start Time</span>
                </template>
                <template v-slot:head(end_time)="">
                    <span class="smalls">End Time</span>
                </template>
                <template v-slot:head(action)="">
                    <span class="smalls">Action</span>
                </template>
                <template v-slot:cell(start_date)="data">
                    <div>
                        <b-input-group>
                            <b-form-input type="date"></b-form-input>
                        </b-input-group>
                    </div>

                    <div class="mt-2">
                        <b-input-group>
                            <select name="" id="" class="form-control">
                                <option selected disabled>- Select tutor -</option>
                            </select>
                        </b-input-group>
                    </div>

                    <div class="mt-1 text-left mt-2">
                        <b-button pill variant="danger">Add tutor</b-button>
                    </div>
                </template>
                <template v-slot:cell(end_date)="data">
                    <b-input-group>
                        <b-form-input type="date"></b-form-input>
                    </b-input-group>
                </template>
                <template v-slot:cell(start_time)="data">
                    <b-input-group>
                        <b-form-input></b-form-input>
                        <b-input-group-prepend>
                            <b-button variant="light"><i class="far fa-clock"></i></b-button>
                        </b-input-group-prepend>
                    </b-input-group>
                </template>
                <template v-slot:cell(end_time)="data">
                    <b-input-group>
                        <b-form-input></b-form-input>
                        <b-input-group-prepend>
                            <b-button variant="light"><i class="far fa-clock"></i></b-button>
                        </b-input-group-prepend>
                    </b-input-group>
                </template>
                <template v-slot:cell(action)="data">
                    <i class="text-danger fas fa-trash"></i>
                </template>
            </b-table>
            <div class="text-left">
                <b-button variant="outline-secondary"><i class="fas fa-plus-circle"></i> Add Period</b-button>
            </div>

            <div class="mt-3">
                <b-row>
                    <b-col md="12" cols="12">
                        <h6 class="text-left"><b>Categories</b></h6>
                    </b-col>
                    <b-col md="5" cols="12">
                        <b-list-group>
                            <b-list-group-item>Environment</b-list-group-item>
                            <b-list-group-item>Safety</b-list-group-item>
                            <b-list-group-item>Surveyor</b-list-group-item>
                        </b-list-group>
                    </b-col>
                    <b-col md="1" class="al-center d-none d-md-flex d-lg-flex">
                        <i class="fas fa-arrows-alt-h"></i>
                    </b-col>
                    <b-col class="d-flex d-md-none d-lg-none" cols="12">
                        <span class="fas fa-arrows-alt-v ml-auto mr-auto"></span>
                    </b-col>
                    <b-col md="5" cols="12">
                        <b-list-group>
                            <b-list-group-item>HKIE</b-list-group-item>
                        </b-list-group>
                    </b-col>
                </b-row>
            </div>
            <b-row class="mt-3">
                <b-col class="text-md-left" md="12">
                    <h6><b>Course Picture</b></h6>
                </b-col>
                <b-col class="text-left">
                    <div>
                        <img src="../assets/a.jpg" alt="" />
                    </div>
                    <div class="d-flex">
                        <div style="align-self: center;"><i class="fas fa-file-image"></i> 1 file selected</div>
                        <div>
                            <b-button variant="danger" class="ml-4">Browse</b-button>
                        </div>
                    </div>
                </b-col>
            </b-row>
            <b-row class="mt-4">
                <b-col class="text-left" md="12" cols="12">
                    <h6><b>File</b></h6>
                </b-col>
                <b-col md="6" cols="12">
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
            <b-row class="mt-3">
                <b-col class="text-left">
                    <b-button variant="danger" class="pr-5 pl-5" pill>Save</b-button>
                    <b-button variant="outline-secondary" pill class="ml-3 pr-5 pl-5">Cancel</b-button>
                </b-col>
            </b-row>
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
