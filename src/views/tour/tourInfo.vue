<template>
    <div>
        
        <ez-header></ez-header>
        <ez-container></ez-container>

        <!--content-->
        <div class="container ez-container text-darkgray ez-conventional">

            <!--part1 start-->
            <section class="col-md-12 ez-index-wrap ez-custom-search">
                <form class="form-horizontal">
                    <div class="col-md-4 col-sm-4 col-xs-4">
                        <h4 class="ez-mb-md">地点</h4>
                        <div class="form-group">
                            <input class="form-control" :value="'出发地：'+startCityName" readonly>
                        </div>
                        <div class="form-group">
                            <input class="form-control" type="text" :value="'详细地点：'+startAddress" readonly>
                        </div>
                    </div>
                    <div class="col-md-4 col-sm-4 col-xs-4">
                        <h4 class="ez-mb-md">日期</h4>
                        <div class="form-group">
                            <input class="form-control" type="text" :value="'开始日期：'+startDate" readonly>
                        </div>
                        <div class="form-group">
                            <input class="form-control" type="text" :value="'结束日期：'+endDate" readonly>
                        </div>
                    </div>
                    <div class="col-md-4 col-sm-4 col-xs-4">
                        <h4 class="ez-mb-md">人数</h4>
                        <div class="form-group">
                            <input class="form-control" type="text" :value="'人数：'+adultNum+'成人，'+childNum+'小孩，'+bagNum+'行李箱'"
                                readonly>
                        </div>
                    </div>

                    <div class="col-md-12 col-sm-12 col-xs-12">
                        <a class="btn ez-btn-parmary pull-right" @click="goToCar">确认选车</a>
                    </div>
                </form>
            </section>
            <!-- part1 end -->

            <!--part2 start-->
            <section class="col-md-12 ez-custom-result ez-custom-hotel">
                <div class="box-left pull-left">
                    <div class="trip-aside-header">
                        <div class="trip-scroll-content">
                            <div class="trip-scroll-btns">
                                <a href="javascript:;" class="scroll-right"><i class="iconfont icon-next"></i></a>
                                <a href="javascript:;" class="scroll-left"><i class="iconfont icon-prev"></i></a>
                            </div>
                            <div class="trip-scroll-wrap">
                                <div class="trip-scroll-box">
                                    <ul>
                                        <li v-for="(day, index) in dayList" :key="index" @click.stop="dayIndexLeftClick(index)"
                                            :class="{'active':dayIndexLeft==index}">
                                            <a>{{day}}日游</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="trip-aside-content">
                        <!--一日游-->
                        <div class="trip-aside-tabpane active" style="overflow: hidden;">


                            <div class="trip-aside-card" v-for="(list, index) in dayDataList" :key="index">
                                <div class="trip-aside-img">
                                    <img :src="list.img">
                                    <span class="trip-card-add" title="添加" @click.stop="addMould(list)" v-if="showFlag == 0">
                                        <i class="iconfont icon-addition_fill text-orange"></i>
                                    </span>
                                </div>
                                <div class="trip-aside-text">
                                    <h4 class="title text-bold ez-mb-sm">{{list.name}}</h4>
                                    <p class="content text-gray">
                                        <i class="iconfont icon-mark"> {{list.cityNum}}个城市，{{list.scenicNum}}个景点</i>
                                    </p>
                                </div>
                            </div>

                            <div class="trip-aside-page text-center">
                                 <a class="btn ez-btn-default" :class="{'active':pageNo > 1}" @click.stop="pageClick(-1)">上一页</a>
                                 <a class="btn ez-btn-default" :class="{'active':pageNo < totalPage}" @click.stop="pageClick(1)">下一页</a>
                            </div>
                        </div>

                    </div>


                </div>
                <div class="box-right ez-trip-body pull-right">

                    <!-- 添加的天数列表 -->
                    <div class="trip-header" v-if="showFlag != 6 && showFlag != 7 && showFlag != 9">
                        <div class="trip-title">
                            <span class="title text-bold pull-left">行程制定</span>(只能修改、删除最后一天数据)
                            <span class="pull-right">
                                <a class="btn text-blue" @click.stop="addDay"><i class="iconfont icon-addition_fill"></i></a>添加一天
                            </span>
                        </div>

                        <div class="ez-scroll-content">
                            <div class="scroll-btns">
                                <a href="javascript:;" class="scroll-right"><i class="iconfont icon-next"></i></a>
                                <a href="javascript:;" class="scroll-left"><i class="iconfont icon-prev"></i></a>
                            </div>
                            <div class="scroll-wrap">
                                <div class="scroll-box">
                                    <ul>
                                        <li v-for="(item, index) in travelInfor" :key="index" @click.stop="dayIndexRightClick(index)">
                                            <a>
                                                <img :src="item.travelDetails[0].cityImg">
                                                <span class="iconfont icon-close scroll-remove" @click.stop="delDay(index)"></span>
                                                <span class="intro">第{{item.day}}天</span>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!--行程列表-->
                    <div class="trip-wrap pull-left" v-for="(travel, index1) in travelInfor" :key="index1" :class="{'active':dayIndexRight==index1}"
                        v-if="showFlag == 0">
                        <div class="trip-top pull-left">
                            <span class="pull-left">第{{travel.day}}天</span>
                            <span class="pull-right">
                                <a class="btn text-blue" @click="addCityClick(index1)"><i class="iconfont icon-addition_fill"></i></a>
                                添加城市
                            </span>
                        </div>

                        <div class="trip-main" v-for="(list, index2) in travel.travelDetails" :key="index2">
                            <div class="trip-city">
                                <div class="trip-city-img pull-left"><img :src="list.cityImg"></div>
                                <div class="trip-city-text pull-left">
                                    <h4 class="ez-mb-md">{{list.cityName}}
                                        <a class="btn" @click.stop="delDayCity(index1,index2)">
                                            <i class="iconfont icon-cuowu trip-city-remove"></i>
                                        </a>
                                    </h4>
                                    <h5>
                                        <span class="ez-mr-sm" @click.stop="scenicSpotClick1(index1,index2)" v-if="orderType != 2">
                                            <a class="btn text-blue"><i class="iconfont icon-addition_fill"></i></a>添加景点
                                        </span>
                                        <span @click.stop="scenicSpotClick2(index1,index2)" v-if="orderType != 1">
                                            <a class="btn text-blue"><i class="iconfont icon-addition_fill"></i></a>添加商务行程
                                        </span>
                                    </h5>
                                </div>
                            </div>
                            <ul class="text-lightgray trip-list" v-for="(item, index3) in list.scenicSpot" :key="index3">
                                <li>
                                    <a class="btn"><i class="iconfont icon-tool"></i></a>{{item.busiInfo}}
                                    <a class="btn pull-right" @click="delTrip(index1,index2,index3)">
                                        <i class="iconfont icon-cuowu trip-city-remove"></i>
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <div class="trip-main">
                            <div>
                                <a class="btn text-blue">
                                    <i class="iconfont icon-addition_fill" @click.stop="addHotelClick(index1)"></i>
                                </a>添加酒店
                            </div>
                            <ul class="text-lightgray trip-list">
                                <li v-for="(list, index) in travel.hotelInforDetails" :key="index">
                                    <a class="btn"><i class="iconfont icon-tool"></i>
                                    </a>{{list.hotelName}},{{list.hotelRoomName}},{{currencySign}}{{list.price}}*{{list.num}}
                                    <a class="btn pull-right" @click="delHootelRoom(index,index1)"><i class="iconfont icon-cuowu trip-city-remove"
                                            @></i></a>
                                </li>
                            </ul>
                        </div>

                        <div class="trip-bottom">
                            <div>
                                <span class="pull-right">
                                    <a class="btn text-lightgray"><i class="iconfont icon-qiche"></i></a>
                                    共150公里，{{travel.dayDate | dayDateByHour}}
                                </span>
                            </div>
                        </div>

                    </div>

                    <!-- 选择城市和目的地-->
                    <div class="trip-city-add" v-if="showFlag == 1">
                        <h4 class="title text-bold">选择城市和目的地</h4>
                        <div class="trip-city-content">
                            <div class="col-lg-10 col-md-10 col-sm-10 trip-city-search">
                                <div class="col-lg-5 col-md-5 col-sm-5">
                                    <input class="form-control" type="text" v-model.trim="citySearchContent"
                                        placeholder="输入搜索城市">
                                </div>
                                <div class="col-lg-5 col-md-5 col-sm-5 ez-group-btns">
                                    <a class="btn active" @click.stop="getCityData()">确定</a>
                                    <a class="btn" @click.stop="cancelAdd">取消</a>
                                </div>
                            </div>
                            <ul class="col-lg-10 col-md-10 col-sm-10">
                                <li class="col-lg-5 col-md-5 col-sm-5" v-for="(list, index) in cityListShow" :key="index"
                                    @click.stop="getCityInfo(list.cityid)">
                                    <div class="form-control">{{list.cityName}}
                                        <i class="iconfont icon-addition_fill text-blue" @click.stop="addCitySure(index)"></i>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <!-- 城市详情-->
                    <div class="trip-city-intro" v-if="showFlag == 1 && cityInfoShow">
                        <div class="trip-city-img pull-left">
                            <img :src="cityInfo.photoUrl | splitVc(0) | defImg" class="center-block img-responsive">
                        </div>
                        <div class="trip-city-text pull-right">
                            <h4 class="title text-bold">{{cityInfo.cityName}}<span>（{{cityInfo.cityRemark}}）</span></h4>
                            <div class="content">{{cityInfo.cityDetails}}</div>
                        </div>

                    </div>

                    <!-- 选择景点 -->
                    <div class="trip-city-add" v-if="showFlag == 8">
                        <h4 class="title text-bold">选择景点</h4>
                        <div class="trip-city-content">
                            <div class="col-lg-10 col-md-10 col-sm-10 trip-city-search">
                                <div class="col-lg-5 col-md-5 col-sm-5">
                                    <input class="form-control" type="text" value="" placeholder="输入搜索景点">
                                </div>
                                <div class="col-lg-5 col-md-5 col-sm-5 ez-group-btns">
                                    <a class="btn active">确定</a>
                                    <a class="btn" @click.stop="cancelAdd">取消</a>
                                </div>
                            </div>
                            <ul class="col-lg-10 col-md-10 col-sm-10">
                                <li class="col-lg-5 col-md-5 col-sm-5" v-for="(scenicSpot, index) in scenicSpotList"
                                    :key="index" @click.stop="scenicSpotClick(scenicSpot.id)">
                                    <div class="form-control">{{scenicSpot.name}}
                                        <i class="iconfont icon-addition_fill text-blue" @click.stop="scenicSpotAdd(scenicSpot)"></i></div>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <!-- 景点详情 -->
                    <div class="trip-city-intro" v-if="showFlag == 8 && scenicSpotInfo">
                        <div class="trip-city-img pull-left">
                            <img :src="scenicSpotInfo.imgUrl |splitVc(0) | defImg" class="center-block img-responsive">
                        </div>
                        <div class="trip-city-text pull-right">
                            <h4 class="title text-bold">{{scenicSpotInfo.name}}</h4>
                            <ul class="city-scenic text-gray">
                                <li><i class="iconfont icon-mark"></i>地址：{{scenicSpotInfo.address}}</li>
                                <li><i class="iconfont icon-shijian"></i>建议游玩时间：{{scenicSpotInfo.playerTime}}分钟</li>
                                <li><i class="iconfont icon-shuye"></i>最佳游玩时间：{{scenicSpotInfo.season}}</li>
                                <li><i class="iconfont icon-ticket"></i>门票价格：{{currencySign}}{{scenicSpotInfo.price}}</li>
                            </ul>
                        </div>
                        <div class="trip-city-scenic pull-left">
                            <div class="content">{{scenicSpotInfo.content}}</div>
                        </div>

                    </div>

                    <!-- 添加商务行程 -->
                    <div class="trip-city-add" v-show="showFlag == 2">
                        <h4 class="title text-bold">添加商务行程</h4>
                        <div class="business-trip-content">
                            <form class="form-horizontal business-trip-form">
                                <div class="form-group">
                                    <label class="control-label">详细地址：</label>
                                    <div class="col-lg-5 col-md-5 col-sm-5">
                                        <el-input
                                        placeholder="输入详细地址"
                                        v-model.trim="address"
                                        clearable>
                                        </el-input>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="control-label">开始时间：</label>
                                    <div class="col-lg-5 col-md-5 col-sm-5">
                                        <el-time-select
                                            placeholder="请选择开始时间"
                                            v-model="tripStartDate"
                                            :picker-options="{
                                                  maxTime: tripEndDate,
                                                  start: '08:30',
                                                  end: '18:30',
                                                  step: '00:15',
                                            }">
                                        </el-time-select>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="control-label">结束时间：</label>
                                    <div class="col-lg-5 col-md-5 col-sm-5">
                                        <!-- <input class="form-control" type="text" v-model="tripEndDate" readonly id="tripEndDate"
                                            placeholder="请选择结束时间"> -->
                                            <el-time-select
                                                placeholder="请选择结束时间"
                                                v-model="tripEndDate"
                                                :picker-options="{
                                                    minTime: tripStartDate,
                                                    start: '08:30',
                                                    end: '18:30',
                                                    step: '00:15',
                                                }">
                                            </el-time-select>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="control-label">商务定制项目：</label>
                                    <div class="col-lg-10 col-md-10 col-sm-10">
                                        <ul class="list-inline business-trip-list">
                                            <li v-for="(tag, index) in tagList" :key="index" @click.stop="tagClick(index)">
                                                <a class="btn btn-md ez-btn-default" :class="{'active':tag.flag}">{{tag.content}}</a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="control-label">出游人数：</label>
                                    <div class="col-lg-10 col-md-10 col-sm-10 ez-group-count">
                                        <span class="counter-label">成人</span>
                                        <div class="ez-counter ez-mr-50">
                                             <el-input-number v-model="tripAdultNum" :step="1"  :max="adultNum" :min="0" ></el-input-number>
                                        </div>

                                        <span class="counter-label counter-label-left">儿童</span>
                                        <div class="ez-counter">
                                             <el-input-number v-model="tripChildNum" :step="1" :max="childNum" :min="0" ></el-input-number>
                                        </div>

                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="control-label">详细：</label>
                                    <div class="col-lg-10 col-md-10 col-sm-10">
                                        <el-input
                                        type="textarea"
                                        :autosize="{ minRows: 5}"
                                        placeholder="请输入详细内容"
                                        v-model.trim="infor">
                                        </el-input>
                                    </div>
                                </div>

                                <div class="form-group text-center">
                                    <div class="ez-group-btns">
                                        <a class="btn active" @click.stop="addTrip">确定</a>
                                        <a class="btn" @click.stop="cancelAdd">取消</a>
                                    </div>
                                </div>

                            </form>


                        </div>
                    </div>

                    <!-- 添加酒店 -->
                    <div class="box-right ez-trip-body pull-right ez-travel-hotel" v-if="showFlag == 3 || showFlag == 4 || showFlag == 5">
                        <div class="trip-header">
                            <div class="trip-title">
                                <span class="title text-bold pull-left">选择酒店</span>
                            </div>
                        </div>

                        <!-- 选择酒店 -->
                        <div class="hotel-from col-md-12 ez-mb-md">
                            <span class="hotel-label pull-left">选择酒店</span>
                            <ul class="list-inline pull-left hotel-start ez_public_list">
                                <li :class="{active:stars==1}" @click="starsClick(1)">
                                    <a class="btn"><i class="iconfont icon-touzi text-blue"></i></a>
                                </li>
                                <li :class="{active:stars==2}" @click="starsClick(2)">
                                    <a class="btn"><i class="iconfont icon-touzi1 text-blue"></i></a>
                                </li>
                                <li :class="{active:stars==3}" @click="starsClick(3)">
                                    <a class="btn"><i class="iconfont icon-touzi2 text-blue"></i></a>
                                </li>
                                <li :class="{active:stars==4}" @click="starsClick(4)">
                                    <a class="btn"><i class="iconfont icon-touzi3 text-blue"></i></a>
                                </li>
                                <li :class="{active:stars==5}" @click="starsClick(5)">
                                    <a class="btn"><i class="iconfont icon-touzisvg text-blue"></i></a>
                                </li>
                            </ul>
                            <div class="ez-group-btns">
                                <!-- <a class="btn active" @click.stop="getHotelByCity(1)">搜索</a> -->
                                <a class="btn" @click.stop="cancelAdd">返回行程列表</a>
                                <a class="btn" @click.stop="backHotel" v-if="showFlag == 4 || showFlag == 5">返回酒店列表</a>
                                <!-- <a class="btn" @click.stop="backHotelRoom" v-if="showFlag == 5">返回酒店房间列表</a> -->
                            </div>
                        </div>

                        <div class="hotel-from col-md-12 ez-mb-md">
                            <span class="hotel-label pull-left">房间类型</span>
                            <ul class="list-inline pull-left room-style">
                                <li>
                                    <div class="pull-left">
                                        <i class="iconfont icon-ren"></i>
                                    </div>
                                    <select class="form-control" v-model="oneNum" @change="getHotelByCity(1)">
                                        <option>0</option>
                                        <option>1</option>
                                        <option>2</option>
                                    </select>
                                </li>
                                <li>
                                    <div class="pull-left">
                                        <i class="iconfont icon-ren"></i>
                                        <i class="iconfont icon-ren"></i>
                                    </div>
                                    <select class="form-control" v-model="twoNum" @change="getHotelByCity(1)">
                                        <option>0</option>
                                        <option>1</option>
                                        <option>2</option>
                                    </select>
                                </li>
                                <li>
                                    <div class="pull-left">
                                        <i class="iconfont icon-ren"></i>
                                        <i class="iconfont icon-ren"></i>
                                        <i class="iconfont icon-ren"></i>
                                    </div>
                                    <select class="form-control" v-model="threeNum" @change="getHotelByCity(1)">
                                        <option>0</option>
                                        <option>1</option>
                                        <option>2</option>
                                    </select>
                                </li>
                                <li>
                                    <div class="pull-left">
                                        <i class="iconfont icon-ren"></i>
                                        <i class="iconfont icon-ren"></i>
                                        <i class="iconfont icon-ren"></i>
                                        <i class="iconfont icon-ren"></i>
                                    </div>
                                    <select class="form-control" v-model="fourNum" @change="getHotelByCity(1)">
                                        <option>0</option>
                                        <option>1</option>
                                        <option>2</option>
                                    </select>
                                </li>
                            </ul>
                        </div>

                        <div class="hotel-card-content col-md-12" v-if="showFlag == 3">
                            <div class="hotel-card" v-for="(list, index) in hotelList" :key="index" @click="hotelInforClick(index)">
                                <div class="hotel-card-img pull-left">
                                    <img :src="list.imgUrl | defImg">
                                </div>
                                <div class="hotel-card-text pull-left">
                                    <h4 class="title text-bold">{{list.name}}</h4>
                                    <p class="ez-mb-sm">
                                        <i class="iconfont icon-touzisvg text-blue ez-mr-sm"></i>{{list.level}}星级酒店
                                    </p>
                                    <p class="ez-mb-sm">{{list.address}}</p>
                                </div>
                                <div class="hotel-card-right text-orange">
                                    <span class="text-bold">{{currencySign}}{{list.price}}</span>起
                                </div>
                            </div>
                        </div>

                        <div class="travel-content-main-list" v-if="showFlag == 4 || showFlag == 5">
                            <ul>
                                <li @click="hotelInforClick(hotelInfor.index)">
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
                                    <li v-for="(list, index) in travelInfor[addCityClickIndex].hotelInforDetails" :key="index">
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

                        <nav class="text-center col-lg-12 col-md-12 col-sm-12" v-show="show" v-if="showFlag == 3 || showFlag == 4">
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

                        <div class="bo_5 overflow lis ma1" style="clear: both;">
                            <ul>
                                <li class="fu bao_b_g ma14 hootRoomChoice" @click.stop="hootRoomChoiceClick">
                                    <div class="beisen fff right_aaa mars">{{travelInfor[addCityClickIndex].hotelRoomNum}}</div>
                                </li>
                                <li class="fu1">
                                    <button class="btn btn-primary">{{currencySign}}{{travelInfor[addCityClickIndex].hotelRoomPrice}}</button>
                                </li>
                            </ul>
                        </div>

                        <!-- part2 end -->
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

                    <!-- 添加车辆 -->
                    <div class="ez-travel-car travel-content-main" v-show="showFlag == 6 || showFlag == 7">
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
                                                <div id="commonPage2" class="travel-content-main-list-paging pagination "></div>
                                            </div>
                                        </div>
                                        <div id="commonPage1" class="travel-content-main-list-paging pagination "></div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div id="carPage" class="travel-content-main-list-paging pagination" v-if="showFlag == 6"></div>

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
                    <div class="ez-travel-hotel" v-if="showFlag == 7">
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
                    <div class="travel-content-main ez-travel-tourguide" v-if="showFlag == 9">
                        <div class="travel-content-main-title">
                            选择导游
                        </div>
                        <div class="travel-content-main-search">
                            <div class="travel-content-main-search-type">
                                <label>选择导游{{guideType}}</label>
                                <ul>
                                    <li><input type="radio" value="2" v-model="guideType" @change="getGuide(1)">导游</li>
                                    <li><input type="radio" value="3" v-model="guideType" @change="getGuide(1)">司机兼导游</li>
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
                                    <input type="radio" v-model="guideid" :value="list.guideid">
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
                        <div id="getGuidePage" class="travel-content-main-list-paging pagination "></div>
                    </div>


                </div>
            </section>


            <div class="ez-custom-bottom">
                <p class="ez-price text-orange text-right"><span>{{currencySign}}</span>{{orderPrice}}</p>
                <div class="pull-right" v-if="showFlag == 0 || showFlag == 6 || showFlag == 9">
                    <a class="btn btn-lg" href="" target="_blank">地图预览</a>
                    <a class="btn btn-lg">保存草稿</a>
                    <a class="btn btn-lg active" @click="goToCar" v-if="showFlag == 0">选车</a>
                    <a class="btn btn-lg active" @click="orderSure(2)" v-if="showFlag == 6 && orderType != 2">选择导游</a>
                    <a class="btn btn-lg active" @click="orderSure(1)" v-if="showFlag == 6 && orderType ==2">确定订单</a>
                    <a class="btn btn-lg active" @click="guideSure()" v-if=" showFlag == 9">确定订单</a>
                </div>
            </div>
            <!-- part2 end -->
            <div class="ez-nav-tabs ez-custom-tabs">
                <!-- Nav tabs -->
                <ul class="tab-list list-inline">
                    <li class="active"><a>注意事项</a></li>
                    <li><a>列表自定</a></li>
                    <li><a>列表自定2</a></li>
                </ul>
                <!-- Tab panes -->
                <div class="tab-content">
                    <div class="tab-pane active ez-custom-pane">
                        <h4 class="text-black title">客栈介绍</h4>
                        <p class="content">2013年开业 2014年装修 15间房 电话--18887243551
                            “像家一样”是朵家无论大理的客栈还是成都的咖啡馆，始终也是唯一不变的追求，多年海内外自助旅行，
                            住过无数各色各异的客栈民宿和酒店，我明白旅行在外的人身体最需要的栖息地是究竟。
                            00.8米大床房3间，
                            1.2米双床榻榻米2间. 全部独立卫浴。免费无限网络覆盖，空间开敞的室内公共休闲区，精致的院落。
                            客房内配套实木或铁艺家具，60支纱埃及棉高档床品，亚 麻窗帘，实木地板，全身镜，吹风筒，妇洗器，品牌卫浴。
                            室内禁烟以及不提供一次性用具。
                        </p>
                    </div>
                    <div class="tab-pane ez-custom-pane">
                        <h4 class="text-black title">客栈介绍2</h4>
                        <p class="content">2014年开业 2014年装修 15间房 电话--18887243551
                            “像家一样”是朵家无论大理的客栈还是成都的咖啡馆，始终也是唯一不变的追求，多年海内外自助旅行，
                            住过无数各色各异的客栈民宿和酒店，我明白旅行在外的人身体最需要的栖息地是究竟。
                            朵家，位于大理古城人民路下段洱海门外侧，交通便利，好停车。共有1.8米大床房3间，
                            1.2米双床榻榻米2间. 全部独立卫浴。免费无限网络覆盖，空间开敞的室内公共休闲区，精致的院落。
                        </p>
                    </div>
                    <div class="tab-pane ez-custom-pane">
                        <h4 class="text-black title">客栈介绍3</h4>
                        <p class="content">2015年开业 2014年装修 15间房 电话--18887243551
                            “像家一样”是朵家无论大理的客栈还是成都的咖啡馆，始终也是唯一不变的追求，多年海内外自助旅行，
                            住过无数各色各异的客栈民宿和酒店，我明白旅行在外的人身体最需要的栖息地是究竟。
                            朵家，位于大理古城人民路下段洱海门外侧，交通便利，好停车。共有1.8米大床房3间，
                            1.2米双床榻榻米2间. 全部独立卫浴。免费无限网络覆盖，空间开敞的室内公共休闲区，精致的院落。
                            客房内配套实木或铁艺家具，60支纱埃及棉高档床品，亚 麻窗帘，实木地板，全身镜，吹风筒，妇洗器，品牌卫浴。
                        </p>
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

        <ez-footer></ez-footer>
        <ez-aside></ez-aside>

    </div>
</template>
<script>
import ezHeader from "components/home/ezHeader"
import ezContainer from "components/home/ezContainer"
import ezFooter from "components/home/ezFooter"
import ezAside from "components/home/ezAside"
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'
import { dataCountNum } from 'utils/common'
import {
    getTravelDetails,
    refundInfor,
    getGuideLabel,
    getGuideByCity,
    addChildComment,
    digComment,
    getHotCity,
    getChildComment,
    selectComment,
    getCarByCity,
    getHotelRoomDetails,
    getHotelRoom,
    getHotelByCity,
    getLabel,
    getScenic,
    getCity,
    getCityByTitle,
    getCityDetails,
    getTravelByDay,
    getTravelDay,
    getScenicByTitle,
} from 'getData'
export default {
    name: "tourInfo",
    data() {
        return {
            // dayNum: "",  //天数
            dayList: [], //旅游定制的天数列表(left)
            dayIndexLeft: 0,  //选中的天数下标(left)
            dayDataList: [],//旅游定制的天数详情（left）
            pageNo: 1, //页码（left）
            totalPage: 1, //总页数（left）
            travelInfor: [],  //行程信息
            dayIndexRight: 0,  //选中的天数下标(right)
            addCityClickIndex: "",  //点击添加城市/添加商务行程/添加酒店的下标
            addScenicSpotIndex: "",  //点击商务行程城市下标/添加酒店的cityId
            showFlag: 0,  //0 行程信息 1 城市  2 商务行程  3 酒店列表  4酒店房间列表  5已选择酒店列表  6车辆列表  7已选择的车辆信息  8选择景点 9 选择导游
            cityInfoShow: false,  //是否显示城市详情
            citySearchContent: "", //搜索内容
            cityList: [],  //城市列表
            hotCityList: [], //热门目的地列表
            cityInfo: {},  //城市详情
            address: "",  //行程详细地址
            tripStartDate: "",  //行程开始时间
            tripEndDate: "", //行程结束时间
            tripAdultNum: 0,  //行程成人数量
            tripChildNum: 0,  //行程儿童数量
            infor: "",  //添加景点行程详情
            tagList: [], //标签属性
            hotelPageNo: 1,  //酒店列表页数
            hotelRoomPageNo: 1,  //酒店列表页数
            pages: 1,  //总页数
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
            scenicSpotList: [],  //景点列表
            scenicSpotInfo: "",   //景点详情
            guideType: 2,//导游类型1.当地玩家2.定制旅游-导游3.定制旅游-司兼导4.包车/租车-导游5.包车/租车-司兼导
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
    components: {
        ezHeader,
        ezContainer,
        ezFooter,
        ezAside,
    },
    watch: {
        guideid: function () {
            for (const guide of Object.values(this.guideList)) {
                if (guide.guideid == this.guideid) {
                    this.guideInfo = guide;
                    return;
                }
            }
        },
    },
    computed: {
        ...mapState("tour",["orderType","startCity","startCityName","startAddress","startDate","endDate","adultNum","childNum","bagNum"]),
        ...mapState(["loginType","currencySign"]),
        ...mapGetters("tour",["dayNum"]),
        orderPrice: function () {  //订单价格
            let price = 0;
            for (const travel of Object.values(this.travelInfor)) {
                //酒店
                for (const hotelInfo of Object.values(travel.hotelInforDetails)) {
                    price += parseFloat(hotelInfo.price) * parseInt(hotelInfo.num);
                }
                //景点
                for (const iterator of Object.values(travel.travelDetails)) {
                    for (const list of Object.values(iterator.scenicSpot)) {
                        if (list.type == 1) {
                            price += parseFloat(list.price) * this.dayNum;
                        }
                    }
                }
            }
            //车辆
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
        current_page: function () {  //分页控件当前页
            if (this.showFlag == 3) return this.hotelPageNo;
            if (this.showFlag == 4) return this.hotelRoomPageNo;
            return 1;
        },
        endDayNum: function () {  //添加的天数
            return this.travelInfor.length;
        },
        endCityNum: function () { //最后一天的城市长度
            return this.travelInfor[this.endDayNum - 1].travelDetails.length;
        },
        endCityid: function () {  //最后一天最后一个城市ID
            return this.travelInfor[this.endDayNum - 1].travelDetails[this.endCityNum - 1].cityid;
        },
        cityListShow: function () { //显示的城市列表
            return this.cityList.length > 0 ? this.cityList : this.hotCityList;
        },
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
            let nowAy = this.indexs;
            return nowAy[nowAy.length - 1] != this.pages;
        },
        indexs: function () {
            let left = 1,
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
    created() {
        this.getDay();
        this.getTravelDay();
        this.getHotCity();
        this.getLabel();
        this.getLAbleData();
        this.getGuide();
    },
    methods: {
        ...mapMutations(["loginFlagChange"]),
        ...mapMutations("tour",["stateChange"]),
        //点击添加模板
        async addMould(list) {
            if(this.orderType == 2){
                this.infoMsg("商务定制暂时不能添加模板");  
                return;
            }
            if(list.dayNum > this.dayNum - this.endDayNum){
                this.infoMsg("模板天数大于剩余天数");  
                return;
            }
            if (!this.dayVc()) return;

            let data = await getTravelDetails({
                travelid:list.id
            })
            if(data){
                this.mouldSure(data);
            }
        },
        //添加模板
        mouldSure:function(mould){
            debugger;
            for (const list of Object.values(mould)) {
                let travelInfor = {};
                Vue.set(travelInfor, "day", this.endDayNum + 1);
                Vue.set(travelInfor, "date", dataCountNum(this.startDate, this.endDayNum));
                Vue.set(travelInfor, "travelDetails",list.travelDetails);
                Vue.set(travelInfor, "hotelInforDetails", []);
                Vue.set(travelInfor, "hotelRoomNum", 0);
                Vue.set(travelInfor, "hotelRoomPrice", 0);
                Vue.set(travelInfor, "dayRange", 0);
                Vue.set(travelInfor, "dayDate", 0);
                this.travelInfor.push(travelInfor);
                this.getCityDetails(this.travelInfor[this.endDayNum - 1].travelDetails[this.endCityNum - 1].cityid, this.endDayNum - 1, 0);
                setTimeout(()=>{this.moveBox()}, 100);
                this.dayIndexRightClick(this.endDayNum - 1);
                this.computeDayDate(this.endDayNum - 1);
            }
        },
        //确定订单跳转页面
        goToSureOrder: function () {
            this.stateChange({
                addCarList: this.addCarList, //选择的车辆信息
                travelInfor: this.travelInfor, //行程信息
                guideInfo: this.guideInfo, //导游详情
                guideType: this.guideType, //导游类型
            })
            this.$router.push("tourSure");
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
                productType: 8,  //1.包车租车2.短程接送3.接送机4常规路线5.当地参团6.游轮7.景点门票8.当地玩家9.酒店10.保险
                productid: guide,
            })
            if(data){
                let refundMsg = "";
                for (const iterator of Object.values(data)) {
                    refundMsg += `订单确认后，提前${iterator.refundDay}天退单，返回${iterator.refundNum}%;<br/>`;
                }
                layer.tips(refundMsg, '#' + e.target.id, {
                    tips: [1, '#3595CC'],
                    maxWidth: 280,
                    time: 4000
                });
            }
        },
        //获取玩家擅长属性
        async getLAbleData() {
            let data = await getGuideLabel({})
            if(data){
                this.comTagList = data;
            }
        },
        //确定订单  -- 选择车辆
        orderSure: function (type) {
            let dayDate = 0;
            let dayRange = 0;
            for (const travel of Object.values(this.travelInfor)) {
                dayDate += travel.dayDate;
                dayRange += travel.dayRange;
            }
            let seatNum = 0;
            let bagNum = 0;
            for (const car of Object.values(this.addCarList)) {
                seatNum += car.seatNum;
                bagNum += car.bagNum;
                Vue.set(car, "dayDate", dayDate);
                Vue.set(car, "dayRange", dayRange);
            }
            if (seatNum < this.adultNum + this.childNum) {
                this.infoMsg("车辆座位数不够"); return;
            }
            if (bagNum < this.bagNum) {
                this.infoMsg("车辆行李空间不够"); return;
            }
            if (type == 1) {
                this.goToSureOrder();
            } else {
                this.showFlag = 9;
                this.getGuide(1, 1);
            }
        },
        //导游列表初始化分页
        getGuidePage: function (pages) {
            let _this = this;
            $('#getGuidePage').jqPaginator({
                totalPages: pages,
                visiblePages: 6,
                currentPage: 1,
                onPageChange: function (num, type) {
                    if(type == "change"){
                        _this.getGuide(2, num);
                    }
                }
            });
        },
        //获取导游信息
        async getGuide(type = 1, pageNo = 1) {
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
            if(data){
                this.guideList = data.list;
                if (type == 1) {
                    this.getGuidePage(data.totalPage);
                }
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
                        map["carType"] = 4;
                        map["carName"] = car.carName;
                        map["carPrice"] = car.price;
                        map["carImg"] = car.carImg;
                        map["seatNum"] = car.seatNum;
                        map["bagNum"] = car.bagNum;
                        map["comfort"] = car.comfort;
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
        async digComment(id, index1, index2) {
            if(this.loginType == 1){
                this.loginFlagChange(1);
                return;
            }
            let data = await digComment({
                typeId: id,
                digType: 1,
            })
            if(data){
                if (data) {
                    Vue.set(this.carList[index1].commentList[index2], "commentList", this.carList[index1].commentList[index2].digNum++);
                    this.successMsg("点赞成功");
                } else {
                    Vue.set(this.carList[index1].commentList[index2], "commentList", this.carList[index1].commentList[index2].digNum--);
                    this.successMsg("取消点赞成功");
                }
            }
        },
        //初始化二级评论分页
        commonPage2: function () {
            let _this = this;
            $('#commonPage2').jqPaginator({
                totalPages: this.carList[this.commonIndex1].commentList[app.commonIndex2].pages,
                visiblePages: 6,
                currentPage: 1,
                onPageChange: function (num, type) {
                    if(type == "change"){
                        _this.getChildComment(2, num);
                    }
                }
            });
        },
        //获取子评论列表
        async getChildComment(type, pageNo) {
            let data = getChildComment({
                commentid: this.carList[this.commonIndex1].commentList[this.commonIndex2].commentid,
                pageNo: pageNo,
            })
            if(data){
                Vue.set(this.carList[this.commonIndex1].commentList[this.commonIndex2], "commentList", data.list);
                Vue.set(this.carList[this.commonIndex1].commentList[this.commonIndex2], "pages", data.totalPage);
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
            let _this = thisl
            $('#commonPage1').jqPaginator({
                totalPages: this.carList[this.commonIndex1].pages,
                visiblePages: 6,
                currentPage: 1,
                onPageChange: function (num, type) {
                    if(type == "change"){
                        _this.selectComment(2, num);
                    }
                }
            });
        },
        //获取一级评论列表
        async selectComment(type, pageNo = 1) {
            let data = await({
                pageNo: pageNo,
                typeid: this.carList[this.commonIndex1].id,
                proType: 1,  //1.包车租车2.短程接送3.接送机4常规路线5.当地参团6.游轮7.景点门票
                //8.当地玩家9.酒店10.保险11.旅游定制12导游 13.攻略评论 14.城市评论',
            })
            if(data){
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
            if (data) {
                let refundMsg = "";
                for (const iterator of Object.values(data)) {
                    refundMsg += `订单确认后，提前${iterator.refundDay}天退单，返回${iterator.refundNum}%;<br/>`;
                }
                this.refundTips(refundMsg, e);
            }
        },
        //车辆列表分页
        carPage: function (totalPage) {
            let _this = this;
            $('#carPage').jqPaginator({
                totalPages: totalPage,
                visiblePages: 6,
                currentPage: 1,
                onPageChange: function (num, type) {
                    if(type == "change"){
                        _this.getCarByCity(2, num);
                    }
                }
            });
        },
        //获取车辆信息
        async getCarByCity(type, pageNo = 1) {
            this.showFlag = 6;
            let data = await getCarByCity({
                cityid: this.startCity,
                carType: 4,
                startDate: this.startDate,
                endDate: this.endDate,
                comfort: this.comfort,  //车辆等级
                seatNum: this.seatNum,  //座位数
                pageNo: pageNo,
            })
            if(data){
                let carList = data.list;
                for (const car of Object.values(carList)) {
                    for (const carid of Object.values(this.addCarList)) {
                        if (carid.carid == car.id) {
                            car["carShow"] = true;
                        }
                    }
                }
                this.carList = carList;
                if (type == 1) {
                    this.carPage(data.totalPage);
                }
            }
        },
        //点击选车
        goToCar: function () {
            if (this.endDayNum < this.dayNum) {
                this.infoMsg("天数少于选择日期天数"); return;
            }
            if (!this.dayVc()) return;
            if (!this.hotelVc()) return;
            this.showFlag = 6;
            this.getCarByCity(1);
        },
        //计算行驶距离   index:天数下标
        computeDayRange: function (index) {

        },
        //计算时间    index:天数下标
        computeDayDate: function (index = this.addCityClickIndex) {
            let minute = 0;
            for (const iterator of Object.values(this.travelInfor[index].travelDetails)) {
                for (const list of Object.values(iterator.scenicSpot)) {
                    if (list.type == 1) {   //景点
                        minute += parseInt(list.playerTime);
                    } else if (list.type == 2) {  //商务
                        let startDate = new Date(list.startDate).getTime();
                        let endDate = new Date(list.endDate).getTime();
                        minute += ((endDate - startDate) / 1000 / 60);
                    }
                }
            }
            Vue.set(this.travelInfor[index], "dayDate", minute);
            console.log(minute);
        },
        //酒店验证
        hotelVc: function () {
            for (const [index, travel] of Object.entries(this.travelInfor)) {
                if (index < this.dayNum - 1) {
                    if (!travel.hotelInforDetails.length) {
                        this.infoMsg(`第${1 + parseInt(index)}天请选择酒店`);
                        return false;
                    }
                    let hotelRoomPeople = 0;
                    for (const list of Object.values(travel.hotelInforDetails)) {
                        hotelRoomPeople += list.hotelRoomPeople * list.num;
                    }
                    if (hotelRoomPeople < parseInt(this.adultNum) + parseInt(this.childNum)) {
                        this.infoMsg(`第${1 + parseInt(index)}天酒店酒店人数不足`);
                        return false;
                    }
                }
            }
            return true;
        },
        //天数数据验证
        dayVc: function (index = this.endDayNum - 1) {
            //验证行程信息
            for (const list of Object.values(this.travelInfor[index].travelDetails)) {
                if (!list.scenicSpot.length) {
                    this.infoMsg("城市下面最少添加一个行程信息");
                    return false;
                }
            }
            if (this.travelInfor[index].dayRange > 150) {
                this.infoMsg("距离大于150公里");
                return false;
            }
            if (this.travelInfor[index].dayDate > 600) {
                this.infoMsg("时间超过10小时");
                return false;
            }
            return true;
        },
        //删除天数
        delDay: function (index) {
            if (index == 0) { this.infoMsg("第一天不能删除"); return; }
            if (index != this.endDayNum - 1) { this.infoMsg("只能删除最后一天"); return; }
            Vue.delete(this.travelInfor, index);
            if (this.dayIndexRight > this.endDayNum - 1)
                this.dayIndexRightClick(this.endDayNum - 1);
            $(".scroll-btns  .scroll-left").click();
        },
        //删除酒店房间
        delHootelRoom: function (index, addCityClickIndex = this.addCityClickIndex) {
            if (this.dayIndexRight != this.endDayNum - 1) {
                this.infoMsg("只能修改、删除最后一天数据"); return;
            }
            this.hootRoomPriceReckon();
            Vue.delete(this.travelInfor[addCityClickIndex].hotelInforDetails, index);
        },
        //增加房间数量
        hootRoomAdd: function (index) {
            if (this.hotelRoomList[index].num > this.hotelRoomList[index].stockNum) {
                this.infoMsg("库存不足"); return;
            }
            let flag = true;
            for (const [key, value] of Object.entries(this.travelInfor[this.addCityClickIndex].hotelInforDetails)) {
                if (value.roomid == this.hotelRoomList[index].id) {
                    Vue.set(this.travelInfor[this.addCityClickIndex].hotelInforDetails[key], "num", this.hotelRoomList[index].num);
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
                Vue.set(map, "hotelDate", this.travelInfor[this.addCityClickIndex].date);
                this.travelInfor[this.addCityClickIndex].hotelInforDetails.push(map);
            }
            this.hootRoomPriceReckon();
        },
        //减少房间数量
        hootRoomDel: function (index) {
            if (this.hotelRoomList[index].num < 0) {
                return;
            }
            if (this.hotelRoomList[index].num == 0) {
                this.delHootelRoom(index);
            } else {
                for (const [key, value] of Object.entries(this.travelInfor[this.addCityClickIndex].hotelInforDetails)) {
                    if (value.roomid == this.hotelRoomList[index].id) {
                        Vue.set(this.travelInfor[this.addCityClickIndex].hotelInforDetails[key], "num", this.hotelRoomList[index].num);
                        break;
                    }
                }
            }
            this.hootRoomPriceReckon();
        },
        //房间改变重新计算数量总价
        hootRoomPriceReckon: function () {
            let hotelRoomNum = 0;
            let hotelRoomPrice = 0;
            for (const list of Object.values(this.travelInfor[this.addCityClickIndex].hotelInforDetails)) {
                hotelRoomNum += list.num;
                hotelRoomPrice += list.num * list.price;
            }
            Vue.set(this.travelInfor[this.addCityClickIndex], "hotelRoomNum", hotelRoomNum);
            Vue.set(this.travelInfor[this.addCityClickIndex], "hotelRoomPrice", hotelRoomPrice);
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
        //返回酒店房间列表
        backHotelRoom: function () {
            this.showFlag = 4;
            this.hotelRoomInfor = "";
        },
        //查看已选择的酒店
        hootRoomChoiceClick: function () {
            this.showFlag = 5;
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
            if(data){
                this.hotelRoomInfor = data;
            }
        },
        //返回酒店列表页面
        backHotel: function () {
            this.showFlag = 3;
            this.hotelRoomPageNo = 1;
            this.getHotelByCity();
        },
        //获取酒店房间列表
        async hotelInforClick(index) {
            this.showFlag = 4;
            this.hotelRoomInfor = "";
            if (index >= 0) {
                this.hotelId = this.hotelList[index].id;
                this.hotelInfor = this.hotelList[index];
                Vue.set(this.hotelInfor, "index", index);
            }
            let data = await getHotelRoom({
                pageNo: this.current_page,
                hotelid: this.hotelId,
                date: !this.addCityClickIndex ? this.startDate : this.travelInfor[this.addCityClickIndex].date,
            })
            if(data){
                this.pages = data.totalPage;
                let lists = data.list;
                for (const list1 of Object.values(lists)) {
                    let num = 0;
                    for (const list2 of Object.values(this.travelInfor[this.addCityClickIndex].hotelInforDetails)) {
                        if (list1.id == list2.roomid) {
                            num = list2.num;
                            break;
                        }
                    }
                    Vue.set(list1, "num", num);
                }
                this.hotelRoomList = lists;
            }
        },
        //点击星级
        starsClick: function (index) {
            this.stars = index == this.stars ? "" : index;
            this.getHotelByCity(1);
            this.showFlag = 3;
        },
        //点击上一页 下一页
        pageChange: function (index) {
            index += this.current_page;
            if (index < 1 || index > this.pages) {
                return;
            }
            if (this.showFlag == 3) {
                this.hotelPageNo = index;
                this.getHotelByCity();
            } else if (this.showFlag == 4) {
                this.hotelRoomPageNo = index;
                this.hotelInforClick();
            }
        },
        //选择页数
        jumpPage: function (id) {
            if (id == this.current_page) {
                return;
            }
            if (this.showFlag == 3) {
                this.hotelPageNo = id;
                this.getHotelByCity();
            } else if (this.showFlag == 4) {
                this.hotelRoomPageNo = id;
                this.hotelInforClick();
            }
        },
        //酒店搜索
        async getHotelByCity(index) {
            if (index) {
                this.hotelPageNo = index;
                this.showFlag = 3;
            }
            let data = await getHotelByCity({
                cityid: this.addScenicSpotIndex,
                date: this.travelInfor[this.addCityClickIndex].date,
                pageNo: this.current_page,
                oneNum: this.oneNum,
                twoNum: this.twoNum,
                threeNum: this.threeNum,
                fourNum: this.fourNum,
                stars: this.stars,
            }) 
            if(data) {
                this.hotelList = data.list;
                this.pages = data.totalPage;
            }
        },
        //点击添加酒店
        addHotelClick: function (index) {
            this.showFlag = 3;
            this.addCityClickIndex = index;
            this.addScenicSpotIndex = this.travelInfor[this.addCityClickIndex].travelDetails[this.travelInfor[this.addCityClickIndex].travelDetails.length - 1].cityid;
            this.getHotelByCity(1);
            let num = 0;
            for (const list of Object.values(this.travelInfor[index].hotelInforDetails)) {
                num += list.num;
            }
            this.hotelRoomNum = num;
        },
        //删除商务行程
        delTrip: function (index1, index2, index3) {
            if (this.dayIndexRight != this.endDayNum - 1) {
                this.infoMsg("只能修改、删除最后一天数据"); return;
            }
            Vue.delete(this.travelInfor[index1].travelDetails[index2].scenicSpot, index3);
            this.computeDayDate(index1);
        },
        //确定添加商务行程
        addTrip: function () {
            let startDate = `${dataCountNum(this.startDate, this.addCityClickIndex)} ${this.tripStartDate}`;
            let endDate = `${dataCountNum(this.startDate, this.addCityClickIndex)} ${this.tripEndDate}`;
            if (!this.address) { this.infoMsg("请输入详细地址"); return; }
            if (!this.tripStartDate) { this.infoMsg("请输入开始时间"); return; }
            if (!this.tripEndDate) { this.infoMsg("请输入结束时间"); return; }
            if (new Date(startDate).getTime() >=  new Date(endDate).getTime()) {
                this.infoMsg("请输入正确的时间"); return;
            }
            if (!this.infor) { this.infoMsg("请输入行程详情"); return; }
            if (this.tripAdultNum + this.tripChildNum < 1) { this.infoMsg("请选择人数"); return; }
            let tagid = [];
            let busiItem = [];
            for (const tag of Object.values(this.tagList)) {
                if (tag.flag) {
                    tagid.push(tag.tagid);
                    busiItem.push(tag.content);
                }
            }
            if (!tagid.length || !busiItem.length) {
                this.infoMsg("请选择商务定制项目"); return;
            }
            for (const iterator of Object.values(this.travelInfor[this.addCityClickIndex].travelDetails)) {
                for (const list of Object.values(iterator.scenicSpot)) {
                    if (new Date(startDate).getTime() < new Date(list.endDate).getTime() 
                    && new Date(endDate).getTime() > new Date(list.startDate).getTime()) {
                        this.infoMsg("此时间段已有行程，请重新选择时间段");
                        return;
                    }
                }
            }
            if (this.travelInfor[this.addCityClickIndex].dayDate + (endDate - startDate) / (1000 * 60) > 600) {
                this.infoMsg("时间超过十小时");
                return;
            }
            let map = {};
            Vue.set(map, "type", 2);
            Vue.set(map, "address", this.address);
            Vue.set(map, "startDate", startDate);
            Vue.set(map, "endDate", endDate);
            Vue.set(map, "busiInfo", `${this.address}、${busiItem}、${this.tripStartDate}-${this.tripEndDate}`);
            Vue.set(map, "busiItem", busiItem);
            Vue.set(map, "tagid", tagid);
            Vue.set(map, "adultNum", this.tripAdultNum);
            Vue.set(map, "childNum", this.tripChildNum);
            Vue.set(map, "infor", this.infor);
            this.travelInfor[this.addCityClickIndex].travelDetails[this.addScenicSpotIndex].scenicSpot.push(map);
            this.computeDayDate();
            this.cancelAdd();
        },
        //点击标签属性
        tagClick: function (index) {
            Vue.set(this.tagList[index], "flag", !this.tagList[index].flag);
        },
        //获取商务定制属性
        async getLabel() {
            let data = await getLabel({
                routeType: 6
            })
            if(data){
                this.tagList = data;
            }
        },
        //添加景点
        scenicSpotAdd: function (scenicSpot) {
            debugger
            if (this.travelInfor[this.addCityClickIndex].dayDate + scenicSpot.playerTime / (1000 * 60) > 600) {
                this.infoMsg("时间超过十小时");
                return;
            }
            let map = {};
            Vue.set(map, "type", 1);
            Vue.set(map, "scenicpotid", scenicSpot.id);
            Vue.set(map, "address", scenicSpot.address);
            Vue.set(map, "busiInfo", scenicSpot.name);
            Vue.set(map, "price", scenicSpot.price);
            Vue.set(map, "playerTime", scenicSpot.playerTime);
            this.travelInfor[this.addCityClickIndex].travelDetails[this.addScenicSpotIndex].scenicSpot.push(map);
            this.computeDayDate();
            this.cancelAdd();
        },
        //查看景点详情
        async scenicSpotClick(id) {
            let data = await getScenic({
                scenicSpotid: id,
            })
            if(data){
                this.scenicSpotInfo = data;
            }
        },
        //点击添加景点
        async scenicSpotClick1(index1, index2) {
            if (this.dayIndexRight != this.endDayNum - 1) {
                this.infoMsg("只能修改、删除最后一天数据"); return;
            }
            this.addCityClickIndex = index1;
            this.addScenicSpotIndex = index2;
            this.showFlag = 8;
            let data = await getScenicByTitle({
                scenicName: this.scenicName,
                cityid: this.travelInfor[this.addCityClickIndex].travelDetails[this.addScenicSpotIndex].cityid,
            })
            if(data){
                this.scenicSpotList = data;
            }
        },
        //点击添加商务行程
        scenicSpotClick2: function (index1, index2) {
            if (this.dayIndexRight != this.endDayNum - 1) {
                this.infoMsg("只能修改、删除最后一天数据"); return;
            }
            this.addCityClickIndex = index1;
            this.addScenicSpotIndex = index2;
            this.showFlag = 2;
            // $('#tripStartDate').datetimepicker("remove");
            // $('#tripEndDate').datetimepicker("remove");
            // let _this = this;
            // $('#tripStartDate').datetimepicker({
            //     format: 'hh:ii',
            //     language: 'zh-CN',
            //     initialDate: dataCountNum(this.startDate, index1),
            //     startDate: dataCountNum(this.startDate, index1),
            //     endDate: dataCountNum(this.startDate, index1) + " 23:59",
            //     showMeridian: 1,
            //     minuteStep: 1,
            //     weekStart: 1,
            //     todayBtn: 0,
            //     autoclose: 1,
            //     todayHighlight: 1,
            //     format:"yyyy-mm-dd hh:ii",
            //     startView: 1,
            //     minView: 0,
            //     maxView: 1
            // }).on('changeDate', function (ev) {
            //     _this.tripStartDate = _this.evDate(ev);
            // });
            // $('#tripEndDate').datetimepicker({
            //     format: 'hh:ii',
            //     language: 'zh-CN',
            //     initialDate: dataCountNum(this.startDate, index1),
            //     startDate: dataCountNum(this.startDate, index1),
            //     endDate: dataCountNum(this.startDate, index1) + " 23:59",
            //     showMeridian: 1,
            //     minuteStep: 1,
            //     weekStart: 1,
            //     todayBtn: 0,
            //     autoclose: 1,
            //     todayHighlight: 1,
            //     format:"yyyy-mm-dd hh:ii",
            //     startView: 1,
            //     minView: 0,
            //     maxView: 1
            // }).on('changeDate', function (ev) {
            //     _this.tripEndDate = _this.evDate(ev);
            // });
        },
        //时间转换
        evDate: function (ev) {
            let d = new Date(ev.date.valueOf());
            let year = d.getFullYear();
            let month = d.getMonth() < 10 ? '0' + d.getMonth() : d.getMonth();
            let day = d.getDate() < 10 ? '0' + d.getDate() : d.getDate();
            let hours = d.getHours() < 10 ? '0' + d.getHours() : d.getHours();
            let minute = d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes();
            return `${year}-${month}-${day} ${hours}:${minute}`;
        },
        //删除城市
        delDayCity: function (index1, index2) {
            if (this.dayIndexRight != this.endDayNum - 1) {
                this.infoMsg("只能修改、删除最后一天数据"); return;
            }
            if (index2 == 0) {
                this.infoMsg("第一个城市不能删除"); return;
            }
            Vue.delete(this.travelInfor[index1].travelDetails, index2);
            this.dayCityChange(index1);
            this.computeDayDate(index1);
            this.getTravelDay();
        },
        //确定添加城市
        addCitySure: function (index) {
            let map = {};
            Vue.set(map, "cityid", this.cityListShow[index].cityid);
            Vue.set(map, "cityName", this.cityListShow[index].cityName);
            Vue.set(map, "cityImg", this.cityListShow[index].photoUrl);
            Vue.set(map, "scenicSpot", []);
            this.travelInfor[this.addCityClickIndex].travelDetails.push(map);
            this.dayCityChange();
            this.cancelAdd();
            this.getTravelDay();
        },
        //重新计算酒店是否是最后一个城市
        dayCityChange: function (index = this.addCityClickIndex) {
            let dayCityIndex = this.travelInfor[index].travelDetails.length - 1;
            if (this.travelInfor[index].hotelInforDetails.length > 0 && this.travelInfor[index].travelDetails[dayCityIndex].cityid != this.travelInfor[index].hotelInforDetails[0].cityid) {
                Vue.set(this.travelInfor[index], "hotelInforDetails", []);
                this.hootRoomPriceReckon();
                this.infoMsg("请重新添加酒店");
            }
        },
        //获取城市详情
        async getCityInfo(cityid) {
            let data = await getCity({
                cityid: cityid
            })
                if(data) {
                app.cityInfo = data;
                app.cityInfoShow = true;
            }
        },
        //获取热门目的地
        async getHotCity() {
            let data = await getHotCity()
            if(data) {
                this.hotCityList = this.defImg(data);
            }
        },
        //处理图片为第一张  否则为默认图片
        defImg: function (lists) {
            for (const list of Object.values(lists)) {
                list["photoUrl"] = !list["photoUrl"] ? app.defaultImg : list["photoUrl"].split(",")[0];
            }
            return lists;
        },
        //搜索城市列表
        async getCityData() {
            if (!this.citySearchContent) {
                this.infoMsg("请输入城市名称");
                return;
            }
            let data = await getCityByTitle({
                cityName: this.citySearchContent,
            }) 
            if(data) {
                this.cityList = this.defImg(data);
            }
        },
        //取消选择
        cancelAdd: function () {
            this.showFlag = 0;
            //取消城市
            this.cityInfoShow = false;
            this.addCityClickIndex = "";
            this.citySearchContent = "";
            this.cityList = [];
            //取消商务行程
            this.addScenicSpotIndex = "";
            this.address = "";
            this.tripStartDate = "";
            this.tripEndDate = "";
            this.infor = "";
            this.tripAdultNum = 0;
            this.tripChildNum = 0;
            for (const tag of Object.values(this.tagList)) {
                Vue.set(tag, "flag", false);
            }
            //取消酒店
            this.oneNum = 0; //单人间
            this.twoNum = 0;  //双人间
            this.threeNum = 0;  //三人间
            this.fourNum = 0;  //四人间
            this.stars = ""; //星级
            this.hotelPageNo = 1;
            this.hotelRoomPageNo = 1;
            this.pages = 1;
        },
        //添加城市
        addCityClick: function (index) {
            if (this.dayIndexRight != this.endDayNum - 1) {
                this.infoMsg("只能修改、删除最后一天数据"); return;
            }
            this.addCityClickIndex = index;
            this.showFlag = 1;
            this.cityInfoShow = false;
            this.cityList = [];
        },
        //添加天数
        addDay: function () {
            if (this.dayNum <= this.endDayNum) {
                this.infoMsg("超过最大天数"); return;
            }
            if (!this.dayVc()) return;
            let travelInfor = {};
            Vue.set(travelInfor, "day", this.endDayNum + 1);
            Vue.set(travelInfor, "date", dataCountNum(this.startDate, this.endDayNum));
            let travelDetails = [];
            let map = {};
            Vue.set(map, "cityid", this.travelInfor[this.endDayNum - 1].travelDetails[this.endCityNum - 1].cityid);
            Vue.set(map, "cityName", this.travelInfor[this.endDayNum - 1].travelDetails[this.endCityNum - 1].cityName);
            Vue.set(map, "scenicSpot", []);
            travelDetails.push(map);
            Vue.set(travelInfor, "travelDetails", travelDetails);
            Vue.set(travelInfor, "hotelInforDetails", []);
            Vue.set(travelInfor, "hotelRoomNum", 0);
            Vue.set(travelInfor, "hotelRoomPrice", 0);
            Vue.set(travelInfor, "dayRange", 0);
            Vue.set(travelInfor, "dayDate", 0);
            this.travelInfor.push(travelInfor);
            this.getCityDetails(this.travelInfor[this.endDayNum - 1].travelDetails[this.endCityNum - 1].cityid, this.endDayNum - 1, 0);
            setTimeout(()=>{this.moveBox()}, 100);
            this.dayIndexRightClick(this.endDayNum - 1);
        },
        //点击右边的列表天数
        dayIndexRightClick: function (index) {
            this.dayIndexRight = index;
            this.showFlag = 0;
            this.cityInfoShow = false;
        },
        //获取城市详情
        async getCityDetails(cityid, index1, index2) {
            let data = await getCityDetails({
                cityid: cityid,
            })
            if(data) {
                let cityInfo = data;
                Vue.set(this.travelInfor[index1].travelDetails[index2], "cityImg", !cityInfo.photoUrl ? this.defaultImg : cityInfo.photoUrl.split(",")[0]);
            }
        },
        //点击分页
        pageClick(index) {
            let flag = this.pageNo + index;
            if (flag < 1 || flag > this.totalPage) {
                return;
            }
            this.pageNo = flag;
            this.getTravelByDay();
        },
        //获取旅游定制的列表
        async getTravelByDay() {
            let data = await getTravelByDay({
                dayNum: this.dayList[this.dayIndexLeft],
                pageNo: this.pageNo,
                cityid: this.endCityid,
            })
            if(data) {
                this.dayDataList = data.list;
                this.totalPage = data.totalPage;
            }
        },
        //时间初始化
        getDay: function () {
            // this.dayNum = parseInt((new Date(this.endDate).getTime() - new Date(this.startDate)) / (24 * 60 * 60 * 1000)) + 1;
            let travelInfor = {};
            Vue.set(travelInfor, "day", 1);
            Vue.set(travelInfor, "date", this.startDate);
            let travelDetails = [];
            let map = {};
            Vue.set(map, "cityid", this.startCity);
            Vue.set(map, "cityName", this.startCityName);
            Vue.set(map, "scenicSpot", []);
            travelDetails.push(map);
            Vue.set(travelInfor, "travelDetails", travelDetails);
            Vue.set(travelInfor, "hotelInforDetails", []);
            Vue.set(travelInfor, "hotelRoomNum", 0);
            Vue.set(travelInfor, "hotelRoomPrice", 0);
            Vue.set(travelInfor, "dayRange", 0);
            Vue.set(travelInfor, "dayDate", 0);
            this.travelInfor.push(travelInfor);
            this.getCityDetails(this.startCity, 0, 0);
            console.log(JSON.stringify(this.travelInfor));
        },
        //点击左边的列表天数
        dayIndexLeftClick: function (index) {
            if (this.dayIndexLeft == index) return;
            this.dayIndexLeft = index;
            this.getTravelByDay();
        },
        //获取旅游定制的天数标题列表
        async getTravelDay() {
            this.dayDataList = [];
            this.dayList = [];
            let data = await getTravelDay({
                cityid: this.endCityid,
            }) 
            
            if(data) {
                this.dayList = data;
                console.log(this.dayList)
                if (this.dayList.length > 0) this.getTravelByDay();
                setTimeout(()=>{this.moveList()}, 100);
            }
        },
        moveBox(){
            let cWidth=$(".scroll-box li").width();   //单个子元素所需宽度
            let boxWidth = $(".scroll-wrap").width();  //子元素所在区域宽度
            let sum = $(".scroll-wrap ul").children("li").length;    //子元素数量
            let num = parseInt(boxWidth/cWidth);   //需要显示的子元素的数量
            let len = sum-num;  //子元素可移动次数（被隐藏的子元素数量）
            let i=0;
            $(".scroll-btns .scroll-right").click(function(){
                i++;
                if(i<=len){
                    $(".scroll-box").css("left",-(cWidth*i));
                }else{
                    i=0;
                    $(".scroll-box").css("left",0);
                }
            });
            $(".scroll-btns .scroll-left").click(function(){
                i--;
                if(i>=0){
                    $(".scroll-box").css("left",-(cWidth*i));
                }else{
                    i=0;
                    $(".scroll-box").css("left",0);
                }
            });
        },
        /** 菜单左右滚动 */
        moveList(){
            let cWidth=$(".trip-scroll-box li").width();   //单个子元素所需宽度
            let boxWidth = $(".trip-scroll-wrap").width();  //子元素所在区域宽度
            let sum = $(".trip-scroll-wrap ul").children("li").length;    //子元素数量
            let num = parseInt(boxWidth/cWidth);   //需要显示的子元素的数量
            let len = sum-num;  //子元素可移动次数（被隐藏的子元素数量）
            let i=0;
            $(".trip-scroll-btns .scroll-right").click(function(){
                i++;
                if(i<=len){
                    $(".trip-scroll-box").css("left",-((cWidth+1)*i));
                }else{
                    i=0;
                    $(".trip-scroll-box").css("left",0);
                }
            });
            $(".trip-scroll-btns .scroll-left").click(function(){
                i--;
                if(i>=0){
                    $(".trip-scroll-box").css("left",-((cWidth+1)*i));
                }else{
                    i=0;
                    $(".trip-scroll-box").css("left",0);
                }
            });

        $(".trip-scroll-box > ul li ").click(function(){
            $(this).addClass("travel-list-head-span-style").siblings("li").removeClass("travel-list-head-span-style");
        });

        $(".trip-scroll-box > ul li ").click(function(){
            $(this).parents(".tourism-custom").find(".travel-list-content-list").eq(i).addClass("travel-list-head-span-style_xians").siblings(".travel-list-content-list").removeClass("travel-list-head-span-style_xians");
        });

      },

    },
    filters: {
        cityFc: function (value) {
            if (!value) return this.hotCityList; return value;
        },
    }
}
</script>
<style lang="less" scoped>
    .counter-label-left{
        margin-left: 2rem;
    }
</style>

