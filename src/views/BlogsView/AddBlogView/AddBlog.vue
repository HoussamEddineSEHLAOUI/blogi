<template src="@/views/BlogsView/AddBlogView/AddBlog.html"></template>
<style scoped src="@/views/BlogsView/AddBlogView/AddBlog.css"></style>
<script>
import AddVideo from "@/components/AddVideo/AddVideo.vue";
import UpdateVideo from "@/components/UpdateVideo/UpdateVideo.vue";
import { mapGetters, mapMutations } from "vuex";
import { useBlog } from "@/services/BlogService";
const { addBlog } = useBlog();
export default {
  name: "AddBlogView",
  components: {
    AddVideo,
    UpdateVideo,
  },
  computed: {
    ...mapGetters(["blog", "user", "verifieIfTherIsCurrentBlog"]),
  },
  methods: {
    ...mapMutations([
      "setInputTitle",
      "setInputDescription",
      "addVideoToBlog",
      "deleteVideoOfBlog",
      "updateVideoOfBlog",
    ]),
    gotostep(pageid) {
      this.pageid = pageid;
    },
    AddBlog() {
      addBlog(this.user.data?.uid, this.blog).then(() => {
        this.$router.push("/");
        this.$store.commit("clearBlog");
      });
    },
  },
  data() {
    return {
      pageid: 1,
    };
  },
  created() {
    if (this.verifieIfTherIsCurrentBlog) {
      this.gotostep(2);
    }
  },
  mounted() {},
};
</script>
