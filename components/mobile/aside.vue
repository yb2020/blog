<template>
  <div class="mobile-aside">
    <div class="user-head">
      <nuxt-link to="/aboutMe">
        <img v-if="user.wxPublicAccount" :src="option.staticDomain + user.wxPublicAccount" />
      </nuxt-link>
      <div class="slogan">{{user.slogan}}</div>
      <marqueeUp ref="marqueeUp" :list="followTips"></marqueeUp>
        <!-- <p
          @click="toogleTheme"
          class="scoll-btn theme">
            <i
              class="iconfont"
              :class="{
                'icon-dark': theme === 'light',
                'icon-light': theme === 'dark'
              }"
            ></i>
          </p> -->
    </div>
      <nav>
        <li
        v-for="(list, index) in nav"
        :key="index"
        class="nav-list "
        >
          <nuxt-link
            :to="list.url"
            exact>
              <span>{{ list.name }}</span>
          </nuxt-link>
        </li>
      </nav>
      <div class="aside-foot">
        <p class="mune" v-if="option.beianhao">
          <!--
          <nuxt-link to="/about">我</nuxt-link>
          <span class="hr"></span>
          <nuxt-link to="/about">朋友</nuxt-link>
          <span class="hr"></span>
          <nuxt-link to="/wall">留言墙</nuxt-link>
          <span class="hr"></span>
          <nuxt-link to="/sitemap">归档</nuxt-link>-->
          <time>{{option.title}} ©{{new Date().getFullYear()}}</time>
        </p>
      </div>
  </div>
</template>

<script>
import marqueeUp from "~/components/common/marqueeUp"

export default {
  name: 'mobile-aside',
  data () {
    return {
      theme: 'light'
    }
  },
  components: {marqueeUp},
  computed: {
    user () {
      return this.$store.state.options.adminInfo
    },
    followTips() {
      return this.user.followTips ? JSON.parse(this.user.followTips) : ''
    },
    option () {
      return this.$store.state.options.option
    },
    nav() {
      return this.$store.state.nav.data ;
    },
    bottomNavList() {
      return this.$store.state.nav.bottomData
    },
  },

  methods: {
    toogleTheme () {
      const isLight = document.body.id === 'light'

      this.theme = isLight ? 'dark' : 'light'

      document.body.id = this.theme
      window.localStorage.setItem('THEME', this.theme)
    }
  },

  mounted () {
    this.theme = window.localStorage.getItem('THEME') || 'light'
    this.$nextTick(()=>{
      if(this.$refs["marqueeUp"]) {
        this.$refs["marqueeUp"].init()
      }
    })
  }
}
</script>

<style scoped lang="scss">


.mobile-aside {
  position: relative;
  height: 100%;

  >.user-head {
    padding: 10px;
    text-align: center;
    margin: 2rem auto 1rem auto;
    
    img {
      width: 8rem ;
      border-radius: 6px;
    }

    .slogan {
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

    >p {
      margin-top: $sm-pad;
      color: $black;
      font-size: 1.6rem;
    }


    .scoll-btn {
      display: block;
      //margin-top: 2rem;
      text-align: center;
      line-height: 1.5rem;
      color: $black;
      cursor: pointer;

      i {
        font-size: $font-size-large;
      }
    }
  }
  > nav {
    .nav-list {
      padding: .5rem;
      text-align: center;
    }
    a {
      margin-right: 0rem;
      padding: .5rem;
      color: $descript;

      i {
        margin-right: .8rem;
      }

      &:hover {
        color: $black;
      }
    }

    a.link-active {
      color: $black;
    }
  }

  > .aside-foot {
    position: absolute;
    bottom: $mlg-pad + 1;
    left: 50%;
    width: 100%;
    font-size: $font-size-small;
    color: $disabled;
    text-align: center;
    transform: translate(-50%);
  }
}

</style>
