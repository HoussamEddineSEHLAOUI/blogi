<template src="@/layouts/DashboardView/Dashboard.html"></template>
<style scoped src="@/layouts/DashboardView/Dashboard.css"></style>
<script>
import NavbarVue from "@/components/NavBar/Navbar.vue";
export default {
  name: "DashbordView",
  components: {
    NavbarVue,
  },
  methods: {
    filteredList() {
      return this.ListBlogs.filter((blog) => {
        return blog.title.toLowerCase().includes(this.search.toLowerCase());
      });
    },
  },
  data() {
    return {
      search: "",
    };
  },
  mounted() {},
};
</script>
