// const pkg = require('./package')

const { CDN_PATH, IS_DEV, API_ROOT, SERVER_HOST , SERVER_PORT } = require('./config.js');

module.exports = {
  mode: 'universal',

  server: {
    port: SERVER_PORT, // default: 3000
    host: SERVER_HOST // default: localhost
  },

  // render: {
  //   csp: true
  // },

  /*
   ** Headers of the page
   */
  head: {
    title: 'blog made by 隔壁老易',
    titleTemplate: '%s',
    meta: [
      {
        charset: 'utf-8'
      },
      {
        'http-equiv': 'cleartype',
        content: 'on'
      },
      {
        'http-equiv': 'Cache-Control'
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1, user-scalable=no'
      },
      {
        hid: 'description',
        name: 'description',
        content: '隔壁老易'
      },
      {
        hid: 'keywords',
        name: 'keywords',
        content: 'Java、Spring Cloud、微服务专家、Vue、全棧架构师、运维、部署、运营、推广、房地产、金融、回味人生、感悟'
      },
      {
        name: 'author',
        content: 'http://yi.wuhuhai.com/aboutMe'
      }
    ],

    link: [
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: '/favicon.ico'
      },
      {
        rel: 'dns-prefetch',
        href: '//www.google-analytics.com'
      }
    ],
    script: [
      {
        async: 'async',
        type: 'text/javascript',
        src: 'https://static.jkchao.cn/intersection-polyfill.js'
      },
      {
        async: 'async',
        type: 'text/javascript',
        src: '//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js'
      },
      {
        type: 'text/javascript',
        innerHTML: `
          (adsbygoogle = window.adsbygoogle || []).push({
            google_ad_client: "ca-pub-8918100374180146",
            enable_page_level_ads: true
          });
        `
      }
    ],
    noscript: [
      {
        innerHTML: 'This website requires JavaScript.'
      }
    ],
    __dangerouslyDisableSanitizers: ['script']
  },

  /*
   ** Customize the progress-bar color
   */
  loading: {
    color: '#20A0FF'
  },

  /*
   ** Global CSS
   */
  css: [
    {
      src: './assets/scss/index.scss',
      lang: 'sass'
    },
    'highlight.js/styles/github.css'
  ],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    {
      src: '~/plugins/marked.js'
    },
    {
      src: '~/plugins/highlight.js'
    },
    {
      src: '~/plugins/gravatar.js'
    },
    {
      src: '~/plugins/clickOutside.js',
      ssr: false
    },
    {
      src: '~/plugins/progress-image.js',
      ssr: false
    },
    {
      src: '~/plugins/ga.js',
      ssr: false
    },
    {
      src: '~/plugins/copy.js',
      ssr: false
    },
    {
      src: '~/plugins/baidu-seo-push.js',
      ssr: false
    },
    {
      src:'~/plugins/loading', 
      ssr:false 
    },
    {
      src: '~/plugins/filter.js'
    },
    {
      src: '~/plugins/finally.js'
    }
  ],
  router: {
    middleware: ['layout'],
    linkActiveClass: 'link-active'
  },

  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/pwa',
    '@nuxtjs/style-resources',
    "@nuxtjs/axios", 
    "@nuxtjs/proxy",
    [
      '@nuxtjs/component-cache',
      {
        max: 10000,
        maxAge: 1000 * 60 * 60
      }
    ]
  ],
  styleResources: {
    scss: ['./assets/scss/variable.scss', './assets/scss/mixin.scss']
  },
  axios: {
    retry: { retries: 3 },
    //开发模式下开启debug
    debug: process.env._ENV == "production" ? false : true,
    withCredentials: true,
    proxy: true
  },
  proxy: [
      [
        '/api', 
        { 
          target: API_ROOT, // api主机
          pathRewrite: { '^/api' : '/' }
        }
    ]
  ],

  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    publicPath: IS_DEV ? '' : CDN_PATH,
    // extractCSS: true,
    extend(config, ctx) {
      // ..
    },
    vendor:['axios'],
    babel: {
      presets({ isServer }) {
        return [['@nuxtjs/babel-preset-app', { targets: isServer ? { node: '10.4.0' } : { chrome: 69 } }]];
      }
    }
  }
};
