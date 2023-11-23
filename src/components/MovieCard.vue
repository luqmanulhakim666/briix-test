<template>
  <q-card class="movie_card shadow-3 pointer" @click="onEmitDetail()">
    <img
      class="movie_card-image"
      :src="image || '/src/assets/images/empty.jpg'"
      alt=""
    />

    <div class="q-ma-md">
      <p class="movie_card-title no-margin">{{ title }}</p>
      <p class="movie_card-author q-mt-n-lg">{{ author }}</p>
      <div class="movie_card-tags row">
        <div v-for="(tag, i) in tags" :key="i">
          <q-chip color="red" text-color="white">
            <template v-if="i < 2">{{ tag }}</template>
            <template v-if="i === 2">+{{ tags.length - i }}</template>
          </q-chip>
        </div>
      </div>
    </div>
  </q-card>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    id: {
      type: [String, Number],
      required: true,
    },
    image: {
      type: String,
    },
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
    },
    tags: {
      type: Array,
    },
  },

  methods: {
    onEmitDetail() {
      this.$emit("on:detail");
    },
  },
});
</script>

<style lang="scss" scoped>
.movie_card {
  background: white;
  color: #4a4a4a;
  width: 100%;

  &-image {
    object-fit: cover;
    height: 200px;
  }

  &-title {
    font-size: 1.2rem;
    font-weight: 600;
  }
}
</style>
