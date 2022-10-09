<template src="@/components/NavBar/Navbar.html"></template>
<style scoped src="@/components/NavBar/Navbar.css"></style>
<script>
import { mapGetters } from "vuex";
export default {
  name: "NavBar",
  components: {},
  methods: {
    async Logout() {
      try {
        await this.$store.dispatch("logOut");
        this.$router.push("/signin");
      } catch (err) {
        console.log("There is error on login new user", err);
      }
    },
  },
  computed: {
    ...mapGetters(["is_verified_email"]),
  },
  mounted() {},
};
</script>
