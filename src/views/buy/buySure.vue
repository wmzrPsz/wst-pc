<template>
    <div>

        <ez-header></ez-header>
        <ez-container></ez-container>

        <!--content-->
        <div class="content ez-travel-order main_content">
            <div class="content-order">
                 <orderIcon :orderIconType="1"></orderIcon>
                 <div class="content-order-details">
                     <div class="content-order-details-left">

                        <h3>订单详情</h3>

                        <orderAddress></orderAddress>

                        <div v-for="(buy, index) in buyList" :key="index">
                            <orderCity :cityName="buy.cityName" :startDate="buy.beginDate" :playNum="`${buy.adultNum}成人${buy.childNum}儿童`"  ></orderCity>
                            <!-- 常规路线、当地参团 -->
                            <div v-if="buy.type == 1 || buy.type == 2">
                                <div class="content-order-details-insurance ">
                                    <h4>{{buy.type | buyTypeVc}}</h4>
                                    <div class="ez-mb-md">
                                        <div>{{buy.route.title}}</div>
                                        <div class="text-lightorange">{{buy.route.subtitle}}</div>
                                        <div>{{buy.route.infor}}</div>
                                    </div>
                                    <ul class="list-unstyled">
                                        <dd v-if="buy.oneNum >0">单人一房：{{buy.oneNum}}</dd>
                                        <dd v-if="buy.twoNum > 0">双人一房：{{buy.twoNum}}</dd>
                                        <dd v-if="buy.threeNum > 0">三人一房：{{buy.threeNum}}</dd>
                                        <dd v-if="buy.fourNum > 0">四人一房：{{buy.fourNum}}</dd>
                                        <dd v-if="buy.arrangeNum > 0">配房：{{buy.arrangeNum}}</dd>
                                    </ul>
                                </div>
                            </div>
                         
                            <!-- 当地玩家、导游路线 -->
                            <div v-if="buy.type == 3">
                                <div class="content-order-details-tourguide">
                                    <h4>导游信息</h4>
                                    <dl class="dl-horizontal">
                                        <dt>{{buy.guide.realName}}</dt>
                                        <dd><span>性别：{{buy.guide.sex | sexVc}}</span><span>年龄：{{buy.guide.age}}</span></dd>
                                        <dd>{{buy.guide.introduction}}</dd>
                                    </dl>
                                </div>
                            </div>

                            <!-- 导游路线 -->
                            <div v-if="buy.type == 6">
                                <div class="content-order-details-tourguide">
                                    <h4>导游信息</h4>
                                    <dl class="dl-horizontal">
                                        <dt>{{buy.guideRoute.realName}}</dt>
                                        <dd><span>性别：{{buy.guideRoute.sex | sexVc}}</span><span>年龄：{{buy.guideRoute.age}}</span></dd>
                                        <dd>{{buy.guideRoute.introduction}}</dd>
                                    </dl>
                                </div>
                                <div class="content-order-details-insurance" v-if="buy.type == 6">
                                    <h4>导游路线</h4>
                                    <div>
                                        <div class="text-sixteen">{{buy.guideRoute.title}}</div>
                                        <div>{{buy.guideRoute.content}}</div>
                                    </div>
                                </div>
                            </div>

                            <!-- 景点门票 -->
                            <div v-if="buy.type == 5">
                                <div class="content-order-details-insurance ">
                                    <h4>景点</h4>
                                    <div class="ez-mb-md">
                                        <div>{{buy.scenicSpotTicket.sceniceName}}</div>
                                        <div>地址：{{buy.scenicSpotTicket.address}}</div>
                                        <div>详情：{{buy.scenicSpotTicket.content}}</div>
                                    </div>
                                </div>

                                <div class="content-order-details-insurance ">
                                    <h4>门票</h4>
                                    <div class="ez-mb-md">
                                        <div>{{buy.scenicSpotTicket.name}}</div>
                                        <div>数量：{{buy.adultNum + buy.childNum}}</div>
                                    </div>
                                </div>
                            </div>

                            <!-- 邮轮 -->
                            <div v-if="buy.type == 4">
                                <div class="hhhhh pa_c  zs_b qingchu ma25">
                                    <h4>轮游信息</h4>
                                </div>
                                <div class=" qingchu daoche_wan zhong_a bo_3 overflow ">
                                    <ul class="fu4 lis_a ringt_aaaa beijihenh overflow hhhhh">
                                        <li class="right_1_a " style="width:30%">房型</li>
                                        <li class="tu_c right_1_a"  style="width:10%">单价</li>
                                        <li class=" right_1_a tu_c"  style="width:20%">人数</li>
                                        <li class=" right_1_a tu_c"  style="width:20%">房间数</li>
                                        <li class=" right_1_a tu_c"  style="width:20%">价格</li>
                                    </ul>
                                    <div class=" bo_25 overflow ma1 pa_qq" v-for="(list, index1) in buy.linerLine.linerRoomList" :key="index1">
                                        <div class="unyou_aa fu mei_a" >
                                            <div class="unyou_ba fu mei_a"><img :src="list.imgUrl"></div>
                                            <div class="fu">
                                                <ul class="lis_a ma47">
                                                    <li class="  zi_e hhhhh ">{{list.name}}</li>
                                                    <li class="zi_i  zi_e hius">{{list.spec}}</li>
                                                    <li class="zi_i  zi_e hius" v-if="list.checkInType == 1">可入住{{list.minPeopleNumber}}-{{list.maxPeopleNumber}}人</li>
                                                    <li class="zi_i  zi_e hius" v-if="list.checkInType == 2">必须入住{{list.peopleNumber}}人</li>
                                                    <li class="zi_i  zi_e hius">{{list.floor}}层</li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div class="tu_c fu">
                                            <p class="right_aaa sen_s zi_g ma38">{{currencySign}}{{list.price}} <samp class="hhhhh zi_e">起/人</samp></p>
                                        </div>
                                        <div class=" fu tu_c">
                                            <p class="right_aaa hhhhh zi_e">成人</p>
                                                <el-input-number 
                                                v-model.number="list.adultNum" 
                                                @change="orderMemberChange(index)" 
                                                step-strictly size="small" :min="1" :max="100" label="成人"/>
                                            <p class="right_aaa hhhhh ma1 zi_e">儿童</p>
                                            <el-input-number 
                                            v-model.number="list.childNum" 
                                            @change="orderMemberChange(index)" 
                                            step-strictly size="small" :min="0" :max="100" label="儿童"/>
                                        </div>

                                        <div class="tu_c fu right_aaa">
                                            <el-input-number 
                                            v-model.number="list.roomNum" style="margin-top:35px"
                                            step-strictly size="small" :min="1" :max="100" label="房间数量"/>
                                        </div>
                                        <div class="tu_c fu">
                                            <p class="right_aaa sen_s zi_g ma38">{{currencySign}}{{list.price *
                                                (list.adultNum+list.childNum) * list.roomNum}} </p>
                                            <p class="hhhhh zi_d right_aaa ">人均{{currencySign}}{{list.price}}元</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- 保险信息 -->
                            <div class="content-order-details-insurance">
                                <h4>保险方案</h4>
                                <div>
                                    <template>
                                        <el-radio-group v-model="buy.insuranceid" @change="insuranceChange(index)">
                                        <el-radio :label="list.id" v-for="(list, index) in buy.insuranceList" :key="index">
                                            {{list.name}}
                                            <el-tooltip class="item" effect="dark" placement="bottom">
                                                <div slot="content" class="priceInfor" v-html="list.content"></div>
                                                    <a>（保险说明）</a>
                                            </el-tooltip>
                                            <span>{{currencySign}}{{list.price}}/人</span>
                                        </el-radio>
                                        </el-radio-group>
                                    </template>
                                </div>
                            </div>

                            <h4>出游人信息</h4>
                            <div class="content-order-details-visitors-info" v-for="(list, index1) in buy.orderMember" :key="index1">
                                <div class="chineseName">
                                    <span><label>*</label>中文姓名</span>
                                    <el-input 
                                    v-model="list.chineseName" 
                                    clearable
                                    placeholder="请输入中文姓名(需要与证件一致)"  
                                    >
                                    </el-input>
                                    <el-button type="primary" data-toggle="modal" class="left-15"
                                        data-target="#contactModal" @click="addOrderMember(index, index1)">选择常用联系人</el-button>
                                    <el-button type="info"  @click.stop="emptyOrderMemberByIndex(index,index1)">清空</el-button>
                                </div>
                                <div>
                                    <span><label>*</label>英文姓名</span>
                                    <el-input 
                                    v-model.trim="list.key" 
                                    clearable
                                    placeholder="姓(拼音或英文)">
                                    </el-input>
                                    <el-input 
                                    class="left-10"
                                    v-model.trim="list.value" 
                                    clearable
                                    placeholder="名(拼音或英文)">
                                    </el-input>

                                </div>
                                <div>
                                    <span><label>*</label>证件类型</span>

                                    <el-select v-model="list.certType" placeholder="请选择证件类型">
                                        <el-option
                                        v-for="item in certTypeSelectList"
                                        :key="item.id"
                                        :label="item.name"
                                        :value="item.id">
                                        </el-option>
                                    </el-select>
                                    <el-input 
                                    v-model="list.certNo" 
                                    clearable
                                    placeholder="请输入证件号码">
                                    </el-input>

                                </div>
                                <div>
                                    <span><label>*</label>证件有效期</span>
                                    <el-date-picker
                                    v-model="list.certValidDate"
                                    type="date"
                                    placeholder="选择证件有效期"
                                    value-format = "yyyy-MM-dd"
                                    :picker-options="certValidDateOptions"
                                    >
                                    </el-date-picker>
                                </div>
                                <div>
                                    <span><label>*</label>出生年月</span>
                                    <el-date-picker
                                    v-model="list.birthday"
                                    type="date"
                                    placeholder="选择出生年月"
                                    value-format = "yyyy-MM-dd"
                                    :picker-options="birthdayOptions"
                                    >
                                    </el-date-picker>
                                </div>
                                <div>
                                    <span><label>*</label>手机号码</span>
                                    <el-select v-model="list.area" placeholder="请选择证件类型">
                                        <el-option
                                        v-for="item in areaSelectList"
                                        :key="item.id"
                                        :label="item.name"
                                        :value="item.id">
                                        </el-option>
                                    </el-select>
                                    <el-input 
                                    v-model="list.mobile" 
                                    clearable
                                    placeholder="请输入出游人手机号"  
                                    >
                                    </el-input>

                                </div>
                                <div v-if="list.typeShow">
                                    <span><label></label></span>
                                    <el-checkbox v-model="list.type">保存到常用联系人</el-checkbox>
                                </div>
                                <hr class="hr_class" v-if="index1<(buy.orderMember.length-1)" />
                            </div>

                        </div>

                     </div>
                    <div class="content-order-details-right">
                        <h3>订单价格</h3>
                        <div v-for="(buy, index) in buyList" :key="index">
                            <!-- 常规路线、当地参团 -->
                            <div v-if="buy.type == 1 || buy.type == 2 ">
                                <div>
                                    <h4>行程</h4>
                                    <p><label>{{buy.beginDate}} - {{buy.beginDate | endDayVC(buy.route.dayNum)}}（共{{buy.route.dayNum}}天）</label></p>
                                    <p><label>{{buy.route.title}}</label></p>
                                    <p><label>路线价格</label> <span> {{(buy.childNum + buy.adultNum) * + buy.route.price}}</span></p>
                                    <p v-if="buy.oneNum >0"><label>单人一房</label> <span>{{currencySign}}{{buy.route.oneCost}}*{{buy.oneNum}}</span></p>
                                    <p v-if="buy.twoNum >0"><label>双人一房：</label> <span>{{currencySign}}{{buy.route.twoCost}}*{{buy.twoNum}}</span></p>
                                    <p v-if="buy.threeNum >0"><label>三人一房：</label> <span>{{currencySign}}{{buy.route.threeCost}}*{{buy.threeNum}}</span></p>
                                    <p v-if="buy.fourNum >0"><label>四人一房：</label> <span>{{currencySign}}{{buy.route.fourCost}}*{{buy.fourNum}}</span></p>
                                    <p v-if="buy.arrangeNum >0"><label>配房：</label> <span>{{currencySign}}{{buy.route.arrangeCost}}*{{buy.arrangeNum}}</span></p>
                                </div>
                            </div>
                            <!-- 当地玩家 -->
                            <div v-if="buy.type == 3">
                                <div>
                                    <h4>行程</h4>
                                    <p><label>{{buy.beginDate}} - {{buy.endDate}}（共{{buy.dayNum}}天）</label></p>
                                    <p><label>导游</label> <span>{{buy.guide.realName}}</span></p>
                                    <p><label>价格</label> <span>{{currencySign}}{{buy.guide.price}}</span></p>
                                </div>
                            </div>
                            <!-- 导游路线 -->
                             <div v-if="buy.type == 6">
                                <div>
                                    <h4>行程</h4>
                                    <p><label>{{buy.beginDate}} - {{buy.beginDate | endDayVC(buy.guideRoute.day)}}（共{{buy.guideRoute.day}}天）</label></p>
                                    <p><label>导游</label> <span>{{buy.guideRoute.realName}}</span></p>
                                    <p><label>价格</label> <span>{{currencySign}}{{buy.guideRoute.price}}</span></p>
                                </div>
                                <div>
                                    <h4>导游路线</h4>
                                    <p><label>行程</label> <span>{{buy.guideRoute.title}}</span></p>
                                    <p><label>价格</label> <span>{{currencySign}}{{buy.guideRoute.price}}</span></p>
                                </div>
                             </div>
                            <!-- 邮轮 -->
                            <div v-if="buy.type == 4">
                                <div>
                                    <h4>邮轮</h4>
                                    <p><label>{{buy.beginDate}} - {{buy.beginDate | endDayVC(buy.linerLine.travelDay)}}（共{{buy.linerLine.travelDay}}天）</label></p>
                                    <p><label>{{buy.linerLine.name}}</label><span>{{currencySign}}{{buy.linerLine.price}}*{{buy.adultNum + buy.childNum}}</span></p>
                                    <p v-for="(list, index) in buy.linerLine.linerRoomList" :key="index">
                                        <label>{{list.name}}</label> <span>{{currencySign}}{{list.price}}*{{list.roomNum}}*{{list.adultNum + list.childNum}}</span>
                                    </p>
                                </div>
                            </div>
                            <div v-if="buy.type == 5">
                                <div>
                                    <h4>景点</h4>
                                    <p><label>{{buy.beginDate}}</label></p>
                                    <p><label>{{buy.scenicSpotTicket.sceniceName}}</label></p>
                                    <p><label>{{buy.scenicSpotTicket.name}}</label> 
                                        <span>{{currencySign}}{{buy.scenicSpotTicket.price}}*{{buy.adultNum + buy.childNum}}</span>
                                    </p>
                                </div>
                            </div>
                            <div>
                                <h4>人数</h4>
                                <p><label>人数</label> <span>{{`${buy.adultNum}成人${buy.childNum}儿童`}}</span></p>
                            </div>
                            <div v-if="isNotEmpty(buy.insurance)">
                                <h4>保险</h4>
                                <p><label>{{buy.insurance.name}}</label> <span>{{currencySign}}{{buy.insurance.price}}*{{buy.adultNum+buy.childNum}}</span></p>
                            </div>
                        </div>
                        <p class="content-order-details-total">总计 <b>{{currencySign}}{{orderPrice}}</b></p>
                        <a class="content-order-details-confirm-order" @click.stop="sureorder">确认订单</a>
                    </div>
                 </div>
            </div>
        </div>

        <ez-website></ez-website>
        

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
</template>
<script>
import ezHeader from "components/home/ezHeader"
import ezContainer from "components/home/ezContainer"
import ezWebsite from "components/home/ezWebsite"
import orderMember from "components/order/orderMember"
import orderAddress from "components/order/orderAddress"
import orderCity from "components/order/orderCity"
import orderIcon from "components/order/orderIcon"
import { mapState, mapMutations, mapGetters } from "vuex";
import { 
    getMemberContact,
    saveOrderByCar,
     } from "getData"
import { nowDate } from 'utils/common'
import {
    productCarDetail,
} from 'getData';
export default {
    name: "buySure",
    data() {
        return {
            buyList: [],  //购物车数据列表
            certValidDateOptions: {   //证件有效期
                disabledDate(time) {  //设置禁用状态，参数为当前日期，要求返回 Boolean
                    return time.getTime() < new Date(nowDate(-1)).getTime();
                },
           },
            birthdayOptions: {  //出生日期
                disabledDate(time) {
                    return time.getTime() >  Date.now();
                },
           },
           memberContactsList: [], //常用联系人
           orderMemberIndex: [],  //点击添加联系人的下标
           memberContactsIndex: "", //选择的常用联系人的下标
        }
    },
    computed: {
        ...mapState("buy",["buyIds"]),
        ...mapState(["currencySign"]),
        ...mapState( "order", [ "contactsName", "contactsMobile", "remark"]),
        orderPrice(){
            let orderPrice = 0
            for (const buy of this.buyList) {
                orderPrice += ((this.isNotEmpty(buy.insurance) ? buy.insurance.price * (buy.childNum + buy.adultNum) : 0))
                switch (buy.type) {
                    //常规路线  当地参团
                    case 1:  case 2:
                    orderPrice += buy.oneNum * buy.route.oneCost + 
                                  buy.twoNum * buy.route.twoCost + 
                                  buy.threeNum * buy.route.threeCost +
                                  buy.fourNum * buy.route.fourCost + 
                                  buy.arrangeNum * buy.route.arrangeCost
                        break;
                    // 导游
                    case 3:
                    orderPrice += (buy.adultNum + buy.childNum) * (buy.guide ? buy.guide.price : 0 )
                     break;
                    //导游路线
                    case 6:
                    orderPrice += (buy.adultNum + buy.childNum) * (buy.guideRoute ? buy.guideRoute.price : 0 )
                     break;
                    //游轮
                    case 4:
                    orderPrice += (buy.adultNum + buy.childNum) * buy.linerLine.price
                    for (const list of buy.linerLine.linerRoomList) {
                        orderPrice += list.price * list.roomNum * (list.adultNum + list.childNum) >> 0
                    }
                     break;
                    //景点门票
                    case 5:
                    orderPrice += (buy.adultNum + buy.childNum) * (buy.scenicSpotTicket ? buy.scenicSpotTicket.price : 0 )
                     break;
                    default:
                        break;
                }
            }
            return orderPrice
        },
    },
    components: {
        ezHeader,
        ezContainer,
        ezWebsite,
        orderMember,
        orderAddress,
        orderCity,
        orderIcon,
    },
    created() {
        this.productCarDetail()
        this.getMemberContact()
    },
    methods: {
        //确定订单
        sureorder(){
            if(this.isLogin()) return;
            if(this.isEmpty (this.contactsName, this.contactsMobile)){
                this.infoMsg('请完善联系人信息'); return;
            }
            for (const buy of this.buyList) {
                for (const list of Object.values(buy.orderMember)) {
                    Vue.set(list, "englishName", `${list.key}/${list.value}`);
                    for (const [key, value] of Object.entries(list)) {
                        if (this.isEmpty (value)) {
                            console.log(key)
                             this.infoMsg('请完善出游人信息'); 
                            return;
                        }
                    }
                    
                }
            }
            saveOrderByCar({
                contactsName: this.contactsName,
                contactsMobile: this.contactsMobile,
                remark: this.remark,
                carOrder: JSON.stringify(this.buyList),
            },"post").then( res => {
                this.orderidSet(data);
                this.$router.push("buyPay")
            })
        },
        //选择保险
        insuranceChange(index){
            for (const list of Object.values(this.buyList[index].insuranceList)) {
                if (list.id == this.buyList[index].insuranceid) {
                     Vue.set(this.buyList[index], "insurance", list)
                }
            }
        },
        //确定添加联系人
        addMemberContact: function () {
            if (this.isEmpty(this.memberContactsIndex)) return;
            let map = {};
            Vue.set(map, "chineseName", this.memberContactsList[this.memberContactsIndex].chineseName);
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
            Vue.set(this.buyList[this.orderMemberIndex[0]].orderMember, this.orderMemberIndex[1], map);
            this.memberContactsIndex = "";
            this.orderMemberIndex = [];
            $('#contactModal').modal('hide');
        },
        //点击添加联系人
        addOrderMember: function (...index) {
            this.orderMemberIndex = index;
        },
        //获取常用联系人
        getMemberContact() {
           getMemberContact({pageNo: 1,pageSize: -1}).then( res => {
                 this.memberContactsList = res.memberContactsList;
           })
        },
        //获取购物车详情
        productCarDetail(){
            productCarDetail({
                id: this.buyIds.toString()
            }).then( res => {
                this.buyList = res
                this.dataInit()
            })
        },
        //初始化购物车数据
        dataInit(){
            this.buyList.map((buy, index) => {
                Vue.set(buy, "insurance", {})
                Vue.set(buy, "insuranceid", "")
                this.orderMemberChange(index, true)
                if(buy.type == 3 && this.isNotEmpty (buy.endDate) && this.isNotEmpty (buy.beginDate)){
                    let dayNum =  parseInt((new Date(buy.endDate).getTime() - new Date(buy.beginDate)) / (24 * 60 * 60 * 1000)) + 1
                    Vue.set(buy, "dayNum", dayNum)
                }
            })
        },
        //初始化出游人信息  flag -是否初始化游轮人数
        orderMemberChange(index, flag = false){
            if(this.buyList[index].type == 4){
                let adultNum = 0
                let childNum = 0
                for (const list of this.buyList[index].linerLine.linerRoomList) {
                    if(flag){
                        Vue.set(list, "adultNum", list.minPeopleNumber)
                        Vue.set(list, "childNum", 0)
                        Vue.set(list, "roomNum", 1)
                        if (list.checkInType == 2) {
                            Vue.set(list, "adultNum", list.peopleNumber)
                        }
                    }
                    adultNum += list.adultNum
                    childNum += list.childNum
                }
                Vue.set(this.buyList[index],"adultNum", adultNum)
                Vue.set(this.buyList[index],"childNum", childNum)
            }
            this.orderMemberInit(index)
        },
        //出游人集合初始化
        orderMemberInit: function (index) {
            Vue.set(this.buyList[index], "orderMember", new Array())
            let num =  this.buyList[index].adultNum + this.buyList[index].childNum;
            console.log(this.buyList[index].adultNum+"-"+this.buyList[index].childNum)
            if (!num) return;
            for (let k = 0; k < num; k++) {
                this.emptyOrderMemberByIndex(index, k);
            }
        },
        //添加清空数据
        emptyOrderMemberByIndex: function (index1, index2) {
            let map = {};
            Vue.set(map, "chineseName", "");
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
            Vue.set(this.buyList[index1].orderMember, index2, map)
        },
    },
}
</script>
<style lang="less" scoped>
.hr_class{
    height:2px;
    border:none;
    border-top:2px 
    dotted #C0C0C0;
}
     .el-select{
        width: auto;
    }
    .el-select{
        float: left;
        margin-right: 10px;
        width: 275px;
        height: 40px;
    }
    .el-input {
        width: 275px !important;
        height: 40px;
    }
    .left-10{
        margin-left: 10px;
    }
    .left-15{
        margin-left: 15px;
    }
    .chineseName{
        >div{
            float: left;
        } 
    }
</style>

