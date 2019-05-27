<template>
    <div>

        <ezHeader></ezHeader>
        <ezContainer></ezContainer>

    <div class="container ez-container ez-search-result n_aa">
       <div class="n_a">
       <div class="fu n_b">{{carTypeStr.type | buyTypeVc}}（{{carTypeStr.num}}）<i class="iconfont icon-down"></i></div>
       <button class="btn btn-primary_a" style="float: right!important;margin-right:2.5rem" @click="deleteCar">删除</button>
       </div>
       <div class="qingchu n_c wan_aaa">
      <ul class="">
        <li v-for="(list, index) in buyNumList" :key="index" v-if="list.type != carType" @click="carTypeClick(list.type)">
            {{list.type | buyTypeVc}}（{{list.num}}）
            </li>
      </ul>
       </div>
    </div>

    <div class="container ez-container ez-search-result">
        <div class="box-left pull-left">
         <div v-for="(list, index) in buyList" :key="list.id">
            <!-- <input class="ma6 luyoudizi_c_a  fu" type="radio" name="a"> -->
             <el-checkbox v-model="list.flag"></el-checkbox>
            <button class="btn  gou_btn-primary">{{list.type | buyTypeVc}}</button>
            <div class="box-card">
                <div class="box-card-left pull-left">
                    <img v-lazy="list.img" :key="list.img">
                </div>
                <div class="box-card-text pull-right">
                    <h4 class="title ez-mb-md">{{list.title}}</h4>
                   
                   <P class=" ez-mb-md_a">{{dataInit(list)}}</P>
                   <p class="zi_b sssss zi_c fu ma25">{{currencySign}}{{list.price}}<span class="zi_d  ccc">/元起</span></p>
                </div>
            </div>
          </div>
        <ezPage :pages="bugPages" @page-change="productCar" ref="buyPage"></ezPage>
        </div>
        <div class="box-right pull-right">
            <div class="ez-aside-banner ez-mb-md">
                <img src="~images/bg-baner-2.png">
                <ul class="list-inline text-center">
                    <div class="title text-left">热门常规旅行</div>
                    <div class="sub-title text-left">THE SITIES YOU CANT MISS</div>
                    <li><a href="#" class="btn btn-type-lg">迈阿密·西海岸 </a></li>
                    <li><a href="#" class="btn btn-type-lg">夏威夷·东海岸</a></li>
                    <li><a href="#" class="btn btn-type-lg">墨西哥·边境墙</a></li>
                </ul>
            </div>
            <div class="ez-aside-banner">
                <img src="~images/bg-baner-2.png">
                <ul class="list-inline text-center">
                    <div class="title text-left">热门常规旅行</div>
                    <div class="sub-title text-left">THE SITIES YOU CANT MISS</div>
                    <li><a href="#" class="btn btn-type-lg">迈阿密·西海岸 </a></li>
                    <li><a href="#" class="btn btn-type-lg">夏威夷·东海岸</a></li>
                    <li><a href="#" class="btn btn-type-lg">墨西哥·边境墙</a></li>
                </ul>
            </div>
            <div class="ez-aside-banner">
                <img src="~images/bg-baner-2.png">
                <ul class="list-inline text-center">
                    <div class="title text-left">热门常规旅行</div>
                    <div class="sub-title text-left">THE SITIES YOU CANT MISS</div>
                    <li><a href="#" class="btn btn-type-lg">迈阿密·西海岸 </a></li>
                    <li><a href="#" class="btn btn-type-lg">夏威夷·东海岸</a></li>
                    <li><a href="#" class="btn btn-type-lg">墨西哥·边境墙</a></li>
                </ul>
            </div>

        </div>


    </div>

  
   <div class=" container ez-container ez-search-result">
    <ul class="n_d">
        <li class="fu n_d_a">
            <i> <el-checkbox v-model="checked" @change="selectAll">全选</el-checkbox></i>
            <i class="sssss"  @click="deleteCar">删除</i>
            <i class="sssss" @click="cleanBuy">清空失效宝贝</i>
        </li>
        <li class="fu1">
            <i>已经选择</i>
            <i class="zi_b sssss zi_c ">￥699</i>
            <i> <button class="btn  gou_btn-primary">结算</button></i>
        </li>
    </ul>
    </div>

        <ezFooter></ezFooter>
        <ezAside></ezAside>

    </div>
</template>
<script>
import ezHeader from "components/home/ezHeader"
import ezContainer from "components/home/ezContainer"
import ezFooter from "components/home/ezFooter"
import ezAside from "components/home/ezAside"
import ezModule from "components/home/ezModule"
import { mapState, mapMutations, mapGetters } from "vuex";
import ezPage from "components/common/ezPage"
import { 
    productCar,
    cancleTimeOuteProductCar,
    deleteCar,
    productCarNum,
} from 'getData'
export default {
    name: "carIndex",
    data() {
        return {
            carType: 0,  //0.全部 1.常规路线2.当地参团3.当地玩家4.邮轮5.门票
            buyList: [], //购物车列表
            bugPages: 1, //总页数
            buyNumList: [], //购物车数量
            checked: false, //是否全选
        }
    },
    computed: {
        ...mapState(["currencySign"]),
        //选中的类型
        carTypeStr(){
            let obj = {}
            if(this.isNotEmpty(this.buyNumList)){
                obj = this.buyNumList[this.carType]
            }
            return obj
        },
    },
    components: {
        ezHeader,
        ezContainer,
        ezFooter,
        ezAside,
        ezModule,
        ezPage,
    },
    created() {
        this.productCar()
        this.getCarNum()
    },
    methods: {
        //全选
        selectAll(){
            for (const list of this.buyList) {
                Vue.set(list, "flag", this.checked)
            }
        },
        //清空失效
        cleanBuy(){
            cancleTimeOuteProductCar().then( res => {
                this.successMsg("清空失效宝贝成功")
                this.$refs.buyPage.reset()
            })
        },
        //删除购物车
        deleteCar(){
            let carids = [];
            for (const list of this.buyList) {
                if(list.flag){
                    carids.push(list.id)
                }
            }
            if(this.isEmpty(carids)){
                this.infoMsg("请选择要删除的购物车")
                return
            }
            deleteCar({
                carids: carids
            }).then( res => {
                this.successMsg("删除购物车成功")
                this.$refs.buyPage.reset()
            })
        },
        //点击选中的类型
        carTypeClick(type){
             $(".n_c").slideToggle(200)
            this.carType = type
            this.$refs.buyPage.reset()
            this.getCarNum()
        },
        //获取购物车数量
        getCarNum(){
            productCarNum().then( res => {
                this.buyNumList = res
            })
        },
        //处理日期人数房间显示
        dataInit(list){
            let str = `${list.beginDate};`;
            if(this.isNotEmpty(list.adultNum)){
                str += `成人 ${list.adultNum}`
            }
            if(this.isNotEmpty(list.adultNum)){
                str += `儿童 ${list.adultNum}`
            }
            str += ";"
            if(this.isNotEmpty(list.oneNum)){
                str += `单人间 ${list.oneNum}`
            } 
            if(this.isNotEmpty(list.twoNum)){
                str += `双人间 ${list.twoNum}`
            } 
            if(this.isNotEmpty(list.threeNum)){
                str += `三人间 ${list.threeNum}`
            } 
            if(this.isNotEmpty(list.fourNum)){
                str += `四人间 ${list.fourNum}`
            }       
            if(this.isNotEmpty(list.arrangeNum)){
                str += `配房 ${list.arrangeNum}`
            } 
            str += ";"
            return str
        },
        //获取购物车列表
        async productCar(pageNo = 1){
            let data = await productCar({
                carType: this.carType,
                pageNo: pageNo,
                pageSize: -1,
                });
            console.log(data)
            if(data){
                this.buyList = data.productCars
                this.bugPages = data.totalPage
            }
        }
    },
}
</script>
