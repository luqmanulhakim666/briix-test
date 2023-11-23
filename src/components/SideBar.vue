<template>
  <q-list>
    <q-item-label header> Menus </q-item-label>
    <q-item
      clickable
      v-for="(menu, index) in menus"
      :key="index"
      :to="menu.link"
    >
      <q-item-section v-if="menu.icon" avatar>
        <q-icon :name="menu.icon" />
      </q-item-section>

      <q-item-section>
        <q-item-label>{{ menu.title }}</q-item-label>
      </q-item-section>
    </q-item>
  </q-list>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "SideBar",
  props: {
    menus: Array,
  },
});
</script>
