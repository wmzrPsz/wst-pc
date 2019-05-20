<template>
    <div class="content-right">
        <div class="panel-header">
            <div class="pull-left panel-header-title">公司信息</div>
        </div>
        <div class="content-panel">

            <!--用户信息-->
            <form class="form-horizontal wrap-account">

                <!-- <div class="form-group">
                    <span class="label-txt required">昵称</span>
                    <div class="form-content" >
                        <input class="form-control" type="text" v-model.trim="member.nickName"  maxlength="20" >
                    </div>
                </div> -->

                <div class="form-group">
                    <span class="label-txt required">用户头像</span>
                    <div class="form-content upload-plugin avatarImgUpload" >
                        <img class="upload-img" :src="member.photo?member.photo:'../../images/upload2.png'">
                        <div class="upload-text">
                            <p>建议上传图片尺寸为500*500</p>
                            <p>大小不超过20M</p> 
                            <!--<a class="btn ez-btn">上传封面</a>-->
                          <div class="ez-upload-btn ez-mt-10">
                                <input type="file" title="上传封面" @change="imgChange('photo')" accept="image/*"> 上传封面
                            </div>
                        </div>
                    </div>
                </div>

                <div class="form-group">
                    <span class="label-txt required">手机号</span>
                    <div class="form-content" >
                        <input class="form-control" type="number" maxlength="20" v-model.trim="member.phone" >
                    </div>
                </div>

                <div class="form-group">
                    <span class="label-txt required">邮箱</span>
                    <div class="form-content" >
                        <a class="btn btn-md ez-btn" data-toggle="modal" data-target="#emailBind">绑定邮箱</a>
                    </div>
                </div>

                <div class="form-group">
                    <span class="label-txt required">我的地址</span>
                    <div class="form-content" >
                        <div class="select-group">
                            <select class="form-control ez-mr-sm" v-model="member.countryid" @change="countryChange">
                                <option value="" selected>请选择</option>
                                <option :value="country.countryid" v-for="(country, index) in countryList" :key="index">{{country.countryName}}</option>
                            </select>
                            <select class="form-control ez-mr-sm s" v-model="member.cityid">
                                 <option value="" selected>请选择</option>
                                 <option :value="city.cityid"  v-for="(city, index) in cityList" :key="index">{{city.cityName}}</option>
                            </select>
                        </div>
                        <div>
                            <input class="form-control" type="text" v-model.trim="member.address" placeholder="详细地址">
                        </div>
                    </div>
                </div>

                <div class="form-group">
                    <span class="label-txt"></span>
                    <div class="form-content" >
                        <a class="btn btn-lg ez-btn-parmary ez-mr-md">编辑</a>
                        <a class="btn btn-lg ez-btn">修改密码</a>
                    </div>
                </div>

            </form>

            <!--公司信息-->
            <form class="form-horizontal wrap-account">
                <div class="form-group">
                    <span class="label-txt">法人代表</span>
                    <div class="form-content" >
                        <input class="form-control" type="text" maxlength="20" v-model.trim="member.legalPerson">
                    </div>
                </div>

                <div class="form-group">
                    <span class="label-txt">企业名称</span>
                    <div class="form-content" >
                        <input class="form-control" type="text" maxlength="20" v-model.trim="member.companyName">
                    </div>
                </div>

                <div class="form-group">
                    <span class="label-txt ">企业logo</span>
                    <div class="form-content upload-plugin" > 
                         <input type="file" title="上传封面" @change="imgChange('companyLogo')" accept="image/*"  id="companyLogo" v-show> 
                         <img onclick="{ $('#companyLogo').click();}" class="upload-img" :src="member.companyLogo?member.companyLogo:'../../images/upload2.png'">
                    </div>
                </div>

                <div class="form-group">
                    <span class="label-txt ">企业执照</span>
                    <div class="form-content-sm" >
                        <input type="file" title="上传封面" @change="imgChange('companyImg')" accept="image/*"  id="companyImg" v-show> 
                        <img onclick="{ $('#companyImg').click();}" class="upload-img" :src="member.companyImg?member.companyImg:'../../images/idcard-com.png'" width="185" height="110">
                    </div>
                    <span class="label-txt ">法人身份证</span>
                    <div class="form-content-sm" >
                        <input type="file" title="上传封面" @change="imgChange('cardsImg')" accept="image/*"  id="cardsImg" v-show> 
                        <img onclick="{ $('#cardsImg').click();}" class="upload-img" :src="member.cardsImg?member.cardsImg:'../../images/idcard-com2.png'" width="185" height="110">
                    </div>
                </div>

                <div class="form-group">
                    <span class="label-txt ">企业简介</span>
                    <div class="form-content" >
                        <textarea class="ez-control-textarea" rows="10" cols="30" v-model="member.companyContent"></textarea>

                    </div>
                </div>

                <div class="form-group">
                    <span class="label-txt"></span>
                    <div class="form-content" >
                        <a class="btn btn-lg ez-btn-parmary ez-mr-md" @click.stop="updateMember">编辑</a>
                    </div>
                </div>

            </form>

        <!-- 绑定邮箱弹出框（Modal） -->
        <div class="modal fade emailBind ez-modal" id="emailBind" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <!--<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>-->
                        <button type="button" class="modal-close" data-dismiss="modal" aria-hidden="true"><i class="iconfont icon-close"></i></button>
                        <h4 class="modal-title text-center" id="myModalLabel">绑定邮箱</h4>
                    </div>
                    <div class="modal-body">
                        <form class="form-horizontal">
                            <div class="form-group clearfix">
                                <span class="col-sm-3 control-label">邮箱</span>
                                <div class="col-sm-7" >
                                    <input class="form-control" type="text" maxlength="20"   v-model.trim ="member.email">
                                    <div><a class="btn btn-md ez-btn ez-mt-10" @click.stop="getSendSms">获取验证码</a></div>
                                </div>
                            </div>

                            <div class="form-group clearfix">
                                <span class="col-sm-3 control-label ">验证码</span>
                                <div class="col-sm-7" >
                                    <input class="form-control" type="number" v-model.trim="code" maxlength="6" >
                                </div>
                            </div>

                            <div class="form-group clearfix">
                                <span class="col-sm-3"></span>
                                <div class="col-sm-6" >
                                    <a class="btn btn-lg ez-btn-parmary ez-mr-md" style="border-radius: 4px" @click.stop="bindEmail">绑定</a>
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
</template>
<script>
import {
    myInfor,
    getCountryCity,
    sendSms,
    checkEmail,
    updateMy,
    imgUpload,
     } from 'getData'
export default {
    name: "myCompany",
    data() {
        return {
            member:{},  //会员信息
            countryList:[],  //国家
            cityList:[],  //城市
            code:"", //验证码
        }
    },
    created () {
        this.getMember();
    },
    methods: {
        imgClick:function(){
            $("#companyLogo").click();
        },
        //国家改变
        countryChange:function(){
            this.member.cityid = "";
            this.countryPd();
        },
        countryPd:function(){
            for(let k in this.countryList){
                if(this.countryList[k].countryid == this.member.countryid) 
                this.cityList = this.countryList[k].cityList;
            }
        },
        //获取会员信息
        async getMember() {
            let data = await myInfor()
             if(data) {
                this.member = data;
                this.getCountryCity();
            }
        },
        //根据语言获取国家城市
        async getCountryCity() {
            let data = await getCountryCity()
            if(data) {
                this.countryList = data;
                this.countryPd();
            }
        },
        //上传图片
        async imgChange(id) {
            //更新图片数据
            Vue.set(this.member, id,  await imgUpload());
        },
        //获取验证码
        async getSendSms(){
            if(this.isEmpty (this.member.email)){
                this.infoMsg("请输入邮箱");
                return;
            }
            let data = await sendSms({
                category:2,
                sendType:2,
                source:3,
                email:this.member.email,
            })
             if(data) {
                this.successMsg("验证码发送成功，请注意查收");
            }
        },
        //绑定邮箱
        async bindEmail(){
            if(this.isEmpty (this.member.email)){
                this.infoMsg("请输入邮箱");
                return;
            }
            if(this.isEmpty (this.code)){
                this.infoMsg("请输入验证码");
                return;
            }
            if(await checkEmail({
                code:this.code,
                email:this.member.email,
            }) ) {
                this.successMsg("邮箱绑定成功");
                $("#emailBind").modal('hide');
            }
        },
        //更新个人信息
        async updateMember(){
            if(this.isEmpty (this.member.photo)){
                this.infoMsg("请上传用户头像");  return;
            }
            if(this.isEmpty (this.member.phone)){
                this.infoMsg("请输入手机号");  return;
            }
            if(this.isEmpty (this.member.countryid)){
                this.infoMsg("请选择国家");  return;
            }
            if(this.isEmpty (this.member.cityid)){
                this.infoMsg("请选择城市");  return;
            }
            if(this.isEmpty (this.member.address)){
                this.infoMsg("请输入详细地址");  return;
            }
            if(this.isEmpty (this.member.legalPerson)){
                this.infoMsg("请输入法人代表");  return;
            }
            if(this.isEmpty (this.member.companyName)){
                this.infoMsg("请输入企业名称"); return;
            }
            if(this.isEmpty (this.member.companyLogo)){
                this.infoMsg("请上传企业LOGO");  return;
            }
            if(this.isEmpty (this.member.companyImg)){
                this.infoMsg("请选择企业执照");  return;
            }
            if(this.isEmpty (this.member.cardsImg)){
                this.infoMsg("请上传法人身份证"); return;
            }

            if(await updateMy(this.member)){
                  this.successMsg("修改公司信息成功");
            }
        },
    },
}
</script>
