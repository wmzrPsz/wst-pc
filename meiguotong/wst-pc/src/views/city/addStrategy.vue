<template>
    <div>
        
        <ezHeader></ezHeader>


        <!-- 添加城市 弹出框（Modal） -->
        <div class="modal fade addCityModal" id="addCityModal" tabindex="-1" role="dialog" aria-labelledby="cityModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <h4 class="modal-title text-center text-bold" id="cityModalLabel">添加城市</h4>
                    </div>
                    <div class="modal-body">
                        <div class="search-city-box">
                            <input class="form-control iconfont" type="text" placeholder="&#xe6e6; 搜索城市">
                        </div>
                        <div class="search-city-result">
                            <div class="result-hot">
                                <div class="result-city-card">
                                    <img src="~images/hot-1.png">
                                    <div class="city-neme">
                                        <p>广州</p>
                                        <p>guangzhou</p>
                                    </div>
                                </div>
                            </div>
                            <h4 class="text-center result-title">搜索结果</h4>
                            <div class="result-list">
                                <div class="result-grid">
                                    <div class="result-city-card">
                                        <img src="~images/hot-1.png">
                                        <div class="city-neme">
                                            <p>广州</p>
                                            <p>guangzhou</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="result-grid">
                                    <div class="result-city-card">
                                        <img src="~images/hot-2.png">
                                        <div class="city-neme">
                                            <p>上海</p>
                                            <p>shanghai</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="result-grid">
                                    <div class="result-city-card">
                                        <img src="~images/hot-1.png">
                                        <div class="city-neme">
                                            <p>广州</p>
                                            <p>guangzhou</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="result-grid">
                                    <div class="result-city-card">
                                        <img src="~images/hot-1.png">
                                        <div class="city-neme">
                                            <p>广州</p>
                                            <p>guangzhou</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="result-grid">
                                    <div class="result-city-card">
                                        <img src="~images/hot-2.png">
                                        <div class="city-neme">
                                            <p>上海</p>
                                            <p>shanghai</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="result-grid">
                                    <div class="result-city-card">
                                        <img src="~images/hot-1.png">
                                        <div class="city-neme">
                                            <p>广州</p>
                                            <p>guangzhou</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="result-grid">
                                    <div class="result-city-card">
                                        <img src="~images/hot-1.png">
                                        <div class="city-neme">
                                            <p>广州</p>
                                            <p>guangzhou</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="result-grid">
                                    <div class="result-city-card">
                                        <img src="~images/hot-2.png">
                                        <div class="city-neme">
                                            <p>上海</p>
                                            <p>shanghai</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="result-grid">
                                    <div class="result-city-card">
                                        <img src="~images/hot-1.png">
                                        <div class="city-neme">
                                            <p>广州</p>
                                            <p>guangzhou</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="clearfix"></div>
                            </div>
                            <div class="clearfix"></div>
                        </div>
                        <div class="clearfix"></div>
                    </div>
                    <div class="modal-footer ez-modal-footer">
                        <button type="button" class="btn ez-btn-cancel" data-dismiss="modal">取消</button>
                        <button type="button" class="btn ez-btn-save">保存</button>
                    </div>
                </div>
            </div>
        </div>
        <!-- 添加城市 弹出框-->

        <div class="container ez-container">

            <!--part start-->
            <div class="col-md-12 ez-index-wrap ez-city-comments">
                <div class="box-left pull-left">
                    <div class="city-comments-wrap">
                        <div class="city-comments-header">游玩攻略</div>
                        <div class="city-comments-img">
                            <img :src="city.photoList | splitVc(0)" class="img-responsive">
                            <div class="comments-city">
                                <h4 class="title ez-mb-md">{{city.cityName}}</h4>
                                <h5>（{{city.countryName}}）</h5>
                            </div>
                        </div>
                        <form class="form-horizontal city-comments-from">
                            <div class="form-group">
                                <span class="label-txt">标题：</span>
                                <div class="form-content" >
                                    <el-input
                                    placeholder="请输入标题"
                                    v-model.trim="list.title"
                                    clearable>
                                    </el-input>
                                </div>
                            </div>
                            <div class="form-group">
                                <span class="label-txt">封面/标题：</span>
                                <div class="form-content upload-plugin coverImgUpload">
                                    <img class="upload-img" v-lazy="list.imgUrl" :key="list.imgUrl">
                                    <div class="upload-text">
                                        <p>建议上传图片尺寸为500*500</p>
                                        <p>大小不超过20M</p>
                                        <!--<a class="btn ez-btn">上传封面</a>-->
                                        <div class="ez-upload-btn ez-mt-10">
                                            <input type="file" title="上传封面" @change="imgChange('imgUrl')" accept="image/*"> 上传封面
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <table class="table ez-strategy-table text-center ez-mb-0">
                                <tr>
                                    <th class="text-center">日期</th>
                                    <th class="text-center">城市</th>
                                    <th class="text-center">景点</th>
                                    <th class="text-center">酒店</th>
                                    <th class="text-center">操作</th>
                                </tr>
                                <tr>
                                    <td>
                                        <div class="td-date">
                                            <div class="span-month">1月</div>
                                            <div class="span-day">
                                                <div>26日</div>
                                                <div>星期一</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td class="td-pd">中国-台北</td>
                                    <td class="td-pd">台北101大楼、台北故宫博物院、台湾大学</td>
                                    <td class="td-pd">7天连锁酒店</td>
                                    <td class="td-pd">
                                        <div class="td-pd-inner">
                                            <p><a class="text-red text-underline">删除</a></p>
                                            <p><a class="">插入一天</a></p>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div class="td-date">
                                            <div class="span-month">2月</div>
                                            <div class="span-day">
                                                <div>16日</div>
                                                <div>星期三</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td class="td-pd">中国-北京</td>
                                    <td class="td-pd">天安门、故宫博物院、人民大会堂</td>
                                    <td class="td-pd">如家连锁酒店</td>
                                    <td class="td-pd">
                                        <div class="td-pd-inner">
                                            <p><a class="text-red text-underline">删除</a></p>
                                            <p><a class="">插入一天</a></p>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div class="td-date">
                                            <div class="span-month">2月</div>
                                            <div class="span-day">
                                                <div>16日</div>
                                                <div>星期三</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td class="td-pd">
                                        <a data-toggle="modal" data-target="#addCityModal"><i class="iconfont icon-addition_fill text-babyblue"></i>添加</a>
                                    </td>
                                    <td class="td-pd">
                                        <a data-toggle="modal" data-target="#addCityModal"><i class="iconfont icon-addition_fill text-babyblue"></i>添加</a>
                                    </td>
                                    <td class="td-pd">
                                        <a data-toggle="modal" data-target="#addCityModal"><i class="iconfont icon-addition_fill text-babyblue"></i>添加</a>
                                    </td>
                                    <td class="td-pd">
                                        <div class="td-pd-inner">
                                            <p><a class="text-red text-underline">删除</a></p>
                                            <p><a class="">插入一天</a></p>
                                        </div>
                                    </td>
                                </tr>
                            </table>
                            <div class="text-center strategy-table-foot ez-mb-md">
                                <a class="btn ez-btn-parmary">新增一天</a>
                            </div>

                            <div class="form-group ez-ueditor-form">
                                <div class="ez-ueditor-box" id="ez-Editor">百度富文本编辑器</div>
                            </div>

                            <div class="form-group">
                                <span class="label-txt"></span>
                                <div class="form-content" >
                                    <div class="place-group-btn text-center">
                                        <a class="btn text-blue ez-mr-sm">返回</a>
                                        <a class="btn active">发表并退出</a>
                                    </div>
                                </div>
                            </div>

                        </form>
                    </div>

                </div>
                <div class="box-right pull-right">

                </div>

            </div>
            <!--part end-->

        </div>

        <ezFooter></ezFooter>
        <ezAside></ezAside>

    </div>
</template>
<script>
import ezHeader from "components/home/ezHeader"
import ezModule from "components/home/ezModule"
import ezFooter from "components/home/ezFooter"
import ezAside from "components/home/ezAside"
import {
    getCityInfo,
    imgUpload,
} from 'getData';
export default {
    name: "addStrategy",
    data() {
        return {
             cityid: this.$route.params.id,  //城市ID
             city: {}, //城市详情
             list: {}, //攻略
        }
    },
    components: {
        ezHeader,
        ezModule,
        ezFooter,
        ezAside,
    },
    created() {
        this.getCityInfo();
    },
    methods: {
        //上传图片
        async imgChange(id) {
            //更新图片数据
            Vue.set(this.list, id,  await imgUpload());
        },
        //获取城市详情
        getCityInfo(){
            getCityInfo({
                cityid: this.cityid
            }).then(res => {
                this.city = res
            })
        },
    },
}
</script>
