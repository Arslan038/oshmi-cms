<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  computed: {
    ...mapGetters(['getToast'])
  },
  watch: {
    getToast(val) {
      if(val.message) {
        this.toast(val)
      }
    },
  }
}
</script>

<style>
@media only screen  and (min-width : 1224px) {
 .mdwidths{
      max-width:55% !important;
      flex:0 0 55% !important;
  }
  .md-members-widths{
    flex: 0 0 82% !important;
    max-width: 82% !important;
  }  
 
}

@media only screen  and (min-width : 1824px) {
  .mdwidths{
      max-width:55% !important;
      flex:0 0 55% !important;
  }  
  .md-members-widths{
    flex: 0 0 82% !important;
    max-width: 82% !important;
  }  

}
@media only screen and (min-device-width : 320px) and (max-device-width : 480px) {
  .mt-xs-1{
      margin-top:1rem !important;
  }
}

.border-hids{
  border-left:none !important;
  border-right:none !important; 
  border-top:none !important;
}
.text-main{
  color:#1c4694 !important;
}
.mt-10{
  margin-top:10px;
}
.mt--50{
  margin-top:-50px;
}
.smalls{
  font-size:14px;
}
.ex-smalls{
  font-size:14px;
}
.self-center{
  align-self:center !important;
}
body {
  background-color:#f1f4f3 !important
}
.bg-header{
  background-color:#191f28 !important
}
.text-orange{
  color:#c36928 !important
}
.text-gray{
  color:#949495 !important
}
.text-light-gray{
  color:#b4b4b5 !important

}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
/* th,
td {
  min-width: 200px !important;
} */
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}
.rounds{
  border-radius:12px !important;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
.btn-outline-secondary:hover{
  color:white !important;
  background:#a37be5 !important;
  border-color:#a37be5 !important;
}
.btn-danger{
  background:#a37be5 !important;
  border-color:#a37be5 !important;
}
.btn-danger:hover{
  background:#a37be5 !important;
  color:white !important;
}
.btn-success{
  background:#7ed321 !important;
  border-color:#7ed321 !important;
}
.btn-outline-success{
  color: #7ed321 !important;
  background-color: white !important;
  border-color: #7ed321 !important;
}
.btn-warning{
  color: #fff !important;
  background-color: red !important;
  border-color: red !important;
}


.btn-outline-success:hover {
  color: white !important;
  background-color: #7ed321 !important;
  border-color: #7ed321 !important;
}


.badge-danger {
  background:#7ed321 !important;
  color:white !important;
}
.btn-outline-danger {
    color: #a37be5 !important;
    border-color: #a37be5 !important;
}
.btn-outline-danger:hover {
    background: #a37be5 !important;
    color:white !important;
}
.router-link-active{
  color:#a37be5 !important;
}
.text-purple{
  color:#a37be5 !important;
}
.al-center{
  align-self:center;
}
.page-item.active .page-link{
  background-color:#b4b4b5 !important;
  border-color:#b4b4b5 !important;
  
}

.roundeds{
 border-radius: 1.25rem !important
}
</style>
