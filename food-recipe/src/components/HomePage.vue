<template>
  <div class="home-page">
    <h2>Food and Recipe</h2>
    <form @submit.prevent="searchRecipes" class="search-form">
      <div class="search-container">
        <input
          type="text"
          v-model="searchQuery"
          placeholder="Enter keyword..."
          class="search-input"
        />
        <button type="submit" class="search-button">Search</button>
      </div>
      <div class="filter-container">
        <input
          type="number"
          v-model.number="calorieFilter"
          placeholder="Calories"
          class="calorie-input"
        />
        <div class="radio-buttons">
          <label>
            <input
              type="radio"
              v-model="sortBy"
              value="max"
            />
            Max calories
          </label>
          <label>
            <input
              type="radio"
              v-model="sortBy"
              value="min"
            />
            Min calories
          </label>
        </div>
      </div>
    </form>
    <div v-if="loading">Loading...</div>
    <div v-if="error">{{ error }}</div>
    <div v-if="recipes.length" class="card-container">
      <div class="card" v-for="recipe in sortedRecipes" :key="recipe.recipe.uri">
        <img :src="recipe.recipe.image" alt="food image" class="food-image" />
        <div class="card-content">
          <h3>{{ recipe.recipe.label }}</h3>
          <p>
            <strong>Calories:</strong> {{ Math.round(recipe.recipe.calories) }}
          </p>
          <p>
            <router-link
              :to="{
                name: 'IngredientsPage',
                params: { id: encodeURIComponent(recipe.recipe.uri) },
              }"
            >
              View Ingredients
            </router-link>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "HomePage",
  data() {
    return {
      searchQuery: "kabab",
      calorieFilter: null,
      recipes: [],
      loading: false,
      error: "",
      sortBy: "max", 
    };
  },
  computed: {
    sortedRecipes() {
      let filteredRecipes = this.recipes;

      if (this.calorieFilter) {
        filteredRecipes = filteredRecipes.filter(recipe => {
          const calories = Math.round(recipe.recipe.calories);
          return calories <= this.calorieFilter;
        });
      }

      if (this.sortBy === "min") {
        return filteredRecipes.sort((a, b) => a.recipe.calories - b.recipe.calories);
      } else if (this.sortBy === "max") {
        return filteredRecipes.sort((a, b) => b.recipe.calories - a.recipe.calories);
      } else {
        return filteredRecipes;
      }
    }
  },
  methods: {
    async searchRecipes() {
      this.loading = true;
      this.error = "";

      const app_id = "f2131b73";
      const app_key = "b971474402adf3d29e86d4dfee9aa4c6";
      const query = this.searchQuery;
      let url = `https://api.edamam.com/api/recipes/v2?type=public&q=${query}&app_id=${app_id}&app_key=${app_key}`;

      if (this.calorieFilter) {
        url += `&calories=${this.calorieFilter}`;
      }

      try {
        const response = await axios.get(url);
        this.recipes = response.data.hits;
        this.recipes.forEach((recipe) => {
          const recipeId = encodeURIComponent(recipe.recipe.uri);
          localStorage.setItem(recipeId, JSON.stringify(recipe.recipe));
        });
      } catch (error) {
        if (error.response) {
          this.error = `Error ${error.response.status}: ${error.response.data.message}`;
        } else if (error.request) {
          this.error = "No response from server.";
        } else {
          this.error = "An error occurred: " + error.message;
        }
        console.error(error);
      } finally {
        this.loading = false;
      }
    },
  },
  mounted() {
    this.searchRecipes();
  },
};
</script>

<style scoped>
.home-page {
  text-align: center;
  padding: 20px;
}

.search-form {
  margin-bottom: 20px;
}

.search-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.search-input {
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  width: 300px;
  margin-right: 10px;
}

.search-button {
  padding: 10px 20px;
  border-radius: 5px;
  background-color: #007bff;
  color: #fff;
  border: none;
  cursor: pointer;
}

.search-button:hover {
  background-color: #0056b3;
}

.filter-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
  flex-wrap: wrap;
  gap: 10px;
}

.calorie-input {
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  width: 100px;
}

.radio-buttons {
  display: flex;
  gap: 10px;
}

.radio-buttons label {
  display: flex;
  align-items: center;
  font-size: 14px;
  cursor: pointer;
}

.radio-buttons input {
  margin-right: 5px;
}

.card {
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 20px;
  margin: 10px;
  flex: 1 1 300px;
  max-width: 30%;
  box-sizing: border-box;
}

.food-image {
  max-width: 100%;
  height: auto;
  border-radius: 10px;
}

.card-content {
  margin-top: 15px;
}

.card-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

@media (max-width: 768px) {
  .card {
    max-width: 100%;
    flex: 1 1 100%;
  }
}
</style>
