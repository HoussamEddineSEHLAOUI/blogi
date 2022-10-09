<template src="@/views/AuthenticationView/SignUpView/Signup.html"></template>
<style scoped src="@/views/AuthenticationView/SignUpView/Signup.css"></style>
<script>
import SignUpStepEmailandPassword from "@/components/SingnUpSteps/SignUpStepEmailandPassword/SignUpStepEmailandPassword.vue";
import SignUpStepUserInfo from "@/components/SingnUpSteps/SignUpStepUserInfo/SignUpStepUserInfo.vue";
export default {
  name: "SignUp",
  components: {
    SignUpStepEmailandPassword,
    SignUpStepUserInfo,
  },
  methods: {
    gotostep(pageid) {
      this.pageid = pageid;
    },
    setInputEmail(value) {
      this.email = value;
    },
    setInputPassword(value) {
      this.password = value;
    },
    setInputName(value) {
      this.name = value;
    },
    setInputPhone(value) {
      this.phoneNumber = value;
    },
    setInputImage(file) {
      this.imageUser = file;
    },
    async register() {
      try {
        await this.$store.dispatch("register", {
          email: this.email,
          password: this.password,
          name: this.name,
          imageUser: this.imageUser,
          phoneNumber: this.phoneNumber,
        });
        this.$router.push("/");
      } catch (err) {
        console.log("There is error on register new user", err);
      }
    },
  },
  data() {
    return {
      pageid: 1,
      email: "",
      password: "",
      name: "",
      imageUser: "",
      phoneNumber: "",
    };
  },
  created() {},
  mounted() {},
};
</script>
