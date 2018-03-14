<template>
    <v-form @submit.prevent="save()" v-model="valid">
        <v-text-field
                label="Name"
                v-model="role.name"
                :rules="nameRules"
                required
        ></v-text-field>

        <v-btn type="submit" color="success">Zapisz role</v-btn>
    </v-form>
</template>

<script>
    export default {
      name: 'role',
      data () {
        return {
          valid: false,
          role: {
            id: null,
            name: ''
          },
          nameRules: [
              v => !!v || 'Name is required'
          ]
        }
      },
      methods: {
        save () {
          if(!this.valid) {
            return
          }

          if(this.role.id) {
            axios.put(`/roles/${this.role.id}`, this.role)
              .then(() => this.$router.push({path: '/roles'}))
          } else {
            axios.post('roles', this.role)
              .then(() => this.$router.push({path: '/roles'}))
          }
        }
      },
      created () {
        if(this.$route.params.id) {
          axios(`/roles/${this.$route.params.id}`)
            .then(result => this.role = result.data.data)
        }
      }
    }
</script>