<template>
  <div>
    <p class="title more tools" :class="{'title-mobile': mobileLayout}">
      <span class="title-name name">赞赏支持</span>
      <span class="line"></span>
    </p>
    <div class="appreciate">
      <div class="appreciate-item">
        <img :src="`${option.staticDomain}${getAppreciateCodeUrl('weixin')}`" alt="" :width="mobileLayout ? 160 : 200">
        <p>{{getAppreciateCodeName('weixin')}}</p>
      </div>
      <div class="appreciate-item">
        <img :src="`${option.staticDomain}${getAppreciateCodeUrl('zhifubao')}`" alt="" :width="mobileLayout ? 160 : 200">
        <p>{{getAppreciateCodeName('zhifubao')}}</p>
      </div>
    </div>
    <p v-if="user.wxPublicAccount && mobileLayout" class="title more tools" :class="{'title-mobile': mobileLayout}">
      <span class="title-name name">微信公众号</span>
      <span class="line"></span>
    </p>
    <div v-if="user.wxPublicAccount && mobileLayout" class="appreciate">
      <div class="appreciate-item">
        <img :src="`${option.staticDomain}${user.wxPublicAccount}`" alt="" :width="mobileLayout ? 160 : 200">
        <p>扫码关注”{{user.name}}“</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'appreciate',
  props: ['mobileLayout',],
  methods: {
    getAppreciateCodeUrl(id) {
      for(var obj of this.appreciateCode) {
        if(obj.id === id) {
          return obj.url
        }
      }
    },
    getAppreciateCodeName(id) {
      for(var obj of this.appreciateCode) {
        if(obj.id === id) {
          return obj.name
        }
      }
    }
  },

  computed: {
    appreciateCode() {
      return this.user.appreciateCode ? JSON.parse(this.user.appreciateCode) : ''
    },
    option () {
      return this.$store.state.options.option
    },
    user () {
      return this.$store.state.options.adminInfo
    },
  }
}
</script>

<style lang="scss">

.mobile {
  .appreciate {
    flex-wrap: wrap;

    > .appreciate-item:first-child {
      margin-bottom: 1rem;
    }
  }
}

.appreciate {
  display: flex;
  justify-content: space-around;
  padding: 2rem 2rem 1rem 2rem;

  .appreciate-item {
    text-align: center;

    p {
      margin-top: 1rem;
    }
  }
}
</style>
