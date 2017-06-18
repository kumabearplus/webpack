<template>
  <div>
    <div v-if="!currentUser">
      <signInAndSignUp/>
    </div>
    <div class="page" v-if="currentUser">
      <header>
        <Topbar/>
      </header>
      <main>
        <ResumeEditor/>
        <ResumePreview/>
      </main>   
    </div>
  </div>
</template>

<script>

import './assets/reset.css'
import 'normalize.css/normalize.css'

import Topbar from './components/Topbar'
import ResumeEditor from './components/ResumeEditor'
import ResumePreview from './components/ResumePreview'
import SignInAndSignUp from './components/SignInAndSignUp'
import icons from './assets/icons'

import store from './store/index'
import AV from './lib/leancloud'
import getAVUser from './lib/getAVUser'


export default {
  name: 'app',
  store,
  currentUser: null,
  components: {Topbar,ResumeEditor,ResumePreview,SignInAndSignUp},
  created() {
    document.body.insertAdjacentHTML('afterbegin', icons) //
    let state = localStorage.getItem('state')
     
    if(state){
      state = JSON.parse(state) 
    }
    this.$store.commit('initState', state)
    this.$store.commit('setUser', getAVUser())
    this.currentUser = SignInAndSignUp.methods.getCurrentUser()
  }
}
</script>

<style>
  .page {
    height: 100vh;
    display: flex;
    flex-direction: column;
    background: #EAEBEC
  }
  .page>main {
    flex-grow: 1;
    max-width: 1440px;
    min-width: 1024px;
    margin-top: 16px;
    margin-bottom: 16px;
    display: flex;
    justify-content: space-between;
    padding: 0 16px;
    width: 100%;
    -ms-align-self: center;
    align-self: center;
  }


</style>
