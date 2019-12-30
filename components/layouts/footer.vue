<template>
  <footer :class="{'mobile': mobileLayout}" class="">

    <!--<div class="container center" v-if="friends.length > 0">
      <ul class="friends clearfix">
          <a
            rel="noopener"
            v-for="(friend,index) in friends"
            :key="index" 
            :href="friend.openUrl" target="_blank">
              {{ friend.name }}
            <span 
              class="hr"
              v-if="index !== friends.length - 1"
              ></span>
          </a>
      </ul>
    </div> -->

    <!-- <div class="container center">
      <p class="mune">
        <nuxt-link to="/about">我</nuxt-link>
        <span class="hr"></span>
        <nuxt-link to="/wall">留言墙</nuxt-link>
        <span class="hr"></span>
        <nuxt-link to="/sitemap">归档</nuxt-link>
      </p>
    </div> -->

    <div class="container">
      <p class="icp">
        <span v-for="(nav, index) in bottomNavList" :key="index" >
          <nuxt-link :to="nav.url" :target="nav.target" exact>{{ nav.name }}</nuxt-link>
          <span v-if="index < bottomNavList.length - 1" class="fg">&nbsp;|&nbsp;</span>
        </span>
        <!--<span class="hr"></span>
        <span>RSS</span>-->
      </p>
    </div>
    <div class="container center copyright" v-if="option.beianhao">
      备案号：<a href="http://beian.miit.gov.cn/" target="_blank">{{option.beianhao}}</a>
    </div>
    <div class="container center copyright">
      <time>Copyright ©{{new Date().getFullYear()}}</time>
      <span class="fg">&nbsp;|&nbsp;</span>
      <span v-html="copyRight()"></span>
    </div>

  </footer>
</template>
<script>

export default {
  name: 'Mfooter',
  computed: {
    mobileLayout () {
      return this.$store.state.options.mobileLayout
    },

    bottomNavList() {
      return this.$store.state.nav.bottomData
    },

    option () {
      return this.$store.state.options.option
    },

    user () {
      return this.$store.state.options.adminInfo
    },

    friends () {
      return this.$store.state.link.data
    }
  },
  methods: {
    copyRight() {
      return this.option.copyright
    }
  }
}

</script>

<style scoped lang="scss">

footer {
  margin-top: $normal-pad;
  padding: $normal-pad 0;
  background: $white;
  border-top: 1px solid $border-color;
  color: $text;
  font-size: 0.8rem ;


  >.container {
    display: flex;
    justify-content: flex-end;

    &.center {
      justify-content: center;
    }

    &.copyright {
      padding-top: 10px;
      &.fg {
        margin: 0px 5px;
      }
    }

    > ul,
    > .mune {
      padding: $normal-pad / 2 0;
    }

    > .mune {
      padding: $normal-pad / 2 $normal-pad;
      border-top: 1px solid $border-color;
    }
  }

  &.mobile {
    display: none;
    margin-top: 0;
    padding: 0 1rem;

    >.container {
      width: 100%;
    }
  }
}
</style>

