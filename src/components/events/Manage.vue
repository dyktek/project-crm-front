<template>
    <v-dialog
            v-model="show"
            fullscreen
            hide-overlay
            transition="dialog-bottom-transition"
            scrollable
    >
        <v-card tile>
            <v-form ref="form" v-model="valid" @submit.prevent="save()">
                <v-toolbar card dark color="primary">
                    <v-btn icon @click.native="show = false" dark>
                        <v-icon>close</v-icon>
                    </v-btn>
                    <v-toolbar-title>Dodaj event</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-toolbar-items>
                        <v-btn dark type="submit" flat>Save</v-btn>
                    </v-toolbar-items>
                </v-toolbar>
                <v-card-text>
                    <v-text-field
                            label="Tytuł wydarzenia"
                            v-model="item.title"
                            required
														:rules="titleRules"
                    ></v-text-field>

                    <v-text-field
                            label="Opis wydarzenia"
                            v-model="item.description"
                            :multi-line="true"
                    ></v-text-field>

                    <v-alert
                        v-if="!startDateStatus"
                        :value="true"
                        type="error"
                      >
                      Data musi byc
                    </v-alert>
                    <v-time-picker
                            v-model="item.start_date"
                            :landscape="true"
                            :full-width="true"
                            format="24hr"
                    />

                    <v-alert
                        v-if="!endDateStatus"
                        :value="true"
                        type="error"
                      >
                      Data musi byc
                    </v-alert>
                    <v-time-picker
                            v-model="item.end_date"
                            :landscape="true"
                            :full-width="true"
                            format="24hr"
                    />
                </v-card-text>

            </v-form>

            <div style="flex: 1 1 auto;"></div>
        </v-card>
    </v-dialog>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    props: ['dialog', 'day'],
    name: "Manage",
    data () {
      return {
				show: false,
				valid: false,
				titleRules: [
					v => !!v || 'Title is required'
				],
        item: {
          title: '',
          description: '',
          start_date: null,
          end_date: null,
          user_id: 2
        },
        startDateStatus: true,
        endDateStatus: true,
      }
    },
    computed: {
      ...mapGetters({
        event: 'event',
        refresh_2: 'refresh_2'
      })
    },
    watch: {
      dialog () {
        this.show = this.dialog
      },
      refresh_2() {
        this.show = false
      }
    },
    methods: {
        save () {
          this.startDateStatus = /^[0-9]{2}\:[0-9]{2}$/.test(this.item.start_date)
          this.endDateStatus = /^[0-9]{2}\:[0-9]{2}$/.test(this.item.end_date)

          if(this.$refs.form.validate() && this.startDateStatus && this.endDateStatus) {

            this.item.start_date = `${this.day} ${this.item.start_date}:00`
            this.item.end_date = `${this.day} ${this.item.end_date}:00`

            this.$store.dispatch('storeEvent', this.item)

          }

        }
    }
  }
</script>

<style scoped>

</style>
