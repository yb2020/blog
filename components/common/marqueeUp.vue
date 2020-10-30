<template>
  <!-- 无缝滚动效果 -->
  <div class="marquee-wrap">
    <ul class="marquee-list" :class="{'animate-up': animateUp}">
      <li v-for="(item, index) in listData" :key="index">{{item.content}}</li>
    </ul>
  </div>
</template>
<script>
export default {
  name: "marquee-up",
  props:{
    list: {
      type: Array,
      default: () => {return []}
    }
  },
  data() {
    return {
      timer: null,
      animateUp: false,
      listData: []
    }
  },
  methods: {
    init() {
        this.listData = JSON.parse(JSON.stringify(this.list))
        this.timer = setInterval(this.scrollAnimate, 2000);
    },
    scrollAnimate() {
      this.animateUp = true
      setTimeout(() => {
        this.listData.push(this.listData[0])
        this.listData.shift()
        this.animateUp = false
      }, 500)
    }
  },
  destroyed() {
    clearInterval(this.timer)
  }

};
</script>
<style lang="scss" scoped>
.marquee-wrap  {
  height: 30px;
  margin: 0 auto;
  overflow: hidden;
  .marquee-list {
    li {
      width: 100%;
      height: 100%;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      padding: 0 5px;
      list-style: none;
      line-height: 26px;
      text-align: center;
      font-weight: 400;
    }
  }
  .animate-up {
    transition: all 0.8s ease-in-out;
    transform: translateY(-30px);
  }
}
</style>
