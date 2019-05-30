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

                        <orderHead :cityName="startCityName" :startDate="startDate" :playNum="playNum" ></orderHead>

                        <div>
                            <h4>短程接送</h4>

                            <img class="fu" src="~images/46.png" />
                            <p style="margin-top: 1rem;">上车时间：{{startDate}}</p>
                            <ul class="qingchu js_a">
                                <li class="js_a_a">
                                    <i class="iconfont icon-dian icom_do"></i>
                                    <p>上车地点</p>
                                    <p>{{startCityName}}{{startAddress}}</p>
                                </li>
                                <li class="js_a_a" style="border:2px solid white;">
                                    <i class="iconfont icon-dian icom_do"></i>
                                    <p>下车地点</p>
                                    <p>{{endCityName}}{{endAddress}}</p>
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

                        <div>
                            <h4>行程</h4>
                            <p><label>{{startDate}}</label></p>
                            <p><label>上车地点</label> <span>{{startCityName}}{{startAddress}}</span></p>
                            <p><label>下车地点</label> <span>{{endCityName}}{{endAddress}}</span></p>
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
import orderHead from "components/order/orderHead"
import orderIcon from "components/order/orderIcon"
import { saveShortCarOrder } from "getData"
import { mapState, mapMutations, mapGetters } from "vuex";
import { nowDate} from 'utils/common'
export default {
    name: "carShortSure",
    data() {
        return {
            productType: 2,
        }
    },
    computed: {
        ...mapState("carShort", ["startCity", "startCityName", "startAddress", "startDate","endCity","endCityName","endAddress",
        "adultNum","childNum","bagNum","addCarList","distance","carTime"]),
        ...mapState( "order", [ "contactsName", "contactsMobile", "remark", "orderMember", "insurance" ]),
        ...mapState(["currencySign"]),
        ...mapGetters("carShort",["orderPrice"]),
        playNum(){
            return `${this.adultNum}成人${this.childNum}儿童`
        },
        orderTitle:function(){
            return `${this.startCityName}-${this.startAddress} 到 ${this.endCityName}-${this.endAddress} 全长${this.distance}Km , 预计时间${this.carTime / 60 >> 0}小时${this.carTime % 60 > 0 ? this.carTime % 60 + "分钟" : ""}。`;
        },
    },
    components: {
        ezHeader,
        ezContainer,
        ezWebsite,
        orderMember,
        orderHead,
        orderIcon,
    },
    methods: {
        ...mapMutations("carShort",["STATE_CHANGE"]),
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
        let data = await saveShortCarOrder({
            contactsName: this.contactsName,
            contactsMobile: this.contactsMobile,
            remark: this.remark,
            orderTitle: this.orderTitle,
            startDate: this.startDate,
            startCity: this.startCity,
            startAddress: this.startAddress,
            endCity: this.endCity,
            endAddress: this.endAddress,
            carTime: this.carTime,
            distance: this.distance,
            adultNum: this.adultNum,
            childNum: this.childNum,
            bagNum: this.bagNum,
            carInfor: JSON.stringify(this.addCarList),
            orderMember: JSON.stringify(orderMember),
            insuranceid: this.insurancId,
        },"post")
            if(data) {
            this.STATE_CHANGE({
                orderid: data
            });
            this.$router.push("carShortPay")
        }
    },
    }
}
</script>
