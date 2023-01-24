<template>
  <div>
    <h1>Find Your Repository:</h1>
    <v-row class="text-center">
      <v-col cols="6">
        <v-autocomplete
          v-model="user"
          :items="userList"
          :loading="userLoading"
          :search-input.sync="searchUser"
          item-text="login"
          label="Find GitHub User"
          prepend-icon="mdi-database-search"
        >
          <template v-slot:item="data">
            <v-list-item-avatar>
              <v-img :src="data.item.avatar_url"></v-img>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title v-html="data.item.login"></v-list-item-title>
            </v-list-item-content>
          </template>
        </v-autocomplete>
      </v-col>
      <v-col cols="6">
        <v-select
          v-model="repo"
          :items="repoList"
          :loading="repoLoading"
          item-text="name"
          label="Select Repository"
          return-object
          single-line
        ></v-select>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { deboucerDecorator } from "@/helpers/deboucer";
import { api } from "~api";

export default {
  name: "GithubRepo",

  data: () => ({
    user: null,
    repo: null,
    searchUser: null,
    repoList: [],
    userList: [],
    repoLoading: false,
    userLoading: false,
  }),

  methods: {
    getGithubUser: deboucerDecorator(async function () {
      // arrow function não passa o 'this' corretamente
      console.log(this.searchUser);
      this.userLoading = true;

      const data = await api.getUsers(this.searchUser);
      this.userList = data.items;
      this.userLoading = false;
    }, 500),

    async getRepository() {
      this.repoLoading = true;
      const data = await api.getRepos(this.user);
      this.repoList = data;

      this.repoLoading = false;
    },
  },

  watch: {
    searchUser() {
      // cada vez que eu digito ele chama essa função
      // se eu ficar digitando ele fica chamando e ela fica aguardando os 500 milisegundos
      // Ou seja, só chama a função de search se eu parar de digitar
      this.getGithubUser();
    },

    user() {
      if (this.user) {
        this.getRepository();
      }
    },

    repo() {
      this.$emit("repoSelected", this.repo);
    },
  },
};
</script>
