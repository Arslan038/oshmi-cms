<template>
 <div class="home">
    <Header msg="Welcome to Your Vue.js App" />
    <SecondaryHeader msg="Welcome to Your Vue.js App" />
    <b-container class="card bg-white mt-2 pb-5 pt-2">
        <b-form @submit.prevent="sendMessage">
            <b-row class="mt-3">
                <b-col md="3" class="text-left" cols="12">
                    <h6><b>Full text</b></h6>
                </b-col>
                <b-col md="7" cols="12" class="text-left">
                    <b-textarea rows="10" placeholder="Type here" v-model="message.text" required></b-textarea>
                </b-col>
            </b-row>
            <b-row class="mt-3">
                <b-col md="3" class="text-left" cols="12">
                    <h6><b>Send To</b></h6>
                </b-col>
                <b-col md="7" cols="12" class="text-left">
                    <b-form-select v-model="message.sentTo" @change="message.users = []" required>
                        <b-form-select-option :value="null">Select Send To</b-form-select-option>
                        <b-form-select-option value="All">All Members</b-form-select-option>
                        <b-form-select-option value="All Individual Members">All Individual Members</b-form-select-option>
                        <b-form-select-option value="All Corporate Members">All Corporate Members</b-form-select-option>
                        <b-form-select-option value="Specific Corporate Members">Specific Corporate Members</b-form-select-option>
                        <b-form-select-option value="Specific Individual Members">Specific Individual Members</b-form-select-option>
                    </b-form-select>
                </b-col>
            </b-row>
            <b-row class="mt-3" v-if="message.sentTo == 'Specific Corporate Members'">
                <b-col md="3" class="text-left" cols="12">
                    <h6><b>Select Corporate Members</b></h6>
                </b-col>
                <b-col md="7" cols="12" class="text-left">
                    <multiselect v-model="message.users" :options="getCorporateMembers" :tagabled="true" :multiple="true" :close-on-select="true" :clear-on-select="false" :preserve-search="true" placeholder="Select Corporate Members" tag-placeholder="Select Corporate Members" label="corporateName" track-by="corporateName" :preselect-first="false">
                    </multiselect>
                </b-col>
            </b-row>
            <b-row class="mt-3" v-if="message.sentTo == 'Specific Individual Members'">
                <b-col md="3" class="text-left" cols="12">
                    <h6><b>Select Individual Members</b></h6>
                </b-col>
                <b-col md="7" cols="12" class="text-left">
                    <multiselect v-model="message.users" :options="getIndividualMembers" :tagabled="true" :multiple="true" :close-on-select="true" :clear-on-select="false" :preserve-search="true" placeholder="Select Individual Members" tag-placeholder="Select Individual Members" label="email" track-by="email" :preselect-first="false">
                        <template slot="singleLabel" slot-scope="{ option }"><strong>{{ option.name }}</strong></template>
                    </multiselect>
                </b-col>
            </b-row>
            <b-row>
                <b-col cols="12" class="text-left mt-5">
                    <b-button variant="danger" type="submit" pill :disabled="createLoading">{{createLoading ? 'Sending Message...' : 'Send Message'}}</b-button>
                </b-col>
            </b-row>
        </b-form>

         
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
import {mapActions, mapGetters} from 'vuex'
import MembersHeader from "../components/MembersHeader.vue";
import Multiselect from 'vue-multiselect';
export default {
  name: "AddMessage",
  components: {
    Header,
    SecondaryHeader,
    MembersHeader,
    Multiselect
  },
  computed: {
    ...mapGetters(['getIndividualMembers', 'getCorporateMembers'])
  },
  methods: {
    ...mapActions(["fetchIndividualMembers", "fetchCorporateMembers", "createMessage"]),
    async sendMessage() {
        if(this.message.sentTo == "All") {
            this.message.users = []
            this.message.users = this.getIndividualMembers
            this.message.users = this.message.users.concat(this.getCorporateMembers)
        }
        if(this.message.sentTo == "All Individual Members") {
            this.message.users = []
            this.message.users = this.getIndividualMembers
        }
        if(this.message.sentTo == "All Corporate Members") {
            this.message.users = []
            this.message.users = this.getCorporateMembers
        }

        if(this.message.users.length < 1) {
            this.toast({title: "Create Message", message: "Please Select atleast 1 User", type: "warning"})
            return
        }

        let usersArray = []
        this.message.users.forEach(user => {
            usersArray.push(user.id)
        })

        this.message.users = usersArray

        this.message.date = new Date().toISOString()
        this.message.time = new Date().toTimeString()

        this.createLoading = true
        const resp = await this.createMessage(this.message)
        this.createLoading = false
        if(resp == 1) {
            this.$router.push('/messages')
        }

    }
  },
  async created() {
      if(!this.getIndividualMembers.length) {
        await this.fetchIndividualMembers()
      }
      if(!this.getCorporateMembers.length) {
        await this.fetchCorporateMembers()
      }
  },
//   watch: {
//       getIndividualMembers(val) {
//         this.members = this.getIndividualMembers
//       },
//       getCorporateMembers(val) {
//         if(this.members.length) {
//             this.members.concat(this.getCorporateMembers)
//         }
//       }
//   },
  data() {
      return {
          loading: false,
          createLoading: false,
          members: [],
          message: {
              text: null,
              date: null,
              time: null,
              sentTo: null,
              users: []
          }
      }
  }
}
</script>

<style>
.pr62{
    padding-right:62px !important;
    padding-left:62px !important;
}
</style>