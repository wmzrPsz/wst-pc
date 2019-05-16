<template>
    <div class="content-right no-border">
        <div class="panel-header ez-base-border">
            <div class="pull-left panel-header-title">我的订单</div>
            <!--<div class="pull-right">
                <input type="text" class="panel-header-search" placeholder="搜索订单">
            </div>-->
        </div>
        <div class="content-panel">
            <ul class="list-inline ez_public_list ez-order-nav">
                <li :class="{'active':status == 0}" @click="statusChange(0)"><a class="btn">全部订单</a></li>
                <li :class="{'active':status == 1}" @click="statusChange(1)"><a class="btn">待付款</a></li>
                <li :class="{'active':status == 2}" @click="statusChange(2)"><a class="btn">待确认</a></li>
                <li :class="{'active':status == 3}" @click="statusChange(3)"><a class="btn">未出行</a></li>
                <li :class="{'active':status == 4}" @click="statusChange(4)"><a class="btn">待点评</a></li>
                <li :class="{'active':status == 5}" @click="statusChange(5)"><a class="btn">退款订单</a></li>
            </ul>

            <table class="table table-order">
                <tr>
                    <th class="text-center td-w-1">订单详情</th>
                    <th class="text-center td-w-2">联系人</th>
                    <th class="text-center td-w-3">金额</th>
                    <th class="text-center td-w-4">订单状态</th>
                    <th class="text-center td-w-5">操作</th>
                </tr>
            </table>

            <table class="table table-bordered table-order text-lightgray" v-for="(lists, index1) in orderList" :key="index1">
                <tr class="tr-line">
                    <td colspan="5" class="td-line">
                        <span>下单时间：{{lists.createDateString}}</span>
                        <span>订单号：{{lists.orderNo}}</span>
                        <span>供应商：{{lists.agent}}</span>
                        <a class="btn btn-sm btn-default pull-right">{{lists.type | orderTypeVc}}</a>
                    </td>
                </tr>
                <tr>
                    <td class="td-w-1">
                        <div class="table-order-card" v-for="(list, index2) in lists.orderSysList" :key="index2">
                            <img src="~images/cruise-1.png">
                            <div class="table-order-text">
                                <h5 class="ez-mb-sm text-black">{{list.title}}</h5>
                                <p>时间：{{list.createDate}}</p>
                                <p><span class="ez-mr-md">人数：{{list.adultNum + list.childNum}} </span><span> 行李数：{{lists.bagNum}}</span></p>
                            </div>
                        </div>
                    </td>
                    <td class="td-w-2">
                        <p>姓名：{{lists.contactsName}}</p>
                        <p>电话：{{lists.contactsMobile}}</p>
                        <p>备注：{{lists.remark}}</p>
                    </td>
                    <td class="td-w-3 text-center">
                        <p class="text-black">¥{{lists.price}}</p>
                        <p>{{lists.payWay | orderPayTypeVc}}</p>
                        <!-- <p>支付宝</p> -->
                    </td>
                    <td class="td-w-4 text-center">{{lists.status | orderStatusVc}}</td>
                    <td class="td-w-5 text-center"><a>服务详情</a></td>
                    <!-- <td class="td-w-5 text-center" @click="cancelOrderClick(lists.id)" v-if="lists.status > 1"></td> -->
                </tr>
            </table>

        </div>
    </div>
</template>
<script>
import { 
    myOrder, 
    cancelOrder, 
     } from 'getData'
export default {
    name: "myorder",
    data() {
        return {
            status: 0, //状态
            pageNo: 1,  //页数
            orderList: [],  //订单列表
            totalPage: 1, //总页数
        }
    },
    created() {
        this.getOrderList();
        this.$nextTick(()=>{this.status=0})
    },
    methods: {
        //取消订单
        cancelOrderClick(id){

        },
        //订单状态改变
        statusChange(status) {
            this.status = status;
            console.log(status)
            console.log(this.status)
            this.getOrderList();
        },
        //获取我的订单列表
        async getOrderList(){
            let status  = this.status > 0?this.status:"";
            let data = await myOrder({
                pageNo: this.pageNo,
                status: status,
            })
             if(data) {
                this.orderList = data.list;
                this.totalPage = data.totalPage;
            }
        }
    },
}
</script>

