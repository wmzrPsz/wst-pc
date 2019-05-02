<template>
    <div>
        <h4>出游人信息</h4>
        <div class="content-order-details-visitors-info" v-for="(list, index) in orderMember" :key="index">
            <div>
                <span><label>*</label>中文姓名</span>
                <input type="text" class="form-control min-text" maxlength="30" 
                    placeholder="需要与证件一致" :value="list.chineseName" @input="infoChange(index,'chineseName',$event)" />
                <button type="button" class="btn btn-default" style="margin-left:20px;" data-toggle="modal"
                    data-target="#contactModal" @click="addOrderMember(index)">选择常用联系人</button>
                <button type="button" class="btn btn-default" style="margin-left:20px;" @click.stop="emptyOrderMemberByIndex(index)">清空</button>
            </div>
            <div>
                <span><label>*</label>英文姓名</span>
                <input type="text" class="form-control min-text" placeholder="姓（拼音或英文）" maxlength="20"
                    :value="list.key" @input="infoChange(index,'key',$event)" />
                <input type="text" class="form-control min-text" placeholder="名（拼音或英文）" maxlength="20"
                     :value="list.value" @input="infoChange(index,'value',$event)" />
            </div>
            <div>
                <span><label>*</label>证件类型</span>
                <select class="form-control min-text" :value="list.certType" @input="infoChange(index,'certType',$event)" >
                    <option :value="item.id" v-for="(item, index) in certTypeSelectList" :key="index">{{item.name}}</option>
                </select>
                <input type="tetx" class="form-control min-text" placeholder="证件号码" maxlength="25"
                    :value="list.mobile" @input="infoChange(index,'mobile',$event)" />
            </div>
            <div>
                <span><label>*</label>证件有效期</span>
                <input type="date" class="form-control max-text" placeholder="YYYY-MM-DD" maxlength="20"
                    :value="list.certValidDate" @input="infoChange(index,'certValidDate',$event)" />
            </div>
            <div>
                <span><label>*</label>出生年月</span>
                <input type="date" class="form-control max-text" placeholder="YYYY-MM-DD" maxlength="20"
                 :value="list.birthday" @input="infoChange(index,'birthday',$event)"/>
            </div>
            <div>
                <span><label>*</label>手机号码</span>
                <select class="form-control min-text" :value="list.area" @input="infoChange(index,'area',$event)">
                    <option :value="item.id" v-for="(item, index) in areaSelectList" :key="index">{{item.name}}</option>
                </select>
                <input type="number" class="form-control min-text" placeholder="出游人手机号" maxlength="20"
                     :value="list.mobile" @input="infoChange(index,'mobile',$event)"/>
            </div>
            <div v-if="list.typeShow">
                <span><label></label></span>
                <input type="checkbox" :value="list.type" id="typess" @change="typeChange(index)" /> 保存到常用联系人
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
import { getMemberContact } from "getData"
import { mapState, mapMutations, mapActions} from 'vuex'
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
        }
    },
    data() {
        return {
            memberContactsList: [],  //选择的常用联系人
            orderMemberIndex: "",  //点击添加联系人的下标
            memberContactsIndex: "", //选择的常用联系人的下标
        }
    },
    computed: {
        ...mapState("order",["orderMember"]),
    },
    created() {
        this.orderMemberInit();
        this.getMemberContact();
    },
    methods: {
        ...mapMutations("order",["orderMemberSet","infoSet"]),
        infoChange(index, key, event){
            this.infoSet(index, key,event.target.value)
        },
        typeChange(index){
             let orderMember = JSON.parse(JSON.stringify(this.orderMember))
             Vue.set(orderMember[index], "type", !orderMember[index].type);
             this.orderMemberSet(orderMember)
        },
        //确定添加联系人
        addMemberContact: function () {
            let orderMember = JSON.parse(JSON.stringify(this.orderMember))
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
            let orderMember = JSON.parse(JSON.stringify(this.orderMember))
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
            if (!num) return;
            for (let k = 0; k < num; k++) {
                this.emptyOrderMemberByIndex(k);
            }
        },
    },
}
</script>
