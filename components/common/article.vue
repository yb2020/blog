<template>
    <div tag="div" class="article-box" :class="{'mobile': mobileLayout}">
      <div class="item"
        v-for="item in articlePage.list"
        :key="item.id"
        :class="{'mobile-article': mobileLayout}">

        <div class="title">
          <div class="titleContent">
            <div class="yearLabel">
              {{item.publishDate | parseTime('{y}')}}
            </div>
            <div class="content">
              <nuxt-link :to="`/article/${item.url}`">{{ item.title }}</nuxt-link>
            </div>
          </div>
          <div class="isTop" v-if="item.isTop">置顶</div>
        </div>
        <div class="titleBorder"></div>
        <div class="coverImage" v-if="item.thumbUrl">
          <nuxt-link :to="`/article/${item.url}`"><img :src="option.staticDomain + item.thumbUrl" /></nuxt-link>
        </div>
        <div class="summary"><a href="#">{{ item.summary | text(200)}}</a></div>
        <div class="itemFooter">
          <div class="category">
            分类：<a v-if="item.category" :href="`/category/${item.categoryId}`">{{item.category}}</a><span v-else>暂无分类</span>
            &nbsp;&nbsp;点赞({{ !item.likeCount && item.likeCount == 0 ? 0 : item.likeCount }})
            &nbsp;&nbsp;阅读({{ !item.readCount && item.readCount == 0 ? 0 : item.readCount }})
            &nbsp;&nbsp;
            <span class="comments" v-if="item.openComment"> 评论({{ !item.commentCount && item.commentCount == 0 ? 0 : item.commentCount }})</span>
            <span class="comments" v-else> 已关闭评论</span>
          </div>
          <div class="time" v-if="!mobileLayout">
            发表于：{{
                item.publishDate | parseTime()
              }} 最后修改于：{{item.modifyDate | formatTime()}} <span v-if="item.author === user.name">作者：<a href="/aboutMe">{{item.author}}</a></span><span v-else>转载自：item.author</span>
          </div>
        </div>
      </div>
      <div v-if="articlePage.total === 0 && !fetch" class="empty-article" key="0">
        没有文章了
      </div>

      <div v-show="fetch" key="-1" class="loading-article">
        <loadingCom></loadingCom>
      </div>

      <div class="article-foot" key="-2" v-if="false">
        <div class="pre-article">
          <nuxt-link :to="`/${this.currentPage - 1}`">上一页</nuxt-link>
        </div>

        <div class="loading-more end-article" key="-2" v-show="haveMoreArt">
          <nuxt-link :to="`/${this.currentPage + 1}`">下一页</nuxt-link>
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

  props: ['articlePage', 'haveMoreArt', 'havePreArt', 'currentPage', 'currentType'],

  computed: {
    fetch () {
      // return true
      return this.$store.state.article.fetch
    },

    user () {
      return this.$store.state.options.adminInfo
    },

    option () {
      return this.$store.state.options.option
    },

    mobileLayout () {
      return this.$store.state.options.mobileLayout
    }
  }
  
}
</script>

<style scoped lang="scss">

.article-box {
  width: $container-left;
  margin: 0 auto;

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
