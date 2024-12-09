<template>
  <div class="container mx-auto px-4 py-8">
    <!-- Header -->
    <div>
      <h1 class="text-3xl font-bold mb-6">All Recipes</h1>
    </div>

    <!-- Filters Section -->
    <div class="flex flex-col sm:flex-row gap-4 mb-6">
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
          class="absolute z-10 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
        >
          <li
            v-for="category in categories"
            :key="category"
            @click="filterRecipes(category)"
            class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
          >
            {{ category }}
          </li>
        </ul>
      </div>

      <!-- Preparation Time Filter -->
      <div>
        <label for="prep-time" class="block text-gray-600 mb-1">Max Prep Time (minutes):</label>
        <input
          id="prep-time"
          type="range"
          min="10"
          max="120"
          step="10"
          v-model="prepTimeFilter"
          @change="filterRecipesByTime"
          class="w-full"
        />
        <span class="text-sm text-gray-600">Up to {{ prepTimeFilter }} minutes</span>
      </div>

      <!-- Search by Title -->
      <div class="flex-1">
        <label for="search" class="block text-gray-600 mb-1">Search by Title:</label>
        <input
          id="search"
          v-model="searchQuery"
          type="text"
          placeholder="Enter recipe title"
          @input="filterRecipesByTitle"
          class="w-full border-gray-300 rounded-lg shadow-sm px-4 py-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
    </div>

    <!-- Recipes List -->
    <div v-if="loading" class="text-center text-gray-500">Loading recipes...</div>
    <div v-else-if="error" class="text-center text-red-500">Error: {{ error.message }}</div>
    <div v-else-if="filteredRecipes.length" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      <RecipeCard
        v-for="recipe in filteredRecipes"
        :key="recipe.id"
        :recipe="recipe"
      />
    </div>
    <div v-else class="text-center text-gray-600">
      <p>No recipes available for this category. Try a different filter!</p>
    </div>
  </div>
</template>

<script>
import RecipeCard from "/pages/RecipeCard.vue";
import { useQuery } from "@vue/apollo-composable";
import gql from "graphql-tag";
import { ref, watch, computed } from "vue";

// GraphQL query for fetching recipes
const GET_RECIPES = gql`
  query GetRecipes {
    recipes {
      id
      title
      featured_image
      category
      preparation_time
      average_rating
      ratings_count
      ingredients
      directions
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
    const prepTimeFilter = ref(120); // Default max prep time
    const searchQuery = ref("");

    // Apollo Client: Fetch recipes
    const { result, loading, error } = useQuery(GET_RECIPES);

    // Watch for query results and initialize recipes
    watch(
      result,
      (newResult) => {
        if (newResult?.recipes) {
          recipes.value = newResult.recipes;
          filteredRecipes.value = newResult.recipes; // Initialize with all recipes
        }
      },
      { immediate: true }
    );

    // Toggle dropdown visibility
    const toggleDropdown = () => {
      dropdownOpen.value = !dropdownOpen.value;
    };

    // Filter recipes by category
    const filterRecipes = (category) => {
      dropdownOpen.value = false;
      if (category === "All") {
        filteredRecipes.value = recipes.value;
      } else {
        filteredRecipes.value = recipes.value.filter(
          (recipe) => recipe.category === category
        );
      }
    };

    // Filter recipes by preparation time
    const filterRecipesByTime = () => {
      filteredRecipes.value = recipes.value.filter(
        (recipe) => recipe.preparation_time <= prepTimeFilter.value
      );
    };

    // Filter recipes by title
    const filterRecipesByTitle = () => {
      const query = searchQuery.value.toLowerCase();
      filteredRecipes.value = recipes.value.filter((recipe) =>
        recipe.title.toLowerCase().includes(query)
      );
    };

    return {
      recipes,
      filteredRecipes,
      loading,
      error,
      dropdownOpen,
      toggleDropdown,
      filterRecipes,
      prepTimeFilter,
      filterRecipesByTime,
      searchQuery,
      filterRecipesByTitle,
      categories,
    };
  },
};
</script>

<style scoped>
.container {
  max-width: 1200px;
}
</style>
