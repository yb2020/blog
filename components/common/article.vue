<template>
    <div tag="div" class="article-box" :class="{'mobile': mobileLayout}">
      <div
        class="article-item"
        v-for="item in articleList"
        :key="item.id"
        :class="{'mobile-article': mobileLayout}">
        <div class="content">
          <p class="title"><nuxt-link :to="`/article/${item.url}`">{{ item.title }}</nuxt-link></p>
          <!--
          <nuxt-link :to="`/article/${item.url}`" v-if="mobileLayout">
            <img :src="option.staticDomain + '?imageView2/1/w/350/h/180/watermark/2/text/amtjaGFvLmNu/font/Y2FuZGFyYQ==/fontsize/400/fill/I0ZGRkZGRg=='"
            alt=""
            width="100%"
            class="mobil-img"/>
          </nuxt-link>
          -->
          <nuxt-link :to="`/article/${item.url}`">
          <div class="abstrack">
            {{ item.summary | text(200)}}
          </div>
          </nuxt-link>
          <div class="meta">
            <span class="time" v-if="!mobileLayout">
              {{
                item.publishDate | dateFormat('yyyy年MM月dd日 hh时mm分')
              }}
            </span>
            <span class="time" v-else>
              {{
                item.publishDate | dateFormat('yy.MM.dd hh:mm')
              }}
            </span>
            <span class="hr"></span>
            <span class="read"> {{ !item.readCount && item.readCount == 0 ? 0 : item.readCount }} 次阅读</span>
            <span class="hr"></span>
            <span class="like"> 喜欢({{ !item.likeCount && item.likeCount == 0 ? 0 : item.likeCount }})</span>
            <span class="hr"></span>
            <span class="comments" v-if="item.openComment"> 评论({{ !item.commentCount && item.commentCount == 0 ? 0 : item.commentCount }})</span>
            <span class="comments" v-else> 已关闭评论</span>
          </div>
        </div>
        <span class="article-line"></span>
      </div>

      <div v-if="articleList.length === 0 && !fetch" class="empty-article" key="0">
        没有文章了
      </div>

      <div v-show="fetch" key="-1" class="loading-article">
        <loadingCom></loadingCom>
      </div>

      <div class="article-foot" key="-2" v-if="!fetch">
        <div class="pre-article">
          <nuxt-link :to="this.type ? `/${this.type}/${this.currentPage - 1}` : `/${this.currentPage - 1}`" v-show="havePreArt">上一页</nuxt-link>
        </div>

        <div class="loading-more end-article" key="-2" v-show="haveMoreArt">
          <nuxt-link :to="this.type ? `/${this.type}/${this.currentPage + 1}` : `/${this.currentPage + 1}`">下一页</nuxt-link>
        </div>
      </div>
    </div>

</template>

<script>
import loadingCom from '~/components/common/loading/index.vue'
export default {
  components: {
    loadingCom
  },
  name: 'article-box',

  props: ['articleList', 'haveMoreArt', 'havePreArt', 'currentPage', 'currentType'],

  computed: {
    fetch () {
      // return true
      return this.$store.state.article.fetch
    },

    option () {
      return this.$store.state.options.option
    },

    mobileLayout () {
      return this.$store.state.options.mobileLayout
    },

    type() {
      return ['', 'code', 'think', 'fuck'][this.currentType]
    }
  }
}
</script>

<style scoped lang="scss">

.article-box {
  width: $container-left;
  margin: 0 auto;

  >.article-item {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: $lg-pad 0 $normal-pad;
    margin-bottom: $xlg-pad;
    color: $black;

    .title {
      margin-bottom: $sm-pad;
      font-size: $font-size-large;
      font-weight: 700;
    }

    &.mobile-article {

      &:hover {
        background: $module-bg;
      }

      >.content {
        width: 100%;
        margin: 0;

        >a {
          display: block;
          margin-bottom: .5rem;
          width: 100%;
        }

        .meta {      
          color: $descript;
        }

        .mobil-img {
          max-width: 100%;
          max-height: 200px;
        }
      }
    }

    >.content {

      >.title {
        padding-bottom: 10px ;
        //@include content-overflow(1);
      }

      .abstrack {
        margin: 1rem 0;
        min-height: 4rem;
        line-height: 2rem;
        color: $text;
        @include content-overflow(3);
      }

      >.meta {
        display: flex;
        flex-wrap: nowrap;
        align-items: center;
        margin-top: $sm-pad;
        padding-top: 1rem;
        height: 1rem;
        line-height: 1rem;
        font-size: $font-size-small;
        color: $secondary;
      }
    }

    >a {
      display: block;
      width: 10rem;

      >.pc-thumb {
        width: 100%;
        height: 6rem;
        line-height: 6rem;
        overflow: hidden;
      }
    }

    > .article-line {
      position: absolute;
      left: -$mlg-pad;
      bottom: -$mlg-pad;
      width: $xlg-pad * 2;
      height: 1px;
      background: $border-color;
    }
  }

  .article-foot {
    display: flex;
    justify-content: space-between;
  }

  .loading-article,
  .empty-article,
  .pre-article,
  .end-article {
    padding: $md-pad 0;
    color: $black;
  }

  .empty-article {
    text-align: center;
    font-size: $font-size-base;
    margin-top: $md-pad;
  }

  .loading-article {
    text-align: center;
  }

  &.mobile {
    width: 100%;

    .end-article {
      margin-bottom: 0;
      padding: 1rem 0;
    }
  }
}

</style>
