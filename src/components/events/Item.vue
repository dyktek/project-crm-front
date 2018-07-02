<template>
    <div class="cell" @click="add()">
        <h3>{{day}}</h3>
        <v-list v-if="eventsList.length">
            <v-list-tile
                    avatar v-for="event in eventsList"
                    :key="event.title"
                    @click.stop="edit(event)"
            >
                <v-list-tile-avatar>
                    <img :src="event.avatar">
                </v-list-tile-avatar>
                <v-list-tile-content>
                    <v-list-tile-title v-text="event.title"></v-list-tile-title>
                    <v-list-tile-sub-title v-html="formatDate(event)"></v-list-tile-sub-title>
                </v-list-tile-content>
            </v-list-tile>
        </v-list>

        <Manage :dialog="dialog" :day="`${calendar.year}-${calendar.month}-${dayFix}`"/>
    </div>
</template>

<script>
  import moment from 'moment'
  import Manage from '@/components/events/Manage'
  export default {
    components: {
      Manage
    },
    props: ['calendar', 'events'],
    name: "Item",
    data () {
      return {
        eventsList: [],
        day: 1,
        dialog: false,
        dayFix: 0
      }
    },
    methods: {
      add () {
        this.dialog = true
      },
      edit (event) {
        console.log(event)
      },
      formatDate (event) {
        let startDate = moment(event.start_date)
        let endDate = moment(event.end_date)

        return `${startDate.format('HH:MM')} - ${endDate.format('HH:MM')}`
      }
    },
    created () {
      this.day = this.$store.state.dayIterator
      this.eventsList = this.events(this.day)
      this.$store.state.dayIterator++

      if(this.day < 10) {
        this.dayFix = `0${this.day}`
      } else {
        this.dayFix = `${this.day}`
      }
    }
  }
</script>

<style scoped>
    .cell{
        height: 18vh;
        width: 12vw;
        border: 1px solid #ccc;
        font-size: 11px;
        background: #f5f5f5;
    }
</style>
