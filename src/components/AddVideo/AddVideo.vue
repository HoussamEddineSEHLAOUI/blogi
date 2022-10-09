<template src="@/components/AddVideo/AddVideo.html"></template>
<style scoped src="@/components/AddVideo/AddVideo.css"></style>
<script>
import {
  validateHhMm,
  loadVideo,
  validateDurationOfVideo,
  getSecondsFromTime,
  convertSecondsToString,
} from "@/utils";
export default {
  name: "AddViedo",
  components: {},
  emits: ["addVideoToBlog"],
  methods: {
    async previewVideo(event) {
      this.video = await event.target.files[0];
      this.duration = await this.getDurationOfTheVideo();
      this.end = await convertSecondsToString(this.duration);
    },
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
      // Get data :
      const startInSeconds = await getSecondsFromTime(this.start);
      const endInSeconds = await getSecondsFromTime(this.end);
      if (
        await validateDurationOfVideo(
          this.duration,
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
    async getDurationOfTheVideo() {
      const video = await loadVideo(this.video);
      return video.duration;
    },
    async uploadVideo() {
      if (
        (await this.validateIntervalTime()) &&
        (await this.validateInputStart()) &&
        (await this.validateInputEnd())
      ) {
        const file = {
          flag: this.flag,
          start: this.start,
          end: this.end,
          duration: this.duration,
          video: this.video,
        };
        this.$emit("addVideoToBlog", file);
      } else {
        console.log("ADD CORRECT VALUE");
      }
    },
  },
  data() {
    return {
      flag: "",
      start: "00:00:00",
      end: "",
      duration: 0,
      video: null,
      messageValidateStart: "",
      messageValidateEnd: "",
      messageValidetInterval: "",
    };
  },
  created() {},
  mounted() {},
};
</script>
