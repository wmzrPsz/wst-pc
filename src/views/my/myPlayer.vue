<template>
    <div class="content-right">
        <div class="panel-header">
            <div class="pull-left panel-header-title">玩家认证</div>
        </div>
        <div class="content-panel">

            <!--用户信息-->
            <form class="form-horizontal wrap-account">

                <div class="form-group">
                    <span class="label-txt required">真实姓名</span>
                    <div class="form-content" >
                        <input class="form-control" type="text"  v-model.trim="list.realName" maxlength="20" placeholder="请输入真实姓名">
                    </div>
                </div>

                <div class="form-group">
                    <span class="label-txt required">ID号</span>
                    <div class="form-content" >
                        <div class="select-group">
                            <select class="form-control ez-mr-sm" v-model="list.codeType">
                                <option value="1">身份证</option>
                                <option value="2">护照</option>
                                <option value="3">本地ID</option>
                            </select>
                            <div class=" col-md-8 col-sm-8">
                                <input class="form-control" type="text" v-model.trim="list.code" maxlength="20" placeholder="请输入证件号码">
                            </div>
                        </div>

                    </div>
                </div>

                <div class="form-group">
                    <span class="label-txt required">擅长</span>
                    <div class="form-content-lg" >
                        <ul class="skill-list list-inline">
                            <li v-for="(tag, index) in comTagList" :key="index" @click="tagClick(index,tag.flag)">
                                <a class="btn" :class="{'active':tag.flag}" >{{tag.content}}<i class="iconfont icon-yes"></i></a>
                            </li>
                        </ul>
                        <p>当地玩家擅长区域，可以第多选</p>
                    </div>
                </div>

                <div class="form-group">
                    <span class="label-txt required">当前地址</span>
                    <div class="form-content" >
                        <div class="select-group">
                                    <select class="form-control ez-mr-sm" v-model="list.countryid" @change="countryChange">
                                        <option value="" selected>请选择</option>
                                        <option :value="country.countryid" v-for="(country, index) in countryList" :key="index">{{country.countryName}}</option>
                                    </select>
                                    <select class="form-control ez-mr-sm s" v-model="list.cityid">
                                        <option value="" selected>请选择</option>
                                        <option :value="city.cityid"  v-for="(city, index) in cityList" :key="index">{{city.cityName}}</option>
                                    </select>
                        </div>
                        <div>
                            <textarea class="ez-control-textarea" rows="10" cols="30" v-model.trim="list.address" maxlength="50"  placeholder="请输入详细地址"></textarea>
                        </div>
                    </div>
                </div>

                <div class="form-group">
                    <span class="label-txt required">背景图</span>
                    <div class="form-content upload-plugin avatarImgUpload">
                        <div class="upload-imgbox" style="width:100%;">
                             <input type="file"  @change="imgChange('img')" id="img"  accept="image/*" v-show>
                            <img onclick="{ $('#img').click();}" :src="list.img?list.img:'../../images/upload2.png'">
                        </div>
                    </div>
                </div>

                <div class="form-group">
                    <span class="label-txt required">证件上传</span>
                    <div class="form-content upload-plugin avatarImgUpload">
                        <div class="upload-imgbox" style="width:100%;">
                             <input type="file"  @change="imgChange('img0')" id="img0"  accept="image/*" v-show>
                             <input type="file"  @change="imgChange('img1')" id="img1" accept="image/*" v-show>
                            <img onclick="{ $('#img0').click();}" :src="list.img0?list.img0:'../../images/upload2.png'">
                            <img onclick="{ $('#img1').click();}" :src="list.img1?list.img1:'../../images/upload2.png'">
                        </div>
                       <!-- <div class="upload-text-lg">
                            <p>建议上传图片尺寸为500*500</p>
                            <p>大小不超过20M</p> 
                            <div class="ez-upload-btn ez-mt-10">
                                <input type="file" title="上传封面" onchange="uploadAvatar()" id="avatarImgFile" accept="image/*"> 上传封面
                            </div> 
                        </div> -->
                    </div>
                </div>

                <div class="form-group">
                    <span class="label-txt">简介</span>
                    <div class="form-content" >
                        <div>
                            <textarea class="ez-control-textarea" rows="10" cols="30" v-model.trim="list.introduction" maxlength="50"  placeholder="请输入详简介">简介</textarea>
                        </div>
                    </div>
                </div>

                <div class="form-group">
                    <span class="label-txt">详情</span>
                    <div class="form-content" >
                        <textarea class="ez-control-textarea" rows="10" cols="30" v-model.trim="list.deltails" maxlength="50"  placeholder="请输入详情">详情</textarea>
                    </div>
                </div>

                <div class="form-group">
                    <span class="label-txt"></span>
                    <div class="form-content" >
                        <a class="btn btn-lg ez-btn-parmary ez-mr-md" @click="subData">编辑</a>
                        <a class="btn btn-lg ez-btn">取消</a>
                    </div>
                </div>
            </form>



        </div>
    </div>
</template>
<script>
import {
    addGuide,
    getCountryCity,
    getGuideInfo,
    getGuideLabel,
    imgUpload,
     } from 'getData'
export default {
    name: "myPlayer",
    data() {
        return {
            list:{},  //玩家认证信息
            countryList:[],  //国家城市
            comTagList:"", //玩家擅长属性
            cityList:[],//城市List
        }
    },
    created () {
        this.getData();
    },
    methods: {
        //编辑更新数据
        async subData(){
            // Vue.set(this.list,"deltails",this.um.getContent());
            Vue.set(this.list,"tagId",this.getLable());
            for (const [key,value] of Object.entries(this.list)) {
                if(value === "" || value == undefined || value == null){
                    console.log(key);
                    this.infoMsg("请完善数据");  
                    return;
                }
            }
            Vue.set(this.list,"photoUrl",`${this.list.img0},${this.list.img1}`);
            console.log(`${this.list.img0},${this.list.img1}`);
            if(await addGuide(this.list)){
                this.successMsg("提交成功");
            }
        },
        //获取选中的标签
        getLable:function(){
            let ids = [];
            for (const tag of Object.values(this.comTagList)) {
                if(tag.flag){
                    ids.push(tag.tagid);
                }
            }
            if(ids){
                ids.join(",");
            }
            return ids.length === 0 ? "" : ids.toString();
        },
        //点击标签
        tagClick:function(index,flag){
            Vue.set(this.comTagList[index],"flag",!flag); 
        },
        //玩家擅长属性初始化
        lableInit:function(){
            if(this.list.tagId == undefined){
                Vue.set(this.list,"tagId","");
            }
            for (const tag of Object.values(this.comTagList)) {
                Vue.set(tag,"flag",false);  
                if(this.list.tagId.includes(tag.tagid)){
                        Vue.set(tag,"flag",true);  
                }
            }
        },
        //国家改变
        countryChange:function(){
            this.list.cityid = "";
            this.countryPd();
        },
        countryPd:function(){
            let flag = true;
            for(let k in this.countryList){
                if(this.countryList[k].countryid == this.list.countryid){
                    this.cityList = this.countryList[k].cityList;
                    flag = false;
                    break;
                }
            }
            if ( flag ) this.cityList = [];
        },
        //根据语言获取国家城市
        async getCountryCity() {
            this.countryList = await getCountryCity()
        },
        //获取玩家认证信息
        async getData() {
                let list = await getGuideInfo() || {};
                if(list.photoUrl){
                    Vue.set(list,'img0',list.photoUrl.split(',')[0]);
                    Vue.set(list,'img1',list.photoUrl.split(',')[1]);
                }else{
                    Vue.set(list,'img0',"");
                    Vue.set(list,'img1',"");
                }
                Vue.delete(list,'photoUrl');
                this.list = list;
                this.getCountryCity();
                this.getLAbleData();
        },
        //获取玩家擅长属性
        async getLAbleData() {
            let data = await getGuideLabel({
            })
            if(data) {
                this.comTagList = data;
                this.lableInit();
            }
        },
        //上传图片
        async imgChange(id) {
          Vue.set(this.list,id, await imgUpload());
        },
    },
}
</script>
