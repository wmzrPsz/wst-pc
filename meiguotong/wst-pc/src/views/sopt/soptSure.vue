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

                    <orderHead :cityName="scenicSpot.countryName+'·'+scenicSpot.cityName" :startDate="beginDate" :playNum="playNum" ></orderHead>
  
                        <div class="content-order-details-insurance ">
                            <h4>景点</h4>
                            <div class="ez-mb-md">
                                <div>{{scenicSpot.name}}</div>
                                <div>地址：{{scenicSpot.address}}</div>
                                <div>详情：{{scenicSpot.content}}</div>
                            </div>
                        </div>

                        <div class="content-order-details-insurance ">
                            <h4>门票</h4>
                            <div class="ez-mb-md">
                                <div>{{scenicSpotTicket.name}}</div>
                                <div>数量：{{adultNum + childNum}}</div>
                            </div>
                        </div>


                    <orderMember :productType="productType" :adultNum = "adultNum" :childNum = "childNum"></orderMember>

                    </div>


                    <div class="content-order-details-right">
                        <h3>订单价格</h3>

                        <div>
                            <h4>景点</h4>
                            <p><label>{{beginDate}}</label></p>
                            <p><label>{{scenicSpot.name}}</label></p>
                            <p><label>{{scenicSpotTicket.name}}</label> 
                                 <span>{{currencySign}}{{scenicSpotTicket.price}}*{{adultNum + childNum}}</span>
                            </p>
                        </div>

                        <div>
                            <h4>人数</h4>
                            <p><label>人数</label> <span>{{playNum}}</span></p>
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
import { saveScenicOrder } from "getData"
import { mapState, mapMutations, mapGetters } from "vuex";
import { nowDate} from 'utils/common'
export default {
    name: "soptSure",
    data() {
        return {
            productType: 4,
        }
    },
    computed: {
        ...mapState("sopt", ["adultNum", "childNum", "scenicSpot", "scenicSpotTicket", "scenicid"]),
        ...mapState( "order", [ "contactsName", "contactsMobile", "remark", "orderMember", "insurance" ]),
        ...mapState(["currencySign"]),
        ...mapGetters("sopt", ["beginDate", "orderPrice"]),
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

    },
    methods: {
        ...mapMutations("sopt", ["orderidSet"]),
        //确定订单
        async sureorder(){
            if(this.isLogin()) return;
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
            let data = await saveScenicOrder({
                scenicid: this.scenicid,
                contactsName: this.contactsName,
                contactsMobile: this.contactsMobile,
                remark: this.remark,
                startDate: this.beginDate,
                adultNum: this.adultNum,
                childNum: this.childNum,
                insuranceid: this.insurance.id,
                ticketid:this.scenicSpotTicket.id,
                ticketNum:this.adultNum+this.childNum,
                orderMember: JSON.stringify(orderMember),
            },"post")
            if(data){
                this.orderidSet(data);
                this.$router.push("soptPay")
            }

        },
    }
}
</script>
