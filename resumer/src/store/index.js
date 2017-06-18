import Vuex from 'vuex'
import Vue from 'vue'
import objectPath from 'object-path'

Vue.use(Vuex) // 不写这句话浏览器控制台就会报错，于是我就写了
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
        { field: 'work history', icon: 'work' },
        { field: 'education', icon: 'book' },
        { field: 'projects', icon: 'heart' },
        { field: 'awards', icon: 'cup' },
        { field: 'contacts', icon: 'phone' }
      ],
      profile: {
        name: '熊凡',
        city: '广州',
        title: '前端工程师'
      },
      'work history': [
        { company: 'AL', content: '我的第二份工作是' },
        { company: 'TX', content: '我的第一份工作是' }
      ],
      education: [
        { school: 'AL', content: '文字' },
        { school: 'TX', content: '文字' }
      ],
      projects: [
        { name: 'project A', content: '文字' },
        { name: 'project B', content: '文字' }
      ],
      awards: [
        { name: '再来十瓶', content: '连续十次获得「再来一瓶」奖励' },
        { name: '三好学生' }
      ],
      contacts: [
        { contact: 'phone', content: '15271863410' },
        { contact: 'qq', content: '1229425590' }
      ],
      others: []
    }
  },
  mutations: {
    initState (state, payload) {
      Object.assign(state, payload)
    },
    switchTab (state, payload) {
      state.selected = payload // 关于 payload 看这里 http://vuex.vuejs.org/zh-cn/mutations.html#提交载荷（payload）
      localStorage.setItem('state', JSON.stringify(state))
    },
    updateResume (state, {path, value}) {
      objectPath.set(state.resume, path, value)
      localStorage.setItem('state', JSON.stringify(state))
    },
    setUser (state, payload) {
      Object.assign(state.user, payload)
    },
    removeUser (state) {
      state.user.id = null
    }
  }
})
