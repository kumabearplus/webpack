<template>

<div id="signInAndSignUp">
  <MyDialog :visible="signUpDialogVisible">
    <div class="ct">
      <div class="tab">
        <label><input type="radio" name="type" value="signUp" v-model="actionType">注册</label>
        <label><input type="radio" name="type" value="signIn" v-model="actionType">登入</label>
      </div>
      <div class="signUp" v-if="actionType == 'signUp'">
        <form @submit.prevent=signUp>
          <div class="formRow">
            <label>用户名:</label>
            <input type="text" v-model="formData.username" placeholder="请输入用户名">
          </div>
          <div class="formRow">
            <label>密 &nbsp码:</label>
            <input type="password" v-model="formData.password" placeholder="请输入密码">
          </div>
          <div class="formActions" @click="isValidUsername">
            <input type="submit" value="注册" @click="isValidPassword">
          </div>
        </form>
      </div>
      <div class="signIn" v-if="actionType == 'signIn'">
        <form @submit.prevent=signIn>
          <div class="formRow">
            <label>用户名:</label>
            <input type="text" v-model="formData.username" placeholder="请输入用户名">
          </div>
          <div class="formRow">
            <label>密 &nbsp码:</label>
            <input type="password" v-model="formData.password" placeholder="请输入密码">
          </div>
          <div class="formActions">
            <input type="submit" value="登入">
          </div>
        </form>
      </div>
    </div>
  </MyDialog>

</div>

  
</template>

<script>

import AV from '../lib/leancloud'
import getErrorMessage from '../lib/getErrorMessage'
import getAVUser from '../lib/getAVUser'
import MyDialog from './MyDialog'

export default {
  name: 'SignInAndSignUp',
  data () {
    return {
      currentUser: null,
      actionType: 'signUp',
      formData: {
        username: '',
        password: ''
      },
      errorMessage: ''
    }
  },
  components: {
    MyDialog
  },
  created: function(){
    // onbeforeunload文档：https://developer.mozilla.org/zh-CN/docs/Web/API/Window/onbeforeunload
    // window.onbeforeunload = ()=>{
    //   let dataString = JSON.stringify(this.todoList) // JSON 文档: https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/JSON
    //   //window.localStorage.setItem('myTodos', dataString) // 看文档https://developer.mozilla.org/zh-CN/docs/Web/API/Window/localStorage
    //   var AVTodos = AV.Object.extend('AllTodos');
    //   var avTodos = new AVTodos();
    //   avTodos.set('content', dataString);
    //   avTodos.save().then(function (todo) {
    //     // 成功保存之后，执行其他逻辑.
    //     console.log('保存成功');
    //   }, function (error) {
    //     // 异常处理
    //     console.error('保存失败');
    //   });
    // }

    // let oldDataString = window.localStorage.getItem('myTodos')
    // let oldData = JSON.parse(oldDataString)
    // this.todoList = oldData || []
    this.currentUser = this.getCurrentUser()
    // if(this.currentUser){
    //   var query = new AV.Query('AllTodos');
    //   query.find()
    //     // .then(function (todos) {
    //     //   console.log(todos)
    //     .then((todos) => {
    //       let avAllTodos = todos[0] // 因为理论上 AllTodos 只有一个，所以我们取结果的第一项
    //       let id = avAllTodos.id
    //       this.todoList = JSON.parse(avAllTodos.attributes.content) // 为什么有个 attributes？因为我从控制台看到的
    //       this.todoList.id = id // 为什么给 todoList 这个数组设置 id？因为数组也是对象啊
    //     }, function(error){
    //       console.error(error) 
    //     })
    // }
    this.fetchTodos() // 将原来的一坨代码取一个名字叫做 fetchTodos
  },
  methods: {
    fetchTodos: function(){
      if(this.currentUser){
        var query = new AV.Query('AllTodos');
        query.find()
          .then((todos) => {
            let avAllTodos = todos[0] // 因为理论上 AllTodos 只有一个，所以我们取结果的第一项
            let id = avAllTodos.id
            console.log(avAllTodos)
            this.todoList = JSON.parse(avAllTodos.attributes.content) // 为什么有个 attributes？因为我从控制台看到的
            this.todoList.id = id // 为什么给 todoList 这个数组设置 id？因为数组也是对象啊
          }, function(error){
            console.error(error) 
          })
      }
    }, 
    updateTodos: function(){
      // 想要知道如何更新对象，先看文档 https://leancloud.cn/docs/leanstorage_guide-js.html#更新对象
      let dataString = JSON.stringify(this.todoList) // JSON 在序列化这个有 id 的数组的时候，会得出怎样的结果？
      let avTodos = AV.Object.createWithoutData('AllTodos', this.todoList.id)
      avTodos.set('content', dataString)
      avTodos.save().then(()=>{
        this.todoList.id = todo.id 
        console.log('更新成功')
      })
    },
    saveTodos: function(){
      let dataString = JSON.stringify(this.todoList) // JSON 文档: https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/JSON

      var AVTodos = AV.Object.extend('AllTodos');
      var avTodos = new AVTodos();

      var acl = new AV.ACL()
      acl.setReadAccess(AV.User.current(),true) // 只有这个 user 能读
      acl.setWriteAccess(AV.User.current(),true) // 只有这个 user 能写

      avTodos.set('content', dataString);
      avTodos.setACL(acl) // 设置访问控制
      // avTodos.save().then(function (todo){
      avTodos.save().then((todo) =>{
        this.todoList.id = todo.id  // 一定要记得把 id 挂到 this.todoList 上，否则下次就不会调用 updateTodos 了
        //this.todoList.id = todo.id  // 一定要记得把 id 挂到 this.todoList 上，否则下次就不会调用 updateTodos 了
        // 成功保存之后，执行其他逻辑.
        console.log('保存成功');
      }, function (error) {
        // 异常处理
        console.error('保存失败');
      });
    },
    saveOrUpdateTodos: function(){
      if(this.todoList.id){
        this.updateTodos()
      }else{
        this.saveTodos()
      }
    },
    addTodo: function(){
      this.todoList.push({
        title: this.newTodo,
        createdAt: bar(new Date()),
        done: false // 添加一个 done 属性        
      })
      this.newTodo = ''  // 变成空
      // this.saveTodos()
      this.saveOrUpdateTodos() // 不能用 saveTodos 了
    },
    isSelected: function(){
      for (let i = 0; i < this.todoList.length; i++) {
        if (this.todoList[i].done == false){
          // console.log('1')
          this.todoList.done == true
          this.saveOrUpdateTodos()
        }else if (this.todoList[i].done == true) {
          // console.log('2')
          this.todoList.done == false
          this.saveOrUpdateTodos()
        }
      }
      // console.log(this.todoList[0].done)
      // if (this.todoList.done == false){
      //   console.log('1')
      //   this.todoList.done == true
      //   this.saveOrUpdateTodos()
      // }else if (this.todoList.done == true) {
      //   console.log('2')
      //   this.todoList.done == false
      //   this.saveOrUpdateTodos()
      // }
      // this.saveOrUpdateTodos()
       
    },
    isValidUsername: function (){
      var reg = /^\w{6,20}$/
      var str = this.formData.username
      if (reg.test(str)) {
        console.log('输入的用户名正确')

      } else {
        // this.formData.username = '请输入正确的用户名'
        this.formData.username = ''
        console.log('请输入正确的用户名') 
      }
    },
    isValidPassword: function(){
      var reg = /^\w{6,20}$/
      var str = this.formData.password
      if (reg.test(str)) {
        if ((/^[a-z]{6,20}$/).test(str)||(/^[A-Z]{6,20}$/).test(str)||(/^[0-9]{6,20}$/).test(str)||(/^-{6,20}$/).test(str)) {
          console.log('请重新输入密码')  //{6,20}不能少
          // this.formData.password = '请重新输入密码'
          this.formData.password = ''
        } else {
          console.log('输入的密码正确') 
        }
      }
      console.log('请重新输入密码') 
      // this.formData.password = '请重新输入密码'
      this.formData.password = ''
    },
    removeTodo: function(todo){
      let index = this.todoList.indexOf(todo) // Array.prototype.indexOf 是 ES 5 新加的 API
      this.todoList.splice(index,1) // 不懂 splice？赶紧看 MDN 文档！
      // this.saveTodos()
      this.saveOrUpdateTodos() // 不能用 saveTodos 了
    },
    signUp: function () {
      let user = new AV.User();
      user.setUsername(this.formData.username);
      user.setPassword(this.formData.password);
      user.signUp().then((loginedUser) => { // 👈，将 function 改成箭头函数，方便使用 this
        this.currentUser = this.getCurrentUser() // 👈
      }, (error) => {
        alert('注册失败') // 👈
      });
    },
    signIn: function () {
      AV.User.logIn(this.formData.username, this.formData.password).then((loginedUser) => { // 👈
        this.currentUser = this.getCurrentUser() // 👈
        window.location.reload()
        this.fetchTodos() // 登录成功后读取 todos
      }, function (error) {
        alert('登录失败') // 👈
      });
    },
    getCurrentUser: function () { // 👈
      
      let current = AV.User.current()
      if (current) {
        let {id, createdAt, attributes: {username}} = current
        // 上面这句话看不懂就得看 MDN 文档了
        // 我的《ES 6 新特性列表》里面有链接：https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
        return {id, username, createdAt} // 看文档：https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Object_initializer#ECMAScript_6%E6%96%B0%E6%A0%87%E8%AE%B0
      } else {
        return null
      }
    },
    logined () {
      this.currentUser = this.getCurrentUser()
      window.location.reload()
    },
     logout: function () {
      AV.User.logOut()
      this.currentUser = null
      window.location.reload()
    }
  }

}
</script>

<style scoped lang="scss">
  .ct {
    width: 300px;
    min-height: 260px;
    margin: 0 auto;

    .tab {
      display: flex;   
      >label {
        flex-grow: 1;
        display: flex;
        height: 40px;
        align-items: center;
        font-size: 16px;
        justify-content: center;
        cursor: pointer;
        border-bottom: 2px solid #fff;
        &:hover {
          border-bottom: 2px solid #0f0;
          background: pink;
        }
        &.active {
          border-bottom: 2px solid #0f0;
        }
        >input {
          visibility: hidden;
        }
      }
    }
  }

  .formRow {
    padding: 10px 0px;
    display: flex;
    >label {
      flex-grow: 2;
      height: 40px;
      padding: 5px;
    }
    >input {
      flex-grow: 8; 
      height: 30px;
      border: 1px solid #fff;
      border-radius: 5px;
      background: rgba(0,0,0,0); 
      &:focus {
        background: #fff;
      }
    }
  }
  .formActions {
    text-align: center;
    >input {
      display: inline-block;
      width: 200px;
      height: 30px;
      background-color: rgba(0,0,0,0);
      border-radius: 50px;
      border: 1px solid #fff;
      &:hover {
        background-color: rgba(180,0,180,0.5);
      }
    }
  }
    
</style>