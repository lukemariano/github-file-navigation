<!-- https://api.github.com/repos/OWNER/REPO/contents/PATH -->

<template>
  <div>
    <v-row class="text-center">
      <v-col cols="12">
        <template>
          <v-simple-table>
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left">Repository Files</th>
                  <th class="text-left">File Type</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="content in files" :key="content.number">
                  <td class="text-left" v-if="content.type == 'dir'">
                    <v-btn x-small color="primary"> {{ content.name }} </v-btn>
                  </td>
                  <td v-else class="text-left">{{ content.name }}</td>
                  <td class="text-left">{{ content.type }}</td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </template>
      </v-col>
    </v-row>
    <v-row class="justify-center">
      <v-progress-circular
        v-show="loading"
        indeterminate
        color="primary"
      ></v-progress-circular>
    </v-row>
  </div>
</template>

<script>
import { api } from "~api";

export default {
  name: "GithubContent",
  props: ["repo"],
  data: () => ({
    files: [],
    loading: false,
  }),

  methods: {
    async listFiles() {
      this.loading = true;
      this.files = await api.getFiles(this.repo.owner.login, this.repo.name);
      this.loading = false;
    },
  },

  watch: {
    repo() {
      this.listFiles();
    },

    files() {},
  },
};
</script>
