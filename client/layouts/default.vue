<template>
  <div class="flex flex-col min-h-screen">
    <main
      id="content"
      role="main"
      class="flex-grow bg-gray-200 dark:bg-gray-800"
    >
      <!-- <OfflineBanner v-if="$nuxt.isOffline" /> -->
      <Nuxt />
      <div>
        <h1>Color mode: {{ $colorMode.value }}</h1>
        <select v-model="$colorMode.preference">
          <option value="system">System</option>
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: 'Share',
    }
  },
}
</script>
