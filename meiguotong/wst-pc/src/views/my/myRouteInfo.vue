<template>
    <div class="content-right no-border">
        <div class="panel-header ez-base-border">
            <div class="pull-left panel-header-title">
                <router-link :to="{name: 'myRoute'}" tag="a">路线规划</router-link>
                &gt;<a>添加/编辑</a></div>
            <div class="pull-right" v-if="id">
                <a class="btn ez-btn" @click="deleteDate">删除</a>
            </div>
        </div>
        <div class="content-panel">
            <div class="route-content ez-base-border">
                <!--路线规划-->
                <form class="form-horizontal wrap-account">

                    <div class="form-group">
                        <span class="label-txt ">标题</span>
                        <div class="form-content">
                            <input class="form-control" type="text" v-model.trim="list.title" maxlength="30"
                                placeholder="请输入标题">
                        </div>
                    </div>

                    <div class="form-group">
                        <span class="label-txt">封面</span>
                        <div class="form-content upload-plugin avatarImgUpload">
                            <img class="upload-img" :src="list.photo?list.photo:'../../images/upload2.png'">
                            <div class="upload-text">
                                <p>建议上传图片尺寸为500*500</p>
                                <p>大小不超过20M</p>
                                <!--<a class="btn ez-btn">上传封面</a>-->
                                <div class="ez-upload-btn ez-mt-10">
                                    <input type="file" title="上传封面" @change="imgChange('photo')" accept="image/*">
                                    上传封面
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="form-group">
                        <span class="label-txt">沿途景点</span>
                        <div class="form-content">
                            <a class="btn btn-md ez-btn" data-toggle="modal" data-target="#addScenice">添加景点</a>
                        </div>
                    </div>

                    <div class="form-group">
                        <span class="label-txt">详情</span>
                        <div class="form-content">
                             <textarea class="ez-control-textarea" rows="10" cols="30" v-model.trim="list.details" maxlength="50"  placeholder="请输入详简介">简介</textarea>
                        </div>
                    </div>

                    <div class="form-group">
                        <span class="label-txt ">最低人数</span>
                        <div class="form-content">
                            <input class="form-control" type="number" v-model.trim="list.miniNum" placeholder="请输入最低人数">
                        </div>
                    </div>

                    <div class="form-group">
                        <span class="label-txt ">行程天数</span>
                        <div class="form-content">
                            <input class="form-control" type="number" v-model.trim="list.day" placeholder="请输入行程天数">
                        </div>
                    </div>

                    <div class="form-group">
                        <span class="label-txt ">价格设置</span>
                        <div class="form-content">
                            <div class="route-panel ez-nav-tabs ez-base-border">
                                <ul class="list-inline text-center">
                                    <li :class="{'active':list.dateType==1}" @click="dateTypeClick(1)"><a>所有日期</a></li>
                                    <li :class="{'active':list.dateType==2}" @click="dateTypeClick(2)"><a>按星期</a></li>
                                    <li :class="{'active':list.dateType==3}" @click="dateTypeClick(3)"><a>按号数</a></li>
                                </ul>

                                <div class="route-tabcontent">
                                    <div class="form-group-inner">
                                        <span class="label-txt ">开始时间</span>
                                        <div class="form-content-inner">
                                            <input class="form-control" type="date" v-model="list.beginDate">
                                        </div>
                                    </div>
                                    <div class="form-group-inner">
                                        <span class="label-txt ">结束时间</span>
                                        <div class="form-content-inner">
                                            <input class="form-control" type="date" v-model="list.endDate">
                                        </div>
                                    </div>
                                    <!--所有日期-->
                                    <div class="tab-pane route-tabpane" :class="{'active':list.dateType==1}">
                                    </div>
                                    <!--按星期-->
                                    <div class="tab-pane route-tabpane" :class="{'active':list.dateType==2}">
                                        <div class="form-group-inner" style="margin-top: 0px">
                                            <span class="label-txt "></span>
                                            <div class="form-content-inner">
                                                <ul class="list-inline date-weeks-list toggle-list text-center">
                                                    <li v-for="(week, index) in weekList" :key="index" :class="{'active':week.flag}"
                                                        @click="weekClick(index)">{{week.name}}</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <!--按号数-->
                                    <div class="tab-pane route-tabpane" :class="{'active':list.dateType==3}">
                                        <div class="form-group-inner" style="margin-top: 0px">
                                            <ul class="list-inline date-days-list toggle-list text-center">
                                                <li v-for="(day, index) in dayList" :key="index" :class="{'active':day.flag}"
                                                    @click="dayClick(index)">{{day.name}}</li>
                                            </ul>
                                        </div>
                                    </div>

                                    <div class="form-group-inner">
                                        <span class="label-txt ">价格</span>
                                        <div class="form-content-inner">
                                            <input class="form-control" type="number" v-model="list.price"
                                                placeholder="请输入价格">
                                        </div>
                                    </div>

                                </div>
                                <div class="clearfix"></div>
                            </div>

                        </div>
                    </div>



                    <div class="form-group">
                        <span class="label-txt"></span>
                        <div class="form-content">
                            <a class="btn btn-lg ez-btn-parmary ez-mr-md" @click="subData">提交</a>
                            <!--<a class="btn btn-lg ez-btn">取消</a>-->
                        </div>
                    </div>
                </form>


        <!-- 绑定邮箱弹出框（Modal） -->
        <div class="modal fade emailBind ez-modal" id="addScenice" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
            aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <!--<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>-->
                        <button type="button" class="modal-close" data-dismiss="modal" aria-hidden="true"><i class="iconfont icon-close"></i></button>
                        <h4 class="modal-title text-center" id="myModalLabel">选择景点</h4>
                    </div>
                    <div class="modal-body">
                        <form class="form-horizontal">

                            <div class="form-group clearfix" v-for="(list, index) in scenicList" :key="index">
                                <span class="col-sm-3 control-label"></span>
                                <div class="col-sm-7">
                                    <label class="checkbox-inline">
                                        <input type="checkbox" :value="list.scenicSpotid" v-model="sceniceIds">{{list.name}}
                                    </label>
                                </div>
                            </div>

                            <div class="form-group clearfix">
                                <span class="col-sm-3"></span>
                                <div class="col-sm-6">
                                    <a class="btn btn-lg ez-btn-parmary ez-mr-md" style="border-radius: 4px"
                                        data-dismiss="modal" aria-hidden="true">确定</a>
                                </div>
                            </div>
                        </form>
                        <div class="clearfix"></div>

                    </div>
                </div>
            </div>
        </div>
        <!-- 绑定邮箱弹出框 /.modal -->

            </div>
        </div>
    </div>
</template>
<script>
import {
    updateGuideRoute,
    getGuideRouteDetail,
    getCityScenic,
    deleteGuideRoute,
    imgUpload
     } from 'getData'
export default {
    name: "myRouteInfo",
    data() {
        return {
            list: {},
            id: "",
            um: "",  //百度编辑器对象
            weekList: [],  //星期
            dayList: [],  //天数
            scenicList: [],  //景点list
            sceniceIds: [],  //选择的景点
        }
    },
    created () {
        this.weekListInit();
        this.dayListInit();
        this.getScenic();
        if (this.id) {
            this.getData();
        } else {
            Vue.set(this.list, "title", "");
            Vue.set(this.list, "photo", "");
            Vue.set(this.list, "scenice", "");
            Vue.set(this.list, "details", "");
            Vue.set(this.list, "miniNum", "");
            Vue.set(this.list, "dateType", 1);
            Vue.set(this.list, "beginDate", "");
            Vue.set(this.list, "endDate", "");
            Vue.set(this.list, "price", "");
        }
    },
    methods: {
        //星期初始化
        weekListInit(){
            this.weekList = [];
            for(let k=1;k<=7;k++){
                let map = {};
                Vue.set(map,"value","");
                Vue.set(map,"flag",false);
                if(k==1)  Vue.set(map,"name","周一");
                if(k==2)  Vue.set(map,"name","周二");
                if(k==3)  Vue.set(map,"name","周三");
                if(k==4)  Vue.set(map,"name","周四");
                if(k==5)  Vue.set(map,"name","周五");
                if(k==6)  Vue.set(map,"name","周六");
                if(k==7)  Vue.set(map,"name","周日");
                this.weekList.push(map);
            }
        },
        //天数初始化
        dayListInit:function(){
            this.dayList = [];
            for(let k=1;k<=31;k++){
                let map = {};
                Vue.set(map,"name",k);
                Vue.set(map,"value",k);
                Vue.set(map,"flag",false);
                this.dayList.push(map);
            }
        },
        //点击天数
        dayClick: function (index) {
            Vue.set(this.dayList[index], "flag", !this.dayList[index].flag);
        },
        //点击周数
        weekClick: function (index) {
            Vue.set(this.weekList[index], "flag", !this.weekList[index].flag);
        },
        //点击时间类型
        dateTypeClick: function (index) {
            Vue.set(this.list, "dateType", index);
        },
        //获取选择的天数
        getDay: function () {
            let ids = [];
            for (const day of Object.values(this.dayList)) {
                if (day.flag) {
                    ids.push(day.value);
                }
            }
            if (ids) {
                ids.join(",");
            }
            return ids.length > 0 ? ids.toString() : "";
        },
        //获取选择的星期
        getWeek: function () {
            let ids = [];
            for (const week of Object.values(this.weekList)) {
                if (week.flag) {
                    ids.push(week.value);
                }
            }
            if (ids) {
                ids.join(",");
            }
            return ids.length > 0 ? ids.toString() : "";
        },
        //修改添加导游路线
        async subData() {
            Vue.set(this.list, "scenice", this.sceniceIds.toString());
            console.log(this.sceniceIds.toString());
            // Vue.set(this.list, "details", this.um.getContent());
            if (this.list.dateType === 2) {
                Vue.set(this.list, "weekDate", this.getWeek());
            } else if (this.list.dateType === 3) {
                Vue.set(this.list, "dayDate", this.getDay());
            }
            for (const [key, value] of Object.entries(this.list)) {
                if (value === "" || value === null || value === undefined) {
                    console.log(key);
                    layerMsg("请完善数据");
                    return;
                }
            }
            if (await updateGuideRoute(this.list)){
                layer.msg('保存成功', function () {
                    location.href = "./P1-9-1.html";
                });
            }
        },
        //获取导游路线规划详情
        async getData() {
            let data = await getGuideRouteDetail({
                guideRouteid: this.id,
            })
            if(data) {
                this.list = data.guideRoute;
                if (this.list.scenice) {
                    this.sceniceIds = this.list.scenice.split(",");
                }
                this.dataInit();
            }
        },
        //获取景点
        async getScenic() {
            let data = await getCityScenic()
            if(data){
                 this.scenicList = data;
            }
        },
        //删除景点
        async deleteDate() {
            if(await deleteGuideRoute({
                guideRouteid: this.list.guideRouteid
            })){
                layer.msg('删除成功', function () {
                    location.href = "./P1-9-1.html";
                });
            }
        },
        //上传图片
        async imgChange(id) {
            Vue.set(this.list, id, await imgUpload());
        },
        //处理时间
        dataInit: function () {
            if (this.list.weekDate) {
                for (const list of Object.values(this.weekList)) {
                    if (this.list.weekDate.includes(list.value)) {
                        Vue.set(list, "flag", true);
                    }
                }
            }
            if (this.list.dayList) {
                for (const list of Object.values(this.dayList)) {
                    if (this.list.dayDate.includes(list.value)) {
                        Vue.set(list, "flag", true);
                    }
                }
            }
            Vue.delete(this.list, "weekDate");
            Vue.delete(this.list, "dayDate");
        },
    },
}
</script>
