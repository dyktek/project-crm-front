<template>
    <v-dialog
            v-model="show"
            fullscreen
            hide-overlay
            transition="dialog-bottom-transition"
            scrollable
    >
        <v-card tile>
            <v-form>
                <v-toolbar card dark color="primary">
                    <v-btn icon @click.native="show = false" dark>
                        <v-icon>close</v-icon>
                    </v-btn>
                    <v-toolbar-title>Dodaj event</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-toolbar-items>
                        <v-btn dark flat @click.native="show = false">Save</v-btn>
                    </v-toolbar-items>
                </v-toolbar>
                <v-card-text>
                    <v-text-field
                            label="Tytuł wydarzenia"
                            v-model="event.title"
                            required
                    ></v-text-field>

                    <v-text-field
                            label="Opis wydarzenia"
                            v-model="event.description"
                            required
                            :multi-line="true"
                    ></v-text-field>

                    <v-time-picker
                            v-model="event.start_date"
                            :landscape="true"
                            :full-width="true"
                            format="24hr"
                    />

                    <v-time-picker
                            v-model="event.end_date"
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
  export default {
    props: ['dialog'],
    name: "Manage",
    data () {
      return {
        show: false,
        event: {
          title: '',
          description: '',
          start_date: null,
          end_date: null
        }
      }
    },
    watch: {
      dialog () {
        this.show = this.dialog
      }
    }
  }
</script>

<style scoped>

</style>