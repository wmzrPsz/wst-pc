<template>
<div>
  <footer class="ez-footer">
    <div class="ez-advantage">
        <div class="container ez-container">
            <div class="advantage-title">
                <img alt="..." src="~images/ez-advantage.png">
            </div>
            <ul class="list-inline text-center advantage-list pull-right">
                <li>
                    <i class="iconfont icon-sun"></i>
                    <p>阳光保证</p>
                </li>
                <li>
                    <i class="iconfont icon-app"></i>
                    <p>产品丰富</p>
                </li>
                <li>
                    <i class="iconfont icon-service"></i>
                    <p>卓越服务</p>
                </li>
                <li>
                    <i class="iconfont icon-label"></i>
                    <p>预定价格保障</p>
                </li>
                <li>
                    <i class="iconfont icon-hotel"></i>
                    <p>酒店升级保障</p>
                </li>
                <li>
                    <i class="iconfont icon-flight"></i>
                    <p>航班延误保障</p>
                </li>
                <li>
                    <i class="iconfont icon-fault"></i>
                    <p>特殊原因退订保障</p>
                </li>
                <li>
                    <i class="iconfont icon-rain"></i>
                    <p>不可抗力退订保障</p>
                </li>
                <li>
                    <i class="iconfont icon-disasters"></i>
                    <p>重大灾害保障</p>
                </li>
            </ul>
        </div>
    </div>

    <div class="container ez-container ez-links">
        <ul class="list-inline links-list">
            <h4>合作伙伴</h4>
            <li><a href="#"><img src="~images/links/link1.gif" class="center-block img-responsive"></a></li>
            <li><a href="#"><img src="~images/links/link2.gif" class="center-block img-responsive"></a></li>
            <li><a href="#"><img src="~images/links/link3.gif" class="center-block img-responsive"></a></li>
            <li><a href="#"><img src="~images/links/link4.gif" class="center-block img-responsive"></a></li>
            <li><a href="#"><img src="~images/links/link5.gif" class="center-block img-responsive"></a></li>
            <li><a href="#"><img src="~images/links/link6.gif" class="center-block img-responsive"></a></li>
            <li><a href="#"><img src="~images/links/link7.gif" class="center-block img-responsive"></a></li>
            <li><a href="#"><img src="~images/links/link8.gif" class="center-block img-responsive"></a></li>
            <li><a href="#"><img src="~images/links/link9.gif" class="center-block img-responsive"></a></li>
            <li><a href="#"><img src="~images/links/link10.gif" class="center-block img-responsive"></a></li>
            <li><a href="#"><img src="~images/links/link11.gif" class="center-block img-responsive"></a></li>
            <li><a href="#"><img src="~images/links/link12.gif" class="center-block img-responsive"></a></li>
            <li><a href="#"><img src="~images/links/link13.gif" class="center-block img-responsive"></a></li>
            <li><a href="#"><img src="~images/links/link14.gif" class="center-block img-responsive"></a></li>
            <li><a href="#"><img src="~images/links/link15.png" class="center-block img-responsive"></a></li>
            <li><a href="#"><img src="~images/links/link16.gif" class="center-block img-responsive"></a></li>
            <li><a href="#"><img src="~images/links/link17.gif" class="center-block img-responsive"></a></li>
            <li><a href="#"><img src="~images/links/link18.gif" class="center-block img-responsive"></a></li>
        </ul>
    </div>

    <div class="container ez-container ez-category">
        <div class="footer-logo">
            <img src="~images/footer-logo.png">
        </div>
        <div class="footer-category text-center">
            <div class="category-grid">
                <p class="title">订购指南</p>
                <ul class="category-list">
                    <li><a href="#">订购流程</a></li>
                    <li><a href="#">客户协议</a></li>
                    <li><a href="#">更改取消</a></li>
                    <li><a href="#">使用及隐私条款</a></li>
                </ul>
            </div>
            <div class="category-grid">
                <p class="title">用户中心</p>
                <ul class="category-list">
                    <li><a href="#">用户注册/登录</a></li>
                    <li><a href="#">找回密码</a></li>
                    <li><a href="#">付款方式</a></li>
                    <li><a href="#">积分奖励</a></li>
                    <li><a href="#">会员俱乐部</a></li>
                    <li><a href="#">旅游保险</a></li>
                </ul>
            </div>

            <div class="category-grid">
                <p class="title">帮助中心</p>
                <ul class="category-list">
                    <li><a href="#">公司简介</a></li>
                    <li><a href="#">签证服务</a></li>
                    <li><a href="#">旅游保险</a></li>
                    <li><a href="#">网站地图</a></li>
                </ul>
            </div>

            <div class="category-grid">
                <p class="title">新阳光合作</p>
                <ul class="category-list">
                    <li><a href="#">友情链接</a></li>
                    <li><a href="#">商务合作</a></li>
                    <li><a href="#">网站联盟</a></li>
                </ul>
            </div>

            <div class="category-grid">
                <p class="title">新阳光国际</p>
                <ul class="category-list">
                    <li><a href="#">关于我们</a></li>
                    <li><a href="#">联系我们</a></li>
                    <li><a href="#">招聘英才</a></li>
                    <li><a href="#">版权</a></li>
                </ul>
            </div>

        </div>
        <div class="footer-qrcode text-center pull-right">
            <img src="~images/qrcode.png" class="center-block img-responsive">
            <p>关注微信公众号</p>
        </div>
    </div>

    <ezWebsite></ezWebsite>
    <div class="clearfix"></div>
</footer>
</div>
</template>
<script>
import ezWebsite from "components/home/ezWebsite"
export default {
    name: "ezFooter",
    data() {
        return {
            
        }
    },
    components: {
        ezWebsite
    }
}
</script>
