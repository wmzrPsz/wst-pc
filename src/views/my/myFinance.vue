<template>
    <div class="content-right finance-content-right">
        <div class="panel-header">
            <div class="pull-left panel-header-title">财务管理</div>
        </div>
        <div class="finance-panel">
            <h5>余额</h5>
            <span class="balance-text text-orange"><i>¥</i>123,666</span>
            <span class="finance-panel-btn">
                <a class="btn btn-md text-bold">提现申请</a>
            </span>
        </div>

        <table class="table text-center finance-table">
            <tr>
                <th>时间</th>
                <th>金额</th>
                <th>类型</th>
                <th>备注</th>
            </tr>
            <tr>
                <td>2018-09-09 09:09:19</td>
                <td class="text-orange">¥234</td>
                <td>定制行程</td>
                <td>费城，华盛顿广场，尼古拉瀑布，时代广场7日游（纽约出发）</td>
            </tr>
            <tr>
                <td>2018-09-09 09:09:19</td>
                <td class="text-orange">¥888</td>
                <td>定制行程</td>
                <td>费城，华盛顿广场，尼古拉瀑布，时代广场7日游（纽约出发）</td>
            </tr>
            <tr>
                <td>2018-09-09 09:09:19</td>
                <td class="text-orange">¥299</td>
                <td>定制行程</td>
                <td>费城，华盛顿广场，尼古拉瀑布，时代广场7日游（纽约出发）</td>
            </tr>
            <tr>
                <td>2018-09-09 09:09:19</td>
                <td class="text-orange">¥999</td>
                <td>定制行程</td>
                <td>费城，华盛顿广场，尼古拉瀑布，时代广场7日游（纽约出发）</td>
            </tr>
        </table>
        <nav class="text-center">
            <ul class="pagination ez-navigation">
                <li class="active"><a href="#">1</a></li>
                <li><a href="#">2</a></li>
                <li><a href="#">3</a></li>
                <li><a href="#">4</a></li>
                <li><a href="#">5</a></li>
                <li><a href="#">6</a></li>
                <li><a href="#">...</a></li>
                <li>
                    <a href="#" class="page-next" aria-label="Next">
                        <span aria-hidden="true">Next &gt;</span>
                    </a>
                </li>
            </ul>
        </nav>
    </div>
</template>
<script>
export default {
    name: "myFinance",
    data() {
        return {
            
        }
    },
    methods: {
        
    }
}
</script>
