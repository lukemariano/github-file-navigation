<template>
  <v-app>
    <v-app-bar app color="black" dark>
      <div class="d-flex align-center">
        <v-btn
          icon
          href="https://github.com/lukemariano/github-file-navigation"
          target="_blank"
        >
          <v-icon>mdi-github</v-icon></v-btn
        >

        <span class="text-h6"
          ><strong class=""> Github Vuewer - Lucas Mariano</strong></span
        >
      </div>

      <v-spacer></v-spacer>

      <v-btn
        icon
        href="https://www.linkedin.com/in/lucas-mariano-da-silva-luke/"
        target="_blank"
        ><v-icon>mdi-linkedin</v-icon></v-btn
      >
    </v-app-bar>

    <v-main>
      <GithubVuewer></GithubVuewer>
    </v-main>
  </v-app>
</template>

<script>
import GithubVuewer from "./components/GithubVuwer";

export default {
  name: "App",

  components: {
    GithubVuewer,
  },

  data: () => ({
    //
  }),
};
</script>
