<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="w-full max-w-sm bg-white p-6 rounded-lg shadow-md">
      <!-- Title -->
      <h2 class="text-2xl font-bold text-center text-gray-800 mb-6">Sign Up</h2>

      <!-- Sign-Up Form -->
      <form @submit.prevent="signUp" class="space-y-4">
        <!-- Name Input -->
        <div>
          <label for="name" class="block text-sm font-bold text-gray-700 mb-1">Name</label>
          <input
            id="name"
            v-model="name"
            placeholder="Enter your name"
            class="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <!-- Email Input -->
        <div>
          <label for="email" class="block text-sm font-bold text-gray-700 mb-1">Email</label>
          <input
            id="email"
            v-model="email"
            placeholder="Enter your email"
            type="email"
            class="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <!-- Password Input -->
        <div>
          <label for="password" class="block text-sm font-bold text-gray-700 mb-1">Password</label>
          <input
            id="password"
            v-model="password"
            type="password"
            placeholder="Create a password"
            class="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <!-- Confirm Password Input -->
        <div>
          <label for="confirmPassword" class="block text-sm font-bold text-gray-700 mb-1">Confirm Password</label>
          <input
            id="confirmPassword"
            v-model="confirmPassword"
            type="password"
            placeholder="Re-enter your password"
            class="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <!-- Sign-Up Button -->
        <div>
          <button
            :disabled="loading"
            class="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span v-if="loading">Signing Up...</span>
            <span v-else>Sign Up</span>
          </button>
        </div>
      </form>

      <!-- Login Link -->
      <p class="text-sm text-center text-gray-600 mt-4">
        Already have an account?
        <NuxtLink to="/auth/login" class="text-blue-500 hover:underline">Log in</NuxtLink>
      </p>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";

export default {
  setup() {
    const name = ref("");
    const email = ref("");
    const password = ref("");
    const confirmPassword = ref("");
    const loading = ref(false);
    const router = useRouter();

    const signUp = async () => {
      // Basic form validation
      if (!name.value || !email.value || !password.value || !confirmPassword.value) {
        alert("Please fill out all fields.");
        return;
      }

      if (password.value !== confirmPassword.value) {
        alert("Passwords do not match.");
        return;
      }

      loading.value = true;

      try {
        // Mock API call (replace with actual sign-up logic)
        const user = { name: name.value, email: email.value };
        console.log("User Signed Up:", user);

        // Store user data in localStorage
        localStorage.setItem("user", JSON.stringify(user));

        // Redirect to the dashboard
        router.push("/dashboard");
      } catch (error) {
        console.error("Sign-Up failed:", error);
      } finally {
        loading.value = false;
      }
    };

    return { name, email, password, confirmPassword, loading, signUp };
  },
};
</script>

<style scoped>
/* Add additional styling if needed */
</style>