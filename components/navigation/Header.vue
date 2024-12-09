<template>
  <header class="bg-gray-800 text-white p-4 flex justify-between items-center">
    <!-- Logo -->
    <h1 class="text-xl font-bold">
      <NuxtLink to="/" class="hover:text-blue-400">Tium Recipes</NuxtLink>
    </h1>

    <!-- Navigation -->
    <nav>
      <ul class="flex items-center gap-6">
        <!-- Authenticated User Links -->
        <template v-if="isAuthenticated">
          <li><NuxtLink to="/dashboard" class="hover:text-blue-400">Dashboard</NuxtLink></li>
          <li><NuxtLink to="/recipes/AllRecipes" class="hover:text-blue-400">View Recipes</NuxtLink></li>
          <li><NuxtLink to="/recipes/CreateRecipes" class="hover:text-blue-400">Create Recipe</NuxtLink></li>
          <li>
            <button
              @click="logout"
              class="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg shadow transition"
            >
              Logout
            </button>
          </li>
        </template>

        <!-- Non-Authenticated User Links -->
        <template v-else>
          <li><NuxtLink to="/" class="hover:text-blue-400">Home</NuxtLink></li>
          <li><NuxtLink to="/auth/login" class="hover:text-blue-400">Log In</NuxtLink></li>
          <li><NuxtLink to="/auth/signin" class="hover:text-blue-400">Sign Up</NuxtLink></li>
        </template>
      </ul>
    </nav>
  </header>
</template>

<script>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

export default {
  name: "Header",
  setup() {
    const isAuthenticated = ref(false); // Tracks authentication state
    const router = useRouter();

    // Check authentication status when the component is mounted
    onMounted(() => {
      const token = localStorage.getItem("authToken");
      isAuthenticated.value = !!token; // Set to true if token exists
    });

    const logout = () => {
      localStorage.removeItem("authToken"); // Remove the token
      isAuthenticated.value = false; // Update authentication state
      router.push("/"); // Redirect to home
    };

    return { isAuthenticated, logout };
  },
};
</script>

<style scoped>
header {
  font-family: "Inter", sans-serif;
}
button {
  transition: background-color 0.3s ease;
}
</style>
