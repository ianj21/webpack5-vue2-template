<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import { request } from '@/utils/request';
function testApi() {
  return request.get('/v1/images/0XYvRd7oD')
}
export default {
  name: "App",
  components: {
  },
  mounted() {
    console.log('process.env.NODE_ENV: ', process.env.NODE_ENV);
    console.log('process.env.VUE_APP_BASE_URL: ', process.env.VUE_APP_BASE_URL);   
    testApi().then(res => {
      console.log('res: ', res);
    })
  }
};
</script>

<style lang="less">
#app {
}
</style>

