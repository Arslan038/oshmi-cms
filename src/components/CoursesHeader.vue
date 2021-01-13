<template>
  <b-row>
        <b-col md="1" class="mt-md-0 mt-2" cols="6" @click="$router.push('/courses')">
          <b-button  :variant="$route.name=='Courses' ? 'danger':'outline-danger'" pill>Courses</b-button>
          
        </b-col>
        <b-col md="1" cols="6" class="mt-md-0 mt-2" @click="$router.push('/lessons')">
          <b-button :variant="$route.name=='Lessons' ? 'danger':'outline-danger'" pill>Lessons </b-button> 


        </b-col>
        <b-col md="1" cols="6" class="mt-md-0 mt-2" >
          <b-button  :variant="$route.name=='Categories' ? 'danger':'outline-danger'" @click="$router.push('/categories')"  pill>Categories</b-button>

        </b-col>
        <b-col md="1" class="ml-md-4 mr-md-2 mt-md-0 mt-2 " cols="6" @click="$router.push('/bookings')">
          <b-button  :variant="$route.name=='Bookings' ? 'danger':'outline-danger'"  pill>Bookings</b-button>

        </b-col>
        <b-col md="1" cols="6" class="mt-md-0 mt-2">
          <b-button :variant="$route.name=='Tutors' ? 'danger':'outline-danger'" @click="$router.push('/tutors')"  pill>Tutors</b-button>
        </b-col>
        <b-col md="6" cols="6" v-if="create==true"  class="mdwidths text-right mt-md-0 mt-2">
          <b-button variant="outline-secondary" class="text-purple" pill @click=" $router.push(reroute)" ><i class="fas fa-plus-circle"></i> {{addtext}}</b-button>
        </b-col>
      </b-row>
      
</template>

<script>
export default {
name:'CoursesHeader',
props:['create','addtext','reroute']
}
</script>

<style>

</style>