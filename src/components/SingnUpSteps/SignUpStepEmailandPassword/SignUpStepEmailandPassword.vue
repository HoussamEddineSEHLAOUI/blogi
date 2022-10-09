<template
  src="@/components/SingnUpSteps/SignUpStepEmailandPassword/SignUpStepEmailandPassword.html"
></template>
<style
  scoped
  src="@/components/SingnUpSteps/SignUpStepEmailandPassword/SignUpStepEmailandPassword.css"
></style>
<script>
export default {
  name: "SignUpStepEmailandPassword",
  props: ["email", "password"],
  emits: ["setInputEmail", "setInputPassword", "gotostep"],
  components: {},
  methods: {},
  computed: {},
  mounted() {},
};
</script>
