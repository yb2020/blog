<template>
  <header class="mobile-head">
    <!-- <form 
      class="search " 
      :class="{'active': search}"
      @submit.stop.prevent="searchTo">

      <input
        type="text"
        placeholder="Search"
        v-model="keyword"
        @keyup.enter.stop.prevent="searchTo" 
        required
        :maxlength="20"/>

      <a href="javascript:;" @click="close">
        <i class="iconfont icon-close"></i>
      </a>
    </form> -->
    <nav>
      <div>
        <a href="javascript:;" @click.stop.prevent="toggleSidebar(!mobileSidebar)"><i class="iconfont icon-list"></i></a>
      </div>
      <form 
        class="search " 
        :class="{'active': search}"
        @submit.stop.prevent="searchTo">

        <input
          type="text"
          placeholder="输入关键字..."
          v-model="keyword"
          @keyup.enter.stop.prevent="searchTo" 
          :maxlength="20"/>
        <div class="searchButton" @click="searchTo"><i class="iconfont icon-search"></i></div>
        <!-- <a href="javascript:;" @click="close">
          <i class="iconfont icon-close"></i>
        </a> -->
      </form>
      <!-- <div class="name">
        <nuxt-link to="/">
          <img :src="option.staticDomain + option.logo" alt="" width="30" />
        </nuxt-link>
      </div>
      <div>
        <a href="javascript:;" @click.stop.prevent="search = !search"><i class="iconfont icon-search"></i></a>
      </div> -->
    </nav>
  </header>
</template>
<script>

export default {
  name: 'mobile-head',

  data () {
    return {
      search: false,
      keyword: ''
    }
  },

  watch: {
    '$route'(newVel, oldVel) {
      this.search = false
      this.toggleSidebar(false)
    }
  },

  computed: {
    mobileSidebar() {
      return this.$store.state.options.mobileSidebar
    },
    option () {
      return this.$store.state.options.option
    }
  },

  methods: {

    toggleSidebar (state) {
      this.$store.commit('options/SET_MOBILE_SIDEBAR', state)
    },

    searchTo () {
      if(!this.keyword) {return false}
      this.$router.push(`/search/${this.keyword}`)
      // this.keyword = ''
    },

    close () {
      this.keyword = ''
      this.search = false
    }
  }
}

</script>

<style scoped lang="scss">

.mobile-head {
  position: fixed;
  top: 0;
  z-index: 999;
  width: 100%;
  padding: 0 1rem;
  height: $header-height - .5;
  line-height: $header-height - .5 ;
  background: #1a1a1b;
  box-shadow: 0 1px 2px rgba(0,0,0,.05);

  >nav {
    display: flex;
    justify-content: space-between;
    align-items: center;

    >.name {
      font-size: $font-size-large;
      color: $black;

      img {
        vertical-align: text-bottom;
        border-radius: 50%;
        align-items: center;
        justify-content: center;
        overflow: hidden;
        border: 1px solid #ddd ;
      }
    }
  }
  .search {
    width: 100%;
    justify-content: space-between;
    align-items: center;
    display: flex;
    .searchButton {
      cursor: pointer;
      margin-left: -28px;
      position: relative;
      >.iconfont {
        font-size: 20px;
      }
    }

    >input {
      width: 100%;
      height: 2rem;
      font-size: 14px;
      margin-left: 10px;
      line-height: 38px;
      color: $text;
      @include transition(opacity .15s ease);
    }

    >input::-webkit-input-placeholder {
      color: #666d73;
    }

    >input::-moz-placeholder {
      color: #666d73;
    }

    >input::input-placeholder {
      color: #666d73;
    }

  }
}

</style>
