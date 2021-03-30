<template>
  <div>
    <portal to="destination"></portal>
    <SharedOfflineBanner v-if="$nuxt.isOffline" />
    <Nuxt />
  </div>
</template>
