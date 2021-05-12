<template>
  <main class="relative z-0 flex-1 pb-8 overflow-y-auto">
    <div class="bg-white shadow dark:bg-gray-600">
      <div class="px-4 sm:px-6 lg:max-w-6xl lg:mx-auto lg:px-8">
        <div
          class="py-6 md:flex md:items-center md:justify-between lg:border-t lg:border-gray-200 dark:border-transparent"
        >
          <div class="flex-1 min-w-0">
            <div class="flex items-center">
              <div>
                <div class="flex items-center">
                  <h1
                    class="ml-3 text-2xl font-bold leading-7 text-gray-900 sm:leading-9 sm:truncate dark:text-white"
                  >
                    Good morning,
                    <span class="text-primary-500 dark:text-primary-100">{{
                      $auth.user.username
                    }}</span>
                  </h1>
                </div>
                <dl
                  class="flex flex-col mt-6 sm:ml-3 sm:mt-1 sm:flex-row sm:flex-wrap"
                >
                  <dt class="sr-only">Role</dt>
                  <dd
                    class="flex items-center text-sm font-medium text-gray-500 capitalize dark:text-white sm:mr-6"
                  >
                    <svg
                      class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400 dark:text-gray-100"
                      x-description="Heroicon name: solid/office-building"
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
                    {{ $auth.user.role }}
                  </dd>
                  <dt v-if="$auth.user.isVerified" class="sr-only">
                    Verified Account
                  </dt>
                  <dd
                    v-if="$auth.user.isVerified"
                    class="flex items-center mt-3 text-sm font-medium text-gray-500 capitalize sm:mr-6 sm:mt-0"
                  >
                    <svg
                      class="flex-shrink-0 mr-1.5 h-5 w-5 text-green-400"
                      x-description="Heroicon name: solid/check-circle"
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
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div class="flex mt-6 space-x-3 md:mt-0 md:ml-4">
            <button
              type="button"
              class="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:bg-grat-200"
            >
              Quick Link
            </button>
            <button
              type="button"
              class="inline-flex items-center px-4 py-2 text-sm font-medium text-white border border-transparent rounded-md shadow-sm bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Quick Upload
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="mt-8">
      <div class="max-w-6xl px-4 mx-auto sm:px-6 lg:px-8">
        <h2 class="text-lg font-medium leading-6 text-gray-900 dark:text-white">
          Overview
        </h2>
        <div
          class="grid grid-cols-1 gap-5 mt-2 sm:grid-cols-2 lg:grid-cols-3"
          x-max="1"
        >
          <SharedStatsCard
            fa-icon-type="fas"
            fa-icon-name="file"
            title="Total Shares"
            :count="stats.uploads.total"
            :loading-count="loading.stats"
            :view-all="true"
            view-all-link="/uploads"
            view-all-text=" View all"
          />

          <SharedStatsCard
            fa-icon-type="fas"
            fa-icon-name="link"
            title="Total Links"
            :count="stats.links.total"
            :loading-count="loading.stats"
            :view-all="true"
            view-all-link="/links"
            view-all-text=" View all"
          />

          <SharedStatsCard
            fa-icon-type="fas"
            fa-icon-name="link"
            title="Total Space"
            :count="stats.space.used"
            :loading-count="loading.stats"
            :view-all="false"
          />
        </div>
      </div>

      <h2
        class="max-w-6xl px-4 mx-auto mt-8 text-lg font-medium leading-6 text-gray-900 sm:px-6 lg:px-8 dark:text-white"
      >
        Recent activity
      </h2>

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
                    x-description="Heroicon name: solid/cash"
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
                  <span class="flex flex-col text-sm text-gray-500 truncate">
                    <span class="truncate">Payment to Molly Sanders</span>
                    <span
                      ><span class="font-medium text-gray-900">$20,000</span>
                      USD</span
                    >
                    <span>July 11, 2020</span>
                  </span>
                </span>
                <svg
                  class="flex-shrink-0 w-5 h-5 text-gray-400"
                  x-description="Heroicon name: solid/chevron-right"
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
                      Share
                    </th>
                    <th
                      class="px-6 py-3 text-xs font-medium tracking-wider text-right text-gray-500 uppercase bg-gray-50"
                    >
                      Type
                    </th>
                    <th
                      class="px-6 py-3 text-xs font-medium tracking-wider text-right text-gray-500 uppercase bg-gray-50"
                    >
                      Created At
                    </th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200" x-max="1">
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
                            x-description="Heroicon name: solid/cash"
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
                            TAeSBvfAC9rn6MZq
                          </p>
                        </a>
                      </div>
                    </td>
                    <td
                      class="px-6 py-4 text-sm text-right text-gray-500 whitespace-nowrap"
                    >
                      <span class="font-medium text-gray-900">File</span>
                    </td>
                    <td
                      class="px-6 py-4 text-sm text-right text-gray-500 whitespace-nowrap"
                    >
                      July 11, 2020
                    </td>
                  </tr>

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
                            x-description="Heroicon name: solid/cash"
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
                            JPcsywd4chB654zw
                          </p>
                        </a>
                      </div>
                    </td>
                    <td
                      class="px-6 py-4 text-sm text-right text-gray-500 whitespace-nowrap"
                    >
                      <span class="font-medium text-gray-900">Link</span>
                    </td>
                    <td
                      class="px-6 py-4 text-sm text-right text-gray-500 whitespace-nowrap"
                    >
                      July 5, 2020
                    </td>
                  </tr>
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
</template>

<script>
export default {
  layout: 'dashboard',

  middleware: ['auth'],

  data() {
    return {
      stats: {
        uploads: {
          total: 0,
        },
        links: {
          total: 0,
        },
        space: {
          used: 0,
          left: 0,
          total: 0,
        },
      },
      loading: {
        stats: true,
      },
    }
  },

  mounted() {
    this.getStats()
  },

  methods: {
    async getStats() {
      try {
        const res = await this.$axios.$get('/api/stats')
        this.stats.uploads.total = res.data.stats.uploads.total
        this.stats.links.total = res.data.stats.links.total
        this.stats.space.used = res.data.stats.space.used
        this.stats.space.left = res.data.stats.space.left
        this.stats.space.total = res.data.stats.space.total
        this.loading.stats = false
      } catch (e) {
        this.loading.stats = false
      }
    },
  },
  head() {
    return {
      title: 'Dashboard',
    }
  },
}
</script>
