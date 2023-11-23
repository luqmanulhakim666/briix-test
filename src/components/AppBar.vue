<template>
  <q-header elevated>
    <q-toolbar class="bg-primary">
      <q-toolbar-title>
        <div class="row items-center">
          <q-icon
            :name="meta.child ? 'arrow_back' : ''"
            class="pointer q-mr-md"
            @click="onGoBack()"
          />
          {{ meta.title }}
        </div>
      </q-toolbar-title>

      <q-btn
        flat
        dense
        round
        icon="menu"
        aria-label="Menu"
        @click="onEmitToggleLeftDrawer"
      />
    </q-toolbar>
  </q-header>
</template>

<script>
export default {
  computed: {
    meta() {
      return this.$store.state.meta;
    },
  },

  methods: {
    onEmitToggleLeftDrawer() {
      this.$emit("toggleLeftDrawer");
    },

    onGoBack() {
      this.$router.go(-1);
    },
  },
};
</script>
