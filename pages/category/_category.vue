<template>
  <div class="categoryContainer" :class="{'mobile': mobileLayout}">
    <div class="containerLeft">
      <div class="categoryTitle">
        <i class="iconfont icon-release"></i>{{ category.name }}
      </div>

      <div class="article">
        <articleView
          :articlePage="articlePage"
          :haveMoreArt="false"
          :havePreArt="false"
          :currentPage="currentPage"
          currentType=""></articleView>
      </div>
    </div>
    <rightPanel :isAll="false" />
  </div>
</template>
<script>
import articleView from '~/components/common/article'
import rightPanel from "~/components/layouts/rightPanel"

export default {

  name: 'category',

  transition: 'fade',

  scrollToTop: true,

  async fetch ({ store, params }) {
    const categoryList = await store.dispatch('article/getArtList', {
      ...params,
      pageSize: 20
    })
    const refList = await store.dispatch('article/getRefList', {
      ...params
    })
    return {categoryList, refList}
  },
  
  head() {
    return {
      title: `${this.category.name}_分类_${this.option.title}`,
      meta: [
        {
          hid: 'keywords',
          name: 'keywords',
          content: this.keywords
        },
        {
          hid: 'og:title',
          name: 'og:title',
          content: this.option.title
        },
        {
          hid: 'og:type',
          name: 'og:type',
          content: 'app'
        },
        {
          hid: 'description',
          name: 'description',
          content: this.option.description
        },
        {
          hid: 'og:description',
          name: 'og:description',
          content: this.option.description
        },
        {
          hid: 'content',
          name: 'content',
          content: this.option.content
        },
        {
          name: 'Copyright',
          content: this.option.author + "版权所有"
        },
        {
          name: 'author',
          content: this.option.author
        }
      ],
      link: [
        {
          hid: 'shortcut icon',
          rel: 'shortcut icon',
          href: this.option.staticDomain + this.option.icon
        },
        {
          hid: 'icon',
          rel: 'icon',
          href: this.option.staticDomain + this.option.icon
        }
      ]
    }
  },

  data () {
    return {}
  },

  components: {
    articleView, rightPanel
  },

  computed: {
    mobileLayout () {
      return this.$store.state.options.mobileLayout
    },

    category () {
      const idName = this.$route.params.category
      return this.$store.state.nav.data.find(item => item.idName === idName)
    },

    articlePage () {
      return this.$store.state.article.art
    },

    option () {
      return this.$store.state.options.option
    },

    currentPage() {
      return this.$store.state.article.art.pageNum
    }
  }
}
</script>

<style scoped lang="scss">

.categoryContainer {
  margin: 0 auto 20px;
  display: flex;
  width: $container-width;

  .containerLeft {
    width: $container-left-width;
    >.categoryTitle {
      background: #1a1a1b;
      padding: 10px;
      border-radius: 5px;
      font-size: 24px;
      font-style: italic;
      color: #2fa7ff;

      >.iconfont {
        font-size: 24px ;
      }
    }
  }

  .containerRight {
    width: $container-right-width;
    margin-left: 20px;

    a:hover {
      text-decoration: underline;
    }
  }

  &.mobile {
    width: 100%;
    transform: translate(0);
  }

  >.title {
    position: relative;
    display: flex;
    align-items: center;
    padding: 0.5rem 0rem;
    line-height: 1.5rem;
    font-size: 1rem;
    font-weight: normal;

    i {
      margin-right: .5rem;
    }

    > .title-name {
      position: relative;
      padding-right: $lg-pad;
      background: $white;
      z-index: 99;      
    }

    > .line {
      top: 50%;
    }
  }
}
</style>
