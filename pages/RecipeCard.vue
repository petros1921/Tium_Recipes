<template>
  <div
    class="recipe-card bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300"
  >
    <!-- Featured Image -->
    <div class="recipe-image relative">
      <img
        :src="recipe.featured_image"
        alt="Recipe Image"
        class="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
      />
      <!-- Category Badge -->
      <div
        v-if="recipe.category"
        class="absolute top-2 left-2 bg-blue-600 text-white text-xs font-semibold px-2 py-1 rounded-md"
      >
        {{ recipe.category }}
      </div>
    </div>

    <!-- Recipe Info -->
    <div class="p-4">
      <!-- Title -->
      <h3 class="text-lg font-bold text-gray-800 truncate mb-2 hover:text-blue-600 transition-colors">
        {{ recipe.title }}
      </h3>

      <!-- Description -->
      <p class="text-sm text-gray-700 mb-4">
        {{ recipe.description || "No description available." }}
      </p>

      <!-- Preparation Time -->
      <p class="text-sm text-gray-600 mb-2 flex items-center">
        <span class="material-icons text-blue-500 mr-1">schedule</span>
        ⏱ {{ recipe.preparation_time || "N/A" }} minutes
      </p>

      <!-- Ratings -->
      <div class="mt-3 flex items-center">
        <div v-for="n in 5" :key="n" class="text-yellow-500">
          <span v-if="n <= recipe.average_rating">★</span>
          <span v-else class="text-gray-300">☆</span>
        </div>
        <span class="text-sm text-gray-600 ml-2">
          ({{ recipe.ratings_count || 0 }} ratings)
        </span>
      </div>
    </div>

    <!-- Additional Images -->
    <div
      v-if="recipe.additional_images?.length"
      class="p-4 bg-gray-50 border-t border-gray-200"
    >
      <h4 class="text-md font-semibold text-gray-800 mb-2">Additional Images:</h4>
      <div class="grid grid-cols-2 gap-2">
        <img
          v-for="(image, index) in recipe.additional_images"
          :key="index"
          :src="image"
          alt="Additional Recipe Image"
          class="w-full h-24 object-cover rounded-md shadow-sm hover:scale-105 transition-transform duration-300"
        />
      </div>
    </div>

    <!-- Collapsible Ingredients Section -->
    <div class="p-4 bg-gray-50 border-t border-gray-200">
      <h4
        class="text-md font-semibold text-gray-800 mb-2 cursor-pointer flex items-center hover:text-blue-600 transition-colors"
        @click="toggleIngredients"
      >
        Ingredients
        <span class="ml-2 text-sm text-gray-500">
          ({{ showIngredients ? "Hide" : "Show" }})
        </span>
      </h4>
      <ul
        v-if="showIngredients"
        class="list-disc list-inside text-sm text-gray-600"
      >
        <li v-for="(ingredient, index) in recipe.ingredients" :key="index">
          {{ ingredient }}
        </li>
      </ul>
    </div>

    <!-- Collapsible Directions Section -->
    <div class="p-4 bg-gray-50 border-t border-gray-200">
      <h4
        class="text-md font-semibold text-gray-800 mb-2 cursor-pointer flex items-center hover:text-blue-600 transition-colors"
        @click="toggleDirections"
      >
        Directions
        <span class="ml-2 text-sm text-gray-500">
          ({{ showDirections ? "Hide" : "Show" }})
        </span>
      </h4>
      <ol
        v-if="showDirections"
        class="list-decimal list-inside text-sm text-gray-600"
      >
        <li v-for="(step, index) in recipe.directions" :key="index">
          {{ step }}
        </li>
      </ol>
    </div>

    <!-- Footer with Actions -->
    <div class="p-4 bg-gray-100 border-t border-gray-200 flex justify-between items-center">
      <!-- Like Button -->
      <button
        @click="toggleLike"
        class="flex items-center text-sm text-red-500 hover:text-red-600 transition"
      >
        <span v-if="isLiked">♥</span>
        <span v-else>♡</span>
        <span class="ml-1">{{ recipe.likes_count || 0 }}</span>
      </button>

      <!-- Bookmark Button -->
      <button
        @click="toggleBookmark"
        class="flex items-center text-sm text-yellow-500 hover:text-yellow-600 transition"
      >
        <span v-if="isBookmarked">🔖</span>
        <span v-else>📑</span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "RecipeCard",
  props: {
    recipe: {
      type: Object,
      required: true,
    },
    isLiked: {
      type: Boolean,
      default: false,
    },
    isBookmarked: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      showIngredients: false,
      showDirections: false,
    };
  },
  methods: {
    toggleLike() {
      this.$emit("like", this.recipe.id);
    },
    toggleBookmark() {
      this.$emit("bookmark", this.recipe.id);
    },
    toggleIngredients() {
      this.showIngredients = !this.showIngredients;
    },
    toggleDirections() {
      this.showDirections = !this.showDirections;
    },
  },
};
</script>

<style scoped>
.recipe-card {
  max-width: 350px;
  border: 1px solid #e5e7eb;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.recipe-card:hover {
  transform: scale(1.05);
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
}

.recipe-image img {
  border-bottom: 1px solid #e5e7eb;
}

.recipe-card h3:hover {
  text-decoration: underline;
}
</style>
