<template>
  <div class="hello">
     <b-container style="padding-bottom:4rem;" class=" pr-5 pl-5 pt-3 bg-header" fluid>
       <b-container class="pl-0 pr-0">
       <div class="d-none d-md-flex">
         <!-- <img class="center-block"
              style="width: 80px;
              height: 20px;"
          alt="Vue logo" src="../assets/logo.png"> -->
       </div>
       <div class="d-block d-md-none">
         <!-- <img class="center-block"
              style="width: 80px;
              height: 20px;"
          alt="Vue logo" src="../assets/logo.png"> -->
       </div>
       <div class="mt-2">
         <b-row>
            <b-col md="1" cols="12" class="text-md-left  mr-md-4 ">
              <router-link to="/dashboard">
               <span :class="active_route=='Users' ? 'text-purple': 'text-gray'">Dashboards</span>
              </router-link>
            </b-col>
            
            <b-col  md="1" cols="12" style="cursor:pointer;" class="text-md-left pl-md-0 ">
               <router-link to="/courses">
                 <span :class="active_route=='Courses' ? 'text-purple': 'text-gray'">Courses</span> 
               </router-link>
            </b-col>
            <b-col  md="1" cols="12" style="cursor:pointer;" class="text-md-left pl-md-0 ">
               <router-link to="/members">
                 <span :class="active_route=='Orders' ? 'text-purple': 'text-gray'">Members</span> 
               </router-link>
            </b-col>
            <b-col  md="1" cols="12" style="cursor:pointer;" class="text-md-left pl-md-0 ">
               <router-link to="/attendance">
                 <span :class="active_route=='Orders' ? 'text-purple': 'text-gray'">Attendance</span> 
               </router-link>
            </b-col>
            <b-col  md="1" cols="12" style="cursor:pointer;" class="text-md-left pl-md-0 pr-md-0 ml-md-2 ">
               <router-link to="/news">
                 <span :class="active_route=='Orders' ? 'text-purple': 'text-gray'">News</span> 
               </router-link>
            </b-col>
             <b-col  md="1" cols="12" style="cursor:pointer;" class="text-md-left pl-md-0 ">
               <router-link to="/messages">
                 <span :class="active_route=='Orders' ? 'text-purple': 'text-gray'">Messages</span> 
               </router-link>
            </b-col>
            <b-col  md="5" cols="12" style="cursor:pointer;" class="text-md-right pl-md-0 ">
               <!-- <router-link to="/orders"> -->
                 <span :class="'text-gray'" @click="logOut">Logout</span> 
               <!-- </router-link> -->
            </b-col>
         </b-row>
       </div>
       </b-container>
     </b-container>
  </div>
</template>

<script>
export default {
  name: 'Header',
  computed:{
  },
  data(){
    return {
      active_route:'Courses'
    }
  },
  methods:{
    logOut(){
       this.$store.commit("logout")
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
