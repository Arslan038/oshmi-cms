<template>
  <div>
     <b-container style="padding-bottom:4rem;" class="d-md-block d-lg-block d-none pr-5 pl-5 pt-3 bg-header" fluid>
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
            <b-col md="1" cols="12" class="text-md-left  mr-md-4 " @click="active_route='Dashboard'">
              <router-link to="/dashboard">
               <span :class="active_route=='Dashboard' ? 'text-purple': 'text-gray'">Dashboard</span>
              </router-link>
            </b-col>
            
            <b-col  md="1" cols="12" style="cursor:pointer;" class="text-md-left pl-md-0 " @click="active_route='Courses'">
               <router-link to="/courses">
                 <span :class="active_route=='Courses' ? 'text-purple': 'text-gray'">Courses</span> 
               </router-link>
            </b-col>
            <b-col  md="1" cols="12" style="cursor:pointer;" class="text-md-left pl-md-0 " @click="active_route='Members'">
               <router-link to="/members" >
                 <span :class="active_route=='Members' ? 'text-purple': 'text-gray'">Members</span> 
               </router-link>
            </b-col>
            <b-col  md="1" cols="12" style="cursor:pointer;" class="text-md-left pl-md-0 " @click="active_route='Attendance'">
               <router-link to="/attendance">
                 <span :class="active_route=='Attendance' ? 'text-purple': 'text-gray'">Attendance</span> 
               </router-link>
            </b-col>
            <b-col  md="1" cols="12" style="cursor:pointer;" class="text-md-left pl-md-0 pr-md-0 ml-md-2 " @click="active_route='News'" >
               <router-link to="/news-blog">
                 <span :class="active_route=='News' ? 'text-purple': 'text-gray'">News</span> 
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
     <b-container  style="min-height:120px;" class="p-1 bg-header d-block d-md-none d-lg-none" fluid  >
        <b-navbar toggleable="lg" type="dark" >
          <b-navbar-brand href="#">NavBar</b-navbar-brand>

          <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

          <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav>
              <b-nav-item to="/dashboard">Dashboard</b-nav-item>
              <b-nav-item to="/courses" >Courses</b-nav-item>
              <b-nav-item to="/members" >Members</b-nav-item>
              <b-nav-item to="/attendance" >Attendance</b-nav-item>
              <b-nav-item to="/news" >News</b-nav-item>
              <b-nav-item to="/messages" >Messages</b-nav-item>

            </b-navbar-nav>

            <!-- Right aligned nav items -->
            <b-navbar-nav class="ml-auto">
              

             
            </b-navbar-nav>
          </b-collapse>
        </b-navbar>
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
