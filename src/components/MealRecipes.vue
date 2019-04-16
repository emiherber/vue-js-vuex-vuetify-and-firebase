<template>
  <v-container grid-list-lg>
    <v-layout row wrap>
      <v-flex xs12 sm6 md6 lg4 v-for="(item, idx) in recipes" :key="idx">
        <v-card>
          <v-responsive>
            <v-img :src="item.recipe.image"></v-img>
          </v-responsive>

          <v-card-text>
            <div class="title">{{ item.recipe.label }}</div>

            <div class="subheading">Ingredients</div>
            <ul>
              <li
                v-for="(ingredient, i) in item.recipe.ingredientLines"
                :key="i"
              >
                {{ ingredient }}
              </li>
            </ul>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: "MealRecipes",
  computed: {
    recipes() {
      return this.$store.state.recipes;
    }
  }
};
</script>
