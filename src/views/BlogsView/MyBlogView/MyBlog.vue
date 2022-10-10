<template src="@/views/BlogsView/MyBlogView/MyBlog.html"></template>
<style scoped src="@/views/BlogsView/MyBlogView/MyBlog.css"></style>
<script>
import Blog from "@/components/Blog/Blog.vue";
import { useBlog } from "@/services/BlogService";
import { mapGetters } from "vuex";
export default {
  name: "MyBlobView",
  components: {
    Blog,
  },
  computed: {
    ...mapGetters(["get_user_id"]),
  },
  methods: {
    filteredList() {
      return this.Blogs?.filter((blog) => {
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
    const { getBlogByUserId } = await useBlog();
    this.Blogs = await getBlogByUserId(this.get_user_id);
  },
  mounted() {},
};
</script>
