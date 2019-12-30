import marked from 'marked';
import Hljs from '~/plugins/highlight.js';

import { STATIC_PATH } from '~/config.js';

const languages = [
  'cpp',
  'xml',
  'bash',
  'coffeescript',
  'css',
  'markdown',
  'http',
  'java',
  'javascript',
  'json',
  'less',
  'makefile',
  'nginx',
  'php',
  'python',
  'scss',
  'sql',
  'stylus'
];
const renderer = new marked.Renderer();

marked.setOptions({
  renderer,
  headerPrefix: 'toc-wuhuhai-com-',
  gfm: true,
  tables: true,
  breaks: true,
  pedantic: false,
  sanitize: false,
  smartLists: true,
  smartypants: false,
  highlight(code, lang) {
    if (!~languages.indexOf(lang)) {
      return Hljs.highlightAuto(code).value;
    }
    return Hljs.highlight(lang, code).value;
  }
});

// 段落解析
const paragraphParse = text => {
  const textIsImage = text.includes('<img');
  // if(text.includes('\n')) {
  //   return `<p>&nbsp;</div>`;
  // }
  if (textIsImage) return `<div class="image-package">${text}</div>`;

  return `<p>${text}</p>`;
};

// 对图片进行弹窗处理, 及懒加载处理
const imageParse = (src, title, alt) => {
  const isCDN = src.includes(STATIC_PATH);

  var currentDomain = ""
  if (process.client) {
    currentDomain = window.location.protocol + "//" + window.location.host
  }

  if (!isCDN) {
    return `
              <figure class="article-content-thumb">
                <div class="progress-image">
                  <div class="progress-image-fill"></div>
                  <img
                    src="${src}"
                    title="${title || alt || currentDomain}"
                    class="image-original"
                    onload="if (window.loadedSmallImg) window.loadedSmallImg(this)"/>
                </div>
                <div class="img-caption">${title || alt || ''}</div>
              </figure>
            `;
  }

  return `
          <figure class="article-content-thumb">
            <div class="progress-image">
              <div class="progress-image-fill"></div>
              <img
                src="${src}?imageMogr2/auto-orient/thumbnail/630x/blur/1x0/quality/1|imageslim"
                title="${title || alt || currentDomain}"
                class="img-pop image-small"
                onload="if (window.loadedSmallImg) window.loadedSmallImg(this)"/>
              <img
                data-large="${src}?imageMogr2/auto-orient/thumbnail/630x/blur/1x0/quality/75|imageslim"
                data-src="${src}"
                class="img-pop image-large"/>

              <img
                data-original="${src}"
                class="img-pop image-original"/>
            </div>
            <div class="img-caption">${title || alt || ''}</div>
          </figure>
          `;
};

const commentImageParse = (src, title, alt) => {
  var currentDomain = ""
  if (process.client) {
    currentDomain = window.location.protocol + "//" + window.location.host
  }
  return `<img
            src="${src}"
            title="${title || alt || currentDomain}"
            data-src="${src}"
            class="img-pop"/>
          <div class="img-caption">${title || alt || currentDomain}</div>
          `;
};

// 外链
const linkParse = (href, title, text) => {
  return `<a href="${href}"
             target="${href.substr(0, 1) === '#' ? '_self' : '_blank'}" 
             class="${href.substr(0, 1) === '#' ? '' : 'c-link'}">
             ${href.substr(0, 1) === '#' ? text : text.length > 40 ? text.slice(0, 40) + '...' : text}
          </a>`
    .replace(/\s+/g, ' ')
    .replace('\n', '');
};

renderer.link = linkParse;
renderer.paragraph = paragraphParse;
renderer.image = imageParse;

export default (content, tags, parseHtml = false) => {
  if (typeof content !== 'string') {
    return '';
  }

  // 生成目录树
  var toc = [];

  const headingParse = function(text, level, raw) {
    var anchor = this.options.headerPrefix + raw.toLowerCase().replace(/[^\w]+/g, '-');
    toc.push({
      anchor: `${anchor}`,
      level: level,
      text: text
    });
    return `<h${level} id="${anchor}" class="c-link">${text}</h${level}>\n`;

    //return `<h${level} id="header-${toc.length - 1}">${text}</h${level}>\n`;
  };

  marked.setOptions({ sanitize: !parseHtml });

  renderer.heading = headingParse;

  if (!parseHtml) renderer.image = commentImageParse;

  let html = marked(content, { renderer });

  // 返回解析内容
  return { html, toc };
};
