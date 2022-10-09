<template src="@/views/BlogsView/MyBlogView/MyBlog.html"></template>
<style scoped src="@/views/BlogsView/MyBlogView/MyBlog.css"></style>
<script>
import Blog from "@/components/Blog/Blog.vue";
import { useBlog } from "@/services/BlogService";
export default {
  name: "MyBlobView",
  components: {
    Blog,
  },
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
  async created() {
    const { getBlogByUserId } = useBlog();
    this.Blogs = await getBlogByUserId("d4dnCZGNQ0VaMwKxrZtuHROWGmH2");
  },
  mounted() {},
};
</script>
