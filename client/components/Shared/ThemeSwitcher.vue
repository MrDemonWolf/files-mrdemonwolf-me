<template>
  <span class="inline-flex pl-2">
    <button
      class="rounded-md hover:text-primary-500 focus:outline-none transition ease-in-out duration-150"
      aria-label="Color Mode"
      @click="
        $colorMode.value === 'dark'
          ? ($colorMode.preference = 'light')
          : ($colorMode.preference = 'dark')
      "
    >
      <fa
        v-if="$colorMode.value === 'light'"
        :icon="['far', 'sun']"
        class="w-7 h-7"
      />
      <fa v-else :icon="['far', 'moon']" class="w-7 h-7 text-white" />
    </button>
  </span>
</template>
