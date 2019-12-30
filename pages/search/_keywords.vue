<template>
  <div class="keywords">

    <p class="title ">
      <span class="title-name"><i class="iconfont icon-search"></i>{{ keywords }}</span>
      <span class="line"></span>
    </p>

    <div class="article">
      <articleView
        :articleList="list"
        :haveMoreArt="false"></articleView>
    </div>
  </div>
</template>
<script>

import articleView from '~/components/common/article'

export default {

  name: 'keywords',

  transition: 'fade',

  scrollToTop: true,

  head() {
    return { 
      title: `关键词搜索：${this.keywords} - ${this.option.title}`,
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

  fetch ({ store, params }) {
    return store.dispatch('article/getArtList', {
      ...params,
      page_size: 100
    })
  },

  data () {
    return {}
  },

  components: {
    articleView
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

    list () {
      return this.$store.state.article.art.list
    }
  }
}
</script>

<style scoped lang="scss">

.keywords > .title {
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
</style>
