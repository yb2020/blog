<template>
  <div class="containerRight" v-if="!mobileLayout" >
    <div class="publicWechatContainer">
      <div class="title">
        <div class="content">
          关注我
        </div>
        <div class="more"><a href="/aboutMe">关于我>></a></div>
      </div>
      <div class="content">
        <img v-if="user.wxPublicAccount" :src="option.staticDomain + user.wxPublicAccount" />
        <div class="slogan">{{user.slogan}}</div>
        <marqueeUp ref="marqueeUp" :list="followTips"></marqueeUp>
      </div>
      <div class="contactMe">
        <a :href="getContactMeUrl(`github`)" target="_blank"><i class="iconfont icon-github"></i></a>
        <a :href="getContactMeUrl(`weibo`)" target="_blank"><i class="iconfont icon-weibo"></i></a>
        <a :href="getContactMeUrl(`zhihu`)" target="_blank"><i class="iconfont icon-zhihu"></i></a>
        <a :href="getContactMeUrl(`bilibili`)" target="_blank"><i class="iconfont icon-bilibili"></i></a>
      </div>
    </div>

    <div class="hotArticleContainer" ref="hotArticleContainer" v-if="refList && refList.length">
      <div class="title">
        <div class="content">
          {{isAll ? "阅读量排行榜" : '相关文章'}}
        </div>
      </div>
      <div class="content">
        <div class="item" v-for="item in refList" :key="item.id">
          <div class="coverImage" v-if="item.thumbUrl">
            <nuxt-link :to="`/article/${item.url}`"><img :src="option.staticDomain + item.thumbUrl" /></nuxt-link>
          </div>
          <div class="title">
            <nuxt-link :to="`/article/${item.url}`">{{ item.title }}</nuxt-link>
          </div>
          <div class="category">
            分类：<a v-if="item.category" :href="`/category/${item.categoryId}`">{{item.category}}</a><span v-else>暂无分类</span>
            &nbsp;&nbsp;点赞({{ !item.likeCount && item.likeCount == 0 ? 0 : item.likeCount }})
            &nbsp;&nbsp;阅读({{ !item.readCount && item.readCount == 0 ? 0 : item.readCount }})
          </div>
        </div>
      </div>
    </div>

    <div class="labelContainer">
      <div class="title">
        <div class="content">
          所有标签
        </div>
        <div class="more"><a href="/sitemap">全部>></a></div>
      </div>
      <div class="content">
        <ul>
          <li v-for="item in tag" :key="item.id">
            <nuxt-link :to="`/tag/${item.idName}`">
              {{ item.name }}
              <span>({{ item.articleAmount }})</span>
            </nuxt-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import marqueeUp from "~/components/common/marqueeUp"

export default {
  name: 'rightPanel',
  props: {
    isAll: {
      type: Boolean,
      default: true
    }
  },
  components:{marqueeUp},
  computed: {
    mobileLayout () {
      return this.$store.state.options.mobileLayout
    },

    refList () {
      return this.$store.state.article.refList
    },

    tag () {
      return this.$store.state.tag.data
    },

    option () {
      return this.$store.state.options.option
    },

    followTips() {
      return this.user.followTips ? JSON.parse(this.user.followTips) : ''
    },

    user () {
      return this.$store.state.options.adminInfo
    },

    contactMe() {
      return this.user.contactMe ? JSON.parse(this.user.contactMe) : ''
    }
  },
  mounted() {
    this.$nextTick(()=>{
      if(this.$refs["marqueeUp"]) {
        this.$refs["marqueeUp"].init()
      }
      window.addEventListener('scroll',this.containerScroll,true);
    })
  },
  methods: {
    getContactMeUrl(name) {
      for(var obj of this.contactMe) {
        if(obj.name === name) {
          return obj.url
        }
      }
    },
    containerScroll(e) {
      if(this.$refs.hotArticleContainer) {
        let a = this.$refs.hotArticleContainer.scrollHeight
        let b = this.$refs.hotArticleContainer.clientHeight
        let scrollTop = document.documentElement.scrollTop

        if(scrollTop >= 1000) {
          this.$refs.hotArticleContainer.style.position = "fixed"
          this.$refs.hotArticleContainer.style.top = "58px"
        }else {
          this.$refs.hotArticleContainer.style.position = ""
          this.$refs.hotArticleContainer.style.top = ""
        }
        // console.log("scrollHeight=>",a)
        // console.log("clientHeight=>",b)
        // console.log("scrollTop=>",scrollTop)
        // console.log(this.$refs.hotArticleContainer)
      }
      
    }
  },
  destroyed () {
    window.removeEventListener('scroll', this.containerScroll,true);
  }
}

</script>

<style scoped lang="scss">
.containerRight {
  width: $container-right-width;
  margin-left: 20px;

  a:hover {
    text-decoration: underline;
  }

  .publicWechatContainer {
    padding: 10px;
    background: #1a1a1b;
    border-radius: 5px;
    .title {
      padding: 5px 0px;
      display: flex ;
      justify-content: space-between ;

      >.content {
        font-weight: bold;
      }
      >.more {
        color: $href;
      }
    }
    >.content {
      content: '';
      width: 280px;
      margin: 0 auto;
      padding: 10px;
      >img {
        width: 100% ;
      }
      >.slogan {
        color: $href;
        text-align: center;
        font-size: 14px ;
        padding-top: 5px ;
        font-weight: bolder;
      }

      >div {
        text-align: center;
        font-size: 14px ;
        padding-top: 5px ;
      }
    }
    >.contactMe {
      text-align: center;
      .iconfont {
        font-size: 20px;
        padding: 8px;
      }
      a:hover {
        text-decoration: none;
        color: $href;
      }
    }
  }
  .hotArticleContainer {
    padding: 10px 10px 10px 10px;
    background: #1a1a1b;
    border-radius: 5px;
    margin-top: 20px ;
    .title {
      padding: 5px 0px;
      display: flex ;
      justify-content: space-between ;

      >.content {
        font-weight: bold;
      }
      >.more {
        color: $href;
      }
    }
    >.content {
      width: 280px;
      margin: 0 auto;
      padding: 0px 10px 10px 10px;;
      >.item {
        margin-top: 10px ;
        padding-bottom: 5px;
        border-bottom: 1px solid #3f3f44;

        >.coverImage {
          img {
            width: 260px ;
          }
        }
        >.title {
          font-size: 14px ;
          padding: 5px 0px ;
        }
        >.category {
          font-size: 12px ;
          color: #878790;
        }
        a:hover {
          color: $href;
        }
      }
    }
  }

  .labelContainer {
    padding: 10px;
    background: #1a1a1b;
    border-radius: 5px;
    margin-top: 20px ;
    .title {
      padding: 5px 0px;
      display: flex ;
      justify-content: space-between ;

      >.content {
        font-weight: bold;
      }
      >.more {
        color: $href;
      }
    }
    >.content {
      width: 280px;
      margin: 0 auto;
      padding: 10px;
      /deep/ li {
        list-style: none;
        font-size: 14px;
        display: inline-flex;
        width: 130px;
        overflow: hidden;
        padding: 2px;
      }
      a:hover {
        color: $href;
      }
    }
  }
}
</style>

