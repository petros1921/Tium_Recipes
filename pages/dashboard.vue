<template>
  <div class="dashboard-page bg-gray-50 min-h-screen">
    <!-- Dashboard Header -->
    <header class="bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-8 px-6">
      <div class="container mx-auto flex flex-col sm:flex-row justify-between items-center">
        <div>
          <h1 class="text-4xl font-bold mb-2">Hello, {{ username }} 👋</h1>
          <p class="text-lg">Welcome back to your dashboard!</p>
        </div>
      </div>
    </header>

    <!-- Dashboard Content -->
    <main class="container mx-auto px-6 py-8">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <!-- Profile Card -->
        <div class="bg-white shadow-md rounded-lg p-6 text-center">
          <img
            src="https://via.placeholder.com/100"
            alt="Profile Picture"
            class="w-24 h-24 mx-auto rounded-full mb-4"
          />
          <h2 class="text-xl font-semibold text-gray-800">{{ username }}</h2>
          <p class="text-gray-500 mb-2">{{ email }}</p>
          <p class="text-sm bg-blue-100 text-blue-600 px-4 py-1 inline-block rounded-full">User</p>
        </div>

        <!-- Quick Links -->
        <div class="bg-white shadow-md rounded-lg p-6">
          <h2 class="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h2>
          <ul class="space-y-3">
            <li>
              <NuxtLink
                to="/recipes/AllRecipes"
                class="flex items-center bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg p-3"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6 mr-3 text-blue-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 6H16M8 12H16m-7 6h7" />
                </svg>
                View All Recipes
              </NuxtLink>
            </li>
            <li>
              <NuxtLink
                to="/recipes/CreateRecipes"
                class="flex items-center bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg p-3"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6 mr-3 text-green-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                </svg>
                Create a New Recipe
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Stats Card -->
        <div class="bg-white shadow-md rounded-lg p-6">
          <h2 class="text-lg font-semibold text-gray-800 mb-4">Your Stats</h2>
          <div class="space-y-3">
            <p class="text-lg"><strong>{{ stats.recipesCreated }}</strong> Recipes Created</p>
            <p class="text-lg"><strong>{{ stats.recipesLiked }}</strong> Recipes Liked</p>
            <p class="text-lg"><strong>{{ stats.commentsPosted }}</strong> Comments Posted</p>
          </div>
        </div>
      </div>

      <!-- Recent Activity -->
      <div class="bg-white shadow-md rounded-lg mt-8 p-6">
        <h2 class="text-lg font-semibold text-gray-800 mb-4">Recent Activity</h2>
        <ul class="space-y-3">
          <li v-for="(activity, index) in recentActivity" :key="index" class="flex items-center text-gray-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 mr-2 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
            {{ activity }}
          </li>
        </ul>
      </div>
    </main>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

export default {
  setup() {
    const router = useRouter();

    // Mock user data (replace with actual data from API)
    const username = ref("John Doe");
    const email = ref("john.doe@example.com");
    const stats = ref({
      recipesCreated: 12,
      recipesLiked: 34,
      commentsPosted: 15,
    });
    const recentActivity = ref([
      "Liked a recipe: Shiro Wot",
      "Commented on: Injera recipe",
      "Created recipe Kitfo",
    ]);

    const logout = () => {
      localStorage.removeItem("authToken"); // Clear token
      router.push("/auth/login"); // Redirect to login
    };

    const viewNotifications = () => {
      alert("You have 3 new notifications!"); // Replace with actual notifications logic
    };

    onMounted(() => {
      // Replace mock data fetch logic with real API calls here
      console.log("Fetch user data and activity logs");
    });

    return { username, email, stats, recentActivity, logout, viewNotifications };
  },
};
</script>

<style scoped>
.dashboard-page {
  font-family: "Inter", sans-serif;
}
button {
  transition: background-color 0.3s ease;
}
</style>
