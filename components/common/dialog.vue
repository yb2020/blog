<template>
  <transition name="fade">
    <div class="dialog" v-show="dialogVisible" :class="{'dialog-mobile': mobileLayout}">
      <transition name="slide-down">
        <div class="dialog-body" v-show="dialogVisible" v-click-outside="hide">
          <div class="dialog-head">
            <a href="javascript:;" @click="hide"><i class="iconfont icon-close"></i></a>
          </div>
          <div class="dialog-content">
            <slot></slot>
            <LoadingComponent v-show="loading"></LoadingComponent>
            <img :src="img" alt="" v-if="img" class="close" v-click-outside="hide" @click="hide" v-show="!loading">
          </div>
          <div class="dialog-foot">
            <slot name="foot"></slot>
          </div>
        </div>
      </transition>
    </div>
  </transition>
</template>

<script>

import LoadingComponent from './loading/index.vue';

export default {
  name: 'Mdialog',

  data () {
    return {
      back: {
        height: '',
        overflow: ''
      }
    }
  },

  components: {
    LoadingComponent
  },

  props: ['visible', 'img', 'loading'],

  computed: {

    dialogVisible () {
      if (this.visible) this.lockBody()
      else this.unLockBody()
      return this.visible
    },

    mobileLayout () {
      return this.$store.state.options.mobileLayout
    }
  },

  methods: {

    lockBody () {
      this.back.height = document.body.style.height
      this.back.overflow = document.body.style.overflow
      document.body.style.height = '100%'
      document.body.style.overflow = 'hidden'
    },

    unLockBody () {
      if (typeof window === 'undefined') return
      document.body.style.height = this.back.height
      document.body.style.overflow = this.back.overflow
    },

    hide () {
      this.unLockBody()
      this.$emit('update:visible', false)
    }
  }
}
</script>

<style  lang="scss">

.dialog {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  //background: $secondary;
  background: rgba(0, 0, 0, 0.85);
  z-index: 999;

  >.dialog-body {
    position: absolute;
    left: calc(50% - 17rem);
    top: 10rem;
    width: 34rem;
    // height: 24rem;
    padding: 1rem;
    background: $white;
    @include border-radius(.5rem);
    box-shadow: 0px 8px 46px rgba(0, 0, 0, 0.08), 0px 2px 6px rgba(0, 0, 0, 0.03);

    >.dialog-head {
      position: relative;
      text-align: right;
      z-index: 2;
      color: $red;

      .iconfont {
        font-size: 1.3rem;
      }
    }
  }

  &.dialog-mobile {

    >.dialog-body {
      width: 24rem;
      top: 4rem;
      left: calc(50% - 12rem);      

    }
  }
}

</style>
