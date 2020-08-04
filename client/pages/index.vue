<template>
  <div class="container">
    <div>
      <p class="p-4 pb-2">
        <select
          v-model="$colorMode.preference"
          class="border w-24 h-8 dark:bg-gray-900 dark:border-gray-700"
        >
          <option value="system">System</option>
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>
      </p>
      <nuxt class="container mx-auto pt-4" />
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style></style>
