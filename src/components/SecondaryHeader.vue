<template>
  <div class="hello">
    <b-container class="pr-3 pt-3  pl-3  mt--50 pb-1 bg-white card shadow" style="border:1px solid #dcdcdc">
      <b-row>
         <b-col>
           <div class="text-left text-light-gray"> <h5>Members</h5> </div>
           <div>
            <b-breadcrumb class="bg-white">
              <b-breadcrumb-item href="">
                <span class="fa fa-home"></span>
              </b-breadcrumb-item>
              <b-breadcrumb-item href="" >UI</b-breadcrumb-item>
              <b-breadcrumb-item active>List Groups</b-breadcrumb-item>

            </b-breadcrumb>
           </div>
         </b-col>
         <b-col md="2" style="position:relative">
           <div style="margin-top:-30px; !important">
              <apexchart type="bar" height="100" :options="chartOptions" :series="series"></apexchart>
          </div>
          <div class="page-text">Page Views</div>
         </b-col>
          <b-col md="2" style="position:relative">
            <div style="margin-top:-30px; !important">
                   <apexchart type="bar" height="100" :options="secchartOptions" :series="series"></apexchart>
            </div>
            <div class="visitor-text">Visitors</div>

         </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  name: 'SecondaryHeader',
  props: {
    msg: String
  },
  data(){
    return {
      series: [{
                data: [10, 10, 20, 20, 20, 20, 30, 50, 70, 50, 69, 20, 30, 40, 50, 58, 20, 30, 40, 50, 40]
            }],
            secchartOptions: {
                chart: {
                    type: 'bar',
                    height: 150,
                    toolbar: {
                        show: false
                    }
                },
                colors: ['#349dfa'],
                plotOptions: {
                    bar: {
                        horizontal: false,
                        startingShape: 'flat',
                        endingShape: 'flat',
                        columnWidth: '30%',
                        barHeight: '100%',
                        distributed: false,

                    }
                },
                dataLabels: {
                    enabled: false
                },
                grid: {
                    show: false,

                    xaxis: {
                        lines: {
                            show: false
                        }
                    },
                    yaxis: {
                        lines: {
                            show: false
                        }
                    },

                },
                xaxis: {

                    labels: {
                        show: false
                    },
                    axisBorder: {
                        show: false
                    },
                    categories: [],
                },
                yaxis: {
                    show: false
                }
            },
            chartOptions: {
                chart: {
                    type: 'bar',
                    height: 150,
                    toolbar: {
                        show: false
                    }
                },
                grid: {
                    show: false,

                    xaxis: {
                        lines: {
                            show: false
                        }
                    },
                    yaxis: {
                        lines: {
                            show: false
                        }
                    },

                },
                colors: ['#817cd7'],
                plotOptions: {
                    bar: {
                        horizontal: false,
                        startingShape: 'flat',
                        endingShape: 'flat',
                        columnWidth: '30%',
                        barHeight: '100%',
                        distributed: false,

                    }
                },
                dataLabels: {
                    enabled: false
                },
                xaxis: {

                    labels: {
                        show: false
                    },
                    axisBorder: {
                        show: false
                    },
                    categories: [],
                },
                yaxis: {
                    show: false
                }
            }


    }
  }
}
</script>

<style  scoped>
/* Desktops and laptops ----------- */
@media only screen  and (min-width : 1224px) {
.visitor-text{
    position: absolute;
    top: 3.5rem;
    left: 5rem;
}

.page-text{
    position: absolute;
    top: 3.5rem;
    left: 4rem;
}



}

@media only screen and (min-device-width : 320px) and (max-device-width : 480px) {
.visitor-text{
    position: absolute;
    top: 3.6rem;
    left: 10rem;
}

.page-text{
    position: absolute;
    top: 3.7rem;
    left: 9rem;
}
}
</style>

