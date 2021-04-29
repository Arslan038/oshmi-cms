<template>
    <b-card >
        <FullCalendar :options="calendarOptions" />
    </b-card>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
import FullCalendar from '@fullcalendar/vue'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
export default {
    components: {
        FullCalendar
    },
    computed: {
        ...mapGetters(['getLessons']),
    },
    watch: {
        getLessons(val) {
            this.setCalendar()
        },
    },
    methods: {
        async setCalendar() {
            this.calendarOptions.events = []
            await this.getLessons.forEach(item => {

            const event = {
                title: item.name,
                start: item.startDate.split('T')[0],
                end: item.endDate.split('T')[0]
            }
            this.calendarOptions.events = [...this.calendarOptions.events, event]
            })
        },
    },
    data() {
        return {
            calendarOptions: {
                plugins: [ dayGridPlugin, interactionPlugin ],
                initialView: 'dayGridMonth',
                events: [],
            }
        }
    }
}
</script>

<style scoped>
.fc-time-grid-event{
  background:white !important;
  padding-left: 10px !important;
  border-color:white !important;
  border-left: 2px solid #117a8b !important;
  
}
.fc-day-grid-event{
  background:yellow !important;
  padding-left: 10px !important;
  border-color:white !important;
  border-left: 2px solid #117a8b !important;
  
}
.fc-event{
  background: #008001 !important;
  color:white !important;
}
</style>