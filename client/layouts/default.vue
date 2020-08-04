<template>
  <div>
    <DefaultNavigation :title="title" :links="links" />
    <main id="content" role="main">
      <Nuxt />
    </main>
  </div>
</template>

<script>
import DefaultNavigation from '@/components/Shared/Navigation'

export default {
  components: {
    DefaultNavigation,
  },
  data() {
    return {
      title: 'MrDemonWolf',
      links: { Amount: '/about', Contact: '/contact' },
    }
  },
}
</script>
<style></style>
