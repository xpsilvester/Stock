<template>
  <div class="about">
    <ul>
      <li v-for="item in stockDatas" :key="item[0]">{{item[0]}}: {{item[3]}} | {{getStockChg(item[3],item[2])}}%</li>
    </ul>
  </div>
</template>
<script>
// @ is an alias to /src

export default {
  name: "home",
  data(){
    return {
      stocks:[
        'sh600895',
        'sz002815',
        'sz000078',
        'sh600822',
        'sz002320',
        'sz000651',
        'sz002624',
        'sh600050',
        'sh601138',
        'sz300017',
        'sz002415',
        'sz300498',
        'sz002139',
        'sh600887',
        'sh600741',
        'sz000338',
        'sz000858',
        'sz002151',
        'sh600030',
        'sh600519',
        'sh601668',
        'sh601318',
        'sz300630',
        'sh600036'
      ],
      stockDatas:[]
    }
  },
  computed:{
    //获取名称
    getStockName:() => (name) => name.substring(name.length-4,name.length),
    //比例
    getStockChg:()=>(curr,prev) => ((curr-prev)/prev * 100).toFixed(2)
  },
  created(){
    let code = this.stocks.join(',')
    this.axios.get('/api/getstocks?list='+code)
    .then((res)=>{
      this.stockDatas = res.data.split(';').map((item)=> item.split(',')).map((item2)=>{
        item2[0] = this.getStockName(item2[0])
        return item2
      })
      //删除最后一个
      this.stockDatas.pop();
    })
  }
};
</script>
<style lang="scss">
  li{
    text-align: left;
    color: #fff;
  }
  #app{
    background: #eaeaea;
  }
</style>
