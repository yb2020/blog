<template>
  <div class="indexContainer" :class="{'mobile': mobileLayout}">
    <div class="containerLeft">
      <articleView
          :articlePage="articlePage"
          :haveMoreArt="false"
          :havePreArt="false"
          :currentPage="currentPage"
          currentType=""></articleView>
    </div>
    <rightPanel />
  </div>
</template>

<script>
import articleView from '~/components/common/article'
import rightPanel from "~/components/layouts/rightPanel"
export default {
  name: 'index',
  scrollToTop: true,
  transition: 'fade',

  head() {
    return {
      title: this.option.title,
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
  data() {
    return {
      currentPage: 1
    }
  },
  components: {
    articleView, rightPanel
  },

  async fetch ({ store }) {
    const indexAll = await store.dispatch('article/getArtList', {
      page_size: 1000
    })
    const refList = await store.dispatch('article/getRefList', {
    })
    return {indexAll, refList}
  },

  computed: {
    tag () {
      return this.$store.state.tag.data
    },
    articlePage () {
      return this.$store.state.article.art
    },
    option () {
      return this.$store.state.options.option
    },
    mobileLayout () {
      return this.$store.state.options.mobileLayout
    }
  },

  filters: {
    monthFilter (val) {
    //   val = parseInt(val)
    //   switch (val) {
    //     case 1: return 'January'
    //     case 2: return 'February'
    //     case 3: return 'March'
    //     case 4: return 'April'
    //     case 5: return 'May'
    //     case 6: return 'June'
    //     case 7: return 'July'
    //     case 8: return 'August'
    //     case 9: return 'September'
    //     case 10: return 'October'
    //     case 11: return 'November'
    //     case 12: return 'December'
    //   }
      return val
    }
  },

  methods: {
    goType(item) {
      let route = '/code';
      if (item.type === 2) route = '/think';
      if (item.type === 3) route = 'fuck';
      this.$router.push(route);
    }
  }
}
</script>

<style scoped lang="scss">
.indexContainer {
  margin: 0 auto 20px;
  display: flex;
  width: $container-width;
  
  .containerLeft {
    width: $container-left-width;

    .item {
      border-bottom: 2px solid #565656;

      .title {
        display: flex;
        align-items: baseline;
        justify-content: space-between;
        .titleContent {
           display: -webkit-box;
           align-items: baseline;
           width: 90%;

          .yearLabel {
            font-size: 78px;
            font-style: italic;
            color: #2d2d2f;
            font-weight: bold;
            width: 200px;
          }
          .content {
            position: relative;
            left: -180px;
            top: -18px;
            font-size: 20px;
            font-weight: bolder;
            z-index: 20;
          }
        }
        .isTop {
          font-size: 30px;
          font-style: italic;
          font-weight: bold;
          color: #9c4419;
          position: relative;
          top: -10px;
          width: 70px;
        }

      }
      .titleBorder {
        position: relative;
        bottom: 24px;
        height: 1px;
        width: 60%;
        background-color: #3a3b3e;
      }
      .coverImage {
        position: relative;
        top: -10px;
        img {
          width: 80%;
          border-radius: 6px;
        }
      }
      .summary {
        font-size: 14px;
        padding: 0px 10px;
      }
      .itemFooter {
        display: flex;
        align-items: baseline;
        justify-content: space-between;
        font-size: 12px ;
        padding: 10px 10px 5px 10px;;
        .category {
          color: #acc0ff;
        }
        .time {
          color: #5e5d6f;
        }
      }
      a:hover {
        color: $href;
        text-decoration: underline;
      }
    }
    
  }
  
  >.title {
    position: relative;
    display: flex;
    justify-content: space-between;
    padding: 0.5rem 0rem;
    line-height: 1.5rem;
    color: $black;
    font-size: 1rem;
    font-weight: normal;

    > p {
      position: relative;
      padding-right: $lg-pad;
      background: $white;
      z-index: 99;      
    }

    > .line {
      top: 50%;
    }

    &.sitemap-article {
      margin-top: 1rem;
    }
  }

  &.mobile {
    width: 100%;
    transform: translate(0);
    
    .sitemap-article-list {
      padding: .8rem;

      .month-list {
        margin: .8rem;


        .sitemap-list {
          padding: .4rem .8rem;
        }
      }
    }

    >.tag {
      padding: .8rem;
    }
  }

  .sitemap-article-list {
    padding: 1rem;

    .year-name {
      font-size: 1.5rem;
    }

    .month-list {
      margin: 1rem 2rem;

      .month-name {
        margin-bottom: .5rem;
      }

      .sitemap-list {
        padding: .5rem 2rem;

        article {
          position: relative;
          display: flex;
          align-items: center;
          height: 5rem;
          line-height: 1.8rem;

          &::before {
            content: " ";
            position: absolute;
            left: 0px;
            top: 2.3rem;
            width: 6px;
            height: 6px;
            margin-left: -4px;
            background: $dividers;
            border-radius: 50%;
          }

          time {
            margin-left: .5rem;
            color: $dividers;
            font-size: $font-size-small;
            width: 6rem;
          }

          a {
            width: 70%;
            margin-left: $md-pad;
            text-decoration: none;
            color: $black;
            //@include text-overflow();
          }
          
          a:hover {
            width: 70%;
            margin-left: $md-pad;
            text-decoration: underline;
            color: $black;
            //@include text-overflow();
          }

          span {
            margin-left: .8rem;
            color: $red;

            &.tag {
              cursor: pointer;
              color: $blue;
            }
          }
        }
      }
    }

    .sitemap-item {
      padding: 1rem;

      article {
        position: relative;
        display: flex;
        align-items: center;
        height: 20px;
        line-height: 20px;

        &::before {
          content: " ";
          position: absolute;
          left: 0px;
          top: 6px;
          width: 6px;
          height: 6px;
          margin-left: -4px;
          background: $dividers;
          border-radius: 50%;
        }

        time {
          width: 2.3rem;

          margin-left: $md-pad;
          color: $dividers;
          font-size: $font-size-small;
        }

        a {
          margin-left: $md-pad;
          text-decoration: underline;
          color: $black;
          @include text-overflow();
          width: 70%;
        }

          span {
            margin-left: .8rem;
            color: $red;

            &.tag {
              cursor: pointer;
              color: $blue;
            }
          }
      }
    }
  }

  >.tag {

    >.tag-item {
      float: left;
      margin: .3rem;

      >a {
        display: block;
        padding: .4rem;
        color: $black;

        &:hover {
          color: $black;
        }
      }
    }
  }
}

</style>
