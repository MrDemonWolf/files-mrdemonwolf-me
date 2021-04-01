<template>
  <div
    :class="
      type === 'primary'
        ? 'bg-primary-100 text-primary-900'
        : type === 'secondary'
        ? 'bg-secondary-100 text-secondary-900'
        : type === 'success'
        ? 'bg-green-100 text-green-900'
        : type === 'warning'
        ? 'bg-yellow-100 text-yellow-900'
        : type === 'danger'
        ? 'bg-red-100 text-red-900'
        : type === 'info'
        ? 'bg-blue-100 text-blue-900'
        : ''
    "
    class="p-4 font-medium rounded font-roboto"
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
