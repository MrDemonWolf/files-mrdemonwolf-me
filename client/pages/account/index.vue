<template>
  <div
    class="container w-full px-8 m-6 overflow-auto shadow-md bg-gray-50 md:mx-auto lg:w-3/5 dark:bg-gray-200"
  >
    <h1
      class="py-3 mx-3 mt-3 text-2xl font-bold leading-8 text-center text-gray-900 font-roboto"
    >
      Account Settings
    </h1>

    <!-- <div class="my-0 sm:my-5">
      <Profile />
    </div>
    <div class="hidden sm:block">
      <div class="py-5">
        <div class="border-t border-gray-300"></div>
      </div>
    </div> -->

    <div class="my-0 sm:my-5">
      <PersonalInformation />
    </div>

    <div class="hidden sm:block">
      <div class="py-5">
        <div class="border-t border-gray-300"></div>
      </div>
    </div>
    <div class="my-0 sm:my-5">
      <Security />
    </div>

    <!-- <div class="hidden sm:block">
      <div class="py-5">
        <div class="border-t border-gray-300"></div>
      </div>
    </div>
    <div class="my-0 sm:my-5">
      <Notifications />
    </div> -->
  </div>
</template>

<script>
// import Profile from '@/components/Account/Profile'
import PersonalInformation from '@/components/Account/PersonalInformation'
import Security from '@/components/Account/Security'
// import Notifications from '@/components/Account/Notifications'
export default {
  middleware: 'auth',
  components: {
    // Profile,
    PersonalInformation,
    Security,
    // Notifications,
  },
}
</script>
