<template>
    <div class="content-right no-border">
            <div class="panel-header ez-base-border">
                <div class="pull-left panel-header-title">常用联系人</div>
                <div class="pull-right">
                    <a class="btn ez-btn" data-toggle="modal" data-target="#contactModal" @click="emptyData">添加</a>
                </div>
            </div>
            <div class="content-panel">
                <div class="contact-card ez-base-border ez-mb-sm" v-for="(list, index) in memberContactsList" :key="index">
                    <ul class="list-inline contact-card-list">
                        <li>
                            <span class="contact-card-label">*中文名称：</span>
                            <span class="contact-card-text">{{list.chineseName}}</span>
                        </li>
                        <li>
                            <span class="contact-card-label">*英文名称：</span>
                            <span class="contact-card-text">{{list.sur}}&nbsp;{{list.name}}</span>
                        </li>
                        <li>
                            <span class="contact-card-label">*证件类型：</span>
                            <span class="contact-card-text">{{list.certType | certTypeVc}}</span>
                        </li>
                        <li>
                            <span class="contact-card-label">*证件有效期：</span>
                            <span class="contact-card-text">{{list.certValidDate}}</span>
                        </li>
                        <li>
                            <span class="contact-card-label">*出生年月：</span>
                            <span class="contact-card-text">{{list.birthday}}</span>
                        </li>
                        <li>
                            <span class="contact-card-label">*手机号：</span>
                            <span class="contact-card-text">+{{list.area}}&nbsp;{{list.mobile}}</span>
                        </li>
                    </ul>
                    <div class="contact-card-btn">
                        <span><a class="btn text-blue" @click.stop="updateClick(index)">修改</a></span>|
                        <span><a class="btn text-blue" @click.stop="deleteData(index,list.contactid)">删除</a></span>
                    </div>
                </div>
            </div>

            <nav class="text-center  col-lg-12 col-md-12 col-sm-12" v-show="show">
                <ul class="pagination ez-navigation">
                    <li @click.stop="pageChange(-1)">
                        <a class="page-next" aria-label="Next" style="margin-right: 10px;">
                            <span aria-hidden="true">上一页 &gt;</span>
                        </a>
                    </li>
                    <li v-show="current_page>5" @click.stop="jumpPage(1)"><a href="#">1</a></li>
                    <li v-show="efont"><a>...</a></li>
                    <li v-for="num in indexs" :class="{active:current_page==num}" @click.stop="jumpPage(num)"><a>{{num}}</a></li>
                    <li v-show="ebehind"><a>...</a></li>
                    <li v-show="current_page<pages-4" @click.stop="jumpPage(pages)"><a>{{pages}}</a></li>
                    <li @click.stop="pageChange(1)">
                        <a class="page-next" aria-label="Next" style="margin-left: 10px;">
                            <span aria-hidden="true">下一页 &gt;</span>
                        </a>
                    </li>
                </ul>
            </nav>

        <!-- 添加联系人（Modal） -->
        <div class="modal fade contactModal ez-modal" id="contactModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
            aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <!--<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>-->
                        <button type="button" class="modal-close" data-dismiss="modal" aria-hidden="true"><i class="iconfont icon-close"></i></button>
                        <h4 class="modal-title text-bold" id="myModalLabel">常用联系人</h4>
                    </div>
                    <div class="modal-body">
                        <form class="form-horizontal contact-form-horizontal">
                            <div class="form-group clearfix">
                                <span class="col-sm-2 control-label required-l">中文名称</span>
                                <div class="col-sm-8">
                                    <input class="form-control" id="txt" type="text" v-model.trim="list.chineseName" maxlength="20" placeholder="需要与证件一致">
                                </div>
                                <div class="col-sm-2">
                                    <a class="btn btn-md ez-btn " @click.stop="emptyData">清空</a>
                                </div>
                            </div>

                            <div class="form-group clearfix">
                                <span class="col-sm-2 control-label required-l">英文名称</span>
                                <div class="col-sm-4">
                                    <input class="form-control" type="text" v-model.trim="list.sur" maxlength="20"  placeholder="姓">
                                </div>
                                <div class="col-sm-4">
                                    <input class="form-control" type="text" v-model.trim="list.name"  maxlength="20" placeholder="名">
                                </div>
                            </div>
                            <div class="form-group clearfix">
                                <span class="col-sm-2 control-label required-l">证件类型</span>
                                <div class="col-sm-4">
                                    <select class="form-control" v-model="list.certType">
                                            <option :value="item.id"  v-for="(item, index) in certTypeSelectList" :key="index">{{item.name}}</option>
                                    </select>
                                </div>
                                <div class="col-sm-4">
                                    <input class="form-control" type="text" v-model.trim="list.certNo" maxlength="20" placeholder="证件号码">
                                </div>
                            </div>
                            <div class="form-group clearfix">
                                <span class="col-sm-2 control-label required-l">证件有效期</span>
                                <div class="col-sm-8">
                                    <input class="form-control" type="date" v-model.trim="list.certValidDate">
                                </div>
                            </div>
                            <div class="form-group clearfix">
                                <span class="col-sm-2 control-label required-l">出生年月</span>
                                <div class="col-sm-8">
                                    <input class="form-control" type="date" v-model.trim="list.birthday">
                                </div>
                            </div>
                            <div class="form-group clearfix">
                                <span class="col-sm-2 control-label required-l">手机号码</span>
                                <div class="col-sm-4">
                                    <select class="form-control" v-model="list.area">
                                        <option :value="item.id"  v-for="(item, index) in areaSelectList" :key="index">{{item.name}}</option>
                                    </select>
                                    <!-- <div class="ez-mt-10"><input type="checkbox">保存到常用联系人</div> -->
                                </div>
                                <div class="col-sm-4">
                                    <input class="form-control" type="text" v-model.trim="list.mobile" maxlength="20" placeholder="出游人手机号">
                                </div>

                            </div>

                            <div class="form-group clearfix">
                                <span class="col-sm-2"></span>
                                <div class="col-sm-8">
                                    <a class="btn btn-lg ez-btn-parmary ez-mr-md" style="border-radius: 4px" @click.stop="updateData">保存</a>
                                </div>
                            </div>
                        </form>
                        <div class="clearfix"></div>

                    </div>
                </div>
            </div>
        </div>
        <!-- 添加联系人 /.modal -->  

    </div>
</template>
<script>
import { 
    deleteMemberContact, 
    addMemberContact, 
    getMemberContact, 
     } from 'getData'
export default {
    name: "myContacts",
    data() {
        return {
            memberContactsList: [],
            list: {},
            current_page: 1, //当前页
            pages: 3, //总页数
        }
    },
    methods: {
        //清空
        emptyData: function () {
            this.list = [];
            Vue.set(this.list, "chineseName", "");
            Vue.set(this.list, "sur", "");
            Vue.set(this.list, "name", "");
            Vue.set(this.list, "certType", this.certTypeSelectList[0].id);
            Vue.set(this.list, "certNo", "");
            Vue.set(this.list, "certValidDate", "");
            Vue.set(this.list, "birthday", "");
            Vue.set(this.list, "area", this.areaSelectList[0].id);
            Vue.set(this.list, "mobile", "");
        },
        //点击修改
        updateClick: function (index) {
            this.list = this.memberContactsList[index];
            $("#contactModal").modal('show');
        },
        //删除常用联系人
        async deleteData(index, contactid) {
            let data = await deleteMemberContact({
                contactid: contactid
            })
            if(data) {
                Vue.delete(this.memberContactsList, index);
                this.current_page = this.current_page > this.pages ? this.pages : this.current_page;
                if(this.memberContactsList.length == 0 && this.current_page != 1){
                    this.current_page = parseInt(this.pages) -1;
                }
                this.getData();
                this.successMsg("删除成功");
            }
        },
        //新增修改常用联系人
        async updateData() {
            for (const [key, value] of Object.entries(this.list)) {
                if (value === "") {
                    this.infoMsg("请完善信息");
                    return;
                }
            }
            let list = {...this.list}
            Vue.set(list, "englishName", `${list.sur}/${list.name}`);

            if(await addMemberContact(list)){
                this.successMsg("保存成功");
                this.emptyData();
                this.getData();
                $("#contactModal").modal('hide');
            }
        },
        //获取常用联系人
        async getData() {
            let data = await getMemberContact({
                pageNo: this.current_page,
            })
            if(data) {
                this.memberContactsList = data.memberContactsList;
                this.pages = data.totalPage;
            }
        },
        //点击上一页 下一页
        pageChange: function (index) {
            index += this.current_page;
            if (index < 1 || index > this.pages) {
                return;
            }
            this.current_page = index;
            this.getData();
        },
        //选择页数
        jumpPage: function (id) {
            if(id == this.current_page){
                return;
            }
            this.current_page = id;
            this.getData();
        },
    },
    created() {
        this.getData();
        this.emptyData();
    },
    computed: {
        show: function () {
            return this.pages && this.pages != 1
        },
        pstart: function () {
            return this.current_page <= 1;
        },
        pend: function () {
            return this.current_page >= this.pages;
        },
        efont: function () {
            if (this.pages <= 7) return false;
            return this.current_page > 5
        },
        ebehind: function () {
            if (this.pages <= 7) return false;
            var nowAy = this.indexs;
            return nowAy[nowAy.length - 1] != this.pages;
        },
        indexs: function () {

            var left = 1,
                right = this.pages,
                ar = [];
            if (this.pages >= 7) {
                if (this.current_page > 5 && this.current_page < this.pages - 4) {
                    left = Number(this.current_page) - 3;
                    right = Number(this.current_page) + 3;
                } else {
                    if (this.current_page <= 5) {
                        left = 1;
                        right = 7;
                    } else {
                        right = this.pages;

                        left = this.pages - 6;
                    }
                }
            }
            while (left <= right) {
                ar.push(left);
                left++;
            }
            return ar;
        },
    },
}
</script>
