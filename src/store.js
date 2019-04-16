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
                        app_id: "<tu_id>",
                        app_key: "<tu_key>",
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