/*
 * @Description:  获取数据
 * @Author: 彭善智
 * @LastEditors: 彭善智
 * @Date: 2019-03-29 13:12:37
 * @LastEditTime: 2019-05-17 00:44:17
 */

import ajax from './fetch'
import { uploadImg } from "../utils/common"


//登录
export const login = (param = {}, type = 'GET') => ajax( process.env.VUE_APP_PROXY_API +'/forlogin/login', param, type);
//注册
export const register = (param = {}, type = 'GET') => ajax( process.env.VUE_APP_PROXY_API +'/forlogin/register', param, type);
//发送验证码
export const sendSms = (param = {}, type = 'GET') => ajax( process.env.VUE_APP_PROXY_API +'/forlogin/sendSms', param, type);
//绑定邮箱
export const checkEmail = (param = {}, type = 'GET') => ajax( process.env.VUE_APP_PROXY_API +'/forlogin/checkEmail', param, type);
//验证账号是否注册
export const checkRegister = (param = {}, type = 'GET') => ajax( process.env.VUE_APP_PROXY_API +'/forlogin/checkRegister', param, type);
//修改密码
export const updatePassword = (param = {}, type = 'GET') => ajax( process.env.VUE_APP_PROXY_API +'/forlogin/updatePassword', param, type);
//商家注册接口
export const businessRegister = (param = {}, type = 'GET') => ajax( process.env.VUE_APP_PROXY_API +'/forlogin/businessRegister', param, type);


//获取会员详情
export const myInfor = (param = {}, type = 'GET') => ajax( process.env.VUE_APP_PROXY_API +'/member/myInfor', param, type);
//根据语言获取国家城市
export const getCountryCity = (param = {}, type = 'GET') => ajax( process.env.VUE_APP_PROXY_API +'/member/getCountryCity', param, type);
//保存个人信息
export const updateMy = (param = {}, type = 'GET') => ajax( process.env.VUE_APP_PROXY_API +'/member/updateMy', param, type);
//获取消息中心系统消息
export const getCompush = (param = {}, type = 'GET') => ajax( process.env.VUE_APP_PROXY_API +'/member/getCompush', param, type);
//获取消息中心评论消息
export const getComment = (param = {}, type = 'GET') => ajax( process.env.VUE_APP_PROXY_API +'/member/getComment', param, type);
//获取我的草稿
export const myDraft = (param = {}, type = 'GET') => ajax( process.env.VUE_APP_PROXY_API +'/member/myDraft', param, type);
//删除我的草稿
export const deleteDraft = (param = {}, type = 'GET') => ajax( process.env.VUE_APP_PROXY_API +'/member/deleteDraft', param, type);
//获取关于我们
export const getArticle = (param = {}, type = 'GET') => ajax( process.env.VUE_APP_PROXY_API +'/member/getArticle', param, type);
//获取公司子账号
export const companyInfor = (param = {}, type = 'GET') => ajax( process.env.VUE_APP_PROXY_API +'/member/companyInfor', param, type);
//修改公司子账号
export const updateCompanyInfor = (param = {}, type = 'GET') => ajax( process.env.VUE_APP_PROXY_API +'/member/updateCompanyInfor', param, type);
//验证子账号是否存在
export const validateMember = (param = {}, type = 'GET') => ajax( process.env.VUE_APP_PROXY_API +'/member/validateMember', param, type);
//获取常用联系人
export const getMemberContact = (param = {}, type = 'GET') => ajax( process.env.VUE_APP_PROXY_API +'/member/getMemberContact', param, type);
//修改常用联系人
export const addMemberContact = (param = {}, type = 'GET') => ajax( process.env.VUE_APP_PROXY_API +'/member/addMemberContact', param, type);
//删除常用联系人
export const deleteMemberContact = (param = {}, type = 'GET') => ajax( process.env.VUE_APP_PROXY_API +'/member/deleteMemberContact', param, type);
//获取我的收藏
export const myCollection = (param = {}, type = 'GET') => ajax( process.env.VUE_APP_PROXY_API +'/member/myCollection', param, type);
//取消收藏
export const deleteCollection = (param = {}, type = 'GET') => ajax( process.env.VUE_APP_PROXY_API +'/member/deleteCollection', param, type);
//加入购物车
export const addCollectionToCar = (param = {}, type = 'GET') => ajax( process.env.VUE_APP_PROXY_API +'/member/addCollectionToCar', param, type);
//获取玩家认证信息
export const getGuideInfo = (param = {}, type = 'GET') => ajax( process.env.VUE_APP_PROXY_API +'/member/getGuideInfo', param, type);
//获取玩家擅长属性
export const getGuideLabel = (param = {}, type = 'GET') => ajax( process.env.VUE_APP_PROXY_API +'/member/getGuideLabel', param, type);
//提交玩家认证信息
export const addGuide = (param = {}, type = 'GET') => ajax( process.env.VUE_APP_PROXY_API +'/member/addGuide', param, type);
//获取我的订单
export const myOrder = (param = {}, type = 'GET') => ajax( process.env.VUE_APP_PROXY_API +'/member/myOrder', param, type);
//取消订单
export const cancelOrder = (param = {}, type = 'GET') => ajax( process.env.VUE_APP_PROXY_API +'/member/cancelOrder', param, type);



//获取导游路线规划
export const getGuideRoute = (param = {}, type = 'GET') => ajax( process.env.VUE_APP_PROXY_API +'/guide/getGuideRoute', param, type);
//获取导游路线规划详情
export const getGuideRouteDetail = (param = {}, type = 'GET') => ajax( process.env.VUE_APP_PROXY_API +'/guide/getGuideRouteDetail', param, type);
//获取导游路线景点
export const getCityScenic = (param = {}, type = 'GET') => ajax( process.env.VUE_APP_PROXY_API +'/guide/getCityScenic', param, type);
//修改添加导游路线
export const updateGuideRoute = (param = {}, type = 'GET') => ajax( process.env.VUE_APP_PROXY_API +'/guide/updateGuideRoute', param, type);
//删除导游路线
export const deleteGuideRoute = (param = {}, type = 'GET') => ajax( process.env.VUE_APP_PROXY_API +'/guide/deleteGuideRoute', param, type);
//获取导游价格设置和退款价格设置
export const getGuidePrice = (param = {}, type = 'GET') => ajax( process.env.VUE_APP_PROXY_API +'/guide/getGuidePrice', param, type);
//修改导游价格设置和退款价格设置
export const updateGuidePrice = (param = {}, type = 'GET') => ajax( process.env.VUE_APP_PROXY_API +'/guide/updateGuidePrice', param, type);
//导游筛选列表
export const guideScreen = (param = {}, type = 'GET') => ajax( process.env.VUE_APP_PROXY_API +'/guide/guideScreen', param, type);
//导游详情
export const guideDetails = (param = {}, type = 'GET') => ajax( process.env.VUE_APP_PROXY_API +'/guide/guideDetails', param, type);
//导游推荐路线
export const guideRoute = (param = {}, type = 'GET') => ajax( process.env.VUE_APP_PROXY_API +'/guide/guideRoute', param, type);
//导游日期详情
export const getGuideDateDetails = (param = {}, type = 'GET') => ajax( process.env.VUE_APP_PROXY_API +'/guide/getGuideDateDetails', param, type);
//导游路线日期详情
export const getGuideRouteDateDetails = (param = {}, type = 'GET') => ajax( process.env.VUE_APP_PROXY_API +'/guide/getGuideRouteDateDetails', param, type);
//导游确定订单
export const saveGuideOrder = (param = {}, type = 'GET') => ajax( process.env.VUE_APP_PROXY_API +'/guide/saveGuideOrder', param, type);


//图片上传
export const imgUpload = () => uploadImg( process.env.VUE_APP_PROXY_API +'/common/imgUpload')
//获取导航栏
export const getComNavigation = (param = {}, type = 'GET') => ajax( process.env.VUE_APP_PROXY_API +'/common/getComNavigation', param, type);
//获取标签属性
export const getLabel = (param = {}, type = 'GET') => ajax( process.env.VUE_APP_PROXY_API +'/common/getLabel', param, type);
//根据语言获取城市
export const getCityList = (param = {}, type = 'GET') => ajax( process.env.VUE_APP_PROXY_API +'/common/getCityList', param, type);
//评论列表
export const selectComment = (param = {}, type = 'GET') => ajax( process.env.VUE_APP_PROXY_API +'/common/selectComment', param, type);
//子评论列表
export const getChildComment = (param = {}, type = 'GET') => ajax( process.env.VUE_APP_PROXY_API +'/common/getChildComment', param, type);
//评论点赞
export const digComment = (param = {}, type = 'GET') => ajax( process.env.VUE_APP_PROXY_API +'/common/digComment', param, type);
//添加子评论
export const addChildComment = (param = {}, type = 'GET') => ajax( process.env.VUE_APP_PROXY_API +'/common/addChildComment', param, type);
//退款说明
export const refundInfor = (param = {}, type = 'GET') => ajax( process.env.VUE_APP_PROXY_API +'/common/refundInfor', param, type);
//添加购物车
export const saveCar = (param = {}, type = 'GET') => ajax( process.env.VUE_APP_PROXY_API +'/common/saveCar', param, type);
//用户咨询列表
export const getConsult = (param = {}, type = 'GET') => ajax( process.env.VUE_APP_PROXY_API +'/common/getConsult', param, type);
//添加用户咨询
export const saveConsult = (param = {}, type = 'GET') => ajax( process.env.VUE_APP_PROXY_API +'/common/saveConsult', param, type);
//获取Logo设置管理
export const getLogo = (param = {}, type = 'GET') => ajax( process.env.VUE_APP_PROXY_API +'/common/getLogo', param, type);
//获取保险
export const getInsurance = (param = {}, type = 'GET') => ajax( process.env.VUE_APP_PROXY_API +'/common/getInsurance', param, type);
//获取语言
export const getLanguage = (param = {}, type = 'GET') => ajax( process.env.VUE_APP_PROXY_API +'/common/getLanguage', param, type);
//获取货币
export const getCurrency = (param = {}, type = 'GET') => ajax( process.env.VUE_APP_PROXY_API +'/common/getCurrency', param, type);
//获取基本参数
export const getProtocol = (param = {}, type = 'GET') => ajax( process.env.VUE_APP_PROXY_API +'/common/getProtocol', param, type);
//城市详情
export const getCityDetails = (param = {}, type = 'GET') => ajax( process.env.VUE_APP_PROXY_API +'/common/getCityDetails', param, type);
//获取热门目的地
export const getHotCity = (param = {}, type = 'GET') => ajax( process.env.VUE_APP_PROXY_API +'/common/getHotCity', param, type);
//酒店列表
export const getHotelByCity = (param = {}, type = 'GET') => ajax( process.env.VUE_APP_PROXY_API +'/common/getHotelByCity', param, type);
//获取酒店房间列表
export const getHotelRoom = (param = {}, type = 'GET') => ajax( process.env.VUE_APP_PROXY_API +'/common/getHotelRoom', param, type);
//酒店房间详情
export const getHotelRoomDetails = (param = {}, type = 'GET') => ajax( process.env.VUE_APP_PROXY_API +'/common/getHotelRoomDetails', param, type);
//根据城市及搜索条件获取汽车接口
export const getCarByCity = (param = {}, type = 'GET') => ajax( process.env.VUE_APP_PROXY_API +'/common/getCarByCity', param, type);
//包车租车查询车辆列表
export const getCarByRent = (param = {}, type = 'GET') => ajax( process.env.VUE_APP_PROXY_API +'/common/getCarByRent', param, type);
//获取导游信息
export const getGuideByCity = (param = {}, type = 'GET') => ajax( process.env.VUE_APP_PROXY_API +'/common/getGuideByCity', param, type);
//获取附近城市
export const getNearbyCity = (param = {}, type = 'GET') => ajax( process.env.VUE_APP_PROXY_API +'/common/getNearbyCity', param, type);
//获取城市景点
export const getCitySpot = (param = {}, type = 'GET') => ajax( process.env.VUE_APP_PROXY_API +'/common/getCitySpot', param, type);
//产品菜单接口
export const getProMenu = (param = {}, type = 'GET') => ajax( process.env.VUE_APP_PROXY_API +'/common/getProMenu', param, type);
//支付接口
export const payOrder = (param = {}, type = 'GET') => ajax( process.env.VUE_APP_PROXY_API +'/common/payOrder', param, type);




//根据城市获取景点
export const getScenicByCity = (param = {}, type = 'GET') => ajax( process.env.VUE_APP_PROXY_API +'route/getScenicByCity', param, type);
//常规路线搜索
export const selectRoute = (param = {}, type = 'GET') => ajax( process.env.VUE_APP_PROXY_API +'route/selectRoute', param, type);
//常规路线详情
export const getRouteDetails = (param = {}, type = 'GET') => ajax( process.env.VUE_APP_PROXY_API +'route/getRouteDetails', param, type);
//常规路线行程内容
export const getRouteContent = (param = {}, type = 'GET') => ajax( process.env.VUE_APP_PROXY_API +'route/getRouteContent', param, type);
//常规路线/参团日期价格
export const getRoutePriceDetails = (param = {}, type = 'GET') => ajax( process.env.VUE_APP_PROXY_API +'route/getRoutePriceDetails', param, type);
//常规路线生成订单
export const saveRouteOrder = (param = {}, type = 'GET') => ajax( process.env.VUE_APP_PROXY_API +'route/saveRouteOrder', param, type);
//当地参团搜索
export const selectCityRoute = (param = {}, type = 'GET') => ajax( process.env.VUE_APP_PROXY_API +'route/selectCityRoute', param, type);
//参团详情
export const getCityRouteDetails = (param = {}, type = 'GET') => ajax( process.env.VUE_APP_PROXY_API +'route/getCityRouteDetails', param, type);
//当地参团生成订单
export const saveCityRouteOrder = (param = {}, type = 'GET') => ajax( process.env.VUE_APP_PROXY_API +'route/saveCityRouteOrder', param, type);



//景点搜索
export const selectScenicList = (param = {}, type = 'GET') => ajax( process.env.VUE_APP_PROXY_API +'scenic/selectScenicList', param, type);
//获取城市景点数量
export const getCityScenicNum = (param = {}, type = 'GET') => ajax( process.env.VUE_APP_PROXY_API +'scenic/getCityScenicNum', param, type);
//景点详情
export const getScenicDetails = (param = {}, type = 'GET') => ajax( process.env.VUE_APP_PROXY_API +'scenic/getScenicDetails', param, type);
//景点门票数量
export const getScenicNum = (param = {}, type = 'GET') => ajax( process.env.VUE_APP_PROXY_API +'scenic/getScenicNum', param, type);
//生成景点订单
export const saveScenicOrder = (param = {}, type = 'GET') => ajax( process.env.VUE_APP_PROXY_API +'scenic/saveScenicOrder', param, type);




//旅游定制的天数列表
export const getTravelDay = (param = {}, type = 'GET') => ajax( process.env.VUE_APP_PROXY_API +'customization/getTravelDay', param, type);
//根据旅游天数获取旅游定制的列表
export const getTravelByDay = (param = {}, type = 'GET') => ajax( process.env.VUE_APP_PROXY_API +'customization/getTravelByDay', param, type);
//定制城市关键字搜索
export const getCityByTitle = (param = {}, type = 'GET') => ajax( process.env.VUE_APP_PROXY_API +'customization/getCityByTitle', param, type);
//城市详情
export const getCity = (param = {}, type = 'GET') => ajax( process.env.VUE_APP_PROXY_API +'customization/getCity', param, type);
//定制生成订单
export const saveTravelOrder = (param = {}, type = 'GET') => ajax( process.env.VUE_APP_PROXY_API +'customization/saveTravelOrder', param, type);
//定制获取景点
export const getScenicByTitle = (param = {}, type = 'GET') => ajax( process.env.VUE_APP_PROXY_API +'customization/getScenicByTitle', param, type);
//定制获取景点详情
export const getScenic = (param = {}, type = 'GET') => ajax( process.env.VUE_APP_PROXY_API +'customization/getScenic', param, type);
//定制模板详情
export const getTravelDetails = (param = {}, type = 'GET') => ajax( process.env.VUE_APP_PROXY_API +'customization/getTravelDetails', param, type);




//获取出发港口
export const getStartCity = (param = {}, type = 'GET') => ajax( process.env.VUE_APP_PROXY_API +'cruise/getStartCity', param, type);
//获取邮轮航线
export const getCourse = (param = {}, type = 'GET') => ajax( process.env.VUE_APP_PROXY_API +'cruise/getCourse', param, type);
//获取邮轮公司
export const getLinerCompany = (param = {}, type = 'GET') => ajax( process.env.VUE_APP_PROXY_API +'cruise/getLinerCompany', param, type);
//获取邮轮搜索
export const cruiseSearch = (param = {}, type = 'GET') => ajax( process.env.VUE_APP_PROXY_API +'cruise/cruiseSearch', param, type);
//邮轮路线搜索
export const cruiseScreen = (param = {}, type = 'GET') => ajax( process.env.VUE_APP_PROXY_API +'cruise/cruiseScreen', param, type);
//邮轮详情
export const linerlineDetails = (param = {}, type = 'GET') => ajax( process.env.VUE_APP_PROXY_API +'cruise/linerlineDetails', param, type);
//邮轮行程列表
export const tripList = (param = {}, type = 'GET') => ajax( process.env.VUE_APP_PROXY_API +'cruise/tripList', param, type);
//邮轮日期价格
export const getLinePriceDetails = (param = {}, type = 'GET') => ajax( process.env.VUE_APP_PROXY_API +'cruise/getLinePriceDetails', param, type);
//获取邮轮房间
export const linerRoomList = (param = {}, type = 'GET') => ajax( process.env.VUE_APP_PROXY_API +'cruise/linerRoomList', param, type);
//邮轮确定订单
export const saveLineOrder = (param = {}, type = 'GET') => ajax( process.env.VUE_APP_PROXY_API +'cruise/saveLineOrder', param, type);






//短程接送车辆搜索
export const selectShortCar = (param = {}, type = 'GET') => ajax( process.env.VUE_APP_PROXY_API +'car/selectShortCar', param, type);
//短程接送生成订单
export const saveShortCarOrder = (param = {}, type = 'GET') => ajax( process.env.VUE_APP_PROXY_API +'car/saveShortCarOrder', param, type);
//接送机车辆搜索
export const selectAirportCar = (param = {}, type = 'GET') => ajax( process.env.VUE_APP_PROXY_API +'car/selectAirportCar', param, type);
//接送机生成订单
export const saveAirportCarOrder = (param = {}, type = 'GET') => ajax( process.env.VUE_APP_PROXY_API +'car/saveAirportCarOrder', param, type);
//获取车辆业务类型接口
export const selectCarService = (param = {}, type = 'GET') => ajax( process.env.VUE_APP_PROXY_API +'car/selectCarService', param, type);
//包车租车生成订单
export const saveCarOrder = (param = {}, type = 'GET') => ajax( process.env.VUE_APP_PROXY_API +'car/saveCarOrder', param, type);



 //获取模块数据
export const getModuleDataInfo = (param = {}, type = 'GET') => ajax( process.env.VUE_APP_PROXY_API +'module/getModuleDataInfo', param, type);

// //获取网站页面
// const getModuleHtmlListUrl = baseUrl + "module/getModuleHtmlList";
// //获取可添加模块
// const getModuleNameListUrl = baseUrl + "module/getModuleNameList";
// //获取关联模块
// const getModuleHtmlNameListUrl = baseUrl + "module/getModuleHtmlNameList";
// //获取车辆列表
// const getCarListUrl = baseUrl + "module/getCarList";
// //获取评论列表
// const getComCommentListUrl = baseUrl + "module/getComCommentList";
// //获取城市列表
// const getComCityListUrl = baseUrl + "module/getComCityList";
// //获取景点列表
// const getScenicSpotListUrl = baseUrl + "module/getScenicSpotList";
// //获取游轮列表
// const getlinertLineListUrl = baseUrl + "module/getLinertLineList";
// //获取订单列表
// const getOrderSysListUrl = baseUrl + "module/getOrderSysList";
// //获取定制列表
// const getTravelCustomizationListUrl = baseUrl + "module/getTravelCustomizationList";
// //获取攻略列表
// const getCityStrategyListUrl = baseUrl + "module/getCityStrategyList";
// //获取导游列表
// const getGuideListUrl = baseUrl + "module/getGuideList";
// //获取导游路线列表
// const getGuideRouteListUrl = baseUrl + "module/getGuideRouteList";
// //获取常规路线列表
// const getRoute1ListUrl = baseUrl + "module/getRoute1List";
// //获取当地参团列表
// const getRoute2ListUrl = baseUrl + "module/getRoute2List";
// //获取网站文章列表
// const getComArticle1ListUrl = baseUrl + "module/getComArticle1List";
// //获取资讯列表
// const getComArticle2ListUrl = baseUrl + "module/getComArticle2List";
// //获取租车供应商列表
// const getSysUserListUrl = baseUrl + "module/getSysUserList";
// //获取景点门票列表
// const getScenicSpotTicketListUrl = baseUrl + "module/getScenicSpotTicketList";
// //保存模板内容
// const addModuleContentUrl = baseUrl + "module/addModuleContent";   
// //模块排序
// const updateSortUrl = baseUrl + "module/updateSort";   
// //模块详情
// const getModuleContentByIdUrl = baseUrl + "module/getModuleContentById";   
//  //获取模块数据
//  const getModuleDataInfoUrl = baseUrl + "module/getModuleDataInfo";   
// //删除模块
// const deleteModuleUrl = baseUrl + "module/deleteModule";   


// //获取我的订单
// const myOrderUrl = baseUrl + "member/myOrder";
// //取消订单
// const cancelOrderUrl = baseUrl + "member/cancelOrder";
// //支付接口
// const payOrderUrl = baseUrl + "common/payOrder";


//(城市)目的地相关接口
//搜索
//详情
//城市详情
export const getCityDetailInCityChannel = (param = {}, type = 'GET') => ajax( process.env.VUE_APP_PROXY_API +'/city/getCityDetails', param, type);