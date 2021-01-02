<template>
  <div style="min-height: 640px">
    <div
      class="flex h-screen overflow-hidden bg-gray-100"
      @keydown.esc="sidebarOpen = false"
    >
      <div
        v-if="sidebarOpen"
        class="lg:hidden"
        x-description="Off-canvas menu for mobile, show/hide based on off-canvas menu state."
      >
        <div class="fixed inset-0 z-40 flex">
          <transition
            enter-active-class="transition-opacity duration-300 ease-linear"
            enter-class="opacity-0"
            enter-to-class="opacity-100"
            leave-active-class="transition-opacity duration-300 ease-linear"
            leave-class="opacity-100"
            leave-to-class="opacity-0"
            ><div
              v-if="sidebarOpen"
              class="fixed inset-0"
              x-description="Off-canvas menu overlay, show/hide based on off-canvas menu state."
              @click="sidebarOpen = false"
            >
              <div
                class="absolute inset-0 bg-gray-600 opacity-75"
                aria-hidden="true"
              ></div></div
          ></transition>
          <transition
            enter-active-class="transition duration-300 ease-in-out transform"
            enter-class="-translate-x-full"
            enter-to-class="translate-x-0"
            leave-active-class="transition duration-300 ease-in-out transform"
            leave-class="translate-x-0"
            leave-to-class="-translate-x-full"
            ><div
              v-if="sidebarOpen"
              x-description="Off-canvas menu, show/hide based on off-canvas menu state."
              class="relative flex flex-col flex-1 w-full max-w-xs pt-5 pb-4 bg-primary-700"
            >
              <div class="absolute top-0 right-0 pt-2 -mr-12">
                <button
                  v-if="sidebarOpen"
                  class="flex items-center justify-center w-10 h-10 ml-1 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                  @click="sidebarOpen = false"
                >
                  <span class="sr-only">Close sidebar</span>
                  <svg
                    class="w-6 h-6 text-white"
                    x-description="Heroicon name: x"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M6 18L18 6M6 6l12 12"
                    ></path>
                  </svg>
                </button>
              </div>
              <div class="flex items-center flex-shrink-0 px-4">
                <Logo class="w-auto h-8" :alt="`${$config.title} Logo`" />
              </div>
              <nav
                class="flex-shrink-0 h-full mt-5 overflow-y-auto divide-y divide-primary-800"
                aria-label="Sidebar"
              >
                <div class="px-2 space-y-1">
                  <!-- Current: "bg-primary-800 text-white", Default: "text-primary-100 hover:text-white hover:bg-primary-600" -->
                  <a
                    href="#"
                    class="flex items-center px-2 py-2 text-base font-medium text-white rounded-md bg-primary-800 group"
                    aria-current="page"
                  >
                    <svg
                      class="w-6 h-6 mr-4 text-primary-200"
                      x-description="Heroicon name: home"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                      ></path>
                    </svg>
                    Home
                  </a>

                  <a
                    href="#"
                    class="flex items-center px-2 py-2 text-base font-medium rounded-md text-primary-100 hover:text-white hover:bg-primary-600 group"
                  >
                    <svg
                      class="w-6 h-6 mr-4 text-primary-200"
                      x-description="Heroicon name: clock"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      ></path>
                    </svg>
                    History
                  </a>

                  <a
                    href="#"
                    class="flex items-center px-2 py-2 text-base font-medium rounded-md text-primary-100 hover:text-white hover:bg-primary-600 group"
                  >
                    <svg
                      class="w-6 h-6 mr-4 text-primary-200"
                      x-description="Heroicon name: scale"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
                      ></path>
                    </svg>
                    Balances
                  </a>

                  <a
                    href="#"
                    class="flex items-center px-2 py-2 text-base font-medium rounded-md text-primary-100 hover:text-white hover:bg-primary-600 group"
                  >
                    <svg
                      class="w-6 h-6 mr-4 text-primary-200"
                      x-description="Heroicon name: credit-card"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                      ></path>
                    </svg>
                    Cards
                  </a>

                  <a
                    href="#"
                    class="flex items-center px-2 py-2 text-base font-medium rounded-md text-primary-100 hover:text-white hover:bg-primary-600 group"
                  >
                    <svg
                      class="w-6 h-6 mr-4 text-primary-200"
                      x-description="Heroicon name: user-group"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                      ></path>
                    </svg>
                    Recipients
                  </a>

                  <a
                    href="#"
                    class="flex items-center px-2 py-2 text-base font-medium rounded-md text-primary-100 hover:text-white hover:bg-primary-600 group"
                  >
                    <svg
                      class="w-6 h-6 mr-4 text-primary-200"
                      x-description="Heroicon name: document-report"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      ></path>
                    </svg>
                    Reports
                  </a>
                </div>
                <div class="pt-6 mt-6">
                  <div class="px-2 space-y-1">
                    <a
                      href="#"
                      class="flex items-center px-2 py-2 text-base font-medium rounded-md group text-primary-100 hover:text-white hover:bg-primary-600"
                    >
                      <svg
                        class="w-6 h-6 mr-4 text-primary-200 group-hover:text-primary-200"
                        x-description="Heroicon name: cog"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                        ></path>
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        ></path>
                      </svg>
                      Settings
                    </a>

                    <a
                      href="#"
                      class="flex items-center px-2 py-2 text-base font-medium rounded-md group text-primary-100 hover:text-white hover:bg-primary-600"
                    >
                      <svg
                        class="w-6 h-6 mr-4 text-primary-300 group-hover:text-primary-200"
                        x-description="Heroicon name: question-mark-circle"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        ></path>
                      </svg>
                      Help
                    </a>

                    <a
                      href="#"
                      class="flex items-center px-2 py-2 text-base font-medium rounded-md group text-primary-100 hover:text-white hover:bg-primary-600"
                    >
                      <svg
                        class="w-6 h-6 mr-4 text-primary-300 group-hover:text-primary-200"
                        x-description="Heroicon name: shield-check"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                        ></path>
                      </svg>
                      Privacy
                    </a>
                  </div>
                </div>
              </nav>
            </div></transition
          >
          <div class="flex-shrink-0 w-14" aria-hidden="true">
            <!-- Dummy element to force sidebar to shrink to fit close icon -->
          </div>
        </div>
      </div>

      <!-- Static sidebar for desktop -->
      <div class="hidden lg:flex lg:flex-shrink-0">
        <div class="flex flex-col w-64">
          <!-- Sidebar component, swap this element with another sidebar if you like -->
          <div
            class="flex flex-col flex-grow pt-5 pb-4 overflow-y-auto bg-primary-700"
          >
            <div class="flex items-center flex-shrink-0 px-4">
              <Logo class="w-auto h-8" :alt="`${$config.title} Logo`" />
            </div>
            <nav
              class="flex flex-col flex-1 mt-5 overflow-y-auto divide-y divide-primary-800"
              aria-label="Sidebar"
            >
              <div class="px-2 space-y-1">
                <!-- Current: "bg-primary-800 text-white", Default: "text-primary-100 hover:text-white hover:bg-primary-600" -->
                <a
                  href="#"
                  class="flex items-center px-2 py-2 text-sm font-medium leading-6 text-white rounded-md bg-primary-800 group"
                  aria-current="page"
                >
                  <svg
                    class="w-6 h-6 mr-4 text-primary-200"
                    x-description="Heroicon name: home"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    ></path>
                  </svg>
                  Home
                </a>

                <a
                  href="#"
                  class="flex items-center px-2 py-2 text-sm font-medium leading-6 rounded-md group text-primary-100 hover:text-white hover:bg-primary-600"
                >
                  <svg
                    class="w-6 h-6 mr-4 text-primary-200"
                    x-description="Heroicon name: clock"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                  History
                </a>

                <a
                  href="#"
                  class="flex items-center px-2 py-2 text-sm font-medium leading-6 rounded-md group text-primary-100 hover:text-white hover:bg-primary-600"
                >
                  <svg
                    class="w-6 h-6 mr-4 text-primary-200"
                    x-description="Heroicon name: scale"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
                    ></path>
                  </svg>
                  Balances
                </a>

                <a
                  href="#"
                  class="flex items-center px-2 py-2 text-sm font-medium leading-6 rounded-md group text-primary-100 hover:text-white hover:bg-primary-600"
                >
                  <svg
                    class="w-6 h-6 mr-4 text-primary-200"
                    x-description="Heroicon name: credit-card"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                    ></path>
                  </svg>
                  Cards
                </a>

                <a
                  href="#"
                  class="flex items-center px-2 py-2 text-sm font-medium leading-6 rounded-md group text-primary-100 hover:text-white hover:bg-primary-600"
                >
                  <svg
                    class="w-6 h-6 mr-4 text-primary-200"
                    x-description="Heroicon name: user-group"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    ></path>
                  </svg>
                  Recipients
                </a>

                <a
                  href="#"
                  class="flex items-center px-2 py-2 text-sm font-medium leading-6 rounded-md group text-primary-100 hover:text-white hover:bg-primary-600"
                >
                  <svg
                    class="w-6 h-6 mr-4 text-primary-200"
                    x-description="Heroicon name: document-report"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    ></path>
                  </svg>
                  Reports
                </a>
              </div>
              <div class="pt-6 mt-6">
                <div class="px-2 space-y-1">
                  <a
                    href="#"
                    class="flex items-center px-2 py-2 text-sm font-medium leading-6 rounded-md group text-primary-100 hover:text-white hover:bg-primary-600"
                  >
                    <svg
                      class="w-6 h-6 mr-4 text-primary-200"
                      x-description="Heroicon name: cog"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                      ></path>
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      ></path>
                    </svg>
                    Settings
                  </a>

                  <a
                    href="#"
                    class="flex items-center px-2 py-2 text-sm font-medium leading-6 rounded-md group text-primary-100 hover:text-white hover:bg-primary-600"
                  >
                    <svg
                      class="w-6 h-6 mr-4 text-primary-200"
                      x-description="Heroicon name: question-mark-circle"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      ></path>
                    </svg>
                    Help
                  </a>

                  <a
                    href="#"
                    class="flex items-center px-2 py-2 text-sm font-medium leading-6 rounded-md group text-primary-100 hover:text-white hover:bg-primary-600"
                  >
                    <svg
                      class="w-6 h-6 mr-4 text-primary-200"
                      x-description="Heroicon name: shield-check"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      ></path>
                    </svg>
                    Privacy
                  </a>
                </div>
              </div>
            </nav>
          </div>
        </div>
      </div>

      <div
        x-init="$el.focus()"
        class="flex-1 overflow-auto focus:outline-none"
        tabindex="0"
      >
        <div
          class="relative z-10 flex flex-shrink-0 h-16 bg-white border-b border-gray-200 lg:border-none"
        >
          <button
            class="px-4 text-gray-400 border-r border-gray-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500 lg:hidden"
            @click.stop="sidebarOpen = true"
          >
            <span class="sr-only">Open sidebar</span>
            <svg
              class="w-6 h-6"
              x-description="Heroicon name: menu-alt-1"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h8m-8 6h16"
              ></path>
            </svg>
          </button>
          <!-- Search bar -->
          <div
            class="flex justify-between flex-1 px-4 sm:px-6 lg:max-w-6xl lg:mx-auto lg:px-8"
          >
            <div class="flex flex-1">
              <form class="flex w-full md:ml-0" action="#" method="GET">
                <label for="search_field" class="sr-only">Search</label>
                <div
                  class="relative w-full text-gray-400 focus-within:text-gray-600"
                >
                  <div
                    class="absolute inset-y-0 left-0 flex items-center pointer-events-none"
                    aria-hidden="true"
                  >
                    <svg
                      class="w-5 h-5"
                      x-description="Heroicon name: search"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                  </div>
                  <input
                    id="search_field"
                    name="search_field"
                    class="block w-full h-full py-2 pl-8 pr-3 text-gray-900 placeholder-gray-500 border-transparent focus:outline-none focus:ring-0 focus:border-transparent sm:text-sm"
                    placeholder="Search sharess"
                    type="search"
                  />
                </div>
              </form>
            </div>
            <div class="flex items-center ml-4 md:ml-6">
              <button
                class="p-1 text-gray-400 bg-white rounded-full hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                <span class="sr-only">View notifications</span>
                <svg
                  class="w-6 h-6"
                  x-description="Heroicon name: bell"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  ></path>
                </svg>
              </button>

              <!-- Profile dropdown -->
              <div class="relative ml-3" @keydown.esc="open = false">
                <!-- @click.away="open = false" -->
                <div>
                  <button
                    id="user-menu"
                    class="flex items-center max-w-xs text-sm bg-white rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 lg:p-2 lg:rounded-md lg:hover:bg-gray-50"
                    aria-haspopup="true"
                    x-bind:aria-expanded="open"
                    @click="open = !open"
                  >
                    <img
                      class="w-8 h-8 rounded-full"
                      src="https://www.gravatar.com/avatar/2db8c9b3b9cc3a8d46cc5b7869a4b6eb.png?s=256"
                      alt=""
                    />
                    <span
                      class="hidden ml-3 text-sm font-medium text-gray-700 lg:block"
                      ><span class="sr-only">Open user menu for</span>
                      {{ user.username }}
                    </span>
                    <svg
                      class="flex-shrink-0 hidden w-5 h-5 ml-1 text-gray-400 lg:block"
                      x-description="Heroicon name: chevron-down"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                  </button>
                </div>
                <transition
                  enter-active-class="transition duration-100 ease-out"
                  enter-class="transform scale-95 opacity-0"
                  enter-to-class="transform scale-100 opacity-100"
                  leave-active-class="transition duration-75 ease-in"
                  leave-class="transform scale-100 opacity-100"
                  leave-to-class="transform scale-95 opacity-0"
                  ><div
                    v-if="open"
                    x-description="Profile dropdown panel, show/hide based on dropdown state."
                    class="absolute right-0 w-48 py-1 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="user-menu"
                  >
                    <a
                      href="#"
                      class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      role="menuitem"
                      >Your Profile</a
                    >
                    <a
                      href="#"
                      class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      role="menuitem"
                      >Settings</a
                    >
                    <a
                      href="#"
                      class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      role="menuitem"
                      >Logout</a
                    >
                  </div></transition
                >
              </div>
            </div>
          </div>
        </div>
        <main class="relative z-0 flex-1 pb-8 overflow-y-auto">
          <!-- Page header -->
          <div class="bg-white shadow">
            <div class="px-4 sm:px-6 lg:max-w-6xl lg:mx-auto lg:px-8">
              <div
                class="py-6 md:flex md:items-center md:justify-between lg:border-t lg:border-gray-200"
              >
                <div class="flex-1 min-w-0">
                  <!-- Profile -->
                  <div class="flex items-center">
                    <img
                      class="hidden w-16 h-16 rounded-full sm:block"
                      src="https://www.gravatar.com/avatar/2db8c9b3b9cc3a8d46cc5b7869a4b6eb.png?s=256"
                      alt=""
                    />
                    <div>
                      <div class="flex items-center">
                        <img
                          class="w-16 h-16 rounded-full sm:hidden"
                          src="https://www.gravatar.com/avatar/2db8c9b3b9cc3a8d46cc5b7869a4b6eb.png?s=256"
                          alt=""
                        />
                        <h1
                          class="ml-3 text-2xl font-bold leading-7 text-gray-900 sm:leading-9 sm:truncate"
                        >
                          Good morning, {{ user.username }}
                        </h1>
                      </div>
                      <dl
                        class="flex flex-col mt-6 sm:ml-3 sm:mt-1 sm:flex-row sm:flex-wrap"
                      >
                        <dt class="sr-only">Company</dt>
                        <dd
                          class="flex items-center text-sm font-medium text-gray-500 capitalize sm:mr-6"
                        >
                          <svg
                            class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                            x-description="Heroicon name: office-building"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z"
                              clip-rule="evenodd"
                            ></path>
                          </svg>
                          <!-- {{}} -->
                        </dd>
                        <dt class="sr-only">Account status</dt>
                        <dd
                          class="flex items-center mt-3 text-sm font-medium text-gray-500 capitalize sm:mr-6 sm:mt-0"
                        >
                          <svg
                            class="flex-shrink-0 mr-1.5 h-5 w-5 text-green-400"
                            x-description="Heroicon name: check-circle"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              clip-rule="evenodd"
                            ></path>
                          </svg>
                          Verified account
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
                <div class="flex mt-6 space-x-3 md:mt-0 md:ml-4">
                  <button
                    type="button"
                    class="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                  >
                    Add money
                  </button>
                  <button
                    type="button"
                    class="inline-flex items-center px-4 py-2 text-sm font-medium text-white border border-transparent rounded-md shadow-sm bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                  >
                    Send money
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div class="mt-8">
            <div class="max-w-6xl px-4 mx-auto sm:px-6 lg:px-8">
              <h2 class="text-lg font-medium leading-6 text-gray-900">
                Overview
              </h2>
              <div
                class="grid grid-cols-1 gap-5 mt-2 sm:grid-cols-2 lg:grid-cols-3"
                x-max="1"
              >
                <!-- Card -->

                <div class="overflow-hidden bg-white rounded-lg shadow">
                  <div class="p-5">
                    <div class="flex items-center">
                      <div class="flex-shrink-0">
                        <svg
                          class="w-6 h-6 text-gray-400"
                          x-description="Heroicon name: scale"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
                          ></path>
                        </svg>
                      </div>
                      <div class="flex-1 w-0 ml-5">
                        <dl>
                          <dt
                            class="text-sm font-medium text-gray-500 truncate"
                          >
                            Account balance
                          </dt>
                          <dd>
                            <div class="text-lg font-medium text-gray-900">
                              $30,659.45
                            </div>
                          </dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                  <div class="px-5 py-3 bg-gray-50">
                    <div class="text-sm">
                      <a
                        href="#"
                        class="font-medium text-primary-700 hover:text-primary-900"
                      >
                        View all
                      </a>
                    </div>
                  </div>
                </div>

                <!-- More cards... -->

                <div class="overflow-hidden bg-white rounded-lg shadow">
                  <div class="p-5">
                    <div class="flex items-center">
                      <div class="flex-shrink-0">
                        <svg
                          class="w-6 h-6 text-gray-400"
                          x-description="Heroicon name: refresh"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                          ></path>
                        </svg>
                      </div>
                      <div class="flex-1 w-0 ml-5">
                        <dl>
                          <dt
                            class="text-sm font-medium text-gray-500 truncate"
                          >
                            Pending
                          </dt>
                          <dd>
                            <div class="text-lg font-medium text-gray-900">
                              -$19,500.00
                            </div>
                          </dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                  <div class="px-5 py-3 bg-gray-50">
                    <div class="text-sm">
                      <a
                        href="#"
                        class="font-medium text-primary-700 hover:text-primary-900"
                      >
                        View all
                      </a>
                    </div>
                  </div>
                </div>

                <!-- More cards... -->

                <div class="overflow-hidden bg-white rounded-lg shadow">
                  <div class="p-5">
                    <div class="flex items-center">
                      <div class="flex-shrink-0">
                        <svg
                          class="w-6 h-6 text-gray-400"
                          x-description="Heroicon name: check-circle"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                          ></path>
                        </svg>
                      </div>
                      <div class="flex-1 w-0 ml-5">
                        <dl>
                          <dt
                            class="text-sm font-medium text-gray-500 truncate"
                          >
                            Processed (last 30 days)
                          </dt>
                          <dd>
                            <div class="text-lg font-medium text-gray-900">
                              $20,000
                            </div>
                          </dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                  <div class="px-5 py-3 bg-gray-50">
                    <div class="text-sm">
                      <a
                        href="#"
                        class="font-medium text-primary-700 hover:text-primary-900"
                      >
                        View all
                      </a>
                    </div>
                  </div>
                </div>

                <!-- More cards... -->
              </div>
            </div>

            <h2
              class="max-w-6xl px-4 mx-auto mt-8 text-lg font-medium leading-6 text-gray-900 sm:px-6 lg:px-8"
            >
              Recent activity
            </h2>

            <!-- Activity list (smallest breakopoint only) -->
            <div class="shadow sm:hidden">
              <ul
                class="mt-2 overflow-hidden divide-y divide-gray-200 shadow sm:hidden"
                x-max="1"
              >
                <li>
                  <a href="#" class="block px-4 py-4 bg-white hover:bg-gray-50">
                    <span class="flex items-center space-x-4">
                      <span class="flex flex-1 space-x-2 truncate">
                        <svg
                          class="flex-shrink-0 w-5 h-5 text-gray-400"
                          x-description="Heroicon name: cash"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z"
                            clip-rule="evenodd"
                          ></path>
                        </svg>
                        <span
                          class="flex flex-col text-sm text-gray-500 truncate"
                        >
                          <span class="truncate">Payment to Molly Sanders</span>
                          <span
                            ><span class="font-medium text-gray-900"
                              >$20,000</span
                            >
                            USD</span
                          >
                          <span>July 11, 2020</span>
                        </span>
                      </span>
                      <svg
                        class="flex-shrink-0 w-5 h-5 text-gray-400"
                        x-description="Heroicon name: chevron-right"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                          clip-rule="evenodd"
                        ></path>
                      </svg>
                    </span>
                  </a>
                </li>

                <!-- More items... -->

                <li>
                  <a href="#" class="block px-4 py-4 bg-white hover:bg-gray-50">
                    <span class="flex items-center space-x-4">
                      <span class="flex flex-1 space-x-2 truncate">
                        <svg
                          class="flex-shrink-0 w-5 h-5 text-gray-400"
                          x-description="Heroicon name: cash"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z"
                            clip-rule="evenodd"
                          ></path>
                        </svg>
                        <span
                          class="flex flex-col text-sm text-gray-500 truncate"
                        >
                          <span class="truncate">Payment to Doug Mann</span>
                          <span
                            ><span class="font-medium text-gray-900"
                              >$19,500</span
                            >
                            USD</span
                          >
                          <span>July 5, 2020</span>
                        </span>
                      </span>
                      <svg
                        class="flex-shrink-0 w-5 h-5 text-gray-400"
                        x-description="Heroicon name: chevron-right"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                          clip-rule="evenodd"
                        ></path>
                      </svg>
                    </span>
                  </a>
                </li>

                <!-- More items... -->

                <li>
                  <a href="#" class="block px-4 py-4 bg-white hover:bg-gray-50">
                    <span class="flex items-center space-x-4">
                      <span class="flex flex-1 space-x-2 truncate">
                        <svg
                          class="flex-shrink-0 w-5 h-5 text-gray-400"
                          x-description="Heroicon name: cash"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z"
                            clip-rule="evenodd"
                          ></path>
                        </svg>
                        <span
                          class="flex flex-col text-sm text-gray-500 truncate"
                        >
                          <span class="truncate">Payment to Molly Sanders</span>
                          <span
                            ><span class="font-medium text-gray-900"
                              >$20,000</span
                            >
                            USD</span
                          >
                          <span>June 17, 2020</span>
                        </span>
                      </span>
                      <svg
                        class="flex-shrink-0 w-5 h-5 text-gray-400"
                        x-description="Heroicon name: chevron-right"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                          clip-rule="evenodd"
                        ></path>
                      </svg>
                    </span>
                  </a>
                </li>

                <!-- More items... -->

                <li>
                  <a href="#" class="block px-4 py-4 bg-white hover:bg-gray-50">
                    <span class="flex items-center space-x-4">
                      <span class="flex flex-1 space-x-2 truncate">
                        <svg
                          class="flex-shrink-0 w-5 h-5 text-gray-400"
                          x-description="Heroicon name: cash"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z"
                            clip-rule="evenodd"
                          ></path>
                        </svg>
                        <span
                          class="flex flex-col text-sm text-gray-500 truncate"
                        >
                          <span class="truncate">Payment to Doug Mann</span>
                          <span
                            ><span class="font-medium text-gray-900"
                              >$19,500</span
                            >
                            USD</span
                          >
                          <span>June 14, 2020</span>
                        </span>
                      </span>
                      <svg
                        class="flex-shrink-0 w-5 h-5 text-gray-400"
                        x-description="Heroicon name: chevron-right"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                          clip-rule="evenodd"
                        ></path>
                      </svg>
                    </span>
                  </a>
                </li>

                <!-- More items... -->

                <li>
                  <a href="#" class="block px-4 py-4 bg-white hover:bg-gray-50">
                    <span class="flex items-center space-x-4">
                      <span class="flex flex-1 space-x-2 truncate">
                        <svg
                          class="flex-shrink-0 w-5 h-5 text-gray-400"
                          x-description="Heroicon name: cash"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z"
                            clip-rule="evenodd"
                          ></path>
                        </svg>
                        <span
                          class="flex flex-col text-sm text-gray-500 truncate"
                        >
                          <span class="truncate">Payment to Erica Frost</span>
                          <span
                            ><span class="font-medium text-gray-900"
                              >$8,750</span
                            >
                            USD</span
                          >
                          <span>June 3, 2020</span>
                        </span>
                      </span>
                      <svg
                        class="flex-shrink-0 w-5 h-5 text-gray-400"
                        x-description="Heroicon name: chevron-right"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                          clip-rule="evenodd"
                        ></path>
                      </svg>
                    </span>
                  </a>
                </li>

                <!-- More items... -->

                <li>
                  <a href="#" class="block px-4 py-4 bg-white hover:bg-gray-50">
                    <span class="flex items-center space-x-4">
                      <span class="flex flex-1 space-x-2 truncate">
                        <svg
                          class="flex-shrink-0 w-5 h-5 text-gray-400"
                          x-description="Heroicon name: cash"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z"
                            clip-rule="evenodd"
                          ></path>
                        </svg>
                        <span
                          class="flex flex-col text-sm text-gray-500 truncate"
                        >
                          <span class="truncate">Payment to Miley Davis</span>
                          <span
                            ><span class="font-medium text-gray-900">$300</span>
                            USD</span
                          >
                          <span>May 8, 2020</span>
                        </span>
                      </span>
                      <svg
                        class="flex-shrink-0 w-5 h-5 text-gray-400"
                        x-description="Heroicon name: chevron-right"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                          clip-rule="evenodd"
                        ></path>
                      </svg>
                    </span>
                  </a>
                </li>

                <!-- More items... -->

                <li>
                  <a href="#" class="block px-4 py-4 bg-white hover:bg-gray-50">
                    <span class="flex items-center space-x-4">
                      <span class="flex flex-1 space-x-2 truncate">
                        <svg
                          class="flex-shrink-0 w-5 h-5 text-gray-400"
                          x-description="Heroicon name: cash"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z"
                            clip-rule="evenodd"
                          ></path>
                        </svg>
                        <span
                          class="flex flex-col text-sm text-gray-500 truncate"
                        >
                          <span class="truncate">Payment to Molly Sanders</span>
                          <span
                            ><span class="font-medium text-gray-900"
                              >$20,000</span
                            >
                            USD</span
                          >
                          <span>May 5, 2020</span>
                        </span>
                      </span>
                      <svg
                        class="flex-shrink-0 w-5 h-5 text-gray-400"
                        x-description="Heroicon name: chevron-right"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                          clip-rule="evenodd"
                        ></path>
                      </svg>
                    </span>
                  </a>
                </li>

                <!-- More items... -->

                <li>
                  <a href="#" class="block px-4 py-4 bg-white hover:bg-gray-50">
                    <span class="flex items-center space-x-4">
                      <span class="flex flex-1 space-x-2 truncate">
                        <svg
                          class="flex-shrink-0 w-5 h-5 text-gray-400"
                          x-description="Heroicon name: cash"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z"
                            clip-rule="evenodd"
                          ></path>
                        </svg>
                        <span
                          class="flex flex-col text-sm text-gray-500 truncate"
                        >
                          <span class="truncate">Payment to Doug Mann</span>
                          <span
                            ><span class="font-medium text-gray-900"
                              >$19,500</span
                            >
                            USD</span
                          >
                          <span>May 1, 2020</span>
                        </span>
                      </span>
                      <svg
                        class="flex-shrink-0 w-5 h-5 text-gray-400"
                        x-description="Heroicon name: chevron-right"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                          clip-rule="evenodd"
                        ></path>
                      </svg>
                    </span>
                  </a>
                </li>

                <!-- More items... -->

                <li>
                  <a href="#" class="block px-4 py-4 bg-white hover:bg-gray-50">
                    <span class="flex items-center space-x-4">
                      <span class="flex flex-1 space-x-2 truncate">
                        <svg
                          class="flex-shrink-0 w-5 h-5 text-gray-400"
                          x-description="Heroicon name: cash"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z"
                            clip-rule="evenodd"
                          ></path>
                        </svg>
                        <span
                          class="flex flex-col text-sm text-gray-500 truncate"
                        >
                          <span class="truncate">Payment to Erica Frost</span>
                          <span
                            ><span class="font-medium text-gray-900"
                              >$8,750</span
                            >
                            USD</span
                          >
                          <span>April 14, 2020</span>
                        </span>
                      </span>
                      <svg
                        class="flex-shrink-0 w-5 h-5 text-gray-400"
                        x-description="Heroicon name: chevron-right"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                          clip-rule="evenodd"
                        ></path>
                      </svg>
                    </span>
                  </a>
                </li>

                <!-- More items... -->

                <li>
                  <a href="#" class="block px-4 py-4 bg-white hover:bg-gray-50">
                    <span class="flex items-center space-x-4">
                      <span class="flex flex-1 space-x-2 truncate">
                        <svg
                          class="flex-shrink-0 w-5 h-5 text-gray-400"
                          x-description="Heroicon name: cash"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z"
                            clip-rule="evenodd"
                          ></path>
                        </svg>
                        <span
                          class="flex flex-col text-sm text-gray-500 truncate"
                        >
                          <span class="truncate">Payment to Miley Davis</span>
                          <span
                            ><span class="font-medium text-gray-900">$300</span>
                            USD</span
                          >
                          <span>April 11, 2020</span>
                        </span>
                      </span>
                      <svg
                        class="flex-shrink-0 w-5 h-5 text-gray-400"
                        x-description="Heroicon name: chevron-right"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                          clip-rule="evenodd"
                        ></path>
                      </svg>
                    </span>
                  </a>
                </li>

                <!-- More items... -->

                <li>
                  <a href="#" class="block px-4 py-4 bg-white hover:bg-gray-50">
                    <span class="flex items-center space-x-4">
                      <span class="flex flex-1 space-x-2 truncate">
                        <svg
                          class="flex-shrink-0 w-5 h-5 text-gray-400"
                          x-description="Heroicon name: cash"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z"
                            clip-rule="evenodd"
                          ></path>
                        </svg>
                        <span
                          class="flex flex-col text-sm text-gray-500 truncate"
                        >
                          <span class="truncate">Payment to Molly Sanders</span>
                          <span
                            ><span class="font-medium text-gray-900"
                              >$20,000</span
                            >
                            USD</span
                          >
                          <span>April 3, 2020</span>
                        </span>
                      </span>
                      <svg
                        class="flex-shrink-0 w-5 h-5 text-gray-400"
                        x-description="Heroicon name: chevron-right"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                          clip-rule="evenodd"
                        ></path>
                      </svg>
                    </span>
                  </a>
                </li>

                <!-- More items... -->

                <li>
                  <a href="#" class="block px-4 py-4 bg-white hover:bg-gray-50">
                    <span class="flex items-center space-x-4">
                      <span class="flex flex-1 space-x-2 truncate">
                        <svg
                          class="flex-shrink-0 w-5 h-5 text-gray-400"
                          x-description="Heroicon name: cash"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z"
                            clip-rule="evenodd"
                          ></path>
                        </svg>
                        <span
                          class="flex flex-col text-sm text-gray-500 truncate"
                        >
                          <span class="truncate">Payment to Doug Mann</span>
                          <span
                            ><span class="font-medium text-gray-900"
                              >$19,500</span
                            >
                            USD</span
                          >
                          <span>April 2, 2020</span>
                        </span>
                      </span>
                      <svg
                        class="flex-shrink-0 w-5 h-5 text-gray-400"
                        x-description="Heroicon name: chevron-right"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                          clip-rule="evenodd"
                        ></path>
                      </svg>
                    </span>
                  </a>
                </li>

                <!-- More items... -->

                <li>
                  <a href="#" class="block px-4 py-4 bg-white hover:bg-gray-50">
                    <span class="flex items-center space-x-4">
                      <span class="flex flex-1 space-x-2 truncate">
                        <svg
                          class="flex-shrink-0 w-5 h-5 text-gray-400"
                          x-description="Heroicon name: cash"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z"
                            clip-rule="evenodd"
                          ></path>
                        </svg>
                        <span
                          class="flex flex-col text-sm text-gray-500 truncate"
                        >
                          <span class="truncate">Payment to Erica Frost</span>
                          <span
                            ><span class="font-medium text-gray-900"
                              >$8,750</span
                            >
                            USD</span
                          >
                          <span>March 29, 2020</span>
                        </span>
                      </span>
                      <svg
                        class="flex-shrink-0 w-5 h-5 text-gray-400"
                        x-description="Heroicon name: chevron-right"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                          clip-rule="evenodd"
                        ></path>
                      </svg>
                    </span>
                  </a>
                </li>

                <!-- More items... -->

                <li>
                  <a href="#" class="block px-4 py-4 bg-white hover:bg-gray-50">
                    <span class="flex items-center space-x-4">
                      <span class="flex flex-1 space-x-2 truncate">
                        <svg
                          class="flex-shrink-0 w-5 h-5 text-gray-400"
                          x-description="Heroicon name: cash"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z"
                            clip-rule="evenodd"
                          ></path>
                        </svg>
                        <span
                          class="flex flex-col text-sm text-gray-500 truncate"
                        >
                          <span class="truncate">Payment to Miley Davis</span>
                          <span
                            ><span class="font-medium text-gray-900">$300</span>
                            USD</span
                          >
                          <span>March 15, 2020</span>
                        </span>
                      </span>
                      <svg
                        class="flex-shrink-0 w-5 h-5 text-gray-400"
                        x-description="Heroicon name: chevron-right"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                          clip-rule="evenodd"
                        ></path>
                      </svg>
                    </span>
                  </a>
                </li>

                <!-- More items... -->
              </ul>

              <nav
                class="flex items-center justify-between px-4 py-3 bg-white border-t border-gray-200"
                aria-label="Pagination"
              >
                <div class="flex justify-between flex-1">
                  <a
                    href="#"
                    class="relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:text-gray-500"
                  >
                    Previous
                  </a>
                  <a
                    href="#"
                    class="relative inline-flex items-center px-4 py-2 ml-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:text-gray-500"
                  >
                    Next
                  </a>
                </div>
              </nav>
            </div>

            <!-- Activity table (small breakopoint and up) -->
            <div class="hidden sm:block">
              <div class="max-w-6xl px-4 mx-auto sm:px-6 lg:px-8">
                <div class="flex flex-col mt-2">
                  <div
                    class="min-w-full overflow-hidden overflow-x-auto align-middle shadow sm:rounded-lg"
                  >
                    <table class="min-w-full divide-y divide-gray-200">
                      <thead>
                        <tr>
                          <th
                            class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase bg-gray-50"
                          >
                            Transaction
                          </th>
                          <th
                            class="px-6 py-3 text-xs font-medium tracking-wider text-right text-gray-500 uppercase bg-gray-50"
                          >
                            Amount
                          </th>
                          <th
                            class="hidden px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase bg-gray-50 md:block"
                          >
                            Status
                          </th>
                          <th
                            class="px-6 py-3 text-xs font-medium tracking-wider text-right text-gray-500 uppercase bg-gray-50"
                          >
                            Date
                          </th>
                        </tr>
                      </thead>
                      <tbody
                        class="bg-white divide-y divide-gray-200"
                        x-max="1"
                      >
                        <tr class="bg-white">
                          <td
                            class="w-full px-6 py-4 text-sm text-gray-900 max-w-0 whitespace-nowrap"
                          >
                            <div class="flex">
                              <a
                                href="#"
                                class="inline-flex space-x-2 text-sm truncate group"
                              >
                                <svg
                                  class="flex-shrink-0 w-5 h-5 text-gray-400 group-hover:text-gray-500"
                                  x-description="Heroicon name: cash"
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                  aria-hidden="true"
                                >
                                  <path
                                    fill-rule="evenodd"
                                    d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z"
                                    clip-rule="evenodd"
                                  ></path>
                                </svg>
                                <p
                                  class="text-gray-500 truncate group-hover:text-gray-900"
                                >
                                  Payment to Molly Sanders
                                </p>
                              </a>
                            </div>
                          </td>
                          <td
                            class="px-6 py-4 text-sm text-right text-gray-500 whitespace-nowrap"
                          >
                            <span class="font-medium text-gray-900"
                              >$20,000
                            </span>
                            USD
                          </td>
                          <td
                            class="hidden px-6 py-4 text-sm text-gray-500 whitespace-nowrap md:block"
                          >
                            <span
                              class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 capitalize"
                            >
                              success
                            </span>
                          </td>
                          <td
                            class="px-6 py-4 text-sm text-right text-gray-500 whitespace-nowrap"
                          >
                            July 11, 2020
                          </td>
                        </tr>

                        <!-- More rows... -->

                        <tr class="bg-white">
                          <td
                            class="w-full px-6 py-4 text-sm text-gray-900 max-w-0 whitespace-nowrap"
                          >
                            <div class="flex">
                              <a
                                href="#"
                                class="inline-flex space-x-2 text-sm truncate group"
                              >
                                <svg
                                  class="flex-shrink-0 w-5 h-5 text-gray-400 group-hover:text-gray-500"
                                  x-description="Heroicon name: cash"
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                  aria-hidden="true"
                                >
                                  <path
                                    fill-rule="evenodd"
                                    d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z"
                                    clip-rule="evenodd"
                                  ></path>
                                </svg>
                                <p
                                  class="text-gray-500 truncate group-hover:text-gray-900"
                                >
                                  Payment to Doug Mann
                                </p>
                              </a>
                            </div>
                          </td>
                          <td
                            class="px-6 py-4 text-sm text-right text-gray-500 whitespace-nowrap"
                          >
                            <span class="font-medium text-gray-900"
                              >$19,500
                            </span>
                            USD
                          </td>
                          <td
                            class="hidden px-6 py-4 text-sm text-gray-500 whitespace-nowrap md:block"
                          >
                            <span
                              class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 capitalize"
                            >
                              processing
                            </span>
                          </td>
                          <td
                            class="px-6 py-4 text-sm text-right text-gray-500 whitespace-nowrap"
                          >
                            July 5, 2020
                          </td>
                        </tr>

                        <!-- More rows... -->

                        <tr class="bg-white">
                          <td
                            class="w-full px-6 py-4 text-sm text-gray-900 max-w-0 whitespace-nowrap"
                          >
                            <div class="flex">
                              <a
                                href="#"
                                class="inline-flex space-x-2 text-sm truncate group"
                              >
                                <svg
                                  class="flex-shrink-0 w-5 h-5 text-gray-400 group-hover:text-gray-500"
                                  x-description="Heroicon name: cash"
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                  aria-hidden="true"
                                >
                                  <path
                                    fill-rule="evenodd"
                                    d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z"
                                    clip-rule="evenodd"
                                  ></path>
                                </svg>
                                <p
                                  class="text-gray-500 truncate group-hover:text-gray-900"
                                >
                                  Payment to Erica Frost
                                </p>
                              </a>
                            </div>
                          </td>
                          <td
                            class="px-6 py-4 text-sm text-right text-gray-500 whitespace-nowrap"
                          >
                            <span class="font-medium text-gray-900"
                              >$8,750
                            </span>
                            USD
                          </td>
                          <td
                            class="hidden px-6 py-4 text-sm text-gray-500 whitespace-nowrap md:block"
                          >
                            <span
                              class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 capitalize"
                            >
                              success
                            </span>
                          </td>
                          <td
                            class="px-6 py-4 text-sm text-right text-gray-500 whitespace-nowrap"
                          >
                            July 4, 2020
                          </td>
                        </tr>

                        <!-- More rows... -->

                        <tr class="bg-white">
                          <td
                            class="w-full px-6 py-4 text-sm text-gray-900 max-w-0 whitespace-nowrap"
                          >
                            <div class="flex">
                              <a
                                href="#"
                                class="inline-flex space-x-2 text-sm truncate group"
                              >
                                <svg
                                  class="flex-shrink-0 w-5 h-5 text-gray-400 group-hover:text-gray-500"
                                  x-description="Heroicon name: cash"
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                  aria-hidden="true"
                                >
                                  <path
                                    fill-rule="evenodd"
                                    d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z"
                                    clip-rule="evenodd"
                                  ></path>
                                </svg>
                                <p
                                  class="text-gray-500 truncate group-hover:text-gray-900"
                                >
                                  Payment to Miley Davis
                                </p>
                              </a>
                            </div>
                          </td>
                          <td
                            class="px-6 py-4 text-sm text-right text-gray-500 whitespace-nowrap"
                          >
                            <span class="font-medium text-gray-900">$300 </span>
                            USD
                          </td>
                          <td
                            class="hidden px-6 py-4 text-sm text-gray-500 whitespace-nowrap md:block"
                          >
                            <span
                              class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 capitalize"
                            >
                              success
                            </span>
                          </td>
                          <td
                            class="px-6 py-4 text-sm text-right text-gray-500 whitespace-nowrap"
                          >
                            July 1, 2020
                          </td>
                        </tr>

                        <!-- More rows... -->

                        <tr class="bg-white">
                          <td
                            class="w-full px-6 py-4 text-sm text-gray-900 max-w-0 whitespace-nowrap"
                          >
                            <div class="flex">
                              <a
                                href="#"
                                class="inline-flex space-x-2 text-sm truncate group"
                              >
                                <svg
                                  class="flex-shrink-0 w-5 h-5 text-gray-400 group-hover:text-gray-500"
                                  x-description="Heroicon name: cash"
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                  aria-hidden="true"
                                >
                                  <path
                                    fill-rule="evenodd"
                                    d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z"
                                    clip-rule="evenodd"
                                  ></path>
                                </svg>
                                <p
                                  class="text-gray-500 truncate group-hover:text-gray-900"
                                >
                                  Payment to Molly Sanders
                                </p>
                              </a>
                            </div>
                          </td>
                          <td
                            class="px-6 py-4 text-sm text-right text-gray-500 whitespace-nowrap"
                          >
                            <span class="font-medium text-gray-900"
                              >$20,000
                            </span>
                            USD
                          </td>
                          <td
                            class="hidden px-6 py-4 text-sm text-gray-500 whitespace-nowrap md:block"
                          >
                            <span
                              class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 capitalize"
                            >
                              failed
                            </span>
                          </td>
                          <td
                            class="px-6 py-4 text-sm text-right text-gray-500 whitespace-nowrap"
                          >
                            June 17, 2020
                          </td>
                        </tr>

                        <!-- More rows... -->

                        <tr class="bg-white">
                          <td
                            class="w-full px-6 py-4 text-sm text-gray-900 max-w-0 whitespace-nowrap"
                          >
                            <div class="flex">
                              <a
                                href="#"
                                class="inline-flex space-x-2 text-sm truncate group"
                              >
                                <svg
                                  class="flex-shrink-0 w-5 h-5 text-gray-400 group-hover:text-gray-500"
                                  x-description="Heroicon name: cash"
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                  aria-hidden="true"
                                >
                                  <path
                                    fill-rule="evenodd"
                                    d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z"
                                    clip-rule="evenodd"
                                  ></path>
                                </svg>
                                <p
                                  class="text-gray-500 truncate group-hover:text-gray-900"
                                >
                                  Payment to Doug Mann
                                </p>
                              </a>
                            </div>
                          </td>
                          <td
                            class="px-6 py-4 text-sm text-right text-gray-500 whitespace-nowrap"
                          >
                            <span class="font-medium text-gray-900"
                              >$19,500
                            </span>
                            USD
                          </td>
                          <td
                            class="hidden px-6 py-4 text-sm text-gray-500 whitespace-nowrap md:block"
                          >
                            <span
                              class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 capitalize"
                            >
                              processing
                            </span>
                          </td>
                          <td
                            class="px-6 py-4 text-sm text-right text-gray-500 whitespace-nowrap"
                          >
                            June 14, 2020
                          </td>
                        </tr>

                        <!-- More rows... -->

                        <tr class="bg-white">
                          <td
                            class="w-full px-6 py-4 text-sm text-gray-900 max-w-0 whitespace-nowrap"
                          >
                            <div class="flex">
                              <a
                                href="#"
                                class="inline-flex space-x-2 text-sm truncate group"
                              >
                                <svg
                                  class="flex-shrink-0 w-5 h-5 text-gray-400 group-hover:text-gray-500"
                                  x-description="Heroicon name: cash"
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                  aria-hidden="true"
                                >
                                  <path
                                    fill-rule="evenodd"
                                    d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z"
                                    clip-rule="evenodd"
                                  ></path>
                                </svg>
                                <p
                                  class="text-gray-500 truncate group-hover:text-gray-900"
                                >
                                  Payment to Erica Frost
                                </p>
                              </a>
                            </div>
                          </td>
                          <td
                            class="px-6 py-4 text-sm text-right text-gray-500 whitespace-nowrap"
                          >
                            <span class="font-medium text-gray-900"
                              >$8,750
                            </span>
                            USD
                          </td>
                          <td
                            class="hidden px-6 py-4 text-sm text-gray-500 whitespace-nowrap md:block"
                          >
                            <span
                              class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 capitalize"
                            >
                              success
                            </span>
                          </td>
                          <td
                            class="px-6 py-4 text-sm text-right text-gray-500 whitespace-nowrap"
                          >
                            June 3, 2020
                          </td>
                        </tr>

                        <!-- More rows... -->
                      </tbody>
                    </table>
                    <!-- Pagination -->
                    <nav
                      class="flex items-center justify-between px-4 py-3 bg-white border-t border-gray-200 sm:px-6"
                      aria-label="Pagination"
                    >
                      <div class="hidden sm:block">
                        <p class="text-sm text-gray-700">
                          Showing
                          <span class="font-medium">1</span>
                          to
                          <span class="font-medium">10</span>
                          of
                          <span class="font-medium">20</span>
                          results
                        </p>
                      </div>
                      <div class="flex justify-between flex-1 sm:justify-end">
                        <a
                          href="#"
                          class="relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                        >
                          Previous
                        </a>
                        <a
                          href="#"
                          class="relative inline-flex items-center px-4 py-2 ml-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                        >
                          Next
                        </a>
                      </div>
                    </nav>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  </div>
</template>

<script>
import Logo from '@/assets/vectors/logo.svg?inline'

export default {
  components: {
    Logo,
  },
  data() {
    return {
      sidebarOpen: false,
      open: false,
      user: {
        emailVerified: false,
        isBanned: false,
        streamerMode: false,
        role: 'user',
        _id: '5f566fdd853a10598b553a24',
        username: 'MrDemonWolf',
        email: 'mrdemonwolf@example.com',
        createdAt: '2020-09-07T17:37:33.526Z',
        updatedAt: '2020-09-07T17:37:33.526Z',
        slug: 'mrdemonwolf',
      },
    }
  },
}
</script>
