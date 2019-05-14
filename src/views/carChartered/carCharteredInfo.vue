<template>
    <div>
        
        <ezHeader></ezHeader>
        <ezContainer></ezContainer>

        <!---包车租车********************************************************************************-->
        <div class="content ez-travel-map">
            <div class="tourism-info">
                <ul>
                    <li>
                        <p class="">地点</p>
                        <select name="" class="form-control">
                            <option value="">出发地：{{startCityName}}{{startAddress}}</option>
                        </select>
                    </li>
                    <li>
                        <p class="">日期</p>
                        <select name="" class="form-control">
                            <option value="">开始时间：{{startDate}}</option>
                        </select>
                        <select name="" class="form-control">
                            <option value="">结束时间：{{endDate}}</option>
                        </select>
                    </li>
                    <li>
                        <p class="">人数</p>
                        <select name="" class="form-control">
                            <option value="">人数：{{adultNum}}成人，{{childNum}}小孩，{{bagNum}}行李箱</option>
                        </select>
                    </li>

                </ul>
                <div class="tourism-info-btn">
                    <button class="btn btn-primary" @click.stop="goToCar" v-if="showFlag < 6">确认选车</button>
                    <button class="btn btn-primary" @click.stop="getGuideClick" v-if="showFlag ==6 || showFlag == 7">选择导游</button>
                    <button class="btn btn-primary" @click.stop="guideSure" v-if="showFlag ==8">确定订单</button>

                    <i class="btn_i">共{{dayNum}}天</i>
                </div>
            </div>
        </div>


        <div class="width bo_3 ma25  overflow guangzz-q mina ez-travel-hotel">

            <div class="bao_b_a  fu gaodudai overflow">
                <div class="lis bao_b_b bo_5" style="overflow-y: auto">
                    <ul class="bao_b_b-a">
                        <li class="bo_3 overflow pa_f" v-for="(list, index) in orderCarDate" :key="index" :class="{'active':index==orderCarDateIndex}"
                            @click.stop="orderCarDateIndexChange(index)">
                            <p class="ze_f">第{{index+1}}天<span class="ma31 hius zi_e">{{list.data}}</span></p>
                            <p class=" hius fu btn-primary-b qingchu" v-if="list.endCityName && list.cityName">{{list.cityName}} 》 {{list.endCityName}}</p>
                            <p class=" hius fu btn-primary-b qingchu" v-else>请选择今日的玩法</p>
                            <button class="btn btn-primary btn-primary-a" @click.stop="addHotelClick(index)" v-if="index==orderCarDateIndex && showFlag<6">添加酒店</button>
                        </li>
                    </ul>
                </div>
            </div>


            <!-- <div class="bao_b_a overflow guangzz_bao ">
                <button class="btn btn-primary-q btn-primary" style="margin-right:3.5rem; float: right;" @click.stop="goToCar">确认选车</button>
                <div class="baibai beih  lis overflow  luyou">
                    <ul class="fu4">
                        <li class="zi_e ze_ff ma29">导游服务</li>
                        <li class="zi_e ze_ff ma29"> <input type="radio" name="sex" checked="checked">导游</li>
                        <li class="zi_e ze_ff ma29"> <input type="radio" name="sex">司机兼导游</li>
                    </ul>
                </div>
            </div> -->

            <!--玩游类型右边*************************************************************************************************-->
            <div class="fu bao_b_c bo_11 waipa mina" v-if="showFlag == 1">
                <h4 class="pa_f">游玩类型</h4>

                <div v-for="(orderCar, index1) in orderCarDate" :key="index1">
                    <div v-for="(list, index2) in carServiceList" :key="index2" v-if="index1 == orderCarDateIndex">
                        <!-- 接机 -->
                        <ul class="lis_a fu4 zs_d pa_f pa_fff overflow" v-if="list.range == 1" @click="serviceClick(list.id,index2)">
                            <li class="pa_ff"><input class="ma3 jieji" type="radio" v-model="orderCar.serviceid" :value="list.id">{{list.title}}</li>
                            <li class="ma31"><input type="text" class="form-control " placeholder="输入航班号" v-model.trim="orderCar.airNo"></li>
                            <p class="qingchu ma31 zi_e sen_s B-w">当地时间12:50降临在白云机场</p>
                        </ul>

                        <!-- 本地城市 -->
                        <ul class="lis_a fu4 zs_d  pa_e pa_f" v-if="list.range == 2" @click="serviceClick(list.id,index2)">
                            <li><input class="ma3" type="radio" v-model="orderCar.serviceid" :value="list.id">{{list.title}}</li>
                            <li class="ma31 zi_e">{{list.radius}}km</li>
                            <p class="qingchu ma31 zi_e sen_s B-w"> 参考景点：{{citySoptString}}</p>
                        </ul>

                        <!-- 附近城市 -->
                        <ul class="lis_a fu4 zs_d  pa_e pa_f" v-if="list.range == 3"  @click="serviceClick(list.id,index2)">
                            <li><input class="ma3" type="radio" v-model="orderCar.serviceid" :value="list.id">{{list.title}}</li>
                            <li class="ma31 zi_e">{{list.radius}}km</li>
                            <p class="qingchu ma31 zi_e sen_s B-w">范围：{{nearbyCityListString}}</p>
                                                    <!-- 因为是单选  这里是判断是否选中 -->
                            <div class="" v-if="index2 == orderCar.serviceIndex">
                                <input type="text" v-model.trim="orderCar.endCityName" readonly  @click.stop="stopPropagation()"  placeholder="选择城市" class="form-control" style="width:250px;">
                                <div class="J-city-wrap2 wrap-about" style="display: block;">
                                        <!-- <p class="city-tips-wrap">输入名称/拼音搜索城市</p> -->
                                        <ul class="city-list hot">
                                            <li  class="" v-for="(nearbyCity, index) in nearbyCityList" :key="index" @click="nearbyCityClick(nearbyCity.id,nearbyCity.cityName)">{{nearbyCity.cityName}}</li>
                                        </ul>
                                 </div>
                            </div>
                            <div class="form-group" v-else>
                                <input type="text" value="" placeholder="选择城市" class="form-control form-group" style="width:250px;">
                            </div>

                            <!-- <input type="text" value="选择城市" class="search form-control " style="width:100px;margin-left:6rem; margin-top: 1rem;"> -->

                        </ul>

                    </div>
                </div>

            </div>

            <!-- 添加酒店 -->
            <div class="fu bao_b_c bo_11 waipa" v-if="showFlag == 3 || showFlag == 4 || showFlag == 5">
                <div class="travel-content">
                    <div class="travel-content-main">
                        <div class="travel-content-main-title">
                            选择酒店
                        </div>
                        <div class="travel-content-main-search">
                             <div class="travel-content-main-search-con" style="overflow: hidden;">
                                <label>选择酒店</label>
                                <ul class="ul-box">
                                    <li :class="{active:stars==1}" @click="starsClick(1)"><i class="iconfont icon-touzi"></i></li>
                                    <li :class="{active:stars==2}" @click="starsClick(2)"><i class="iconfont icon-touzi1"></i></li>
                                    <li :class="{active:stars==3}" @click="starsClick(3)"><i class="iconfont icon-touzi2"></i></li>
                                    <li :class="{active:stars==4}" @click="starsClick(4)"><i class="iconfont icon-touzi3"></i></li>
                                    <li :class="{active:stars==5}" @click="starsClick(5)"><i class="iconfont icon-touzisvg"></i></li>
                                        <li><a class="btn" @click.stop="backHotel" v-if="showFlag == 4 || showFlag == 5">返回酒店列表</a></li>
                                </ul>
                                <!-- <div class="ez-group-btns" style="float:left"> -->
                                        <!-- <a class="btn active" @click.stop="getHotelByCity(1)">搜索</a> -->
                                        <!-- <a class="btn" @click.stop="cancelAdd">返回行程列表</a>
                                        <a class="btn" @click.stop="backHotel" v-if="showFlag == 4 || showFlag == 5">返回酒店列表</a> -->
                                        <!-- <a class="btn" @click.stop="backHotelRoom" v-if="showFlag == 5">返回酒店房间列表</a> -->
                                <!-- </div> -->
                            </div>
                            <div class="travel-content-main-search-type">
                                <label>房间类型</label>
                                <ul>
                                    <li>
                                        <i class="iconfont icon-ren"></i>
                                        <select class="form-control"  v-model="oneNum" @change="getHotelByCity(1)">
                                            <option>0</option>
                                            <option>1</option>
                                            <option>2</option>
                                        </select>
                                    </li>
                                    <li>
                                        <i class="iconfont icon-ren"></i>
                                        <i class="iconfont icon-ren"></i>
                                        <select class="form-control" v-model="twoNum" @change="getHotelByCity(1)">
                                            <option>0</option>
                                            <option>1</option>
                                            <option>2</option>
                                        </select>
                                    </li>
                                    <li>
                                        <i class="iconfont icon-ren"></i>
                                        <i class="iconfont icon-ren"></i>
                                        <i class="iconfont icon-ren"></i>
                                        <select class="form-control" v-model="threeNum" @change="getHotelByCity(1)">
                                            <option>0</option>
                                            <option>1</option>
                                            <option>2</option>
                                        </select>
                                    </li>
                                    <li>
                                        <i class="iconfont icon-ren"></i>
                                        <i class="iconfont icon-ren"></i>
                                        <i class="iconfont icon-ren"></i>
                                        <i class="iconfont icon-ren"></i>
                                            <select class="form-control" v-model="fourNum" @change="getHotelByCity(1)">
                                                <option>0</option>
                                                <option>1</option>
                                                <option>2</option>
                                            </select>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class="travel-content-main-list" v-if="showFlag == 3">
                            <ul>


                                <li v-for="(list, index) in hotelList" :key="index" @click="hotelInforClick(index)">
                                    <div class="travel-content-main-list-img">
                                        <img :src="list.imgUrl | defImg" width="150" height="120">
                                    </div>
                                    <div class="travel-content-main-list-con">
                                        <h4>{{list.name}}</h4>
                                        <p class="travel-content-main-list-con_a sen_s fu1">{{currencySign}}{{list.price}}<span
                                                class="zi_d  ccc">/元起</span></p>
                                        <p><i class="iconfont icon-touzi2"></i>{{list.level}}星级酒店</p>
                                        <i class="iconfont icon-mark"></i>
                                        {{list.address}}
                                    </div>
                                </li>

                            </ul>
                        </div>
                        <div class="travel-content-main-list" v-if="showFlag == 4 || showFlag == 5">
                            <ul>
                                <li @click="hotelInforClick(hotelInfor.index)" v-if="hotelInfor.name">
                                    <div class="travel-content-main-list-img">
                                        <img :src="hotelInfor.imgUrl | defImg" width="150" height="120">
                                    </div>
                                    <div class="travel-content-main-list-con">
                                        <h4>{{hotelInfor.name}}</h4>
                                        <p><i class="iconfont icon-touzi2"></i>{{hotelInfor.level}}</p>
                                        <p>{{hotelInfor.address}}</p>
                                        <i></i>
                                    </div>
                                </li>
                                <h4 style="font-weight: 600;margin-left: 2.5rem;">房间列表</h4>
                                <li v-for="(list, index) in hotelRoomList" :key="index" v-if="showFlag == 4">
                                    <div class="travel-content-main-list-img">
                                        <img :src="list.imgUrl | splitVc(0) | defImg" width="150" height="120">
                                    </div>
                                    <div class="travel-content-main-list-con">
                                        <h4 style="float: left;">{{list.roomName}}</h4>
                                        <p class="travel-content-main-list-con_a sen_s fu1">{{currencySign}}{{list.price}}</p>
                                        <p class="qingchu fu"><i class="iconfont icon-touzi2"></i>{{list.content}}</p>
                                        <div class="ez-counter" style="float:right!important;">
                                            <i class="counter-minus  iconfont icon-minus fu lis_a" @click="hotelRoomChange(index,-1)"></i>
                                            <input class="counter-num" type="text" v-model.trim="list.num" style="height:30px;">
                                            <i class="counter-add iconfont icon-add fu1 lis_a" @click="hotelRoomChange(index,1)"></i>
                                        </div>

                                        <p class="qingchu fu">可入住1-{{list.people}}多少人 ，剩余{{list.stockNum}}件</p>
                                        <a class="qingchu fu" style="text-decoration:underline" @click.stop="getHotelRoomInfor(list.id)">查看详情</a>
                                    </div>
                                </li>

                                <div class="xua" v-if="showFlag == 5">
                                    <h4 class="zhong_a baibai right_aaa bo_13 xua_a ">已选择</h4>
                                    <li v-for="(list, index) in orderCarDate[orderCarDateIndex].hotelInforDetails" :key="index">
                                        <div class="travel-content-main-list-img">
                                            <img :src="list.hotelRoomImg" width="150" height="120">
                                        </div>
                                        <div class="travel-content-main-list-con">
                                            <h4>{{list.hotelRoomName}}</h4>
                                            <button class="btn fu1 beisen fff" @click.stop="delHootelRoom(index)">删除</button>
                                            <p class="sen_s zi_c ma1">{{currencySign}}{{list.price}}*{{list.num}} </p>
                                        </div>
                                    </li>

                                </div>

                            </ul>
                        </div>
 
                        <div class="col-md-offset-4" v-if="showFlag == 3 || showFlag == 4">
                            <div id="hotel_page" class="pagination"></div>
                        </div>

                    </div>


                </div>

                <div class="baibai beijihenh waipa overflow ma1 pa_qq">
                    <div class="bo_5 overflow lis ma1">
                        <ul>
                            <li class="fu bao_b_g ma14" style="background-image:url(~images/xzfj_hotel_icon.png)" @click.stop="hootRoomChoiceClick">
                                <div class="beisen fff right_aaa mars"> {{orderCarDate[orderCarDateIndex].hotelRoomNum}}</div>
                            </li>
                            <li class="fu1">
                                <button class="btn btn-primary">{{currencySign}}{{orderCarDate[orderCarDateIndex].hotelRoomPrice}}</button>

                            </li>
                        </ul>
                    </div>

                    <div class="ez-nav-tabs ez-custom-tabs ez-hotel-tabs" v-if="hotelRoomInfor">
                            <!-- Nav tabs -->
                            <ul class="tab-list list-inline">
                                <li class="active"><a>图片</a></li>
                                <li><a>详细</a></li>
                            </ul>
                            <!-- Tab panes -->
                            <div class="tab-content">
                                <div class="tab-pane ez-custom-pane pull-left active" style="position: relative;">
                                    <div class="trip-scroll-btns">
                                        <a href="javascript:;" class="scroll-right" style="right:0px" @click.stop="roomImgScrollClick(1)"
                                            :class="{active:hotelRoomImgLength < hotelRoomInfor.imgUrl.split(',').length - 3}">
                                            <i class="iconfont icon-next"></i>
                                        </a>
                                        <a href="javascript:;" class="scroll-left" style="left:0px" @click.stop="roomImgScrollClick(-1)"
                                            :class="{active:hotelRoomImgLength > 0}">
                                            <i class="iconfont icon-prev"></i>
                                        </a>
                                    </div>
                                    <div class="hotel-wrap-img row" style="overflow: hidden;height: 180px;">
                                        <div class="col-lg-4 col-md-4 col-sm-4" v-for="(item, index) in (hotelRoomInfor.imgUrl || '').split(',')"
                                            :key="index" v-if="index >= hotelRoomImgLength">
                                            <img :src="item | defImg" class="img-responsive">
                                        </div>
                                    </div>
                                </div>
                                <div class="tab-pane ez-custom-pane pull-left">
                                    <div class="hotel-wrap-box">
                                        <ul class="list-inline pull-left">
                                            <li><i class="iconfont icon-wifi"></i>大厅无线网络</li>
                                            <li class="active"><i class="iconfont icon-wifi"></i>客厅无线网络</li>
                                            <li class="active"><i class="iconfont icon-swing"></i>泳池</li>
                                            <li><i class="iconfont icon-shower"></i>淋浴</li>
                                            <li class="active"><i class="iconfont icon-parking text-bold"></i>停车场</li>
                                            <li><i class="iconfont icon-dog hotel-pet"></i>可带宠物</li>
                                            <li class="active"><i class="iconfont icon-cool"></i>空调</li>
                                            <li class="active"><i class="iconfont icon-dinner"></i>餐厅</li>
                                            <li class="active"><i class="iconfont icon-bar"></i>酒吧</li>
                                            <li><i class="iconfont icon-gym"></i>健身房</li>
                                        </ul>
                                    </div>
                                    <div class="hotel-wrap-list">
                                        <span class="pull-left label-text ez-mr-50">服务项目</span>
                                        <ul class="list-inline pull-left">
                                            <li>行李寄存</li>
                                            <li>叫醒服务</li>
                                        </ul>
                                    </div>
                                    <div class="hotel-wrap-list">
                                        <span class="pull-left label-text ez-mr-50">客服设施</span>
                                        <ul class="list-inline pull-left">
                                            <li>24小时热水</li>
                                            <li>电热水壶</li>
                                            <li>吹风机</li>
                                            <li>烫衣机</li>
                                        </ul>
                                    </div>
                                </div>

                            </div>
                        </div>

                </div>

                <!-- <div class=" fu1 ma25">
                    <samp>共：<samp class="sen_s zi_c ma11 zi_f">699/元</samp></samp>
                    <button class="btn btn-primary" style="width: 100px; margin:2.5rem 2.5rem;">确定</button>
                </div> -->
            </div>

            <!-- 添加车辆 -->
            <div class="ez-travel-car travel-content-main ez-conventional" v-show="showFlag == 6 || showFlag == 7">
                <div class="travel-content-main-title">
                    选择租车
                </div>
                <div class="travel-content-main-search">
                    <div class="travel-content-main-search-con">
                        <ul>
                            <li>
                                <label>车辆等级</label>
                                <select class="form-control" v-model="comfort" @change="getCarByCity(1)">
                                    <option value="">全部</option>
                                    <option :value="le.id" v-for="(le, index) in carLevel" :key="index">{{le.name}}</option>
                                </select>
                            </li>
                            <li>
                                <label>座位数</label>
                                <select class="form-control" v-model="seatNum" @change="getCarByCity(1)">
                                    <option value="">全部</option>
                                    <option :value="n" v-for="n in 7" v-if="n>=3">{{n}}座</option>
                                </select>
                            </li>
                            <li>
                                <div class="ez-group-btns">
                                    <a class="btn" @click.stop="getCarByCity(1)">返回车辆列表</a>
                                </div>
                            </li>
                        </ul>
                    </div>

                </div>
                <div class="travel-content-main-list" v-if="showFlag == 6">
                    <ul>
                        <li v-for="(car, index) in carList" :key="index" v-if="!car.carShow">
                            <input type="checkbox" name="addCarid" v-model="addCarid" :value="car.id" @change="addCarChange">
                            <div class="travel-content-main-list-img">
                                <a class="ez-player-btn">
                                    <img :src="car.carImg" width="150" height="120" alt=""
                                        title="车辆视频" />
                                </a>
                            </div>
                            <div class="travel-content-main-list-con">
                                <div class="travel-content-main-list-con-title">
                                    <h4>{{car.carName}}</h4>
                                    <p @click="watchCarVideo(car.carVideo)"><i class="iconfont icon-mark"></i>观看视频</p>
                                </div>
                                <p>{{car.carTrait}}</p>
                            </div>
                            <div class="travel-content-main-list-review">
                                <label>{{car.star}}分</label>
                                <a @click.stop="commentNumClick(index)">
                                    <p>{{car.commentNum}}条评价</p>
                                </a>
                            </div>
                            <div class="travel-content-main-list-under">
                                <i class="iconfont icon-mark"></i>{{car.seatNum}}座
                                <i class="iconfont icon-mark"></i>1-{{car.bagNum}}容量
                                <i class="iconfont icon-mark"></i>{{car.comfort | carLevelVc}}
                                <div class="travel-content-main-list-under-right">
                                    <div>
                                        <p><i class="iconfont">{{currencySign}}{{car.price}}</i></p>
                                        <a style="color: #8b8b8b;text-decoration: underline" @click="getRefundInfo(car.id,$event)"
                                            :id="'refundTips-'+index">退款说明</a>
                                    </div>
                                    <a @click="addCarClick($event,car.id)"><i class="iconfont icon-addition_fill"></i></a>
                                </div>
                            </div>

                            <!-- 车辆评论 -->
                            <div class="evaluation-info" :class="{'hidden-info':!car.show}" v-if="car.show"
                                style="float: left;">
                                <div class="travel-list-con" v-for="(comment, index1) in car.commentList" :key="index1"
                                    v-if="car.commentList" style="min-height: 150px;">
                                    <div class="floatl"><img :src="comment.memberPhoto | defPhoto" alt="用户一级评论头像"></div>
                                    <div class="content floatl">
                                        <div>{{comment.memberName}}<div class="ez-star pull-right">
                                                <img :src="comment.level>index2?'../../images/star-on.png':'../../images/star-off.png'"
                                                    title="regular" v-for="(item, index2) in 5" :key="index2">
                                            </div>
                                        </div>
                                        <p>{{comment.content}}</p>
                                        <p class="pull-left"><span>{{comment.createDate}}</span></p>
                                        <p class="pull-right" @click.stop="subreviewClick(index,index1)"><i
                                                class="iconfont icon-dialog"></i><span>{{comment.childNum}}</span></p>
                                        <p class="pull-right ez-pr-10" @click.stop="digComment(comment.commentid,index,index1)"><i
                                                class="iconfont icon-like"></i><span>{{comment.digNum}}</span></p>
                                    </div>
                                    <div v-if="comment.show">
                                        <div class="erji_a">
                                            <input class="erji_b" type="text" @keyup.13="addChildComment(comment.commentid)"
                                                v-model.trim="commnotContent" :placeholder="'回复@'+comment.memberName">
                                        </div>

                                        <div class="erji_a" v-for="(item, index) in comment.commentList" :key="index">
                                            <div class="erji_c"><img :src="item.memberPhoto | defPhoto" alt=""></div>
                                            <div class="erji_d">
                                                <p><i style="float: left;">{{item.memberName}}</i><i style="float: right;">{{item.createDate}}</i></p>
                                                <p class="erji_e">{{item.content}}</p>
                                            </div>
                                        </div>
                                        <div class="col-md-offset-4">
                                        <div id="commonPage2" class="travel-content-main-list-paging pagination "></div>
                                    </div>
                                    </div>
                                </div>
                                <div class="col-md-offset-4">
                                    <div id="commonPage1" class="travel-content-main-list-paging pagination "></div>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="col-md-offset-4"  v-if="showFlag == 6">
                 <div id="carPage" class="travel-content-main-list-paging pagination"></div>
                </div>

                <div class="bo_5 overflow lis ma1" style="clear: both;" v-if="showFlag == 6">
                    <ul>
                        <li class="fu bao_b_g ma14 hootRoomChoice" @click.stop="addCarInfo">
                            <div class="beisen fff right_aaa mars">{{carNum}}</div>
                        </li>
                        <li class="fu1" @click.stop="reserveCarClick">
                            <button class="btn btn-primary">{{currencySign}}{{carPrice}}预定</button>
                        </li>
                    </ul>
                </div>
            </div>

            <!-- 添加的车辆信息 -->
            <div class="ez-travel-hotel pull-right" v-if="showFlag == 7">
                <div class="travel-content-main-list">
                    <ul>
                        <div class="xua">
                            <h4 class="zhong_a baibai right_aaa bo_13 xua_a ">已选择</h4>
                            <li v-for="(list, index) in addCarList" :key="index">
                                <div class="travel-content-main-list-img">
                                    <img :src="list.carImg" width="150" height="120">
                                </div>
                                <div class="travel-content-main-list-con">
                                    <h4>{{list.carName}}</h4>
                                    <button class="btn fu1 beisen fff" @click.stop="delCar(index)">删除</button>
                                    <p class="sen_s zi_c ma1">{{currencySign}}{{list.carPrice}} </p>
                                </div>
                            </li>
                        </div>
                    </ul>
                </div>
            </div>


                    <!-- 导游 -->
                    <div class="travel-content-main ez-travel-tourguide ez-conventional" v-if="showFlag == 8">
                        <div class="travel-content-main-title">
                            选择导游
                        </div>
                        <div class="travel-content-main-search">
                            <div class="travel-content-main-search-type">
                                <label>选择导游{{guideType}}</label>
                                <ul>
                                    <li><input type="radio" value="4" v-model="guideType" @change="getGuide(1)">导游</li>
                                    <li><input type="radio" value="5" v-model="guideType" @change="getGuide(1)">司机兼导游</li>
                                </ul>
                            </div>
                            <div class="travel-content-main-search-type">
                                <label>年龄段{{guideAge}}</label>
                                <ul>
                                    <li><input type="radio" v-model="guideAge" value="" @change="getGuide(1)">不限</li>
                                    <li><input type="radio" v-model="guideAge" value="2000" @change="getGuide(1)">00后</li>
                                    <li><input type="radio" v-model="guideAge" value="1990" @change="getGuide(1)">90后</li>
                                    <li><input type="radio" v-model="guideAge" value="1980" @change="getGuide(1)">80后</li>
                                    <li><input type="radio" v-model="guideAge" value="1970" @change="getGuide(1)">70后以上</li>
                                </ul>
                            </div>
                            <div class="travel-content-main-search-type">
                                <label>性别{{guideSex}}</label>
                                <ul>
                                    <li><input type="radio" v-model="guideSex" value="" @change="getGuide(1)">不限</li>
                                    <li><input type="radio" v-model="guideSex" value="1" @change="getGuide(1)">男</li>
                                    <li><input type="radio" v-model="guideSex" value="2" @change="getGuide(1)">女</li>
                                </ul>
                            </div>
                            <div class="travel-content-main-search-type">
                                <label>价格</label>
                                <ul>
                                    <li>{{currencySign}}<input type="number" name="price" v-model.number="minPrice"
                                            @change="getGuide(1)">-</li>
                                    <li>{{currencySign}}<input type="number" name="price" v-model.number="maxPrice"
                                            @change="getGuide(1)"></li>
                                </ul>
                            </div>
                            <div class="travel-content-main-search-type">
                                <label>擅长{{tagId}}</label>
                                <ul>
                                    <li><input type="radio" v-model="tagId" value="" @change="getGuide(1)">不限</li>
                                    <li v-for="(comTag, index) in comTagList" :key="index">
                                        <input type="radio" v-model="tagId" :value="comTag.tagid" @change="getGuide(1)">{{comTag.content}}
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class="travel-content-main-list">
                            <ul>
                                <li v-for="(list, index) in guideList" :key="index">
                                    <input type="radio" v-model="guideid" :value="list.guideid" @change="guideChange">
                                    <div class="travel-content-main-list-img">
                                        <img :src="list.photo | defPhoto" width="130" height="130" alt="" title="" />
                                    </div>
                                    <div class="travel-content-main-list-con">
                                        <div class="travel-content-main-list-con-title">
                                            <h4>{{list.realName}} </h4>
                                            <ul>
                                                <li>性别：{{list.sex | sexVc}}</li>
                                                <li>年龄：{{list.age}}</li>
                                                <li>所在地区：{{list.cityName}}</li>
                                            </ul>
                                        </div>
                                        <div class="travel-content-main-list-con-goodat">
                                            <p v-for="(tag, index) in list.tagContent.split(',')">
                                                <i class="iconfont icon-sanjiaozuo1"> </i><label>{{tag}}</label>
                                            </p>
                                        </div>
                                    </div>
                                    <div class="travel-content-main-list-review">
                                        <label>{{list.star}}分</label>
                                        <p>{{list.commentNum}}条评价</p>
                                    </div>
                                    <div class="travel-content-main-list-under">
                                        <p>简介：{{list.introduction}}</p>
                                        <div class="travel-content-main-list-under-right" style="height: 51px;">
                                            <p><i class="iconfont icon-qian">{{currencySign}}{{list.price}}</i>起</p>
                                            <a style="color: #8b8b8b;text-decoration:underline" @click="getGuideRefundInfo(list.guideid,$event)"
                                                :id="'guide'+index">退款说明</a>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div class="col-md-offset-4">
                         <div id="getGuidePage" class="pagination "></div>
                        </div>
                    </div>



        </div>

        <!--地图******************************************************************************** -->
        <div class="width overflow ma25">
            <!-- <div class="baibai mei_a">

                <div id="allmap" style=" height: 300px; width:100%;"></div>
            </div> -->

            <div class="fu1 ma25">
                <samp style="margin-top: 1.1rem; display: block; float: left;">共：<samp class="sen_s zi_c ma11 zi_f">{{currencySign}}{{orderPrice}}</samp></samp>
                <button class="btn btn-primary btn-primary-a" @click.stop="goToCar" v-if="showFlag < 6">确认选车</button>
                <button class="btn btn-primary btn-primary-a" @click.stop="getGuideClick" v-if="showFlag ==6 || showFlag == 7 ">选择导游</button>
                <button class="btn btn-primary btn-primary-a" @click.stop="guideSure" v-if="showFlag ==8">确定订单</button>
            </div>

        </div>

        <!--注意事项**********************************************************************************-->
        <div class="width  ma25 ">
            <div class="travel-prompt">
                <div class="travel-prompt-hred">
                    <ul>
                        <li><span class="travel-prompt-hred-style">注意事项</span></li>
                        <li><span>列表自定</span></li>
                        <li><span>列表自定</span></li>
                    </ul>
                </div>
                <div class="travel-prompt-content">
                    <p class="travel-prompt-content-title">客栈介绍</p>
                    <div class="travel-prompt-content-con">
                        <p>2013年开业 2014年装修 15间房 电话--18887243551</p>
                        <p>“像家一样”是朵家无论大理的客栈还是成都的咖啡馆，始终也是唯一不变的追求，多年海内外自助旅行，住过无数各色各异的客栈民宿和酒店，我明白旅行在外的人身体最需要的栖息地是究竟。
                            朵家，位于大理古城人民路下段洱海门外侧，交通便利，好停车。共有1.8米大床房3间，1.2米双床榻榻米2间.
                            全部独立卫浴。免费无限网络覆盖，空间开敞的室内公共休闲区，精致的院落。客房内配套实木或铁艺家具，60支纱埃及棉高档床品，亚
                            麻窗帘，实木地板，全身镜，吹风筒，妇洗器，品牌卫浴。室内禁烟以及不提供一次性用具。</p>
                    </div>
                </div>
                <div class="travel-prompt-content" style="display: none;">
                    <p class="travel-prompt-content-title">客栈介绍1</p>
                    <div class="travel-prompt-content-con">
                        <p>2013年开业 2014年装修 15间房 电话--18887243551</p>
                        <p>“像家一样”是朵家无论大理的客栈还是成都的咖啡馆，始终也是唯一不变的追求，多年海内外自助旅行，住过无数各色各异的客栈民宿和酒店，我明白旅行在外的人身体最需要的栖息地是究竟。
                            朵家，位于大理古城人民路下段洱海门外侧，交通便利，好停车。共有1.8米大床房3间，1.2米双床榻榻米2间.
                            全部独立卫浴。免费无限网络覆盖，空间开敞的室内公共休闲区，精致的院落。客房内配套实木或铁艺家具，60支纱埃及棉高档床品，亚
                            麻窗帘，实木地板，全身镜，吹风筒，妇洗器，品牌卫浴。室内禁烟以及不提供一次性用具。</p>
                    </div>

                </div>
                <div class="travel-prompt-content" style="display: none;">
                    <p class="travel-prompt-content-title">客栈介绍2</p>
                    <div class="travel-prompt-content-con">
                        <p>2013年开业 2014年装修 15间房 电话--18887243551</p>
                        <p>“像家一样”是朵家无论大理的客栈还是成都的咖啡馆，始终也是唯一不变的追求，多年海内外自助旅行，住过无数各色各异的客栈民宿和酒店，我明白旅行在外的人身体最需要的栖息地是究竟。
                            朵家，位于大理古城人民路下段洱海门外侧，交通便利，好停车。共有1.8米大床房3间，1.2米双床榻榻米2间.
                            全部独立卫浴。免费无限网络覆盖，空间开敞的室内公共休闲区，精致的院落。客房内配套实木或铁艺家具，60支纱埃及棉高档床品，亚
                            麻窗帘，实木地板，全身镜，吹风筒，妇洗器，品牌卫浴。室内禁烟以及不提供一次性用具。</p>
                    </div>

                </div>
            </div>
        </div>


        <!-- Large modal -->
        <div class="modal fade ez-player-modal" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close video-close" data-dismiss="modal" aria-label="Close"><span
                                aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title" id="myModalLabel">汽车视频</h4>
                    </div>
                    <div class="modal-body">
                        <video :src="carVideo" controls="controls" autoplay="autoplay" class="ez-video" style="width:100%;max-height:465px;"></video>
                    </div>
                    <!-- <div class="modal-footer">
          <button type="button" class="btn btn-default video-close" data-dismiss="modal">Close</button>
        </div> -->
                </div>
            </div>
        </div>

        <ezFooter></ezFooter>
        <ezAside></ezAside>

    </div>
</template>
<script>
import ezHeader from "components/home/ezHeader"
import ezContainer from "components/home/ezContainer"
import ezFooter from "components/home/ezFooter"
import ezAside from "components/home/ezAside"
import { dataCountNum } from 'utils/common'
import { mapGetters, mapState, mapMutations } from 'vuex'
import { 
    refundInfor,
    getCityList,
    getGuideLabel,
    getGuideByCity,
    addChildComment,
    digComment,
    getChildComment,
    selectComment,
    getCarByRent,
    getHotelRoomDetails,
    getHotelRoom,
    getHotelByCity,
    selectCarService,
    getCitySpot,
    getNearbyCity,
} from 'getData'
export default {
    name: "carIndex",
    data() {
        return {
            // startCity: localStorage.getItem("startCity"),  //出发城市ID
            // startCityName: localStorage.getItem("startCityName"),  //出发城市
            // startAddress: localStorage.getItem("startAddress"),  //出发详细地址
            // startDate: localStorage.getItem("startDate"),  //上车时间
            // endDate: localStorage.getItem("endDate"),  //下车时间
            // adultNum: parseInt(localStorage.getItem("adultNum")),   //大人数量
            // childNum: parseInt(localStorage.getItem("childNum")),   //小孩数量
            // bagNum: parseInt(localStorage.getItem("bagNum")),   //包裹数量 
            showFlag: 1,   //1游玩类型  3酒店列表  4 酒店房间列表  5 已选择酒店列表 6车辆列表 7.选择的车辆列表 8.导游列表
            // dayNum: "",  //天数
            carServiceList: [],  //车辆业务类型标题
            nearbyCityList: [],  //附近城市
            nearbyCityListString: "",  //附近城市字符串  （，隔开）
            citySoptString: "",  //附近城市字符串  （，隔开）
            orderCarDate: [],  //车辆日期list
            orderCarDateIndex: 0,  //展示数据的天数下标
            searchCityName: "",  //搜索城市名称
            hotelPageNo: 1,  //酒店列表页数
            hotelRoomPageNo: 1,  //酒店列表页数
            oneNum: 0,   //单人间
            twoNum: 0,  //双人间
            threeNum: 0,  //三人间
            fourNum: 0,  //四人间
            hotelList: [],  //酒店列表
            stars: "", //星级
            hotelId: "",//酒店详情ID
            hotelRoomList: [],  //酒店房间列表
            hotelInfor: {},  //房间列表的酒店信息
            hotelRoomInfor: "",  //酒店房间详情
            hotelRoomImgLength: 0,  //酒店房间图片第一个 （左右滑动下标判断）
            comfort: "",  //车辆等级
            seatNum: "",  //座位数
            carList: [],  //车辆列表信息
            commonIndex1: "",  //一级评论车辆下标
            commonIndex2: "",  //二级评论评论下标
            commnotContent: "",  //评论内容
            carVideo: "",  //车辆视频
            addCarList: [],  //选择的车辆List
            addCarid: [],  //页面选择的车辆ID
            carPrice: 0, //选中的车辆价格
            carNum: 0,  //车辆数量
            guideType: 4,//导游类型1.当地玩家2.定制旅游-导游3.定制旅游-司兼导4.包车/租车-导游5.包车/租车-司兼导
            guideAge: "",  //年龄段多个用,隔开
            guideSex: "",  //1男2女
            minPrice: "", //导游最低价格
            maxPrice: "",  //导游最高价格
            tagId: "",  //导游属性ID
            comTagList: [], //玩家擅长属性
            guideList: [], //导游信息
            guideid: "",  //选择的导游ID
            guideInfo: {},  //选择的导游信息
        }
    },
    computed: {
        ...mapState("carChartered",["startCity","startCityName","startAddress","startDate","endDate","adultNum","childNum","bagNum"]),
        ...mapState(["loginType","currencySign"]),
        ...mapGetters("carChartered",["dayNum"]),
        orderPrice: function () {  //订单价格
            let price = 0;
            for (const orderCar of Object.values(this.orderCarDate)) {
                //酒店
                for (const hotelInfo of Object.values(orderCar.hotelInforDetails)) {
                    price += parseFloat(hotelInfo.price) * parseInt(hotelInfo.num);
                }
            }
            //  车辆
            for (const car of Object.values(this.addCarList)) {
                price += parseFloat(car.carPrice);
            }
            //导游
            for (const guide of Object.values(this.guideList)) {
                if (guide.guideid == this.guideid) {
                    price += parseFloat(guide.price) * this.dayNum;
                    break;
                }
            }
            return price;
        },
        //包车租车汽车标题
        serviceids: function(){
            let serviceids = [];
            for (const orderCar of this.orderCarDate) {
                if(orderCar.serviceid){
                    serviceids.push(orderCar.serviceid);
                }
            }
            return serviceids;
        },
    },
    components: {
        ezHeader,
        ezContainer,
        ezFooter,
        ezAside,
    },
    created () {
        console.log(this.isNull())
        this.selectCarService();
        this.getNearbyCity();
        this.getCitySpot();
        this.carServiceInit();
    },
    methods: {
    ...mapMutations(["loginFlagChange"]),
    ...mapMutations("carChartered",["stateChange"]),
        //导游类型改变
        guideChange: function(){
            for (const guide of Object.values(this.guideList)) {
                if (guide.guideid == this.guideid) {
                    this.guideInfo = guide;
                    return;
                }
            }
        },
        //确定订单跳转页面
        goToSureOrder: function () {
            this.stateChange({
                addCarList: this.addCarList, //选择的车辆信息
                travelInfor: this.orderCarDate, //行程信息
                guideInfo: this.guideInfo, //导游详情
                guideType: this.guideType, //导游类型
            })
            this.$router.push("carCharteredSure");
        },
        //导游确定订单
        guideSure: function () {
            if (!this.guideid) {
                 this.infoMsg("请选择导游"); return;
            }
            this.goToSureOrder();
        },
        //获取导游退款说明
        async getGuideRefundInfo(guide, e) {
            let data = await refundInfor({
                productType: 1,  //1.包车租车2.短程接送3.接送机4常规路线5.当地参团6.游轮7.景点门票8.当地玩家9.酒店10.保险
                productid: guide,
            })
            if (data) {
                let refundMsg = "";
                for (const iterator of Object.values(data)) {
                    refundMsg += `订单确认后，提前${iterator.refundDay}天退单，返回${iterator.refundNum}%;<br/>`;
                }
            }
        },
        //获取玩家擅长属性
        async getLAbleData() {
            let data = await getGuideLabel()
            if(data) {
                this.comTagList = data;
            }
        },
        //点击选择导游
        getGuideClick: function (type) {
            let seatNum = 0;
            let bagNum = 0;
            for (const car of Object.values(this.addCarList)) {
                seatNum += car.seatNum;
                bagNum += car.bagNum;
            }
            if (seatNum < this.adultNum + this.childNum) {
                 this.infoMsg("车辆座位数不够"); return;
            }
            if (bagNum < this.bagNum) {
                 this.infoMsg("车辆行李空间不够"); return;
            }
            this.showFlag = 8;
            this.getGuide(1);
            
        },
        //导游列表初始化分页
        getGuidePage: function (pageNo, pages) {
            let this_ = this;
            $('#getGuidePage').jqPaginator({
                totalPages: pages,
                visiblePages: 6,
                currentPage: pageNo,
                onPageChange: function (num, type) {
                    if(type == "change"){
                        this_.getGuide(num);
                    }
                }
            });
        },
        //获取导游信息
        async getGuide(pageNo = 1) {
            this.guideid = "";
            let data = await getGuideByCity({
                cityid: this.startCity,
                startDate: this.startDate,
                endDate: this.endDate,
                pageNo: pageNo,
                guideType: this.guideType,
                guideAge: this.guideAge.toString(),
                guideSex: this.guideSex,
                minPrice: this.minPrice,
                maxPrice: this.maxPrice,
                tagId: this.tagId.toString()
            })
            if (data) {
                this.guideList = data.list;
                this.getGuidePage(pageNo,data.totalPage);
                
            }
        },
        //删除选择的车辆
        delCar: function (index) {
            Vue.delete(this.addCarList, index);
            this.carNum--;
        },
        //查看已选择的车辆
        addCarInfo: function () {
            this.showFlag = 7;
        },
        //点击预定车辆
        reserveCarClick: function () {
            if (this.carPrice <= 0) {
                 this.infoMsg("你暂未选择车辆"); return;
            }
            for (const carid of Object.values(this.addCarid)) {
                for (const [key, car] of Object.entries(this.carList)) {
                    if (carid == car.id) {
                        let map = {};
                        map["carid"] = car.id;
                        map["carType"] = 1;
                        map["carName"] = car.carName;
                        map["carPrice"] = car.price;
                        map["carImg"] = car.carImg;
                        map["seatNum"] = car.seatNum;
                        map["bagNum"] = car.bagNum;
                        map["comfort"] = car.comfort;
                        map["dayDate"] = 0;
                        map["dayRange"] = 0;
                        this.addCarList.push(map);
                        this.carNum++;
                        Vue.set(this.carList[key], "carShow", true);
                        break;
                    }
                }
            }
            this.addCarid = [];
            this.carPrice = 0,
                 this.successMsg("添加成功");
        },
        //点击添加车辆图标
        addCarClick: function (event, carid) {
            //获取点击对象   
            let el = $(event.target).parent().parent().parent().prev().prev().prev().prev();
            let flag = el.prop("checked");
            el.prop("checked", flag);
            if (!flag) {
                this.addCarid.push(carid);
            } else {
                for (const [key, value] of Object.entries(this.addCarid)) {
                    if (value == carid) {
                        Vue.delete(this.addCarid, key);
                    }
                }
            }
            this.addCarChange();
        },
        //页面选择的车辆信息改变
        addCarChange: function () {
            let carPrice = 0;
            for (const carid of Object.values(this.addCarid)) {
                for (const list of Object.values(this.carList)) {
                    if (carid == list.id) {
                        carPrice += parseFloat(list.price);
                    }
                }
            }
            this.carPrice = carPrice;
        },
        //观看车辆视频
        watchCarVideo: function (carVideo) {
            this.carVideo = carVideo;
            $("#myModal").modal('show');
        },
        //添加子评论
        async addChildComment(id) {
            if(this.loginType == 1){
                this.loginFlagChange(1);
                return;
            }
            if (this.isNull(this.commnotContent)) {
                this.infoMsg("请输入评论内容"); return;
            }
            let data = await addChildComment({
                commentid: id,
                content: this.commnotContent,
            })
            if(data){
                this.successMsg("评论成功");
                this.content = "";
                this.getChildComment(1, 1);
            }
        },
        //点赞-取消点赞
        async digComment (id, index1, index2) {
            if(this.loginType == 1){
                this.loginFlagChange(1);
                return;
            }
            let data = await digComment({
                typeId: id,
                digType: 1,
            })
            if (data) {
                Vue.set(this.carList[index1].commentList[index2], "commentList", this.carList[index1].commentList[index2].digNum++);
                this.successMsg("点赞成功");
            } else {
                Vue.set(this.carList[index1].commentList[index2], "commentList", this.carList[index1].commentList[index2].digNum--);
                this.successMsg("取消点赞成功");
            }
        },
        //初始化二级评论分页
        commonPage2: function () {
            let this_ = this;
            $('#commonPage2').jqPaginator({
                totalPages: this.carList[this.commonIndex1].commentList[app.commonIndex2].pages,
                visiblePages: 6,
                currentPage: 1,
                onPageChange: function (num, type) {
                    if(type == "change"){
                        this_.getChildComment(2, num);
                    }
                }
            });
        },
        //获取子评论列表
        async getChildComment(type, pageNo) {
            let data = await getChildComment({
                commentid: this.carList[this.commonIndex1].commentList[this.commonIndex2].commentid,
                pageNo: pageNo,
            }) 
            if (data) {
                Vue.set(app.carList[this.commonIndex1].commentList[this.commonIndex2], "commentList", data.list);
                Vue.set(app.carList[this.commonIndex1].commentList[this.commonIndex2], "pages", data.totalPage);
                if (type == 1) {
                    this.commonPage2();
                }
            }
        },
        //二级评论显示隐藏
        subreviewClick: function (index1, index2) {
            Vue.set(this.carList[index1].commentList[index2], "show", !this.carList[index1].commentList[index2].show);
            if (this.carList[index1].commentList[index2].show) {
                this.content = "";
                for (const [key, value] of Object.entries(this.carList[index1].commentList)) {
                    if (key != index2) {
                        Vue.set(value, "show", false);
                    }
                }
                this.commonIndex2 = index2;
                this.getChildComment(1, 1);
            }
        },
        //初始化一级评论分页
        commonPage1: function () {
            let this_ = this
            $('#commonPage1').jqPaginator({
                totalPages: this.carList[this.commonIndex1].pages,
                visiblePages: 6,
                currentPage: 1,
                onPageChange: function (num, type) {
                    if(type == "change"){
                        this_.selectComment(2, num);
                    }
                }
            });
        },
        //获取一级评论列表
        async selectComment(type, pageNo = 1) {
            let data = await selectComment({
                pageNo: pageNo,
                typeid: this.carList[this.commonIndex1].id,
                proType: 1,  //1.包车租车2.短程接送3.接送机4常规路线5.当地参团6.游轮7.景点门票
                //8.当地玩家9.酒店10.保险11.旅游定制12导游 13.攻略评论 14.城市评论',
            })
                if(data) {
                Vue.set(this.carList[this.commonIndex1], "commentList", data.list);
                Vue.set(this.carList[this.commonIndex1], "pages", data.totalPage);
                Vue.set(this.carList[this.commonIndex1], "show", true);
                if (type == 1) this.commonPage1();
            }
        },
        //一级评论显示隐藏
        commentNumClick: function (index) {
            Vue.set(this.carList[index], "show", !this.carList[index].show);
            if (this.carList[index].show) {
                for (const [key, value] of Object.entries(this.carList)) {
                    if (key != index) {
                        Vue.set(value, "show", false);
                    }
                }
                this.commonIndex1 = index;
                this.selectComment(1, 1);
            }
        },
        //退款提示
        refundTips: function (refundMsg, e) {
            layer.tips(refundMsg, "#" + e.target.id, {
                tips: [1, '#3595CC'],
                maxWidth: 280,
                time: 4000
            });
        },
        //获取车辆退款说明
        async getRefundInfo(carid, e) {
            console.log(e.target.id);
            let data = await refundInfor({
                productType: 1,  //1.包车租车2.短程接送3.接送机4常规路线5.当地参团6.游轮7.景点门票8.当地玩家9.酒店10.保险
                productid: carid,
            })
                if(data) {
                let refundMsg = "";
                for (const iterator of Object.values(data)) {
                    refundMsg += `订单确认后，提前${iterator.refundDay}天退单，返回${iterator.refundNum}%;<br/>`;
                }
                this.refundTips(refundMsg, e);
            }
        },
        //车辆列表分页
        carPage(pageNo,totalPage) {
            let this_ = this;
            $('#carPage').jqPaginator({
                totalPages: totalPage,
                visiblePages: 6,
                currentPage: pageNo,
                onPageChange: function (num, type) {
                    if(type=="change"){
                        this_.getCarByCity(num);
                    }
                }
            });
        },
        //获取车辆信息
        async getCarByCity(pageNo = 1) {
            this.showFlag = 6;
            let data = await getCarByRent({
                cityid: this.startCity,
                serviceids: this.serviceids.toString(),  //包车租车标题id（用，隔开）
                comfort: this.comfort,  //车辆等级
                seatNum: this.seatNum,  //座位数
                pageNo: pageNo,
            })
                if(data) {
                let carList = data.list;
                for (const car of Object.values(carList)) {
                    for (const carid of Object.values(this.addCarList)) {
                        if (carid.carid == car.id) {
                            car["carShow"] = true;
                        }
                    }
                }
                this.carList = carList;
                this.carPage(pageNo,data.totalPage);
            }
        },
        //点击选车
        goToCar: function () {
            if (!this.dayVc()) return;
            if (!this.hotelVc()) return;
            if (this.orderCarDateIndex < this.dayNum - 1) {
                 this.infoMsg("天数少于选择日期天数"); return;
            }
            this.showFlag = 6;
            this.getCarByCity(1);
        },
        //重新计算酒店对应的城市是否是一天的最后一个城市
        dayCityChange: function (index = this.orderCarDateIndex) {
            if (this.orderCarDate[index].hotelInforDetails.length > 0 
                &&  this.orderCarDate[index].endCityid != this.orderCarDate[index].hotelInforDetails[0].cityid) {
                Vue.set(this.orderCarDate[index], "hotelInforDetails", []);
                this.hootRoomPriceReckon();
                 this.infoMsg("请重新添加酒店");
            }
        },
        //返回酒店列表页面
        backHotel: function () {
            this.showFlag = 3;
            this.hotelRoomPageNo = 1;
            this.getHotelByCity();
        },
        //酒店房间图片详情滑动
        roomImgScrollClick: function (flag) {
            let index = flag + this.hotelRoomImgLength;
            let length = this.hotelRoomInfor.imgUrl != undefined ? this.hotelRoomInfor.imgUrl.split(",").length : 0;
            if (index < 0 || length < 4) {
                return;
            }
            if (index > length - 3) {
                //    this.hotelRoomImgLength = 0;
            } else {
                this.hotelRoomImgLength = index;
            }
        },
        //酒店房间详情
        async getHotelRoomInfor(id) {
            this.hotelRoomInfor = "";
            this.hotelRoomImgLength = 0;
            let data = await getHotelRoomDetails({
                hotelRoomid: id,
            })
            if(data) {
                this.hotelRoomInfor = data.hotelRoom;
            }
        },
        //点击选择城市
        nearbyCityClick(id, cityName){
            Vue.set(this.orderCarDate[this.orderCarDateIndex], "endCityid", id);
            Vue.set(this.orderCarDate[this.orderCarDateIndex], "endCityName", cityName);
            $(".wrap-about").hide();
            this.addEndCity();
            this.dayCityChange(this.orderCarDateIndex);
        },
        //阻止事件冒泡
        stopPropagation: function() {
            $(".wrap-about").show();
            $(document).on('click', function() {
                $(".wrap-about").hide();
            })
        },
        //查看已选择的酒店
        hootRoomChoiceClick: function () {
            this.showFlag = 5;
        },
        //房间改变重新计算数量总价
        hootRoomPriceReckon: function () {
            let hotelRoomNum = 0;
            let hotelRoomPrice = 0;
            for (const list of Object.values(this.orderCarDate[this.orderCarDateIndex].hotelInforDetails)) {
                hotelRoomNum += list.num;
                hotelRoomPrice += list.num * list.price;
            }
            Vue.set(this.orderCarDate[this.orderCarDateIndex], "hotelRoomNum", hotelRoomNum);
            Vue.set(this.orderCarDate[this.orderCarDateIndex], "hotelRoomPrice", hotelRoomPrice);
        },
        //删除酒店房间
        delHootelRoom: function (index, orderCarDateIndex = this.orderCarDateIndex) {
            Vue.delete(this.orderCarDate[orderCarDateIndex].hotelInforDetails, index);
            this.hootRoomPriceReckon();
        },
        //增加房间数量
        hootRoomAdd: function (index) {
            if (this.hotelRoomList[index].num > this.hotelRoomList[index].stockNum) {
                 this.infoMsg("库存不足"); return;
            }
            //判断是否存在  存在添加数据  不存在添加酒店
            let flag = true;
            for (const [key, value] of Object.entries(this.orderCarDate[this.orderCarDateIndex].hotelInforDetails)) {
                if (value.roomid == this.hotelRoomList[index].id) {
                    Vue.set(this.orderCarDate[this.orderCarDateIndex].hotelInforDetails[key], "num", this.hotelRoomList[index].num);
                    flag = false;
                    break;
                }
            }
            if (flag) {
                let map = {};
                Vue.set(map, "cityid", this.addScenicSpotIndex);
                Vue.set(map, "num", this.hotelRoomList[index].num);
                Vue.set(map, "roomid", this.hotelRoomList[index].id);
                Vue.set(map, "price", this.hotelRoomList[index].price);
                Vue.set(map, "hotelRoomPeople", this.hotelRoomList[index].people);
                Vue.set(map, "hotelRoomName", this.hotelRoomList[index].roomName);
                Vue.set(map, "hotelRoomImg", this.hotelRoomList[index].imgUrl == undefined ? this.defaultImg : this.hotelRoomList[index].imgUrl.split(",")[0]);
                Vue.set(map, "hotelid", this.hotelInfor.id);
                Vue.set(map, "hotelName", this.hotelInfor.name);
                Vue.set(map, "hotelDate", this.orderCarDate[this.orderCarDateIndex].date);
                this.orderCarDate[this.orderCarDateIndex].hotelInforDetails.push(map);
            }
            this.hootRoomPriceReckon();
        },
        //改变房间数量
        hotelRoomChange: function (index, num) {
            let maxNum = this.hotelRoomList[index].stockNum;
            let number = this.hotelRoomList[index].num + num;
            if (number < 0 || number > maxNum) {
                return;
            }
            Vue.set(this.hotelRoomList[index], "num", number);
            num ? this.hootRoomAdd(index) : thishootRoomDel(index);
        },
        //获取酒店房间列表
        async hotelInforClick(index) {
            this.showFlag = 4;
            this.hotelRoomInfor = "";
            this.hotelRoomList  = [];
            if (index >= 0) { 
                this.hotelId = this.hotelList[index].id;
                this.hotelInfor = this.hotelList[index];
                Vue.set(this.hotelInfor, "index", index);
            }
            let data = await getHotelRoom({
                pageNo: this.hotelPageNo,
                hotelid: this.hotelId,
                date: dataCountNum(this.startDate,this.orderCarDateIndex),
            })
            if(data) {
                //   app.pages = data.body.totalPage;
                let lists = data.list;
                //这里是判断前面是否添加
                for (const list1 of Object.values(lists)) {
                    let num = 0;
                    for (const list2 of Object.values(this.orderCarDate[this.orderCarDateIndex].hotelInforDetails)) {
                        if (list1.id == list2.roomid) {
                            num = list2.num;
                            break;
                        }
                    }
                    Vue.set(list1, "num", num);
                }
                this.hotelRoomList = lists;
                this.hotelPageInit(this.hotelPageNo, data.totalPage);
            }
        },
        //点击星级
        starsClick: function (index) {
            this.stars = index == this.stars ? "" : index;
            this.getHotelByCity(1);
            this.showFlag = 3;
        },
        //初始化酒店列表
        hotelPageInit: function (pageNo, pages) {
            let this_ = this;
            $('#hotel_page').jqPaginator({
                totalPages: pages,
                visiblePages: 6,
                currentPage: pageNo,
                onPageChange: function (num, type) {
                    console.log(type);
                    if(type == "change"){
                        this_.hotelPageNo = num;
                        if(this_.showFlag == 3){
                            this_.getHotelByCity();
                        }else if(this_.showFlag == 4){
                            this_.hotelInforClick(this_.hotelInfor.index);
                        }
                    
                    }
                }
            });
        },
        //酒店搜索
        async getHotelByCity(type) {
            if(type == 1){
                this.hotelPageNo = 1;
            }
            let data = await getHotelByCity({
                cityid: this.orderCarDate[this.orderCarDateIndex].endCityid,
                date: this.orderCarDate[this.orderCarDateIndex].date,
                pageNo: this.hotelPageNo,
                oneNum: this.oneNum,
                twoNum: this.twoNum,
                threeNum: this.threeNum,
                fourNum: this.fourNum,
                stars: this.stars,
            })
            if(data) {
                this.hotelList = data.list;
                this.hotelPageInit(this.hotelPageNo, data.totalPage);
            }
        },
        //点击添加酒店
        addHotelClick: function (index) {
            if (index > this.orderCarDateIndex) return;
            if (!this.dayVc(this.orderCarDateIndex)) return;
            this.orderCarDateIndex = index;
            this.showFlag = 3;
            this.getHotelByCity(1);
        
        },
        //验证一天的业务数据
        dayVc: function (index = this.orderCarDateIndex) {
            let list = this.orderCarDate[index];
            if (list.cityid == "" || list.cityName == "" || list.serviceid == "" || list.range == "" || list.endCityid == "" || list.endCityName == "") {
                 this.infoMsg("请完善游玩类型");
                return false;
            }
            if (list.range == 1 && list.airNo == "") {
                 this.infoMsg("请完善游玩类型");
                return false;
            }
            return true;
        },
        //酒店验证
        hotelVc: function (index = this.orderCarDateIndex) {
            if (index < this.dayNum - 1) {
                if (!this.orderCarDate[index].hotelInforDetails.length) {
                     this.infoMsg(`请选择酒店`);
                    return false;
                }
                let hotelRoomPeople = 0;
                for (const list of Object.values(this.orderCarDate[index].hotelInforDetails)) {
                    hotelRoomPeople += list.hotelRoomPeople * list.num;
                }
                if (hotelRoomPeople < parseInt(this.adultNum) + parseInt(this.childNum)) {
                     this.infoMsg(`酒店酒店人数不足`);
                    return false;
                }
            }
            return true;
        },
        //选择汽车业务
        serviceClick: function (serviceid, index2) {
            if (this.orderCarDate[this.orderCarDateIndex].serviceIndex == index2) return;
            Vue.set(this.orderCarDate[this.orderCarDateIndex], "serviceid", serviceid);
            Vue.set(this.orderCarDate[this.orderCarDateIndex], "serviceIndex", index2);
            Vue.set(this.orderCarDate[this.orderCarDateIndex], "range", this.carServiceList[index2].range);
            Vue.set(this.orderCarDate[this.orderCarDateIndex], "serviceTitle", this.carServiceList[index2].title);
            //接机和本地游现在都是默认本地城市
            let endCityid  = "";
            let endCityName = "";
            if (this.carServiceList[index2].range != 3) {
                    endCityid = this.orderCarDateIndex > 0 ? this.orderCarDate[this.orderCarDateIndex - 1].cityid : this.startCity;
                    endCityName = this.orderCarDateIndex > 0 ? this.orderCarDate[this.orderCarDateIndex - 1].cityName : this.startCityName;
            }
            if(this.carServiceList[index2].range != 1){
                Vue.set(this.orderCarDate[this.orderCarDateIndex],"airNo","");
            }
            Vue.set(this.orderCarDate[this.orderCarDateIndex], "endCityid", endCityid);
            Vue.set(this.orderCarDate[this.orderCarDateIndex], "endCityName", endCityName);
            this.carServiceInit(this.orderCarDateIndex + 1);
            console.log(this.orderCarDate);
            this.addEndCity();
            this.dayCityChange(this.orderCarDateIndex);
        },
        //添加下一天的开始城市
        addEndCity: function(){
            if(this.orderCarDateIndex >= this.orderCarDate.length - 1){
                return;
            }
            if(this.orderCarDate[this.orderCarDateIndex].endCityid){
                Vue.set(this.orderCarDate[this.orderCarDateIndex + 1], "cityid", this.orderCarDate[this.orderCarDateIndex].endCityid);
            }
            if(this.orderCarDate[this.orderCarDateIndex].endCityName){
                Vue.set(this.orderCarDate[this.orderCarDateIndex + 1], "cityName", this.orderCarDate[this.orderCarDateIndex].endCityName);
            }
        },
        //展示天数下标改变
        orderCarDateIndexChange: function (index) {
            if(this.showFlag > 5){
                return;
            }
            if(this.orderCarDateIndex == index){
                    this.showFlag = 1;
            }else if(this.dayVc(this.orderCarDateIndex) && this.hotelVc(this.orderCarDateIndex) && index > this.orderCarDateIndex){
                    this.orderCarDateIndex = index;
                    this.showFlag = 1;
            }
        },
        //天数初始化
        carServiceInit: function (index = 0) {
            // this.dayNum = parseInt((new Date(this.endDate).getTime() - new Date(this.startDate)) / (24 * 60 * 60 * 1000)) + 1;
            for (let k = index; k < this.dayNum; k++) {
                let map = {};
                map["date"] = dataCountNum(new Date(this.startDate), k);
                map["cityid"] = k == 0 ? this.startCity: '' ;
                map["cityName"] = k == 0 ? this.startCityName: '' ;
                map["endCityid"] = "";
                map["endCityName"] = "";
                map["airNo"] = "";
                map["serviceid"] = "";
                map["range"] = "";
                map["day"] = index + 1;
                Vue.set(map, "hotelInforDetails", []);
                Vue.set(map, "hotelRoomNum", 0);
                Vue.set(map, "hotelRoomPrice", 0);
                Vue.set(this.orderCarDate, k, map);
            }
        },
        //获取车辆业务类型
        async selectCarService() {
            let data = await selectCarService()
            if(data){
                this.carServiceList = data;
            }
        },
        //获取城市景点
        async getCitySpot(cityid = this.startCity) {
            let data = await getCitySpot({
                cityid: cityid,
            })
            if(data){
                let list = data;
                let any = [];
                list.forEach(element => {
                    any.push(element.name);
                });
                this.citySoptString = any.toString();
                console.log(this.citySoptString);
            }
        },
        //获取附近城市
        async getNearbyCity(cityid = this.startCity) {
            let data = await getNearbyCity({
                cityid: cityid,
            })
            if(data){
                this.nearbyCityList = data;
                let list = [];
                this.nearbyCityList.forEach(element => {
                    list.push(element.cityName);
                });
                this.nearbyCityListString = list.toString();
                console.log(this.nearbyCityListString);
            }
        },
    },
}
</script>
<style lang="less" scoped>
.ul-box .btn{
    min-width: 100px;
    height: 40px;
    line-height: 30px;
    margin: 0 5px;
    color: #7d7d7d;
    border-color: #e5e5ec;
    border-radius: 2px;
}
.J-city-wrap2 {
    position: absolute;
    /* left: 40px; */
    z-index: 3001;
    background: #fff;
    width: 350px;
    height: 180px;
    -webkit-box-shadow: 0 1px 2px 0 rgba(0,0,0,.16);
    -moz-box-shadow: 0 1px 2px 0 rgba(0,0,0,.16);
    box-shadow: 0 1px 2px 0 rgba(0,0,0,.16);
}
.J-city-wrap2 .city-list {
    padding: 12px;
    overflow-y: auto;
    height: 145px;
}
.J-city-wrap2 .city-list li {
    width: 25%;
    float: left;
    height: 30px;
    line-height: 30px;
    padding-left: 10px;
    font-size: 12px;
    color: #6e767d;
    letter-spacing: .63px;
    cursor: pointer;
}
</style>
