<template>
  <div class="home">
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "home",
  data(){
    return {
      stocks:[]
    }
  },
  created(){
    this.axios.get('/kpit/getstocks')
    .then((res)=>{
      console.log(res.data)
    })
  }
};
</script>
<style lang="scss">
</style>
