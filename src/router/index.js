import { createRouter, createWebHistory } from "vue-router";
import store from "../store";
// Layouts
const Dashboard = () => import("@/layouts/DashboardView/Dashboard.vue");
const AuthLayout = () => import("@/layouts/AuthLayout/AuthLayout.vue");
// Blogs
const AddBlog = () => import("@/views/BlogsView/AddBlogView/AddBlog.vue");
const AllBlogs = () => import("@/views/BlogsView/AllBlogsView/Allblogs.vue");
const MyBlog = () => import("@/views/BlogsView/MyBlogView/MyBlog.vue");
const ShowBlog = () => import("@/views/BlogsView/ShowBlogView/ShowBlog.vue");
const UpdateBlog = () =>
  import("@/views/BlogsView/UpdateBlogView/UpdateBlog.vue");
// Auth
const Signin = () => import("@/views/AuthenticationView/SignInView/Signin.vue");
const Signup = () => import("@/views/AuthenticationView/SignUpView/Signup.vue");
// Child route
const childRoutes = (prop) => [
  {
    path: "/",
    name: prop + ".all",
    meta: { auth: true, name: "all blogs" },
    component: AllBlogs,
    beforeEnter: () => {
      if (!store.getters.isLoggedIn) return "/signin";
    },
  },
  {
    path: "add-blog",
    name: prop + ".add",
    meta: { auth: true, name: "add blogs" },
    component: AddBlog,
    beforeEnter: () => {
      if (!store.getters.isLoggedIn) return "/signin";
    },
  },
  {
    path: "my-blogs",
    name: prop + ".my",
    meta: { auth: true, name: "my blogs" },
    component: MyBlog,
    beforeEnter: () => {
      if (!store.getters.isLoggedIn) return "/signin";
    },
  },
  {
    path: "show-blog",
    name: prop + ".show",
    meta: { auth: true, name: "show blog" },
    component: ShowBlog,
    beforeEnter: () => {
      if (!store.getters.isLoggedIn) return "/signin";
    },
  },
  {
    path: "update-blogs",
    name: prop + ".update",
    meta: { auth: true, name: "update blog" },
    component: UpdateBlog,
    beforeEnter: () => {
      if (!store.getters.isLoggedIn) return "/signin";
    },
  },
];
const authChildRoutes = (prop) => [
  {
    path: "/signin",
    name: prop + ".sign-in1",
    meta: { auth: true },
    component: Signin,
  },
  {
    path: "/signup",
    name: prop + ".sign-up1",
    meta: { auth: true },
    component: Signup,
  },
];
const routes = [
  {
    path: "/",
    name: "blog",
    component: Dashboard,
    children: childRoutes("blog"),
  },
  {
    path: "/auth",
    name: "user",
    component: AuthLayout,
    children: authChildRoutes("user"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
