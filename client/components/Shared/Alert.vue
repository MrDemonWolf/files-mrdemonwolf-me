<template>
  <div
    :class="
      type === 'primary'
        ? 'bg-primary-200 text-primary-800'
        : type === 'secondary'
        ? 'bg-secondary-200 text-secondary-800'
        : type === 'success'
        ? 'bg-green-200 text-green-800'
        : type === 'warning'
        ? 'bg-yellow-200 text-yellow-800'
        : type === 'danger'
        ? 'bg-red-200 text-red-800'
        : type === 'info'
        ? 'bg-blue-200 text-blue-800'
        : ''
    "
    class="p-4 font-light rounded"
  >
    {{ message }}
  </div>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
}
</script>
