<template>
    <div>
        
        <ez-header></ez-header>
        <ez-container></ez-container>

        <!--content-->
        <div class="content ez-travel-payment main_content">
            <div class="content-order">
                <orderIcon orderIconType="2"></orderIcon>
                <div class="content-order-state">
                    <div class="content-order-state-left">
                        <i class="iconfont icon-shijian"></i>
                        <h4>恭喜你，订单提交成功！</h4>
                        <p>请在 19 小时 56 分钟内完成支付</p>
                    </div>
                    <div class="content-order-state-right"  @click="orderShowClick">
                        <a>订单详情 <i class="iconfont icon-down"></i></a>
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


                        <div class="content-order-details-tourism-custom">
                            <h4>旅游定制</h4>

                            <table>
                                <tr>
                                    <th><i class="iconfont icon-one_fill"></i>1月16日</th>
                                </tr>
                                <tr>
                                    <td>迈阿密</td>
                                    <td>景点：世界贸易中心1号楼、大都会艺术博物馆</td>
                                </tr>
                                <tr>
                                    <td>迈阿密</td>
                                    <td>景点：白宫、美国国立博物馆、杜莎夫人蜡像馆、林肯纪念堂、越南战争纪念碑、大都会艺术博物馆、美国国会大厦</td>
                                </tr>
                            </table>
                            <table>
                                <tr>
                                    <th><i class="iconfont icon-two_fill"></i>1月16日</th>
                                </tr>
                                <tr>
                                    <td>迈阿密</td>
                                    <td>景点：世界贸易中心1号楼、大都会艺术博物馆</td>
                                </tr>
                                <tr>
                                    <td>迈阿密</td>
                                    <td>景点：白宫、美国国立博物馆、杜莎夫人蜡像馆、林肯纪念堂、越南战争纪念碑、大都会艺术博物馆、美国国会大厦</td>
                                </tr>
                            </table>
                        </div>


                        <div class="content-order-details-hotel">
                            <h4>酒店信息</h4>

                            <ul>
                                <li>03月01日</li>
                                <li>酒店：La Luna Di Miele</li>
                                <li>房间：单人间*1间*￥780*2晚</li>
                            </ul>
                            <ul>
                                <li>03月01日</li>
                                <li>酒店：La Luna Di Miele</li>
                                <li>房间：双人间*2间*￥2,780*2晚</li>
                            </ul>
                        </div>


                        <dl class="dl-horizontal content-order-details-car-info">
                            <dt>汽车信息</dt>
                            <dd>大众帕沙特</dd>
                            <dd><span>5座</span><span>4-5容量</span><span>很舒适</span></dd>
                            <dd>预计行驶10分钟...</dd>
                            <dd>大众帕沙特</dd>
                            <dd><span>5座</span><span>4-5容量</span><span>很舒适</span></dd>
                            <dd>预计行驶10分钟预计行驶10分钟预计行驶10分钟预计行驶10分钟预计行驶10分钟...</dd>
                        </dl>

                        <div class="content-order-details-tourguide">
                            <h4>导游信息</h4>
                            <dl class="dl-horizontal">
                                <dt>石头</dt>
                                <dd><span>性别：男</span><span>年龄：22</span></dd>
                                <dd>美国国立博物馆、杜莎夫人蜡像馆、林肯纪念堂...</dd>
                            </dl>
                        </div>
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


                        <dl class="content-order-details-custom">
                        <dt>商务+旅游定制</dt>
                        <dd><span>白宫</span>￥12*10  ￥6*2</dd>
                        <dd><span>美国国立博物馆</span>￥12*10  ￥6*2</dd>
                        <dd><span>白宫</span>￥12*10  ￥6*2</dd>
                        <dd><span>美国国立博物馆</span>￥12*10  ￥6*2</dd>
                        </dl>

                        <div class="content-order-details-tourism-custom">
                            <h4>酒店</h4>
                            <table>
                                <tr>
                                    <td>La Luna Di Miele</td>
                                    <td>单人间*1间*￥780*2晚<br />双人间*2间*￥2,780*2晚</td>
                                </tr>
                                <tr>
                                    <td>La Luna Di Miele</td>
                                    <td>单人间*1间*￥780*2晚<br />双人间*2间*￥2,780*2晚</td>
                                </tr>
                            </table>
                        </div>


                        <div class="content-order-details-custom-sum">
                            <dl class="content-order-details-custom">
                            <dt>导游</dt>
                            <dd><span>石头</span>￥800*3天</dd>
                            </dl>
                            <dl class="content-order-details-custom">
                            <dt>用车</dt>
                            <dd><span>石头</span>￥800*3天</dd>
                            <dd><span>石头</span>￥800*3天</dd>
                            </dl>
                            <dl class="content-order-details-custom">
                            <dt>保险</dt>
                            <dd><span>石头</span>￥800*3天</dd>
                            <dd><span>石头</span>￥800*3天</dd>
                            </dl>
                            <dl class="content-order-details-custom">
                            <dt>人数</dt>
                            <dd><span>石头</span>￥800*3天</dd>
                            <dd><span>石头</span>￥800*3天</dd>
                            </dl>
                        </div>

                        <h4 class="content-order-details-price-sun">总计金额 <b>￥122,780</b></h4>
                    </div>
                    
                    <div class="content-order-details-right"  v-show="orderShow">
                            <div class="content-order-details-print-info" @click="doPrint()">打印订单</div>
                </div>

                </div>
                <div class="content-order-details-pay">
                        <h4><b>选择支付方式</b></h4>

                        <span>应付金额 <b>{{currencySign}}122,780</b></span>

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
    name: "tourPay",
    data() {
        return {
            orderShow:false,  //订单详情显示隐藏
            payType:1,  //选择的支付方式
        }
    }, 
    computed: {
         ...mapState(["currencySign"]),
        ...mapGetters("tour",["orderPrice"]),
        ...mapState("tour",["orderid"])
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
                orderType: 7,
            })){
                this.successMsg('支付成功',()=>{
                       this.$router.push("tourSuccess")
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
