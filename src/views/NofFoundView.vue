<template>
  <div class="not-found-container">
    <div class="not-found-content">
      <h1>404</h1>
      <h2>Oops! Halaman tidak ditemukan</h2>
      <p>Sepertinya halaman yang Anda cari tidak ada atau telah dipindahkan.</p>
      <router-link to="/" class="home-button">Kembali ke Beranda</router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'NotFoundView',
})
</script>

<style scoped>
.not-found-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f8f9fa;
  text-align: center;
  padding: 20px;
}

.not-found-content {
  max-width: 600px;
}

h1 {
  font-size: 8rem;
  margin: 0;
  color: #343a40;
  line-height: 1;
}

h2 {
  font-size: 2rem;
  margin: 20px 0 10px;
  color: #495057;
}

p {
  font-size: 1.2rem;
  color: #6c757d;
  margin-bottom: 30px;
}

.home-button {
  display: inline-block;
  padding: 12px 24px;
  background-color: #4e73df;
  color: white;
  text-decoration: none;
  border-radius: 4px;
  font-weight: 500;
  transition: background-color 0.3s;
}

.home-button:hover {
  background-color: #3a5bd9;
}
</style>
