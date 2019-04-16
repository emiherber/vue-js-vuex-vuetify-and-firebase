import Vue from "vue";
import Vuex from "vuex";
import Axios from "axios";
import FireBase from "firebase";
import Router from "@/router";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    recipes: [],
    apiUrl: "https://api.edamam.com/search",
    user: null,
    isAuthenticated: false,
    userRecipes: []
  },
  mutations: {
    setRecipes(state, payload) {
      state.recipes = payload;
    },
    setUser(state, payload) {
      state.user = payload;
    },
    setIsAuthenticated(state, payload) {
      state.isAuthenticated = payload;
    },
    setUserRecipes(state, payload) {
      state.userRecipes = payload;
    }
  },
  getters: {
    isAuthenticated(state) {
      return state.user !== null && state.user !== undefined;
    }
  },
  actions: {
    async getRecipes({ state, commit }, plan) {
      try {
        let response = await Axios.get(`${state.apiUrl}`, {
          params: {
            q: plan,
            app_id: "<tu_appid>",
            app_key: "<tu_key>",
            from: 0,
            to: 9
          }
        });
        commit("setRecipes", response.data.hits);
      } catch (error) {
        commit("setRecipes", []);
      }
    },
    userJoin({ commit }, { email, password }) {
      FireBase.auth()
        .createUserWithEmailAndPassword(email, password)
        .then(user => {
          commit("setUser", user);
          commit("setIsAuthenticated", true);
          Router.push("/about");
        })
        .catch(() => {
          commit("setUser", null);
          commit("setIsAuthenticated", false);
          Router.push("/");
        });
    },
    userLogin({ commit }, { email, password }) {
      FireBase.auth()
        .signInWithEmailAndPassword(email, password)
        .then(user => {
          commit("setUser", user);
          commit("setIsAuthenticated", true);
          Router.push("/about");
        })
        .catch(() => {
          commit("setUser", null);
          commit("setIsAuthenticated", false);
          Router.push("/sign-in");
        });
    },
    userSignOut({ commit }) {
      FireBase.auth()
        .signOut()
        .then(() => {
          commit("setUser", null);
          commit("setIsAuthenticated", false);
          Router.push("/");
        })
        .catch(() => {
          commit("setUser", null);
          commit("setIsAuthenticated", false);
          Router.push("/");
        });
    },
    addRecipe({ state }, payload) {
      FireBase.database()
        .ref("users")
        .child(state.user.user.uid)
        .push(payload.recipe.label);
    },
    getUserRecipes({ state, commit }) {
      return FireBase.database()
        .ref("users/" + state.user.user.uid)
        .once("value", snapshot => {
          commit("setUserRecipes", snapshot.val());
        });
    }
  }
});
