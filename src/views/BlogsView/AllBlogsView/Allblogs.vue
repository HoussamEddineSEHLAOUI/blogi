<template src="@/views/BlogsView/AllBlogsView/Allblogs.html"></template>
<style scoped src="@/views/BlogsView/AllBlogsView/Allblogs.css"></style>
<script>
import { useBlog } from "@/services/BlogService";
export default {
  name: "DashbordView",
  components: {},
  methods: {
    filteredList() {
      return this.Blogs.filter((blog) => {
        return blog.title.toLowerCase().includes(this.search.toLowerCase());
      });
    },
  },
  data() {
    return {
      search: "",
      Blogs: [],
    };
  },
  created() {
    const { Blogs } = useBlog();
    this.Blogs = Blogs;
  },
  mounted() {},
};
</script>
