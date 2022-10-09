<template src="@/views/AuthenticationView/SignInView/Signin.html"></template>
<style scoped src="@/views/AuthenticationView/SignInView/Signin.css"></style>
<script>
import { mapActions } from "vuex";
export default {
  name: "SignIn",
  components: {},
  methods: {
    ...mapActions(["logIn"]),
    async Login() {
      try {
        await this.logIn({
          email: this.email,
          password: this.password,
        });
        this.$router.push("/");
      } catch (err) {
        console.log("There is error on login new user", err);
      }
    },
  },
  data() {
    return {
      email: "",
      password: "",
    };
  },
  created() {},
  mounted() {},
};
</script>
