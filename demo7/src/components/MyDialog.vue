<template>
<div>
  <div class="dialogWrapper">
    <div class="dialog">
      <main>
        <slot></slot>
      </main>
    </div>
  </div>
</div>
</template>

<script>
  export default {
    name: 'MyDialog',
  }
</script>

<style scoped lang="scss">
  .dialogWrapper{
    position: fixed;
    background: linear-gradient(to left, rgba(26, 222, 220, 0.4) 0%, rgba(202, 230, 218, 0.67) 100%);
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    margin: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .dialog{
    > main{
      padding: 16px;
      max-width: 600px;
      margin: 50px auto;
    }
  }
</style>
