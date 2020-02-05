<template>
  <div class="about" :class="{'mobile': mobileLayout}">

    <p class="title more" :class="{'title-mobile': mobileLayout}">
      <span class="title-name">关于我</span>
      <span class="line"></span>
    </p>
    <div class="info-box" :class="{'info-mobile': mobileLayout}">
      <div class="info ">
        <div class="list">
          <i class="iconfont icon-user"></i>
          <span class="list-content">{{`${user.name}，性别：${user.sex}，年龄：${user.age}`}}</span>
        </div>
        <!-- 
        <div class="list">
          <i class="iconfont icon-comments"></i>
          <span class="list-content icons">
            <a :href="getContactMeUrl(`github`)" target="_blank"><i class="iconfont icon-github"></i></a>
            <a :href="getContactMeUrl(`juejin`)" target="_blank"><i class="iconfont icon-juejin"></i></a>
            <a :href="getContactMeUrl(`weibo`)" target="_blank"><i class="iconfont icon-weibo"></i></a>
            <a :href="getContactMeUrl(`segmentfault`)" target="_blank"><i class="iconfont icon-sf"></i></a>
            <a href="" target="_blank"><i class="iconfont icon-stackoverflow"></i></a> -->
            <!-- <a href="" target="_blank"><i class="iconfont icon-twitter"></i></a>
            <a :href="getContactMeUrl(`zhihu`)" target="_blank"><i class="iconfont icon-zhihu"></i></a>
            <a :href="`mailto:${getContactMeUrl(`email`)}`"><i class="iconfont icon-email"></i></a>
          </span>
        </div> -->

        <div class="list">
          <i>联系方式：</i>
          <span class="list-content icons">
            <a :href="`mailto:${getContactMeUrl('email')}`" target="_blank"><i class="iconfont">email</i></a>
            <a :href="getContactMeUrl(`weibo`)" target="_blank"><i class="iconfont">微博</i></a>
          </span>
        </div>

        <div class="list">
          <i>站点文章：</i>
          <span class="list-content icons">
            <a :href="getContactMeUrl(`toutiao`)" target="_blank"><i class="iconfont">今日头条</i></a>
            <a :href="getContactMeUrl(`baijia`)" target="_blank"><i class="iconfont">百家</i></a>
            <a :href="getContactMeUrl(`csdn`)" target="_blank"><i class="iconfont">CSDN</i></a>
            <a :href="getContactMeUrl(`cnblog`)" target="_blank"><i class="iconfont">博客园</i></a>
            <a :href="getContactMeUrl(`juejin`)" target="_blank"><i class="iconfont">掘金</i></a>
            <a :href="getContactMeUrl(`segmentfault`)" target="_blank"><i class="iconfont">segmentfault</i></a>
            <a :href="getContactMeUrl(`zhihu`)" target="_blank"><i class="iconfont">知乎</i></a>
          </span>
        </div>
        <div class="list">
          <i>视频点播：</i>
          <span class="list-content icons">
            <a :href="getContactMeUrl(`iqiyi`)" target="_blank"><i class="iconfont">爱奇艺</i></a>
            <a :href="getContactMeUrl(`bilibili`)" target="_blank"><i class="iconfont">哔哩哔哩</i></a>
          </span>
        </div>

        <div class="list">
          <i>声明：本博客和微信公众号保持更新</i>
        </div>
        <div class="list">
          <i>以上渠道不保证同步更新</i>
        </div>
        <div class="list">
          <i>本页面下方评论是最快的联系方式</i>
        </div>
      </div>

      <div class="user-box">
        <div class="user">
          <img :src="user.avatarUrl" alt="" width="100%">
        </div>
      </div>
    </div>

    <div class="text-box">
      <div class="text">
        <div class="resume" v-html="resume">
        </div>
      </div>
    </div>

    <p class="title more" :class="{'title-mobile': mobileLayout}">
      <span class="title-name">友情链接</span>
      <span class="line"></span>
    </p>
    <div class="friend">
      <a
        v-for="(friend,index) in friends"
        :key="index" 
        :href="friend.openUrl" target="_blank">
          {{ friend.name }}
      </a>
    </div>

    <appreciate
      :mobileLayout="mobileLayout"
      ></appreciate>


    <p class="title more">
      <span class="title-name">还有啥？</span>
      <span class="line"></span>
    </p>
    <div class="last">
      <p>对了，你可以在下方评论，申请友情链接，称呼 + 网址 。</p>
    </div>

    <div class="comment">
      <comments :ref-id="user.id"></comments>
    </div>

    <dialog-com 
        :visible.sync="showDialog" 
        :class="{'dialog-mobile': mobileLayout}"
        :img="img"
        :loading="loadingImg">
      </dialog-com>

  </div>
</template>

<script>

import markdown from '~/plugins/marked'
import dialogCom from '~/components/common/dialog'
import comments from '~/components/common/comments'
import { scrollTo } from '~/utils/scroll'
import progressiveImage from '~/components/common/progressiveImage.vue'
import appreciate from '~/components/common/appreciate.vue'


export default {

  name: 'about',

  transition: 'fade',

  scrollToTop: true,

  head() {
    return {
      title: `关于我-${this.option.title}`,
      meta: [
        {
          hid: 'keywords',
          name: 'keywords',
          content: this.keywords
        },
        {
          hid: 'og:title',
          name: 'og:title',
          content: `关于我-${this.option.title}`
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
  components: { dialogCom, comments, progressiveImage, appreciate },
  data () {
    return {
      showBox:  false,
      showDialog: false,
      img: '',
      scroll: '',
      loadingImg: false
    }
  },

  methods: {
    getContactMeUrl(name) {
      for(var obj of this.contactMe) {
        if(obj.name === name) {
          return obj.url
        }
      }
    },
    getShareUrl(name) {
      for(var obj of this.share) {
        if(obj.name === name) {
          return obj.url
        }
      }
    },
    initEvent () {
      import('../utils/lazyImg')
      .then(res => {
        res.default('.image-large')
      })
      const resume = document.querySelectorAll('.resume')[0]
      resume.addEventListener('click', e => {
        const target = event.target;
        if (
          target.nodeName.toLocaleLowerCase() === 'img' &&
          target.classList.contains('image-large')
        ) {
          e.stopPropagation();
          this.loadingImg = true;
          const origin = target.nextElementSibling;
          const src = origin.getAttribute('data-original');
          origin.onload = () => {
            this.loadingImg = false;
          };

          origin.onerror = () => {
            this.loadingImg = false;
            this.img = target.getAttribute('src');
          };

          origin.src = src;
          this.showDialog = true;
          this.img = src;
        }
      })
    }
  },
  mounted() {
    this.initEvent()
  },
  computed: {
    mobileLayout () {
      return this.$store.state.options.mobileLayout
    },

    share() {
      return this.user.myShare ? JSON.parse(this.user.myShare) : ''
    },

    contactMe() {
      return this.user.contactMe ? JSON.parse(this.user.contactMe) : ''
    },

    appreciateCode() {
      return this.user.appreciateCode ? JSON.parse(this.user.appreciateCode) : ''
    },

    user () {
      return this.$store.state.options.adminInfo
    },

    friends () {
      return this.$store.state.link.data
    },

    option () {
      return this.$store.state.options.option
    },

    resume() {
      return markdown(this.user.resume, false, true).html
    }
  }

}

</script>

<style lang="scss" scope>

.about {
  width: $container-min-width;
  margin: 0 auto;

  .title {
    position: relative;
    padding: 0.5rem 0rem;
    line-height: 1.5rem;
    color: $black;
    font-size: 1rem;
    font-weight: normal;

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

  .title.more {
    margin-top: .2rem;
  }

  .title-mobile {
    margin-top: 0;
  }

  .last {
    padding: 2rem;
    border: 0;

    p {
      margin: .5rem 0;
    }

    a {
      text-decoration: underline;
    }
  }

  .friend {
    display: flex;
    flex-wrap: wrap;
    padding: 2rem 2rem 1rem 2rem;

    a {
      width: 30%;
      height: 3rem;
      margin-bottom: 1rem;
      margin-right: 5%;
      line-height: 3rem;
      text-align: center;
      background: $code-bg;

      &:nth-child(3n) {
        margin-right: 0;
      }
    }

    a:hover {
      background: $module-hover-bg-light-3;
    }
  }

  .info-box {
    display: flex;
    justify-content: space-between;

    >.info {
      position: relative;
      width: calc(100% - 16rem - 1rem);
      padding: $normal-pad 0 0 0;

      >.list {
        display: flex;
        margin: .5rem;
        padding: 0 1.5rem;
        height: 1.5rem;
        line-height: 1.5rem;

        i {
          color: $dividers;
        }

        >.list-content {
          margin-left: 1rem;
        }


        span.icons {
          display: flex;

          a {
            margin-right: 1rem;
          }

          i {
            color: $text;
            @include transition(all .5s);

            &:hover {
              font-size: 1.3rem;
              color: $black;
            }
          }
        }
      }
    }

    >.user-box {
      width: 16rem;
      padding-right: 2rem;

      .user {
        padding: 1rem;
        overflow: hidden;

        img {
          max-width: 100%;
          @include border-radius(50%);
        }
      }
    }
  }

  >.comment {
    margin-top: 2rem;
  }

  &.mobile {

    >.info-box {
      // grid-template-columns: 100%;
      width: 100%;
      flex-direction: column-reverse;

      >.info {
        padding: 1rem;
        width: 100%;

        >.list {
          padding: 0;
          // grid-gap: 1rem;
          @include text-overflow();

        }
      }
      >.user-box {
        // grid-row: 1 / 2;
        width: 100%;
        padding-right: 0;

        >.user {
          padding: 1.5rem;
        }
      }
    }
    .text-box {
      .text {
        padding: .5rem;
        flex-wrap: wrap;
        text-align: left;
  
      
        .right {
          display: none;
        }
      }
    }
  }

  >.text-box {
    margin-top: .1rem;

    >.text {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 3rem 2rem;
      padding-top: 0;
      line-height: 2rem;

      >.resume {
        margin: $lg-pad 0;
        color: $black;
        word-wrap: break-word;

        .demo {
          border: 1px solid $border-color;
          border-radius: 2px;
          padding: 25px 35px;
          margin-top: 1em;
          margin-bottom: 40px;
          font-size: 1.2em;
          line-height: 1.5em;
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;
          overflow-x: auto;
        }

        a {
          margin: 0 .1rem;

          &.c-link {
            color: $blue;
          }

          &.image-link {
            margin: 0;
          }

          &:hover {
            text-decoration: underline;
          }
        }

        .image-package {
          text-align: center;
          width: 92%;
          margin: 0 auto 1rem auto;

          .img-caption {
            min-width: 10%;
            max-width: 80%;
            min-height: 22px;
            display: inline-block;
            padding: 6px;
            margin: 10px auto;
            border-bottom: 1px solid $border-color;
            font-size: 14px;
            color: $disabled;
            line-height: 1.2;

            &:empty {
              display: none;
            }
          }
        }

        img {
          max-width: 100%;
          display: block;
          text-align: center;
          border-radius: $radius;
          transition: all .25s;

          &.img-pop {
            cursor: zoom-in;
          }
        }
        

        p {
          line-height: 1.8rem;
          margin: 1.5rem 0;

          &.text-center {
            text-align: center;
          }

          &.text-right {
            text-align: right;
          }
        }

        iframe {
          margin: 1.5rem 0;
          background: $black;

          &.music {
            background: transparent;
            width: 100%;
          }
        }
        h1,
        h2,
        h3,
        h4,
        h5,
        h6 {
          margin: 1.5rem 0;
          padding-left: 0;
          line-height: 1.8rem;
          font-weight: 700;
          text-indent: 0;

          &:target{
            padding-top: 4.5rem;
          }
        }

        hr {
          height: 0.1rem;
          background: $text;
          border: 0;
        }

        blockquote {
    
          padding: 0 1rem;
          margin: 1.5rem 0;
          color: #6a737d;
          border-left: 0.25rem solid #dfe2e5;
    
          p {
            text-indent: 0rem;

            &:first-child {
              margin-top: 0;
            }
            &:last-child {
              margin-bottom: 0;
            }
          }
        }

        ul {
          list-style-type: square;
        }

        ul,
        ol {
          padding-left: 2rem;
          margin: 1.5rem 0;

          >li {
            line-height: 1.5rem;
            padding: .5rem;
            list-style-type: disc;


            >p {
              text-indent: 0;
              margin: 0;
            }

            >ul {

              li {
                list-style-type: circle;
              }

              &:last-child {
                margin-bottom: 0;
              }
            }
          }
        }

        ul {
          list-style: disc;
        }

        table {
          font-size: .8rem;
          max-width: 100%;
          overflow: auto;
          border: 1px solid $border-color;
          border-collapse: collapse;
          border-spacing: 0;

          thead {
            background: $module-bg;
            text-align: left;
          }

          th, td {
            padding: .8rem .5rem;
            line-height: 1.5rem;
          }

          tr:nth-child(2n) {
            background: $module-bg;
          }

          td {
            min-width: 7.5rem;
          }
        }

        code {
          padding: .2rem .4rem;
          margin: 0;
          border-radius: $radius;
          background-color: $module-hover-bg;
          color: $red-light-1;
        }

        pre {
          margin: 1.5rem 0;
          overflow: auto;
          font-size: 85%;
          line-height: 1.45;
          background-color: $code-bg;
          border-radius: 3px;
          word-wrap: normal;

          >code {
            margin: 0;
            padding: 1rem;
            float: left;
            width: 100%;
            height: 100%;
            display: block;
            line-height: 1.6rem;
            background-color: transparent;
            color: $text;
          }
        }
      }

      .right {
        width: 12rem;
        text-align: center;

        p {
          margin-bottom: .5rem;
        }
      }
    }

  }


  .dialog {

    >.dialog-body {
      top: 0 !important;
      left: 0 !important;
      width: 100% !important;
      height: 100%;
      background: transparent;

      >.dialog-content {
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;

        img {
          display: block;
          margin: 0 auto;
          max-width: 90%;
          max-height: 90%;
          cursor: zoom-out;
        }
      }
    }
  }
  
}
</style>
