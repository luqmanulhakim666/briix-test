<template>
  <q-input
    v-model="keyword"
    standout
    rounded
    placeholder="Search here..."
    dense
    @update:model-value="onEmitSearch"
  >
    <template v-slot:prepend>
      <q-icon name="search" />
    </template>
  </q-input>
</template>

<script>
export default {
  data: () => ({
    keyword: "",
  }),

  created() {
    const params = this.$route.query;
    this.keyword = params.keyword;

    if (params.keyword) {
      this.onEmitSearch();
    }
  },

  methods: {
    onEmitSearch() {
      this.$emit("on:search", this.keyword);
    },
  },
};
</script>
