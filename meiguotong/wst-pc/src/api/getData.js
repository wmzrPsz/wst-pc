/*
 * @Description:  获取数据
 * @Author: 彭善智
 * @LastEditors: 彭善智
 * @Date: 2019-03-29 13:12:37
 * @LastEditTime: 2019-05-27 16:54:41
 */

import ajax from './fetch'
import { uploadImg } from "../utils/common"


//登录
export const login = (param , type) => ajax( process.env.VUE_APP_PROXY_API +'/forlogin/login', param, type);
//注册
export const register = (param , type) => ajax( process.env.VUE_APP_PROXY_API +'/forlogin/register', param, type);
//发送验证码
export const sendSms = (param , type) => ajax( process.env.VUE_APP_PROXY_API +'/forlogin/sendSms', param, type);
//绑定邮箱
export const checkEmail = (param , type) => ajax( process.env.VUE_APP_PROXY_API +'/forlogin/checkEmail', param, type);
//验证账号是否注册
export const checkRegister = (param , type) => ajax( process.env.VUE_APP_PROXY_API +'/forlogin/checkRegister', param, type);
//修改密码
export const updatePassword = (param , type) => ajax( process.env.VUE_APP_PROXY_API +'/forlogin/updatePassword', param, type);
//商家注册接口
export const businessRegister = (param , type) => ajax( process.env.VUE_APP_PROXY_API +'/forlogin/businessRegister', param, type);


//获取会员详情
export const myInfor = (param , type) => ajax( process.env.VUE_APP_PROXY_API +'/member/myInfor', param, type);
//根据语言获取国家城市
export const getCountryCity = (param , type) => ajax( process.env.VUE_APP_PROXY_API +'/member/getCountryCity', param, type);
//保存个人信息
export const updateMy = (param , type) => ajax( process.env.VUE_APP_PROXY_API +'/member/updateMy', param, type);
//获取消息中心系统消息
export const getCompush = (param , type) => ajax( process.env.VUE_APP_PROXY_API +'/member/getCompush', param, type);
//获取消息中心评论消息
export const getComment = (param , type) => ajax( process.env.VUE_APP_PROXY_API +'/member/getComment', param, type);
//获取我的草稿
export const myDraft = (param , type) => ajax( process.env.VUE_APP_PROXY_API +'/member/myDraft', param, type);
//删除我的草稿
export const deleteDraft = (param , type) => ajax( process.env.VUE_APP_PROXY_API +'/member/deleteDraft', param, type);
//获取关于我们
export const getArticle = (param , type) => ajax( process.env.VUE_APP_PROXY_API +'/member/getArticle', param, type);
//获取公司子账号
export const companyInfor = (param , type) => ajax( process.env.VUE_APP_PROXY_API +'/member/companyInfor', param, type);
//修改公司子账号
export const updateCompanyInfor = (param , type) => ajax( process.env.VUE_APP_PROXY_API +'/member/updateCompanyInfor', param, type);
//验证子账号是否存在
export const validateMember = (param , type) => ajax( process.env.VUE_APP_PROXY_API +'/member/validateMember', param, type);
//获取常用联系人
export const getMemberContact = (param , type) => ajax( process.env.VUE_APP_PROXY_API +'/member/getMemberContact', param, type);
//修改常用联系人
export const addMemberContact = (param , type) => ajax( process.env.VUE_APP_PROXY_API +'/member/addMemberContact', param, type);
//删除常用联系人
export const deleteMemberContact = (param , type) => ajax( process.env.VUE_APP_PROXY_API +'/member/deleteMemberContact', param, type);
//获取我的收藏
export const myCollection = (param , type) => ajax( process.env.VUE_APP_PROXY_API +'/member/myCollection', param, type);
//取消收藏
export const deleteCollection = (param , type) => ajax( process.env.VUE_APP_PROXY_API +'/member/deleteCollection', param, type);
//加入购物车
export const addCollectionToCar = (param , type) => ajax( process.env.VUE_APP_PROXY_API +'/member/addCollectionToCar', param, type);
//获取玩家认证信息
export const getGuideInfo = (param , type) => ajax( process.env.VUE_APP_PROXY_API +'/member/getGuideInfo', param, type);
//获取玩家擅长属性
export const getGuideLabel = (param , type) => ajax( process.env.VUE_APP_PROXY_API +'/member/getGuideLabel', param, type);
//提交玩家认证信息
export const addGuide = (param , type) => ajax( process.env.VUE_APP_PROXY_API +'/member/addGuide', param, type);
//获取我的订单
export const myOrder = (param , type) => ajax( process.env.VUE_APP_PROXY_API +'/member/myOrder', param, type);
//取消订单
export const cancelOrder = (param , type) => ajax( process.env.VUE_APP_PROXY_API +'/member/cancelOrder', param, type);
//修改旅行社信息
export const updateMyTravel = (param , type) => ajax( process.env.VUE_APP_PROXY_API +'/member/updateMyTravel', param, type);



//获取导游路线规划
export const getGuideRoute = (param , type) => ajax( process.env.VUE_APP_PROXY_API +'/guide/getGuideRoute', param, type);
//获取导游路线规划详情
export const getGuideRouteDetail = (param , type) => ajax( process.env.VUE_APP_PROXY_API +'/guide/getGuideRouteDetail', param, type);
//获取导游路线景点
export const getCityScenic = (param , type) => ajax( process.env.VUE_APP_PROXY_API +'/guide/getCityScenic', param, type);
//修改添加导游路线
export const updateGuideRoute = (param , type) => ajax( process.env.VUE_APP_PROXY_API +'/guide/updateGuideRoute', param, type);
//删除导游路线
export const deleteGuideRoute = (param , type) => ajax( process.env.VUE_APP_PROXY_API +'/guide/deleteGuideRoute', param, type);
//获取导游价格设置和退款价格设置
export const getGuidePrice = (param , type) => ajax( process.env.VUE_APP_PROXY_API +'/guide/getGuidePrice', param, type);
//修改导游价格设置和退款价格设置
export const updateGuidePrice = (param , type) => ajax( process.env.VUE_APP_PROXY_API +'/guide/updateGuidePrice', param, type);
//导游筛选列表
export const guideScreen = (param , type) => ajax( process.env.VUE_APP_PROXY_API +'/guide/guideScreen', param, type);
//导游详情
export const guideDetails = (param , type) => ajax( process.env.VUE_APP_PROXY_API +'/guide/guideDetails', param, type);
//导游推荐路线
export const guideRoute = (param , type) => ajax( process.env.VUE_APP_PROXY_API +'/guide/guideRoute', param, type);
//导游日期详情
export const getGuideDateDetails = (param , type) => ajax( process.env.VUE_APP_PROXY_API +'/guide/getGuideDateDetails', param, type);
//导游路线日期详情
export const getGuideRouteDateDetails = (param , type) => ajax( process.env.VUE_APP_PROXY_API +'/guide/getGuideRouteDateDetails', param, type);
//导游确定订单
export const saveGuideOrder = (param , type) => ajax( process.env.VUE_APP_PROXY_API +'/guide/saveGuideOrder', param, type);


//图片上传
export const imgUpload = () => uploadImg( process.env.VUE_APP_PROXY_API +'/common/imgUpload')
//获取导航栏
export const getComNavigation = (param , type) => ajax( process.env.VUE_APP_PROXY_API +'/common/getComNavigation', param, type);
//获取标签属性
export const getLabel = (param , type) => ajax( process.env.VUE_APP_PROXY_API +'/common/getLabel', param, type);
//根据语言获取城市
export const getCityList = (param , type) => ajax( process.env.VUE_APP_PROXY_API +'/common/getCityList', param, type);
//评论列表
export const selectComment = (param , type) => ajax( process.env.VUE_APP_PROXY_API +'/common/selectComment', param, type);
//子评论列表
export const getChildComment = (param , type) => ajax( process.env.VUE_APP_PROXY_API +'/common/getChildComment', param, type);
//评论点赞
export const digComment = (param , type) => ajax( process.env.VUE_APP_PROXY_API +'/common/digComment', param, type);
//添加子评论
export const addChildComment = (param , type) => ajax( process.env.VUE_APP_PROXY_API +'/common/addChildComment', param, type);
//退款说明
export const refundInfor = (param , type) => ajax( process.env.VUE_APP_PROXY_API +'/common/refundInfor', param, type);
//用户咨询列表
export const getConsult = (param , type) => ajax( process.env.VUE_APP_PROXY_API +'/common/getConsult', param, type);
//添加用户咨询
export const saveConsult = (param , type) => ajax( process.env.VUE_APP_PROXY_API +'/common/saveConsult', param, type);
//获取Logo设置管理
export const getLogo = (param , type) => ajax( process.env.VUE_APP_PROXY_API +'/common/getLogo', param, type);
//获取保险
export const getInsurance = (param , type) => ajax( process.env.VUE_APP_PROXY_API +'/common/getInsurance', param, type);
//获取语言
export const getLanguage = (param , type) => ajax( process.env.VUE_APP_PROXY_API +'/common/getLanguage', param, type);
//获取货币
export const getCurrency = (param , type) => ajax( process.env.VUE_APP_PROXY_API +'/common/getCurrency', param, type);
//获取基本参数
export const getProtocol = (param , type) => ajax( process.env.VUE_APP_PROXY_API +'/common/getProtocol', param, type);
//城市详情
export const getCityDetails = (param , type) => ajax( process.env.VUE_APP_PROXY_API +'/common/getCityDetails', param, type);
//获取热门目的地
export const getHotCity = (param , type) => ajax( process.env.VUE_APP_PROXY_API +'/common/getHotCity', param, type);
//酒店列表
export const getHotelByCity = (param , type) => ajax( process.env.VUE_APP_PROXY_API +'/common/getHotelByCity', param, type);
//获取酒店房间列表
export const getHotelRoom = (param , type) => ajax( process.env.VUE_APP_PROXY_API +'/common/getHotelRoom', param, type);
//酒店房间详情
export const getHotelRoomDetails = (param , type) => ajax( process.env.VUE_APP_PROXY_API +'/common/getHotelRoomDetails', param, type);
//根据城市及搜索条件获取汽车接口
export const getCarByCity = (param , type) => ajax( process.env.VUE_APP_PROXY_API +'/common/getCarByCity', param, type);
//包车租车查询车辆列表
export const getCarByRent = (param , type) => ajax( process.env.VUE_APP_PROXY_API +'/common/getCarByRent', param, type);
//获取导游信息
export const getGuideByCity = (param , type) => ajax( process.env.VUE_APP_PROXY_API +'/common/getGuideByCity', param, type);
//获取附近城市
export const getNearbyCity = (param , type) => ajax( process.env.VUE_APP_PROXY_API +'/common/getNearbyCity', param, type);
//获取城市景点
export const getCitySpot = (param , type) => ajax( process.env.VUE_APP_PROXY_API +'/common/getCitySpot', param, type);
//产品菜单接口
export const getProMenu = (param , type) => ajax( process.env.VUE_APP_PROXY_API +'/common/getProMenu', param, type);
//支付接口
export const payOrder = (param , type) => ajax( process.env.VUE_APP_PROXY_API +'/common/payOrder', param, type);
//根据城市获取景点
export const getScenicByCity = (param , type) => ajax( process.env.VUE_APP_PROXY_API +'common/getScenicByCity', param, type);
//添加一级评论
export const addComment = (param , type) => ajax( process.env.VUE_APP_PROXY_API +'common/addComment', param, type);
//根据语言获取酒店
export const getHotelByLanguage = (param , type) => ajax( process.env.VUE_APP_PROXY_API +'common/getHotelByLanguage', param, type);




//常规路线搜索
export const selectRoute = (param , type) => ajax( process.env.VUE_APP_PROXY_API +'route/selectRoute', param, type);
//常规路线详情
export const getRouteDetails = (param , type) => ajax( process.env.VUE_APP_PROXY_API +'route/getRouteDetails', param, type);
//常规路线行程内容
export const getRouteContent = (param , type) => ajax( process.env.VUE_APP_PROXY_API +'route/getRouteContent', param, type);
//常规路线/参团日期价格
export const getRoutePriceDetails = (param , type) => ajax( process.env.VUE_APP_PROXY_API +'route/getRoutePriceDetails', param, type);
//常规路线生成订单
export const saveRouteOrder = (param , type) => ajax( process.env.VUE_APP_PROXY_API +'route/saveRouteOrder', param, type);
//当地参团搜索
export const selectCityRoute = (param , type) => ajax( process.env.VUE_APP_PROXY_API +'route/selectCityRoute', param, type);
//参团详情
export const getCityRouteDetails = (param , type) => ajax( process.env.VUE_APP_PROXY_API +'route/getCityRouteDetails', param, type);
//当地参团生成订单
export const saveCityRouteOrder = (param , type) => ajax( process.env.VUE_APP_PROXY_API +'route/saveCityRouteOrder', param, type);



//景点搜索
export const selectScenicList = (param , type) => ajax( process.env.VUE_APP_PROXY_API +'scenic/selectScenicList', param, type);
//获取城市景点数量
export const getCityScenicNum = (param , type) => ajax( process.env.VUE_APP_PROXY_API +'scenic/getCityScenicNum', param, type);
//景点详情
export const getScenicDetails = (param , type) => ajax( process.env.VUE_APP_PROXY_API +'scenic/getScenicDetails', param, type);
//景点门票数量
export const getScenicNum = (param , type) => ajax( process.env.VUE_APP_PROXY_API +'scenic/getScenicNum', param, type);
//生成景点订单
export const saveScenicOrder = (param , type) => ajax( process.env.VUE_APP_PROXY_API +'scenic/saveScenicOrder', param, type);




//旅游定制的天数列表
export const getTravelDay = (param , type) => ajax( process.env.VUE_APP_PROXY_API +'customization/getTravelDay', param, type);
//根据旅游天数获取旅游定制的列表
export const getTravelByDay = (param , type) => ajax( process.env.VUE_APP_PROXY_API +'customization/getTravelByDay', param, type);
//定制城市关键字搜索
export const getCityByTitle = (param , type) => ajax( process.env.VUE_APP_PROXY_API +'customization/getCityByTitle', param, type);
//城市详情
export const getCity = (param , type) => ajax( process.env.VUE_APP_PROXY_API +'customization/getCity', param, type);
//定制生成订单
export const saveTravelOrder = (param , type) => ajax( process.env.VUE_APP_PROXY_API +'customization/saveTravelOrder', param, type);
//定制获取景点
export const getScenicByTitle = (param , type) => ajax( process.env.VUE_APP_PROXY_API +'customization/getScenicByTitle', param, type);
//定制获取景点详情
export const getScenic = (param , type) => ajax( process.env.VUE_APP_PROXY_API +'customization/getScenic', param, type);
//定制模板详情
export const getTravelDetails = (param , type) => ajax( process.env.VUE_APP_PROXY_API +'customization/getTravelDetails', param, type);




//获取出发港口
export const getStartCity = (param , type) => ajax( process.env.VUE_APP_PROXY_API +'cruise/getStartCity', param, type);
//获取邮轮航线
export const getCourse = (param , type) => ajax( process.env.VUE_APP_PROXY_API +'cruise/getCourse', param, type);
//获取邮轮公司
export const getLinerCompany = (param , type) => ajax( process.env.VUE_APP_PROXY_API +'cruise/getLinerCompany', param, type);
//获取邮轮搜索
export const cruiseSearch = (param , type) => ajax( process.env.VUE_APP_PROXY_API +'cruise/cruiseSearch', param, type);
//邮轮路线搜索
export const cruiseScreen = (param , type) => ajax( process.env.VUE_APP_PROXY_API +'cruise/cruiseScreen', param, type);
//邮轮详情
export const linerlineDetails = (param , type) => ajax( process.env.VUE_APP_PROXY_API +'cruise/linerlineDetails', param, type);
//邮轮行程列表
export const tripList = (param , type) => ajax( process.env.VUE_APP_PROXY_API +'cruise/tripList', param, type);
//邮轮日期价格
export const getLinePriceDetails = (param , type) => ajax( process.env.VUE_APP_PROXY_API +'cruise/getLinePriceDetails', param, type);
//获取邮轮房间
export const linerRoomList = (param , type) => ajax( process.env.VUE_APP_PROXY_API +'cruise/linerRoomList', param, type);
//邮轮确定订单
export const saveLineOrder = (param , type) => ajax( process.env.VUE_APP_PROXY_API +'cruise/saveLineOrder', param, type);





//短程接送车辆搜索
export const selectShortCar = (param , type) => ajax( process.env.VUE_APP_PROXY_API +'car/selectShortCar', param, type);
//短程接送生成订单
export const saveShortCarOrder = (param , type) => ajax( process.env.VUE_APP_PROXY_API +'car/saveShortCarOrder', param, type);
//接送机车辆搜索
export const selectAirportCar = (param , type) => ajax( process.env.VUE_APP_PROXY_API +'car/selectAirportCar', param, type);
//接送机生成订单
export const saveAirportCarOrder = (param , type) => ajax( process.env.VUE_APP_PROXY_API +'car/saveAirportCarOrder', param, type);
//获取车辆业务类型接口
export const selectCarService = (param , type) => ajax( process.env.VUE_APP_PROXY_API +'car/selectCarService', param, type);
//包车租车生成订单
export const saveCarOrder = (param , type) => ajax( process.env.VUE_APP_PROXY_API +'car/saveCarOrder', param, type);



 //获取模块数据
export const getModuleDataInfo = (param , type) => ajax( process.env.VUE_APP_PROXY_API +'module/getModuleDataInfo', param, type);



//添加购物车
export const saveCar = (param , type) => ajax( process.env.VUE_APP_PROXY_API +'/buyCar/saveCar', param, type);
//删除购物车
export const deleteCar = (param , type) => ajax( process.env.VUE_APP_PROXY_API +'/buyCar/deleteCar', param, type);
//购物车列表
export const productCar = (param , type) => ajax( process.env.VUE_APP_PROXY_API +'/buyCar/productCar', param, type);
//购物车列表
export const cancleTimeOuteProductCar = (param , type) => ajax( process.env.VUE_APP_PROXY_API +'/buyCar/cancleTimeOuteProductCar', param, type);
//购物车下单详情
export const productCarDetail = (param , type) => ajax( process.env.VUE_APP_PROXY_API +'/buyCar/productCarDetail', param, type);
//获取购物车数量
export const productCarNum = (param , type) => ajax( process.env.VUE_APP_PROXY_API +'/buyCar/productCarNum', param, type);




//城市搜索
export const selectCity = (param , type) => ajax( process.env.VUE_APP_PROXY_API +'/city/selectCity', param, type);
//目的地城市详情
export const getCityInfo = (param , type) => ajax( process.env.VUE_APP_PROXY_API +'/city/getCityInfo', param, type);
//目的地详情页面 旅游定制
export const getTravelCustomizationList = (param , type) => ajax( process.env.VUE_APP_PROXY_API +'/city/getTravelCustomizationList', param, type);
//目的地详情页面 当地参团
export const getOfferedList = (param , type) => ajax( process.env.VUE_APP_PROXY_API +'/city/getOfferedList', param, type);
//目的地详情页面 获取景点
export const getScenicSpotList = (param , type) => ajax( process.env.VUE_APP_PROXY_API +'/city/getScenicSpotList', param, type);
//目的地详情页面 当地玩家
export const getPlayList = (param , type) => ajax( process.env.VUE_APP_PROXY_API +'/city/getPlayList', param, type);
//目的地详情页面 攻略列表
export const findStrategyList = (param , type) => ajax( process.env.VUE_APP_PROXY_API +'/city/findStrategyList', param, type);
//查看攻略
export const findStrategy = (param , type) => ajax( process.env.VUE_APP_PROXY_API +'/city/findStrategy', param, type);
//添加攻略
export const addStrategy = (param , type) => ajax( process.env.VUE_APP_PROXY_API +'/city/addStrategy', param, type);
