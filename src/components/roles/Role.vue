<template>
    <v-form @submit.prevent="save()" v-model="valid">
        <v-text-field
                label="Name"
                v-model="item.name"
                :rules="nameRules"
                required
        ></v-text-field>

        <v-btn type="submit" color="success">Zapisz role</v-btn>
    </v-form>
</template>

<script>
    import { mapGetters } from 'vuex'
    export default {
      name: 'role',
      data () {
        return {
          valid: false,
          nameRules: [
              v => !!v || 'Name is required'
          ]
        }
      },
      computed: {
        ...mapGetters({
          item: 'item',
          refresh: 'refresh'
        })
      },
      watch: {
        refresh () {
          this.$router.push({path: '/roles'})
        }
      },
      methods: {
        save () {
          if(!this.valid) {
            return
          }
          if(this.item.id) {
            this.$store.dispatch('updateItem', this.item)
          } else {
            this.$store.dispatch('storeItem', this.item)
          }
        }
      },
      created () {
        if(this.$route.params.id) {
          this.$store.dispatch('getItem', this.$route.params.id)
        }
      }
    }
</script>