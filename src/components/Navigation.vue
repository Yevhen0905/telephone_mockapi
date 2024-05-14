<template>
  <div class="nav">
    <div class="nav_home">
      <RouterLink class="home" :to="{name: 'list'}">HOME</RouterLink>
    </div>
    <div class="nav_add">
      <RouterLink class="btn" :to="{name: 'create'}">Add Contact</RouterLink>
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss">
  .nav {
    display: flex;
    justify-content: space-between;
  }

  .home {
    font-size: 20px;
    color: #00a6ff;
    font-weight: 600;
    transition: all 0.3s ease;

    &:hover {
      color: #fff;
      text-shadow: 1px 1px 3px #6f7cba;
    }
  }
</style>
