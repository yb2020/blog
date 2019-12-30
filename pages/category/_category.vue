<template>
  <div class="category">
    <p class="title">
      <span class="title-name"><i class="iconfont icon-category"></i> {{ category.name }} </span>
      <span class="line"></span>
    </p>
    <div class="article">
      <articleView
        :articleList="list"
        :haveMoreArt="false"
        :havePreArt="false"
        :currentPage="currentPage"
        currentType=""></articleView>
    </div>
  </div>
</template>
<script>

import articleView from '~/components/common/article'

export default {

  name: 'category',

  transition: 'fade',

  scrollToTop: true,

  fetch ({ store, params }) {
    return store.dispatch('article/getArtList', {
      ...params,
      page_size: 20
    })
  },
  
  head() {
    return {
      title: `${this.category.name}-分类-${this.option.title}`,
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
    articleView
  },

  computed: {
    mobileLayout () {
      return this.$store.state.options.mobileLayout
    },

    category () {
      const idName = this.$route.params.category
      return this.$store.state.nav.data.find(item => item.idName === idName)
    },

    list () {
      return this.$store.state.article.art.list
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

.category > .title {
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
