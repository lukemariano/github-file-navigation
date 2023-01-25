<!-- https://api.github.com/repos/OWNER/REPO/contents/PATH -->

<template>
  <div>
    <v-row class="text-center">
      <v-col cols="12">
        <div></div>
        <template>
          <v-row justify="center">
            <v-expansion-panels v-if="repo" :value="0" accordion>
              <v-expansion-panel>
                <v-expansion-panel-header>
                  <span><strong>Repository:</strong> {{ repo.name }}</span>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <span v-if="currentPath" class="text-left mb-3 mt-3"
                    >Path Navigation: <strong>{{ currentPath }}</strong></span
                  >
                  <template>
                    <v-simple-table>
                      <template v-slot:default>
                        <thead>
                          <tr>
                            <th class="text-left">Files</th>
                            <th class="text-left">File Type</th>
                            <th class="text-left">Path</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="content in files" :key="content.number">
                            <td class="text-left" v-if="content.type == 'dir'">
                              <v-btn
                                x-small
                                color="primary"
                                @click="getNewPath(content.path)"
                              >
                                <v-icon>mdi-folder</v-icon> {{ content.name }}
                              </v-btn>
                            </td>
                            <td v-else class="text-left">
                              <v-icon>mdi-file</v-icon> {{ content.name }}
                            </td>
                            <td class="text-left">{{ content.type }}</td>
                            <td class="text-left" v-if="currentPath">
                              {{ currentPath }}
                            </td>
                            <td class="text-left" v-else>./</td>
                          </tr>
                        </tbody>
                      </template>
                    </v-simple-table>
                  </template>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
          </v-row>
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
    <v-row>
      <v-btn v-if="newPath.length > 0" class="mb-5" @click="back">
        Voltar
      </v-btn>
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
    newPath: [],
    loading: false,
    currentPath: null,
  }),

  methods: {
    async listFiles() {
      this.loading = true;
      this.files = await api.getFiles(this.repo.owner.login, this.repo.name);
      this.loading = false;
    },

    async getNewPath(path) {
      this.loading = true;
      this.files = await api.getNewPath(
        this.repo.owner.login,
        this.repo.name,
        path
      );

      this.newPath.push(path);
      this.currentPath = path;
      this.loading = false;
    },

    async back() {
      this.loading = true;
      this.newPath.pop();
      let pastPath =
        this.newPath.length == 1 ? this.newPath[0] : this.newPath[-1];
      if (pastPath == undefined) {
        pastPath = "";
      }
      this.files = await api.getNewPath(
        this.repo.owner.login,
        this.repo.name,
        pastPath
      );

      this.currentPath = pastPath;
      this.loading = false;
    },
  },

  watch: {
    repo() {
      this.newPath = [];
      this.currentPath = null;
      this.listFiles();
    },

    files() {},
  },
};
</script>
