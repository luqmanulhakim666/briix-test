<template>
  <q-page class="container">
    <div class="row justify-end q-my-lg">
      <q-btn
        v-if="!isCreated"
        outline
        color="red"
        class="q-mr-md"
        icon="delete"
        label="Delete"
        :disable="state.isLoading"
        @click="handleDialogConfirm()"
      />
      <q-btn
        color="primary"
        icon="save"
        label="Save"
        :loading="state.isLoading"
        @click="onSave()"
      />
    </div>

    <q-card flat class="q-pa-lg">
      <q-input
        label="Title"
        v-model="form.title"
        color="primary"
        placeholder="Search here..."
        outlined
        dense
        :rules="[(val) => (val && val.length > 0) || 'Please type something']"
      />

      <q-input
        label="Author"
        class="q-mt-lg"
        v-model="form.author"
        color="primary"
        placeholder="Search here..."
        outlined
        dense
      />

      <q-input
        class="q-mt-lg"
        label="Summary"
        v-model="form.summary"
        color="primary"
        placeholder="Search here..."
        outlined
        type="textarea"
        dense
      />

      <div class="row q-mt-lg">
        <div
          class="pointer"
          v-for="(tag, i) in tags"
          :key="i"
          @click="onSelectTag(tag)"
        >
          <q-chip
            :color="selectedTags(tag) ? 'red' : 'gray'"
            text-color="white"
          >
            {{ tag }}
          </q-chip>
        </div>
      </div>
    </q-card>

    <q-dialog persistent v-model="dialogConfirm">
      <q-card>
        <q-card-section>
          <div class="text-h6">Alert!</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          Are you sure to delete this data?
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancel" v-close-popup />
          <q-btn
            flat
            label="Delete"
            @click="onDelete"
            color="primary"
            v-close-popup
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { MOVIES, TAGS } from "/data/movies";
import { useQuasar } from "quasar";
import utils from "/src/mixins/utils.js";

export default {
  mixins: [utils],
  setup() {
    const $q = useQuasar();
    return {
      showNotif(message, color, icon) {
        $q.notify({
          message: message,
          color: color,
          icon: icon || "check",
          position: "top",
        });
      },
    };
  },
  data: () => ({
    form: {
      title: "",
      author: "",
      summary: "",
      tags: [],
    },
    tags: TAGS,
    dialogConfirm: false,
    state: {
      isLoading: false,
    },
  }),

  created() {
    if (!this.isCreated) {
      this.getOne();
    }
  },

  mounted() {
    const appBar = {
      title: this.isCreated ? "Create New Movie" : this.form.title,
      child: true,
    };

    this.$store.commit("SET_META", appBar);
  },

  computed: {
    isCreated() {
      return this.$route.params.slug === "create";
    },
  },

  methods: {
    getOne() {
      const slug = this.$route.params.slug;
      const item = MOVIES.find((x) => x.id === slug);

      if (!item?.id) {
        this.$router.push("/");
        return;
      }

      this.form = item;
    },

    onSave() {
      if (!this.form.title) {
        this.showNotif("Title is required", "red", "close");
        return;
      }
      this.state.isLoading = true;

      if (this.isCreated) {
        // create new data
        this.form["id"] = this.generateUUID();
        MOVIES.unshift(this.form);
      }

      if (!this.isCreated) {
        // update data
        const index = MOVIES.findIndex((x) => x.id === this.form.id);
        MOVIES[index] = this.form;
      }

      this.showNotif("Data Berhasil Disimpan", "green");

      setTimeout(() => {
        this.$router.push("/");
      }, 1000);
    },

    onDelete() {
      const index = MOVIES.findIndex((x) => x.id === this.form.id);
      MOVIES.splice(index, 1);
      this.showNotif("Data Berhasil Dihapus", "green");

      this.$router.push("/");
    },

    selectedTags(val) {
      return this.form.tags.includes(val);
    },

    onSelectTag(val) {
      const index = this.form.tags?.indexOf(val);

      if (index >= 0) {
        this.form.tags.splice(index, 1);
        return;
      }

      this.form.tags.push(val);
    },

    handleDialogConfirm() {
      this.dialogConfirm = !this.dialogConfirm;
    },
  },
};
</script>
