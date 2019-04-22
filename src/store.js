import Vue from "vue";
import Vuex from "vuex";
import Axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    recipes: [],
    apiUrl: "https://api.edamam.com/search"
  },
  mutations: {
    setRecipes(state, payload) {
      state.recipes = payload;
    }
  },
  actions: {
    async getRecipes({ state, commit }, plan) {
      try {
        let response = await Axios.get(`${state.apiUrl}`, {
          params: {
            q: plan,
            app_id: "a7397ead",
            app_key: "06b29a2f917c0fc225375c0980c3fa3b",
            from: 0,
            to: 9
          }
        });
        commit("setRecipes", response.data.hits);
      } catch (error) {
        commit("setRecipes", []);
      }
    }
  }
});
