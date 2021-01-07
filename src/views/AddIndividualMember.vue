<template>
 <div class="home">
    <Header msg="Welcome to Your Vue.js App" />
    <SecondaryHeader msg="Welcome to Your Vue.js App" />
    <b-container class="card bg-white mt-2 pb-5 pt-2">
        <div class="mt-2 text-left text-primary">
            <h4 class="text-purple">Add Member</h4>
        </div>
        <b-form @submit.prevent="submitMember">
            <b-row class="mt-2">
                <b-col md="3" class="text-left" cols="12">
                    <h6><b>First Name</b></h6>
                </b-col>
                <b-col md="7" cols="12">
                    <b-input placeholder="Tai Man" v-model="member.firstName" required class="roundeds"></b-input>
                </b-col>
            </b-row>
            <b-row class="mt-2">
                <b-col md="3" class="text-left" cols="12">
                    <h6><b>Last Name</b></h6>
                </b-col>
                <b-col md="7" cols="12">
                    <b-input placeholder="Chan" v-model="member.lastName" required class="roundeds"></b-input>
                </b-col>
            </b-row>
            <b-row class="mt-2">
                <b-col md="3" class="text-left" cols="12">
                    <h6><b>Mobile Phone No.</b></h6>
                </b-col>
                <b-col md="7" cols="12">
                    <b-input placeholder="Mobile Phone No." v-model="member.phone" required class="roundeds"></b-input>
                </b-col>
            </b-row>
            <b-row class="mt-2">
                <b-col md="3" class="text-left" cols="12">
                    <h6><b>Email.</b></h6>
                </b-col>
                <b-col md="7" cols="12">
                    <b-input placeholder="email address" v-model="member.email" required class="roundeds"></b-input>
                </b-col>
            </b-row>
            <b-row class="mt-2">
                <b-col md="3" class="text-left" cols="12">
                    <h6><b>ID Card No.</b></h6>
                </b-col>
                <b-col md="7" cols="12">
                    <b-input placeholder="e.g z813xxx(3)" v-model="member.idCard" required class="roundeds"></b-input>
                </b-col>
            </b-row>
            <b-row class="mt-2">
                <b-col md="3" class="text-left" cols="12">
                    <h6><b>Existing License.</b></h6>
                </b-col>
                <b-col md="9" cols="12" class="text-left">
                    <b-row v-for="(license, index) in member.licenses" :key="index">
                        <b-col cols="5">
                            <b-form-group>
                                <label for="license_name" v-if="member.licenses.length && index == 0"><strong>Select License</strong></label>
                                <b-form-select class="roundeds" v-model="license.name">
                                    <b-form-select-option :value="null">-- Select --</b-form-select-option>
                                    <b-form-select-option v-for="(name, index) in getLicenses()" :key="index" :value="name">{{name}}</b-form-select-option>
                                </b-form-select>
                            </b-form-group>
                        </b-col>
                        <b-col cols="5">
                            <b-form-group>
                                <label for="expiry_date" v-if="member.licenses.length && index == 0"><strong>Expiry Date</strong></label>
                                <b-form-datepicker class="roundeds" :min="today" v-model="license.expiry"></b-form-datepicker>
                            </b-form-group>
                        </b-col>
                        <b-col cols="2" align-self="center">
                            <b-button variant="danger" size="sm" pill v-if="index == member.licenses.length-1" @click="addLicense"><i class="fa fa-plus"></i></b-button>
                            <b-button variant="warning" size="sm" class="ml-1" @click="removeLicense(index)" pill v-if="member.licenses.length > 1"><i class="fa fa-minus"></i></b-button>
                        </b-col>
                    </b-row>
                </b-col>
            </b-row>
            <div class="text-md-left mt-4">
                <b-button pill variant="danger" class="d-block pr62" type="submit" :disabled="loading">{{loading ? 'Adding Member...' : 'Add'}}</b-button>
                <b-button pill variant="outline-secondary" @click="$router.push('/members')" :disabled="loading" class="d-block mt-md-2 mt-2 pr-5 pl-5">Cancel</b-button>
            </div>
        </b-form>
    </b-container>

        
    </div>
</template>

<script>
import Header from "@/components/Header.vue";
import SecondaryHeader from "@/components/SecondaryHeader.vue";
import MembersHeader from "../components/MembersHeader.vue";
import {mapActions, mapGetters} from 'vuex'
export default {
  name: "AddIndividualMember",
  components: {
    Header,
    SecondaryHeader,
    MembersHeader,
  },
  methods: {
    ...mapActions(["createIndividualMember"]),
    addLicense() {
        const license = {
            name: null,
            expiry: null
        };
        this.member.licenses.push(license);
    },
    removeLicense(index) {
        this.member.licenses.splice(index, 1);
    },
    async submitMember() {
        let memberData = Object.assign({}, this.member)
        if(this.member.licenses.length == 1 && (this.member.licenses[0].name == null || this.member.licenses[0].name == "")) {
            delete memberData.licenses
        }
        if(memberData.licenses && memberData.licenses.length) {
            let emptyLicense = memberData.licenses.filter(l => !l.name || !l.expiry)
            if(emptyLicense && emptyLicense.length) {
                this.toast({title: "Create Member", message: "License name and Expiry for all Licenses is Required.", type: "warning"})
                return
            }
        }

        console.log(memberData)
        this.loading = true
        const resp = await this.createIndividualMember(memberData)
        this.loading = false
        if(resp == 1) {
            this.$router.push('/members')
        }
    }
  },
  data() {
    return {
        today: new Date(),
        loading: false,
        member: {
            firstName: null,
            lastName: null,
            email: null,
            phone: null,
            idCard: null,
            licenses: [
                {
                    name: null,
                    expiry: null
                }
            ]
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