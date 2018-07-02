<template>
    <div :key="listKey">
        <v-toolbar>
            <v-toolbar-title>
                <v-btn @click="changeMonth(false)">&laquo;</v-btn>
            </v-toolbar-title>
            <v-toolbar-title>{{currentDate}}</v-toolbar-title>
            <v-toolbar-title>
                <v-btn @click="changeMonth()">&raquo;</v-btn>
            </v-toolbar-title>
        </v-toolbar>
        <div class="grid-view">
            <div class="header-cell" v-for="(day, key) in eventsHeader" :key="key">
                {{day.name}}
            </div>

            <Item
                v-if="checkCalendar(i)"
                v-for="(i, key) in 42"
                :key="`${key}-${calendar.month}`"
                :calendar="calendar"
                :events="isEvent"
            />
            <div class="empty" v-else></div>
        </div>
    </div>
</template>

<script>
  import moment from 'moment'
  import { mapGetters } from 'vuex'
  import Item from '@/components/events/Item'
  export default {
    name: "List",
    components: {
      Item
    },
    data () {
      return {
        listKey: 0,
        calendar: {
          days: 0,
          day: 0,
          month: 0,
          year: 0
        },
        dayIterator: 0,
        eventsHeader: [
          {name: 'Poniedziałek'},
          {name: 'Wtorek'},
          {name: 'Środa'},
          {name: 'Czwartek'},
          {name: 'Piątek'},
          {name: 'Sobota'},
          {name: 'Niedziela'}
        ],
        daysNo: {
          mo: 1,
          tu: 2,
          we: 3,
          th: 4,
          fr: 5,
          sa: 6,
          su: 7
        }
      }
    },
    computed: {
      currentDate () {
        return `${this.calendar.year}-${this.calendar.month}-${this.calendar.day}`
      },
      ...mapGetters({
        events: 'events',
        refresh_2: 'refresh_2'
      })
    },
    watch: {
      events () {
        //this.$store.dispatch('items')
        // this.$nextTick(() => {
        //   console.log(1234)
        //   this.$forceUpdate()
        // });
        this.$store.state.dayIterator = 1
        this.listKey = ++this.listKey
      }
    },
    methods: {
      isEvent (day) {
        if(day < 10) {
          day = `0${day}`
        }
        let date = `${this.calendar.year}-${this.calendar.month}-${day}`

        return this.events.filter(event => {
          let startDate = moment(event.start_date)

          if(date == startDate.format('YYYY-MM-DD')) {
            return event
          }
        })
      },
      changeMonth (forward = true) {
        let month;
        let year = this.calendar.year
        if(forward) {
          if(this.calendar.month == '12') {
            year = moment(this.currentDate).add(1, 'year').year()
          }
          month = moment(this.currentDate).add(1, 'months')

        } else {
          if(this.calendar.month == '01') {
            year = moment(this.currentDate).subtract(1, 'year').year()
          }
          month = moment(this.currentDate).subtract(1, 'months')
        }
        this.calendar.month = month.format('MM')
        this.calendar.days = month.daysInMonth()
        this.calendar.year = year

        this.calendar.firstDayOfMonth = this.getNo(month.startOf('month').format('dd'))

        this.$store.state.dayIterator = 1
      },
      checkCalendar (i) {
        let tempDays = this.calendar.days + this.calendar.firstDayOfMonth

        return (i >= this.calendar.firstDayOfMonth && i <= tempDays)
      },
      getNo (day) {
        return this.daysNo[day.toLocaleLowerCase()]
      }
    },
    created () {
      const date = moment()
      this.calendar.days = date.daysInMonth()
      this.calendar.year = date.year()
      this.calendar.month = date.format('MM')
      this.calendar.day = date.format('DD')
      let month = moment(this.currentDate).add(1, 'months')
      this.calendar.firstDayOfMonth = this.getNo(date.startOf('month').format('dd'))

      this.$store.dispatch('events', {
        start_date: `${this.calendar.year}-${this.calendar.month}-${this.calendar.day}`,
        end_date: `${this.calendar.year}-${this.calendar.month}-${month.daysInMonth()}`
      })
    }
  }
</script>

<style scoped>
    .grid-view {
        display: grid;
        grid-template-columns: repeat(7, auto);
        width: 84vw;
    }
    .header-cell {
        color: #fff;
        text-align: center;
        font-family: monospace;
        font-size: 11px;
        padding: 5px;
        background: #000;
    }
    .empty {
        height: 18vh;
        border: 1px solid #ccc;
        background: #ffffff;
    }
</style>
