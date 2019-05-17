<template>
    <div class="content-right no-border">
        <div class="panel-header ez-base-border">
            <div class="pull-left panel-header-title">订单管理</div>
            <div class="pull-right">
                <input type="text" class="panel-header-search" placeholder="搜索订单">
            </div>
        </div>
        <div class="content-panel">
            <ul class="list-inline ez_public_list ez-order-nav">
                <li class="active"><a class="btn">全部订单</a></li>
                <li><a class="btn">待付款</a></li>
                <li><a class="btn">待确认</a></li>
                <li><a class="btn">未出行</a></li>
                <li><a class="btn">待点评</a></li>
                <li><a class="btn">退款订单</a></li>
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

            <table class="table table-bordered table-order text-lightgray">
                <tr class="tr-line">
                    <td colspan="5" class="td-line">
                        <span>下单时间：2018-02-21 09:47:11</span>
                        <span>订单号：20180221094711</span>
                        <span>供应商：赵记租车有限公司</span>
                        <a class="btn btn-sm btn-default pull-right">租车包车</a>
                    </td>
                </tr>
                <tr>
                    <td class="td-w-1">
                        <div class="table-order-card">
                            <img src="~images/cruise-1.png">
                            <div class="table-order-text">
                                <h5 class="ez-mb-sm text-black">大众帕萨特-费城, 华盛顿, 康宁, 尼亚加拉瀑布,波士顿5日游（纽约出发）-大众帕萨特</h5>
                                <p>时间：2017-08-12</p>
                                <p><span class="ez-mr-md">人数：23 </span><span> 行李数：21</span></p>
                            </div>
                        </div>
                    </td>
                    <td class="td-w-2">
                        <p>姓名：李成寅</p>
                        <p>电话：18620923097</p>
                        <p>备注：我们有三个老人，2个小孩</p>
                    </td>
                    <td class="td-w-3 text-center">
                        <p class="text-black">¥1320</p>
                        <p>支付宝</p>
                    </td>
                    <td class="td-w-4 text-center">退款成功</td>
                    <td class="td-w-5 text-center"><a>服务详情</a></td>
                </tr>
            </table>

            <table class="table table-bordered table-order text-lightgray">
                <tr class="tr-line">
                    <td colspan="5" class="td-line">
                        <span>下单时间：2018-02-21 09:47:11</span>
                        <span>订单号：20180221094711</span>
                        <span>供应商：赵记租车有限公司</span>
                        <a class="btn btn-sm btn-default pull-right">短途接送</a>
                    </td>
                </tr>
                <tr>
                    <td class="td-w-1">
                        <div class="table-order-card">
                            <img src="~images/cruise-1.png">
                            <div class="table-order-text">
                                <h5 class="ez-mb-sm text-black">大众帕萨特-费城, 华盛顿, 康宁, 尼亚加拉瀑布,波士顿5日游（纽约出发）-大众帕萨特</h5>
                                <p>时间：2017-08-12</p>
                                <p><span class="ez-mr-md">人数：23 </span><span> 行李数：21</span></p>
                            </div>
                        </div>
                    </td>
                    <td class="td-w-2">
                        <p>姓名：李成寅</p>
                        <p>电话：18620923097</p>
                        <p>备注：我们有三个老人，2个小孩</p>
                    </td>
                    <td class="td-w-3 text-center">
                        <p class="text-black">¥1320</p>
                        <p>支付宝</p>
                    </td>
                    <td class="td-w-4 text-center">退款中</td>
                    <td class="td-w-5 text-center">
                        <div class="ez-mb-sm"><a class="btn ez-btn-warning">评论</a></div>
                        <div><a>查看详情</a></div>
                    </td>
                </tr>
            </table>

            <table class="table table-bordered table-order text-lightgray">
                <tr class="tr-line">
                    <td colspan="5" class="td-line">
                        <span>下单时间：2018-02-21 09:47:11</span>
                        <span>订单号：20180221094711</span>
                        <span>供应商：赵记租车有限公司</span>
                        <a class="btn btn-sm btn-default pull-right">接送机</a>
                    </td>
                </tr>
                <tr>
                    <td class="td-w-1 pd-lr-0">
                        <div class="table-order-card">
                            <img src="~images/cruise-1.png">
                            <div class="table-order-text">
                                <h5 class="ez-mb-sm text-black">大众帕萨特-费城, 华盛顿, 康宁, 尼亚加拉瀑布,波士顿5日游（纽约出发）-大众帕萨特</h5>
                                <p>时间：2017-08-12</p>
                                <p><span class="ez-mr-md">人数：23 </span><span> 行李数：21</span></p>
                            </div>
                        </div>
                        <div class="table-order-card">
                            <img src="~images/cruise-1.png">
                            <div class="table-order-text">
                                <h5 class="ez-mb-sm text-black">大众帕萨特-费城, 华盛顿, 康宁, 尼亚加拉瀑布,波士顿5日游（纽约出发）-大众帕萨特</h5>
                                <p>时间：2017-08-12</p>
                                <p><span class="ez-mr-md">人数：23 </span><span> 行李数：21</span></p>
                            </div>
                        </div>
                    </td>
                    <td class="td-w-2">
                        <p>姓名：李成寅</p>
                        <p>电话：18620923097</p>
                        <p>备注：我们有三个老人，2个小孩</p>
                    </td>
                    <td class="td-w-3 text-center">
                        <p class="text-black">¥1320</p>
                    </td>
                    <td class="td-w-4 text-center">退款中</td>
                    <td class="td-w-5 text-center">
                        <div class="ez-mb-sm"><a class="btn ez-btn-warning">立即付款</a></div>
                        <div class="ez-mb-sm"><a class="text-gray">取消订单</a></div>
                        <div><a>查看详情</a></div>
                    </td>
                </tr>
            </table>

            <table class="table table-bordered table-order text-lightgray">
                <tr class="tr-line">
                    <td colspan="5" class="td-line">
                        <span>下单时间：2018-02-21 09:47:11</span>
                        <span>订单号：20180221094711</span>
                        <span>供应商：赵记租车有限公司</span>
                        <a class="btn btn-sm btn-default pull-right">旅游定制</a>
                    </td>
                </tr>
                <tr>
                    <td class="td-w-1">
                        <div class="table-order-card">
                            <img src="~images/cruise-1.png">
                            <div class="table-order-text">
                                <h5 class="ez-mb-sm text-black">大众帕萨特-费城, 华盛顿, 康宁, 尼亚加拉瀑布,波士顿5日游（纽约出发）-大众帕萨特</h5>
                                <p>时间：2017-08-12</p>
                                <p><span class="ez-mr-md">人数：23 </span><span> 行李数：21</span></p>
                            </div>
                        </div>
                    </td>
                    <td class="td-w-2">
                        <p>姓名：李成寅</p>
                        <p>电话：18620923097</p>
                        <p>备注：我们有三个老人，2个小孩</p>
                    </td>
                    <td class="td-w-3 text-center">
                        <p class="text-black">¥1320</p>
                        <p>支付宝</p>
                    </td>
                    <td class="td-w-4 text-center">
                        <p class="ez-mb-sm">待支付</p>
                        <p>剩余时间12:12:30</p>
                    </td>
                    <td class="td-w-5 text-center">
                        <div class="ez-mb-sm"><a class="btn ez-btn-warning">导游电话</a></div>
                        <div class="ez-mb-sm"><a class="text-gray">取消订单</a></div>
                        <div><a>查看详情</a></div>
                    </td>
                </tr>
            </table>

            <table class="table table-bordered table-order text-lightgray">
                <tr class="tr-line">
                    <td colspan="5" class="td-line">
                        <span>下单时间：2018-02-21 09:47:11</span>
                        <span>订单号：20180221094711</span>
                        <span>供应商：赵记租车有限公司</span>
                        <a class="btn btn-sm btn-default pull-right">邮轮</a>
                    </td>
                </tr>
                <tr>
                    <td class="td-w-1">
                        <div class="table-order-card">
                            <img src="~images/cruise-1.png">
                            <div class="table-order-text">
                                <h5 class="ez-mb-sm text-black">大众帕萨特-费城, 华盛顿, 康宁, 尼亚加拉瀑布,波士顿5日游（纽约出发）-大众帕萨特</h5>
                                <p>时间：2017-08-12</p>
                                <p><span class="ez-mr-md">人数：23 </span><span> 行李数：21</span></p>
                            </div>
                        </div>
                    </td>
                    <td class="td-w-2">
                        <p>姓名：李成寅</p>
                        <p>电话：18620923097</p>
                        <p>备注：我们有三个老人，2个小孩</p>
                    </td>
                    <td class="td-w-3 text-center">
                        <p class="text-black">¥1320</p>
                        <p>支付宝</p>
                    </td>
                    <td class="td-w-4 text-center">退款中</td>
                    <td class="td-w-5 text-center">
                        <div class="ez-mb-sm"><a class="btn ez-btn-warning">立即付款</a></div>
                        <div class="ez-mb-sm"><a class="text-gray">取消订单</a></div>
                        <div><a>查看详情</a></div>
                    </td>
                </tr>
            </table>

            <table class="table table-bordered table-order text-lightgray">
                <tr class="tr-line">
                    <td colspan="5" class="td-line">
                        <span>下单时间：2018-02-21 09:47:11</span>
                        <span>订单号：20180221094711</span>
                        <span>供应商：赵记租车有限公司</span>
                        <a class="btn btn-sm btn-default pull-right">景点</a>
                    </td>
                </tr>
                <tr>
                    <td class="td-w-1">
                        <div class="table-order-card">
                            <img src="~images/cruise-1.png">
                            <div class="table-order-text">
                                <h5 class="ez-mb-sm text-black">大众帕萨特-费城, 华盛顿, 康宁, 尼亚加拉瀑布,波士顿5日游（纽约出发）-大众帕萨特</h5>
                                <p>时间：2017-08-12</p>
                                <p><span class="ez-mr-md">人数：23 </span><span> 行李数：21</span></p>
                            </div>
                        </div>
                    </td>
                    <td class="td-w-2">
                        <p>姓名：李成寅</p>
                        <p>电话：18620923097</p>
                    </td>
                    <td class="td-w-3 text-center">
                        <p class="text-black">¥1320</p>
                    </td>
                    <td class="td-w-4 text-center">
                        <p class="ez-mb-sm">待支付</p>
                        <p>剩余时间12:12:30</p>
                    </td>
                    <td class="td-w-5 text-center">
                        <div class="ez-mb-sm"><a class="btn ez-btn-warning">立即付款</a></div>
                        <div class="ez-mb-sm"><a class="text-gray">取消订单</a></div>
                        <div><a>查看详情</a></div>
                    </td>
                </tr>
            </table>


        </div>
    </div>
</template>
<script>
export default {
    name: "myGameOrder",
    data() {
        return {
            
        }
    },
}
</script>
