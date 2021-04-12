<template>
  <div
    class="relative inline-block w-24 h-24 align-top border-solid circle-loader border-6"
    :class="{
      'border-l-opacity-100 border-l-primary-400': loading,
      'border-black border-opacity-25 ': !loading,
      'load-complete border-opacity-100 border-green-400': success && !loading,
      'load-complete border-opacity-100 border-red-500': !success && !loading,
    }"
  >
    <div
      class="draw"
      :class="{
        block: !loading,
        hidden: loading,
        checkmark: success,
        x: !success,
      }"
    ></div>
  </div>
</template>

<script>
export default {
  props: {
    loading: {
      type: Boolean,
      default: true,
    },
    success: {
      type: Boolean,
      default: true,
    },
  },
}
</script>

<style lang="postcss" scoped>
.circle-loader {
  animation: loader-spin 1.2s infinite linear;
  border-radius: 50%;
}

.load-complete {
  animation: none;
  transition: border 500ms ease-out;
}
.x:before {
  content: ' ';
  transform: rotate(45deg);
  @apply h-14 w-2 bg-red-500 left-10 top-4 absolute opacity-100;
}
.x:after {
  content: ' ';
  transform: rotate(-45deg);
  @apply h-14 w-2 bg-red-500 left-10 top-4 absolute opacity-100;
}
.checkmark:after {
  @apply h-12 w-5 border-r-6 border-r-solid border-r-green-400 border-t-6 border-t-solid border-t-green-400 left-5 top-12 absolute opacity-100;
  transform-origin: left top;
  content: '';
}

.checkmark.draw:after {
  animation-duration: 800ms;
  animation-timing-function: ease;
  animation-name: checkmark;
  transform: scaleX(-1) rotate(135deg);
}
@keyframes loader-spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

/* Use apply here h-13 w-5 */

@keyframes checkmark {
  0% {
    @apply h-0 w-0 opacity-0;
  }
  20% {
    @apply h-0 w-4 opacity-100;
  }
  40% {
    @apply h-8 w-4 opacity-100;
  }
  100% {
    @apply h-12 w-5 opacity-100;
  }
}
@keyframes x {
  0% {
    @apply h-0 w-0 opacity-0;
  }
  20% {
    @apply h-0 w-4 opacity-100;
  }
  40% {
    @apply h-8 w-4 opacity-100;
  }
  100% {
    @apply h-12 w-5 opacity-100;
  }
}
</style>
