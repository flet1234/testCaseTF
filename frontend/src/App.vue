<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="app-container">
    <header class="main-header">
      <div class="logo-section">
        <img alt="App logo" class="logo" src="@/assets/logo.svg" width="32" height="32" />
        <span class="brand-name">Inventory Manager</span>
      </div>

      <nav class="main-nav">
        <RouterLink to="/" class="nav-item">Materials</RouterLink>
        <RouterLink to="/entities" class="nav-item">Entities</RouterLink>
      </nav>
    </header>

    <main class="content-wrapper">
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
/* Container for the whole page */
.app-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #f8fafc;
  /* Light gray background */
}

/* Header styling */
.main-header {
  background-color: #ffffff;
  border-bottom: 1px solid #e2e8f0;
  padding: 0 2rem;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: sticky;
  top: 0;
}

.logo-section {
  display: flex;
  align-items: center;
  gap: 12px;
}

.brand-name {
  font-weight: 700;
  font-size: 1.25rem;
  color: #1e293b;
}

/* Navigation Links */
.main-nav {
  display: flex;
  gap: 1.5rem;
}

.nav-item {
  text-decoration: none;
  color: #64748b;
  font-weight: 500;
  padding: 0.5rem 0;
  border-bottom: 2px solid transparent;
  transition: all 0.2s;
}

.nav-item:hover {
  color: #3b82f6;
}

/* Style for the active page link */
.nav-item.router-link-active {
  color: #3b82f6;
  border-bottom-color: #3b82f6;
}

/* Content padding */
.content-wrapper {
  padding: 2rem;
  flex: 1;
}

@media (max-width: 640px) {
  .main-header {
    padding: 0 1rem;
  }

  .brand-name {
    display: none;
    /* Hide text logo on small screens */
  }
}
</style>