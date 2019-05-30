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
                        
                    <orderHead :cityName="linerline.startCityName" :startDate="beginDate" :playNum="playNum" ></orderHead>

                        <div class="content-order-details-insurance ">
                            <h4>邮轮</h4>
                            <div class="ez-mb-md">
                                <div>{{linerline.name}}</div>
                                <div class="hius">编号{{linerline.lineNo}}：本产品由{{linerline.companyName}}及具有资质的合作旅行社提供相关服务</div>

                            </div>
                            <ul class="list-unstyled k_youl">
                                <dd><i class="dian" style="margin-top: -1.2rem;"></i>{{linerline.infor}}</dd>
                            </ul>
                        </div>

                        <div class="hhhhh pa_c  zs_b qingchu ma25">
                            <h4>轮游信息</h4>
                        </div>
                        <div class=" qingchu daoche_wan zhong_a bo_3 overflow ">
                            <ul class="fu4 lis_a ringt_aaaa beijihenh overflow hhhhh">
                                <li class="right_1_a " style="width:30%">房型</li>
                                <li class="tu_c right_1_a"  style="width:10%">单价</li>
                                <li class=" right_1_a tu_c"  style="width:20%">人数</li>
                                <li class=" right_1_a tu_c"  style="width:20%">房间数</li>
                                <li class=" right_1_a tu_c"  style="width:20%">价格</li>
                            </ul>
                            <div class=" bo_25 overflow ma1 pa_qq" v-for="(list, index) in linerRoomList" :key="index">
                                <div class="unyou_aa fu mei_a" >
                                    <div class="unyou_ba fu mei_a"><img :src="list.imgUrl"></div>
                                    <div class="fu">
                                        <ul class="lis_a ma47">
                                            <li class="  zi_e hhhhh ">{{list.name}}</li>
                                            <li class="zi_i  zi_e hius">{{list.spec}}</li>
                                            <li class="zi_i  zi_e hius" v-if="list.checkInType == 1">可入住{{list.minPeopleNumber}}-{{list.maxPeopleNumber}}人</li>
                                            <li class="zi_i  zi_e hius" v-if="list.checkInType == 2">必须入住{{list.peopleNumber}}人</li>
                                            <li class="zi_i  zi_e hius">{{list.floor}}层</li>
                                        </ul>
                                    </div>
                                </div>
                                <div class="tu_c fu">
                                    <p class="right_aaa sen_s zi_g ma38">{{currencySign}}{{list.price}} <samp class="hhhhh zi_e">起/人</samp></p>
                                </div>
                                <div class=" fu tu_c">
                                    <p class="right_aaa hhhhh zi_e">成人</p>
                                        <el-input-number 
                                        v-model.number="list.adultNum" 
                                        @change="numChange(index,1)" 
                                        step-strictly size="small" :min="1" :max="100" label="成人"/>
                                    <p class="right_aaa hhhhh ma1 zi_e">儿童</p>
                                    <el-input-number 
                                    v-model.number="list.childNum" 
                                    @change="numChange(index,2)" 
                                    step-strictly size="small" :min="0" :max="100" label="儿童"/>
                                </div>

                                <div class="tu_c fu right_aaa">
                                     <el-input-number 
                                    v-model.number="list.roomNum" style="margin-top:35px"
                                    step-strictly size="small" :min="1" :max="100" label="房间数量"/>
                                </div>
                                <div class="tu_c fu">
                                    <p class="right_aaa sen_s zi_g ma38">{{currencySign}}{{list.price *
                                        (list.adultNum+list.childNum) * list.roomNum}} </p>
                                    <p class="hhhhh zi_d right_aaa ">人均{{currencySign}}{{list.price}}元</p>
                                </div>
                            </div>
                        </div>


                        <orderMember :productType="productType" :adultNum = "adultNum" :childNum = "childNum"></orderMember>

                    </div>



                    <div class="content-order-details-right">
                        <h3>订单价格</h3>

                        <div>
                            <h4>邮轮</h4>
                            <p><label>{{beginDate}} - {{beginDate | endDayVC(linerline.travelDay)}}（共{{linerline.travelDay}}天）</label></p>
                            <p><label>{{linerline.name}}</label><span>{{currencySign}}{{linerline.price}}*{{adultNum + childNum}}</span></p>
                            <p v-for="(list, index) in linerRoomList" :key="index">
                                <label>{{list.name}}</label> <span>{{currencySign}}{{list.price}}*{{list.roomNum}}*{{list.adultNum + list.childNum}}</span>
                            </p>
                        </div>

                        <div>
                            <h4>人数</h4>
                            <p><label>人数</label> <span>{{adultNum}}成人{{childNum}}小孩</span></p>
                        </div>
                        <div v-if="insurance">
                                <h4>保险</h4>
                                <p><label>{{insurance.name}}</label> <span>{{currencySign}}{{insurance.price}}*{{adultNum+childNum}}</span></p>
                        </div>
                        <p class="content-order-details-total">总计 <b>{{currencySign}}{{orderPrice}}</b></p>
                        <a class="content-order-details-confirm-order" @click.stop="sureorder">确认订单</a>
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
import { saveLineOrder } from "getData"
import { mapState, mapMutations, mapGetters } from "vuex";
import { nowDate} from 'utils/common'
import { debug } from 'util';
export default {
    name: "soptSure",
    data() {
        return {
            productType: 6, //保险产品类型
            linerRoomList: [],  //选择的房间
            max:5,
        }
    },
    computed: {
        ...mapState("cruise",["linerline"]),  
        ...mapGetters("cruise",["beginDate","rooms"]),
        ...mapState( "order", [ "contactsName", "contactsMobile", "remark", "orderMember", "insurance" ]),
        ...mapState(["currencySign","loginType"]),
        playNum(){
            return `${this.adultNum}成人${this.childNum}小孩`;
        },
        //大人数量
        adultNum(){
           let adultNum = 0
           this.linerRoomList.forEach(list => {
               adultNum += list.adultNum
           }); 
           return adultNum
        },
        //小孩数量
        childNum(){
           let childNum = 0
           this.linerRoomList.forEach(list => {
               childNum += list.childNum
           }); 
           return childNum
        },
        //订单价格
        orderPrice(){
            let orderPrice = (this.adultNum + this.childNum) * this.linerline.price
                            + (this.adultNum + this.childNum) *( this.insurance ? this.insurance.price : 0 )
            for (const list of this.linerRoomList) {
                orderPrice += list.price * list.roomNum * (list.adultNum + list.childNum) >> 0
            }
            return orderPrice;
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
        this.linerRoomList = this.copy(this.rooms)
        this.linerRoomListInit();
    },
    methods: {
        ...mapMutations(["loginFlagChange"]),
        ...mapMutations("cruise",["orderidSet","orderPriceSet"]),
        //确定订单
        async sureorder(){
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
            
            // let orderMember = Array.from([...this.orderMember]);
            let orderMember = this.copy(this.orderMember);
            for (const list of Object.values(orderMember)) {
                Vue.set(list, "englishName", `${list.key}/${list.value}`);
            }
            console.log(this.linerline)
            let data = await saveLineOrder({
                linerLineid: this.linerline.linerId,
                contactsName: this.contactsName,
                contactsMobile: this.contactsMobile,
                remark: this.remark,
                startDate: this.beginDate,
                adultNum: this.adultNum,
                childNum: this.childNum,
                insuranceid: this.insurance.id,
                roomDetails:JSON.stringify(this.linerRoomList),
                orderMember: JSON.stringify(orderMember),
            },"post")
            if(data){
                this.orderidSet(data);
                this.orderPriceSet(this.orderPrice);
                this.$router.push("cruisePay")
            }

        },
        //房间初始化
        linerRoomListInit: function () {
            for (const list of Object.values(this.linerRoomList)) {
                Vue.set(list, "adultNum", list.minPeopleNumber)
                Vue.set(list, "childNum", 0)
                Vue.set(list, "roomNum", 1)
                if (list.checkInType == 2) {
                    Vue.set(list, "adultNum", list.peopleNumber)
                }
            }
        },
            //人数修改
             //TODO  后面优化  判断最大人数，最少入住人数和必须入住人数
            numChange: function (index, type, num = 0) {
               
                // if (this.linerRoomList[index].checkInType == 1) {   //可入住
                //     let numFlag2 = this.linerRoomList[index].adultNum + this.linerRoomList[index].childNum + num;
                //     if (type == 1) {  //大人
                //         let numFlag1 = this.linerRoomList[index].adultNum + num;
                //         if (numFlag1 >= 0 && numFlag2 >= this.linerRoomList[index].minPeopleNumber
                //             && numFlag2 <= this.linerRoomList[index].maxPeopleNumber) {
                //             this.linerRoomList[index].adultNum = numFlag1;
                //         }
                //     } else if (type == 2) {
                //         let numFlag1 = this.linerRoomList[index].childNum + num;
                //         if (numFlag1 >= 0 && numFlag2 >= this.linerRoomList[index].minPeopleNumber
                //             && numFlag2 <= this.linerRoomList[index].maxPeopleNumber) {
                //             this.linerRoomList[index].childNum = numFlag1;
                //         }
                //     }
                // } else if (this.linerRoomList[index].checkInType == 2) {  //必须入住
                //     if(type == 1){
                //         let numFlag1 = this.linerRoomList[index].adultNum + num;
                //         if(numFlag1 >= 0 && numFlag1 <= this.linerRoomList[index].peopleNumber){
                //             this.linerRoomList[index].adultNum = numFlag1;
                //             this.linerRoomList[index].childNum = this.linerRoomList[index].peopleNumber - numFlag1;
                //         }
                //     }else if(type == 2){
                //         let numFlag1 = this.linerRoomList[index].childNum + num;
                //         if(numFlag1 >= 0 && numFlag1 <= this.linerRoomList[index].peopleNumber){
                //             this.linerRoomList[index].childNum = numFlag1;
                //             this.linerRoomList[index].adultNum = this.linerRoomList[index].peopleNumber - numFlag1;
                //         }
                //     }
                // }
            },
    }
}
</script>