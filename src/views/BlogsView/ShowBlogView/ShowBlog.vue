<template src="@/views/BlogsView/ShowBlogView/ShowBlog.html"></template>
<style scoped src="@/views/BlogsView/ShowBlogView/ShowBlog.css"></style>
<script>
import { useBlog } from "@/services/BlogService";
const { getBlogById } = useBlog();
export default {
  name: "ShowBlogView",
  components: {},
  methods: {},
  data() {
    return {
      blog: null,
    };
  },
  created() {
    const idBlog = this.$route.query?.id;
    getBlogById(idBlog).then((data) => (this.blog = data));
  },
  mounted() {},
};
</script>
