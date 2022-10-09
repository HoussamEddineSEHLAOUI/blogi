<template
  src="@/components/SingnUpSteps/SignUpStepUserInfo/SignUpStepUserInfo.html"
></template>
<style
  scoped
  src="@/components/SingnUpSteps/SignUpStepUserInfo/SignUpStepUserInfo.css"
></style>
<script>
export default {
  name: "SignUpStepUserInfo",
  props: ["name", "imageUser", "phoneNumber"],
  emits: [
    "setInputName",
    "setInputPhone",
    "setInputImage",
    "gotostep",
    "register",
  ],
  data() {
    return {
      image: require("@/assets/images/profile.png"),
    };
  },
  components: {},
  methods: {
    previewImage: function (event) {
      const input = event.target;
      if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.image = e.target.result;
          this.$emit("setInputImage", input.files[0]);
        };
        reader.readAsDataURL(input.files[0]);
      }
    },
  },
  computed: {},
  mounted() {},
};
</script>
