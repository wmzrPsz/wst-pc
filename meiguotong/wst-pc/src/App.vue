<template>
  <div id="app" v-cloak>
    <!-- <transition :name = "transitionName"> -->
      <navigation>
        <router-view/>
      </navigation>
    <!-- </transition> -->
  </div>
</template>
<script>
import {  mapActions } from "vuex";
export default {
  name: "App",
  data () {
    return {
      transitionName: '',
    }
  },
  created() {
//navigation  前进刷新  后退缓存恢复
// forward：前进
// back：后退
// replace：替换
// refresh：刷新
// reset：重置
    this.$navigation.on('forward', (to, from) => {
        this.transitionName = 'slide-left';
    })
    this.$navigation.on('back', (to, from) => {
       this.transitionName = 'slide-right';
    })
    this.$navigation.on('replace', (to, from) => {
       this.transitionName = 'slide-left';
    })
    // sessionStorage.removeItem("store")
    //在页面加载时读取sessionStorage里的状态信息
    if (sessionStorage.getItem("store") ) {
        this.$store.replaceState(Object.assign({}, this.$store.state,JSON.parse(sessionStorage.getItem("store"))))
    }
      // console.log(process.env);
      // console.log($("#app"))
    //在页面刷新时将vuex里的信息保存到sessionStorage里
    window.addEventListener("beforeunload",()=>{
        sessionStorage.setItem("store",JSON.stringify(this.$store.state))
    })
    this.craeteInit()
    // this.getCarNum()
  },
  methods: {
    ...mapActions(["craeteInit"])
  }
};
</script>
<style lang="less">
[v-cloak] {
  display: none;
}
.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {
  will-change: transform;
  transition: all 500ms;
  position: absolute;
}
.slide-right-enter {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}
.slide-right-leave-active {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}
.slide-left-enter {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}
.slide-left-leave-active {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}
</style>


