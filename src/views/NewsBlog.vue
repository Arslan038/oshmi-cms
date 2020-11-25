<template>
  <div class="home">
    <Header  />
    <SecondaryHeader  title="News and Blogs" />
    <b-container class="card bg-white mt-2 pb-5 pt-2">
     

      <div class="mt-2 text-md-left d-md-flex d-block d-lg-flex">
        <div>
          <b-button variant="outline-secondary" class="pr-2 pl-2"  @click="$router.push('/add-news')" ><i class="fas fa-plus-circle"></i> Add News</b-button>

        </div>
        <div class="self-center text-left ml-md-4">
          Search:
        </div>
        <div class="ml-3">
          <input class="border-hids form-control col-md-12" />
        </div>
       
        <div class="ml-md-2 mt-md-0 mt-3">
          <b-button variant="outline-secondary" class="pr-2 pl-2"  @click="$router.push('/addnews')" >Show on date</b-button>
        </div>
      
      </div>

      <div class="mt-5">
         <b-table bordered :responsive="true" :fields="fields" :items="members_data">
            <template v-slot:head(name)="data">
                <span class="smalls">{{ data.label }}</span>
            </template>
                 
            <template v-slot:head(published_date)="data">
                <span class="smalls">{{ data.label }}</span>
            </template>
            <template v-slot:head(published_by)="data">
                <span class="smalls">{{ data.label }}</span>
            </template>
            <template v-slot:head(action)="">
                <span></span>
            </template>

            <template v-slot:head(payment_type)="data">
                <span class="smalls">{{ data.label }}</span>
            </template>

           


            <!-- Cells -->
            <template v-slot:cell(name)="data">
                <span class="smalls">{{data.item.name}} </span>
            </template>
           
         
            <template v-slot:cell(name)="data">
                <span class="smalls">{{data.item.name}}</span>
            </template>
            <template v-slot:cell(published_date)="data">
                <span class="smalls">{{data.item.published_date}}</span>
            </template>
            <template v-slot:cell(published_by)="data">
                <span class="smalls">{{data.item.published_by}}</span>
            </template>
            <template v-slot:cell(action)="data">
               <b-button variant="outline-success" class="rounds">
                   Edit
                </b-button>
                 <b-button variant="outline-success" v-b-modal.delact class="ml-1 rounds">
                  Delete
                </b-button>
            </template>
            
        </b-table>

        <div class="float-right">
          <b-pagination
            v-model="currentPage"
            :total-rows="totalRows"
            :per-page="perPage"
            class="my-0"
            pills
          ></b-pagination>
        </div>
      </div>
    </b-container>

    <b-modal id="delact" hide-footer centered>
      <b-container class="text-center">
        <p> <b>Are you sure to delete the following news ?</b> </p>
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
import Header from "@/components/Header.vue";
import SecondaryHeader from "@/components/SecondaryHeader.vue";
export default {
  name: "Orders",
  components: {
    Header,
    SecondaryHeader,
  },
  data() {
    return {
      members_data: [

        {
     
            name:'名称',
            published_date:'24-6=2020',
            published_by:'名称',
            action:'',
            action:''

 

        },
        {
          
           name:'名称',
            published_date:'24-6=2020',
            published_by:'名称',
            action:'',
            action:''

        },
      ],

     
      fields: [
        // A regular column
        "name",
        "published_date",
        "published_by",
        "action",
      ],

      totalRows: 1,
      currentPage: 1,
      perPage: 10,
    };
  },
};
</script>

<style scoped>
.breadcrumb {
  padding-left: 0rem !important;
  padding-top: 0rem !important;
}
.rounded {
  border-radius: 1.25rem !important;
}
</style>
