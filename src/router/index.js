import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("@/pages/mainHome.vue"),
  },
  {
    path: "/about",
    name: "about",
    component: () => import("@/pages/about.vue"),
  },
  {
    path: "/projects",
    name: "projects",
    component: () => import("@/pages/projects.vue"),
  },
  {
    path: "/services",
    name: "services",
    component: () => import("@/pages/services.vue"),
  },
  {
    path: "/skills",
    name: "skills",
    component: () => import("@/pages/skills.vue"),
  },
  {
    path: "/contact",
    name: "contact",
    component: () => import("@/pages/contact.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,

   scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      // Brauzer orqaga/oldinga bosganda oldingi pozitsiyani saqlaydi
      return savedPosition;
    }
    // Har doim sahifa tepasiga smooth scroll
    return { top: 0, behavior: "smooth" };
  },
});

export default router;