<template>
  <dl>
    <dt class="text-base font-normal leading-6 text-gray-900">
      {{ title }}
    </dt>
    <dd class="flex items-baseline justify-between mt-1 md:block lg:flex">
      <div
        class="flex items-baseline text-2xl font-semibold leading-8 text-indigo-600"
      >
        {{ from }}
        <span class="ml-2 text-sm font-medium leading-5 text-gray-500">
          {{ fromText }} {{ to }}
        </span>
      </div>
      <div
        v-if="iod && from && total"
        :class="{
          ' bg-green-100 text-green-800': increased,
          'bg-red-100 text-red-800': decreased,
        }"
        class="inline-flex items-baseline px-2.5 py-0.5 rounded-full text-sm font-medium leading-5 md:mt-2 lg:mt-0"
      >
        <svg
          v-if="increased"
          class="-ml-1 mr-0.5 flex-shrink-0 self-center h-5 w-5 text-green-500"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fill-rule="evenodd"
            d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z"
            clip-rule="evenodd"
          />
        </svg>
        <svg
          v-if="decreased"
          class="-ml-1 mr-0.5 flex-shrink-0 self-center h-5 w-5 text-red-500"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fill-rule="evenodd"
            d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z"
            clip-rule="evenodd"
          />
        </svg>

        <span class="sr-only"> {{ iod }} </span>
        {{ $percentageCal(from, total) }} %
      </div>
    </dd>
  </dl>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    from: {
      type: Number,
      required: true,
    },
    fromText: {
      type: String,
      default: '',
    },
    to: {
      type: Number,
      required: true,
    },
    iod: {
      type: String,
      default: '',
    },
    total: {
      type: Number,
      required: true,
    },
    increased: {
      type: Boolean,
      default: false,
    },
    decreased: {
      type: Boolean,
      default: false,
    },
  },
}
</script>
