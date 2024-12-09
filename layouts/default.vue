<template>
    <div>
      <Header />
      <main class="py-6">
        <NuxtPage />
      </main>
      <Footer />
    </div>
</template>
  
<script>
import Header from '@/components/navigation/Header.vue';
import Footer from '@/components/navigation/Footer.vue';
  
export default {
    components: { Header, Footer},
};
</script>
  