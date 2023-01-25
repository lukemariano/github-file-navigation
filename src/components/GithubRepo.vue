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
    <template>
      <v-row justify="center">
        <v-expansion-panels v-if="userInfo" :value="0" accordion>
          <v-expansion-panel>
            <v-expansion-panel-header>
              <span><strong>User info:</strong> {{ userInfo.login }}</span>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <div>
                <v-row>
                  <v-col cols="6">
                    <v-img
                      max-height="210"
                      max-width="238"
                      :src="userInfo.avatar_url"
                    ></v-img>
                    <span class="mt-5">
                      <strong>Name:</strong> {{ userInfo.name }}</span
                    >
                  </v-col>
                  <v-col cols="6">
                    <ul>
                      <li>
                        <strong>Location:</strong> {{ userInfo.location }}
                      </li>
                      <li v-if="userInfo.company">
                        <strong>Company:</strong> {{ userInfo.company }}
                      </li>
                      <li><strong>Bio:</strong> {{ userInfo.bio }}</li>
                      <li>
                        <strong>Repos:</strong> {{ userInfo.public_repos }}
                      </li>
                      <li>
                        <strong>Followers:</strong> {{ userInfo.followers }}
                      </li>
                    </ul>
                  </v-col>
                </v-row>
              </div>
            </v-expansion-panel-content>
          </v-expansion-panel>
          <v-expansion-panel>
            <v-expansion-panel-header>Repo info</v-expansion-panel-header>
            <v-expansion-panel-content>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-row>
    </template>
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
    userInfo: null,
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

    async searchUserInfo() {
      const data = await api.getUserInfo(this.user);
      this.userInfo = data;
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
        this.searchUserInfo();
      }
    },

    repo() {
      this.$emit("repoSelected", this.repo);
    },
  },
};
</script>
