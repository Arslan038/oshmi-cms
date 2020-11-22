<template>
  <div >
    <b-container class="pr-3 pt-5 pb-5 pl-3  mt--50 pb-1 bg-white card shadow" style="border:1px solid #dcdcdc">
      <b-row>
        <b-col>
            Login
        </b-col>
        
      </b-row>
      <b-row class="mt-2">
        <b-col>
             <b-input-group  class="mt-3">
                <b-form-input v-model="login.Email"  placeholder="Username"></b-form-input>
                <b-input-group-append>
                    <b-button variant="light" style="border-top:1px solid #dcdcdc;border-bottom:1px solid #dcdcdc;border-right:1px solid #dcdcdc"><span class="fa fa-user"></span></b-button>
                    
                </b-input-group-append>
            </b-input-group>
        </b-col>
        
      </b-row>
      <b-row class="mt-2">
        <b-col>
            <b-input-group  class="mt-3">
                <b-form-input v-model="login.password" type="password" placeholder="Password"></b-form-input>
                <b-input-group-append>
                    <b-button variant="light" style="border-top:1px solid #dcdcdc;border-bottom:1px solid #dcdcdc;border-right:1px solid #dcdcdc"><span class="fa fa-lock"></span></b-button>
                    
                </b-input-group-append>
            </b-input-group>
        </b-col>
        
      </b-row>
       <b-row class="mt-2">
        <b-col>
            <b-button variant="danger" pill class="pr-4 pl-4" @click="validate_auth()">Sign In</b-button>
        </b-col>
        
      </b-row>
    </b-container>
  </div>
</template>

<script>

export default {
  name: 'SecondaryHeader',
    data() {
        return {
          login:{
          Email: '',
          password:''
        }
      }
    },
    methods:{
      async validate_auth() {
            this.$router.push({path:'/dashboard'})

        
      },
    }
}
</script>

<style  scoped>

</style>

