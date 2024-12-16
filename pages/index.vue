<template>
  <div class="container mx-auto px-4 py-8">
    <!-- Hero Section -->
    <div class="hero-section relative flex items-center justify-center text-center text-white">
      <div class="absolute inset-0 bg-black bg-opacity-50"></div>
      <div class="relative z-10">
        <h1 class="text-5xl font-extrabold mb-4 drop-shadow-lg animate-fadeIn">
          Welcome to <span class="text-blue-400">Tium Food Recipes</span>
        </h1>
        <h2 class="text-lg font-medium drop-shadow-md">
          Discover authentic Ethiopian Cuisine and share your own recipes.
        </h2>
      </div>
    </div>

    <!-- Featured Section -->
    <div class="featured-section mb-8 rounded-lg shadow-lg bg-gradient-to-br from-gray-100 to-white p-6">
      <div class="section-overlay">
        <h3 class="text-3xl font-bold text-gray-800 mb-4">Featured Recipes</h3>
        <p class="text-gray-600 mb-6">Try these handpicked favorites from our community!</p>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <RecipeCard
            v-for="recipe in featuredRecipes"
            :key="recipe.id"
            :recipe="recipe"
            class="transition-transform transform hover:scale-105"
          />
        </div>
      </div>
    </div>

    <!-- All Recipes Section -->
    <div class="all-recipes-section">
      <h3 class="text-3xl font-bold text-gray-800 mb-4">All Recipes</h3>

      <!-- Filters Section -->
      <div class="filters bg-white shadow-sm p-6 rounded-lg mb-6">
        <div class="flex flex-wrap gap-4">
          <!-- Dropdown Filter -->
          <div class="relative inline-block text-left">
            <button
              @click="toggleDropdown"
              class="inline-flex justify-center w-full sm:w-auto rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Filter by Category
              <svg
                class="-mr-1 ml-2 h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.25a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.06z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>
            <ul
              v-if="dropdownOpen"
              class="absolute z-10 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none transition-all duration-300"
            >
              <li
                v-for="category in categories"
                :key="category"
                @click="filterRecipes(category)"
                class="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-500 hover:text-white cursor-pointer transition-all duration-200"
              >
                {{ category }}
              </li>
            </ul>
          </div>

          <!-- Creator Filter -->
          <div class="flex-1">
            <label for="creator" class="block text-sm text-gray-600 mb-1">Filter by Creator:</label>
            <input
              id="creator"
              v-model="creatorFilter"
              type="text"
              placeholder="Enter creator name"
              @input="filterRecipesByCreator"
              class="w-full border-gray-300 rounded-lg shadow-sm px-4 py-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <!-- Ingredients Search Filter -->
          <div class="flex-1">
            <label for="ingredient-search" class="block text-sm text-gray-600 mb-1">Search by Ingredient:</label>
            <input
              id="ingredient-search"
              v-model="searchedIngredient"
              type="text"
              placeholder="Enter an ingredient"
              @input="filterRecipesByIngredientSearch"
              class="w-full border-gray-300 rounded-lg shadow-sm px-4 py-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <!-- Search by Title -->
          <div class="flex-1">
            <label for="search" class="block text-sm text-gray-600 mb-1">Search by Title:</label>
            <input
              id="search"
              v-model="searchQuery"
              type="text"
              placeholder="Enter recipe title"
              @input="filterRecipesByTitle"
              class="w-full border-gray-300 rounded-lg shadow-sm px-4 py-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <!-- Preparation Time Filter -->
          <div>
            <label for="prep-time" class="block text-sm text-gray-600 mb-1">Max Prep Time:</label>
            <input
              id="prep-time"
              type="range"
              min="10"
              max="240"
              step="10"
              v-model="prepTimeFilter"
              @change="filterRecipesByTime"
              class="w-full"
            />
            <span class="text-sm text-gray-600">Up to {{ prepTimeFilter }} minutes</span>
          </div>
        </div>
      </div>

      <!-- Recipes List -->
      <div v-if="loading" class="text-center text-gray-500">Loading recipes...</div>
      <div v-else-if="error" class="text-center text-red-500">Error: {{ error.message }}</div>
      <div
        v-else-if="filteredRecipes.length"
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
      >
        <RecipeCard
          v-for="recipe in filteredRecipes"
          :key="recipe.id"
          :recipe="recipe"
        />
      </div>
      <div v-else class="text-center text-gray-600">
        <p>No recipes available for this filter. Try a different one!</p>
      </div>
    </div>
  </div>
</template>

<script>
import RecipeCard from "~/pages/RecipeCard.vue";
import { useQuery } from "@vue/apollo-composable";
import gql from "graphql-tag";
import { ref, watch, computed } from "vue";

// GraphQL query for fetching recipes
const GET_RECIPES = gql`
  query {
    recipes {
      id
      title
      featured_image
      category
      preparation_time
      average_rating
      ratings_count
      description
      ingredients
      directions
      creator
      likes
      bookmarks
    }
  }
`;

export default {
  components: { RecipeCard },
  setup() {
    const recipes = ref([]);
    const filteredRecipes = ref([]);
    const categories = ref(["All", "Breakfast", "Lunch", "Dinner", "Snacks", "Drinks", "Condiments"]);
    const dropdownOpen = ref(false);
    const prepTimeFilter = ref(240);
    const searchQuery = ref("");
    const creatorFilter = ref("");
    const searchedIngredient = ref("");

    const { result, loading, error } = useQuery(GET_RECIPES);

    watch(
      result,
      (newResult) => {
        if (newResult?.recipes) {
          recipes.value = newResult.recipes;
          filteredRecipes.value = newResult.recipes;
        }
      },
      { immediate: true }
    );

    const toggleDropdown = () => {
      dropdownOpen.value = !dropdownOpen.value;
    };

    const filterRecipes = (category) => {
      dropdownOpen.value = false;
      if (category === "All") {
        filteredRecipes.value = recipes.value;
      } else {
        filteredRecipes.value = recipes.value.filter((recipe) => recipe.category === category);
      }
    };

    const filterRecipesByTime = () => {
      filteredRecipes.value = recipes.value.filter(
        (recipe) => recipe.preparation_time <= prepTimeFilter.value
      );
    };

    const filterRecipesByCreator = () => {
      const query = creatorFilter.value.toLowerCase();
      filteredRecipes.value = recipes.value.filter((recipe) =>
        recipe.creator.toLowerCase().includes(query)
      );
    };

    const filterRecipesByTitle = () => {
      const query = searchQuery.value.toLowerCase();
      filteredRecipes.value = recipes.value.filter((recipe) =>
        recipe.title.toLowerCase().includes(query)
      );
    };

    const filterRecipesByIngredientSearch = () => {
      const query = searchedIngredient.value.toLowerCase();
      filteredRecipes.value = recipes.value.filter((recipe) =>
        recipe.ingredients.some((ingredient) =>
          ingredient.toLowerCase().includes(query)
        )
      );
    };

    const featuredRecipes = computed(() =>
      recipes.value
        .filter((recipe) => recipe.average_rating > 4)
        .sort((a, b) => b.average_rating - a.average_rating)
        .slice(0, 3)
    );

    return {
      recipes,
      categories,
      dropdownOpen,
      prepTimeFilter,
      searchQuery,
      creatorFilter,
      searchedIngredient,
      loading,
      error,
      toggleDropdown,
      featuredRecipes,
      filterRecipes,
      filteredRecipes,
      filterRecipesByTime,
      filterRecipesByTitle,
      filterRecipesByCreator,
      filterRecipesByIngredientSearch,
    };
  },
};
</script>


<style scoped>
.hero-section {
  background-image: url('assets/images/back-ground-img.jpg');
  background-size: cover;
  background-position: center;
  padding: 6rem 1rem;
}

.hero-overlay {
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
  animation: fadeIn 1s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.filters {
  background: linear-gradient(to right, #ffffff, #f8f9fa);
  border-radius: 8px;
}


li:hover {
  background-color: #649df9; 
  color: white;
  transform: translateX(4px); 
}


.featured-section {
  background-image: url('assets/images/featured-bg.jpg');
  background-size: cover;
  background-position: center;
}

.section-overlay {
  background-color: rgba(255, 255, 255, 0.8);
  padding: 2rem;
  border-radius: 8px;
}

button:hover {
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  transform: scale(1.02);
  transition: all 0.3s ease;
}
</style>
