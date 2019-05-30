<template>
    <div>
        <ezHeader></ezHeader>
        <ezContainer></ezContainer>

        <!--content-->
        <div class="content ez-travel-order main_content">
            <div class="content-order">
                <div class="content-order-icon">
                    <div style="border: 1px solid #f99905;"><i style="color:#f99905;" class="iconfont icon-dagou"></i><label>确认订单</label></div>
                    <div><i class="iconfont icon-dagou"></i><label>确认付款</label></div>
                    <div><i class="iconfont icon-dagou"></i><label>完成订单</label></div>
                    <p></p>
                </div>

                <div class="content-order-details">
                    <div class="content-order-details-left">
                        <h3>订单详情</h3>

                        <div class="content-order-details-contact-info">
                            <h4>联系信息</h4>
                            <div class="form-inline">
                                <p>联系人</p>
                                <input type="text" class="form-control min-text" placeholder="联系人" v-model.trim="contactsName"
                                    maxlength="50">
                            </div>
                            <div class="form-inline">
                                <p>联系电话</p>
                                <input type="text" class="form-control min-text" placeholder="联系电话" v-model.trim="contactsMobile"
                                    maxlength="20">
                            </div>
                            <div class="">
                                <p>备注信息</p>
                                <input type="text" class="form-control" v-model.trim="remark" placeholder="备注信息"
                                    maxlength="50">
                            </div>
                        </div>

                        <div class="content-order-details-travel-info">
                            <h4>出行信息</h4>
                            <div>
                                <p>目的地</p>
                                <input type="text" class="form-control min-text" :value="route.endCityContent" readonly="readonly"
                                    style="background-color: #fff;">
                            </div>
                            <div>
                                <p>时间</p>
                                <input type="text" class="form-control min-text" :value="beginDate" readonly="readonly"
                                    style="background-color: #fff;">
                            </div>
                            <div>
                                <p>人数</p>
                                <input type="text" class="form-control min-text" :value="playNum" readonly="readonly"
                                    style="background-color: #fff;">
                            </div>
                        </div>

                        <div class="content-order-details-insurance ">
                            <h4>常规路线</h4>
                            <div class="ez-mb-md">
                                <div>{{route.title}}</div>
                                <div class="text-lightorange">{{route.subtitle}}</div>
                                <div>{{route.infor}}</div>
                            </div>
                            <ul class="list-unstyled">
                                <dd v-if="oneNum >0">单人一房：{{oneNum}}</dd>
                                <dd v-if="twoNum > 0">双人一房：{{twoNum}}</dd>
                                <dd v-if="threeNum > 0">三人一房：{{threeNum}}</dd>
                                <dd v-if="fourNum > 0">四人一房：{{fourNum}}</dd>
                                <dd v-if="arrangeNum > 0">配房：{{arrangeNum}}</dd>
                            </ul>
                        </div>


                        <div class="content-order-details-insurance">
                            <h4>保险方案</h4>
                            <div>
                                <!-- <p>意外险</p> -->
                                <!-- <div v-for="(list, index) in insuranceList" :key="index">
                                  
                                        <input type="radio" :value="list.id" v-model="insuranceid" name="insurance">{{list.name}}
                                      <el-tooltip class="item" effect="dark" placement="bottom">
                                        <div slot="content" class="priceInfor" >{{list.content}}</div>
                                            <a>（保险说明）</a>
                                      </el-tooltip>
                                             <span>{{currencySign}}{{list.price}}/人</span>
                                   
                                </div> -->
                                    <template>
                                        <el-radio-group v-model="insuranceid">
                                        <el-radio :label="list.id" v-for="(list, index) in insuranceList" :key="index">
                                            {{list.name}}
                                            <el-tooltip class="item" effect="dark" placement="bottom">
                                                <div slot="content" class="priceInfor" >{{list.content}}</div>
                                                    <a>（保险说明）</a>
                                            </el-tooltip>
                                            <span>{{currencySign}}{{list.price}}/人</span>
                                        </el-radio>
                                        </el-radio-group>
                                  </template>
                            </div>
                        </div>

                        <h4>出游人信息</h4>
                        <div class="content-order-details-visitors-info" v-for="(list, index) in orderMember" :key="index">
                            <div>
                                <span><label>*</label>中文姓名</span>
                                <input type="text" class="form-control min-text" maxlength="30" v-model.trim="list.chineseName"
                                    placeholder="需要与证件一致" />
                                <button type="button" class="btn btn-default" style="margin-left:20px;" data-toggle="modal"
                                    data-target="#contactModal" @click="addOrderMember(index)">选择常用联系人</button>
                                <button type="button" class="btn btn-default" style="margin-left:20px;" @click.stop="emptyOrderMemberByIndex(index)">清空</button>
                            </div>
                            <div>
                                <span><label>*</label>英文姓名</span>
                                <input type="text" class="form-control min-text" placeholder="姓（拼音或英文）" maxlength="20"
                                    v-model.trim="list.key" />
                                <input type="text" class="form-control min-text" placeholder="名（拼音或英文）" maxlength="20"
                                    v-model.trim="list.value" />
                            </div>
                            <div>
                                <span><label>*</label>证件类型</span>
                                <select class="form-control min-text" v-model.trim="list.certType">
                                    <option :value="item.id" v-for="(item, index) in certTypeSelectList" :key="index">{{item.name}}</option>
                                </select>
                                <input type="tetx" class="form-control min-text" placeholder="证件号码" maxlength="25"
                                    v-model.trim="list.certNo" />
                            </div>
                            <div>
                                <span><label>*</label>证件有效期</span>
                                <input type="date" class="form-control max-text" placeholder="YYYY-MM-DD" maxlength="20"
                                    v-model.trim="list.certValidDate" />
                            </div>
                            <div>
                                <span><label>*</label>出生年月</span>
                                <input type="date" class="form-control max-text" placeholder="YYYY-MM-DD" maxlength="20"
                                    v-model.trim="list.birthday" />
                            </div>
                            <div>
                                <span><label>*</label>手机号码</span>
                                <select class="form-control min-text" v-model.trim="list.area">
                                    <option :value="item.id" v-for="(item, index) in areaSelectList" :key="index">{{item.name}}</option>
                                </select>
                                <input type="number" class="form-control min-text" placeholder="出游人手机号" maxlength="20"
                                    v-model.trim="list.mobile" />
                            </div>
                            <div v-if="list.typeShow">
                                <span><label></label></span>
                                <input type="checkbox" v-model="list.type" /> 保存到常用联系人
                            </div>
                            <hr style=" height:2px;border:none;border-top:2px dotted #C0C0C0;" v-if="index<(orderMember.length-1)" />
                        </div>



                    </div>

                    <div class="content-order-details-right">
                        <h3>订单价格</h3>

                        <div>
                            <h4>行程</h4>
                            <p><label>{{beginDate}} - {{beginDate | endDayVC(route.dayNum)}}（共{{route.dayNum}}天）</label></p>
                            <p><label>{{route.title}}</label></p>
                            <p><label>路线价格</label> <span> {{(childNum + adultNum) * + route.price}}</span></p>
                            <p v-if="oneNum >0"><label>单人一房</label> <span>{{currencySign}}{{oneCost}}*{{oneNum}}</span></p>
                            <p v-if="twoNum >0"><label>双人一房：</label> <span>{{currencySign}}{{twoCost}}*{{twoNum}}</span></p>
                            <p v-if="threeNum >0"><label>三人一房：</label> <span>{{currencySign}}{{threeCost}}*{{threeNum}}</span></p>
                            <p v-if="fourNum >0"><label>四人一房：</label> <span>{{currencySign}}{{fourCost}}*{{fourNum}}</span></p>
                            <p v-if="arrangeNum >0"><label>配房：</label> <span>{{currencySign}}{{arrangeCost}}*{{arrangeNum}}</span></p>
                        </div>

                        <div>
                            <h4>人数</h4>
                            <p><label>人数</label> <span>{{playNum}}</span></p>
                        </div>
                        <div v-if="insurance">
                            <h4>保险</h4>
                            <p><label>{{insurance.name}}</label> <span>{{currencySign}}{{insurance.price}}*{{adultNum+childNum}}</span></p>
                        </div>
                        <p class="content-order-details-total">总计 <b>{{currencySign}}{{orderPrice}}</b></p>
                        <a class="content-order-details-confirm-order" @click.stop="sureorder">确认订单</a>
                    </div>


                </div>
            </div>

            <!-- 选择常用联系人（Modal） -->
            <div class="modal fade contactModal ez-modal" id="contactModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
                aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <!--<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>-->
                            <button type="button" class="modal-close" data-dismiss="modal" aria-hidden="true"><i class="iconfont icon-close"></i></button>
                            <h4 class="modal-title text-bold">选择常用联系人</h4>
                        </div>
                        <div class="modal-body">
                            <table class="table table-bordered">
                                <thead>
                                    <tr>
                                        <th> {{memberContactsIndex}}</th>
                                        <th>中文名</th>
                                        <th>英文名</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(list, index) in memberContactsList" :key="index">
                                        <td><input type="radio" v-model="memberContactsIndex" name=" memberContacts"
                                                :value="index"></td>
                                        <td>{{list.chineseName}}</td>
                                        <td>{{list.englishName}}</td>
                                    </tr>
                                </tbody>

                            </table>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                            <button type="button" class="btn btn-primary" @click="addMemberContact">确定</button>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 选择常用联系人（Modal）  -->

        </div>

        <ezWebsite></ezWebsite>
    </div>
</template>
<script>
import ezHeader from "components/home/ezHeader"
import ezContainer from "components/home/ezContainer"
import ezWebsite from "components/home/ezWebsite"
import {getMemberContact, getInsurance, saveRouteOrder } from "getData"
import { mapState, mapMutations, mapGetters } from "vuex";
import { nowDate } from 'utils/common'

export default {
    name: "ruleSure",
    data() {
        return {
            contactsName: "",  //联系人姓名
            contactsMobile: "",  //联系人电话
            remark: "",  //备注
            orderMember: [],  //出游人集合
            insuranceList: [],  //保险集合
            insuranceid: "",  //选择的保险ID
            memberContactsList: [],  //常用联系人
            orderMemberIndex: "",  //点击添加联系人的下标
            memberContactsIndex: "", //选择的常用联系人的下标
        }
    },
    computed: {
        ...mapState([ "currencySign", "loginType"]),
        ...mapState({
            routeid: state => state.rule.routeid,
            route: state => state.rule.route,
            insurance : state => state.rule.insurance,
            calendarDate: state => state.rule.calendarDate,
            oneCost: state => state.rule.oneCost,
            twoCost: state => state.rule.twoCost,
            threeCost: state => state.rule.threeCost,
            fourCost: state => state.rule.fourCost,
            arrangeCost: state => state.rule.arrangeCost,
            adultNum: state => state.rule.adultNum,
            childNum: state => state.rule.childNum,
            oneNum: state => state.rule.oneNum,
            twoNum: state => state.rule.twoNum,
            threeNum: state => state.rule.threeNum,
            fourNum: state => state.rule.fourNum,
            arrangeNum: state => state.rule.arrangeNum,
         }),
         ...mapGetters("rule",["beginDate", "orderPrice"]),
          //出游人数
        playNum() {
            let content = [];
            if (this.adultNum > 0) {
                content.push(`${this.adultNum}成人 `);
            }
            if (this.childNum > 0) {
                content.push(`${this.childNum}儿童 `);
            }
            return content.toString();
        },
    },
    components: {
        ezHeader,
        ezContainer,
        ezWebsite,
    },
    watch: {
        //计算保险价格
        insuranceid: function () {
            for (const list of Object.values(this.insuranceList)) {
                if (list.id == this.insuranceid) {
                    this.InsuranceSet(list);
                }
            }
        },
    },
    created: function () {
        this.getInsurancData();
        this.orderMemberInit();
        this.getMemberContact();
    },
    methods: {
        ...mapMutations("rule",["InsuranceSet", "orderidSet"]),
        //确定订单
        async sureorder() {
            if(this.loginType == 1){
                this.loginFlagChange(1);
                return;
            }
            if (!this.contactsName || !this.contactsMobile) {
                 this.infoMsg('请完善联系人信息'); return;
            }
            for (const list of Object.values(this.orderMember)) {
                for (const [key, value] of Object.entries(list)) {
                     if (this.isEmpty (value)) {
                         this.infoMsg('请完善出游人信息'); return;
                    }
                }
            }
            let orderMember = this.orderMember;
            for (const list of Object.values(orderMember)) {
                Vue.set(list, "englishName", `${list.key}/${list.value}`);
            }
            let data = await saveRouteOrder({
                routeid: this.routeid,
                contactsName: this.contactsName,
                contactsMobile: this.contactsMobile,
                remark: this.remark,
                startDate: this.beginDate,
                adultNum: this.adultNum,
                childNum: this.childNum,
                oneNum: this.oneNum,
                twoNum: this.twoNum,
                threeNum: this.threeNum,
                fourNum: this.fourNum,
                arrangeNum: this.arrangeNum,
                insuranceid: this.insuranceid,
                orderMember: JSON.stringify(this.orderMember),
            },"post")
            if(data){
                this.orderidSet(data);
                this.$router.push("rulePay")
            }
        },
        //确定添加联系人
        addMemberContact: function () {
            if (this.memberContactsIndex === "") return;
            let map = {};
            Vue.set(map, "chineseName", this.memberContactsList[this.memberContactsIndex].chineseName);
            //     Vue.set(map,"englishName","");
            Vue.set(map, "key", this.memberContactsList[this.memberContactsIndex].englishName.split("/")[0]);
            Vue.set(map, "value", this.memberContactsList[this.memberContactsIndex].englishName.split("/")[1]);
            Vue.set(map, "certType", this.certTypeSelectList[0].id);
            Vue.set(map, "certNo", this.memberContactsList[this.memberContactsIndex].certNo);
            Vue.set(map, "certValidDate", this.memberContactsList[this.memberContactsIndex].certValidDate);
            Vue.set(map, "birthday", this.memberContactsList[this.memberContactsIndex].birthday);
            Vue.set(map, "area", this.areaSelectList[0].id);
            Vue.set(map, "mobile", this.memberContactsList[this.memberContactsIndex].mobile);
            Vue.set(map, "type", false);
            Vue.set(map, "typeShow", false);
            Vue.set(this.orderMember, this.orderMemberIndex, map);
            $('#contactModal').modal('hide');
            this.memberContactsIndex = "";
            this.orderMemberIndex = "";
        },
        //点击添加联系人
        addOrderMember: function (index) {
            this.orderMemberIndex = index;
        },
        //获取常用联系人
        async getMemberContact() {
            let data = await getMemberContact({pageNo: 1}) 
            if(data){
                this.memberContactsList = data.memberContactsList;
            }
        },
        //添加清空数据
        emptyOrderMemberByIndex: function (index) {
            let map = {};
            Vue.set(map, "chineseName", "");
            //     Vue.set(map,"englishName","");
            Vue.set(map, "key", "");
            Vue.set(map, "value", "");
            Vue.set(map, "certType", this.certTypeSelectList[0].id);
            Vue.set(map, "certNo", "");
            Vue.set(map, "certValidDate", "");
            Vue.set(map, "birthday", "");
            Vue.set(map, "area", this.areaSelectList[0].id);
            Vue.set(map, "mobile", "");
            Vue.set(map, "type", false);
            Vue.set(map, "typeShow", true);
            Vue.set(this.orderMember, index, map);
        },
        //出游人集合初始化
        orderMemberInit: function () {
            console.log(1111)
            this.orderMember = [];
            let num = this.adultNum + this.childNum;
            if (!num) return;
            for (let k = 0; k < num; k++) {
                this.emptyOrderMemberByIndex(k);
            }
        },
        //保险说明
        insurancContent: function (index) {
            layer.open({
                type: 1,
                closeBtn: 0, //不显示关闭按钮
                anim: 2,
                shadeClose: true, //开启遮罩关闭
                content: this.insuranceList[index].content
            });
        },
        //获取保险数据
        async getInsurancData() {
            let data = await getInsurance({
                  productType: 4,
            })
            if(data){
                this.insuranceList = data;
            }
        },
    }
}
</script>


