/*
 * @Description:  获取数据
 * @Author: 彭善智
 * @LastEditors: 彭善智
 * @Date: 2019-03-29 13:12:37
 * @LastEditTime: 2019-04-28 19:33:03
 */

import ajax from './fetch'
import {imgUpload} from "../utils/common"


//登录
export const login = (param = {}) => ajax( process.env.VUE_APP_PROXY_API +'/forlogin/login', param);
//注册
export const register = (param = {}) => ajax( process.env.VUE_APP_PROXY_API +'/forlogin/register', param);
//发送验证码
export const sendSms = (param = {}) => ajax( process.env.VUE_APP_PROXY_API +'/forlogin/sendSms', param);
//绑定邮箱
export const checkEmail = (param = {}) => ajax( process.env.VUE_APP_PROXY_API +'/forlogin/checkEmail', param);
//验证账号是否注册
export const checkRegister = (param = {}) => ajax( process.env.VUE_APP_PROXY_API +'/forlogin/checkRegister', param);
//修改密码
export const updatePassword = (param = {}) => ajax( process.env.VUE_APP_PROXY_API +'/forlogin/updatePassword', param);




//获取会员详情
export const myInfor = (param = {}) => ajax( process.env.VUE_APP_PROXY_API +'/member/myInfor', param);
//根据语言获取国家城市
export const getCountryCity = (param = {}) => ajax( process.env.VUE_APP_PROXY_API +'/member/getCountryCity', param);
//保存个人信息
export const updateMy = (param = {}) => ajax( process.env.VUE_APP_PROXY_API +'/member/updateMy', param);
//获取消息中心系统消息
export const getCompush = (param = {}) => ajax( process.env.VUE_APP_PROXY_API +'/member/getCompush', param);
//获取消息中心评论消息
export const getComment = (param = {}) => ajax( process.env.VUE_APP_PROXY_API +'/member/getComment', param);
//获取我的草稿
export const myDraft = (param = {}) => ajax( process.env.VUE_APP_PROXY_API +'/member/myDraft', param);
//删除我的草稿
export const deleteDraft = (param = {}) => ajax( process.env.VUE_APP_PROXY_API +'/member/deleteDraft', param);
//获取关于我们
export const getArticle = (param = {}) => ajax( process.env.VUE_APP_PROXY_API +'/member/getArticle', param);
//获取公司子账号
export const companyInfor = (param = {}) => ajax( process.env.VUE_APP_PROXY_API +'/member/companyInfor', param);
//修改公司子账号
export const updateCompanyInfor = (param = {}) => ajax( process.env.VUE_APP_PROXY_API +'/member/updateCompanyInfor', param);
//验证子账号是否存在
export const validateMember = (param = {}) => ajax( process.env.VUE_APP_PROXY_API +'/member/validateMember', param);
//获取常用联系人
export const getMemberContact = (param = {}) => ajax( process.env.VUE_APP_PROXY_API +'/member/getMemberContact', param);
//修改常用联系人
export const addMemberContact = (param = {}) => ajax( process.env.VUE_APP_PROXY_API +'/member/addMemberContact', param);
//删除常用联系人
export const deleteMemberContact = (param = {}) => ajax( process.env.VUE_APP_PROXY_API +'/member/deleteMemberContact', param);
//获取我的收藏
export const myCollection = (param = {}) => ajax( process.env.VUE_APP_PROXY_API +'/member/myCollection', param);
//取消收藏
export const deleteCollection = (param = {}) => ajax( process.env.VUE_APP_PROXY_API +'/member/deleteCollection', param);
//加入购物车
export const addCollectionToCar = (param = {}) => ajax( process.env.VUE_APP_PROXY_API +'/member/addCollectionToCar', param);
//获取玩家认证信息
export const getGuideInfo = (param = {}) => ajax( process.env.VUE_APP_PROXY_API +'/member/getGuideInfo', param);
//获取玩家擅长属性
export const getGuideLabel = (param = {}) => ajax( process.env.VUE_APP_PROXY_API +'/member/getGuideLabel', param);
//提交玩家认证信息
export const addGuide = (param = {}) => ajax( process.env.VUE_APP_PROXY_API +'/member/addGuide', param);




//获取导游路线规划
export const getGuideRoute = (param = {}) => ajax( process.env.VUE_APP_PROXY_API +'/guide/getGuideRoute', param);
//获取导游路线规划详情
export const getGuideRouteDetail = (param = {}) => ajax( process.env.VUE_APP_PROXY_API +'/guide/getGuideRouteDetail', param);
//获取导游路线景点
export const getCityScenic = (param = {}) => ajax( process.env.VUE_APP_PROXY_API +'/guide/getCityScenic', param);
//修改添加导游路线
export const updateGuideRoute = (param = {}) => ajax( process.env.VUE_APP_PROXY_API +'/guide/updateGuideRoute', param);
//删除导游路线
export const deleteGuideRoute = (param = {}) => ajax( process.env.VUE_APP_PROXY_API +'/guide/deleteGuideRoute', param);
//获取导游价格设置和退款价格设置
export const getGuidePrice = (param = {}) => ajax( process.env.VUE_APP_PROXY_API +'/guide/getGuidePrice', param);
//修改导游价格设置和退款价格设置
export const updateGuidePrice = (param = {}) => ajax( process.env.VUE_APP_PROXY_API +'/guide/updateGuidePrice', param);
//导游筛选列表
export const guideScreen = (param = {}) => ajax( process.env.VUE_APP_PROXY_API +'/guide/guideScreen', param);
//导游详情
export const guideDetails = (param = {}) => ajax( process.env.VUE_APP_PROXY_API +'/guide/guideDetails', param);
//导游推荐路线
export const guideRoute = (param = {}) => ajax( process.env.VUE_APP_PROXY_API +'/guide/guideRoute', param);
//导游日期详情
export const getGuideDateDetails = (param = {}) => ajax( process.env.VUE_APP_PROXY_API +'/guide/getGuideDateDetails', param);
//导游路线日期详情
export const getGuideRouteDateDetails = (param = {}) => ajax( process.env.VUE_APP_PROXY_API +'/guide/getGuideRouteDateDetails', param);
//导游确定订单
export const saveGuideOrder = (param = {}) => ajax( process.env.VUE_APP_PROXY_API +'/guide/saveGuideOrder', param);


//图片上传
export const imgUp = () => imgUpload( process.env.VUE_APP_PROXY_API +'/common/imgUpload')
//获取导航栏
export const getComNavigation = (param = {}) => ajax( process.env.VUE_APP_PROXY_API +'/common/getComNavigation', param);
//获取标签属性
export const getLabel = (param = {}) => ajax( process.env.VUE_APP_PROXY_API +'/common/getLabel', param);
//根据语言获取城市
export const getCityList = (param = {}) => ajax( process.env.VUE_APP_PROXY_API +'/common/getCityList', param);
//评论列表
export const selectComment = (param = {}) => ajax( process.env.VUE_APP_PROXY_API +'/common/selectComment', param);
//子评论列表
export const getChildComment = (param = {}) => ajax( process.env.VUE_APP_PROXY_API +'/common/getChildComment', param);
//评论点赞
export const digComment = (param = {}) => ajax( process.env.VUE_APP_PROXY_API +'/common/digComment', param);
//添加子评论
export const addChildComment = (param = {}) => ajax( process.env.VUE_APP_PROXY_API +'/common/addChildComment', param);
//退款说明
export const refundInfor = (param = {}) => ajax( process.env.VUE_APP_PROXY_API +'/common/refundInfor', param);
//添加购物车
export const saveCar = (param = {}) => ajax( process.env.VUE_APP_PROXY_API +'/common/saveCar', param);
//用户咨询列表
export const getConsult = (param = {}) => ajax( process.env.VUE_APP_PROXY_API +'/common/getConsult', param);
//添加用户咨询
export const saveConsult = (param = {}) => ajax( process.env.VUE_APP_PROXY_API +'/common/saveConsult', param);
//获取Logo设置管理
export const getLogo = (param = {}) => ajax( process.env.VUE_APP_PROXY_API +'/common/getLogo', param);
//获取保险
export const getInsurance = (param = {}) => ajax( process.env.VUE_APP_PROXY_API +'/common/getInsurance', param);
//获取语言
export const getLanguage = (param = {}) => ajax( process.env.VUE_APP_PROXY_API +'/common/getLanguage', param);
//获取货币
export const getCurrency = (param = {}) => ajax( process.env.VUE_APP_PROXY_API +'/common/getCurrency', param);
//获取基本参数
export const getProtocol = (param = {}) => ajax( process.env.VUE_APP_PROXY_API +'/common/getProtocol', param);
//城市详情
export const getCityDetails = (param = {}) => ajax( process.env.VUE_APP_PROXY_API +'/common/getCityDetails', param);
//获取热门目的地
export const getHotCity = (param = {}) => ajax( process.env.VUE_APP_PROXY_API +'/common/getHotCity', param);
//酒店列表
export const getHotelByCity = (param = {}) => ajax( process.env.VUE_APP_PROXY_API +'/common/getHotelByCity', param);
//获取酒店房间列表
export const getHotelRoom = (param = {}) => ajax( process.env.VUE_APP_PROXY_API +'/common/getHotelRoom', param);
//酒店房间详情
export const getHotelRoomDetails = (param = {}) => ajax( process.env.VUE_APP_PROXY_API +'/common/getHotelRoomDetails', param);
//根据城市及搜索条件获取汽车接口
export const getCarByCity = (param = {}) => ajax( process.env.VUE_APP_PROXY_API +'/common/getCarByCity', param);
//包车租车查询车辆列表
export const getCarByRent = (param = {}) => ajax( process.env.VUE_APP_PROXY_API +'/common/getCarByRent', param);
//获取导游信息
export const getGuideByCity = (param = {}) => ajax( process.env.VUE_APP_PROXY_API +'/common/getGuideByCity', param);
//获取附近城市
export const getNearbyCity = (param = {}) => ajax( process.env.VUE_APP_PROXY_API +'/common/getNearbyCity', param);
//获取城市景点
export const getCitySpot = (param = {}) => ajax( process.env.VUE_APP_PROXY_API +'/common/getCitySpot', param);
//产品菜单接口
export const getProMenu = (param = {}) => ajax( process.env.VUE_APP_PROXY_API +'/common/getProMenu', param);




//根据城市获取景点
export const getScenicByCity = (param = {}) => ajax( process.env.VUE_APP_PROXY_API +'route/getScenicByCity', param);
//常规路线搜索
export const selectRoute = (param = {}) => ajax( process.env.VUE_APP_PROXY_API +'route/selectRoute', param);
//常规路线详情
export const getRouteDetails = (param = {}) => ajax( process.env.VUE_APP_PROXY_API +'route/getRouteDetails', param);
//常规路线行程内容
export const getRouteContent = (param = {}) => ajax( process.env.VUE_APP_PROXY_API +'route/getRouteContent', param);
//常规路线/参团日期价格
export const getRoutePriceDetails = (param = {}) => ajax( process.env.VUE_APP_PROXY_API +'route/getRoutePriceDetails', param);
//常规路线生成订单
export const saveRouteOrder = (param = {}) => ajax( process.env.VUE_APP_PROXY_API +'route/saveRouteOrder', param);
//当地参团搜索
export const selectCityRoute = (param = {}) => ajax( process.env.VUE_APP_PROXY_API +'route/selectCityRoute', param);
//参团详情
export const getCityRouteDetails = (param = {}) => ajax( process.env.VUE_APP_PROXY_API +'route/getCityRouteDetails', param);
//当地参团生成订单
export const saveCityRouteOrder = (param = {}) => ajax( process.env.VUE_APP_PROXY_API +'route/saveCityRouteOrder', param);



//景点搜索
export const selectScenicList = (param = {}) => ajax( process.env.VUE_APP_PROXY_API +'scenic/selectScenicList', param);
//获取城市景点数量
export const getCityScenicNum = (param = {}) => ajax( process.env.VUE_APP_PROXY_API +'scenic/getCityScenicNum', param);
//景点详情
export const getScenicDetails = (param = {}) => ajax( process.env.VUE_APP_PROXY_API +'scenic/getScenicDetails', param);
//景点门票数量
export const getScenicNum = (param = {}) => ajax( process.env.VUE_APP_PROXY_API +'scenic/getScenicNum', param);
//生成景点订单
export const saveScenicOrder = (param = {}) => ajax( process.env.VUE_APP_PROXY_API +'scenic/saveScenicOrder', param);




//旅游定制的天数列表
export const getTravelDay = (param = {}) => ajax( process.env.VUE_APP_PROXY_API +'customization/getTravelDay', param);
//根据旅游天数获取旅游定制的列表
export const getTravelByDay = (param = {}) => ajax( process.env.VUE_APP_PROXY_API +'customization/getTravelByDay', param);
//定制城市关键字搜索
export const getCityByTitle = (param = {}) => ajax( process.env.VUE_APP_PROXY_API +'customization/getCityByTitle', param);
//城市详情
export const getCity = (param = {}) => ajax( process.env.VUE_APP_PROXY_API +'customization/getCity', param);
//定制生成订单
export const saveTravelOrder = (param = {}) => ajax( process.env.VUE_APP_PROXY_API +'customization/saveTravelOrder', param);
//定制获取景点
export const getScenicByTitle = (param = {}) => ajax( process.env.VUE_APP_PROXY_API +'customization/getScenicByTitle', param);
//定制获取景点详情
export const getScenic = (param = {}) => ajax( process.env.VUE_APP_PROXY_API +'customization/getScenic', param);
//定制模板详情
export const getTravelDetails = (param = {}) => ajax( process.env.VUE_APP_PROXY_API +'customization/getTravelDetails', param);




//获取出发港口
export const getStartCity = (param = {}) => ajax( process.env.VUE_APP_PROXY_API +'cruise/getStartCity', param);
//获取邮轮航线
export const getCourse = (param = {}) => ajax( process.env.VUE_APP_PROXY_API +'cruise/getCourse', param);
//获取邮轮公司
export const getLinerCompany = (param = {}) => ajax( process.env.VUE_APP_PROXY_API +'cruise/getLinerCompany', param);
//获取邮轮搜索
export const cruiseSearch = (param = {}) => ajax( process.env.VUE_APP_PROXY_API +'cruise/cruiseSearch', param);
//邮轮路线搜索
export const cruiseScreen = (param = {}) => ajax( process.env.VUE_APP_PROXY_API +'cruise/cruiseScreen', param);
//邮轮详情
export const linerlineDetails = (param = {}) => ajax( process.env.VUE_APP_PROXY_API +'cruise/linerlineDetails', param);
//邮轮行程列表
export const tripList = (param = {}) => ajax( process.env.VUE_APP_PROXY_API +'cruise/tripList', param);
//邮轮日期价格
export const getLinePriceDetails = (param = {}) => ajax( process.env.VUE_APP_PROXY_API +'cruise/getLinePriceDetails', param);
//获取邮轮房间
export const linerRoomList = (param = {}) => ajax( process.env.VUE_APP_PROXY_API +'cruise/linerRoomList', param);
//邮轮确定订单
export const saveLineOrder = (param = {}) => ajax( process.env.VUE_APP_PROXY_API +'cruise/saveLineOrder', param);






//短程接送车辆搜索
export const selectShortCar = (param = {}) => ajax( process.env.VUE_APP_PROXY_API +'car/selectShortCar', param);
//短程接送生成订单
export const saveShortCarOrder = (param = {}) => ajax( process.env.VUE_APP_PROXY_API +'car/saveShortCarOrder', param);
//接送机车辆搜索
export const selectAirportCar = (param = {}) => ajax( process.env.VUE_APP_PROXY_API +'car/selectAirportCar', param);
//接送机生成订单
export const saveAirportCarOrder = (param = {}) => ajax( process.env.VUE_APP_PROXY_API +'car/saveAirportCarOrder', param);
//获取车辆业务类型接口
export const selectCarService = (param = {}) => ajax( process.env.VUE_APP_PROXY_API +'car/selectCarService', param);



 //获取模块数据
export const getModuleDataInfo = (param = {}) => ajax( process.env.VUE_APP_PROXY_API +'module/getModuleDataInfo', param);

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





