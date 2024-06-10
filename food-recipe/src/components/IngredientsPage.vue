<template>
  <div class="ingredients-page">
    <h2>{{ recipe.label }}</h2>
    <img :src="recipe.image" alt="food image" class="food-image" />
    <div class="ingredients-container">
      <h3>Ingredients</h3>
      <ul>
        <li v-for="ingredient in recipe.ingredientLines" :key="ingredient">
          {{ ingredient }}
        </li>
      </ul>
    </div>
    <router-link to="/home" class="back-button">Back to Home</router-link>
  </div>
</template>

  
  <script>
  export default {
    name: 'IngredientsPage',
    data() {
      return {
        recipe: {}
      };
    },
    created() {
      const recipeId = this.$route.params.id;
      const storedRecipe = localStorage.getItem(recipeId);
      if (storedRecipe) {
        this.recipe = JSON.parse(storedRecipe);
      } else {
        this.$router.push('/home');
      }
    },
    methods: {
      goBack() {
        this.$router.push('/home');
      }
    }
  };
  </script>
  
  <style scoped>
.ingredients-page {
  text-align: center;
  padding: 20px;
  max-width: 600px;
  margin: 0 auto;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.food-image {
  max-width: 100%;
  height: auto;
  border-radius: 10px;
  margin-bottom: 20px;
}

.ingredients-container {
  text-align: left;
}

.ingredients-container h3 {
  font-size: 1.5em;
  margin-bottom: 10px;
}

.ingredients-container ul {
  list-style: none;
  padding: 0;
}

.ingredients-container li {
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 10px;
  font-size: 1.1em;
}

.back-button {
  display: inline-block;
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  text-decoration: none;
  border-radius: 5px;
}

.back-button:hover {
  background-color: #0056b3;
}
</style>
