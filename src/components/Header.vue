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
            <b-col md="1" cols="12" style="cursor:pointer;" class="text-md-left  mr-md-4 " @click="reRoute('/dashboard','Dashboard')">
               <span :class="active_route=='Dashboard' ? 'text-purple': 'text-gray'">Dashboard</span>
            </b-col>
            
            <b-col  md="1" cols="12" style="cursor:pointer;" class="text-md-left pl-md-0 " @click="reRoute('/courses','Courses')">
                 <span :class="active_route=='Courses' ? 'text-purple': 'text-gray'">Courses</span> 
            </b-col>
            <b-col  md="1" cols="12" style="cursor:pointer;" class="text-md-left pl-md-0 " @click="reRoute('/members','Members')">
                 <span :class="active_route=='Members' ? 'text-purple': 'text-gray'">Members</span> 
            </b-col>
            <b-col  md="1" cols="12" style="cursor:pointer;" class="text-md-left pl-md-0 " @click="reRoute('/attendance','Attendance')">
                 <span :class="active_route=='Attendance' ? 'text-purple': 'text-gray'">Attendance</span> 
            </b-col>
             <b-col  md="1" cols="12" style="cursor:pointer;" class="text-md-left pl-md-0 ml-md-2" @click="reRoute('/messages','Messages')">
                 <span :class="active_route=='Messages' ? 'text-purple': 'text-gray'">Messages</span> 
            </b-col>
            <b-col  md="1" cols="12" style="cursor:pointer;" class="text-md-left pl-md-0 pr-md-0 ml-md-2 " @click="reRoute('/news-blog','News')"  >
                 <span :class="active_route=='News' ? 'text-purple': 'text-gray'">News</span> 
            </b-col>

            <b-col  md="5" cols="12" style="cursor:pointer;" class="text-md-right pl-md-0 ">
                 <span :class="'text-gray'" @click="logOut">Logout</span> 
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
  created(){
    if(localStorage.getItem("setroute")==null){
      localStorage.setItem("setroute",'Dashboard')

    }
  },
  data(){
    return {
      active_route:localStorage.getItem("setroute")!=null ? localStorage.getItem("setroute"):'Dashboard'
    }
  },
  methods:{
    reRoute(route,val){
      localStorage.setItem("setroute",val)
      this.active_route=val
      this.$router.push(route)
      
    },
    logOut(){
      this.$router.push('/')
      localStorage.removeItem("setroute")

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
