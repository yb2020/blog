import serviceApi from './axios'
const serviceId = '/MICROSERVICE-APP-BLOG/blog'



// 获取用户信息
export async function getAuth () {
  return serviceApi({
    url: serviceId + '/author/getAuthor',
    method: 'post',
    params: null
  }).then(res => res.data).catch(err => console.error(err))
}

// 获取网站配置项
export function getOpt () {
  return serviceApi({
    url: serviceId + '/site/getSite',
    method: 'post',
    params: null
  }).then(res => res.data).catch(err => console.error(err))
}

// 英雄版列表
export function getHero (params) {

  return ax.get(serviceId + '/hero', { params })
          .then(res => res.data)
}

// 增加英雄榜
export function postHero (data) {
  return ax.post('/hero', {...data})
          .then(res => res.data)
}

// 标签列表
export function getTag (params) {
  return serviceApi({
    url: serviceId + '/tag/all',
    method: 'post',
    params: params
  }).then(res => res.data).catch(err => console.error(err))
}

// 根据tag获取文章列表
export function getArts (params) {
  return serviceApi({
    url: serviceId + '/article/list' ,
    method: 'post',
    data: params
  }).then(res => res.data).catch(err => console.error(err))
}

// 根据随机获取获取文章列表
export function getRandomArts (params) {
  return serviceApi({
    url: serviceId + '/article/randomList' ,
    method: 'post',
    data: params
  }).then(res => res.data).catch(err => console.error(err))
}

// 文章归档
export function getAllArts () {
  return serviceApi({
    url: serviceId + '/article/all',
    method: 'post',
    params: null
  }).then(res => res.data).catch(err => console.error(err))
}

// 获取单个文章
export function getArt (data) {
  return serviceApi({
    url: serviceId + `/article/getByUrl/${data.id}`,
    method: 'get',
    params: null
  }).then(res => res.data).catch(err => console.error(err))
}

// 文章点赞
export function likeArt (data) {
  return serviceApi({
    url: serviceId + `/article/likeByUrl/${data.id}`,
    method: 'get',
    params: null
  }).then(res => res.data).catch(err => console.error(err))
}

// 获取评价
export function getComments (data) {
  return serviceApi({
    url: serviceId + `/comment/getComments`,
    method: 'post',
    data: data
  }).then(res => res.data).catch(err => console.error(err))
}

// 提交评价
export function postComment (data) {
  return serviceApi({
    url: serviceId + `/comment/postComment`,
    method: 'post',
    data: data
  }).then(res => res.data).catch(err => console.error(err))
}

// 评论点赞
export function likeComment (data) {
  return serviceApi({
    url: serviceId + `/comment/likeComment/${data.id}`,
    method: 'get'
  }).then(res => res.data).catch(err => console.error(err))
}

// 音乐列表
export function getMusicLst (data) {
  return ax.get('/music/list/962562705')
          .then(res => res.data)
}

// 音乐详情
export function getMusicDetail (para) {
  return ax.get(`/music/song/${para.song_id}`)
          .then(res => res.data)
}

// 音乐地址
export function getMusicUrl (para) {
  return ax.get(`/music/url/${para.id}`)
          .then(res => res.data)
}

// 获取书本
export function getBook (params) {
  return ax.get(`/book`, { params })
          .then(res => res.data)
}

// 获取友链
export function getLink (params) {
  return serviceApi({
    url: serviceId + '/link/getLink',
    method: 'post',
    params: params
  }).then(res => res.data).catch(err => console.error(err))
}

// 获取导航
export function getNav (params) {
  return serviceApi({
    url: serviceId + '/nav/getNav/' + params.position,
    method: 'post',
    params: null
  }).then(res => res.data).catch(err => console.error(err))
}
