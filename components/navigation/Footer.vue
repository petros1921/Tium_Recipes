<template>
  <footer class="bg-gray-800 text-gray-200 py-6">
    <div class="container mx-auto px-6">
      <!-- Footer Content -->
      <div class="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        <!-- Left Section: Navigation -->
        <div>
          <ul class="flex flex-wrap gap-4 text-sm justify-center md:justify-start">
            <li><NuxtLink to="/" class="hover:text-blue-400">Home</NuxtLink></li>
            <li><NuxtLink to="/recipes/AllRecipes" class="hover:text-blue-400">Recipes</NuxtLink></li>
          </ul>
        </div>
      </div>

      <!-- Copyright -->
      <div class="mt-6 text-center text-md text-gray-500">
        © 2024 Food Recipes. All rights reserved.
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: "Footer",
};
</script>

<style scoped>
footer {
  font-family: "Inter", sans-serif;
}
</style>
