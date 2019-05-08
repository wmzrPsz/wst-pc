<template>
    <div>

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
            <div class="chineseName">
                <span><label>*</label>中文姓名</span>
                <!-- <input type="text" class="form-control min-text" maxlength="30" 
                    placeholder="需要与证件一致" :value="list.chineseName" @input="infoChange(index,'chineseName',$event)" /> -->

                <el-input 
                :value="list.chineseName" 
                clearable
                placeholder="请输入中文姓名(需要与证件一致)"  
                @input="infoChange(index,'chineseName',$event)">
                </el-input>

                <!-- <button type="button" class="btn btn-default" style="margin-left:20px;" data-toggle="modal"
                    data-target="#contactModal" @click="addOrderMember(index)">选择常用联系人</button> -->
                <!-- <div> -->
         <el-button type="primary" data-toggle="modal" class="left-15"
                    data-target="#contactModal" @click="addOrderMember(index)">选择常用联系人</el-button>
                <!-- </div> -->
            
                <!-- <button type="button" class="btn btn-default" style="margin-left:20px;" @click.stop="emptyOrderMemberByIndex(index)">清空</button> -->
                <el-button type="info"  @click.stop="emptyOrderMemberByIndex(index)">清空</el-button>
         </div>
            <div>
                <span><label>*</label>英文姓名</span>

                <!-- <input type="text" class="form-control min-text" placeholder="姓（拼音或英文）" maxlength="20"
                    :value="list.key" @input="infoChange(index,'key',$event)" /> -->

                <el-input 
                :value="list.key" 
                clearable
                placeholder="姓(拼音或英文)"  
                @input="infoChange(index,'key',$event)">
                </el-input>

                <!-- <input type="text" class="form-control min-text" placeholder="名（拼音或英文）" maxlength="20"
                     :value="list.value" @input="infoChange(index,'value',$event)" /> -->

                <el-input 
                class="left-10"
                :value="list.value" 
                clearable
                placeholder="名(拼音或英文)"  
                @input="infoChange(index,'value',$event)">
                </el-input>

            </div>
            <div>
                <span><label>*</label>证件类型</span>
                <!-- <select class="form-control min-text" :value="list.certType" @input="infoChange(index,'certType',$event)" >
                    <option :value="item.id" v-for="(item, index) in certTypeSelectList" :key="index">{{item.name}}</option>
                </select> -->

                <el-select :value="list.certType" placeholder="请选择证件类型" @input="infoChange(index,'certType',$event)">
                    <el-option
                    v-for="item in certTypeSelectList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                    </el-option>
                </el-select>
<!-- 
                <input type="tetx" class="form-control min-text" placeholder="证件号码" maxlength="25"
                    :value="list.certNo" @input="infoChange(index,'certNo',$event)" /> -->
                <el-input 
                :value="list.certNo" 
                clearable
                placeholder="请输入证件号码"  
                @input="infoChange(index,'certNo',$event)">
                </el-input>

            </div>
            <div>
                <span><label>*</label>证件有效期</span>

                <!-- <input type="date" class="form-control max-text" placeholder="YYYY-MM-DD" maxlength="20"
                    :value="list.certValidDate" @input="infoChange(index,'certValidDate',$event)" /> -->
                <el-date-picker
                :value="list.certValidDate"
                type="date"
                placeholder="选择证件有效期"
                value-format = "yyyy-MM-dd"
                :picker-options="certValidDateOptions"
                @input="infoChange(index,'certValidDate',$event)"
                >
                </el-date-picker>
            </div>
            <div>
                <span><label>*</label>出生年月</span>
                <!-- <input type="date" class="form-control max-text" placeholder="YYYY-MM-DD" maxlength="20"
                 :value="list.birthday" @input="infoChange(index,'birthday',$event)"/> -->
                <el-date-picker
                :value="list.birthday"
                type="date"
                placeholder="选择出生年月"
                value-format = "yyyy-MM-dd"
                :picker-options="birthdayOptions"
                @input="infoChange(index,'birthday',$event)"
                >
                </el-date-picker>
            </div>
            <div>
                <span><label>*</label>手机号码</span>

                <!-- <select class="form-control min-text" :value="list.area" @input="infoChange(index,'area',$event)">
                    <option :value="item.id" v-for="(item, index) in areaSelectList" :key="index">{{item.name}}</option>
                </select> -->

                <el-select :value="list.area" placeholder="请选择证件类型" @input="infoChange(index,'area',$event)">
                    <el-option
                    v-for="item in areaSelectList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                    </el-option>
                </el-select>

                <!-- <input type="number" class="form-control min-text" placeholder="出游人手机号" maxlength="20"
                     :value="list.mobile" @input="infoChange(index,'mobile',$event)"/> -->

                <el-input 
                :value="list.mobile" 
                clearable
                placeholder="请输入出游人手机号"  
                @input="infoChange(index,'mobile',$event)">
                </el-input>

            </div>
            <div v-if="list.typeShow">
                <span><label></label></span>
                <!-- <input type="checkbox" :value="list.type" id="typess" @change="typeChange(index)" /> 保存到常用联系人 -->
                 <el-checkbox :value="list.type" @change="infoChange(index,'type',$event)">保存到常用联系人</el-checkbox>
            </div>
            <hr style=" height:2px;border:none;border-top:2px dotted #C0C0C0;" v-if="index<(orderMember.length-1)" />
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
</template>
<script>
import { getMemberContact, getInsurance } from "getData"
import { mapState, mapMutations, mapActions} from 'vuex'
import { nowDate,} from 'utils/common'
export default {
    name: "orderMember",
    props:{
        adultNum: {
            type: Number,
            default: 0,
            required: true,
        },
        childNum: {
            type: Number,
            default: 0,
            required: true,
        },
        productType:{
            type: Number,
            required: true
        }
    },
    data() {
        return {
            memberContactsList: [],  //选择的常用联系人
            orderMemberIndex: "",  //点击添加联系人的下标
            memberContactsIndex: "", //选择的常用联系人的下标
            insuranceList: [],  //保险集合
            insuranceid: "",  //保险ID
            certValidDateOptions: {   //证件有效期
                disabledDate(time) {  //设置禁用状态，参数为当前日期，要求返回 Boolean
                    return time.getTime() < new Date(nowDate(-1)).getTime();
                },
           },
            birthdayOptions: {  //出生日期
                disabledDate(time) {
                    return time.getTime() >  Date.now();
                },
           }
        }
    },
    computed: {
        ...mapState("order",["orderMember"]),
        ...mapState(["currencySign"]),
    },
    watch: {
        //计算保险价格
        insuranceid: function () {
            for (const list of Object.values(this.insuranceList)) {
                if (list.id == this.insuranceid) {
                    this.insuranceSet(list);
                }
             
            }
        },
        adultNum(){
            this.orderMemberInit();
        },
        childNum(){
            this.orderMemberInit();
        }
    },
    created() {
        this.insuranceSet("");
        this.orderMemberInit();
        this.getInsurancData();
        this.getMemberContact();
    },
    methods: {
        ...mapMutations("order",["orderMemberSet","infoSet", "insuranceSet"]),
         //获取保险数据
        async getInsurancData() {
            let data = await getInsurance({
                  productType: this.productType,  // //1.包车租车2.短程接送3.接送机4常规路线5.当地参团6.游轮7.景点门票8.当地玩家9.旅游定制',
            })
            if(data){
                this.insuranceList = data;
            }
        },
        //常用联系人数据改变
        infoChange(index, key, event){
            console.log(event)
            let value = this.isNull(event)? "" : event;
            if(!this.isNull(event) && !this.isNull(event.target)){
                value = event.target.value 
            }
            this.infoSet({index: index, key: key, value: value})
        },
        //确定添加联系人
        addMemberContact: function () {
            let orderMember = this.copy(this.orderMember)
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
            Vue.set(orderMember, this.orderMemberIndex, map);
            this.orderMemberSet(orderMember)
            this.memberContactsIndex = "";
            this.orderMemberIndex = "";
            $('#contactModal').modal('hide');
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
            let orderMember = this.copy(this.orderMember)
            let map = {};
            Vue.set(map, "chineseName", "");
           //Vue.set(map,"englishName","");
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
            Vue.set(orderMember, index, map);
            this.orderMemberSet(orderMember)
        },
        //出游人集合初始化
        orderMemberInit: function () {
            this.orderMemberSet([]);
            let num = this.adultNum + this.childNum;
            console.log(this.adultNum+"-"+this.childNum)
            if (!num) return;
            for (let k = 0; k < num; k++) {
                this.emptyOrderMemberByIndex(k);
            }
        },
    },
}
</script>
<style lang="less" scoped>
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
<style lang="less">
    .el-select>.el-input{
            display: inline-block;
    }
</style>



