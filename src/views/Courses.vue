<template>
    <div class="home">
        <Header msg="Welcome to Your Vue.js App"/>
        <SecondaryHeader msg="Welcome to Your Vue.js App" />
        <b-container class="card bg-white mt-2 pb-5 pt-2">
            <CoursesHeader :create="true" addtext="Create course" reroute="/create-courses" />
            <div class="mt-4 text-left text-primary">
                <h4 class="text-purple">My Course</h4>
            </div>

            <div class="mt-2 text-md-left d-flex">
                <div class="self-center">
                    Search
                </div>
                <div class="ml-3">
                    <input class="border-hids form-control col-md-12" />
                </div>
                <div class="ml-auto">
                    <b-button variant="info" class="pr-3 pl-3" pill @click="$bvModal.show('add-period-modal')">Export</b-button>
                </div>
            </div>

            <div class="mt-3">
                <b-table bordered :responsive="true" striped hover :fields="fields" :items="view_able_orders">
                    <template v-slot:head(CourseTitle)="data">
                        <span class="smalls">Course Title</span>
                    </template>
                    <template v-slot:head(ClassSize)="">
                        <span class="smalls">Class Size</span>
                    </template>
                    <template v-slot:head(Price)="">
                        <span class="smalls">Price</span>
                    </template>
                    <template v-slot:head(Periods)="">
                        <span class="smalls">Periods</span>
                    </template>

                    <template v-slot:head(Status)="">
                        <span class="smalls">Status</span>
                    </template>

                    <template v-slot:head(Action)="data">
                        <span class="smalls">{{ data.label }}</span>
                    </template>

                    <!-- Cells -->
                    <template v-slot:cell(coursetitle)="data">
                        <span class="smalls">{{data.item.coursetitle}} </span>
                    </template>
                    <template v-slot:cell(classsize)="data">
                        <span class="smalls">{{data.item.classsize}}</span>
                    </template>
                    <template v-slot:cell(price)="data">
                        <span class="smalls">{{data.item.price}}</span>
                    </template>
                    <template v-slot:cell(location)="data">
                        <span class="smalls">{{data.item.location}}</span>
                    </template>
                    <template v-slot:cell(periods)="data">
                        <span class="smalls">{{data.item.periods}} <i v-b-modal.add-period-modal class="fas fa-plus-circle"></i></span>
                    </template>

                    <template v-slot:cell(status)="data">
                        <span class="smalls">
                            <b-button variant="success"> {{ data.item.status }}</b-button>
                        </span>
                    </template>
                    <template v-slot:cell(action)="data">
                        <i class="fas fa-copy text-primary"></i>
                        <router-link to="/edit-courses"><i class="ml-2 mr-2 text-info fas fa-pencil-alt"></i></router-link>
                        <i v-b-modal.del-modal class="fas fa-trash text-danger"></i>
                    </template>
                </b-table>

                <div class="float-right">
                    <b-pagination v-model="currentPage" :total-rows="totalRows" :per-page="perPage" class="my-0" pills></b-pagination>
                </div>
            </div>
        </b-container>
        <b-modal id="add-period-modal" hide-footer size="xl">
            <b-container>
                <b-table bordered responsive :items="new_items" :fields="create_course_heads">
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
                <div class="text-center">
                    <b-button pill size="lg">Save</b-button>
                    <b-button pill size="lg" class="ml-md-2">Cancel</b-button>
                </div>
            </b-container>
        </b-modal>
        <b-modal id="del-modal"   hide-footer centered>
            <b-container class="text-center">
                <p> <b>Are you sure to delete the following course ?</b> </p>
                <h5 class="text-purple">演示内容 演示内容 演示内容</h5>
                <div>
                <b-button size="lg" variant="danger" pill>
                    Yes
                </b-button>
                <b-button class="ml-3" size="lg" variant="danger" pill>
                    Cancel
                </b-button>
                </div>
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
    name: 'Orders',
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
