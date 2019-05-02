<template>
    <div>
        
        <ez-header></ez-header>
        <ez-container></ez-container>

        <!--content-->
        <div class="content ez-travel-order">
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
                                <input type="text" class="form-control min-text" :value="scenicSpot.countryName+'·'+scenicSpot.cityName"
                                    readonly="readonly" style="background-color: #fff;">
                            </div>
                            <div>
                                <p>时间</p>
                                <input type="date" class="form-control min-text" v-model.trim="startDate" readonly="readonly"
                                    style="background-color: #fff;">
                            </div>
                            <div>
                                <p>人数</p>
                                <input type="text" class="form-control min-text" v-model.trim="playNum" readonly="readonly"
                                    style="background-color: #fff;">
                            </div>
                        </div>

                        <div class="content-order-details-insurance ">
                            <h4>景点</h4>
                            <div class="ez-mb-md">
                                <div>{{scenicSpot.name}}</div>
                                <div>地址：{{scenicSpot.address}}</div>
                                <div>详情：{{scenicSpot.content}}</div>
                            </div>
                        </div>

                        <div class="content-order-details-insurance ">
                            <h4>门票</h4>
                            <div class="ez-mb-md">
                                <div>{{scenicSpotTicket.name}}</div>
                                <div>数量：{{adultNum + childNum}}</div>
                            </div>
                        </div>



                        <div class="content-order-details-insurance">
                            <h4>保险方案</h4>
                            <div>
                                <div v-for="(item, index) in insurancList" :key="index">
                                    <input type="radio" :value="item.id" v-model="insurancId" name="insurance">{{item.name}}
                                    <a @click.stop="insurancContent(index)">（保险说明）</a> <span>{{currencySign}}{{item.price}}/人</span></div>
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
                            <h4>景点</h4>
                            <p><label>{{startDate}}</label></p>
                            <p><label>{{scenicSpot.name}}</label></p>
                            <p><label>{{scenicSpotTicket.name}}</label> 
                                 <span>{{currencySign}}{{scenicSpotTicket.price}}*{{adultNum + childNum}}</span>
                            </p>
                        </div>

                        <div>
                            <h4>人数</h4>
                            <p><label>人数</label> <span>{{playNum}}</span></p>
                        </div>
                        <div v-if="insuranc">
                            <h4>保险</h4>
                            <p><label>{{insuranc.name}}</label> <span>{{currencySign}}{{insuranc.price}}*{{adultNum+childNum}}</span></p>
                        </div>
                        <p class="content-order-details-total">总计 <b>{{currencySign}}{{price}}</b></p>
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

         <ez-website></ez-website>

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
    name: "soptSure",
    data() {
        return {
            scenicid: "",  //景点ID
            startDate: "",  //开始时间
            adultNum: 0,  //大人数量
            childNum: 0,  //儿童数量
            playNum: "",  //游玩人数
            scenicSpot: {},  //景点详情
            contactsName: "",  //联系人姓名
            contactsMobile: "",  //联系人电话
            remark: "",  //备注
            insuranceid: "",  //保险ID
            orderMember: [],  //出游人集合
            insurancList: [],  //保险集合
            insurancId: "",  //选择的保险ID
            insuranc: "",  //选择的保险信息
            memberContactsList: [],  //常用联系人
            orderMemberIndex: "",  //点击添加联系人的下标
            memberContactsIndex: "", //选择的常用联系人的下标
            scenicSpotTicketId: "",  //景点门票ID
            scenicSpotTicket: "",  //景点门票详情
            totalPrice: 0,  //门票价格
        }
    },
    components: {
        ezHeader,
        ezContainer,
        ezWebsite,
    },
    created () {
        
    },
}
</script>
