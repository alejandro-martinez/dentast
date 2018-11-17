<template>
  <div id="user-list" class="mainbox col-12">
    <vue-scrolling-table
      :scroll-horizontal="false"
      :scroll-vertical="true"
      :sync-header-scroll="true"
      :sync-footer-scroll="true">
    <template slot="thead">
      <tr>
        <th v-for="col in userColumns" :key="col">{{ col }}</th>
      </tr>
    </template>
    <template slot="tbody">
      <tr v-for="user in users" :key="user._id" @click="editUser(user)">
        <td v-for="col in userColumnKeys" :key="col">
          {{ user[col] }}
        </td>
      </tr>
    </template>
    </vue-scrolling-table>
  </div>
</template>

<style scoped>
table tbody {
  max-height: 80vh !important;
}
table tbody tr {
  cursor: pointer;
}
</style>

<script>
/* eslint no-underscore-dangle: 0 */
import VueScrollingTable from 'vue-scrolling-table';
import { getAllUsers } from './user-service';

export default {
  name: 'User',
  components: {
    VueScrollingTable,
  },
  created() {
    this.userColumns = ['Num afiliado', 'Nombre', 'Edad', 'Sexo', 'Obra social', 'Direccion', 'Localidad', 'Tel'];
    this.userColumnKeys = ['afiliateNum', 'name', 'age', 'sex', 'medicalCoverage', 'address', 'city', 'sex', 'tel'];
    getAllUsers().then((users) => {
      this.$set(this, 'users', users);
    });
  },
  data() {
    return {
      users: [],
    };
  },
  methods: {
    editUser(user) {
      this.$router.push({
        name: 'UserEdit',
        params: { id: user._id },
      });
    },
  },
};
</script>
