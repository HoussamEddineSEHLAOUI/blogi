<template src="@/components/UpdateVideo/UpdateVideo.html"></template>
<style scoped src="@/components/UpdateVideo/UpdateVideo.css"></style>
<script>
import {
  validateHhMm,
  validateDurationOfVideo,
  getSecondsFromTime,
  convertSecondsToString,
} from "@/utils";
export default {
  name: "UpdateVideo",
  props: ["file", "index"],
  emits: ["updateVideoOfBlog", "deleteVideoOfBlog"],
  components: {},
  methods: {
    validateInputStart() {
      if (validateHhMm(this.start)) {
        this.messageValidateStart = "";
        return true;
      } else {
        this.messageValidateStart = "Please inter validate start time 00:00:00";
        return false;
      }
    },
    validateInputEnd() {
      if (validateHhMm(this.end)) {
        this.messageValidateEnd = "";
        return true;
      } else {
        this.messageValidateEnd =
          "Please inter validate End time like 00:00:00";
        return false;
      }
    },
    async validateIntervalTime() {
      // Get data of the video :
      const startInSeconds = await getSecondsFromTime(this.start);
      const endInSeconds = await getSecondsFromTime(this.end);
      if (
        await validateDurationOfVideo(
          this.file?.duration,
          startInSeconds,
          endInSeconds
        )
      ) {
        this.messageValidetInterval = "";
        return true;
      } else {
        this.messageValidetInterval =
          "Please inter validate interval [ start , end ]";
        return false;
      }
    },
    async updateVideo() {
      if (
        (await this.validateInputStart()) &&
        (await this.validateInputEnd()) &&
        (await this.validateIntervalTime())
      ) {
        const file = {
          flag: this.flag,
          start: this.start,
          end: this.end,
          duration: this.file?.duration,
          video: this.video,
        };
        await alert("Videos updated successfully !");
        await this.$emit("updateVideoOfBlog", {
          index: this.index,
          file: file,
        });
      } else {
        console.log("ADD CORRECT VALUE");
      }
    },
  },
  data() {
    return {
      flag: "",
      start: 0,
      end: 1,
      duration: 0,
      video: null,
      messageValidateStart: "",
      messageValidateEnd: "",
      messageValidetInterval: "",
    };
  },
  created() {
    this.flag = this.file?.flag;
    this.start = this.file?.start;
    this.end = this.file?.end;
    this.duration = convertSecondsToString(this.file?.duration);
    this.video = this.file?.video;
  },
  mounted() {},
};
</script>
