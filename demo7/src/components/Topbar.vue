<template>
  <div id="topbar">
    <div class="wrapper">
      <span class="logo">Resumer</span>
      <div class="actions">
        <!-- <span>{{user}}</span> -->
<!--         <button class="primary">保存</button>
        <button>预览</button> -->
        <!-- <a class="button primary" href="#" @click.prevent="signUpDialogVisible = true">注册</a>
        <MyDialog title="注册" :visible="signUpDialogVisible" @close="signUpDialogVisible = false">
          <SignUpForm @success="login($event)"/>
        </MyDialog>
        <a class="button" href="#">登录</a> -->
        <div v-if="logined" class="userActions">
<!--           <span>你好，{{user.username}}</span> -->
          <span class="welcome">你好，{{user.username}}</span>
          <!-- <a class="button" href="#">登出</a> -->
          <a class="button" href="#" @click.prevent="signOut">登出</a>
        </div>
<!--         <div v-else class="userActions">
          <a class="button primary" href="#" @click.prevent="signUpDialogVisible = true">注册</a>
          <a class="button" href="#" @click.prevent="signInDialogVisible = true">登录</a>    
        </div> -->
        <button class="button primary">保存</button>
        <button class="button">预览</button>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
import MyDialog from './MyDialog'
import SignUpForm from './SignUpForm'
import SignInForm from './SignInForm'
// import SignInAndSignUp from './components/SignInAndSignUp'
import AV from '../lib/leancloud'

export default {
  name: 'Topbar',
  data(){
    return {
      signUpDialogVisible: false,
      signInDialogVisible: false
    }
  },
  computed: {
    user(){
      return this.$store.state.user
    },
    logined(){
      return this.user.id
    }
  },
  components: {
    MyDialog, SignUpForm, SignInForm
  },
  methods: {
    // login(user){
    signOut(){
      AV.User.logOut()
      // currentUser = null
      window.location.reload()
      this.$store.commit('removeUser')

    },
    signIn(user){
      this.signUpDialogVisible = false
      this.signInDialogVisible = false
      this.$store.commit('setUser', user)
    }
  }
}
</script>

<style scoped lang="scss">
  #topbar {
    background: #fff;
    box-shadow: 0 1px 3px 0 rgba(0,0,0,0.25);
    >.wrapper {
      min-width: 1024px;
      max-width: 1440px;
      margin: 0 auto;
      height: 64px;
      display: flex;
      justify-content: space-between;
      -ms-align-items: center;
      align-items: center;
      padding: 0 16px;
      >.logo {
        font-size: 24px;
        color: #000;
      }
      .button {
        width: 72px;
        height: 32px;
        border: none;
        cursor: pointer;
        font-size: 18px;
        background: #ddd;
        color: #222;
        text-decoration: none;
        display: inline-flex;
        justify-content: center;
        align-items: center;
        vertical-align: middle;
        &:hover {
          box-shadow: 1px 1px 1px hsla(0,0,0,0.5);
        }
        &.primary {
          background: #02af5f;
          color: white;
        }
      }
    }
  }
  .actions {
    display: flex;
    .userActions {
      margin-right: 3em;
      .welcome{
        margin-right: .5em;
      }
    }
  }


</style>