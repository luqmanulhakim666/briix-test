import IndexPage from "pages/IndexPage.vue";
import SlugPage from "src/pages/_slug.vue";
import MainLayout from "layouts/MainLayout.vue";

const routes = [
  {
    path: "/",
    component: MainLayout,
    children: [
      {
        path: "",
        component: IndexPage,
      },
      {
        path: "/movie/:slug",
        name: "Detail",
        component: SlugPage,
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
