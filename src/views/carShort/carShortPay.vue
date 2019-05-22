<template>
    <div>
        
        <ez-header></ez-header>
        <ez-container></ez-container>
        <!--content-->
        <div class="content ez-travel-payment main_content">
            <div class="content-order">
                <orderIcon :orderIconType="2"></orderIcon>
                <div class="content-order-state">
                    <div class="content-order-state-left">
                        <i class="iconfont icon-shijian"></i>
                        <h4>恭喜你，订单提交成功！</h4>
                        <p>请在 19 小时 56 分钟内完成支付</p>
                    </div>
                    <div class="content-order-state-right" @click="orderShowClick">
                        <a>订单详情 <i class="iconfont icon-down" ></i></a>
                    </div>
                </div>

                <div class="content-order-details">
                    <div class="content-order-details-left" v-show="orderShow">
                        <h3>订单详情</h3>

                        <div class="content-order-details-basis-info">
                            <h4>基础信息</h4>
                            <p>订单编号:<br />R13214129482103210</p>
                            <p>下单时间:<br />2018-02-22  18:10:16</p>
                        </div>

                        <div class="content-order-details-basis-info">
                            <h4>客户信息</h4>
                            <p>订单编号:<br />R13214129482103210</p>
                            <p>下单时间:<br />2018-02-22  18:10:16</p>
                            <p>下单时间:<br />2018-02-22  18:10:16</p>
                        </div>

                        <dl class="dl-horizontal">
                            <dt>出行信息</dt>
                            <dd>出发地：华盛顿-华盛顿杜勒斯国际机场</dd>
                            <dd>时间：2018-03-19  12:12至2018-03-22  12:12</dd>
                            <dd>人数：3成人1小孩  2行李</dd>
                        </dl>

                        <dl class="dl-horizontal">
                            <dt>常规路线</dt>
                            <dd>迈阿密5日4晚跟团游·四晚连住海景房★蜈支洲双海岛◆升级一餐海鲜风味餐+特色餐南山素斋自助餐住海景 吃海鲜 玩海岛专属您的海岛假期</dd>
                            <dd class="text-lightorange">时尚半自助出游新选择！将团队游的实惠、便捷与自由行的轻松、惬意完美结合～</dd>
                            <dd>编号210050902：本产品由北京途牛国际旅行社有限公司及具有资质的合作旅行社提供相关服务</dd>
                            <dd>在三亚，如果你有伴儿，三亚将满足你对一场饱含山盟海誓的恋爱的全部幻想；如果你是一个人，三亚也不会让你得空去嗟
        叹，你可以在亚洲潜水圣地蜈支洲岛海湾零距离观赏珊瑚礁，可以去热带雨...</dd>
                        </dl>

                        <dl class="dl-horizontal">
                            <dt>房间</dt>
                            <dd>单人一房：            1</dd>
                            <dd>双人一房：            2</dd>
                            <dd>三人一房：            3</dd>
                            <dd>四人一房：            1</dd>
                        </dl>
                        <dl class="dl-horizontal">
                            <dt>保险信息</dt>
                            <dd>美国国立博物馆、杜莎夫人蜡像馆、林肯纪念堂...</dd>
                            <dd>美国国立博物馆、杜莎夫人蜡像馆、林肯纪念堂...</dd>
                        </dl>
                        <dl class="dl-horizontal">
                            <dt>出游人信息</dt>
                            <dd>美国国立博物馆、杜莎夫人蜡像馆、林肯纪念堂...</dd>
                            <dd>美国国立博物馆、杜莎夫人蜡像馆、林肯纪念堂...</dd>
                            <dd>美国国立博物馆、杜莎夫人蜡像馆、林肯纪念堂...</dd>
                        </dl>

                        <div class="content-order-details-order-price">订单价格</div>

                        <div>
                            <h4>常规路线</h4>
                            <p>2018年03月01日 - 2018年03月02日（共2天）</p>
                            <p>迈阿密5日4晚跟团游·四晚连住海景房★蜈支洲双海岛◆升级一餐海鲜风味餐+特色餐南山素斋自助餐 住海景 吃海鲜 玩海岛 专属您的海岛假期</p>
                            <div class="content-order-details-basis-info">
                                <p>单人一房</p>
                                <p>{{currencySign}}50*2</p>
                                <p>双人一房</p>
                                <p>{{currencySign}}50*2</p>
                                <p>三人一房</p>
                                <p>{{currencySign}}50*2</p>
                                <p>四人一房</p>
                                <p>{{currencySign}}50*2</p>
                            </div>
                        </div>


                        <div class="content-order-details-custom-sum">
                            <dl class="content-order-details-custom">
                            <dt>保险</dt>
                            <dd><span>石头</span>{{currencySign}}800*3天</dd>
                            <dd><span>石头</span>{{currencySign}}800*3天</dd>
                            </dl>
                            <dl class="content-order-details-custom">
                            <dt>人数</dt>
                            <dd><span>石头</span>{{currencySign}}800*3天</dd>
                            <dd><span>石头</span>{{currencySign}}800*3天</dd>
                            </dl>
                        </div>

                        <h4 class="content-order-details-price-sun">总计金额 <b>{{currencySign}}{{orderPrice}}</b></h4>
                    </div>
                    
                    <div class="content-order-details-right"  v-show="orderShow">
                        <div class="content-order-details-print-info" @click="doPrint()">打印订单</div>
                    </div>


                    

                </div>
                <div class="content-order-details-pay">
                        <h4><b>选择支付方式</b></h4>

                        <span>应付金额 <b>{{currencySign}}{{orderPrice}}</b></span>

                        <div class="content-order-details-pay-way">
                            <div :class="payType==list.id?'content-order-details-pay-way-style':''" @click="payTypeClick(list.id)"
                                v-for="(list, index) in payTypeList" :key="index">
                                <i></i><span>{{list.name}}</span>
                            </div>
                        </div>

                        <div class="content-order-details-pay-next" @click="payOrder">下一步</div>
                    </div>
            </div>
        </div>

        <!-- /content-->
        <ez-website></ez-website>

    </div>
</template>
<script>
import ezHeader from "components/home/ezHeader";
import ezContainer from "components/home/ezContainer";
import ezWebsite from "components/home/ezWebsite";
import orderIcon from "components/order/orderIcon"
import { mapState, mapGetters } from "vuex";
import { payOrder } from "getData";
export default {
    name: "carShortPay",
    data() {
        return {
            orderShow:false,  //订单详情显示隐藏
            payType:1,  //选择的支付方式
        }
    },
    computed: {
        ...mapState(["currencySign"]),
        ...mapGetters("carShort",["orderPrice"]),
        ...mapState("carShort",["orderid"])
    },
    created() {
        this.getOrderInfo();
    },
    components: {
        ezHeader,
        ezContainer,
        ezWebsite,
        orderIcon,
    },
    methods:{
        //支付
        async payOrder() {
            if(await payOrder({
                orderId: this.orderid,
                payType: this.payType,
                orderType: 2,
            })){
                this.successMsg('支付成功',()=>{
                       this.$router.push("carShortSuccess")
                });
            }
        },
        //订单详情
        getOrderInfo:function(){
            // requestGet(getRoutePriceDetailsUrl, {
            //     routeid: this.routeList[index].routeid,
            //     priceDate: priceDate,
            // }, function (data) {
            //     nthis.calendar({
            //         ele: '.date-box', //依附dom
            //         title: '',
            //         data: data.body.list
            //     });
            // })
        },
        //点击订单详情
        orderShowClick:function(){
            this.orderShow = !this.orderShow;
        },
        //支付方式
        payTypeClick:function(index){
            this.payType = index;
        },
        //打印
        doPrint:function(){
    // bdhtml=window.document.body.innerHTML;      
    // sprnstr="<!--startprint-->";      
    // eprnstr="<!--endprint-->";      
    // prnhtml=bdhtml.substr(bdhtml.indexOf(sprnstr)+17);      
    // prnhtml=prnhtml.substring(0,prnhtml.indexOf(eprnstr));      
    // window.document.body.innerHTML=prnhtml;   
            window.print();    
        },
    },
}
</script>
