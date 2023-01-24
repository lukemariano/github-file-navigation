<template>
  <v-container>
    <GithubRepo @repoSelected="onRepoSelected"></GithubRepo>
    <GithubContent :repo="repo"> </GithubContent>
    <!-- <GitHubIssues :repo="repo"></GitHubIssues> -->
  </v-container>
</template>

<script>
import GithubRepo from "@/components/GithubRepo.vue";
import GitHubIssues from "@/components/GitHubIssues.vue";
import GithubContent from "@/components/GithubContent.vue";

export default {
  name: "GithubVuewer",

  components: {
    GithubRepo,
    GithubContent,
    // GitHubIssues,
  },
  data: () => ({
    repo: null,
  }),
  methods: {
    onRepoSelected(repo) {
      this.repo = repo;
    },
  },
};
</script>
