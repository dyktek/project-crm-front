<template>
  <v-app>
    <v-navigation-drawer
            fixed
            clipped
            class="grey lighten-4"
            app
            v-model="drawer"
    >
      <v-list
              dense
              class="grey lighten-4"
      >
        <template v-for="(item, i) in items">
          <v-list-tile
                  :key="i"
                  :to="item.path"
          >
            <v-list-tile-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title class="grey--text">
                {{ item.text }}
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </template>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar color="primary" app absolute clipped-left>
      <v-toolbar-side-icon @click.native="drawer = !drawer"></v-toolbar-side-icon>
      <span class="title ml-3 mr-5">Dyktek&nbsp;<span class="text">CRM</span></span>
      <v-text-field
              solo-inverted
              flat
              label="Search"
              prepend-icon="search"
      ></v-text-field>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
  export default {
    data: () => ({
      drawer: null,
      items: [
        { icon: 'settings', text: 'Lista ról', path: '/roles' },
        { icon: 'settings', text: 'Lista użytkowników', path: '/users' },
        { icon: 'settings', text: 'Lista wydarzen', path: '/events' }
      ]
    }),
    props: {
      source: String
    }
  }
</script>

<style>
  #keep main .container {
    height: 660px;
  }

  .navigation-drawer__border {
    display: none;
  }

  .text {
    font-weight: 400;
  }
</style>