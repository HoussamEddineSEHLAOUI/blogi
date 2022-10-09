<template src="@/components/Blog/Blog.html"></template>
<style scoped src="@/components/Blog/Blog.css"></style>
<script>
import { useBlog } from "@/services/BlogService";
const { deleteBlog } = useBlog();
export default {
  name: "BloG",
  props: ["id", "title", "description", "videos"],
  components: {},
  methods: {
    onShow(id) {
      this.$router.push({
        path: "/show-blogs",
        name: "blog.show",
        query: {
          id: id,
        },
      });
    },
    onUpdate(id) {
      this.$router.push({
        path: "/update-blogs",
        name: "blog.update",
        query: {
          id: id,
        },
      });
    },
    onDelete(id) {
      if (confirm("Are you sure you want to delete this blog")) {
        deleteBlog(id);
      }
    },
  },
  data() {
    return {};
  },
  created() {},
  mounted() {},
};
</script>
