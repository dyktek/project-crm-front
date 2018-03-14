<template>
    <div>
        <v-btn to="/role/create" color="success">Dodaj role</v-btn>
        <v-data-table
                :headers="headers"
                :items="items"
                hide-actions
                class="elevation-1"
        >
            <template slot="items" slot-scope="props">
                <td>{{ props.item.id }}</td>
                <td>{{ props.item.name }}</td>
                <td><v-btn :to="`/role/${props.item.id}`" color="primary">Edit</v-btn></td>
                <td><v-btn @click="deleteitem(props.item.id)" color="danger">Delete</v-btn></td>
            </template>
        </v-data-table>

    </div>
</template>

<script>
    export default {
      name: 'roles-list',
      data () {
        return {
          headers: [
            { text: 'Id', value: 'id' },
            { text: 'Name', value: 'name' },
            { text: 'Edit', sortable: false },
            { text: 'Delete', sortable: false }
          ],
          items: []
        }
      },
      methods: {
        getItems () {
          axios('roles')
            .then(result => this.items = result.data.data)
        },
        deleteitem (id) {
          axios.delete(`/roles/${id}`)
            .then(() => {
              this.getItems()
            })
        }
      },
      created () {
        this.getItems()
      }
    }
</script>