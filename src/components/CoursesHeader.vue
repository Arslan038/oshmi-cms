<template>
  <b-row class="pt-3">
    <b-col cols="12" lg="9" class="d-inline-block text-left">
      <b-button @click="$router.push('/courses')" :variant="$route.name=='Courses' ? 'danger':'outline-danger'" class="mr-1" pill>Courses</b-button>
      <b-button @click="$router.push('/lessons')" :variant="$route.name=='Lessons' ? 'danger':'outline-danger'" class="mr-1" pill>Lessons </b-button>
      <b-button @click="$router.push('/bookings')" :variant="$route.name=='Bookings' ? 'danger':'outline-danger'" class="mr-1" pill>Bookings</b-button>
      <b-button :variant="$route.name=='Categories' ? 'danger':'outline-danger'" @click="$router.push('/categories')" class="mr-1" pill>Categories</b-button>
      <b-button :variant="$route.name=='Tutors' ? 'danger':'outline-danger'" @click="$router.push('/tutors')" class="mr-1" pill>Tutors</b-button>
    </b-col>
    <b-col cols="12" lg="3" class="text-right">
      <b-button variant="outline-secondary" class="text-green" pill @click=" $router.push(reroute)" ><i class="fas fa-plus-circle"></i> {{addtext}}</b-button>
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