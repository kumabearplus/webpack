import Vuex from 'Vuex'
import Vue from 'vue'
import objectPath from "object-path"



Vue.use(Vuex)
// const store = new Vuex.Store({
export default new Vuex.Store({
  state: {
    count: 0,
    selected: 'profile',
    user: {
      id: '',
      username: ''
    },
    resume: {
      config: [
        { field: 'profile', icon: 'id' },
        { field: 'workHistory', icon: 'work' },
        { field: 'education', icon: 'book' },
        { field: 'projects', icon: 'heart' },
        { field: 'awards', icon: 'cup' },
        { field: 'contacts', icon: 'phone' },
        { field: 'others', icon: 'add' },
      ],
      profile: {
        name: '熊凡',
        sex: '男',
        birthday: '1993-01-01',
        city: '广州',
        title: '首席装逼师'
      },
      'workHistory': [
        { company: '鸡飞狗跳公司', content: `公司总部设在XXXX区，先后在北京、上海成立分公司。专注于移动XXX领域，主打产品XXXXX，它将资讯、报纸、杂志、图片、微信等众多内容，按照用户意愿聚合到一起，实现深度个性化 定制。
        我的主要工作如下:
        1. 完成既定产品需求。
        2. 修复 bug。` },
        { company: '狗急跳墙责任有限公司', content: `公司总部设在XXXX区，先后在北京、上海成立分公司。专注于移动XXX领域，主打产品XXXXX，它将资讯、报纸、杂志、图片、微信等众多内容，按照用户意愿聚合到一起，实现深度个性化 定制。
        我的主要工作如下:
        1. 完成既定产品需求。
        2. 修复 bug。` },
      ],
      education: [
        { school: '黄志诚警官大学', content: '本科' },
        { school: '韩琛古惑仔高中', content: '高中' },
      ],
      projects: [
        { name: 'project A', content: '文字' },
        { name: 'project B', content: '文字' },
      ],
      awards: [
        { name: '再来十瓶', content: '连续十次获得「再来一瓶」奖励' },
        { name: '三好学生', content: '连续三次获得「三好学生」奖励' },
      ],
      contacts: [
        { contact: 'phone', content: '13812345678' },
        { contact: 'qq', content: '12345678' },
      ],
      others: []
    }

  },
  mutations: {
    // increment (state) {
    //   state.count++
    // }
    initState(state, payload){
      Object.assign(state, payload)
    },
    switchTab(state, payload) {
      state.selected = payload // 关于 payload 看这里 http://vuex.vuejs.org/zh-cn/mutations.html#提交载荷（payload）
      localStorage.setItem('state', JSON.stringify(state))
    },
    // updateResume(state, {field, subfield, value}){
    //   state.resume[field][subfield] = value     
    // }
    updateResume(state, {path, value}){
      objectPath.set(state.resume, path, value)
      localStorage.setItem('state', JSON.stringify(state))
    },
    setUser(state, payload){
      Object.assign(state.user, payload)
      // console.log(state.user)
    },
    removeUser(state){
      state.user.id = null
    }
  }
})