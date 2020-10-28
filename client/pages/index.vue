<template>
  <SignedIn v-if="$auth.loggedIn" />
  <NotSignedIn v-else />
</template>

<script>
import NotSignedIn from '@/components/Landing/NotSignedIn'
import SignedIn from '@/components/Landing/SignedIn'

export default {
  components: {
    NotSignedIn,
    SignedIn,
  },
}
</script>
