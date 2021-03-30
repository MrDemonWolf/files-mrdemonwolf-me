<template>
  <div>
    <portal to="destination"></portal>
    <div class="flex flex-col min-h-screen">
      <main
        id="content"
        role="main"
        class="flex-grow bg-gray-200 dark:bg-gray-900"
      >
        <SharedOfflineBanner v-if="$nuxt.isOffline" />
        <Nuxt />
      </main>
    </div>
  </div>
</template>
