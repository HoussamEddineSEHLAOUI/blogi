<template src="@/views/BlogsView/UpdateBlogView/UpdateBlog.html"></template>
<style scoped src="@/views/BlogsView/UpdateBlogView/UpdateBlog.css"></style>
<script>
import { useBlog } from "@/services/BlogService";
import UpdateVideo from "@/components/UpdateVideo/UpdateVideo.vue";
import { convertSecondsToString } from "@/utils";
const { getBlogById, updateBlog } = useBlog();
export default {
  name: "UpdateBlogView",
  components: {
    UpdateVideo,
  },
  methods: {
    onUpdateblog() {
      updateBlog(this.blogid, this.blog);
    },
    deleteVideoOfBlog(index) {
      this.blog?.files?.splice(index, 1);
    },
    updateVideoOfBlog(index, file) {
      this.blog.files[index] = file;
    },
    async convertSecondsToStringLocal(value) {
      const duration = await convertSecondsToString(value);
      console.log(duration);
      return duration;
    },
  },
  data() {
    return {
      blogid: null,
      blog: null,
      fileToUpdate: null,
    };
  },
  async created() {
    const idBlog = await this.$route.query?.id;
    await getBlogById(idBlog).then((data) => (this.blog = data));
    this.blogid = idBlog;
    await console.log(this.blog);
  },
  mounted() {},
};
</script>
