<template>
  <b-row>
        <b-col md="1" class="mt-md-0 mt-2" cols="6" @click="$router.push('/courses')">
          <b-button  :variant="$route.name=='Courses' ? 'danger':'outline-danger'" pill>Individual</b-button>
        </b-col>
        <b-col md="1" class="mt-md-0 mt-2 ml-md-2" cols="6" @click="$router.push('/courses')">
          <b-button  :variant="$route.name=='Courses' ? 'danger':'outline-danger'" pill>Corporate</b-button>
        </b-col>
        <b-col md="9" cols="6" v-if="create==true" class="text-md-right  mt-md-0 mt-2">
          <b-button variant="outline-secondary" class="text-purple  pr-5 pl-5" pill @click=" $router.push(reroute)" ><i class="fas fa-plus-circle"></i> {{addtext}}</b-button>
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