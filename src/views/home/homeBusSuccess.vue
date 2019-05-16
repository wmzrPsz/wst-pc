<template>
    <div>
        
        <ez-header></ez-header>

        <div class=" width  overflow" >



          <div class="fu  duancheng_c  pa_qq overflow">
          <div class="overflow ma25 bo_3" style="min-height:81rem;">
          <div class=" overflow ma25">
              <div class="ma31">创建商业账号</div>
              <div class="content ez-travel-payment">
              <div class="content-order">
              <div class="content-order-icon">
                  <div style="border: 1px solid #f99905;"><i style="color:#f99905;" class="iconfont icon-dagou"></i><label>填写基本信息</label></div>
                  <div style="border: 1px solid #f99905;"><i style="color:#f99905;" class="iconfont icon-dagou"></i><label>完善信息</label></div>
                  <div style="border: 1px solid #f99905;"><i style="color:#f99905;" class="iconfont icon-dagou"></i><label>信息提交成功</label></div>
                  <p></p>
              </div>
              </div>
            </div>
            
            <!---->
                <div class="ez-unsub-msg">
                  <p class="text-center"><i class="iconfont icon-dagou text-blue" style="font-size: 96px"></i></p>
                  <h3 class="text-center text-blue ez-mb-sm">信息提交成功</h3>
                  <p class="text-center ez-mb-lg">我们将尽快审核你的信息</p>
              </div>
              <button class="administration_a_d" @click="goHome">返回首页</button>
            <!---->
            </div>

              </div>

      </div>

<!--右边*************************************************************************-->
       <div class="a33_3 fu1">

        <div class="a5_1_l overflow  ma25">
              <img src="~images/bg-guide.png">
       </div>

       <div class="a5_1_l overflow  ma25">
              <img src="~images/bg-guide.png">
       </div>
       </div>
       
    <ezWebsite></ezWebsite>

</div>

    </div>
</template>
<script>
import ezHeader from "components/home/ezHeader"
import ezWebsite from "components/home/ezWebsite"
export default {
    name: "homeBusSuccess",
    data() {
      return {
        
      }
    },
    components: {
        ezHeader,
        ezWebsite,
    },
    methods: {
      goHome(){
        this.$router.push("/")
      }
    }
}
</script>
