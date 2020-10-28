<template>
  <div class="flex flex-col min-h-screen">
    <header id="header" class="bg-white dark:bg-gray-900 font-roboto">
      <Navigation :links="links" />
    </header>
    <main
      id="content"
      role="main"
      class="flex-grow bg-gray-200 dark:bg-gray-800 font-montserrat"
    >
      <OfflineBanner />
      <Nuxt />
    </main>
    <footer
      class="bg-white text-primary-400 dark:bg-gray-900 dark:text-white font-roboto"
    >
      <Footer />
    </footer>
  </div>
</template>

<script>
import Navigation from '@/components/Shared/Navigation'
import OfflineBanner from '@/components/Shared/OfflineBanner'
import Footer from '@/components/Shared/Footer'

export default {
  components: {
    Navigation,
    OfflineBanner,
    Footer,
  },
  data() {
    return {
      title: 'MrDemonWolf',
      links: [
        {
          url: '/goals/weekly',
          text: 'Weekly',
        },
      ],
    }
  },
}
</script>
