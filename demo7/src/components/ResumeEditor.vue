<template>
  <div id="resumeEditor">
    <nav>
      <ol>
        <!-- <li class="active">x</li>
        <li>x</li>
        <li>x</li>
        <li>x</li>
        <li>x</li>
        <li>x</li>
        <li>x</li> -->
        <li v-for="(item,index) in resume.config" :class="{active: item.field === selected}" @click="selected = item.field">
<!--           {{index}} -->
          <svg class="icon">
            <use :xlink:href="`#icon-${item.icon}`"></use>
          </svg>
        </li>
      </ol>
    </nav>
    <ol class="panels">
<!--       <li>1</li>
      <li>2</li>
      <li>3</li>
      <li>4</li>
      <li>5</li>
      <li>6</li>
      <li>7</li> -->
      <li  v-for="item in resume.config" v-show="item.field === selected">
<!--         {{resume[item.field]}} -->
<!--         <div class="resumeField"  v-for="(value,key) in resume[item.field]"> -->
        <div v-if="resume[item.field] instanceof Array">
          <!-- <div v-for="subitem in resume[item.field]" class="subitem"> -->
          <div class="subitem" v-for="(subitem, i) in resume[item.field]">
            <div v-for="(value,key) in subitem" class="resumeField">
              <label>{{key}}</label>
              <!-- <input type="text" name="jjj" :value="value"> -->
              <input type="text" :value="value" @input="changeResumeField(`${item.field}.${i}.${key}`, $event.target.value)">
            </div >
            <hr>
          </div >
        </div>
        <div v-else class="resumeField" v-for="(value,key) in resume[item.field]">
          <label>{{key}}</label>
          <input type="text" :value="value" @input="changeResumeField(`${item.field}.${key}`, $event.target.value)">
          <!-- <input type="text" :value="value" @input="changeResumeField(item.field, key, $event.target.value)"> -->
<!--           <input type="text" name="xxx" v-model="resume[item.field][key]"> -->
        </div>
      </li>
<!--       <li>
        {{count}}
        <button @click="add">test</button>
      </li> -->
    </ol>
  </div>
</template>

<script type="text/javascript">
  export default {
    name: 'ResumeEditor',
    // data() {
    //   return {
    //     selected: 'profile',
    //     resume: {
    //       config: [
    //         { field: 'profile', icon: 'id' },
    //         { field: 'work history', icon: 'work' },
    //         { field: 'education', icon: 'book' },
    //         { field: 'projects', icon: 'heart' },
    //         { field: 'awards', icon: 'cup' },
    //         { field: 'contacts', icon: 'phone' },
    //         { field: 'others', icon: 'add' },
    //       ],
    //       profile: {
    //         name: '',
    //         sex: '',
    //         birthday: '',
    //         city: '',
    //         title: ''
    //       },
    //       'work history': [
    //         { company: 'AL', content: '我的第二份工作是' },
    //         { company: 'TX', content: '我的第一份工作是' },
    //       ],
    //       education: [
    //         { school: 'AL', content: '文字' },
    //         { school: 'TX', content: '文字' },
    //       ],
    //       projects: [
    //         { name: 'project A', content: '文字' },
    //         { name: 'project B', content: '文字' },
    //       ],
    //       awards: [
    //         { name: 'awards A', content: '文字' },
    //         { name: 'awards B', content: '文字' },
    //       ],
    //       contacts: [
    //         { contact: 'phone', content: '13812345678' },
    //         { contact: 'qq', content: '12345678' },
    //       ],
    //       others: []
    //     }
    //   }
    // },
    computed: {
      // count(){
      //   return this.$store.state.count
      // },
      selected: {
        get () {
          return this.$store.state.selected
        },
        set (value) {
          return this.$store.commit('switchTab', value)
        }
        
      },
      resume () {
        return this.$store.state.resume
      }
    }, 
    methods: {
      // add(){
      //   this.$store.commit('increment')
      // }
      // changeResumeField(field, subfield, value){
      changeResumeField(path, value){
        this.$store.commit('updateResume',{
          // field,
          // subfield,
          path,
          value
        })
      }
    }
  }
</script>

<style scoped lang="scss">
  #resumeEditor {
    width: 35%;
    background: #fff;
    box-shadow: 0 1px 3px 0 rgba(0,0,0,0.25);
    display: flex;
    flex-direction: row;
    overflow: auto;
    >nav {
      width: 80px;
      background-color: black;
      color: white;
      >ol {
        >li {
          height: 48px;
          display: flex;
          justify-content: center;
          -ms-align-items: center;
          align-items: center;
          margin-top: 16px;
          margin-bottom: 16px;
          &.active {
            background: #fff;
            color: black;
          }
          >svg.icon{
            width: 24px; // 原设计稿 32px 不好看，改成 24px
            height: 24px;
            fill: currentColor;
            vertical-align: -0.1em;
            font-size: 16px;
          }
        }
      }
    }
    >ol {
      list-style: none;
      &.panels {
        flex-grow: 1;
        >li {
          padding: 24px;
        }
      }
      .resumeField {
        >label {
          display: block;
        }
        input[type=text] {
          margin: 16px 0;
          border: 1px solid #ddd;
          box-shadow: inset 0 1px 3px 0 rgba(0,0,0,0.25);
          width: 100%;
          height: 40px;
          padding: 0 8px;
        }
      }
      hr {
        border: none;
        border-top: 1px solid #ddd;
        margin: 24px 0;
      }
    }
  }
</style>