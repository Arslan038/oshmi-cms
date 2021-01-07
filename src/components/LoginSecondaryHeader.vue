<template>
  <div >
    <b-container class="pr-3 pt-5 pb-5 pl-3  mt--50 pb-1 bg-white card shadow" style="border:1px solid #dcdcdc">
      <b-row>
        <b-col>
            <h3>Login</h3>
        </b-col>
      </b-row>
      <b-form @submit.prevent="loginUser">
        <b-row class="mt-2">
          <b-col>
              <b-input-group  class="mt-3">
                  <b-form-input v-model="login.email" type="email" placeholder="Email" required></b-form-input>
                  <b-input-group-append>
                      <b-button variant="light" style="border-top:1px solid #dcdcdc;border-bottom:1px solid #dcdcdc;border-right:1px solid #dcdcdc"><span class="fa fa-user"></span></b-button>
                  </b-input-group-append>
              </b-input-group>
          </b-col>
        </b-row>
        <b-row class="mt-2">
          <b-col>
              <b-input-group  class="mt-3">
                  <b-form-input v-model="login.password" type="password" placeholder="Password" required></b-form-input>
                  <b-input-group-append>
                      <b-button variant="light" style="border-top:1px solid #dcdcdc;border-bottom:1px solid #dcdcdc;border-right:1px solid #dcdcdc"><span class="fa fa-lock"></span></b-button>
                  </b-input-group-append>
              </b-input-group>
          </b-col>
        </b-row>
        <b-row class="mt-2">
          <b-col>
              <b-button variant="danger" type="submit" pill class="pr-4 pl-4" :disabled="loading">{{loading ? "Please wait..." : "Sign In"}}</b-button>
          </b-col>
        </b-row>
      </b-form>
    </b-container>
  </div>
</template>

<script>
import {mapActions} from 'vuex'
export default {
  name: 'SecondaryHeader',
    data() {
        return {
          loading: false,
          login:{
            email: '',
            password:''
          }
      }
    },
    methods:{
      ...mapActions(['loginRequest']),
      async loginUser() {
        this.loading = true
        const resp = await this.loginRequest(this.login)
        this.loading = false
        if(resp == 1) {
          window.location.href = window.location.href.split('login')[0]+'dashboard'
          //this.move('/dashboard')
        }
      },
    }
}
</script>

<style  scoped>

</style>

