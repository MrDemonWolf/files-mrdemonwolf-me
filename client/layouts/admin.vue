<template>
  <div class="flex flex-col min-h-screen">
    <Navigation :links="links" />
    <h1>Welcome Admin</h1>
    <main id="content" role="main" class="dark:bg-gray-600 flex-grow">
      <Nuxt />
    </main>
    <DefaultFooter />
  </div>
</template>

<script>
import Navigation from '@/components/Shared/Navigation'
import DefaultFooter from '@/components/Shared/Footer'

export default {
  components: {
    Navigation,
    DefaultFooter,
  },
  data() {
    return {
      links: {
        Upload: '/admin/uploads',
        Gallery: '/admin/gallery',
        Links: '/admin/links',
        Users: '/admin/users',
        Settings: '/admin/settings',
        'Back to User': '/uploads',
      },
    }
  },
}
</script>
<style lang="postcss"></style>
