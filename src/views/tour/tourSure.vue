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


                        <div class="content-order-details-tourism-custom">
                            <h4>旅游定制</h4>
                            <table v-for="(travel, index) in travelInfor" :key="index">
                                <tr>
                                    <th><i class="circle">{{index + 1}}</i>{{travel.date}}</th>
                                </tr>
                                <tr v-for="(travelDetail, index1) in travel.travelDetails" :key="index1">
                                    <td>{{travelDetail.cityName}}</td>
                                    <td v-for="(scenicSpot, index2) in travelDetail.scenicSpot" :key="index2">{{scenicSpot.busiInfo}}</td>
                                </tr>
                            </table>
                        </div>

                        <div class="content-order-details-hotel">
                            <h4>酒店信息</h4>

                            <ul v-for="(travel, index) in travelInfor" :key="index" v-if="travel.hotelInforDetails.length">
                                <li>{{travel.date}}</li>
                                <li>
                                    <ul v-for="(hotelInforDetail, index1) in travel.hotelInforDetails" :key="index1"
                                        style="padding: 0;width: 260px;">
                                        <li>酒店：{{hotelInforDetail.hotelName}}</li>
                                        <li>房间：{{hotelInforDetail.hotelRoomName}} * {{hotelInforDetail.num}}</li>
                                    </ul>
                                </li>
                            </ul>
                        </div>

                        <div class="content-order-details-tourguide">
                            <h4>汽车信息</h4>
                            <dl class="dl-horizontal" v-for="(car, index) in addCarList" :key="index">
                                <dd>{{car.carName}}</dd>
                                <dd><span>{{car.seatNum}}座</span><span>{{car.bagNum}}容量</span><span>{{car.comfort |
                                        carLevelVc}}</span></dd>
                                <dd>预计行驶{{car.dayDate}}分钟，{{car.dayRange}}公里</dd>
                            </dl>
                        </div>

                        <div class="content-order-details-tourguide" v-if="orderType != 2">
                                <h4>导游信息</h4>
                                <dl class="dl-horizontal">
                                      <dt>{{guideInfo.realName}}</dt>
                                      <dd><span>性别：{{guideInfo.sex |sexVc}}</span><span>年龄：{{guideInfo.age}}</span></dd>
                                      <dd>{{guideInfo.introduction}}</dd>
                                </dl>
                         </div>

                        <orderMember :productType="productType" :adultNum = "adultNum" :childNum = "childNum"></orderMember>

                    </div>

                    <div class="content-order-details-right">
                        <h3>订单价格</h3>

                        <div>
                            <h4>旅游定制</h4>
                            <p><label>{{startDate}} - {{endDate}}（共{{dayNum}}天）</label></p>
                            <p v-if="orderType != 1"><label>商务数量</label> <span>{{baNum}}个商务活动</span></p>
                            <p v-if="orderType != 2"><label>景点数量</label> <span>{{spotNum}}个景点</span></p>
                            <p><label>数量</label> <span>{{adultNum+childNum}}人:{{adultNum}}成人+{{childNum}}小孩</span></p>
                            <div v-if="orderType != 2" v-for="(list, index) in soptList" :key="index">
                                <p><label>景点名称</label> <span>{{list.busiInfo}}</span></p>
                                <p><label>价格</label> <span>{{currencySign}}{{list.price}}*{{adultNum+childNum}}人</span></p>
                            </div>
                        </div>

                        <div>
                            <h4>酒店</h4>
                            <p v-for="(hotel, index) in hotelInfo" :key="index">
                                <label>{{hotel.hotelName}}<br />价格</label>
                                <span>{{hotel.hotelRoomName}}<br /> {{currencySign}}{{hotel.price}}*{{hotel.num}}</span>
                            </p>

                        </div>

                        <div>
                                <h4>用车</h4>
                                <div v-for="(car, index) in addCarList" :key="index">
                                <p><label>用车</label> <span>{{car.carName}}</span></p>
                                <p><label>价格</label> <span>{{dayNum}}天*{{currencySign}}{{car.carPrice}}</span></p>
                                </div>
                            </div>
            
                            <div v-if="orderType != 2">
                                <h4>导游</h4>
                                <p><label>导游</label> <span>{{guideInfo.realName}}</span></p>
                                <p><label>价格</label> <span>{{dayNum}}天*{{currencySign}}{{guideInfo.price}}</span></p>
                            </div>

                        <div>
                            <h4>人数</h4>
                            <p><label>人数</label> <span>{{adultNum}}成人{{childNum}}小孩{{bagNum}}行李</span></p>
                        </div>
                        <div v-if="insurance">
                            <h4>保险</h4>
                            <p><label>{{insurance.name}}</label> <span>{{currencySign}}{{insurance.price}}*{{adultNum+childNum}}</span></p>
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
import { saveTravelOrder } from "getData"
import { mapState, mapMutations, mapGetters } from "vuex";
import { nowDate} from 'utils/common'
export default {
    name: "tourSure",
    data() {
        return {
            productType: 9,
            baNum: 0,   //商务活动数量
            spotNum:0,  //景点数量
            soptList:[],  //景点集合
            hotelInfo: [],  //酒店信息
        }
    },
    computed: {
        ...mapState("tour", ["orderType", "startCity", "startCityName", "startAddress", "startDate","endDate",
        "adultNum","childNum","bagNum","travelInfor","addCarList","guideInfo","guideType"]),
        ...mapState( "order", [ "contactsName", "contactsMobile", "remark", "orderMember", "insurance" ]),
        ...mapState(["currencySign"]),
        ...mapGetters("tour",["dayNum","orderPrice"]),
        playNum(){
            return `${this.adultNum}成人${this.childNum}儿童`
        }
    },
    components: {
        ezHeader,
        ezContainer,
        ezWebsite,
        orderMember,
        orderHead,
        orderIcon,
    },
    created() {
        this.getDayNum();
    },
    methods: {
        ...mapMutations("tour",["stateChange"]),
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
                Vue.set(list, "englishName", `${list.key}/${list.value}`);
            }
            let data = await saveTravelOrder({
                orderType: this.orderType, 
                contactsName: this.contactsName,
                contactsMobile: this.contactsMobile,
                remark: this.remark,
                startCity:this.startCity,
                startAddress:this.startAddress,
                startDate:this.startDate,
                endDate:this.endDate,
                dayNum:this.dayNum,
                bagNum:this.bagNum,
                adultNum:this.adultNum,
                childNum:this.childNum,
                carInfor:JSON.stringify(this.addCarList),
                travelInfor:JSON.stringify(this.travelInfor),
                orderMember:JSON.stringify(orderMember),
                insuranceid: this.insurance.id,
                guideid:this.guideInfo.guideid,
                guideType:this.guideType,
            },'post')
            if (data){
                this.stateChange({
                    orderid: data
                });
                this.$router.push("tourPay")
            }
        },
        //获取商务数量
        getDayNum: function () {
            this.baNum = 0;
            this.spotNum = 0;
            let hotelInfo = [];
            for (const travel of Object.values(this.travelInfor)) {
                for (const list2 of Object.values(travel.travelDetails)) {
                    for (const list of Object.values(list2.scenicSpot)) {
                        if (list.type == 2) {
                            this.baNum++;
                        }
                        if (list.type == 1) {
                            this.spotNum++;
                            this.soptList.push(list);
                        }
                    }
                }
                for (const iterator of Object.values(travel.hotelInforDetails)) {
                    hotelInfo.push(iterator);
                }
            }
            this.hotelInfo = hotelInfo;
        },
    }
}
</script>
