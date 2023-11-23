<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <AppBar @toggleLeftDrawer="toggleLeftDrawer()" />
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <SideBar :menus="menus" />
    </q-drawer>

    <q-page-container class="bg-dark">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from "vue";
import { MENUS } from "/data/menus";
import AppBar from "src/components/AppBar.vue";
import SideBar from "src/components/SideBar.vue";

export default defineComponent({
  name: "MainLayout",

  components: {
    AppBar,
    SideBar,
  },

  setup() {
    const leftDrawerOpen = ref(false);

    return {
      menus: MENUS,
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
});
</script>
