<template>
  <div
    class="focus:outline-none"
    aria-label="Color Mode"
    @click="
      $colorMode.value === 'dark'
        ? ($colorMode.preference = 'light')
        : ($colorMode.preference = 'dark')
    "
  >
    <span>{{
      $colorMode.value === 'dark' ? 'Dark Theme' : 'Light Theme'
    }}</span>
    <fa
      v-if="$colorMode.value === 'light'"
      :icon="['far', 'sun']"
      class="w-6 h-6 align-middle"
    />
    <fa v-else :icon="['far', 'moon']" class="w-6 h-6 align-middle" />
  </div>
</template>
