<template>
  <div
    :class="type === 'success' ? 'bg-green-200 text-green-800' : ' '"
    class="font-light p-4 rounded mb-4"
  >
    Please check your email for further instructions on recovering your
    password.
  </div>
</template>

<script>
export default {
  data() {
    return {
      type: null,
    }
  },
}
</script>
