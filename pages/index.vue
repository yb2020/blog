<template>
  <div class="sitemap" :class="{'mobile': mobileLayout}">
    <ul class="tag clearfix">
      <li class="tag-item" v-for="item in tag" :key="item.id">
        <nuxt-link :to="`/tag/${item.idName}`">
          {{ item.name }}
          <span>({{ item.articleAmount }})</span>
        </nuxt-link>
      </li>
    </ul>
    
    <h3 class="title sitemap-article">
      <span class="line"></span>
    </h3>
    <div class="sitemap-article-list">
      <div v-if="yearMap.length === 0" class="year-list">
        暂无文章
      </div>
      <div v-for="(monthMap, key) in yearMap" :key="key" class="year-list">
        <p class="year-name">{{ key }}</p>
        <ul class="month-list" v-for="(monthData, monthKey) in monthMap" :key="monthKey">
          <p class="month-name">{{ monthKey | monthFilter }}</p>
          <li
            class="sitemap-list"
            v-for="item in monthData"
            :key="item.url" :title="`阅读次数:${item.readCount}`">
            <article>
              <time>
                {{ item.publishDate | dateFormat('MM-dd') }}
              </time>
              <nuxt-link :to="`/article/${item.url}`" :title="item.summary">
                {{ item.title }}
              </nuxt-link>

              <span
                @click="goType(item)"
                class="tag">
                  <i
                    :class="{
                      'iconfont': true,
                      'icon-code': true,
                      'icon-think': item.type === 2,
                      'icon-music': item.type === 3
                    }"></i>
              </span>
              <!-- item.meta.views + item.meta.comments * 10 + item.meta.likes * 3 > 1000 -->
              <span
                v-if="item.readCount * 3 > 1000"
                >
                <i class="iconfont icon-hot"></i>  
              </span>


            </article>
          </li>
        </ul>  
      </div>
    </div>

    <!-- <ul class="sitemap-list">
      <li
        class="sitemap-item"
        v-for="(item,index) in list"
        :key="item._id">
        <article>
          <time>
            {{ item.create_at | dateFormat('yyyy.MM.dd') }}
          </time>
          <nuxt-link :to="`/article/${item._id}`">
            {{ item.title }}
          </nuxt-link>
        </article>
      </li>
      <li class="sitemap-item" v-if="list.length === 0">
        暂无文章
      </li>
    </ul> -->
  </div>
</template>

<script>

export default {
  name: 'sitemap',

  scrollToTop: true,

  transition: 'fade',

  head() {
    return {
      title: this.option.title,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.option.description
        },
        {
          hid: 'keywords',
          name: 'keywords',
          content: this.option.keywords
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

  fetch ({ store }) {
    return store.dispatch('sitemap/getSitemap', { page_size: 1000 })
  },

  computed: {
    tag () {
      return this.$store.state.tag.data
    },

    option () {
      return this.$store.state.options.option
    },

    mobileLayout () {
      return this.$store.state.options.mobileLayout
    },

    yearMap () {
      return this.$store.state.sitemap.art
    }
  },

  filters: {
    monthFilter (val) {
    //   val = parseInt(val)
    //   switch (val) {
    //     case 1: return 'January'
    //     case 2: return 'February'
    //     case 3: return 'March'
    //     case 4: return 'April'
    //     case 5: return 'May'
    //     case 6: return 'June'
    //     case 7: return 'July'
    //     case 8: return 'August'
    //     case 9: return 'September'
    //     case 10: return 'October'
    //     case 11: return 'November'
    //     case 12: return 'December'
    //   }
      return val
    }
  },

  methods: {
    goType(item) {
      let route = '/code';
      if (item.type === 2) route = '/think';
      if (item.type === 3) route = 'fuck';
      this.$router.push(route);
    }
  }
}
</script>

<style scoped lang="scss">
.sitemap {
  width: $container-min-width;
  margin: 0 auto;

  >.title {
    position: relative;
    display: flex;
    justify-content: space-between;
    padding: 0.5rem 0rem;
    line-height: 1.5rem;
    color: $black;
    font-size: 1rem;
    font-weight: normal;

    > p {
      position: relative;
      padding-right: $lg-pad;
      background: $white;
      z-index: 99;      
    }

    > .line {
      top: 50%;
    }

    &.sitemap-article {
      margin-top: 1rem;
    }
  }

  &.mobile {
    width: 100%;
    transform: translate(0);
    
    .sitemap-article-list {
      padding: .8rem;

      .month-list {
        margin: .8rem;


        .sitemap-list {
          padding: .4rem .8rem;
        }
      }
    }

    >.tag {
      padding: .8rem;
    }
  }

  .sitemap-article-list {
    padding: 1rem;

    .year-name {
      font-size: 1.5rem;
    }

    .month-list {
      margin: 1rem 2rem;

      .month-name {
        margin-bottom: .5rem;
      }

      .sitemap-list {
        padding: .5rem 2rem;

        article {
          position: relative;
          display: flex;
          align-items: center;
          height: 5rem;
          line-height: 1.8rem;

          &::before {
            content: " ";
            position: absolute;
            left: 0px;
            top: 2.3rem;
            width: 6px;
            height: 6px;
            margin-left: -4px;
            background: $dividers;
            border-radius: 50%;
          }

          time {
            margin-left: .5rem;
            color: $dividers;
            font-size: $font-size-small;
            width: 6rem;
          }

          a {
            width: 70%;
            margin-left: $md-pad;
            text-decoration: none;
            color: $black;
            //@include text-overflow();
          }
          
          a:hover {
            width: 70%;
            margin-left: $md-pad;
            text-decoration: underline;
            color: $black;
            //@include text-overflow();
          }

          span {
            margin-left: .8rem;
            color: $red;

            &.tag {
              cursor: pointer;
              color: $blue;
            }
          }
        }
      }
    }

    .sitemap-item {
      padding: 1rem;

      article {
        position: relative;
        display: flex;
        align-items: center;
        height: 20px;
        line-height: 20px;

        &::before {
          content: " ";
          position: absolute;
          left: 0px;
          top: 6px;
          width: 6px;
          height: 6px;
          margin-left: -4px;
          background: $dividers;
          border-radius: 50%;
        }

        time {
          width: 2.3rem;

          margin-left: $md-pad;
          color: $dividers;
          font-size: $font-size-small;
        }

        a {
          margin-left: $md-pad;
          text-decoration: underline;
          color: $black;
          @include text-overflow();
          width: 70%;
        }

          span {
            margin-left: .8rem;
            color: $red;

            &.tag {
              cursor: pointer;
              color: $blue;
            }
          }
      }
    }
  }

  >.tag {

    >.tag-item {
      float: left;
      margin: .3rem;

      >a {
        display: block;
        padding: .4rem;
        color: $black;

        &:hover {
          color: $black;
        }
      }
    }
  }
}

</style>
