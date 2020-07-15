<template>
  <main class="home" aria-labelledby="main-title">
    <header class="hero text-primary bg-background-primary">
      <h1 id="main-title">Blog</h1>

      <p class="description opacity-75">{{ data.tagline || $description || 'Welcome To My Blogs' }}</p>
    </header>

    <Content class="theme-default-content custom"/>

    <div>
      <div class="flex-grow">
        <div v-for="post in posts" class="mb-12 bg-background-content p-4 rounded-lg shadow-lg">
          <span class="text-3xl font-bold">
            <router-link :to="post.path" class="text-primary pb-1">{{ post.title}}</router-link>
          </span>
          <div class="mb-4 opacity-75 pt-1">
            <span>{{formateDate(post.frontmatter.date)}}</span>
            <span>&middot;</span>
            <span>{{post.readingTime.text}}</span>
            <span class="px-6 py-4">
              <span
                v-for="tag in post.frontmatter.tags"
                class="inline-block bg-background-primary rounded-full px-3 py-1 text-sm font-semibold text-primary mr-2"
              >#{{ tag }}</span>
            </span>
          </div>
          <div class="text-lg mb-4">{{post.frontmatter.description}}</div>
          <div class="mb-8">
            <router-link :to="post.path" class="font-bold uppercase">Read More</router-link>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import NavLink from "@theme/components/NavLink.vue";
import moment from "moment";


export default {
  components: { NavLink },
  methods: {
    formateDate(date) {
      return moment(date).format("MMM Do YYYY");
    }
  },

  computed: {
    data() {
      return this.$page.frontmatter;
    },

    actionLink() {
      return {
        link: this.data.actionLink,
        text: this.data.actionText
      };
    },

    posts() {
      return this.$site.pages
        .filter(x => x.path.startsWith("/blog/") && !x.frontmatter.blog_index)

        .sort(
          (a, b) => new Date(b.frontmatter.date) - new Date(a.frontmatter.date)
        );
    }
  }
};
</script>

<style lang="stylus">
.home {
  padding: $navbarHeight 2rem 0;
  max-width: 960px;
  margin: 0px auto;
  display: block;

  .hero {
    text-align: center;

    img {
      max-width: 100%;
      max-height: 280px;
      display: block;
      margin: 3rem auto 1.5rem;
    }

    h1 {
      font-size: 3rem;
    }

    h1, .description, .action {
      margin: 1.8rem auto;
    }

    .description {
      max-width: 35rem;
      font-size: 1.6rem;
      line-height: 1.3;
    }
  }

  .footer {
    padding: 2.5rem;
    border-top: 1px solid var(--border-color);
    text-align: center;
  }
}

@media (max-width: $MQMobileNarrow) {
  .home {
    padding-left: 1.5rem;
    padding-right: 1.5rem;

    .hero {
      img {
        max-height: 210px;
        margin: 2rem auto 1.2rem;
      }

      h1 {
        font-size: 2rem;
      }

      h1, .description, .action {
        margin: 1.2rem auto;
      }

      .description {
        font-size: 1.2rem;
      }
    }
  }
}
</style>
