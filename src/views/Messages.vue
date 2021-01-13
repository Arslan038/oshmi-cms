<template>
  <div class="home">
    <Header  />
    <SecondaryHeader  title="Messages" :breadcrumb="breadcrumb" />
    <b-container class="card bg-white mt-2 pb-5 pt-2">
     
      <b-row v-if="loading">
          <b-col cols="12" class="text-center mt-3">
              <b-spinner variant="purple"></b-spinner>
              <p>Loading Messages...</p>
          </b-col>
      </b-row>

      <b-row v-if="!loading && !messages.length">
          <b-col cols="12" class="text-center mt-3">
              <h5 class="text-purple">No Message Found</h5>
          </b-col>
      </b-row>

      <div class="mt-2 text-md-left d-md-flex d-block d-lg-flex" v-if="!loading && messages.length">
        <div class="self-center text-left">
          Search
        </div>
        <div class="ml-3">
          <input class="border-hids form-control col-md-12" v-model="filter" />
        </div>
        <div class="ml-auto">
          <b-button variant="outline-secondary" class="pr-2 pl-2"  @click="$router.push('/add-messages')" ><i class="fas fa-plus-circle"></i> Add Messages</b-button>
        </div>
      </div>

      <div class="mt-5" v-if="!loading && messages.length">
         <b-table bordered :responsive="true" :fields="fields" :items="messages" :current-page="currentPage" :filter="filter" :per-page="rowsPerPage">
            <!-- Cells -->
            
            <template v-slot:cell(action)="data">
               <i class="fa fa-trash text-danger link" @click="openModal(data.item)"></i>
            </template>
        </b-table>
          <b-pagination
            v-model="currentPage"
            :total-rows="messages.length"
            :per-page="rowsPerPage"
            class="my-0"
            align="right"
            pills
          ></b-pagination>
      </div>
    </b-container>

    <b-modal title="Delete Message" v-model="deleteModal" hide-footer>
      <b-row>
        <b-col cols="12" class="text-center">
          <p><strong class="text-purple">Are you sure you want to delete this message ?</strong></p>
        </b-col>
        <b-col cols="12" class="text-center">
          <b-button variant="danger" pill @click="removeMessage" :disabled="deleteLoading">{{deleteLoading ? 'Deleting Message...' : 'Yes, Delete Message'}}</b-button>
          <b-button class="ml-2" variant="outline-danger" pill @click="deleteModal = !deleteModal">Cancel</b-button>
        </b-col>
      </b-row>
    </b-modal>
  </div>
</template>

<script>
// @ is an alias to /src
import Header from "@/components/Header.vue";
import SecondaryHeader from "@/components/SecondaryHeader.vue";
import {mapActions, mapGetters} from 'vuex'
export default {
  name: "Messages",
  components: {
    Header,
    SecondaryHeader,
  },

  computed: {
    ...mapGetters(['getMessages'])
  },

  async created() {
    if(!this.getMessages.length) {
      this.loading = true
      await this.fetchMessages()
      this.loading = false
    }
    else {
      this.messages = this.getMessages
    }
  },

  watch: {
    getMessages(val) {
      this.messages = val
    }
  },

  methods: {
    ...mapActions(["fetchMessages", "deleteMessage"]),
    openModal(item) {
      this.messageToDelete = Object.assign({}, item)
      this.deleteModal = true
    },
    async removeMessage() {
      this.deleteLoading = true
      const resp = await this.deleteMessage(this.messageToDelete.id)
      this.deleteLoading = false
      if(resp == 1) {
        this.deleteModal = false
      }
    }
  },

  data() {
    return {
      loading: false,
      deleteModal: false,
      messageToDelete: null,
      deleteLoading: false,
      messages: [],
      fields: [
        {
          key: "text",
          label: "Text",
          sortable: true,
          sortByFormatted: true,
        },
        {
          key: "date",
          label: "Sent Date",
          sortable: true,
          sortByFormatted: true,
        },
        {
          key: "sentTo",
          label: "Sent To",
          sortable: true,
          sortByFormatted: true,
        },
        {
          key: 'action',
          label: "Action"
        }
      ],

      totalRows: 1,
      currentPage: 1,
      perPage: 10,
      filter: null,
      breadcrumb: [
        {
          text: 'Messages',
          active: true
        }
      ]
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
