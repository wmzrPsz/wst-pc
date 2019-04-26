<template>
<aside class="ez-aside">
    <div class="aside-box text-center">
        <div class="aside-shopcart">
            <a href="#"><i class="iconfont icon-shopcart"></i></a>
            <div class="shop-text">购</div>
            <div class="shop-text">物</div>
            <div class="shop-text">车</div>
            <div class="shop-num">2</div>
        </div>
        <div class="aside-contact">
            <!--电话-->
            <div style="position: relative;">
                <i class="iconfont icon-phonecall ez-btn-phone"></i>
                <div class="tooltip left in ez-tooltip ez-tooltip-phonecall" role="tooltip" style="display: none">
                    <div class="tooltip-arrow"></div>
                    <div class="tooltip-inner text-center">
                        <h4 class="title text-blue">电话客服</h4>
                        <p class="text-gray">留下您的电话，我们会立刻回复哦</p>
                        <form class="form-horizontal" onsubmit="">
                            <div class="form-group">
                                <select class="form-control">
                                    <option value="">选择国家</option>
                                    <option value="1">中国</option>
                                    <option value="2">美国</option>
                                    <option value="3">日本</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <input type="text" class="form-control" placeholder="输入电话号码">
                            </div>
                        </form>
                        <a class="btn ez-btn-parmary ez-btn-xl">确定</a>
                        <p class="text-gray">全球7*24小时客服电话</p>
                        <p class="text-darkgray">400-666-8888</p>
                    </div>
                </div>
            </div>
            <!--腾讯qq-->
            <div style="position: relative;">
                <i class="iconfont icon-qq ez-btn-qq" style="font-weight: bold"></i>
                <div class="tooltip left in ez-tooltip ez-tooltip-qq" role="tooltip" style="display: none;">
                    <div class="tooltip-arrow"></div>
                    <div class="tooltip-inner text-center">
                        <h4 class="title text-blue">QQ</h4>
                        <div class="tooltip-icon-qq">
                            <i class="iconfont icon-qq-s"></i>
                        </div>
                        <a class="btn ez-btn-parmary ez-btn-xl">点我，联系我们</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="back-to-top text-center">
        <a class="btn-back"><i class="iconfont icon-arrow-top"></i></a>
    </div>
</aside>
</template>