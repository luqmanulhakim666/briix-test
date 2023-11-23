<template>
  <q-page class="container">
    <div class="q-mt-lg">
      <SearchBar @on:search="onSearch" />
    </div>
    <div class="row">
      <template v-if="state.isLoading">
        <div
          class="col-md-4 col-xl-3 justify-center flex q-pa-md"
          v-for="i in 12"
          :key="i"
        >
          <MovieCardSkeleton />
        </div>
      </template>

      <template v-if="!state.isLoading">
        <div
          class="col-md-4 col-xl-3 justify-center flex q-pa-md"
          v-for="(item, index) in getMovies"
          :key="index"
        >
          <MovieCard
            :id="123"
            :title="item.title"
            :author="item.author"
            :tags="item.tags"
            :image="item.image"
            @on:detail="onAction(item.id)"
          />
        </div>
      </template>
    </div>

    <q-btn
      class="floating-btn"
      round
      color="primary"
      icon="add"
      @click="onAction()"
    />
  </q-page>
</template>

<script>
import MovieCard from "src/components/MovieCard.vue";
import SearchBar from "src/components/SearchBar.vue";
import MovieCardSkeleton from "src/components/skeleton/MovieCardSkeleton.vue";
import { MOVIES } from "/data/movies";

export default {
  components: { MovieCard, SearchBar, MovieCardSkeleton },
  name: "IndexPage",
  data: () => ({
    keyword: "",
    state: {
      isLoading: true,
    },
  }),

  created() {
    setTimeout(() => {
      this.state.isLoading = false;
    }, 500);
  },

  mounted() {
    this.$store.commit("SET_META", {
      title: "Movie Collections",
      child: false,
    });
  },

  computed: {
    getMovies() {
      const insensitive = new RegExp(this.keyword?.replace(/\\/g, "\\\\"), "i");
      return MOVIES.filter((section) => {
        return section.title.match(insensitive);
      });
    },
  },

  methods: {
    onSearch(val) {
      this.state.isLoading = true;
      setTimeout(() => {
        this.keyword = val;
        this.state.isLoading = false;
      }, 500);
      this.$router.push({ query: { keyword: val } });
    },
    onAction(id) {
      // create,delete,update page
      if (!id) {
        this.$router.push("/movie/create");
        return;
      }
      this.$router.push(`/movie/${id}`);
    },
  },
};
</script>

<style lang="scss" scoped>
.floating-btn {
  position: fixed;
  bottom: 24px;
  right: 44px;
}
</style>
