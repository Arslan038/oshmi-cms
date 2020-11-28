<template>
    <div class="home">
        <Header msg="Welcome to Your Vue.js App" />
        <SecondaryHeader msg="Welcome to Your Vue.js App" />
        <b-container class="card bg-white mt-2 pb-5 pt-2">
            <CoursesHeader :create="false" />

            <div class="mt-4 text-left text-primary">
                <h4 class="text-purple">Upcoming Lessons</h4>
            </div>

            <div class="mt-2 text-md-left d-flex">
                <div class="self-center">
                    Search
                </div>
                <div class="ml-3">
                    <input class="border-hids form-control col-md-12" />
                </div>
                <div class="ml-auto">
                    <b-button variant="info" @click="$router.push('/export-lessons')" class="pr-3 pl-3" pill>Export</b-button>
                </div>
            </div>

            <div class="mt-3">
                <b-table :responsive="true" striped hover :fields="fields" :items="view_able_orders">
                    <template v-slot:head(course_title)="data">
                        <span class="smalls">Course Title</span>
                    </template>
                    <template v-slot:head(class_size)="">
                        <span class="smalls">Class Size</span>
                    </template>
                    <template v-slot:head(location)="">
                        <span class="smalls">Location</span>
                    </template>
                    <template v-slot:head(date)="">
                        <span class="smalls">Date</span>
                    </template>

                    <template v-slot:head(start_time)="">
                        <span class="smalls">Start Time</span>
                    </template>

                    <template v-slot:head(action)="data">
                        <span class="smalls">{{ data.label }}</span>
                    </template>

                    <!-- Cells -->
                    <template v-slot:cell(course_title)="data">
                        <span class="smalls">{{data.item.course_title}} </span>
                    </template>
                    <template v-slot:cell(class_size)="data">
                        <span class="smalls">{{data.item.class_size}}</span>
                    </template>

                    <template v-slot:cell(date)="data">
                        <span class="smalls">{{data.item.date}}</span>
                    </template>
                    <template v-slot:cell(start_time)="data">
                        <span class="smalls">{{data.item.start_time}} </span>
                    </template>

                    <template v-slot:cell(action)="data">
                        <router-link to="/edit-courses"><i class="ml-2 mr-2 text-info fas fa-pencil-alt"></i></router-link>
                    </template>
                </b-table>

                <div class="float-right">
                    <b-pagination v-model="currentPage" :total-rows="totalRows" :per-page="perPage" class="my-0" pills></b-pagination>
                </div>
            </div>
        </b-container>
        <b-modal id="actions" hide-footer size="xl">
            <b-container>
                <b-table bordered :items="new_items" :fields="create_course_heads">
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

                        <div class="mt-1">
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

                <b-button variant="outline-secondary"><i class="fas fa-plus-circle"></i> Add Period</b-button>
            </b-container>
        </b-modal>
        <b-modal id="order-cancel" hide-header hide-footer>
            <b-container>
                <h5 class="text-primary pt-3">Confirm Cancel Order ?</h5>
                <p class="text-muted">Upon cancellation , an email will be sent to the user to advice that order has been cancelled.</p>
                <b-row class="mt-3 pt-4 pb-3">
                    <b-col class="text-right">
                        <b-button pill variant="primary" class="pr-4 pl-4" @click="cancelOrder('CANCELLED')"> Confirm</b-button>
                    </b-col>
                    <b-col class="text-main">
                        <b-button pill variant="light" class="pr-4 pl-4" @click="$bvModal.hide('order-cancel')" style="border: 1px solid #dcdcdc;"> Cancel</b-button>
                    </b-col>
                </b-row>
            </b-container>
        </b-modal>
        <b-modal id="order-confirm" hide-header hide-footer>
            <b-container>
                <h5 class="text-primary pt-3">Confirm Settlement?</h5>
                <p class="text-muted">Upon confirmation , an email will be sent to the user to advice that payment has been received.</p>
            </b-container>
        </b-modal>
    </div>
</template>

<script>
// @ is an alias to /src
import Header from '@/components/Header.vue'
import SecondaryHeader from '@/components/SecondaryHeader.vue'
import CoursesHeader from '../components/CoursesHeader.vue'

export default {
    name: 'Lessons',
    components: {
        Header,
        SecondaryHeader,
        CoursesHeader
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
              course_title:'某人用中文写的东西作为演示文字',
              class_size:'10',
              location:'演示位置',
              date:'5-11-2020',
              start_time:'12:15',
              action:''
            },
           {
              course_title:'某人用中文写的东西作为演示文字',
              class_size:'10',
              location:'演示位置',
              date:'5-11-2020',
              start_time:'12:15',
              action:''
            }
          ],
          confirm_settlement_obj:{
            OrderId:'',
            PaymentReference:'',
            PaymentDate:'',
            OrderKey:'',
            UserKey:'',
            Type:'INVOICE' 
          },
          excelFlag:false,
          timers:'',
          order_obj:{
           Type: '',
           OrderKey:'',
           UserKey:'',
          },
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
          'course_title',
          'class_size',
          'location',
          'date',
          'start_time',
          'action',      

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
