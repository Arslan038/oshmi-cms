<template>
    <b-card>
        <div v-if="loading && !lessons.length">
            <b-row>
                <b-col cols="12" class="text-center">
                    <b-spinner variant="purple"></b-spinner>
                    <p>Loading Upcoming Lessons</p>
                </b-col>
            </b-row>
        </div>
        <div class="mt-3 lesson-item " v-for="(item, index) in lessons" :key="index">
            <div class="d-flex" :style="'padding-left:20px;border-left:2px solid #'+getColor()">
                <div>
                    <h6 class="mb-0">{{getSeparatedDate(item.startDate).day}}</h6>
                    <p style="font-size:10px;" class="mb-0 mt-0text-muted">{{getSeparatedDate(item.startDate).month}}</p>
                    <p style="font-size:10px;" class="mt-0 text-muted">{{getSeparatedDate(item.startDate).year}}</p>
                </div>
                <div class="ml-3 text-left">
                    <h6 class="mb-0 text-left"><b>{{item.name}}</b></h6>
                    <p style="font-size:12px;" class="mb-0 mt-0 text-left">{{item.course.name}}</p>
                    <p style="font-size:10px;"><i class="fas fa-map-marker"></i> {{item.course.address}}</p>
                </div>
            </div>
        </div>
        <div class="text-center" v-if="!loading && !lessons.length">
            <p><strong class="text-green">No Upcoming Lesson Found</strong></p>
        </div>
    </b-card>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
    props: {
        loading: {
            type: Boolean,
            default: false
        }
    },
    computed: {
      ...mapGetters(['getLessons']),
      lessons() {
        if(this.getLessons.length) {
          return this.getLessons.sort((a,b) => new Date(b.startDate) - new Date(a.startDate))
        }
        return []
      }
    },
    methods: {
        getColor() {
            return Math.floor(Math.random()*16777215).toString(16);
        },
    }
}
</script>

<style scoped>

</style>