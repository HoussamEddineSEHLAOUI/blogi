import { createStore } from "vuex";
import { auth, uplodToStorageAndGetUrlPublic } from "@/Firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  sendEmailVerification,
} from "firebase/auth";
export default createStore({
  state: {
    user: {
      loggedIn: false,
      data: null,
    },
    blog: {
      title: "",
      description: "",
      files: [],
    },
  },
  getters: {
    verifieIfTherIsCurrentBlog(state) {
      if (
        state.blog?.title?.length > 0 &&
        state.blog?.description?.length > 0 &&
        state.blog?.files?.length > 0
      ) {
        return true;
      } else {
        return false;
      }
    },
    blog(state) {
      return state.blog;
    },
    user(state) {
      return state.user;
    },
    is_verified_email(state) {
      return state.user?.data?.emailVerified;
    },
    is_logedin(state) {
      return state.user.loggedIn;
    },
  },
  mutations: {
    SET_LOGGED_IN(state, value) {
      state.user.loggedIn = value;
    },
    SET_USER(state, data) {
      state.user.data = data;
    },
    setInputTitle(state, title) {
      state.blog.title = title;
    },
    setInputDescription(state, description) {
      state.blog.description = description;
    },
    addVideoToBlog(state, file) {
      state.blog.files.push(file);
    },
    deleteVideoOfBlog(state, index) {
      state.blog.files.splice(index, 1);
    },
    updateVideoOfBlog(state, { index, file }) {
      console.log(file);
      state.blog.files[index] = file;
    },
    clearBlog(state) {
      state.blog = {
        title: "",
        description: "",
        files: [],
      };
    },
  },
  actions: {
    async register(context, { email, password, name, imageUser, phoneNumber }) {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      if (user) {
        // Upadre the user in state
        context.commit("SET_USER", user);
        // Send verification message to user
        await sendEmailVerification(user);
        // Get Url image profile :
        const urlImageUser = await uplodToStorageAndGetUrlPublic(imageUser);
        // Update user profile
        await updateProfile(user, {
          displayName: name,
          photoURL: urlImageUser,
          phoneNumber: phoneNumber,
        });
      } else {
        throw new Error("Unable to register user");
      }
    },

    async logIn(context, { email, password }) {
      const response = await signInWithEmailAndPassword(auth, email, password);
      if (response) {
        context.commit("SET_USER", response.user);
      } else {
        throw new Error("login failed");
      }
    },

    async logOut(context) {
      await signOut(auth);
      context.commit("SET_USER", null);
    },

    async fetchUser(context, user) {
      context.commit("SET_LOGGED_IN", user !== null);
      if (user) {
        context.commit("SET_USER", {
          displayName: user.displayName,
          email: user.email,
        });
      } else {
        context.commit("SET_USER", null);
      }
    },
  },
  modules: {},
});
