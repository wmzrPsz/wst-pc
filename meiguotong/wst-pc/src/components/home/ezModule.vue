<template>
<div>
    <section class="ez-index-wrap" :class="lists |  classVc" v-for="(lists, index1) in contentList" :key="lists.id">
        <div class="ez-index-hot col-md-12 text-center"
            v-if="lists.moduleType == 3 &&((lists.type == 7 && lists.moduleSize == '1+2') || (lists.type == 3 && (lists.moduleSize == '1*4' || lists.moduleSize == '2+3')) || lists.type == 14 || (lists.type == 11 && (lists.moduleSize == '1*4' || lists.moduleSize == '2+3' || lists.moduleSize == '2*4' )))">
            <div class="ez-content-title" style="width:500px;">
                <div class="title-icon title-icon-left"></div>
                <div class="content-title">{{lists.name}}</div>
                <div class="title-icon title-icon-right"></div>
            </div>
            <div class="ez-content-subtitle">
                <div class="subtitle-text">FOLLOWING MORE DISPLAY</div>
            </div>
        </div>
        <div class="ez-index-box col-lg-12" v-else v-show="lists.moduleType != 5 && lists.moduleType == 3">
            <div class="title-box ez-title-style1">
                <h4 class="title">{{lists.name}}<span class="sub-title">CITY CAR RENTAL</span></h4>
            </div>
            <ul class="list-inline ez-title-nav" v-if="lists.moduleDetails">
                <li :class="{'active':lists.index==index2}" v-for="(list, index2) in lists.moduleDetails" :key="index2"
                    @click="titleIndexClick(index1,index2)">{{list.firstTypeContent}}</li>
                <li>MORE >></li>
            </ul>
        </div>
        <div class="ez-index-rental pull-left"
            v-if="index2 == lists.index && lists.moduleDetails &&lists.moduleType == 3 && lists.type == 1"
            v-for="(list, index2) in lists.moduleDetails" :key="index2">
            <div class="col-md-4 ez-index-grid" v-for="(carInfo, index3) in list.carInfoList" :key="index3">
                <div class="grid-img">
                    <img v-lazy="carInfo.carImg" class="center-block img-responsive">
                </div>
                <div class="text-center grid-text">
                    <h4 class="title">{{carInfo.countryName}} • {{carInfo.cityName}}</h4>
                    <p>{{currencySign}}{{carInfo.price}}<span>/元起</span></p>
                </div>
            </div>
        </div>
        
        <div class="box-left pull-left"
            v-if="lists.index == index2 && lists.moduleDetails && lists.moduleType == 3  && lists.moduleSize == '2*3' && lists.type == 3"
            v-for="(list, index2) in lists.moduleDetails" :key="index2">
            <div class="col-md-4 box-card ez-card-v" v-for="(comCity, index3) in list.comCityList" :key="index3">
                <div class="card-img">
                    <img v-lazy="comCity.photoUrl?comCity.photoUrl.split(',')[0]:''" class="center-block img-responsive">
                </div>
                <div class="card-text">
                    <h4 class="title">{{comCity.countryName}}·{{comCity.cityName}}</h4>
                    <div class="text-gray content beyond-content-4"> {{comCity.cityDetails}} </div>
                </div>
            </div>
        </div>
        <div class="ez-nav-tabs"
            v-if="lists.moduleDetails && lists.moduleType == 3  && lists.moduleSize == '1*4' && lists.type == 3">
            <!-- Nav tabs -->
            <ul class="tab-list list-inline">
                <li :class="{'active':lists.index==index2}" v-for="(list, index2) in lists.moduleDetails" :key="index2">
                    <a>{{list.firstTypeContent}}</a></li>
            </ul>
            <!-- Tab panes -->
            <div class="tab-content">
                <!--选项卡1-->
                <div class="tab-pane" v-for="(list, index2) in lists.moduleDetails" :key="index2"
                    :class="{'active':lists.index==index2}">
                    <div class="col-md-3 img-md-v" v-for="(comCity, index3) in list.comCityList" :key="index3">
                        <img v-lazy="comCity.photoUrl?comCity.photoUrl.split(',')[0]:''"
                            class="img-responsive center-block">
                    </div>
                </div>
            </div>
        </div>
        <div class="ez-nav-tabs col-md-12"
            v-if="lists.moduleDetails && lists.moduleType == 3  && lists.moduleSize == '2+3' && lists.type == 3">
            <!-- Nav tabs -->
            <ul class="tab-list list-inline" v-if="lists.moduleDetails">
                <li class="col-md-1" :class="{'active':lists.index==index2}"
                    v-for="(list, index2) in lists.moduleDetails" :key="index2"><a>{{list.firstTypeContent}}</a></li>
            </ul>
            <!-- Tab panes -->
            <div class="tab-content ez-img-grid">
                <!--1月-->
                <div class="tab-pane" v-for="(list, index2) in lists.moduleDetails" :key="index2"
                    :class="{'active':lists.index==index2}">
                    <div :class="index3 < 2?'col-md-6 img-lg':'col-md-4 img-md'"
                        v-for="(comCity, index3) in list.comCityList" :key="index3">
                        <img v-lazy="comCity.photoUrl?comCity.photoUrl.split(',')[0]:''">
                    </div>
                </div>
            </div>
        </div>
        <div class="box-left pull-left"
            v-if="lists.index == index2 && lists.moduleDetails && lists.moduleType == 3  && lists.moduleSize == '2*3' && lists.type == 4"
            v-for="(list, index2) in lists.moduleDetails" :key="index2">
            <div class="col-md-4 box-card ez-card-v" v-for="(scenicSpot, index3) in list.scenicSpotList" :key="index3">
                <div class="card-img">
                    <img v-lazy="scenicSpot.imgUrl?scenicSpot.imgUrl.split(',')[0]:''"
                        class="center-block img-responsive">
                </div>
                <div class="card-text">
                    <h4 class="title">{{scenicSpot.name}}</h4>
                    <div class="text-gray">
                        <span>{{scenicSpot.commentNum}}个点评，满意度{{scenicSpot.star | perVc}}%</span>
                        <span
                            class="pull-right text-orange ez-price"><span>{{currencySign}}</span>{{scenicSpot.price}}</span>
                    </div>
                    <div class="text-gray card-like text-right">
                        <i class="iconfont icon-eye"></i>{{scenicSpot.lookNum}}
                        <i class="iconfont icon-heart-s text-lightorange ez-ml-10"></i>{{scenicSpot.collectionNum}}
                    </div>
                </div>
            </div>
        </div>
        <div class="box-left pull-left" style="width: inherit"
            v-if="lists.index == index2 && lists.moduleDetails && lists.moduleType == 3  && lists.moduleSize == '2*4' && lists.type == 4"
            v-for="(list, index2) in lists.moduleDetails" :key="index2">
            <div class="col-md-3 box-card ez-card-v" v-for="(scenicSpot, index3) in list.scenicSpotList" :key="index3">
                <div class="card-img">
                    <img v-lazy="scenicSpot.imgUrl?scenicSpot.imgUrl.split(',')[0]:''"
                        class="center-block img-responsive">
                </div>
                <div class="card-text">
                    <h4 class="title">{{scenicSpot.name}}</h4>
                    <div class="text-gray">
                        <span>{{scenicSpot.commentNum}}个点评，满意度{{scenicSpot.star | perVc}}%</span>
                        <span
                            class="pull-right text-orange ez-price"><span>{{currencySign}}</span>{{scenicSpot.price}}</span>
                    </div>
                    <div class="text-gray card-like text-right">
                        <i class="iconfont icon-eye"></i>{{scenicSpot.lookNum}}
                        <i class="iconfont icon-heart-s text-lightorange ez-ml-10"></i>{{scenicSpot.collectionNum}}
                    </div>
                </div>
            </div>
        </div>
        <div class="box-left pull-left"
            v-if="index2 == lists.index && lists.moduleDetails &&lists.moduleType == 3 && lists.type == 5"
            v-for="(list, index2) in lists.moduleDetails" :key="index2">
            <div class="col-md-4 box-card ez-card-v" v-for="(linerLine, index3) in list.linerLineList" :key="index3">
                <div class="card-img">
                    <img v-lazy="linerLine.imgUrl?linerLine.imgUrl.split(',')[0]:''" class="center-block img-responsive">
                </div>
                <div class="card-text">
                    <h4 class="title">{{linerLine.name}}</h4>
                    <div class="text-gray card-like">
                        <div class="pull-right text-orange ez-price">{{currencySign}}{{linerLine.price}}<span
                                class="text-gray">/元起</span></div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-md-12 activity-banner"
            v-if="lists.moduleType == 3 && lists.type == 7 && lists.moduleSize == '1+2'">
            <div class="activity-banner-lg pull-left">
                <a><img v-lazy="lists.img?lists.img.split(',')[0]:''"></a>
            </div>
            <div class="activity-banner-md pull-right">
                <div><a><img v-lazy="lists.img?lists.img.split(',')[1]:''"></a></div>
                <div><a><img v-lazy="lists.img?lists.img.split(',')[2]:''"></a></div>
            </div>
        </div>
        <div class="ez-index-rental pull-left"
            v-if="index2 == lists.index && lists.moduleDetails && lists.moduleType == 3  && lists.moduleSize == '2*3' && lists.type == 8 "
            v-for="(list, index2) in lists.moduleDetails" :key="index2">
            <div class="col-md-4 ez-index-grid" v-for="(travelCustomization, index3) in list.travelCustomizationList"
                :key="index3">
                <div class="grid-img">
                    <img v-lazy="travelCustomization.img" class="center-block img-responsive">
                </div>
                <div class="grid-text-sm custom-box">
                    <h4 class="title">{{travelCustomization.name}}</h4>
                    <div><i
                            class="iconfont icon-mark"></i>&nbsp;{{travelCustomization.cityNum}}个目的地，{{travelCustomization.scenicNum}}个景点
                    </div>
                    <div>
                        <div class="pull-left"><i class="iconfont icon-eye"></i>&nbsp;{{travelCustomization.lookNum}}
                        </div>
                        <div class="pull-right"><i
                                class="iconfont icon-heart"></i>&nbsp;{{travelCustomization.collectionNum}}</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="box-left pull-left"
            v-if="index2 == lists.index && lists.moduleDetails && lists.moduleType == 3  && lists.moduleSize == '1+1+3' && lists.type == 8"
            v-for="(list, index2) in lists.moduleDetails" :key="index2">
            <div class="box-img" v-for="(travelCustomization, index3) in list.travelCustomizationList" :key="index3"
                v-if="index3 === 0">
                <img v-lazy="travelCustomization.img">
                <div class="info">
                    <h4>{{travelCustomization.name}}</h4>
                    <p class="text-gray">
                        <span class="pull-left"><i
                                class="iconfont icon-mark"></i>&nbsp;{{travelCustomization.cityNum}}个目的地，{{travelCustomization.scenicNum}}个景点</span>
                        <span class="pull-right">
                            <i class="iconfont icon-eye"></i>{{travelCustomization.lookNum}}&nbsp;&nbsp;
                            <i class="iconfont icon-heart-s text-orange"></i>{{travelCustomization.collectionNum}}
                        </span>
                    </p>
                </div>
            </div>
            <div class="box-card ez-card-h" v-for="(travelCustomization, index3) in list.travelCustomizationList"
                :key="index3+10" v-if="index3 == 1">
                <div class="card-img"><img v-lazy="travelCustomization.img" class="center-block img-responsive"></div>
                <div class="card-text">
                    <h4 class="title">{{travelCustomization.name}}</h4>
                    <div class="text-gray"><i
                            class="iconfont icon-mark"></i>{{travelCustomization.cityNum}}个目的地，{{travelCustomization.scenicNum}}个景点
                    </div>
                    <div class="text-gray card-like">
                        <a class="pull-left"><i class="iconfont icon-eye"></i>{{travelCustomization.lookNum}}</a>
                        <a class="pull-right"><i
                                class="iconfont icon-heart-s text-orange"></i>{{travelCustomization.collectionNum}}</a>
                    </div>
                </div>
            </div>
        </div>
        <div class="box-right pull-right"
            v-if="index2 == lists.index && lists.moduleDetails && lists.moduleType == 3  && lists.moduleSize == '1+1+3' && lists.type == 8"
            v-for="(list, index2) in lists.moduleDetails" :key="index2+10">
            <div class="box-card ez-card-h" v-for="(travelCustomization, index3) in list.travelCustomizationList"
                :key="index3+20" v-if="index3 > 1">
                <div class="card-img"><img v-lazy="travelCustomization.img" class="center-block img-responsive"></div>
                <div class="card-text">
                    <h4 class="title">{{travelCustomization.name}}</h4>
                    <div class="text-gray"><i
                            class="iconfont icon-mark"></i>{{travelCustomization.cityNum}}个目的地，{{travelCustomization.scenicNum}}个景点
                    </div>
                    <div class="text-gray card-like">
                        <a class="pull-left"><i class="iconfont icon-eye"></i>{{travelCustomization.lookNum}}</a>
                        <a class="pull-right"><i
                                class="iconfont icon-heart-s text-orange"></i>{{travelCustomization.collectionNum}}</a>
                    </div>
                </div>
            </div>
        </div>
        <div class="box-left pull-left"
            v-if="index2 == lists.index && lists.moduleDetails && lists.moduleType == 3  && lists.moduleSize == '3*1' && lists.type == 8"
            v-for="(list, index2) in lists.moduleDetails" :key="index2">
            <div class="box-card ez-card-h" v-for="(travelCustomization, index3) in list.travelCustomizationList"
                :key="index3">
                <div class="card-img"><img v-lazy="travelCustomization.img" class="center-block img-responsive"></div>
                <div class="card-text">
                    <h4 class="title">{{travelCustomization.name}}</h4>
                    <p class="intro text-gray">本案例中的行程为定制师推荐，定制行程后可以根据需要更换景点酒店</p>
                    <div class="card-like">
                        <a class="pull-left text-gray "><i
                                class="iconfont icon-mark"></i>{{travelCustomization.cityNum}}个目的地，{{travelCustomization.scenicNum}}个景点</a>
                        <a class="pull-right text-gray ">
                            <i class="iconfont icon-eye"></i>{{travelCustomization.lookNum}}
                            <i
                                class="iconfont icon-heart-s text-orange ez-ml-10 btn-like"></i>{{travelCustomization.collectionNum}}
                        </a>
                    </div>
                </div>
            </div>
        </div>
        <div class="box-left pull-left" style="width: inherit"
            v-if="index2 == lists.index && lists.moduleDetails && lists.moduleType == 3  && lists.moduleSize == '2*4' && lists.type == 8"
            v-for="(list, index2) in lists.moduleDetails" :key="index2">
            <div class="col-md-3 box-card ez-card-v"
                v-for="(travelCustomization, index3) in list.travelCustomizationList" :key="index3">
                <div class="card-img">
                    <img v-lazy="travelCustomization.img" class="center-block img-responsive">
                </div>
                <div class="card-text">
                    <h4 class="title">{{travelCustomization.name}}</h4>
                    <div class="text-gray"><i
                            class="iconfont icon-mark"></i>&nbsp;{{travelCustomization.cityNum}}个目的地，{{travelCustomization.scenicNum}}个景点
                    </div>
                    <div class="text-gray card-like">
                        <div class="pull-right text-orange ez-price">¥699<span class="text-gray">/元起</span></div>
                    </div>
                </div>
            </div>
        </div>
        <div class="ez-nav-tabs"
            v-if="lists.moduleDetails && lists.moduleType == 3  && lists.moduleSize == '1*4' && lists.type == 11">
            <!-- Nav tabs -->
            <ul class="tab-list list-inline" v-if="lists.moduleDetails">
                <li :class="{'active':lists.index==index2}" v-for="(list, index2) in lists.moduleDetails" :key="index2">
                    <a>{{list.firstTypeContent}}</a></li>
            </ul>
            <!-- Tab panes -->
            <div class="tab-content">
                <div class="tab-pane" v-for="(list, index2) in lists.moduleDetails" :key="index2"
                    :class="{'active':lists.index==index2}">
                    <div class="col-md-3 player-card" v-for="(guide, index3) in list.guideList" :key="index3">
                        <div class="player-card-img text-center">
                            <img v-lazy="guide.img" class="center-block img-responsive img-circle">
                        </div>
                        <h4 class="text-center">明星玩家·{{guide.realName}}</h4>
                        <div class="content beyond-content-9"> {{guide.introduction}} </div>
                        <div class="location text-center">
                            <i class="iconfont icon-mark text-lightorange"></i><span
                                class="text-blue">{{guide.countryName}}·{{guide.cityName}}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="ez-nav-tabs"
            v-if="lists.moduleDetails && lists.moduleType == 3  && lists.moduleSize == '2+3' && lists.type == 11">
            <!-- Nav tabs -->
            <ul class="tab-list list-inline" v-if="lists.moduleDetails">
                <li :class="{'active':lists.index==index2}" v-for="(list, index2) in lists.moduleDetails" :key="index2">
                    <a>{{list.firstTypeContent}}</a></li>
            </ul>
            <!-- Tab panes -->
            <div class="tab-content ez-img-grid">
                <div class="tab-pane" v-for="(list, index2) in lists.moduleDetails" :key="index2"
                    :class="{'active':lists.index==index2}">
                    <div :class="index3 < 2?'col-md-6 img-lg':'col-md-4 img-md'"
                        v-for="(guide, index3) in list.guideList" :key="index3">
                        <img v-lazy="guide.img">
                        <div class="city-name text-center">
                            <div class="ch-name"><span>{{guide.realName}}</span></div>
                            <div class="en-name">TOKYO</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="ez-nav-tabs"
            v-if="lists.moduleDetails && lists.moduleType == 3  && lists.moduleSize == '2*4' && lists.type == 11">
            <!-- Nav tabs -->
            <ul class="tab-list list-inline" v-if="lists.moduleDetails">
                <li :class="{'active':lists.index==index2}" v-for="(list, index2) in lists.moduleDetails" :key="index2">
                    <a>{{list.firstTypeContent}}</a></li>
            </ul>
            <!-- Tab panes -->
            <div class="tab-content ez-img-grid">
                <div class="tab-pane " v-for="(list, index2) in lists.moduleDetails" :key="index2"
                    :class="{'active':lists.index==index2}">
                    <div class="col-md-3 img-md-v" v-for="(guide, index3) in list.guideList" :key="index3">
                        <img v-lazy="guide.img">
                        <div class="city-name text-center">
                            <div class="ch-name"><span>{{guide.realName}}</span></div>
                            <div class="en-name">ROME</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="box-left pull-left"
            v-if="lists.index == index2 && lists.moduleDetails && lists.moduleType == 3  && lists.moduleSize == '2*3' && lists.type == 11"
            v-for="(list, index2) in lists.moduleDetails" :key="index2">
            <div class="col-md-4 ez-hot-card" v-for="(guide, index3) in list.guideList" :key="index3">
                <div class="hot-card-img">
                    <img src="~images/hot-1.png">
                    <div class="hot-card-logo">
                        <img src="~images/avatar-1.png">
                    </div>
                </div>
                <div class="hot-card-text">
                    <h4 class="text-center">明星玩家·{{guide.realName}}</h4>
                    <p class="content">{{guide.introduction}}</p>
                    <div>
                        <span class="text-gray"><i
                                class="iconfont icon-mark"></i>{{guide.countryName}}·{{guide.cityName}}</span>
                        <div class="pull-right text-orange ez-price">{{currencySign}}{{guide.price}}<span
                                class="text-gray">天</span></div>
                    </div>
                </div>
            </div>
        </div>
        <div class="text-center"
            v-if=" lists.moduleDetails && lists.moduleType == 3  && lists.moduleSize == '1*4' && lists.type == 11">
            <a class="btn link-more">查看更多></a>
        </div>
        <div class="box-right pull-left"
            v-if="index2 == lists.index && lists.moduleDetails && lists.moduleType == 3  && lists.moduleSize == '2*3' && lists.type == 12"
            v-for="(list, index2) in lists.moduleDetails" :key="index2">
            <div class="col-md-4 box-card ez-card-v" v-for="(route, index3) in list.routeList" :key="index3">
                <div class="card-img">
                    <img v-lazy="route.carImg?route.carImg.split(',')[0]:''" class="center-block img-responsive">
                    <div class="card-img-label">
                        <h4 class="text-white">{{route.startCityContent}}<i>出发</i></h4>
                    </div>
                </div>
                <div class="card-text">
                    <h4 class="title beyond-content-2">{{route.title}}</h4>
                    <div class="ez-icon-tag" v-for="(tag, index4) in (route.tagContent || '').split(',')" :key="index4"
                        v-if="index4 < 2">
                        <div class="ez-triangle-left"><i></i></div>
                        <div class="ez-rect">{{tag}}</div>
                    </div>
                    <div class="text-gray card-like">
                        <div class="pull-right text-orange ez-price">{{currencySign}}{{route.price}}<span
                                class="text-gray">/元起</span></div>
                    </div>
                </div>
            </div>
        </div>
        <div class="box-left pull-left"
            v-if="index2 == lists.index && lists.moduleDetails && lists.moduleType == 3  && lists.moduleSize == '1+1+3' && lists.type == 12"
            v-for="(list, index2) in lists.moduleDetails" :key="index2">
            <div class="box-img" v-for="(route, index3) in list.routeList" :key="index3" v-if="index3 == 0">
                <img v-lazy="route.carImg?route.carImg.split(',')[0]:''">
                <div class="info">
                    <h4>{{route.title}}</h4>
                    <div class="text-gray">
                        <div class="text-gray card-like">
                            <div class="pull-right text-orange ez-price">{{currencySign}}{{route.price}}<span
                                    class="text-gray">/元起</span></div>
                        </div>
                    </div>
                </div>
                <div class="index-img-label">
                    <h4 class="text-white">{{route.startCityContent}}<i>出发</i></h4>
                </div>
            </div>
            <div class="box-card ez-card-h" v-for="(route, index3) in list.routeList" :key="index3+5"
                v-if="index3 == 1">
                <div class="card-img">
                    <img v-lazy="route.carImg?route.carImg.split(',')[0]:''" src="~images/index-4-1.png"
                        class="center-block img-responsive">
                    <div class="card-img-label">
                        <h4 class="text-white">{{route.startCityContent}}<i>出发</i></h4>
                    </div>
                </div>
                <div class="card-text">
                    <h4 class="title">{{route.title}}</h4>
                    <div class="ez-icon-tag" style="margin-bottom: 10px;"
                        v-for="(tag, index4) in (route.tagContent || '').split(',')" :key="index4">
                        <div class="ez-triangle-left"><i></i></div>
                        <div class="ez-rect">{{tag}}</div>
                    </div>
                    <div class="text-gray card-like">
                        <div class="pull-right text-orange ez-price">{{currencySign}}{{route.price}}<span
                                class="text-gray">/元起</span></div>
                    </div>
                </div>
            </div>
        </div>
        <div class="box-right pull-right"
            v-if="index2 == lists.index && lists.moduleDetails && lists.moduleType == 3  && lists.moduleSize == '1+1+3' && lists.type == 12"
            v-for="(list, index2) in lists.moduleDetails" :key="index2+20">
            <div class="box-card ez-card-h" v-for="(route, index3) in list.routeList" :key="index3+20"
                v-if="index3 > 1">
                <div class="card-img">
                    <img v-lazy="route.carImg?route.carImg.split(',')[0]:''" class="center-block img-responsive">
                    <div class="card-img-label">
                        <h4 class="text-white">{{route.startCityContent}}<i>出发</i></h4>
                    </div>
                </div>
                <div class="card-text">
                    <h4 class="title">{{route.title}}</h4>
                    <div class="ez-icon-tag" style="margin-bottom: 10px;"
                        v-for="(tag, index4) in (route.tagContent || '').split(',')" :key="index4">
                        <div class="ez-triangle-left"><i></i></div>
                        <div class="ez-rect">{{tag}}</div>
                    </div>
                    <div class="text-gray card-like">
                        <div class="pull-right text-orange ez-price">{{currencySign}}{{route.price}}<span
                                class="text-gray">/元起</span></div>
                    </div>
                </div>
            </div>
        </div>
        <div class="box-right pull-left" style="width: inherit"
            v-if="index2 == lists.index && lists.moduleDetails && lists.moduleType == 3  && lists.moduleSize == '2*4' && lists.type == 12"
            v-for="(list, index2) in lists.moduleDetails" :key="index2">
            <div class="col-md-3 box-card ez-card-v" v-for="(route, index3) in list.routeList" :key="index3">
                <div class="card-img">
                    <img v-lazy="route.carImg?route.carImg.split(',')[0]:''" class="center-block img-responsive">
                    <div class="card-img-label">
                        <h4 class="text-white">{{route.startCityContent}}<i>出发</i></h4>
                    </div>
                </div>
                <div class="card-text">
                    <h4 class="title beyond-content-2">{{route.title}}</h4>
                    <div class="ez-icon-tag" v-for="(tag, index4) in (route.tagContent || '').split(',')" :key="index4"
                        v-if="index4 < 2">
                        <div class="ez-triangle-left"><i></i></div>
                        <div class="ez-rect">{{tag}}</div>
                    </div>
                    <div class="text-gray card-like">
                        <div class="pull-right text-orange ez-price">{{currencySign}}{{route.price}}<span
                                class="text-gray">/元起</span></div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row" v-if="lists.type == 14  && lists.moduleType == 3">
            <div class="col-md-3 ez-hot-card" v-for="(sysUser, index2) in lists.sysUserList" :key="index2">
                <div class="hot-card-img">
                    <img v-lazy="sysUser.companyLogo">
                    <div class="hot-card-logo">
                        <img v-lazy="sysUser.companyimg">
                    </div>
                </div>
                <div class="hot-card-text">
                    <h4 class="text-center">{{sysUser.companyName}}</h4>
                    <p>{{sysUser.companyContent}}</p>
                </div>
            </div>
        </div>
        <div class="box-left pull-left"
            v-if="index2 == lists.index && lists.moduleDetails && lists.moduleType == 3  && lists.moduleSize == '2*3' && lists.type == 15"
            v-for="(list, index2) in lists.moduleDetails" :key="index2">
            <div class="col-md-4 box-card ez-card-v" v-for="(route, index3) in list.routeList" :key="index3">
                <div class="card-img">
                    <img v-lazy="route.carImg?route.carImg.split(',')[0]:''" class="center-block img-responsive">
                </div>
                <div class="card-text">
                    <h4 class="title beyond-content-2">{{route.title}}</h4>
                    <div class="ez-icon-tag" v-for="(tag, index4) in (route.tagContent || '').split(',')" :key="index4"
                        v-if="index4 < 2">
                        <div class="ez-triangle-left"><i></i></div>
                        <div class="ez-rect">{{tag}}</div>
                    </div>
                    <div class="text-gray card-like">
                        <div class="pull-right text-orange ez-price">{{currencySign}}{{route.price}}<span
                                class="text-gray">/元起</span></div>
                    </div>
                </div>
            </div>
        </div>
        <div class="box-left pull-left"
            v-if="index2 == lists.index && lists.moduleDetails && lists.moduleType == 3  && lists.moduleSize == '1+1+3' && lists.type == 15"
            v-for="(list, index2) in lists.moduleDetails" :key="index2">
            <div class="box-img" v-for="(route, index3) in list.routeList" :key="index3" v-if="index3 == 0">
                <img v-lazy="route.carImg?route.carImg.split(',')[0]:''">
                <div class="info">
                    <h4>{{route.title}}</h4>
                    <div class="text-gray">
                        <div class="text-gray card-like">
                            <div class="pull-right text-orange ez-price">{{currencySign}}{{route.price}}<span
                                    class="text-gray">/元起</span></div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="box-card ez-card-h" v-for="(route, index3) in list.routeList" :key="index3+10"
                v-if="index3 == 1">
                <div class="card-img">
                    <img v-lazy="route.carImg?route.carImg.split(',')[0]:''" class="center-block img-responsive">
                </div>
                <div class="card-text">
                    <h4 class="title">{{route.title}}</h4>
                    <div class="ez-icon-tag" v-for="(tag, index4) in (route.tagContent || '').split(',')" :key="index4">
                        <div class="ez-triangle-left"><i></i></div>
                        <div class="ez-rect" style="margin-bottom: 10px;">{{tag}}</div>
                    </div>
                    <div class="text-gray card-like">
                        <div class="pull-right text-orange ez-price">{{currencySign}}{{route.price}}<span
                                class="text-gray">/元起</span></div>
                    </div>
                </div>
            </div>
        </div>
        <div class="box-right pull-right"
            v-if="index2 == lists.index && lists.moduleDetails && lists.moduleType == 3  && lists.moduleSize == '1+1+3' && lists.type == 15"
            v-for="(list, index2) in lists.moduleDetails" :key="index2+30">
            <div class="box-card ez-card-h" v-for="(route, index3) in list.routeList" :key="index3+20"
                v-if="index3 > 1">
                <div class="card-img">
                    <img v-lazy="route.carImg?route.carImg.split(',')[0]:''" class="center-block img-responsive">
                </div>
                <div class="card-text">
                    <h4 class="title">{{route.title}}</h4>
                    <div class="ez-icon-tag" v-for="(tag, index4) in (route.tagContent || '').split(',')" :key="index4">
                        <div class="ez-triangle-left"><i></i></div>
                        <div class="ez-rect" style="margin-bottom: 10px;">{{tag}}</div>
                    </div>
                    <div class="text-gray card-like">
                        <div class="pull-right text-orange ez-price">{{currencySign}}{{route.price}}<span
                                class="text-gray">/元起</span></div>
                    </div>
                </div>
            </div>
        </div>
        <div class="box-left pull-left"
            v-if="index2 == lists.index && lists.moduleDetails && lists.moduleType == 3  && lists.moduleSize == '2*4' && lists.type == 15"
            v-for="(list, index2) in lists.moduleDetails" :key="index2">
            <div class="col-md-3 box-card ez-card-v" v-for="(route, index3) in list.routeList" :key="index3">
                <div class="card-img">
                    <img v-lazy="route.carImg?route.carImg.split(',')[0]:''" class="center-block img-responsive">
                </div>
                <div class="card-text">
                    <h4 class="title beyond-content-2">{{route.title}}</h4>
                    <div class="ez-icon-tag" v-for="(tag, index4) in (route.tagContent || '').split(',')" :key="index4"
                        v-if="index4 < 2">
                        <div class="ez-triangle-left"><i></i></div>
                        <div class="ez-rect" style="margin-bottom: 10px;">{{tag}}</div>
                    </div>
                    <div class="text-gray card-like">
                        <div class="pull-right text-orange ez-price">{{currencySign}}{{route.price}}<span
                                class="text-gray">/元起</span></div>
                    </div>
                </div>
            </div>
        </div>
        <div class="ez-slide-container" v-if="lists.type == 4 && lists.moduleType == 2 && lists.moduleSize == '1*3' ">
            <div class="ez-slide-content">
                <ul>
                    <li :class="'pic'+(index2+1)" v-for="(scenicSpot, index2) in lists.scenicSpotList" :key="index2">
                        <div class="ez-slide-img">
                            <img v-lazy="scenicSpot.imgUrl?scenicSpot.imgUrl.split(',')[0]:''">
                            <div class="ez-slide-mask">
                                <h4 class="title">{{scenicSpot.name}}</h4>
                                <div class="line"></div>
                                <p>{{scenicSpot.content}}</p>
                                <a href="#" class="btn link-more">查看详情</a>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="buttons">
                <a href="javascript:;" class="'active':index2==lists.index"
                    v-for="(scenicSpot, index2) in lists.scenicSpotList" :key="index2"></a>
            </div>
        </div>
        <div class="ez-index-news pull-right"
            v-if="(lists.moduleType == 1 || lists.moduleType == 2) && !(lists.type == 4 && lists.moduleSize =='1*3')">
            <div class="ez-aside-card" v-if="lists.type == 1">
                <div class="aside-card-title bg-style1">
                    <h4 class="title">{{lists.name}}</h4>
                    <span class="link-more">MORE>></span>
                </div>
                <div class="aside-card" v-for="(carInfo, index2) in lists.carInfoList" :key="index2">
                    <div class="aside-card-no active">{{index2+1}}</div>
                    <div class="aside-card-car">
                        <img v-lazy="carInfo.carImg" class="img-responsive center-block">
                    </div>
                    <div class="title">{{carInfo.carName}}</div>
                </div>
            </div>
            <div class="ez-aside-card" v-if="lists.type == 2">
                <div class="aside-card-title bg-style1">
                    <h4 class="title">{{lists.name}}</h4>
                    <span class="link-more">MORE>></span>
                </div>
                <div class="aside-card" v-for="(comComment, index2) in lists.comCommentList" :key="index2">
                    <div class="aside-card-user">
                        <img v-lazy="comComment.memberPhoto">
                        <div class="pull-left">{{comComment.memberName}}</div>
                        <div class="pull-right">{{comComment.createDate}}</div>
                    </div>
                    <div class="aside-card-msg text-gray beyond-content-2">{{comComment.content}}</div>
                </div>
            </div>
            <div class="ez-aside-card" v-if="lists.type == 3">
                <div class="aside-card-title bg-style1">
                    <h4 class="title">{{lists.name}}</h4>
                    <span class="link-more">MORE>></span>
                </div>
                <div class="aside-card" v-for="(comCity, index2) in lists.comCityList" :key="index2">
                    <div class="aside-card-img">
                        <img v-lazy="comCity.photoUrl?comCity.photoUrl.split(',')[0]:''"
                            class="center-block img-responsive">
                    </div>
                    <div class="aside-card-city">
                        <h4 class="title">{{comCity.cityName}}</h4>
                        <p class="text-gray">{{comCity.num}}个景点</p>
                    </div>
                </div>
            </div>
            <div class="ez-aside-card" v-if="lists.type == 4">
                <div class="aside-card-title bg-style3">
                    <h4 class="title">{{lists.name}}</h4>
                    <span class="link-more">MORE>></span>
                </div>
                <div class="aside-card" v-for="(scenicSpot, index) in lists.scenicSpotList" :key="index">
                    <div class="aside-card-img">
                        <img v-lazy="scenicSpot.imgUrl?scenicSpot.imgUrl.split(',')[0]:''"
                            class="img-responsive center-block">
                    </div>
                    <div class="aside-card-text">
                        <h5>{{scenicSpot.name}}</h5>
                        <div class="pull-right">
                            <i class="iconfont icon-eye"></i>&nbsp;{{scenicSpot.lookNum}}
                            <i
                                class="iconfont icon-heart-s text-orange ez-ml-10 btn-like"></i>&nbsp;{{scenicSpot.collectionNum}}
                        </div>
                    </div>
                </div>
            </div>
            <div class="ez-aside-card" v-if="lists.type == 5">
                <div class="aside-card-title bg-style3">
                    <h4 class="title">{{lists.name}}</h4>
                    <span class="link-more">MORE>></span>
                </div>
                <div class="aside-card" v-for="(linerLine, index) in lists.linerLineList" :key="index">
                    <div class="aside-card-img">
                        <img v-lazy="linerLine.imgUrl?linerLine.imgUrl.split(',')[0]:''"
                            class="img-responsive center-block">
                    </div>
                    <div class="aside-card-text">
                        <h5 class="beyond-content-2">{{linerLine.name}}</h5>
                        <div class="pull-right">
                            <i class="iconfont icon-eye"></i>&nbsp;{{linerLine.lookNum}}
                            <i
                                class="iconfont icon-heart-s text-orange ez-ml-10 btn-like"></i>&nbsp;{{linerLine.collectionNum}}
                        </div>
                    </div>
                </div>
            </div>
            <div class="ez-aside-card" v-if="lists.type == 6">
                <div class="aside-card-title bg-style3">
                    <h4 class="title">{{lists.name}}</h4>
                    <span class="link-more">MORE>></span>
                </div>
                <div class="aside-card" v-for="(orderSys, index2) in lists.orderSysList" :key="index2">
                    <div class="aside-card-msg">{{orderSys.title}}</div>
                    <div class="aside-card-user">
                        <img v-lazy="orderSys.photo">
                        <div class="pull-left">{{orderSys.nickName}}</div>
                        <div class="pull-right">{{orderSys.createDate}}</div>
                    </div>
                </div>
            </div>
            <div class="news-banner" v-if="lists.type == 7">
                <img v-lazy="lists.img">
            </div>
            <div class="ez-aside-card" v-if="lists.type == 8">
                <div class="aside-card-title bg-style3">
                    <h4 class="title">{{lists.name}}</h4>
                    <span class="link-more">MORE>></span>
                </div>
                <div class="aside-card" v-for="(travelCustomization, index2) in lists.travelCustomizationList"
                    :key="index2">
                    <div class="aside-card-img">
                        <img v-lazy="travelCustomization.img" class="img-responsive center-block">
                    </div>
                    <div class="aside-card-text">
                        <h5>{{travelCustomization.name}}</h5>
                        <p class="text-gray text-right">{{travelCustomization.createDate}}</p>
                    </div>
                </div>
            </div>
            <div class="ez-aside-card" v-if="lists.type == 9">
                <div class="aside-card-title bg-style3">
                    <h4 class="title">{{lists.name}}</h4>
                    <span class="link-more">MORE>></span>
                </div>
                <div class="aside-card" v-for="(cityStrategy, index2) in lists.cityStrategyList" :key="index2">
                    <div class="aside-card-msg">{{cityStrategy.title}}</div>
                    <div class="aside-card-user">
                        <img v-lazy="cityStrategy.photo">
                        <div class="pull-left">{{cityStrategy.nickName}}</div>
                        <div class="pull-right">{{cityStrategy.createDate}}</div>
                    </div>
                </div>
            </div>
            <div class="ez-aside-card" v-if="lists.type == 10">
                <div class="aside-card-title bg-style1">
                    <h4 class="title">{{lists.name}}</h4>
                    <span class="link-more">MORE>></span>
                </div>
                <div class="aside-card" v-for="(guideRoute, index2) in lists.guideRouteList" :key="index2">
                    <div class="aside-card-img">
                        <img v-lazy="guideRoute.photo" class="img-responsive center-block">
                    </div>
                    <div class="aside-card-text">
                        <h5>{{guideRoute.title}}</h5>
                        <div class="text-orange text-right">{{currencySign}}{{guideRoute.price}}</div>
                    </div>
                </div>
            </div>
            <div class="ez-aside-card" v-if="lists.type == 11">
                <div class="aside-card-title bg-style3 ez-mb-10">
                    <h4 class="title">{{lists.name}}</h4>
                    <span class="link-more">MORE>></span>
                </div>
                <div class="aside-card" v-for="(guide, index2) in lists.guideList" :key="index2">
                    <div class="aside-card-img img-md">
                        <img v-lazy="guide.img" class="center-block img-responsive img-circle">
                    </div>
                    <div class="aside-card-city">
                        <h4 class="title">当地导游 • {{guide.realName}}</h4>
                        <p class="text-gray">服务{{guide.finishNum}}次</p>
                    </div>
                </div>
            </div>
            <div class="ez-aside-card" v-if="lists.type == 12">
                <div class="aside-card-title bg-style1">
                    <h4 class="title">{{lists.name}}</h4>
                    <!-- <span class="link-more">MORE>></span> -->
                </div>
                <div class="aside-card" v-for="(route, index2) in lists.routeList" :key="index2">
                    <div class="aside-card-img">
                        <img v-lazy="route.carImg?route.carImg.split(',')[0]:''" class="img-responsive center-block">
                    </div>
                    <div class="aside-card-text">
                        <h5>{{route.title}}</h5>
                        <div class="text-orange text-right">{{currencySign}}{{route.price}}</div>
                    </div>
                </div>
            </div>
            <div class="ez-aside-card" v-if="lists.type ==13">
                <div class="aside-card-title bg-style1">
                    <h4 class="title">{{lists.name}}</h4>
                    <span class="link-more">MORE>></span>
                </div>
                <div class="aside-card" v-for="(comArticle, index2) in lists.comArticleList" :key="index2">
                    <div class="aside-card-img">
                        <img v-lazy="comArticle.imgUrl" class="img-responsive center-block">
                    </div>
                    <div class="aside-card-text">
                        <h5><a href="#">{{comArticle.title}}</a></h5>
                        <p class="text-right">{{comArticle.createDate}}</p>
                    </div>
                </div>
            </div>
        </div>
        <img v-lazy="lists.img" v-if="lists.moduleType == 5">
        <!-- <div class="cruise-info" v-if="lists.moduleType == 5">
        <div class="cruise-msg">
            <ul class="list-inline">
                <h4>出发港口</h4>
                <li>广州</li>
                <li>天津</li>
                <li>厦门</li>
                <li>香港</li>
                <li>西沙</li>
                <li>宜昌</li>
                <li>重庆</li>
                <li><a href="#">更多></a></li>
            </ul>

            <ul class="list-inline">
                <h4>邮轮航线</h4>
                <li>日本</li>
                <li>东南亚</li>
                <li>地中海</li>
                <li>三沙&西沙</li>
                <li>加勒比海</li>
                <li>南极</li>
                <li><a href="#">更多></a></li>
            </ul>

            <ul class="list-inline">
                <h4>邮轮公司</h4>
                <li>皇家加勒比</li>
                <li>歌诗达邮轮</li>
                <li>天海邮轮</li>
                <li>诺唯真邮轮</li>
                <li>地中海邮轮</li>
                <li><a href="#">更多></a></li>
            </ul>

        </div>
        <div class="cruise-name">
            <h4>Greece</h4>
            <h3>SANTORINI</h3>
        </div>
    </div> -->
    </section>
</div>
</template>
<script>
import { getModuleDataInfo } from 'getData'
import { mapState } from "vuex"
export default {
    name: "ezModule",
    props: {
        htmlName: {
            type: String,
            required: true
        },
        htmlSeal: {
            type: String,
            required: true
        },
    },
    data: function () {
        return {
            contentList: [],
        }
    },
    computed: {
       ...mapState([ "currencySign", ]),
    },
    created() {
          this.getModuleDataInfo();
    },
    methods: {
        //查询模块
        async getModuleDataInfo() {
            if (!this.htmlName || !this.htmlSeal) {
                throw new Error("模块参数错误");
            }
            console.log(`${this.htmlName}--------${this.htmlSeal}`);
            const this_ = this;
            this.contentList = await getModuleDataInfo({
                 htmlName: this.htmlName,
                htmlSeal: this.htmlSeal,
            })
            // this.dataInit();
        },
        //处理数据
        dataInit() {
            for (const [key, list] of Object.entries(this.contentList)) {
                console.log(key);
                console.log(list);
            }
        },
        //点击导航栏
        titleIndexClick(index1, index2) {
            this.$set(this.contentList[index1], 'index', index2);
        },
        //跳转详情
        goToInfo(type) {
            switch (type) {
                case 1: location.href="../"; break;
            
                default:
                    break;
            }
        },
    },
    filters: {
        classVc(lists) {
            if (lists.moduleType == 3 && lists.moduleSize == "1+1+3" && lists.type == 8) return "ez-index-4";
            if (lists.moduleType == 3 && lists.moduleSize == "2*4" && lists.type == 8) return "ez-index-5 ez-index-public";
            if (lists.moduleType == 3 && lists.moduleSize == "3*1" && lists.type == 8) return "ez-index-6";
            if (lists.moduleType == 3 && lists.moduleSize == "2*3" && lists.type == 12) return "ez-index-7";
            if (lists.moduleType == 3 && lists.moduleSize == "2*4" && lists.type == 12) return "ez-index-7";
            if (lists.moduleType == 3 && lists.moduleSize == "1+1+3" && lists.type == 12) return "ez-index-4";
            if (lists.moduleType == 3 && lists.moduleSize == "2*3" && lists.type == 15) return "ez-index-10 ez-index-public";
            if (lists.moduleType == 3 && lists.moduleSize == "1+1+3" && lists.type == 15) return "ez-index-4";
            if (lists.moduleType == 3 && lists.moduleSize == "2*4" && lists.type == 15) return "ez-index-12 ez-index-public";
            if (lists.moduleType == 5) return "col-md-12 ez-index-cruise";
            if (lists.moduleType == 3 && lists.type == 5) return "ez-index-public ez-index-14";
            if (lists.moduleType == 3 && lists.moduleSize == "1*4" && lists.type == 11) return "ez-index-traveler col-md-12";
            if (lists.moduleType == 3 && lists.moduleSize == "2+3" && lists.type == 11) return "ez-gobal-traveler col-md-12";
            if (lists.moduleType == 3 && lists.moduleSize == "2*4" && lists.type == 11) return "ez-gobal-traveler col-md-12";
            if (lists.moduleType == 3 && lists.moduleSize == "2*3" && lists.type == 11) return "ez-index-public ez-index-17";
            if (lists.moduleType == 3 && lists.moduleSize == "2*3" && lists.type == 3) return "ez-index-public ez-index-24";
            if (lists.moduleType == 2 && lists.moduleSize == "1*3" && lists.type == 4) return "ez-index-slide col-md-12";
            if (lists.moduleType == 3 && lists.moduleSize == "2*3" && lists.type == 4) return "ez-index-public ez-index-5";
            if (lists.moduleType == 3 && lists.moduleSize == "2*4" && lists.type == 4) return "ez-index-public ez-index-5";
            if (lists.moduleType == 3 && lists.moduleSize == "1*4" && lists.type == 3) return "ez-index-theme col-md-12";
            if (lists.moduleType == 3 && lists.moduleSize == "2+3" && lists.type == 3) return "ez-index-month col-md-12";
            if (lists.moduleType == 3 && lists.moduleSize == "1+2" && lists.type == 7) return "ez-index-activity col-md-12";
        }
    },
}
</script>
