<template>
  <div class="bg-blue-100 dark:bg-gray-800">
    <div
      class="container h-80 mx-auto flex flex-col justify-center items-center"
    >
      <div class="w-full md:w-2/3 flex flex-col mb-16 items-center text-center">
        <h1
          class="title-font sm:text-4xl text-3xl mb-4 font-medium text-primary-500 dark:text-white"
        >
          {{ hero.title }}
        </h1>
        <p
          class="mb-8 leading-relaxed font-semibold text-gray-700 dark:text-white"
        >
          {{ hero.description }}
        </p>
        <div v-if="signups" class="flex justify-center">
          <button
            class="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg"
          >
            Create a account today!
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      hero: {
        title: 'Share',
        description:
          'Kickstarter biodiesel roof party wayfarers cold-pressed. Palo santo live-edge tumeric scenester copper mug flexitarian. Prism vice offal plaid everyday carry. Gluten-free chia VHS squid listicle artisan.',
      },
      signups: true,
    }
  },
}
</script>

<style></style>
