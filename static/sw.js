importScripts("/_nuxt/workbox.4c4f5ca6.js");

workbox.precaching.precacheAndRoute(
  [
    {
      url: "/_nuxt/11b7b0aaf54b294ebf11.js",
      revision: "15d5f458dd5616c92d063f985544dce3"
    },
    {
      url: "/_nuxt/234c8740c4adc4f0343a.js",
      revision: "a284e48e345cc2a89867c2e0e0686f0f"
    },
    {
      url: "/_nuxt/27c010906e3e1bf405c7.js",
      revision: "e54e53d801929aac734daf78d6c9d1d6"
    },
    {
      url: "/_nuxt/2f729982e97248a8a9fe.js",
      revision: "5f13d7f5b023a8326e9fc28b77521976"
    },
    {
      url: "/_nuxt/3dbff231b32e68468a6d.js",
      revision: "777d2e8a33a8b09c4445db15d02b2b5c"
    },
    {
      url: "/_nuxt/53f7ce35d6d927cb324f.js",
      revision: "9645430fe21cb735c9f4ebc5a6d29f80"
    },
    {
      url: "/_nuxt/61f0177e783310d599ee.js",
      revision: "df00715ab20b8150f927fdfcf43c7edb"
    },
    {
      url: "/_nuxt/686c2b1bc8d6df41b702.js",
      revision: "c29618b4d8f849761a8c558fd6b3e848"
    },
    {
      url: "/_nuxt/6fd5a98aa7183de41446.js",
      revision: "2b41e4992f56cd5756c2044823acf2fe"
    },
    {
      url: "/_nuxt/76f4272d19794c6fe957.js",
      revision: "ca8d41a6af528946eb95441d14c9a584"
    },
    {
      url: "/_nuxt/8b550685b666a3b0d14e.js",
      revision: "0f7c056f340ed9a81b1c51cd0a067284"
    },
    {
      url: "/_nuxt/8df6a3e822fb338570e9.js",
      revision: "52e9633b24b2372350d19a7c96d2329e"
    },
    {
      url: "/_nuxt/968c9c375bfc1bf53170.js",
      revision: "9e4badabdf9d85ca186ae904066ecfcf"
    },
    {
      url: "/_nuxt/9df3c0d1aa4f19c0ff58.js",
      revision: "a02cb31a0cfb21a3c48c82cbd1c320f6"
    },
    {
      url: "/_nuxt/ba3310d9cde4928f5259.js",
      revision: "8f23cdfdd6f11f37493d7a775ca0ee4b"
    },
    {
      url: "/_nuxt/d8dadbd08be2ddf5ea3a.js",
      revision: "4f398e1373b5a7c291b4d58b39e948d1"
    },
    {
      url: "/_nuxt/ddf3ed118e70d52a9040.js",
      revision: "df543077973da3891befc1965a84e8de"
    },
    {
      url: "/_nuxt/e30a666afad65f03a66d.js",
      revision: "5eb6e7b5dc249db3d3ebd7edb7a86055"
    },
    {
      url: "/_nuxt/e32e1bccce1fe165921b.js",
      revision: "98ad2dbcf42898ae7456241a95423d02"
    },
    {
      url: "/_nuxt/f499550d962dfdf7b359.js",
      revision: "0e3f2912a376073c7f741351165d10e1"
    },
    {
      url: "/_nuxt/fcbb3d1305080fb92d34.js",
      revision: "34cd81dc6a9428c50e43c63bb0ebc737"
    }
  ],
  {
    cacheId: "blog",
    directoryIndex: "/",
    cleanUrls: false
  }
);

workbox.clientsClaim();
workbox.skipWaiting();

workbox.routing.registerRoute(
  new RegExp("/_nuxt/.*"),
  workbox.strategies.cacheFirst({}),
  "GET"
);

workbox.routing.registerRoute(
  new RegExp("/.*"),
  workbox.strategies.networkFirst({}),
  "GET"
);
