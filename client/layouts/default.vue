<template>
  <div class="flex flex-col min-h-screen">
    <DefaultNavigation :title="title" :links="links" />
    <main id="content" role="main" class="dark:bg-gray-600 flex-grow">
      <Nuxt />
    </main>
    <DefaultFooter />
  </div>
</template>

<script>
import DefaultNavigation from '@/components/Shared/Navigation'
import DefaultFooter from '@/components/Shared/Footer'

export default {
  components: {
    DefaultNavigation,
    DefaultFooter,
  },
  data() {
    return {
      title: 'MrDemonWolf',
      links: {
        Upload: '/uploads',
        Gallery: '/gallery',
        Links: '/links',
        Tokens: '/tokens',
        Config: '/config',
      },
    }
  },
}
</script>
<style lang="postcss"></style>
