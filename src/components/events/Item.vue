<template>
    <div @click="add()">
        <h3>{{day}}</h3>
        <v-list v-if="events.length">
            <v-list-tile
                    avatar v-for="event in events"
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
    </div>
</template>

<script>
  import moment from 'moment'
  export default {
    props: ['day', 'calendar', 'events'],
    name: "Item",
    methods: {
      add () {
        console.log('hadzia')
      },
      edit (event) {
        console.log(event)
      },
      formatDate (event) {
        let startDate = moment(event.start_date)
        let endDate = moment(event.end_date)

        return `${startDate.format('HH:MM')} - ${endDate.format('HH:MM')}`
      }
    }
  }
</script>

<style scoped>

</style>