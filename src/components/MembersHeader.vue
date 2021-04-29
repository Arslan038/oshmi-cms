<template>
  <b-row class="pt-3">
    <b-col cols="12" lg="9" class="d-inline-block text-left">
      <b-button @click="$router.push('/members')" :variant="$route.name=='Members' ? 'danger':'outline-danger'" class="link mr-1" pill>Individual</b-button>
      <b-button @click="$router.push('/corporate-members')" :variant="$route.name=='CorporateMembers' ? 'danger':'outline-danger'" class="link" pill>Corporate</b-button>
    </b-col>
    <b-col class="text-right" cols="12" lg="3">
      <b-button variant="outline-secondary" class="text-green  pr-5 pl-5" pill @click=" $router.push(reroute)" ><i class="fas fa-plus-circle"></i> {{addtext}}</b-button>
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