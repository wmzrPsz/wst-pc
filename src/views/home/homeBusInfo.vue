<template>
    <div>
        
    <ez-header></ez-header>

        <div class=" width  overflow">



            <div class="fu  duancheng_c  pa_qq overflow ">
                <div class="overflow ma25 bo_3">
                    <div class=" overflow ma25">
                        <div class="ma31">创建商业账号</div>
                        <div class="content ez-travel-payment">
                            <div class="content-order">
                                <div class="content-order-icon">
                                    <div style="border: 1px solid #f99905;"><i style="color:#f99905;"
                                            class="iconfont icon-dagou"></i><label>确认订单</label></div>
                                    <div style="border: 1px solid #f99905;"><i style="color:#f99905;"
                                            class="iconfont icon-dagou"></i><label>确认付款</label></div>
                                    <div><i class="iconfont icon-dagou"></i><label>完成订单</label></div>
                                    <p></p>
                                </div>
                            </div>
                        </div>
                        <div class="lx_zhan">
                            <ul class="a_zhan">
                                <li>类型</li>
                                <li class="input_zhan"><input type="radio" value="1" name="sex" v-model="companyType">个人
                                </li>
                                <li class="input_zhan"><input type="radio" value="2" name="sex" v-model="companyType">公司
                                </li>
                            </ul>
                            <input type="file"  @change="imgChange" id="img"  accept="image/*" v-show>
                            <div v-if="companyType == 1">
                                <ul class="b_zhan">
                                    <li><i>昵称</i><input type="text" value="" placeholder="请输入昵称"  v-model.trim="nickName"/></li>
                                </ul>
                                <ul class="b_zhan ma1">
                                    <li><i>真实姓名</i><input type="text" value="" placeholder="请输入真实姓名" v-model.trim="realName" /></li>
                                </ul>
                                <div class="fu4 lis ma25 qingchu overflow">
                                    <ul>
                                        <li class="zs_bb">个人头像</li>
                                        <li class="ma22 bo_3"><img :src="photo ||uploadImg" class="uploadImg" @click="imgClick('photo')"/></li>

                                        <!-- <li class="ma22  zs_bb"> <button class="button_zhan jia_chuan">上传图片</button> -->
                                        </li>
                                    </ul>
                                </div>
                                <div class="fu4 lis ma25 overflow">
                                    <ul>
                                        <li class="zs_bb">身份证件</li>
                                        <li class="ma22 bo_3"><img :src="cardsImg1[0] ||uploadImg" class="uploadImg" @click="imgClick('cardsImg1',0)"/></li>
                                        <li class="ma22 bo_3"><img :src="cardsImg1[1] ||uploadImg" class="uploadImg" @click="imgClick('cardsImg1',1)"/></li>
                                        <!-- <li class="ma22  zs_bb"> <button class="button_zhan jia_chuan">上传图片</button> -->
                                        </li>
                                    </ul>
                                </div>
                                <div class="bu_zhan qingchu ma25">
                                    <li class="fu"> 个人简介</li>
                                    <textarea class="bu_a_zhan ma22" placeholder="输入呢容" v-model.trim="content"></textarea>
                                </div>
                            </div>
                            <div v-if="companyType == 2">
                                <ul class="b_zhan">
                                    <li><i>企业名称</i><input type="text" value="" placeholder="请输入企业名称" v-model.trim="companyName"/></li>
                                </ul>
                                <ul class="b_zhan ma1">
                                    <li><i>法人代表</i><input type="text" value="" placeholder="请输入法人代表" v-model.trim="legalPerson"/></li>
                                </ul>


                                <div class="fu4 lis ma25 qingchu overflow">
                                    <ul>
                                        <li class="zs_bb">企业logo</li>
                                        <li class="ma22 bo_3"><img :src="companyLogo ||uploadImg" class="uploadImg" @click="imgClick('companyLogo')" /></li>

                                        <!-- <li class="ma22  zs_bb"> <button class="button_zhan jia_chuan">上传图片</button> -->
                                        </li>
                                    </ul>
                                </div>
                                <div class="fu4 lis ma25 qingchu overflow">
                                    <ul>
                                        <li class="zs_bb">营业执照</li>
                                        <li class="ma22 bo_3"><img :src="companyImg ||uploadImg" class="uploadImg" @click="imgClick('companyImg')" /></li>

                                        <!-- <li class="ma22  zs_bb"> <button class="button_zhan jia_chuan">上传图片</button> -->
                                        </li>
                                    </ul>
                                </div>
                                <div class="fu4 lis ma25 qingchu overflow">
                                    <ul>
                                        <li class="zs_bb">法人身份证</li>
                                        <li class="ma22 bo_3"><img :src="cardsImg2 ||uploadImg" class="uploadImg" @click="imgClick('cardsImg2')" /></li>

                                        <!-- <li class="ma22  zs_bb"> <button class="button_zhan jia_chuan">上传图片</button> -->
                                        </li>
                                    </ul>
                                </div>
                                <div class="bu_zhan qingchu ma25">
                                    <li class="fu"> 企业简介</li>
                                    <textarea class="bu_a_zhan ma22" placeholder="输入呢容" v-model.trim="content"></textarea>
                                </div>
                            </div>

                            <div class="shang_zhan overflow ">
                                <p class="s_c_zhan ma1 qingchu ma28">
                                    若贵方无法提供发票，请勾选“个人”，则携程将按照相关法律在支付佣金时代为交纳相应税款；若贵方能提供发票，请勾选“公司”，则我们不为代扣税。
                                    扣税相关内容详见：http://u.ctrip.com/Union/H
                                    elp/htm/commission.htm 提供发票的收款人帐号和收款人信息必须关联，若发现收款人信息不符，不予打款。</p>
                                <div class="overflow qingchu" style="margin-bottom:2rem;">
                                    <button class="s_a_zhan button bo_26_lans" onclick="window.history.go(-1)">上一步</button>
                                    <button class="s_b_zhan button bo_26_lans" @click="BusinessRegisterClick">下一步</button>
                                </div>
                            </div>

                        </div>


                    </div>

                </div>

            </div>

            <!--右边*************************************************************************-->
            <DIV class="a33_3 fu1">

                <div class="a5_1_l overflow  ma25">
                    <img src="~images/bg-guide.png">
                </div>

                <div class="a5_1_l overflow  ma25">
                    <img src="~images/bg-guide.png">
                </div>
            </DIV>


        </div>



        <!--最**********************************************************************底部-->
        <div class="width min zuidibu ">
            <p class="right_aaa ccc zi_d ma5">Copyringht@2018-2028|万事通Lulutrip|All Reserved</p>
            <p class="right_aaa ccc zi_d">美国万事通有限公司|粤ICP13803118号-11</p>
        </div>
    
    <ezWebsite></ezWebsite>

    </div>
</template>
<script>
import ezHeader from "components/home/ezHeader"
import ezWebsite from "components/home/ezWebsite"
import {  businessRegister, imgUpload } from 'getData'
import {  mapMutations, mapState } from "vuex"
import md5 from 'js-md5';
export default {
    name: "homeBusInfo",
    data() {
        return {
            uploadImg: "http://pic.ylintel.com/user/2019/05/16/02ba34b6ddcc4e8c9c7032eec7d01983jpeg",
            companyType: 1, //个人  2公司
            content: "", //简介

            cardsImg1: [], //身份证照片
            nickName: "", //昵称
            realName: "", //真实姓名
            photo: "",  //个人头像

            cardsImg2: "", //身份证照片
            companyName: "", //公司名称
            legalPerson: "",  //法人代表
            companyLogo: "", //公司Logo
            companyImg: "", //公司营业执照

            imgid:"",  //选择的imgid
            imgIndex: 1, //选择的下标
        }
    },
    computed: {
        ...mapState("home",["registerType","accountNumbe","password","passwordCheck","smsCode"]),
    },
    components: {
        ezHeader,
        ezWebsite,
    },
    methods: {
        //商家注册
        async BusinessRegisterClick() {
            if(this.companyType == 1){
                if(this.isNull(this.nickName)){
                    this.infoMsg("请输入昵称");
                    return;
                }
                if(this.isNull(this.realName)){
                    this.infoMsg("请输入真实姓名");
                    return;
                }
                if(this.cardsImg1.length != 2){
                    this.infoMsg("请上传身份证件照片");
                    return;
                }
                if(this.isNull(this.photo)){
                    this.infoMsg("请上传个人头像");
                    return;
                }
                
            }
            if(this.companyType == 2){
                if(this.isNull(this.companyName)){
                    this.infoMsg("请输入公司名称");
                    return;
                }
                if(this.isNull(this.legalPerson)){
                    this.infoMsg("请输入法人代表");
                    return;
                }
                if(this.isNull(this.companyLogo)){
                    this.infoMsg("请上传企业logo");
                    return;
                }
                if(this.isNull(this.companyImg)){
                    this.infoMsg("请上传公司营业执照");
                    return;
                }
                if(this.isNull(this.cardsImg2)){
                    this.infoMsg("请上传法人身份证");
                    return;
                }
            }
            if(this.isNull(this.content)){
                    this.infoMsg("请输入简介");
                    return;
            }
            let data = await businessRegister({
                accountNumbe: this.accountNumbe,
                password: md5(this.password),
                passwordCheck: this.passwordCheck,
                smsCode: this.smsCode,
                registerType: this.registerType,
                source: 3,  //1安卓 2苹果 3 网页
                companyType: this.companyType,
                cardsImg: this.companyType == 1?this.cardsImg1.toString():this.cardsImg2,
                content: this.content,

                nickName: this.nickName,
                realName: this.realName,
                photo: this.photo,

                companyName: this.companyName,
                legalPerson: this.legalPerson,
                companyLogo: this.companyLogo,
                companyImg: this.companyImg,
            },"post")
            if(data) {
               this.$router.push("homeBusSuccess");
            }
        },
        //点击图片
        imgClick(id,index){
            this.imgid = id;
            this.imgIndex = index;
            $("#img").click();
        },
        //上传图片
        async imgChange() {
            let imgid = this.imgid;
            console.log(imgid)
            let this_ = this;
            let url = await imgUpload();
            console.log(url)
            if(imgid == "cardsImg1"){
                Vue.set(this_[imgid],this.imgIndex, url);
            }else{
                this_[imgid] = url;
            }
        },
    },
}
</script>
<style lang="less" scoped>
 .uploadImg{
     width: 100px;
     height: 100px;
 }
</style>

