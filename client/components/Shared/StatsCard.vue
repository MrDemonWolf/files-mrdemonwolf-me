<template>
  <div class="overflow-hidden bg-white rounded-lg shadow">
    <div class="p-5">
      <div class="flex items-center">
        <div class="flex-shrink-0">
          <fa :icon="[faIconType, faIconName]" class="w-6 h-6 text-gray-400" />
        </div>
        <div class="flex-1 w-0 ml-5">
          <dl>
            <dt class="text-sm font-medium text-gray-500 truncate">
              {{ title }}
            </dt>
            <dd>
              <content-loader
                v-if="loadingCount"
                :width="259"
                :height="28"
                :speed="3"
                primary-color="#ffffff"
                :secondary-color="colors.primary"
              >
                <rect x="0" y="0" rx="0" ry="0" width="259" height="28" />
              </content-loader>
              <div v-else class="text-lg font-medium text-gray-900">
                {{ count }}
              </div>
            </dd>
          </dl>
        </div>
      </div>
    </div>
    <div
      :class="{ 'py-3 px-3': viewAll, 'py-5 px-7': !viewAll }"
      class="bg-gray-50"
    >
      <div v-if="viewAll" class="text-sm">
        <nuxt-link
          :to="viewAllLink"
          class="font-medium text-indigo-700 hover:text-indigo-900"
        >
          {{ viewAllLinkText }}
        </nuxt-link>
      </div>
    </div>
  </div>
</template>
<script>
const { theme } = require('../../tailwind.config')

export default {
  props: {
    faIconType: {
      type: String,
      required: true,
    },
    faIconName: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    count: {
      type: Number,
      required: true,
    },
    loadingCount: {
      type: Boolean,
      default: true,
    },
    viewAll: {
      type: Boolean,
      default: false,
    },
    viewAllLink: {
      type: String,
      default: '',
    },
    viewAllLinkText: {
      type: String,
      default: '',
    },
  },

  data() {
    return {
      colors: {
        primary: theme.extend.colors.primary[500],
      },
    }
  },
}
</script>
