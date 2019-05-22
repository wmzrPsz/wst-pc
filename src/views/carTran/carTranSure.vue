<template>
    <div>
        
        <ez-header></ez-header>
        <ez-container></ez-container>

        <!--content-->
        <div class="content ez-travel-order main_content">
            <div class="content-order">

                 <orderIcon :orderIconType="1"></orderIcon>

                <div class="content-order-details">
                    <div class="content-order-details-left">

                        <orderAddress :cityName="startCityName" :startDate="startDate" :playNum="playNum" ></orderAddress>

                        <div v-if="orderType == 1">
                            <h4>接机</h4>
                            <img class="fu" src="~images/46.png" />
                            <p style="margin-top: 1rem;"></p>
                            <ul class="qingchu js_a">
                                <li class="js_a_a">
                                    <i class="iconfont icon-dian icom_do"></i>
                                    <p>接机时间：{{startDate}}</p>
                                    <p>接机机场：{{reachAirport}}</p>
                                </li>
                                <li class="js_a_a" style="border:2px solid white;">
                                    <i class="iconfont icon-dian icom_do"></i>
                                    <p>送达地点：{{startCityName}}{{startAddress}}</p>
                                </li>
                            </ul>
                            <p>{{orderTitle}}</p>
                        </div>
                        <div v-if="orderType == 2">
                            <h4>送机</h4>
                            <img class="fu" src="~images/46.png" />
                            <ul class="qingchu js_a">
                                <li class="js_a_a">
                                    <i class="iconfont icon-dian icom_do"></i>
                                    <p>出发时间：{{startDate}}</p>
                                    <p>出发地点：{{startCityName}}{{startAddress}}</p>
                                </li>
                                <li class="js_a_a" style="border:2px solid white;">
                                    <i class="iconfont icon-dian icom_do"></i>
                                    <p>送达机场：{{sendAirport}}</p>
                                </li>
                            </ul>
                            <p>{{orderTitle}}</p>
                        </div>

                        <div class="content-order-details-tourguide">
                            <h4>汽车信息</h4>
                            <dl class="dl-horizontal" v-for="(car, index) in addCarList" :key="index">
                                <dd>{{car.carName}}</dd>
                                <dd><span>{{car.seatNum}}座</span><span>{{car.bagNum}}容量</span><span>{{car.comfort |
                                        carLevelVc}}</span></dd>
                                <dd>预计行驶{{carTime}}分钟，{{distance}}公里</dd>
                            </dl>
                        </div>

                      <orderMember :productType="productType" :adultNum = "adultNum" :childNum = "childNum"></orderMember>

                    </div>

                    <div class="content-order-details-right">
                        <h3>订单价格</h3>

                        <div v-if="orderType == 1">
                            <h4>行程</h4>
                            <p style="line-height: 46px;"><label><img class="fu" src="~images/46.png" />{{startDate}}</label></p>
                            <p><label>接送时间</label> <span>{{startDate}}</span></p>
                            <p><label>接送机场</label> <span>{{reachAirport}}</span></p>
                            <p><label>送达地点</label> <span>{{startCityName}}{{startAddress}}</span></p>
                        </div>

                        <div v-if="orderType == 2">
                            <h4>行程</h4>
                            <p style="line-height: 46px;"><label><img class="fu" src="~images/46.png" />{{startDate}}</label></p>
                            <p><label>出发地点</label> <span>{{startCityName}}{{startAddress}}</span></p>
                            <p><label>出发时间</label> <span>{{startDate}}</span></p>
                            <p><label>送达机场</label> <span>{{sendAirport}}</span></p>
                        </div>


                        <div>
                            <h4>人数</h4>
                            <p><label>人数</label> <span>{{adultNum}}成人{{childNum}}小孩{{bagNum}}行李</span></p>
                        </div>

                        <div>
                            <h4>用车</h4>
                            <div v-for="(car, index) in addCarList" :key="index">
                            <p><label>用车</label> <span>{{car.carName}}</span></p>
                            <p><label>价格</label> <span>{{currencySign}}{{car.carPrice}}*{{distance}}km+{{car.startPrice}}+{{adultNum + childNum}}*{{car.headPrice}}+{{car.foodPrice}}</span></p>
                            </div>
                        </div>

                        <div v-if="insurance">
                            <h4>保险</h4>
                            <p><label>{{insurance.name}}</label> <span>{{currencySign}}{{insurance.price}} *
                                    {{adultNum+childNum}}</span></p>
                        </div>
                        
                        <p class="content-order-details-total">总计 <b>{{currencySign}}{{orderPrice}}</b></p>
                        <a class="content-order-details-confirm-order" @click="sureorder">确认订单</a>

                    </div>


                </div>
            </div>
        </div>

        <ez-website></ez-website>

    </div>
</template>
<script>
import ezHeader from "components/home/ezHeader"
import ezContainer from "components/home/ezContainer"
import ezWebsite from "components/home/ezWebsite"
import orderMember from "components/order/orderMember"
import orderAddress from "components/order/orderAddress"
import orderIcon from "components/order/orderIcon"
import { saveAirportCarOrder } from "getData"
import { mapState, mapMutations, mapGetters } from "vuex";
export default {
    name: "carTranSure",
    data() {
        return {
             productType: 3,
        }
    },
    computed: {
        ...mapState("carTran", ["orderType","airNo", "sendAirport", "sendDate", "reachAirport","reachDate","startDate","startCity",
        "startCityName","startAddress","adultNum","childNum","bagNum","addCarList","distance","carTime"]),
        ...mapState( "order", [ "contactsName", "contactsMobile", "remark", "orderMember", "insurance" ]),
        ...mapState(["currencySign"]),
        ...mapGetters("carTran",["orderPrice"]),
        playNum(){
            return `${this.adultNum}成人${this.childNum}儿童`
        },
        //行程信息
        orderTitle:function(){  
            let title = "";
            if(this.orderType == 1){
                title = `${this.reachAirport}到${this.startCityName}${this.startAddress}`;
            }else{
                title = `${this.startCityName}${this.startAddress}到${this.sendAirport}`;
            }
            title += `全长${this.distance}Km , 预计时间${this.carTime / 60 >> 0}小时${this.carTime % 60 > 0 ? this.carTime % 60 + "分钟" : ""}。`;
            return title;
        },
    },
    components: {
        ezHeader,
        ezContainer,
        ezWebsite,
        orderMember,
        orderAddress,
        orderIcon,
    },
    methods: {
        ...mapMutations("carTran",["STATE_CHANGE"]),
        //确定订单
        async sureorder() {
        if(this.loginType == 1){
            this.loginFlagChange(1);
            return;
        }
        if(this.isEmpty (this.contactsName, this.contactsMobile)){
            this.infoMsg('请完善联系人信息'); return;
        }
        for (const list of Object.values(this.orderMember)) {
            for (const [key, value] of Object.entries(list)) {
                if (this.isEmpty (value)) {
                    console.log(key)
                    this.infoMsg('请完善出游人信息'); return;
                }
            }
        }
        let orderMember = this.copy(this.orderMember);
        for (const list of Object.values(orderMember)) {
            console.log(list)
            Vue.set(list, "englishName", `${list.key}/${list.value}`);
        }
        console.log(orderMember) 
        let data = await saveAirportCarOrder({
            orderType: this.orderType,
            contactsName: this.contactsName,
            contactsMobile: this.contactsMobile,
            remark: this.remark,
            orderTitle: this.orderTitle,
            airNo: this.airNo,
            sendAirport: this.sendAirport,
            sendDate: this.sendDate,
            reachAirport: this.reachAirport,
            reachDate: this.reachDate,
            startDate: this.startDate,
            startCity: this.startCity,
            startAddress: this.startAddress,
            carTime: this.carTime,
            distance: this.distance,
            adultNum: this.adultNum,
            childNum: this.childNum,
            bagNum: this.bagNum,
            carInfor: JSON.stringify(this.addCarList),
            orderMember: JSON.stringify(orderMember),
            insuranceid: this.insurance.id,
        },"post")
            if(data) {
            this.STATE_CHANGE({
                orderid: data
            });
            this.$router.push("carTranPay")
        }
      },
    }
}
</script>
