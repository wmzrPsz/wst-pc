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

                    <orderHead :cityName="guide.cityName" :startDate="beginDate" :playNum="playNum" ></orderHead>

                        <div class="content-order-details-tourguide">
                            <h4>导游信息</h4>
                            <dl class="dl-horizontal">
                                <dt>{{guide.realName}}</dt>
                                <dd><span>性别：{{guide.sex | sexVc}}</span><span>年龄：{{guide.age}}</span></dd>
                                <dd>{{guide.introduction}}</dd>
                            </dl>
                        </div>

                        <div class="content-order-details-insurance" v-if="guideRoute">
                            <h4>导游路线</h4>
                            <div>
                                <div class="text-sixteen">{{guideRoute.title}}</div>
                                <div>{{guideRoute.content}}</div>
                            </div>
                        </div>


                    <orderMember :productType="8" :adultNum = "adultNum" :childNum = "childNum"></orderMember>

                    </div>

                    <div class="content-order-details-right">
                        <h3>订单价格</h3>

                        <div>
                            <h4>行程</h4>
                            <p><label>{{beginDate}} - {{endDate}}（共{{dayNum}}天）</label></p>
                            <p><label>导游</label> <span>{{guide.realName}}</span></p>
                            <p><label>价格</label> <span>{{currencySign}}{{guide.price}}</span></p>
                        </div>

                        <div v-if="guideRoute">
                            <h4>导游路线</h4>
                            <p><label>行程</label> <span>{{guideRoute.title}}</span></p>
                            <p><label>价格</label> <span>{{currencySign}}{{guideRoute.price}}</span></p>
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
import { saveGuideOrder } from "getData"
import { mapState, mapMutations, mapGetters } from "vuex";
export default {
    name: "gameSure",
    data() {
        return {

        }
    },
    computed: {
        ...mapState("game", ["adultNum", "childNum", "clickType", "guide", "guideRoute","endDate","beginDate","endDate"]),
        ...mapState( "order", [ "contactsName", "contactsMobile", "remark", "orderMember", "insurance" ]),
        ...mapState(["currencySign"]),
        ...mapGetters("game", ["orderPrice","dayNum"]),
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
    methods: {
        ...mapMutations("game", ["STATE_CHANGE"]),
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
            let data = await saveGuideOrder({
                guideid: this.guide.id,
                guideRouteid: this.guideRoute.id,
                contactsName: this.contactsName,
                contactsMobile: this.contactsMobile,
                remark: this.remark,
                startDate: this.beginDate,
                endDate: this.endDate,
                adultNum: this.adultNum,
                childNum: this.childNum,
                insuranceid: this.insurance.id,
                orderMember: JSON.stringify(orderMember),
            },"post")
            if(data){
                this.STATE_CHANGE({
                    orderid:data
                });
                this.$router.push("gamePay")
            }

        },
    }
}
</script>
