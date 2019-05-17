<template>
    <div class="content-right">
        <div class="panel-header">
            <div class="pull-left panel-header-title">公司账号管理</div>
            <!--<div class="pull-right">
                <input type="text" class="panel-header-search" placeholder="搜索订单">
            </div>-->
        </div>
        <div class="content-panel">
            <form class="form-horizontal wrap-account">
                <div class="form-group">
                    <span class="label-txt required">主账号</span>
                    <div class="form-content" >
                        <input class="form-control" type="text" value="马化腾">
                    </div>
                </div>
                <div class="form-group">
                    <span class="label-txt required">账号优惠</span>
                    <div class="form-content" >
                        <table class="table table-bordered text-center account-table">
                            <tr>
                                <th>项目</th>
                                <th>消费量</th>
                                <th>返利</th>
                            </tr>                          
                            <tr v-for="(list, index) in memberDiscountList" :key="index">
                                <th>{{list.type}}</th>
                                <th>{{list.stock}}</th>
                                <th>{{list.price}}</th>
                            </tr>
                        </table>
                    </div>
                </div>
                <div class="form-group">
                    <span class="label-txt required">子账号管理</span>
                    <div class="form-content" >
                        <table class="table table-bordered text-center account-table">
                            <tr>
                                <th>账号</th>
                                <th>密码</th>
                                <th>编辑</th>
                            </tr>
                            <tr v-for="(list, index) in memberList" :key="index">
                                <td>{{list.mobile}}</td>
                                <td>{{list.viewPassword}}</td>
                                <td><a class="btn text-red text-underline" @click.stop="deleteMember(index)">删除</a></td>
                            </tr>
                        </table>
                        <div class="account-table-btn text-center">
                            <a class="btn text-blue text-underline" data-toggle="modal" data-target="#addMember">添加</a>
                        </div>
                    </div>
                </div>

                <div class="form-group">
                    <span class="label-txt"></span>
                    <div class="form-content" >
                        <a class="btn btn-lg ez-btn-parmary" @click.stop="updateData">保存</a>
                    </div>
                </div>

            </form>


        </div>
    </div>
</template>
<script>
import {
    validateMember,
    companyInfor,
    updateCompanyInfor,
     } from 'getData'
export default {
    name: "mySub",
    data() {
        return {
            memberList:[],
            memberDiscountList:[],
            mobile:"",
            password:"",
        }
    },
    created () {
         this.getData();
    },
    methods: {
        //删除子账号
        deleteMember:function(index){
            Vue.delete(this.memberList,index);
        },
        //添加子账号
        async addMember(){
            if(this.mobile == ""){
                this.infoMsg("请输入账号");
                return;
            }
            if(this.password == ""){
                this.infoMsg("请输入密码");
                return;
            }
            
            for (const [key, value] of Object.entries(this.memberList)) {
                console.log(value);
                if(value.mobile == this.mobile){
                    this.infoMsg("账号名重复，请重新添加");
                    return;
                }
            }
            
            let map = {};
            Vue.set(map,"memberid","");
            Vue.set(map,"mobile",this.mobile);
            Vue.set(map,"password",hex_md5(this.password));
            Vue.set(map,"viewPassword",this.password);
            
            if(await validateMember({
                 name:this.mobile
            })){
                 $("#addMember").modal('hide');
                this.memberList.push(map);
            }else{
                   this.infoMsg("账号名重复，请重新添加");
            }
        },
        //获取子账号优惠信息
        async getData() {
            let data = await companyInfor()
            if(data) {
                this.memberList = data.memberList;
                this.memberDiscountList = data.memberDiscountList;
            }
        },
        //修改子账号信息
        async updateData() {
            if( await updateCompanyInfor({
                child:JSON.stringify(this.memberList)
            },'post')){
                 this.successMsg("保存信息成功");
            }
        },
    },
}
</script>
