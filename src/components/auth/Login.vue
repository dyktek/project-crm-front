<template>
    <v-content>
        <v-form @submit.prevent="login()">
            <v-text-field
                    label="E-mail"
                    v-model="loginData.email"
                    required
            ></v-text-field>

            <v-text-field
                    label="Password"
                    v-model="loginData.password"
                    required
            ></v-text-field>

            <v-btn type="submit" color="primary">Zaloguj</v-btn>
        </v-form>
    </v-content>
</template>

<script>
  import { mapGetters } from 'vuex'
    export default {
      data () {
        return {
          loginData: {
            email: '',
            password: ''
          }
        }
      },
      watch: {
        logged () {
          this.$router.push({path: '/roles'})
        }
      },
      computed: {
        ...mapGetters({
          logged: 'logged'
        })
      },
      methods: {
        login () {
            this.$store.dispatch('login', this.loginData)
        }
      }
    }
</script>