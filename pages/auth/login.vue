<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="w-full max-w-sm bg-white p-6 rounded-lg shadow-md">
      <!-- Title -->
      <h2 class="text-2xl font-bold text-center text-gray-800 mb-6">Login</h2>

      <!-- Login Form -->
      <form @submit.prevent="login" class="space-y-4">
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
          <p v-if="emailError" class="text-sm text-red-500 mt-1">{{ emailError }}</p>
        </div>

        <!-- Password Input -->
        <div>
          <label for="password" class="block text-sm font-bold text-gray-700 mb-1">Password</label>
          <input
            id="password"
            v-model="password"
            type="password"
            placeholder="Enter your password"
            class="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <p v-if="passwordError" class="text-sm text-red-500 mt-1">{{ passwordError }}</p>
        </div>

        <!-- Login Button -->
        <div>
          <button
            :disabled="loading"
            class="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span v-if="loading">Loading...</span>
            <span v-else>Login</span>
          </button>
        </div>
      </form>

      <!-- Signup Link -->
      <p class="text-sm text-center text-gray-600 mt-4">
        Don't have an account? 
        <NuxtLink to="/auth/signin" class="text-blue-500 hover:underline">Sign up</NuxtLink>
      </p>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const email = ref('');
    const password = ref('');
    const loading = ref(false);
    const emailError = ref('');
    const passwordError = ref('');
    const router = useRouter();

    const validateForm = () => {
      let isValid = true;

      if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
        emailError.value = 'Please enter a valid email address.';
        isValid = false;
      } else {
        emailError.value = '';
      }

      if (!password.value || password.value.length < 6) {
        passwordError.value = 'Password must be at least 6 characters.';
        isValid = false;
      } else {
        passwordError.value = '';
      }

      return isValid;
    };

    const login = async () => {
      if (!validateForm()) return;

      loading.value = true;

      try {
        // Simulate login process
        console.log('Email:', email.value);
        console.log('Password:', password.value);

        // Mock authentication (Replace with actual API call)
        if (email.value === 'test@example.com' && password.value === 'password') {
          // Store token in localStorage or Vuex
          localStorage.setItem('authToken', 'your-auth-token');

          // Redirect to the dashboard
          router.push('/dashboard');
        } else {
          alert('Invalid email or password!');
        }
      } catch (error) {
        console.error('Login failed:', error);
      } finally {
        loading.value = false;
      }
    };

    return {
      email,
      password,
      loading,
      emailError,
      passwordError,
      login,
    };
  },
};
</script>

<style scoped>
/* Add additional styles if needed */
</style>
