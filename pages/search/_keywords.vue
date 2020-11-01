<template>
  <div class="keywordsContainer" :class="{'mobile': mobileLayout}">
    <div class="containerLeft">
      <div class="keywordsTitle">
        搜索：{{ keywords }} 
      </div>

      <div class="article">
        <articleView
          :articlePage="articlePage"
          :haveMoreArt="false"></articleView>
      </div>

    </div>
    <rightPanel />

  </div>
</template>
<script>
import articleView from '~/components/common/article'
import rightPanel from "~/components/layouts/rightPanel"

export default {

  name: 'keywords',

  transition: 'fade',

  scrollToTop: true,

  head() {
    return { 
      title: `关键词搜索：${this.keywords}_${this.option.title}`,
      meta: [
        {
          hid: 'keywords',
          name: 'keywords',
          content: this.keywords
        },
        {
          hid: 'og:title',
          name: 'og:title',
          content: `关键词搜索：${this.keywords} - ${this.option.title}`
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

  async fetch ({ store, params }) {
    const categoryList = await store.dispatch('article/getArtList', {
      ...params,
      pageSize: 1000
    })
    const refList = await store.dispatch('article/getRefList', {
    })
    return {categoryList, refList}
  },

  data () {
    return {}
  },
  components: {
    articleView,rightPanel
  },

  computed: {
    mobileLayout () {
      return this.$store.state.options.mobileLayout
    },

    keywords () {
      return this.$route.params.keywords
    },

    option () {
      return this.$store.state.options.option
    },

    articlePage () {
      return this.$store.state.article.art
    }
  }
}
</script>

<style scoped lang="scss">
.keywordsContainer {
  margin: 0 auto 20px;
  display: flex;
  width: $container-width;

  &.mobile {
    width: 100%;
    transform: translate(0);
  }

  .containerLeft {
    width: $container-left-width;
    >.keywordsTitle {
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
